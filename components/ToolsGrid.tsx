"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tools } from "../lib/tools";

export default function ToolsGrid() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.short.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.keyword.includes(q),
    );
  }, [query]);

  return (
    <div>
      <div className="tool-search no-print">
        <label htmlFor="tool-search-input">Find a calculator</label>
        <input
          id="tool-search-input"
          type="search"
          placeholder="Try “mulch”, “paint”, “fence”…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {filtered.length === 0 ? (
        <p>
          No calculator matches “{query}” yet. Try a material name — or{" "}
          <Link href="/contact">tell us what to build next</Link>.
        </p>
      ) : (
        <div className="tool-grid">
          {filtered.map((tool) => (
            <Link key={tool.slug} href={`/${tool.slug}`} className="tool-card">
              <span className="tool-card-cat">{tool.category}</span>
              <span className="tool-card-name">{tool.name}</span>
              <span className="tool-card-short">{tool.short}</span>
              <span className="tool-card-cta">Calculate →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
