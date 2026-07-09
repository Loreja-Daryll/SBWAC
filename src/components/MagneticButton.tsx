import { useRef, type ReactNode, type MouseEvent } from "react";

/**
 * A button that pulls toward the cursor on hover, then springs back.
 * Reserved for primary, one-per-view actions, not repeated on every link.
 */
export default function MagneticButton({
  href,
  className,
  children,
  target,
  rel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const onMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ transition: "transform 0.35s cubic-bezier(.22,.68,.36,1)" }}
    >
      {children}
    </a>
  );
}
