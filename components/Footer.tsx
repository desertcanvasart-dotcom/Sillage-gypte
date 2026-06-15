import Link from "next/link";
import { site, primaryNav, footerExtraNav } from "@/data/site";

const footerExplore = [...primaryNav, ...footerExtraNav];

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="footer-logo">{site.name}</p>
            <p className="footer-desc">{site.description}</p>
            <div className="footer-social" aria-label="Social media links">
              <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href={site.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href={site.social.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <p className="footer-col-title">Explore</p>
            <ul className="footer-links" role="list">
              {footerExplore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/plan">Plan Your Journey</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Contact</p>
            <address>
            <a className="footer-contact-item" href={`mailto:${site.email}`}>
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M1 3.5A1.5 1.5 0 012.5 2h9A1.5 1.5 0 0113 3.5v7A1.5 1.5 0 0111.5 12h-9A1.5 1.5 0 011 10.5v-7z" />
                <path d="M1 3.5L7 8l6-4.5" strokeLinecap="round" />
              </svg>
              {site.email}
            </a>
            <a className="footer-contact-item" href={`tel:${site.phoneHref}`}>
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 9.5c0 .3-.1.6-.2.9-.1.3-.3.5-.5.7-.4.4-.8.5-1.3.5-.3 0-.7-.1-1.1-.2a10.7 10.7 0 01-1-.4 10 10 0 01-1-.6 9.7 9.7 0 01-.9-.8 9.7 9.7 0 01-.8-.9 10 10 0 01-.6-1c-.2-.3-.3-.7-.4-1C4.1 6.3 4 6 4 5.6c0-.4.1-.8.3-1.1.2-.4.5-.7.9-.9.3-.1.6-.2 1-.2.1 0 .3 0 .4.1.1 0 .3.1.4.3L8 5.4c.1.2.2.3.2.5s-.1.3-.2.5L7.5 7l-.2.3v.1c0 .1 0 .2.1.3l.3.4c.2.2.3.4.5.5.2.2.4.3.5.4l.4.3c.1.1.2.1.3.1h.1l.3-.2c.1-.1.2-.2.5-.3l.7-.6c.2-.1.3-.2.5-.2s.4 0 .5.1l1.7 1.1c.1.1.2.2.3.4.1.1.1.3.1.5z" />
              </svg>
              {site.phoneDisplay}
            </a>
            <a className="footer-contact-item" href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M7 1.5A5.5 5.5 0 117 12.5 5.5 5.5 0 017 1.5z" />
                <path d="M7 1.5c-1.5 0-2.5 2.46-2.5 5.5s1 5.5 2.5 5.5 2.5-2.46 2.5-5.5-1-5.5-2.5-5.5z" />
                <path d="M1.5 7h11" />
              </svg>
              {site.whatsappDisplay}
            </a>
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {site.name}. All rights reserved.</span>
          <nav aria-label="Footer legal links">
            <Link href="/privacy">Privacy Policy</Link>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
