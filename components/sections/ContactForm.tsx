"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, CheckCircle2 } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [sent, setSent] = useState(false);

  const onSubmit = async (data: FormValues) => {
    // Placeholder submit handler — wire this up to an API route, Formspree,
    // Resend, or another email service before deploying.
    await new Promise((r) => setTimeout(r, 900));
    console.log("Contact form submission:", data);
    setSent(true);
    reset();
  };

  if (sent) {
    return (
      <div className="card-surface flex flex-col items-center gap-3 p-10 text-center">
        <CheckCircle2 className="h-8 w-8 text-signal" />
        <p className="font-medium text-paper">Message sent.</p>
        <p className="text-sm text-paper-muted">
          Thanks for reaching out — I&apos;ll reply within a couple of days.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-2 font-mono text-[13px] text-trace-bright hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-surface flex flex-col gap-5 p-8">
      <div>
        <label htmlFor="name" className="font-mono text-[12px] uppercase tracking-wide text-paper-muted">
          Name
        </label>
        <input
          id="name"
          {...register("name", { required: "Your name is required" })}
          className="mt-2 w-full rounded-md border border-line bg-ink-850 px-4 py-3 text-sm text-paper outline-none transition-colors focus:border-signal/50"
          placeholder="Your full name"
        />
        {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="font-mono text-[12px] uppercase tracking-wide text-paper-muted">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "An email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
          })}
          className="mt-2 w-full rounded-md border border-line bg-ink-850 px-4 py-3 text-sm text-paper outline-none transition-colors focus:border-signal/50"
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="font-mono text-[12px] uppercase tracking-wide text-paper-muted">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message", { required: "Tell me a little about your message" })}
          className="mt-2 w-full resize-none rounded-md border border-line bg-ink-850 px-4 py-3 text-sm text-paper outline-none transition-colors focus:border-signal/50"
          placeholder="What are you building, researching, or hiring for?"
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-signal px-5 py-3 font-mono text-[13px] font-medium text-ink-950 transition-colors hover:bg-signal-bright disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send message"}
        <Send className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}
