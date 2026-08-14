const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const strictPromptTemplate = require("./StrictPrompt");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

console.log("✅ Starting backend setup...");

// ⚠️ Use env variable in production
const genAI = new GoogleGenerativeAI("AIzaSyCZGt7GAz-zAS1tPpj98px96JZsvSsGJ4k");

app.post("/api/message", async (req, res) => {
  const userMessage = req.body.message;
  console.log("👉 Received message from frontend:", userMessage);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    console.log("✅ Gemini model initialized");

    const strictPrompt = `${strictPromptTemplate}\n\nQuestion: ${userMessage}\nAnswer:`;

    const result = await model.generateContent(strictPrompt);
    const text = result.response.text();

    console.log("✅ Gemini response:", text);
    res.json({ reply: text });
  } catch (error) {
    console.error("🔥 Error calling Gemini API:", error);
    res.status(500).json({ reply: "Sorry, I had an issue processing your request." });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
