export function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--gold-muted)]" />
      <svg
        width="46"
        height="24"
        viewBox="0 0 46 24"
        fill="none"
        aria-hidden="true"
        className="text-gold animate-shimmer"
      >
        <path
          d="M23 2c3 5 8 6 12 6-4 2-7 4-9 8 1-4-1-8-3-10-2 2-4 6-3 10-2-4-5-6-9-8 4 0 9-1 12-6Z"
          fill="currentColor"
          opacity="0.9"
        />
        <circle cx="23" cy="19" r="1.8" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--gold-muted)]" />
    </div>
  )
}
