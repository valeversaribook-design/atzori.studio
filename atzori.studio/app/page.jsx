import Image from 'next/image';
import Link from 'next/link';
import VideoPlayer from '@/components/VideoPlayer';
import { CANDIDATI_URL } from '@/lib/config';

export default function Home() {
  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <Link href="/" className="nav-logo">Luca <span>Atzori</span></Link>
        <a href={CANDIDATI_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
          Candidati
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-coords">
            CAPITOLO 01<br />
            LUGO · <span>IT</span><br />
            MANIFESTO · <span>EDIZIONE I</span>
          </div>
          <h1>Costruire un'attività online<br />non è una <em>promessa</em>.<br />È un <em>mestiere</em>.</h1>
          <p>Documento un percorso fatto di metodo, intelligenza artificiale e automazioni. Niente scorciatoie, niente certezze vendute a chi non le ha mai cercate. Solo il lavoro reale che serve per costruire qualcosa che resta.</p>
          <a href={CANDIDATI_URL} target="_blank" rel="noopener noreferrer" className="cta-primary">
            Candidati a un confronto
          </a>
        </div>
      </section>

      {/* CHI SONO */}
      <section className="section">
        <div className="container">
          <div className="section-marker">02 — Chi sono</div>
          <div className="chi-grid">
            <div className="chi-portrait">
              <Image
                src="/profilo.png"
                alt="Luca Atzori"
                fill
                sizes="(max-width: 900px) 320px, 380px"
                style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                priority
              />
            </div>
            <div className="chi-text">
              <h2>Imprenditore digitale, non venditore di sogni.</h2>
              <p>Mi chiamo <strong>Luca Atzori</strong>. Costruisco attività online da oltre un decennio e accompagno chi vuole farlo seriamente: con un metodo, con strumenti che amplificano il tempo invece di bruciarlo, con una direzione chiara da seguire ogni giorno.</p>
              <p>Quello che vedi qui — i social, il manifesto, il modo di parlare — è il riflesso di un sistema costruito negli anni, non un format pensato per convincerti in fretta. Se sei qui per cercare una scorciatoia, ho poco da offrirti. Se sei qui per imparare un mestiere, possiamo parlare.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VSL */}
      <section className="video-section">
        <div className="container">
          <div className="section-marker center">03 — Il manifesto in video</div>
          <div className="video-wrapper">
            <VideoPlayer />
            <p className="video-caption">"Cosa puoi aspettarti da un percorso con me, cosa no, e a chi non parlo."</p>
            <p className="video-meta">CIRCA 50 SECONDI · NESSUN HYPE</p>
          </div>
        </div>
      </section>

      {/* METODO */}
      <section className="section">
        <div className="container">
          <div className="section-marker">04 — Il metodo</div>
          <div className="metodo-header">
            <h2>Tre pilastri. Nessuna formula magica.</h2>
            <p>Non c'è un segreto, c'è una struttura. Tre componenti che, messi a sistema con disciplina, producono risultati replicabili.</p>
          </div>
          <div className="metodo-grid">
            <div className="metodo-card">
              <div>
                <div className="metodo-num">i.</div>
                <div className="metodo-label">Metodo</div>
                <div className="metodo-title">Un sistema chiaro per risultati replicabili.</div>
              </div>
              <p className="metodo-text">Una sequenza di passi definita, misurabile, condivisibile. Non un'ispirazione: una mappa.</p>
            </div>
            <div className="metodo-card">
              <div>
                <div className="metodo-num">ii.</div>
                <div className="metodo-label">Intelligenza Artificiale</div>
                <div className="metodo-title">Strumenti che amplificano il tempo.</div>
              </div>
              <p className="metodo-text">L'AI non sostituisce il pensiero, lo moltiplica. Usata bene, comprime mesi di lavoro in giorni.</p>
            </div>
            <div className="metodo-card">
              <div>
                <div className="metodo-num">iii.</div>
                <div className="metodo-label">Automazioni</div>
                <div className="metodo-title">Processi che lavorano mentre vivi.</div>
              </div>
              <p className="metodo-text">Sistemi che girano da soli, ti restituiscono ore, e ti permettono di concentrarti su ciò che conta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="section-marker">05 — Domande dirette</div>
          <div className="metodo-header">
            <h2>Le risposte che meritano di essere date prima.</h2>
          </div>
          <div className="faq-wrap">
            <div className="faq-item">
              <h3 className="faq-q">Cosa fai esattamente?</h3>
              <p className="faq-a">Costruisco e accompagno persone nella costruzione di attività online. Lavoro su metodo, strumenti AI e automazioni applicate a contesti reali, non su template generici.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-q">Quanto tempo serve per vedere risultati?</h3>
              <p className="faq-a">Dipende dal punto di partenza. Non vendo orizzonti accelerati. Quello che posso dirti è che un percorso serio richiede mesi, non settimane, e disciplina quotidiana, non slanci.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-q">Cosa non posso aspettarmi?</h3>
              <p className="faq-a">Soldi facili, automatismi che fanno tutto al posto tuo, promesse di indipendenza in 30 giorni. Se cerchi questo, esistono altri che te lo vendono.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-q">A chi NON parli?</h3>
              <p className="faq-a">A chi cerca scorciatoie, a chi vuole risultati senza investire tempo, a chi pensa che un corso o un tool risolvano la mancanza di una direzione.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta" id="contatto">
        <div className="container">
          <h2>Se ti riconosci in questa visione,<br /><em>candidati a un confronto</em>.</h2>
          <p>Un primo scambio per capirci. Senza obblighi, senza copioni. Rispondo personalmente entro 48 ore.</p>
          <a href={CANDIDATI_URL} target="_blank" rel="noopener noreferrer" className="cta-primary">
            Compila la candidatura
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="container">
        <div className="footer">
          <div className="footer-left">
            <div className="name">Luca Atzori</div>
            <div className="role">Imprenditore digitale</div>
          </div>
          <div className="footer-right">
            <a href="https://www.linkedin.com/in/lucaatzori/" target="_blank" rel="noopener noreferrer">LinkedIn</a> ·{' '}
            <a href="https://x.com/lucaatzori_" target="_blank" rel="noopener noreferrer">X</a><br />
            <a href="mailto:hello@lucaatzori.it">hello@lucaatzori.it</a>
          </div>
          <div className="footer-rev">
            <span>© {new Date().getFullYear()} LUCA ATZORI</span>
            <span>MANIFESTO · CAPITOLO 01</span>
          </div>
        </div>
      </footer>
    </>
  );
}
