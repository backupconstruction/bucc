export function IconCircleX({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="m9 9 6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        className="rtl:hidden"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        className="hidden rtl:block"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconHouse() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
      <path d="M4 11.5 12 5l8 6.5V20H4v-8.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 20v-6h4v6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconPencil({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="m14 6 4 4-9 9H5v-4l9-9Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconCheck({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="m8 12 3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconSofa({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M4 14V9a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 14h18v4H3z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconMail() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconPin({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 21s7-6.2 7-11.2A7 7 0 0 0 5 9.8C5 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.8" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
      <path
        d="M8 4h3l1 5-2 1a12 12 0 0 0 6 6l1-2 5 1v3c0 1-1 2-2 2C9 20 4 15 4 6c0-1 1-2 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconShield({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 3 5 6.2v6.3c0 4.2 2.8 7.2 7 8.5 4.2-1.3 7-4.3 7-8.5V6.2L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconClipboard({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <rect x="6" y="5" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 5.5V4h6v1.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 11h6M9 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconCalendar({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconSeal({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 3.5 19 7.5v9L12 20.5 5 16.5v-9L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconFile({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 3.5V8h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGlobe({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 12h16M12 4c2.5 2.4 3.8 5.2 3.8 8S14.5 17.6 12 20C9.5 17.6 8.2 14.8 8.2 12S9.5 6.4 12 4Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
      <path d="M12 4v12M7 12l5 5 5-5M5 20h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconTikTok({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M14.2 3h3.1c.2 1.7 1.3 3.2 2.9 4v3.1c-1.2.1-2.4-.2-3.5-.8v6.6c0 3.4-2.8 6.1-6.3 6.1S4 19.3 4 15.9 6.8 9.8 10.4 9.8c.3 0 .6 0 .9.1v3.2c-.3-.1-.6-.2-.9-.2-1.6 0-2.9 1.3-2.9 3s1.3 3 2.9 3 2.9-1.3 2.9-3V3Z" />
    </svg>
  );
}

export function IconYouTube({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22.5 7.2a3.2 3.2 0 0 0-2.2-2.3C18.4 4.5 12 4.5 12 4.5s-6.4 0-8.3.4A3.2 3.2 0 0 0 1.5 7.2 33 33 0 0 0 1.1 12a33 33 0 0 0 .4 4.8 3.2 3.2 0 0 0 2.2 2.3c1.9.4 8.3.4 8.3.4s6.4 0 8.3-.4a3.2 3.2 0 0 0 2.2-2.3A33 33 0 0 0 22.9 12a33 33 0 0 0-.4-4.8ZM10.2 15.3V8.7L15.8 12l-5.6 3.3Z" />
    </svg>
  );
}

export function IconWhatsApp({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.2A9.8 9.8 0 0 0 3.4 16.8L2 22l5.3-1.4A9.8 9.8 0 1 0 12 2.2Zm0 17.7a7.9 7.9 0 0 1-4-.1l-.3-.1-3.1.8.8-3-.2-.3A7.9 7.9 0 1 1 12 19.9Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8.9-.3.2-.5 0a6.4 6.4 0 0 1-1.9-1.2 7 7 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5l.4-.4.2-.3c0-.1 0-.3 0-.4s-.5-1.3-.7-1.8-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a2.2 2.2 0 0 0-.7 1.6 3.8 3.8 0 0 0 .8 2c.1.2 1.4 2.2 3.5 3.1 2 .8 2 .5 2.4.5s1.2-.2 1.4-.3.8-.5.9-.9.1-.8 0-.9-.2-.1-.4-.2Z" />
    </svg>
  );
}

export function IconInstagram({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 1.7H8A3.3 3.3 0 0 0 4.7 8v8A3.3 3.3 0 0 0 8 19.3h8A3.3 3.3 0 0 0 19.3 16V8A3.3 3.3 0 0 0 16 4.7ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8Zm4.7-3.3a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function IconFacebook({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M14.2 21v-7.4h2.5l.4-2.9h-2.9V8.8c0-.8.2-1.4 1.4-1.4h1.6V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2h-2.6v2.9H11v7.4h3.2Z" />
    </svg>
  );
}

export function IconTwitter({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M14.7 10.5 21.6 3h-1.6l-6 6.8L9.2 3H3.4l7.3 10.4L3.4 21h1.6l6.4-7.3L14.8 21h5.8l-5.9-10.5ZM11.2 12.7l-.7-1L5.6 4.2h2.5l4.7 6.6.7 1 6.3 8.9h-2.5l-5.1-7.2Z" />
    </svg>
  );
}
