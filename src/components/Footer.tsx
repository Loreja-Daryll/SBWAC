import logo from "../assets/logo.png";
import SeafloorRocks from "./SeafloorRocks";

// Real platform marks (not the generic dev-tool set in public/icons.svg),
// drawn as inline paths so they inherit currentColor and hover states.

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
      <path d="M13.5 21v-7.8h2.62l.39-3.04H13.5V8.24c0-.88.24-1.48 1.5-1.48h1.61V4.07C16.33 4.02 15.42 3.94 14.35 3.94c-2.24 0-3.77 1.37-3.77 3.87v2.35H8v3.04h2.58V21z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[17px] h-[17px]">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.15" cy="6.85" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
      <path d="M16.6 2.9c.42.79 1.08 1.43 1.87 1.86.55.3 1.15.5 1.79.58v2.94a7.7 7.7 0 0 1-3.68-1.1v6.62c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6c.24 0 .48.01.71.04v2.98a3 3 0 1 0 2.29 2.9V2.9z" />
    </svg>
  );
}

// EDIT THIS: link ng "Become a Partner" button sa footer.
// IMPORTANTE: kung external link (Facebook, Google Form, ibang site),
// dapat MAY "https://" SA UNAHAN — halimbawa:
//   TAMA:   "https://facebook.com/SorsogonBlueWaves"
//   MALI:   "facebook.com/SorsogonBlueWaves"  (walang https://)
// Kung walang https://, ittre-treat ito ng browser bilang panloob na
// path sa sarili nating site (hindi papalabas sa Facebook) — kaya parang
// "walang nangyayari" kapag na-click, dahil nagre-reload lang siya sa
// parehong page (walang router ang site na ito).
const PARTNERSHIP_URL = "https://web.facebook.com/Propertyz09";

// EDIT THIS: palitan ng totoong email address ng organization.
// Ginagamit din ito sa ContactForm.tsx (FinalCTA) — dapat parehong
// value ang ilagay doon.
const CONTACT_EMAIL = "hello@sorsogonbluewaves.org";

const socials = [
  { label: "Facebook", href: "https://facebook.com/SorsogonBlueWaves", Icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com/SorsogonBlueWaves", Icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com/@SorsogonBlueWaves", Icon: TikTokIcon },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-deep-950 text-brand-300/70 pt-6 sm:pt-[105px] lg:pt-[130px] pb-8 min-h-0 sm:min-h-[320px]">
      <SeafloorRocks />
      <div className="max-w-[1160px] mx-auto px-7">
        {/* MOBILE ONLY — simplified: social icons left, small orange
            "Become a Partner" right, same line if it fits, wraps to its
            own line on very narrow phones. Desktop/tablet layout below
            is completely untouched. */}
        <div className="sm:hidden flex flex-wrap items-center justify-between gap-3 pb-8 border-b border-foam/10">
          <div className="flex gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-foam/15 flex items-center justify-center text-brand-300 hover:text-deep-950 hover:bg-brand-300 hover:border-brand-300 transition-all"
              >
                <Icon />
              </a>
            ))}
          </div>
          <a
            href={PARTNERSHIP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-[11px] uppercase tracking-wide text-deep-950 px-4 py-2 rounded-full whitespace-nowrap"
            style={{ backgroundColor: "#FF7A52" }}
          >
            Become a Partner
          </a>
        </div>

        {/* DESKTOP + TABLET — unchanged from before */}
        <div className="hidden sm:flex flex-row flex-wrap justify-between items-start text-left gap-x-12 gap-y-10 pb-10 border-b border-foam/10">
          {/* Brand + socials */}
          <div className="max-w-[280px] flex flex-col items-start">
            <div className="flex flex-row items-center gap-2.5">
              <img src={logo} alt="Sorsogon Blue Waves Aquatics Club" className="w-7 h-7 object-contain" />
              <strong className="font-display text-foam text-[18px] leading-tight">
                Sorsogon Blue Waves Aquatics Club
              </strong>
            </div>
            <p className="text-[13.5px] mt-3 leading-relaxed">
              A community mission for Sorsogon, Bicol Region, Philippines.
              <br />
              Swim &middot; Dive &middot; Excel
            </p>
            <div className="flex gap-2.5 mt-5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-foam/15 flex items-center justify-center text-brand-300 hover:text-deep-950 hover:bg-brand-300 hover:border-brand-300 transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-start">
            <div className="font-mono text-[11.5px] uppercase tracking-wide text-foam/50 mb-4">Explore</div>
            <div className="flex flex-col items-start gap-2.5 text-[13.5px]">
              <a href="#method" className="hover:text-brand-500 transition-colors">The Path</a>
              <a href="#programs" className="hover:text-brand-500 transition-colors">Programs</a>
              <a href="#involved" className="hover:text-brand-500 transition-colors">Join the Mission</a>
              <a href="#faq" className="hover:text-brand-500 transition-colors">FAQ</a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-500 transition-colors">Email Us</a>
            </div>
          </div>

          {/* Partnership CTA */}
          <div className="max-w-[240px] flex flex-col items-start">
            <div className="font-mono text-[11.5px] uppercase tracking-wide text-foam/50 mb-4">Partner With Us</div>
            <p className="text-[13.5px] leading-relaxed mb-5">
              Support our swimmers and help grow the mission across Sorsogon.
            </p>
            <a
              href={PARTNERSHIP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-[12.5px] uppercase tracking-wide text-deep-950 bg-brand px-5 py-2.5 rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/40 transition-all"
            >
              Become a Partner
            </a>
          </div>
        </div>

        <div className="pt-5 font-mono text-[12px] text-brand-700 text-center sm:text-left">
          &copy; 2026 Sorsogon Blue Waves Aquatics Club. From pool to ocean.
        </div>
      </div>
    </footer>
  );
}
