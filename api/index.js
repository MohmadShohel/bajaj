import express from "express";
import { z } from "zod";
import { config } from "dotenv";
import cors from "cors";

config();
const configSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
});

const env = configSchema.parse(process.env);
const app = express();
app.use(
  cors({
    origin: "http://13.235.132.143:3000/bfhl",
  })
);
app.use(express.json());

app.get("/bfhl", async (req, res) => {
  return res.status(200).json({
    operation_code: 1,
  });
});
app.post("/bfhl", async (req, res) => {
  try {
    const { data } = req.body;
    let numbers = [];
    let alphabets = [];
    let lowercase_alphabet = [];
    for (let i = 0; i < data.length; i++) {
      if (!isNaN(data[i])) {
        numbers.push(data[i]);
      } else if (
        data[i].toLowerCase().charCodeAt(0) >= 97 &&
        data[i].toLowerCase().charCodeAt(0) <= 122
      ) {
        alphabets.push(data[i]);
        if (lowercase_alphabet.length === 0) {
          lowercase_alphabet.push(data[i]);
        } else {
          if (lowercase_alphabet[0].charCodeAt(0) < data[i].charCodeAt(0)) {
            lowercase_alphabet = [];
            lowercase_alphabet.push(data[i]);
          } else if (
            lowercase_alphabet[0].charCodeAt(0) === data[i].charCodeAt(0)
          ) {
            lowercase_alphabet.push(data[i]);
          }
        }
      }
    }

    if (!data) {
      return res.status(400).json({
        is_success: false,
      });
    } else {
      return res.status(200).json({
        is_success: true,
        user_id: "mohmad_shohel12072002",
        email: "mohmad.shohel2021@vitstudent.ac.in",
        roll_number: "21BIT0025",
        numbers,
        alphabets,
        lowercase_alphabet,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      is_success: false,
      message: "internal server error",
    });
  }
});
app.listen(env.PORT, () => {
  console.log(`Server is running on PORT ${env.PORT}`);
});
