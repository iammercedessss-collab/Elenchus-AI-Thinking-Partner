# Elenchus — AI Thinking Partner

> *"The unexamined life is not worth living."* — Socrates

Elenchus is a dialectical AI that engages any idea you bring to it. It won't flatter you or validate easy answers. It absorbs your terms, exposes your assumptions, and pushes you to the edges of your own thinking.

---

## How it works

Enter any thesis, question, or claim — from philosophy and ethics to science, politics, religion, or everyday life. Elenchus responds in three structured moves every turn:

- **Engage** — Adds substantive context you may not have considered: a historical study, philosophical framework, scientific concept, or literary example relevant to your claim.
- **Challenge** — Exposes a hidden premise, core tension, or counter-perspective in what you just said. It doesn't let you off easily.
- **Question** — Closes with one sharp, unanswered question that opens new ground for the dialogue.

A live **Nuance Depth** bar in the header tracks how far the inquiry has gone (0–100%), updated by the model's own self-assessment each turn.

## Features

- Open-ended topic input — works on anything
- 8 suggestion chips to spark the dialogue instantly
- Structured Engage → Challenge → Question response format, parsed and rendered with distinct styling
- Live depth bar with a short note (e.g. *"Interrogating premises"*, *"Existential pivot"*) describing where the conversation is
- Full conversation memory — the model tracks context across every turn
- Change topic anytime without refreshing

## Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML/CSS/JS, no framework |
| Backend | Node.js + Express |
| AI | Gemini 2.0 Flash via `@google/genai` |
| Build | Vite + TypeScript |
| Styling | Tailwind CSS v4 + custom CSS variables |
| Animation | Motion library |

The API key is stored server-side via `.env` — never exposed to the client.

## Running locally

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/elenchus.git
cd elenchus

# 2. Install dependencies
npm install

# 3. Add your Gemini API key
cp .env.example .env
# Edit .env and add: GEMINI_API_KEY=your_key_here

# 4. Start the dev server
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build for production

```bash
npm run build
npm start
```

## Why this is interesting to build

Getting an LLM to *add genuine insight* while simultaneously *refusing to close the question* is a harder prompt engineering problem than it looks. The system prompt enforces a strict three-part structure on every turn, which the frontend parses and renders with distinct visual treatment — so the architecture is teaching the model to produce machine-readable structured output wrapped in natural language.

The depth scoring is a form of **introspective evaluation**: the model self-assesses the quality of the user's reasoning before responding. This is the same pattern used in production AI systems to decide when to trigger human review loops — the model knows when it's uncertain or when the conversation has hit a ceiling.

---

*Demonstrates: structured output parsing, introspective agent evaluation, multi-turn dialogue memory, constraint-based prompt engineering.*
