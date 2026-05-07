"use client";

import { useActionState } from "react";
import { loginAction, type ActionState } from "../../lib/actions";

const initialState: ActionState = { message: "" };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction}>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" />
      </div>

      {state.message ? <p className="message">{state.message}</p> : null}

      <button type="submit" disabled={isPending}>
        {isPending ? "Checking..." : "Login"}
      </button>
    </form>
  );
}
