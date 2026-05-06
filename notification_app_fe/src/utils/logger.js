import axios from "axios";

const ACCESS_TOKEN =
  import.meta.env.VITE_ACCESS_TOKEN;

const LOG_API =
  "http://20.207.122.201/evaluation-service/logs";

export async function Log(
  stack,
  level,
  packageName,
  message
) {
  try {
    await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: packageName,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      }
    );
  } catch (error) {
    console.error(
      "Logging Failed"
    );
  }
}