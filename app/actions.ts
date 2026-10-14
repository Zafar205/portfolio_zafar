"use server";

import { z } from "zod";
import { site } from "@/data/site";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name (at least 2 characters).").max(80, "Keep your name under 80 characters."),
  email: z.email("Enter an email address like you@company.com.").max(160),
  message: z.string().trim().min(10, "Write a few words about the project (at least 10 characters).").max(4000, "Keep the message under 4,000 characters."),
});

export type ContactState = {
  status: "idle" | "sent" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: { name: string; email: string; message: string };
};

/**
 * Validates the contact form. If RESEND_API_KEY is set, the message is emailed to you
 * through Resend; otherwise it is logged on the server so local development still works.
 */
export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot: real visitors never see or fill this field. Pretend success for bots.
  if (String(formData.get("company") ?? "").length > 0) return { status: "sent", message: "Message sent." };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["errors"]>;
      errors[key] ??= issue.message;
    }
    return { status: "error", message: "Check the highlighted fields.", errors, values };
  }

  const { name, email, message } = parsed.data;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[contact] RESEND_API_KEY not set; message logged instead of emailed:", { name, email, message });
    return { status: "sent", message: "Message sent. I reply within two working days." };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? site.contact.email],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\n— ${name} <${email}>`,
      }),
    });
    if (!response.ok) throw new Error(`Resend responded ${response.status}`);
    return { status: "sent", message: "Message sent. I reply within two working days." };
  } catch (error) {
    console.error("[contact] send failed", error);
    return { status: "error", message: `The message didn't send. Email me directly at ${site.contact.email}.`, values };
  }
}
