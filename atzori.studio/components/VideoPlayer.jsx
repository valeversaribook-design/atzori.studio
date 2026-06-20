'use client';

/**
 * VideoPlayer — drop-in alternativo a ManifestoPlayer.
 *
 * Usalo quando avrai caricato i file in /public/vsl/ (vedi public/vsl/README.md).
 *
 * Per attivarlo, in app/page.jsx sostituisci:
 *   import ManifestoPlayer from '@/components/ManifestoPlayer';
 *   <ManifestoPlayer />
 * con:
 *   import VideoPlayer from '@/components/VideoPlayer';
 *   <VideoPlayer />
 */

import { useRef, useState } from 'react';

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  function handlePlay() {
    if (videoRef.current) {
      videoRef.current.play();
      setStarted(true);
    }
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto',
        aspectRatio: '16/9',
        position: 'relative',
        border: '1px solid rgba(201, 165, 112, 0.3)',
        boxShadow: '0 0 80px rgba(201, 165, 112, 0.08)',
        background: '#0A1628',
        overflow: 'hidden',
        cursor: started ? 'default' : 'pointer'
      }}
      onClick={!started ? handlePlay : undefined}
    >
      <video
        ref={videoRef}
        controls={started}
        playsInline
        preload="metadata"
        poster="/vsl/poster.jpg"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      >
        <source src="/vsl/manifesto.webm" type="video/webm" />
        <source src="/vsl/manifesto.mp4" type="video/mp4" />
        <track
          kind="captions"
          src="/vsl/manifesto.vtt"
          srcLang="it"
          label="Italiano"
          default
        />
        Il tuo browser non supporta il tag video.
      </video>

      {!started && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(10,22,40,0.7) 0%, rgba(5,11,24,0.7) 100%)',
            zIndex: 2
          }}
        >
          <div
            style={{
              width: '96px',
              height: '96px',
              border: '1px solid #C9A570',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '22px solid #C9A570',
                borderTop: '14px solid transparent',
                borderBottom: '14px solid transparent',
                marginLeft: '6px'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
