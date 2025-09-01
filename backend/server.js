import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import Joi from "joi";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { lists } from "./keyword-lists.js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

const POLICY_PATH = path.join(__dirname, "moderation-policy.json");

// Validation schemas
const moderateSchema = Joi.object({
  message: Joi.string().max(1000).required(),
  locale: Joi.string().valid("pt-BR", "en-US").default("pt-BR")
});

// util: carrega política
function loadPolicy() {
  try {
    const raw = fs.readFileSync(POLICY_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("❌ Failed to load policy:", error);
    return { version: "1.0", error: "Policy file not found" };
  }
}

// motor de moderação (bem simples p/ demo)
function moderateMessage({ message, locale = "pt-BR" }) {
  const text = String(message || "").toLowerCase();
  const hits = [];

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

  // severidade simples por categoria
  const severityMap = { hate: 3, threats: 3, pii_leak: 2, offensive: 2, spammy: 1 };
  const maxSeverity = hits.reduce((acc, h) => Math.max(acc, severityMap[h.list] || 0), 0);

  let suggestedAction = "allow";
  if (maxSeverity === 3) suggestedAction = "block_and_ban";
  else if (maxSeverity === 2) suggestedAction = "block_and_warn";
  else if (maxSeverity === 1) suggestedAction = "soft_block_or_challenge";

  return {
    allowed: maxSeverity === 0,
    severity: maxSeverity, // 0..3
    suggestedAction,
    matches: hits,
    locale,
    policyVersion: loadPolicy().version
  };
}

// endpoints
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: "1.0.0"
  });
});

app.get("/api/moderation-policy", (req, res) => {
  res.json(loadPolicy());
});

app.post("/api/moderate", (req, res) => {
  const { value, error } = moderateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const result = moderateMessage(value);
  res.json(result);
});

// estático do front (em produção opcional)
const WEB_DIST = path.resolve(__dirname, "../web/dist");
if (fs.existsSync(WEB_DIST)) {
  app.use(express.static(WEB_DIST));
  app.get("*", (_, res) => res.sendFile(path.join(WEB_DIST, "index.html")));
}

// Global error handlers
process.on('uncaughtException', (err) => {
  console.error('🚨 Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully');
  process.exit(0);
});

const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => {
  console.log(`✅ moderation-server on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
  process.exit(1);
});
