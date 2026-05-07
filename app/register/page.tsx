import Link from "next/link";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <main className="shell">
      <nav className="nav" aria-label="Main navigation">
        <Link className="brand" href="/">Login Mini Site</Link>
        <Link href="/login">Login</Link>
      </nav>

      <section className="card">
        <p className="eyebrow">Create account</p>
        <h2>Register</h2>
        <p className="muted">Create a demo account. Your password is hashed before it is stored.</p>
        <RegisterForm />
      </section>
    </main>
  );
}
