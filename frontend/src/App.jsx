import React, { useEffect, useMemo, useState } from "react";

export default function App() {
  const [policy, setPolicy] = useState(null);
  const [lang, setLang] = useState("pt-BR");
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("/api/moderation-policy").then(r => r.json()).then(setPolicy);
  }, []);

  const t = useMemo(() => policy?.policy?.[lang] ?? null, [policy, lang]);

  async function testModeration(e) {
    e.preventDefault();
    setResult(null);
    const res = await fetch("/api/moderate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg, locale: lang })
    });
    const data = await res.json();
    setResult(data);
    setHistory(h => [{ message: msg, result: data, ts: Date.now() }, ...h].slice(0, 20));
  }

  return (
    <div style={{ fontFamily: "Inter, system-ui, Arial", padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <h1 style={{ margin: 0 }}>Moderation Tester</h1>
        <select value={lang} onChange={e => setLang(e.target.value)}>
          <option value="pt-BR">pt-BR</option>
          <option value="en-US">en-US</option>
        </select>
      </header>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ marginBottom: 8 }}>{t?.title || "Carregando..."}</h2>
        <p>{t?.objective}</p>
        <details style={{ marginTop: 8 }}>
          <summary><b>Regras</b></summary>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
            <div>
              <h3>Permitidas</h3>
              <ul>{t?.rules?.allowed?.map((x, i) => <li key={i}>{x}</li>)}</ul>
            </div>
            <div>
              <h3>Proibidas</h3>
              <ul>{t?.rules?.prohibited?.map((x, i) => <li key={i}>{x}</li>)}</ul>
            </div>
          </div>
        </details>

        <details style={{ marginTop: 8 }}>
          <summary><b>Penalidades</b></summary>
          <table width="100%" style={{ borderCollapse: "collapse", marginTop: 8 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Nível</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Ação</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Exemplos</th>
              </tr>
            </thead>
            <tbody>
              {t?.moderation?.penalties?.map((p, i) => (
                <tr key={i}>
                  <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{p.level}</td>
                  <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{p.action}</td>
                  <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{p.examples?.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Teste sua mensagem</h2>
        <form onSubmit={testModeration} style={{ display: "flex", gap: 8 }}>
          <input
            value={msg}
            onChange={e => setMsg(e.target.value)}
            placeholder="Digite a mensagem a ser moderada..."
            style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
          />
          <button
            type="submit"
            style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid #333", background: "#111", color: "white", cursor: "pointer" }}
          >
            Moderar
          </button>
        </form>

        {result && (
          <div style={{ marginTop: 12, padding: 12, borderRadius: 8, border: "1px solid #ddd",
            background: result.allowed ? "#e8f7ee" : "#fdecee" }}>
            <b>Status:</b> {result.allowed ? "Permitido" : "Bloqueado"} &nbsp;•&nbsp; 
            <b>Severidade:</b> {result.severity} &nbsp;•&nbsp; 
            <b>Ação sugerida:</b> {result.suggestedAction}
            {result.matches?.length > 0 && (
              <>
                <div style={{ marginTop: 8 }}><b>Ocorrências:</b></div>
                <ul style={{ marginTop: 4 }}>
                  {result.matches.map((m, i) => <li key={i}>{m.list} → <code>{m.match}</code></li>)}
                </ul>
              </>
            )}
          </div>
        )}
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Histórico (últimas 20)</h3>
        <ul style={{ paddingLeft: 18 }}>
          {history.map((h, i) => (
            <li key={i}>
              <code>{new Date(h.ts).toLocaleTimeString()}</code> — "{h.message}" → {h.result.allowed ? "permitido" : "bloqueado"} ({h.result.suggestedAction})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
