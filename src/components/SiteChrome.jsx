import { useEffect, useState } from "react";
import { siteData } from "../data/siteData";

export function Header({ currentPage }) {
  return (
    <header>
      <nav className="navbar" aria-label="主导航">
        <div className="logo">
          <h1>All For Yujin</h1>
        </div>
        <div className="nav-links">
          {siteData.nav.map((item) => (
            <a
              href={item.href}
              className={item.href === currentPage ? "active" : undefined}
              aria-current={item.href === currentPage ? "page" : undefined}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  const { footer } = siteData;

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>{footer.aboutTitle}</h3>
          <p>{footer.aboutText}</p>
        </div>
        <div className="footer-section">
          <h3>{footer.linksTitle}</h3>
          <ul>
            {footer.links.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{footer.copyright}</p>
      </div>
    </footer>
  );
}

function InteractiveEffects() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      setScrollProgress(Math.min(progress, 1));
      setShowBackToTop(window.scrollY > 480);
    };

    const handlePointerMove = (event) => {
      const card = event.target.closest(
        ".link-card, .video-item, .info-item, .timeline-item",
      );
      if (!card) return;

      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
      card.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    const revealItems = document.querySelectorAll(
      ".link-card, .video-item, .info-item, .timeline-item",
    );
    revealItems.forEach((item) => {
      item.classList.add("reveal-ready");
      revealObserver.observe(item);
    });

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateScroll);
      document.removeEventListener("pointermove", handlePointerMove);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
      <button
        type="button"
        className={`back-to-top${showBackToTop ? " is-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="返回顶部"
      >
        ↑
      </button>
    </>
  );
}

export function PageLayout({ currentPage, children }) {
  return (
    <>
      <InteractiveEffects />
      <Header currentPage={currentPage} />
      {children}
      <Footer />
    </>
  );
}
