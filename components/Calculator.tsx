"use client";

import { useMemo, useState } from "react";
import type { Tool } from "../lib/tools";
import { calculators } from "../lib/calc";

export default function Calculator({ tool }: { tool: Tool }) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(tool.inputs.map((i) => [i.key, i.def])),
  );
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const fn = calculators[tool.slug];
    if (!fn) return null;
    const hasZeroDimension = tool.inputs.some(
      (i) => i.type === "number" && (values[i.key] ?? 0) < 0,
    );
    if (hasZeroDimension) return null;
    try {
      return fn(values);
    } catch {
      return null;
    }
  }, [tool, values]);

  const set = (key: string, raw: string) => {
    const parsed = raw === "" ? 0 : Number(raw);
    setValues((prev) => ({ ...prev, [key]: Number.isFinite(parsed) ? parsed : 0 }));
    setCopied(false);
  };

  const copyList = async () => {
    if (!result) return;
    const text = [
      `${tool.name} — QtyRight shopping list`,
      result.summary,
      ...result.shopping.map((s) => `• ${s}`),
      "Estimates only — confirm quantities with your supplier before ordering.",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="calc-shell" aria-label={`${tool.name} tool`}>
      <div className="calc-inputs no-print">
        <h2 className="calc-heading">Your measurements</h2>
        <div className="field-grid">
          {tool.inputs.map((input) =>
            input.type === "select" ? (
              <label key={input.key} className="field">
                <span>{input.label}</span>
                <select
                  value={values[input.key]}
                  onChange={(e) => set(input.key, e.target.value)}
                >
                  {input.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <label key={input.key} className="field">
                <span>
                  {input.label}
                  {input.unit ? <em> ({input.unit})</em> : null}
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={input.step ?? 1}
                  value={values[input.key] === 0 ? "" : values[input.key]}
                  placeholder="0"
                  onChange={(e) => set(input.key, e.target.value)}
                />
              </label>
            ),
          )}
        </div>
        <p className="calc-privacy">
          Runs entirely in your browser — your measurements are never sent anywhere.
        </p>
      </div>

      <div className="calc-results print-area" aria-live="polite">
        <h2 className="calc-heading">What to buy</h2>
        {result ? (
          <>
            <p className="result-summary">{result.summary}</p>
            <dl className="result-rows">
              {result.rows.map((row) => (
                <div key={row.label} className="result-row">
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <h3>Shopping list</h3>
            <ul className="shopping-list">
              {result.shopping.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {result.note ? <p className="result-note">{result.note}</p> : null}
            <div className="result-actions no-print">
              <button type="button" onClick={copyList}>
                {copied ? "Copied ✓" : "Copy shopping list"}
              </button>
              <button type="button" onClick={() => window.print()}>
                Print / save PDF
              </button>
            </div>
          </>
        ) : (
          <p className="result-summary">
            Enter your measurements to see quantities, costs and a shopping list.
          </p>
        )}
      </div>
    </section>
  );
}
