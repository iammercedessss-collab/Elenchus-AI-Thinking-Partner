import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize the model securely. We must set User-Agent to 'aistudio-build' inside httpOptions.
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API route for secure dialogue proxying
  app.post("/api/chat", async (req, res) => {
    try {
      const { history, systemPrompt } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured in the server's environment. Please go to the Secrets panel to configure it." 
        });
      }

      // Convert history format if needed or pass directly.
      // In @google/genai, contents accepts standard content structures.
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: history,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.8,
          topK: 64,
          topP: 0.95,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini communication error on backend:", error);
      res.status(500).json({ error: error.message || "An error occurred with the AI thinking partner." });
    }
  });

  // Serve static assets and manage dev/production pipelines
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Elenchus server running on port ${PORT}`);
  });
}

startServer();
