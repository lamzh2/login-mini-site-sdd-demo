"use client";

import { useActionState } from "react";
import { registerAction, type ActionState } from "../../lib/actions";

const initialState: ActionState = { message: "" };

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <form action={formAction}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" autoComplete="name" maxLength={80} />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} />
      </div>

      {state.message ? <p className="message">{state.message}</p> : null}

      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}
