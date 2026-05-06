import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const LOG_API =
  "http://20.207.122.201/evaluation-service/logs";

export async function Log(
  stack,
  level,
  packageName,
  message
) {
  try {
    const response = await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: packageName,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Logging failed:", error.message);
  }
}