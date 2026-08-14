"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AboutForm from "@/components/AboutForm";

export default function AdminAboutPage() {
  const [about, setAbout] = useState(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase
      .from("about_content")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data, error: loadError }) => {
        if (loadError) setError(loadError.message);
        setAbout(data || null);
      });
  }, []);

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl text-fg">About section</h1>
      {error && <p className="mb-6 text-sm text-red-400">{error}</p>}
      {about === undefined && <p className="text-sm text-fg/50">Loading…</p>}
      {about === null && !error && (
        <p className="text-sm text-fg/50">
          No about content row found. Run supabase/about_schema.sql in the Supabase SQL editor first.
        </p>
      )}
      {about && <AboutForm about={about} />}
    </div>
  );
}
