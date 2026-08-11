import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// naive in-memory rate limit, resets on server restart / cold start
// good enough for a small business site; swap for Upstash/Redis if it scales
const submissions = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = submissions.get(ip) || [];
  const recent = entry.filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  submissions.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function GET() {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, rating, comment, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: "Could not load reviews." }, { status: 500 });
  }
  return NextResponse.json({ reviews: data });
}

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many reviews submitted. Try again later." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, 60);
  const comment = String(body.comment || "").trim().slice(0, 600);
  const rating = Number(body.rating);

  if (!name || !comment || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Enter a name, a comment, and a rating from 1 to 5." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert({ name, comment, rating })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Could not submit review." }, { status: 500 });
  }

  return NextResponse.json({ review: data }, { status: 201 });
}
