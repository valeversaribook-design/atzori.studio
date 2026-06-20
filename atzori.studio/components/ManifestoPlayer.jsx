'use client';

import { useEffect, useRef, useState } from 'react';
import { CANDIDATI_URL } from '@/lib/config';

const SCENE_LIST = [
  { selector: 'scene-intro', speak: null, minDuration: 2800, cinematic: false },
  { selector: 'scene-phrase', speak: "Per anni ho pensato che guadagnare online, fosse pubblicità sospetta.", minDuration: 5500, cinematic: false },
  { selector: 'scene-reveal-a', speak: "Poi ho capito una cosa.", minDuration: 3500, cinematic: false },
  { selector: 'scene-split', speak: "Il problema non era l'online. Era il metodo.", minDuration: 5800, cinematic: false },
  { selector: 'scene-negation', speak: "Nessuna formula magica. Nessuna scorciatoia. Nessuna promessa di soldi facili.", minDuration: 8500, cinematic: false },
  { selector: 'scene-reveal-b', speak: "Solo tre pilastri.", minDuration: 3500, cinematic: false },
  { selector: 'scene-pillars', speak: "Metodo. Intelligenza Artificiale. Automazioni.", minDuration: 6500, cinematic: false },
  { selector: 'scene-mani-1', speak: "Costruire un'attività online", minDuration: 3500, cinematic: true },
  { selector: 'scene-mani-2', speak: "non è una promessa.", minDuration: 3000, cinematic: true },
  { selector: 'scene-mani-3', speak: "È un mestiere.", minDuration: 3500, cinematic: true },
  { selector: 'scene-cta', speak: "Se ti riconosci, candidati a un confronto.", minDuration: 5500, cinematic: false },
  { selector: 'scene-signature', speak: "Luca Atzori.", minDuration: 4500, cinematic: false }
];

const TOTAL_DURATION = SCENE_LIST.reduce((sum, s) => sum + s.minDuration, 0);

export default function ManifestoPlayer() {
  const playerRef = useRef(null);
  const canvasRef = useRef(null);
  const timelineFillRef = useRef(null);
  const audioToggleRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showReplay, setShowReplay] = useState(false);

  const stateRef = useRef({
    audioEnabled: true,
    bestVoice: null,
    sceneTimer: null,
    progressRaf: null,
    particles: [],
    particlesRaf: null,
    startTime: null,
    aborted: false
  });

  // Voice load
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      stateRef.current.bestVoice =
        voices.find(v => v.lang === 'it-IT' && v.name.includes('Google')) ||
        voices.find(v => v.lang === 'it-IT' && v.name.includes('Alice')) ||
        voices.find(v => v.lang === 'it-IT' && v.localService === false) ||
        voices.find(v => v.lang === 'it-IT') ||
        voices.find(v => v.lang.startsWith('it'));
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stateRef.current.aborted = true;
      if (stateRef.current.sceneTimer) clearTimeout(stateRef.current.sceneTimer);
      if (stateRef.current.progressRaf) cancelAnimationFrame(stateRef.current.progressRaf);
      if (stateRef.current.particlesRaf) cancelAnimationFrame(stateRef.current.particlesRaf);
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function initParticles() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = playerRef.current.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const count = Math.floor(canvas.width / 40);
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15 - 0.05,
        opacity: Math.random() * 0.5 + 0.1,
        twinkle: Math.random() * Math.PI * 2
      });
    }
    stateRef.current.particles = arr;
  }

  function drawParticles() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const tick = () => {
      if (stateRef.current.aborted) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stateRef.current.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.twinkle += 0.02;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const tw = (Math.sin(p.twinkle) + 1) / 2;
        const op = p.opacity * (0.4 + tw * 0.6);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 165, 112, ${op})`;
        ctx.shadowColor = 'rgba(201, 165, 112, 0.8)';
        ctx.shadowBlur = p.size * 4;
        ctx.fill();
      });
      stateRef.current.particlesRaf = requestAnimationFrame(tick);
    };
    tick();
  }

  function speak(text) {
    return new Promise((resolve) => {
      if (!stateRef.current.audioEnabled || !text || typeof window === 'undefined' || !window.speechSynthesis) {
        resolve();
        return;
      }
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'it-IT';
        if (stateRef.current.bestVoice) u.voice = stateRef.current.bestVoice;
        u.rate = 0.92;
        u.pitch = 1.0;
        u.volume = 1.0;
        let resolved = false;
        u.onend = () => { if (!resolved) { resolved = true; resolve(); } };
        u.onerror = () => { if (!resolved) { resolved = true; resolve(); } };
        window.speechSynthesis.speak(u);
        setTimeout(() => { if (!resolved) { resolved = true; resolve(); } }, text.length * 100 + 4000);
      } catch (e) {
        resolve();
      }
    });
  }

  async function playScene(index) {
    if (stateRef.current.aborted) return;
    if (index >= SCENE_LIST.length) {
      endVideo();
      return;
    }
    const scene = SCENE_LIST[index];
    const player = playerRef.current;
    if (!player) return;

    // Clear previous active
    player.querySelectorAll('.mp-scene').forEach(s => s.classList.remove('active'));

    // Cinematic letterbox
    if (scene.cinematic) player.classList.add('cinematic');
    else player.classList.remove('cinematic');

    // Activate current
    const el = player.querySelector('.mp-' + scene.selector);
    if (el) el.classList.add('active');

    // Parallel: speech + min duration
    const speakPromise = scene.speak ? speak(scene.speak) : Promise.resolve();
    const minTimePromise = new Promise(res => {
      stateRef.current.sceneTimer = setTimeout(res, scene.minDuration);
    });

    await Promise.all([speakPromise, minTimePromise]);

    // breath
    await new Promise(r => setTimeout(r, 250));

    if (stateRef.current.aborted) return;
    playScene(index + 1);
  }

  function trackProgress() {
    const tick = () => {
      if (stateRef.current.aborted) return;
      const elapsed = performance.now() - stateRef.current.startTime;
      const pct = Math.min(elapsed / TOTAL_DURATION, 1) * 100;
      if (timelineFillRef.current) {
        timelineFillRef.current.style.width = pct + '%';
      }
      stateRef.current.progressRaf = requestAnimationFrame(tick);
    };
    tick();
  }

  function play() {
    if (isPlaying) return;
    setIsPlaying(true);
    setShowReplay(false);
    stateRef.current.startTime = performance.now();
    stateRef.current.aborted = false;
    setTimeout(() => {
      initParticles();
      drawParticles();
      trackProgress();
      playScene(0);
    }, 50);
  }

  function endVideo() {
    setIsPlaying(false);
    if (stateRef.current.sceneTimer) clearTimeout(stateRef.current.sceneTimer);
    if (stateRef.current.progressRaf) cancelAnimationFrame(stateRef.current.progressRaf);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (timelineFillRef.current) timelineFillRef.current.style.width = '100%';
    setTimeout(() => setShowReplay(true), 800);
  }

  function reset() {
    stateRef.current.aborted = true;
    if (stateRef.current.sceneTimer) clearTimeout(stateRef.current.sceneTimer);
    if (stateRef.current.progressRaf) cancelAnimationFrame(stateRef.current.progressRaf);
    if (stateRef.current.particlesRaf) cancelAnimationFrame(stateRef.current.particlesRaf);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setShowReplay(false);
    const player = playerRef.current;
    if (player) {
      player.querySelectorAll('.mp-scene').forEach(s => s.classList.remove('active'));
      player.classList.remove('cinematic');
    }
    if (timelineFillRef.current) timelineFillRef.current.style.width = '0%';
  }

  function handleReplay(e) {
    e.stopPropagation();
    reset();
    setTimeout(play, 250);
  }

  function handleCta(e) {
    e.stopPropagation();
    window.open(CANDIDATI_URL, '_blank', 'noopener,noreferrer');
  }

  function toggleAudio(e) {
    e.stopPropagation();
    stateRef.current.audioEnabled = !stateRef.current.audioEnabled;
    if (audioToggleRef.current) {
      audioToggleRef.current.classList.toggle('muted', !stateRef.current.audioEnabled);
    }
    if (!stateRef.current.audioEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  // Word delays for scene-phrase
  useEffect(() => {
    const phrase = playerRef.current?.querySelector('#mp-phrase1');
    if (phrase) {
      phrase.querySelectorAll('.word').forEach((w, i) => {
        w.style.animationDelay = (i * 0.16) + 's';
      });
    }
  }, []);

  return (
    <div
      ref={playerRef}
      className={`mp-player ${isPlaying ? 'playing' : ''}`}
    >
      {/* START OVERLAY */}
      {!isPlaying && !showReplay && (
        <div className="mp-start-overlay" onClick={play}>
          <div className="mp-start-inner">
            <div className="mp-start-meta">Un Manifesto</div>
            <div className="mp-start-title">"Cosa puoi aspettarti da un percorso con me, cosa no, e a chi non parlo."</div>
            <div className="mp-play-circle"></div>
            <div className="mp-start-hint">Tap per iniziare · Audio ON</div>
          </div>
        </div>
      )}

      {/* AMBIENT */}
      <canvas ref={canvasRef} className="mp-particles" />
      <div className="mp-light-beam"></div>
      <div className="mp-scanlines"></div>
      <div className="mp-scan-sweep"></div>

      {/* LETTERBOX */}
      <div className="mp-letterbox top"></div>
      <div className="mp-letterbox bottom"></div>

      {/* HUD */}
      <div className="mp-hud">
        <div className="mp-hud-tl"><span className="mp-rec-dot"></span>REC</div>
        <div className="mp-hud-tr">
          <div>LUCA ATZORI</div>
          <div ref={audioToggleRef} className="mp-audio-toggle" onClick={toggleAudio}>
            <span>AUDIO</span>
            <span className="mp-audio-icon"></span>
          </div>
        </div>
        <div className="mp-hud-bl">MANIFESTO<br /><span className="mp-hud-dim">CAPITOLO 01</span></div>
        <div className="mp-hud-br">LUGO · IT</div>
      </div>

      {/* STAGE */}
      <div className="mp-stage">

        <div className="mp-scene mp-scene-intro">
          <div className="mp-intro-line"></div>
          <div className="mp-intro-text">Un manifesto · Non un pitch</div>
        </div>

        <div className="mp-scene mp-scene-phrase">
          <div className="mp-phrase" id="mp-phrase1">
            <span className="word">Per</span> <span className="word">anni</span> <span className="word">ho</span> <span className="word">pensato</span><br />
            <span className="word">che</span> <span className="word"><em>guadagnare</em></span> <span className="word"><em>online</em></span><br />
            <span className="word">fosse</span> <span className="word">pubblicità</span> <span className="word">sospetta.</span>
          </div>
        </div>

        <div className="mp-scene mp-scene-reveal mp-scene-reveal-a">
          <div className="mp-label">Poi ho capito</div>
          <div className="mp-reveal-text">una cosa.</div>
        </div>

        <div className="mp-scene mp-scene-split">
          <div className="mp-line-a">Il problema non era l'online.</div>
          <div className="mp-line-b">Era il <em>metodo</em>.</div>
        </div>

        <div className="mp-scene mp-scene-negation">
          <div className="mp-neg-item mp-neg-1">Nessuna formula magica.</div>
          <div className="mp-neg-item mp-neg-2">Nessuna scorciatoia.</div>
          <div className="mp-neg-item mp-neg-3">Nessuna promessa di soldi facili.</div>
        </div>

        <div className="mp-scene mp-scene-reveal mp-scene-reveal-b">
          <div className="mp-label">Solo</div>
          <div className="mp-reveal-text">tre pilastri.</div>
        </div>

        <div className="mp-scene mp-scene-pillars">
          <div className="mp-pillar mp-pillar-1">
            <div className="mp-pillar-num">i.</div>
            <div className="mp-pillar-name">Metodo</div>
          </div>
          <div className="mp-pillar mp-pillar-2">
            <div className="mp-pillar-num">ii.</div>
            <div className="mp-pillar-name">Intelligenza<br />Artificiale</div>
          </div>
          <div className="mp-pillar mp-pillar-3">
            <div className="mp-pillar-num">iii.</div>
            <div className="mp-pillar-name">Automazioni</div>
          </div>
        </div>

        <div className="mp-scene mp-scene-manifesto mp-scene-mani-1">
          <div className="mp-mani-text">Costruire un'attività online</div>
        </div>

        <div className="mp-scene mp-scene-manifesto mp-scene-mani-2">
          <div className="mp-mani-text">non è una <em className="mp-glitch-word">promessa</em>.</div>
        </div>

        <div className="mp-scene mp-scene-manifesto mp-scene-mani-3">
          <div className="mp-mani-text">È un <em className="mp-mestiere-word">mestiere</em>.</div>
        </div>

        <div className="mp-scene mp-scene-cta">
          <div className="mp-cta-text">Se ti riconosci,<br />candidati a un <em>confronto</em>.</div>
          <div className="mp-cta-button" onClick={handleCta}>Compila la candidatura</div>
        </div>

        <div className="mp-scene mp-scene-signature">
          <div className="mp-sig-name">Luca Atzori</div>
          <div className="mp-sig-line"></div>
          <div className="mp-sig-tag">Imprenditore digitale</div>
        </div>

      </div>

      {/* TIMELINE */}
      <div className="mp-timeline"><div ref={timelineFillRef} className="mp-timeline-fill"></div></div>

      {/* REPLAY */}
      {showReplay && (
        <div className="mp-replay show">
          <div className="mp-replay-inner">
            <div className="mp-replay-text">Fine del manifesto</div>
            <button className="mp-replay-button" onClick={handleReplay}>Riguarda</button>
            <button className="mp-replay-button cta" onClick={handleCta}>Candidati ora →</button>
          </div>
        </div>
      )}
    </div>
  );
}
