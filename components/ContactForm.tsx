"use client";

import * as React from "react";
import { sendMessage, type ContactState } from "@/app/actions";
import { useSound } from "./sound";

const initial: ContactState = { status: "idle" };

const FIELDS = [
  { no: "01", name: "name", label: "Name", type: "text", autoComplete: "name", placeholder: "Your name" },
  { no: "02", name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@company.com", spellCheck: false },
  { no: "03", name: "message", label: "Message", type: "textarea", autoComplete: "off", placeholder: "Tell me about your project…" },
] as const;

export default function ContactForm() {
  const [state, action, pending] = React.useActionState(sendMessage, initial);
  const { play } = useSound();
  const form = React.useRef<HTMLFormElement>(null);

  // Warn before leaving with an unsent message.
  React.useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      const data = form.current ? new FormData(form.current) : null;
      const dirty = data && ["name", "email", "message"].some((key) => String(data.get(key) ?? "").trim());
      if (dirty) event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  React.useEffect(() => {
    if (state.status === "sent") {
      form.current?.reset();
      play("send");
    } else if (state.status === "error" && state.errors) {
      const first = Object.keys(state.errors)[0];
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }, [state, play]);

  return (
    <form ref={form} action={action} noValidate className="mt-6 space-y-6" aria-describedby="form-status">
      {FIELDS.map((field) => {
        const error = state.errors?.[field.name];
        const common = {
          id: `f-${field.name}`,
          name: field.name,
          autoComplete: field.autoComplete,
          placeholder: field.placeholder,
          required: true,
          defaultValue: state.status === "error" ? state.values?.[field.name] : undefined,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? `e-${field.name}` : undefined,
          className: "field",
        };
        return (
          <div key={`${field.name}-${state.status}`}>
            <label htmlFor={common.id} className="label block">
              <b>{field.no}</b> / {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea {...common} rows={5} />
            ) : (
              <input {...common} type={field.type} spellCheck={"spellCheck" in field ? field.spellCheck : undefined} />
            )}
            {error ? (
              <p id={`e-${field.name}`} className="mt-2 text-[13px] text-[var(--danger)]">
                {error}
              </p>
            ) : null}
          </div>
        );
      })}

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" className="btn btn-solid min-h-[52px]" disabled={pending} aria-disabled={pending}>
          {pending ? "Sending…" : "Send message"}
        </button>
        <p id="form-status" role="status" aria-live="polite" className={`text-[13px] ${state.status === "error" ? "text-[var(--danger)]" : "text-text"}`}>
          {state.message}
        </p>
      </div>
    </form>
  );
}
