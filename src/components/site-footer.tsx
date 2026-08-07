export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between text-sm text-fg-muted">
        <span className="font-display text-lg tracking-wide text-fg-muted">
          candidd
        </span>
        <span>© {year}</span>
      </div>
    </footer>
  );
}
