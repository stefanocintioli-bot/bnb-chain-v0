'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './presentation.module.css';

const BNBChainPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const totalSlides = 13;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.code === 'Space') {
      e.preventDefault();
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      } else {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;

  // --- Count-up animation for slide 3 ---
  const STATS = [
    { target: 0.45, decimals: 2, prefix: '~',  suffix: 's'  },
    { target: 0.03, decimals: 2, prefix: '<$', suffix: ''   },
    { target: 11.8, decimals: 1, prefix: '$',  suffix: 'B'  },
    { target: 32,   decimals: 0, prefix: '',   suffix: 'M+' },
    { target: 4.6,  decimals: 1, prefix: '',   suffix: 'M+' },
    { target: 100,  decimals: 0, prefix: '',   suffix: '%'  },
  ];

  const [countValues, setCountValues] = useState(STATS.map(() => 0));
  const rafRef = useRef<number | null>(null);

  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

  const runCountUp = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    setCountValues(STATS.map(() => 0));
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);

      setCountValues(STATS.map((s) => s.target * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCountValues(STATS.map((s) => s.target));
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (currentSlide === 2) {
      runCountUp();
    }
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [currentSlide, runCountUp]);

  const formatStat = (index: number) => {
    const { target, decimals, prefix, suffix } = STATS[index];
    const raw = countValues[index];
    const display = raw >= target ? target.toFixed(decimals) : raw.toFixed(decimals);
    return `${prefix}${display}${suffix}`;
  };

  // Logo SVG component
  const Logo = () => (
    <svg width="110" height="auto" viewBox="0 0 319 56" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <g clipPath="url(#a)">
        <mask id="b" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="319" height="56">
          <path d="M319 0H0v56h319V0Z" fill="#fff" />
        </mask>
        <g mask="url(#b)">
          <path d="M9.342 8.578 24.203 0l14.86 8.578-5.463 3.168L24.203 6.338l-9.397 5.408-5.464-3.168ZM39.063 19.395l-5.463-3.169-9.397 5.409-9.397-5.409-5.464 3.169v6.337l9.397 5.409v10.817l5.463 3.169 5.464-3.169V25.733l9.397-5.409v-6.929ZM39.063 36.55v-6.337l-5.463 3.169v6.337l5.463-3.169Zm3.88 2.24-9.397 5.409v6.337l14.86-8.577V24.804l-5.463 3.169V38.79ZM37.479 13.986l5.464 3.169v6.337l5.463-3.169v-6.337l-5.463-3.169-5.464 3.169ZM18.74 46.494v6.337L24.203 56l5.463-3.169v-6.337l-5.463 3.169-5.463-3.169ZM9.342 36.55l5.464 3.169v-6.337l-5.464-3.169V36.55Zm9.397-22.564 5.464 3.169 5.463-3.169-5.463-3.169-5.464 3.169ZM5.463 17.155l5.464-3.169-5.464-3.168L0 13.986v6.337l5.463 3.169v-6.337ZM5.463 27.973 0 24.804V41.96l14.86 8.577v-6.337L5.463 38.79V27.973Z" fill="#fff" />
          <path d="M91.478 35.143v-.089c0-4.185-2.226-6.278-5.832-7.658 2.226-1.246 4.096-3.205 4.096-6.723v-.089c0-4.897-3.918-8.058-10.285-8.058H64.987v31.166H79.813c7.035 0 11.665-2.85 11.665-8.549Zm-8.548-13.312c0 2.315-1.914 3.295-4.942 3.295h-6.322v-6.59h6.767c2.894 0 4.497 1.158 4.497 3.206v.089Zm1.736 12.466c0 2.315-1.825 3.384-4.853 3.384h-8.147v-6.857h8.236c3.517 0 5.075 1.291 5.075 3.384v.089h-.311ZM125.256 43.692V12.526h-6.767v19.189L103.886 12.526h-6.323v31.166h6.768V23.879l15.093 19.813h5.832ZM159.674 35.143v-.089c0-4.185-2.226-6.278-5.833-7.658 2.226-1.246 3.896-3.205 3.896-6.723v-.089c0-4.897-3.918-8.058-10.285-8.058H133.183v31.166H148.009c7.034 0 11.665-2.85 11.665-8.549Zm-8.548-13.312c0 2.315-1.915 3.295-4.942 3.295h-6.323v-6.59h6.768c2.894 0 4.497 1.158 4.497 3.206v.089Zm1.736 12.466c0 2.315-1.826 3.384-4.853 3.384h-8.148v-6.857h7.925c3.517 0 5.076 1.291 5.076 3.384v.089ZM200.996 38.186l-3.517-3.562c-2.671 2.493-5.12 3.84-8.413 3.84-6.59 0-11.354-5.232-11.354-12.176v-.089c0-6.944 4.675-12.176 11.354-12.176 3.206 0 5.832 1.291 8.325 3.74l2.495-4.541c-2.937-2.672-6.055-4.363-10.732-4.363-10.909 0-18.72 8.15-18.72 17.429v.089c0 9.368 7.81 17.429 18.72 17.429 4.586 0 7.879-1.747 10.82-4.452Z" fill="#fff" />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h319v56H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );

  // Blockchain-style diffused shapes - hexagons and glowing nodes
  const GeometricShapes = ({ intensity = 'normal' }: { intensity?: 'high' | 'normal' | 'low' }) => {
    // type: 'hex' = hexagon, 'node' = glowing circle node, 'blob' = soft diffused blob
    // All shapes are heavily blurred for a diffused atmospheric effect

    const normalShapes = [
      { size: 200, left: 5,   top: 10,  type: 'hex',  color: 'rgba(240,185,11,0.12)' },
      { size: 120, left: 80,  top: 5,   type: 'node', color: 'rgba(240,185,11,0.15)' },
      { size: 280, left: 75,  top: 55,  type: 'hex',  color: 'rgba(255,255,255,0.06)' },
      { size: 100, left: 2,   top: 70,  type: 'node', color: 'rgba(240,185,11,0.10)' },
      { size: 160, left: 45,  top: 80,  type: 'blob', color: 'rgba(255,255,255,0.05)' },
    ];

    const lowShapes = [
      { size: 180, left: 85,  top: 8,   type: 'hex',  color: 'rgba(240,185,11,0.08)' },
      { size: 140, left: 5,   top: 55,  type: 'node', color: 'rgba(255,255,255,0.06)' },
      { size: 120, left: 50,  top: 75,  type: 'blob', color: 'rgba(240,185,11,0.06)' },
    ];

    const highShapes = [
      { size: 350, left: 65,  top: -10, type: 'hex',  color: 'rgba(240,185,11,0.18)' },
      { size: 250, left: -5,  top: 40,  type: 'hex',  color: 'rgba(240,185,11,0.14)' },
      { size: 180, left: 80,  top: 60,  type: 'node', color: 'rgba(240,185,11,0.20)' },
      { size: 140, left: 20,  top: 75,  type: 'node', color: 'rgba(255,255,255,0.12)' },
      { size: 300, left: 50,  top: 5,   type: 'blob', color: 'rgba(255,255,255,0.08)' },
      { size: 200, left: 10,  top: 10,  type: 'node', color: 'rgba(240,185,11,0.15)' },
      { size: 280, left: 70,  top: 80,  type: 'hex',  color: 'rgba(240,185,11,0.12)' },
      { size: 160, left: 35,  top: 50,  type: 'blob', color: 'rgba(255,255,255,0.06)' },
    ];

    const dataset = intensity === 'high' ? highShapes : intensity === 'low' ? lowShapes : normalShapes;

    return (
      <>
        {dataset.map((data, i) => {
          const className = data.type === 'hex' 
            ? styles.hexagon 
            : data.type === 'node' 
              ? styles.node 
              : styles.geometric;

          return (
            <div
              key={i}
              className={className}
              style={{
                width: `${data.size}px`,
                height: `${data.size}px`,
                left: `${data.left}%`,
                top: `${data.top}%`,
                backgroundColor: data.color,
                color: data.type === 'node' ? data.color : undefined,
              }}
            />
          );
        })}
      </>
    );
  };

  // Social Icon component
  const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" title={label} className={styles.socialIcon}>
      {children}
    </a>
  );

  const slides = [
    // SLIDE 1 - COVER
    <div key="1" className={`${styles.slide} ${styles.coverSlide}`}>
      <GeometricShapes intensity="high" />
      <div className={styles.slideContent}>
        <div className={styles.coverTop}>
          <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.2 14.3L40.3 0L65.4 14.3L52.8 22.1L40.3 10.6L15.2 22.1L15.2 14.3Z"
              fill="var(--gold)"
            />
          </svg>
          <h2 style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1.2rem)', marginTop: '12px', letterSpacing: '0.15em' }}>
            BNB CHAIN
          </h2>
        </div>

        <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', marginTop: '48px', color: 'var(--gold)', textAlign: 'center' }}>
          DESCUBRIENDO BNB CHAIN
        </h1>

        <p style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)', marginTop: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Tu puerta de entrada al mundo Web3
        </p>

        <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
          <p style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(0.8rem, 1vw, 1rem)', fontWeight: 700 }}>
            Stefano Cintioli
          </p>
          <p style={{ fontSize: '0.8rem', marginTop: '4px', color: 'var(--gold)' }}>
            LatAm Community Lead, BNB Chain
          </p>
        </div>
      </div>
    </div>,

    // SLIDE 2 - EL ECOSISTEMA BNB
    <div key="2" className={styles.slide}>
      <GeometricShapes intensity="low" />
      <div className={styles.slideContent}>
        <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '40px', fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
          No es una sola cadena. Es un ecosistema.
        </h2>

        <div className={styles.grid2x2}>
          {[
            { icon: '🟡', title: 'BNB Smart Chain (BSC)', desc: 'La capa principal. EVM compatible, alta velocidad, bajo costo.' },
            { icon: '⚡', title: 'opBNB', desc: 'La capa 2. Transacciones masivas a costo casi cero.' },
            { icon: '🗄️', title: 'BNB Greenfield', desc: 'Almacenamiento descentralizado de datos.' },
            { icon: '🛡️', title: 'AvengerDAO', desc: 'El sistema de seguridad del ecosistema.' },
          ].map((item, i) => (
            <div key={i} className={styles.card}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-syne)', fontWeight: 700, marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '0.1em' }}>
          TODO CONECTADO. TODO COMPATIBLE.
        </p>
      </div>
    </div>,

    // SLIDE 3 - POR QUÉ BNB CHAIN
    <div key="3" className={styles.slide}>
      <GeometricShapes intensity="normal" />
      <div className={styles.slideContent}>
        <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '40px', fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
          Los números hablan solos.
        </h2>

        <div className={styles.grid2x3}>
          {[
            { label: 'BLOCK TIME',      sub: 'vs 12s en Ethereum' },
            { label: 'GAS PROMEDIO',    sub: 'por transacción'    },
            { label: 'TVL DeFi',        sub: 'en protocolos DeFi' },
            { label: 'USUARIOS ACTIVOS',sub: 'mensuales'          },
            { label: 'TX DIARIAS',      sub: 'en BSC'             },
            { label: 'EVM COMPATIBLE',  sub: 'mismo Solidity'     },
          ].map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                {stat.label}
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 800,
                  color: 'var(--gold)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {formatStat(i)}
              </p>
              <p style={{ fontSize: '0.75rem', marginTop: '4px', color: 'var(--gold)' }}>{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // SLIDE 4 - PARA EL DEVELOPER
    <div key="4" className={styles.slide}>
      <GeometricShapes intensity="normal" />
      <div className={styles.slideContent}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', marginBottom: '24px', fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
              Para el Developer
            </h2>
            <ul style={{ listStyle: 'none', gap: '16px', display: 'flex', flexDirection: 'column' }}>
              {['Sin curva de aprendizaje nueva', 'Fees 100x más bajos que mainnet Ethereum', 'Acceso a 32M+ usuarios desde el día 1'].map(
                (item, i) => (
                  <li key={i} style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
                    • {item}
                  </li>
                )
              )}
            </ul>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                color: 'var(--gold)',
                lineHeight: 1.4,
              }}
            >
              Si compila en Ethereum, se deploya en BNB Chain.
            </p>
            <p style={{ fontSize: '0.9rem', marginTop: '16px', color: 'var(--text-muted)' }}>
              Mismo Solidity. Mismo Foundry. Solo cambiás el RPC.
            </p>
          </div>
        </div>
      </div>
    </div>,

    // SLIDE 5 - IA + WEB3
    <div key="5" className={styles.slide}>
      <GeometricShapes intensity="normal" />
      <div className={styles.slideContent}>
        <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '32px', fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
          La cadena con más actividad de agentes autónomos.
        </h2>

        <div style={{ background: 'rgba(240, 185, 11, 0.08)', borderLeft: '4px solid var(--gold)', padding: '16px 20px', borderRadius: '0 8px 8px 0', marginBottom: '32px' }}>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
            El 35% de la actividad actual de la red es generada por agentes autónomos vía ERC-8183.
          </p>
        </div>

        <div className={styles.grid1x3}>
          {[
            { title: 'MCP + BNB Chain Skills', desc: 'Conectá cualquier LLM a contratos de BNB Chain en minutos.' },
            { title: 'BNBAgent SDK (ERC-8183)', desc: 'Registrá agentes onchain con identidad, trabajo y pago.' },
            { title: 'ERC-8004', desc: 'Registro descentralizado. Tu agente tiene dirección, reputación e historial.' },
          ].map((item, i) => (
            <div key={i} className={styles.card}>
              <h3 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-syne)', fontWeight: 700, marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // SLIDE 6 - QUÉ PODÉS CONSTRUIR
    <div key="6" className={styles.slide}>
      <GeometricShapes intensity="normal" />
      <div className={styles.slideContent}>
        <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '40px', fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
          Ideas concretas para el track de IA + Web3
        </h2>

        <div className={styles.grid1x3}>
          {[
            { emoji: '📈', title: 'Trading & Agentes', desc: 'Bot que monitorea liquidez en PancakeSwap y rebalancea portafolios con límites de riesgo.' },
            { emoji: '💬', title: 'UX para Usuarios Normales', desc: 'Bot en Telegram: el usuario escribe "Invertí 50 USDC en BNB" y el agente MCP arma todo.' },
            { emoji: '🤖', title: 'DCA Inteligente', desc: 'Agente que frena si la volatilidad es alta y saltea si el gas está caro.' },
          ].map((item, i) => (
            <div key={i} className={styles.tallCard}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{item.emoji}</div>
              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-syne)', fontWeight: 700, marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // SLIDE 7 - PROGRAMAS DEL ECOSISTEMA
    <div key="7" className={styles.slide}>
      <GeometricShapes intensity="normal" />
      <div className={styles.slideContent}>
        <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '40px', fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
          BNB Chain no solo es infraestructura. Es comunidad.
        </h2>

        <div className={styles.grid2x2}>
          {[
            { emoji: '🏆', title: 'MVB (Most Valuable Builder)', desc: 'Incubación, funding y acceso a inversores del ecosistema.' },
            { emoji: '🔬', title: 'YZi Labs EASY Residency', desc: 'Para proyectos early-stage con tracción real.' },
            { emoji: '🛠️', title: 'Hackathons', desc: 'BNB Chain co-patrocina hackathons globales y regionales.' },
            { emoji: '💰', title: 'Socios Institucionales', desc: 'BlackRock, CMB International, Franklin Templeton.' },
          ].map((item, i) => (
            <div key={i} className={styles.card}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.emoji}</div>
              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-syne)', fontWeight: 700, marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // SLIDE 8 - LATAM COMMUNITY COLLAGE
    <div key="8" className={styles.slide}>
      <GeometricShapes intensity="normal" />
      <div className={styles.collageContainer}>
        <div className={styles.photoGrid}>
          <div className={styles.photoWrapper} style={{ gridArea: 'tl' }}>
            <img
              src="https://raw.githubusercontent.com/stefanocintioli-bot/bnb-chain-v0/main/events/crecimiento/Crecimiento%20Workshop.jpeg"
              alt="Crecimiento Workshop"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <span className={styles.photoTag}>CRECIMIENTO WORKSHOP</span>
          </div>
          <div className={styles.photoWrapper} style={{ gridArea: 'tr' }}>
            <img
              src="https://raw.githubusercontent.com/stefanocintioli-bot/bnb-chain-v0/main/events/vendimia/Vendimia.jpg"
              alt="Vendimia Hackathon"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <span className={styles.photoTag}>VENDIMIA HACKATHON</span>
          </div>
          <div className={styles.photoWrapper} style={{ gridArea: 'bl' }}>
            <img
              src="https://raw.githubusercontent.com/stefanocintioli-bot/bnb-chain-v0/main/events/university-tour/Univeersity%20Tour%20Groupal%20Photo.jpg"
              alt="University Tour"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <span className={styles.photoTag}>UNIVERSITY TOUR</span>
          </div>
          <div className={styles.photoWrapper} style={{ gridArea: 'br' }}>
            <img
              src="https://raw.githubusercontent.com/stefanocintioli-bot/bnb-chain-v0/main/events/vendimia/Vendimia%20Buidlers.jpg"
              alt="Community Building"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <span className={styles.photoTag}>COMMUNITY BUILDING</span>
          </div>
        </div>

        <h2 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontFamily: 'var(--font-syne)', fontWeight: 800, zIndex: 10, textShadow: '0 2px 20px rgba(0,0,0,0.8)', maxWidth: '500px' }}>
          Lo que ya está pasando en LatAm
        </h2>
      </div>
    </div>,

    // SLIDE 9 - CRECIMIENTO POP UP
    <div key="9" className={styles.slide}>
      <GeometricShapes intensity="normal" />
      <div className={styles.slideContent}>
        <div style={{ display: 'grid', gridTemplateColumns: '60% 40%', gap: '40px', alignItems: 'center' }}>
          <div>
            <span className={styles.goldPill}>CRECIMIENTO POP UP</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginTop: '16px', marginBottom: '16px', fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
              Workshop técnico para founders en LatAm.
            </h2>
            <p style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-syne)', fontWeight: 800, color: 'var(--gold)', marginTop: '16px' }}>
              +20 founders participaron.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              5+ en conversaciones activas con nuestro equipo de BD.
            </p>
          </div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '400px' }}>
            <img
              src="https://raw.githubusercontent.com/stefanocintioli-bot/bnb-chain-v0/main/events/crecimiento/Crecimiento%20Workshop.jpeg"
              alt="Crecimiento Workshop"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </div>,

    // SLIDE 10 - VENDIMIA HACKATHON
    <div key="10" className={styles.slide}>
      <GeometricShapes intensity="normal" />
      <div className={styles.slideContent}>
        <div style={{ display: 'grid', gridTemplateColumns: '60% 40%', gap: '40px', alignItems: 'center' }}>
          <div>
            <span className={styles.goldPill}>VENDIMIATECH HACKATHON</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginTop: '16px', marginBottom: '16px', fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
              Partners principales del track IA + Web3.
            </h2>
            <p style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-syne)', fontWeight: 800, color: 'var(--gold)', marginTop: '16px' }}>
              +10 proyectos. 3 ganadores.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              El 1er lugar ya conversa con nuestro equipo de IA y Agentes.
            </p>
          </div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '400px' }}>
            <img
              src="https://raw.githubusercontent.com/stefanocintioli-bot/bnb-chain-v0/main/events/vendimia/Vendimia.jpg"
              alt="Vendimia Hackathon"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </div>,

    // SLIDE 11 - UNIVERSITY TOUR
    <div key="11" className={styles.slide}>
      <GeometricShapes intensity="normal" />
      <div className={styles.slideContent}>
        <div style={{ display: 'grid', gridTemplateColumns: '60% 40%', gap: '40px', alignItems: 'center' }}>
          <div>
            <span className={styles.goldPill}>BINANCE UNIVERSITY TOUR — UTN</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginTop: '16px', marginBottom: '16px', fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
              Spreading the word en universidades de LatAm.
            </h2>
            <p style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-syne)', fontWeight: 800, color: 'var(--gold)', marginTop: '16px' }}>
              +100 estudiantes.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              La próxima generación de builders de la región.
            </p>
          </div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '400px' }}>
            <img
              src="https://raw.githubusercontent.com/stefanocintioli-bot/bnb-chain-v0/main/events/university-tour/Univeersity%20Tour%20Groupal%20Photo.jpg"
              alt="University Tour"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </div>,

    // SLIDE 12 - RECURSOS
    <div key="12" className={styles.slide}>
      <GeometricShapes intensity="normal" />
      <div className={styles.slideContent}>
        <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '40px', fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
          Todo lo que necesitás para arrancar hoy.
        </h2>

        <div className={styles.grid2x3}>
          {[
            { emoji: '🚰', title: 'Testnet Faucet', desc: 'Gas gratis para testnet', href: 'https://testnet.bnbchain.org/faucet-smart' },
            { emoji: '🔍', title: 'BscScan Testnet', desc: 'Explorador de transacciones', href: 'https://testnet.bscscan.com' },
            { emoji: '📄', title: 'Docs Oficiales', desc: 'docs.bnbchain.org', href: 'https://docs.bnbchain.org' },
            { emoji: '🛠️', title: 'BNB Chain Skills (MCP)', desc: 'Conectá tu agente a BNB Chain', href: 'https://docs.bnbchain.org/showcase/mcp/skills/' },
            { emoji: '🤖', title: 'BNBAgent SDK', desc: 'github.com/bnb-chain/bnbagent-sdk', href: 'https://github.com/bnb-chain/bnbagent-sdk' },
            { emoji: '⛓️', title: 'ChainList RPC', desc: 'BSC Testnet RPC', href: 'https://chainlist.org' },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resourceCard}
            >
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.emoji}</div>
              <h3 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-syne)', fontWeight: 700, marginBottom: '4px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>,

// SLIDE 13 - BUILD N BUILD
  <div key="13" className={`${styles.slide} ${styles.ctaSlide}`}>
  <GeometricShapes intensity="high" />
  <div className={styles.slideContent} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontFamily: 'var(--font-syne)', fontWeight: 800, color: 'var(--gold)', whiteSpace: 'nowrap' }}>
  BUILD N BUILD
  </h1>
        <p style={{ fontSize: '1rem', letterSpacing: '0.25em', marginTop: '8px' }}>
          CONSTRUYE WEB3 CON BNB CHAIN
        </p>

        <img
          src="https://raw.githubusercontent.com/stefanocintioli-bot/bnb-chain-v0/main/events/QR/QR.png"
          alt="Seguinos en @BNBChainLatAM"
          loading="lazy"
          style={{ width: '200px', height: '200px', borderRadius: '8px', margin: '32px auto 12px auto', display: 'block' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '12px' }}>
          Seguinos en X
        </p>

        <div className={styles.socialLinks}>
          <SocialIcon href="https://x.com/BNBChainLatAM" label="X">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </SocialIcon>
          <SocialIcon href="https://t.me/BNBChainES" label="Telegram">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </SocialIcon>
          <SocialIcon href="https://discord.gg/bnbchain" label="Discord">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.015.04.036.05a19.91 19.91 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .036-.05c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
          </SocialIcon>
          <SocialIcon href="https://docs.bnbchain.org" label="Docs">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
            </svg>
          </SocialIcon>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className={styles.presentationContainer} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {/* Render all slides */}
      <div className={styles.slidesWrapper}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={styles.slideContainer}
            style={{
              opacity: i === currentSlide ? 1 : 0,
              pointerEvents: i === currentSlide ? 'auto' : 'none',
              transform: `translateX(${(i - currentSlide) * 100}%)`,
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Logo */}
      <div className={styles.logo}>
        <Logo />
      </div>

      {/* Watermark */}
      <div className={styles.watermark}>BUILD WEB3 WITH BNB CHAIN</div>

      {/* Slide Counter */}
      <div className={styles.slideCounter}>
        {String(currentSlide + 1).padStart(2, '0')} / 13
      </div>

      {/* Progress Bar */}
      <div
        className={styles.progressBar}
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default BNBChainPresentation;
