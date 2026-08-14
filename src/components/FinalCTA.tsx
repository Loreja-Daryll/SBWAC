import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

// Real Formspree form ID — configure the destination email address in
// your Formspree dashboard (formspree.io), not here in the code.
const FORMSPREE_FORM_ID = "mwvgkoel";

function ContactForm({ onClose }: { onClose: () => void }) {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);
  const [name, setName] = useState("");

  if (state.succeeded) {
    return (
      <div
        className="mt-6 text-left rounded-2xl p-6 sm:p-7 text-center"
        style={{ backgroundColor: "rgba(4, 42, 68, 0.75)", border: "1px solid rgba(247, 251, 253, 0.12)" }}
      >
        <p className="font-display font-semibold text-[19px] text-foam">Message sent.</p>
        <p className="mt-2 text-[14px] text-brand-100/80">
          Thank you{name ? `, ${name}` : ""}, we'll get back to you soon.
        </p>
        <button
          onClick={onClose}
          className="mt-4 font-mono text-[12px] uppercase tracking-wide text-brand-300 hover:text-foam transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 text-left rounded-2xl p-6 sm:p-7"
      style={{ backgroundColor: "rgba(4, 42, 68, 0.75)", border: "1px solid rgba(247, 251, 253, 0.12)" }}
    >
      <div className="flex justify-between items-center mb-5">
        <span className="font-mono text-[11.5px] uppercase tracking-widest text-brand-300">
          Send us a message
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="text-brand-300/70 hover:text-foam transition-colors text-[13px]"
        >
          Close
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <input
          required
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="bg-transparent border border-foam/20 rounded-lg px-4 py-3 text-[14.5px] text-foam placeholder:text-brand-100/50 focus:outline-none focus:border-brand-300"
        />
        <div>
          <input
            required
            type="email"
            name="email"
            placeholder="Your email"
            className="w-full bg-transparent border border-foam/20 rounded-lg px-4 py-3 text-[14.5px] text-foam placeholder:text-brand-100/50 focus:outline-none focus:border-brand-300"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="mt-1.5 text-[11.5px]"
          />
        </div>
      </div>
      <div>
        <textarea
          required
          name="message"
          placeholder="What would you like to ask or share?"
          rows={4}
          className="w-full mt-3.5 bg-transparent border border-foam/20 rounded-lg px-4 py-3 text-[14.5px] text-foam placeholder:text-brand-100/50 focus:outline-none focus:border-brand-300 resize-none"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="mt-1.5 text-[11.5px]"
        />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="mt-4 font-mono text-[12.5px] uppercase tracking-wide bg-[#FF7A52] text-deep-950 px-6 py-3 rounded-full hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {state.submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

// TO ADD YOUR JELLYFISH FRAMES:
// Drop THREE PNG files into `public/images/`, named exactly
// "jellyfish-1.png", "jellyfish-2.png", and "jellyfish-3.png" (all
// transparent background, same size/framing — e.g. bell contracted,
// halfway, fully expanded). No code changes needed. This cycles
// through the three on a timer with a smooth crossfade between each,
// creating a simple "flipbook" pulsing animation instead of relying on
// an actual video. If a frame's file is missing, it's just skipped in
// the cycle (no broken image icon) — with all three missing, nothing
// shows at all.
const JELLYFISH_FRAMES = ["jellyfish-1.png", "jellyfish-2.png", "jellyfish-3.png"];
const JELLYFISH_FRAME_MS = 1000; // how long each frame holds before crossfading to the next

function JellyfishImage() {
  const [frame, setFrame] = useState(0);
  const [failed, setFailed] = useState<boolean[]>(() => JELLYFISH_FRAMES.map(() => false));

  useEffect(() => {
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % JELLYFISH_FRAMES.length);
    }, JELLYFISH_FRAME_MS);
    return () => window.clearInterval(id);
  }, []);

  const markFailed = (i: number) => {
    setFailed((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  if (failed.every(Boolean)) return null;

  return (
    <div
      className="hidden lg:block absolute right-[10%] top-1/2 -translate-y-1/2 w-[200px] xl:w-[220px] aspect-[3/4] pointer-events-none"
      aria-hidden="true"
    >
      {JELLYFISH_FRAMES.map((filename, i) =>
        !failed[i] ? (
          <img
            key={filename}
            src={`${import.meta.env.BASE_URL}images/${filename}`}
            alt=""
            onError={() => markFailed(i)}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out"
            style={{ opacity: frame === i ? 0.2 : 0 }}
          />
        ) : null
      )}
    </div>
  );
}

export default function FinalCTA() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="final" className="py-32 text-center text-foam relative overflow-hidden">
      <JellyfishImage />
      <div className="max-w-[680px] mx-auto px-7">
        <div className="font-mono text-[12.5px] tracking-widest uppercase text-brand-300 mb-6 flex items-center justify-center gap-2.5">
          <span className="w-5 h-px bg-brand inline-block" />
          This Is Bigger Than a Club
        </div>
        <h2 className="font-display font-semibold text-[28px] sm:text-[36px] lg:text-[42px]">
          Every <span style={{ color: "#FF7A52" }}>dreamer</span> we train is a reason to protect this coastline,
          and a reason for the world to visit it.
        </h2>
        <a
          href="https://facebook.com/SorsogonBlueWaves"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 font-mono text-[13px] uppercase tracking-wide text-deep-950 px-7 py-4 rounded-full inline-flex items-center gap-2 hover:-translate-y-1 hover:shadow-lg transition-all"
          style={{ backgroundColor: "#FF7A52" }}
        >
          Join the Mission on Facebook
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="#031E31" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <div className="mt-5 font-mono text-[12px] text-brand-300/80">
          No experience required to start. Just message us.
        </div>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 font-mono text-[12px] uppercase tracking-wide text-brand-100 underline decoration-brand-300/40 hover:decoration-brand-300 underline-offset-4 transition-colors"
          >
            Prefer email? Send us a message instead
          </button>
        ) : (
          <ContactForm onClose={() => setShowForm(false)} />
        )}
      </div>
    </section>
  );
}
