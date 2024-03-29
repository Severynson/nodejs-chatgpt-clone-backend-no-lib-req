import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); // set up process.env;
const API_KEY = process.env.API_KEY;
const PORT = 8000;

const app = express();
app.use(express.json());
app.use(cors());

app.post("/completions", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.message }],
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.error(err);
  }
});

app.listen(
  PORT,
  () => void console.log(`Your server is running on PORT: ${PORT};`)
);
