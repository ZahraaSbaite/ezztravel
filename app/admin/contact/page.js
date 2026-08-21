"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ContactForm from "@/components/ContactForm";

export default function AdminContactPage() {
  const [contact, setContact] = useState(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase
      .from("contact_content")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data, error: loadError }) => {
        if (loadError) setError(loadError.message);
        setContact(data || null);
      });
  }, []);

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl text-fg">Contact us</h1>
      {error && <p className="mb-6 text-sm text-red-400">{error}</p>}
      {contact === undefined && <p className="text-sm text-fg/50">Loading…</p>}
      {contact === null && !error && (
        <p className="text-sm text-fg/50">
          No contact content row found. Run supabase/contact_schema.sql in the Supabase SQL editor first.
        </p>
      )}
      {contact && <ContactForm contact={contact} />}
    </div>
  );
}
