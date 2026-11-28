"use client";

import Link from "next/link";
import { MessageSquare, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { whatsappLink } from "@/lib/constants";
import type { AssistantReply } from "@/lib/shop-assistant";

type Message = { id: number; user?: boolean } & AssistantReply;
const prompts = ["Find a product", "Visiting card rates", "Wedding cards", "Flex & vinyl", "Track my order", "Print file help"];
const welcome: Message = {
  id: 0,
  text: "Hi! I can find printing products, show visiting-card rates, and help you get a quote or track an order.",
  actions: [],
};

export function ShopAssistant() {
  const dialog = useRef<HTMLDialogElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const lastCategory = useRef<string | undefined>(undefined);
  const inFlight = useRef(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, pending]);

  async function send(value: string) {
    const message = value.trim();
    if (!message || inFlight.current) return;
    inFlight.current = true;
    setPending(true);
    setDraft("");
    const id = nextId.current++;
    setMessages((items) => [...items.slice(-28), { id, text: message, actions: [], user: true }]);

    let answer: AssistantReply;
    try {
      const response = await fetch("/api/shop-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, category: lastCategory.current }),
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) throw new Error("Assistant unavailable");
      answer = await response.json();
      if (answer.category) lastCategory.current = answer.category;
    } catch {
      answer = {
        text: "The assistant couldn't load a reply. Try again, browse the Shop, or chat with us on WhatsApp.",
        actions: [{ label: "Browse Shop", href: "/shop" }],
      };
    } finally {
      inFlight.current = false;
      setPending(false);
    }

    const answerId = nextId.current++;
    setMessages((items) => [...items, { id: answerId, ...answer }]);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(draft);
  }

  function clearChat() {
    setMessages([welcome]);
    setDraft("");
    lastCategory.current = undefined;
  }

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-blue px-4 text-sm font-bold text-white shadow-lg hover:bg-blue-800"
      >
        <MessageSquare className="size-4" aria-hidden="true" /> Shop Assistant
      </button>
      <dialog
        ref={dialog}
        aria-labelledby="shop-assistant-title"
        className="fixed inset-auto bottom-4 right-4 m-0 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-2xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/45"
      >
        <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
          <header className="flex items-center justify-between gap-2 border-b bg-slate-50 px-4 py-3">
            <h2 id="shop-assistant-title" className="font-bold">Shop Assistant</h2>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="grid size-9 place-items-center rounded-lg hover:bg-slate-200"
              aria-label="Close Shop Assistant"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </header>
          <div ref={log} role="log" aria-label="Conversation" className="min-h-24 flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map(({ id, user, text, actions }) => (
              <div key={id} className={user ? "ml-auto max-w-[90%] rounded-xl bg-blue-50 p-3" : "mr-auto max-w-[95%] rounded-xl bg-slate-100 p-3"}>
                <p className="break-words text-sm">{text}</p>
                {actions.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {actions.map(({ label, href }) => (
                      <li key={href}>
                        {href.startsWith("/") ? (
                          <Link href={href} onClick={() => dialog.current?.close()} className="text-sm font-semibold text-brand-blue underline underline-offset-2">{label}</Link>
                        ) : (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-blue underline underline-offset-2">{label}</a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {pending && <p role="status" className="text-sm text-slate-600">Finding an answer…</p>}
          </div>
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {prompts.map((prompt) => (
                <button type="button" key={prompt} onClick={() => void send(prompt)} className="rounded-full border border-blue-200 px-2.5 py-1.5 text-xs font-semibold text-brand-blue hover:bg-blue-50">{prompt}</button>
              ))}
            </div>
          )}
          <form onSubmit={submit} className="flex gap-2 border-t px-4 pt-3">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={180}
              aria-label="Ask about printing"
              placeholder="Ask about printing…"
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-base"
            />
            <button type="submit" disabled={pending || !draft.trim()} aria-label="Send message" className="grid size-11 shrink-0 place-items-center rounded-lg bg-brand-blue text-white disabled:opacity-50">
              <Send className="size-4" aria-hidden="true" />
            </button>
          </form>
          <div className="flex justify-between gap-2 px-4 py-3 text-xs">
            <button type="button" disabled={pending || messages.length === 1} onClick={clearChat} className="font-semibold text-slate-600 disabled:opacity-50">Clear chat</button>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-800 underline underline-offset-2">Talk to us on WhatsApp</a>
          </div>
        </div>
      </dialog>
    </>
  );
}
