import { test, describe } from 'node:test';
import assert from 'node:assert';

// Import moderation functions (you'll need to export them from server.js)
// For now, let's create standalone tests

describe('Content Moderation Tests', () => {
  test('should detect hate speech', () => {
    const message = "você é um racista";
    const result = moderateMessage({ message, locale: "pt-BR" });
    
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.severity, 3);
    assert.strictEqual(result.suggestedAction, "block_and_ban");
  });

  test('should allow clean messages', () => {
    const message = "Olá, como você está?";
    const result = moderateMessage({ message, locale: "pt-BR" });
    
    assert.strictEqual(result.allowed, true);
    assert.strictEqual(result.severity, 0);
    assert.strictEqual(result.suggestedAction, "allow");
  });

  test('should detect PII leaks', () => {
    const message = "Meu CPF é 123.456.789-00";
    const result = moderateMessage({ message, locale: "pt-BR" });
    
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.severity, 2);
    assert.strictEqual(result.suggestedAction, "block_and_warn");
  });

  test('should handle empty messages', () => {
    const message = "";
    const result = moderateMessage({ message, locale: "pt-BR" });
    
    assert.strictEqual(result.allowed, true);
    assert.strictEqual(result.severity, 0);
  });
});

// Mock moderation function for testing
function moderateMessage({ message, locale = "pt-BR" }) {
  const text = String(message || "").toLowerCase();
  const hits = [];

  const lists = {
    hate: ["racista", "racismo", "homofobia", "sexismo"],
    threats: ["vou te bater", "vou te matar", "ameaça"],
    offensive: ["burro", "idiota", "imbecil"],
    spammy: ["ganhe dinheiro rápido", "clique aqui"],
    pii_leak: [
      /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/i, // CPF
      /\b\d{2}\s?\d{5}-?\d{4}\b/i,        // telefone BR
      /\b\d{16}\b/                        // cartão
    ]
  };

  const checkList = (name, arr) => {
    for (const it of arr) {
      if (typeof it === "string") {
        if (text.includes(it.toLowerCase())) hits.push({ list: name, match: it });
      } else if (it instanceof RegExp) {
        if (it.test(text)) hits.push({ list: name, match: it.toString() });
      }
    }
  };

  checkList("hate", lists.hate);
  checkList("threats", lists.threats);
  checkList("offensive", lists.offensive);
  checkList("spammy", lists.spammy);
  checkList("pii_leak", lists.pii_leak);

  const severityMap = { hate: 3, threats: 3, pii_leak: 2, offensive: 2, spammy: 1 };
  const maxSeverity = hits.reduce((acc, h) => Math.max(acc, severityMap[h.list] || 0), 0);

  let suggestedAction = "allow";
  if (maxSeverity === 3) suggestedAction = "block_and_ban";
  else if (maxSeverity === 2) suggestedAction = "block_and_warn";
  else if (maxSeverity === 1) suggestedAction = "soft_block_or_challenge";

  return {
    allowed: maxSeverity === 0,
    severity: maxSeverity,
    suggestedAction,
    matches: hits,
    locale,
    policyVersion: "1.0"
  };
}
