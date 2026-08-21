"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const emptyPhone = { number: "", link: "" };

export default function ContactForm({ contact }) {
  const router = useRouter();

  const [address, setAddress] = useState(contact.address || "");
  const [phones, setPhones] = useState(contact.phones?.length ? contact.phones : [{ ...emptyPhone }]);
  const [emails, setEmails] = useState(contact.emails?.length ? contact.emails : [""]);
  const [instagramHandle, setInstagramHandle] = useState(contact.instagram_handle || "");
  const [instagramLink, setInstagramLink] = useState(contact.instagram_link || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const inputClass =
    "w-full rounded-sm border border-edge/20 bg-transparent px-3 py-2 text-sm text-fg outline-none transition-colors focus:border-gold";

  function updatePhone(i, field, value) {
    setPhones((prev) => prev.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)));
  }

  function addPhone() {
    setPhones((prev) => [...prev, { ...emptyPhone }]);
  }

  function removePhone(i) {
    setPhones((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateEmail(i, value) {
    setEmails((prev) => prev.map((e, idx) => (idx === i ? value : e)));
  }

  function addEmail() {
    setEmails((prev) => [...prev, ""]);
  }

  function removeEmail(i) {
    setEmails((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaved(false);

    const cleanPhones = phones
      .map((p) => ({ number: p.number.trim(), link: p.link.trim() }))
      .filter((p) => p.number || p.link);
    const cleanEmails = emails.map((e) => e.trim()).filter(Boolean);

    setSaving(true);
    const payload = {
      address: address.trim(),
      phones: cleanPhones,
      emails: cleanEmails,
      instagram_handle: instagramHandle.trim(),
      instagram_link: instagramLink.trim(),
      updated_at: new Date().toISOString(),
    };

    const { error: saveError } = await supabase.from("contact_content").update(payload).eq("id", 1);

    setSaving(false);
    if (saveError) {
      setError(saveError.message);
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-gold/20 bg-panel p-8">
      <div>
        <label className="mb-1 block text-sm text-fg/70" htmlFor="address">
          Address line
        </label>
        <input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={inputClass}
          placeholder="Beirut, Lebanon · Abidjan, Ivory Coast"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm text-fg/70">Phone numbers</p>
          <button type="button" onClick={addPhone} className="text-xs text-gold hover:text-gold-light">
            + Add phone
          </button>
        </div>
        <div className="space-y-3">
          {phones.map((p, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-edge/15 p-4">
              <div className="flex-1 space-y-2">
                <input
                  value={p.number}
                  onChange={(e) => updatePhone(i, "number", e.target.value)}
                  placeholder="+961 81 839 155"
                  className={inputClass}
                />
                <input
                  value={p.link}
                  onChange={(e) => updatePhone(i, "link", e.target.value)}
                  placeholder="https://wa.me/96181839155"
                  className={inputClass}
                />
              </div>
              <button
                type="button"
                onClick={() => removePhone(i)}
                aria-label="Remove phone"
                className="shrink-0 text-sm text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ))}
          {phones.length === 0 && <p className="text-sm text-fg/40">No phone numbers yet.</p>}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm text-fg/70">Emails</p>
          <button type="button" onClick={addEmail} className="text-xs text-gold hover:text-gold-light">
            + Add email
          </button>
        </div>
        <div className="space-y-3">
          {emails.map((email, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                value={email}
                onChange={(e) => updateEmail(i, e.target.value)}
                placeholder="name@example.com"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeEmail(i)}
                aria-label="Remove email"
                className="shrink-0 text-sm text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ))}
          {emails.length === 0 && <p className="text-sm text-fg/40">No emails yet.</p>}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-fg/70" htmlFor="instagramHandle">
            Instagram handle
          </label>
          <input
            id="instagramHandle"
            value={instagramHandle}
            onChange={(e) => setInstagramHandle(e.target.value)}
            className={inputClass}
            placeholder="@ezztravell"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-fg/70" htmlFor="instagramLink">
            Instagram link
          </label>
          <input
            id="instagramLink"
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
            className={inputClass}
            placeholder="https://www.instagram.com/ezztravell"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {saved && !error && <p className="text-sm text-emerald-400">Saved.</p>}

      <div className="flex items-center gap-3 border-t border-edge/10 pt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-sm bg-gold px-6 py-2.5 text-sm font-medium text-night transition-all hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-gold-glow disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        <a
          href="/#contact"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-fg/60 hover:text-gold"
        >
          View section ↗
        </a>
      </div>
    </form>
  );
}
