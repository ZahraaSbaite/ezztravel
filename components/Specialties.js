import { supabase } from "@/lib/supabaseClient";
import SpecialtiesClient from "./SpecialtiesClient";

export default async function Specialties() {
  const { data } = await supabase
    .from("specialties")
    .select("id, title, description, subtitle, long_description, cta, features")
    .eq("published", true)
    .order("position", { ascending: true });

  if (!data || data.length === 0) return null;

  const items = data.map((row, i) => ({
    n: String(i + 1).padStart(2, "0"),
    title: row.title,
    description: row.description,
    subtitle: row.subtitle,
    longDescription: row.long_description,
    cta: row.cta,
    features: Array.isArray(row.features) ? row.features : [],
  }));

  return <SpecialtiesClient items={items} />;
}
