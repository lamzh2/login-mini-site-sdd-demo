import Link from "next/link";

export default function HomePage() {
  return (
    <main className="shell">
      <nav className="nav" aria-label="Main navigation">
        <span className="brand">Login Mini Site</span>
        <div className="nav-links">
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>

      <section className="hero">
        <p className="eyebrow">SDD Demo</p>
        <h1>Small auth site, real delivery loop.</h1>
        <p className="muted">
          This mini site tests the handoff from SDD task decomposition to smart code execution,
          with database persistence, login, deployment, and evidence.
        </p>
        <div className="actions">
          <Link className="button" href="/register">Create account</Link>
          <Link className="button secondary" href="/login">I already have one</Link>
        </div>
      </section>
    </main>
  );
}
