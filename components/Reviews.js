"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";

function Stars({ value, onChange, readOnly = false, size = "text-base" }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          onClick={() => onChange && onChange(n)}
          className={`${size} leading-none transition-transform ${
            n <= value ? "text-gold" : "text-fg/20"
          } ${readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"}`}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function PlaneGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M21 15.5v-2l-8-5V4.5a1.5 1.5 0 0 0-3 0v4l-8 5v2l8-2.5V17l-2.5 1.8v1.6l3.5-1 3.5 1v-1.6L12 17v-4l9 2.5Z" />
    </svg>
  );
}

function seatFor(i) {
  const row = 11 + (i % 8);
  const letter = "ABCDEF"[i % 6];
  return `${row}${letter}`;
}

function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function timeAgo(iso) {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

/** shared boarding-pass chrome: a main panel + a dashed-off stub, punched with two notches */
function TicketShell({ children, stub, className = "" }) {
  return (
    <div
      className={`relative flex overflow-hidden rounded-lg border border-gold/20 bg-panel shadow-luxe transition-colors ${className}`}
    >
      <div className="min-w-0 flex-1 p-6 sm:p-7">{children}</div>
      <div className="relative flex w-24 shrink-0 flex-col items-center justify-center gap-2 border-l border-dashed border-gold/30 px-2 py-6 text-center sm:w-28">
        <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full bg-surface-2" />
        <span className="absolute -bottom-2.5 -left-2.5 h-5 w-5 rounded-full bg-surface-2" />
        {stub}
      </div>
    </div>
  );
}

const REVIEWS_PER_PAGE = 4;

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [page, setPage] = useState(0);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function loadReviews() {
    setLoading(true);
    setLoadError(false);
    try {
      const res = await fetch("/api/reviews");
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    if (!name.trim() || !comment.trim() || rating < 1) {
      setSubmitError("Add your name, a rating, and a comment.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, comment, rating }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Could not submit your review.");
        return;
      }
      setReviews((prev) => [data.review, ...prev]);
      setPage(0);
      setName("");
      setComment("");
      setRating(0);
    } catch {
      setSubmitError("Could not submit your review. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const average =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  const totalPages = Math.max(1, Math.ceil(reviews.length / REVIEWS_PER_PAGE));
  const pageStart = page * REVIEWS_PER_PAGE;
  const visibleReviews = reviews.slice(pageStart, pageStart + REVIEWS_PER_PAGE);

  function goPrev() {
    setPage((p) => (p - 1 + totalPages) % totalPages);
  }

  function goNext() {
    setPage((p) => (p + 1) % totalPages);
  }

  return (
    <section id="reviews" className="relative overflow-hidden bg-surface-2 px-6 py-28 text-fg">
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-30" />
      <div
        className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(198,161,91,0.16) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="REVIEWS" title="Passengers who've flown with us" align="left" />

          <div className="flex items-center gap-4 rounded-sm border border-gold/20 bg-panel px-5 py-3">
            <p className="font-display text-3xl text-gold">{average ?? "—"}</p>
            <div>
              <Stars value={average ? Math.round(average) : 0} readOnly size="text-xs" />
              <p className="mt-1 text-xs text-fg/50">
                {reviews.length} review{reviews.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </div>

        {/* your boarding pass — the review form */}
        <form onSubmit={handleSubmit} className="mt-14">
          <TicketShell
            stub={
              <>
                <p className="font-mono text-[10px] tracking-[0.2em] text-gold/70">CLASS</p>
                <p className="font-display text-sm text-fg">First</p>
                <div className="mt-2">
                  <Stars value={rating} onChange={setRating} size="text-xl" />
                </div>
                <PlaneGlyph className="mt-3 h-5 w-5 rotate-90 text-gold/50" />
              </>
            }
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-gold">BOARDING PASS</p>
                <p className="mt-1 font-display text-xl text-fg">Write your review</p>
              </div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-fg/40">
                BEIRUT · ABIDJAN
              </p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide text-fg/50" htmlFor="name">
                  Passenger name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  className="w-full border-b border-edge/25 bg-transparent py-1.5 text-sm text-fg outline-none transition-colors focus:border-gold"
                  placeholder="Your name"
                />
              </div>
              <div className="sm:row-span-2">
                <label className="mb-1 block text-xs uppercase tracking-wide text-fg/50" htmlFor="comment">
                  Notes
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={600}
                  rows={3}
                  className="w-full border-b border-edge/25 bg-transparent py-1.5 text-sm text-fg outline-none transition-colors focus:border-gold"
                  placeholder="Tell others about your trip"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              {submitError ? (
                <p className="text-sm text-red-400">{submitError}</p>
              ) : (
                <p className="text-xs text-fg/40">Visible to everyone who visits this page.</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="rounded-sm bg-gold px-6 py-2.5 text-sm font-medium text-night transition-all hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-gold-glow disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {submitting ? "Submitting…" : "Submit review"}
              </button>
            </div>
          </TicketShell>
        </form>

        {/* flown passengers */}
        <div className="mt-10">
          {loading && <p className="text-sm text-fg/60">Loading reviews…</p>}
          {loadError && (
            <p className="text-sm text-red-400">
              Couldn't load reviews.{" "}
              <button onClick={loadReviews} className="underline">
                Try again
              </button>
            </p>
          )}
          {!loading && !loadError && reviews.length === 0 && (
            <div className="rounded-lg border border-dashed border-edge/20 px-6 py-12 text-center">
              <p className="font-display text-lg text-fg/70">No boarding passes yet</p>
              <p className="mt-2 text-sm text-fg/50">
                Be the first to share how your trip went.
              </p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {visibleReviews.map((r, i) => (
              <TicketShell
                key={r.id}
                stub={
                  <>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-gold/70">SEAT</p>
                    <p className="font-display text-lg text-fg">{seatFor(pageStart + i)}</p>
                    <div className="mt-2">
                      <Stars value={r.rating} readOnly size="text-xs" />
                    </div>
                    <PlaneGlyph className="mt-3 h-5 w-5 rotate-90 text-gold/50" />
                  </>
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 font-display text-sm text-gold ring-1 ring-gold/30">
                      {initials(r.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-mono text-[10px] tracking-[0.2em] text-gold/70">
                        PASSENGER
                      </p>
                      <p className="truncate font-display text-lg text-fg">{r.name}</p>
                    </div>
                  </div>
                  <span className="shrink-0 whitespace-nowrap text-xs text-fg/40">
                    {timeAgo(r.created_at)}
                  </span>
                </div>
                <p className="relative mt-4 text-sm italic leading-relaxed text-fg/70">
                  <span className="mr-1 font-display not-italic text-gold/40">&rdquo;</span>
                  {r.comment}
                </p>
              </TicketShell>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous reviews"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-night"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <p className="font-mono text-xs tracking-[0.2em] text-fg/50">
                {page + 1} / {totalPages}
              </p>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next reviews"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-night"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
