"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import SpecialtyForm from "@/components/SpecialtyForm";

export default function EditSpecialtyPage({ params }) {
  const [specialty, setSpecialty] = useState(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase
      .from("specialties")
      .select(
        "id, title, description, subtitle, long_description, cta, features, position, published"
      )
      .eq("id", params.id)
      .maybeSingle()
      .then(({ data, error: loadError }) => {
        if (loadError) setError(loadError.message);
        setSpecialty(data || null);
      });
  }, [params.id]);

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl text-fg">Edit specialty</h1>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {specialty === undefined && <p className="text-sm text-fg/50">Loading…</p>}
      {specialty === null && !error && <p className="text-sm text-fg/50">Specialty not found.</p>}
      {specialty && <SpecialtyForm specialty={specialty} />}
    </div>
  );
}
