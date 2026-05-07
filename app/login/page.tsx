import Link from "next/link";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="shell">
      <nav className="nav" aria-label="Main navigation">
        <Link className="brand" href="/">Login Mini Site</Link>
        <Link href="/register">Register</Link>
      </nav>

      <section className="card">
        <p className="eyebrow">Welcome back</p>
        <h2>Login</h2>
        <p className="muted">Use your email and password to access the protected dashboard.</p>
        <LoginForm />
      </section>
    </main>
  );
}
