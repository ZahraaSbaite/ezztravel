"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ServiceForm from "@/components/ServiceForm";

export default function EditServicePage({ params }) {
  const [service, setService] = useState(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase
      .from("services")
      .select("id, title, description, position, published")
      .eq("id", params.id)
      .maybeSingle()
      .then(({ data, error: loadError }) => {
        if (loadError) setError(loadError.message);
        setService(data || null);
      });
  }, [params.id]);

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl text-fg">Edit service</h1>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {service === undefined && <p className="text-sm text-fg/50">Loading…</p>}
      {service === null && !error && <p className="text-sm text-fg/50">Service not found.</p>}
      {service && <ServiceForm service={service} />}
    </div>
  );
}
