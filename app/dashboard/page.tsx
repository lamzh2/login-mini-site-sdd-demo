import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "../../lib/actions";
import { getCurrentUser } from "../../lib/session";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="shell">
      <nav className="nav" aria-label="Main navigation">
        <Link className="brand" href="/">Login Mini Site</Link>
        <form action={logoutAction}>
          <button type="submit">Logout</button>
        </form>
      </nav>

      <section className="card">
        <p className="eyebrow">Protected dashboard</p>
        <h2>Dashboard</h2>
        <p className="muted">You are signed in. User-controlled profile text is rendered safely by React.</p>
        <ul className="profile-list">
          <li>
            <strong>Name:</strong> {user.name}
          </li>
          <li>
            <strong>Email:</strong> {user.email}
          </li>
        </ul>
      </section>
    </main>
  );
}
