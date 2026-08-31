require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Groq = require("groq-sdk");
const strictPromptTemplate = require("./StrictPrompt");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

console.log("✅ Starting TechVidhya backend...");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/message", async (req, res) => {
  const userMessage = req.body.message;
  console.log("👉 Received message:", userMessage);

  try {
    const strictPrompt = `${strictPromptTemplate}\n\nQuestion: ${userMessage}\nAnswer:`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: strictPrompt }],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const text = completion.choices[0]?.message?.content || "No response.";
    console.log("✅ Groq response received");
    res.json({ reply: text });
  } catch (error) {
    console.error("🔥 Error calling Groq API:", error.message);
    res.status(500).json({ reply: "Sorry, I had an issue processing your request." });
  }
});

app.listen(port, () => {
  console.log(`✅ TechVidhya backend running on http://localhost:${port}`);
});
