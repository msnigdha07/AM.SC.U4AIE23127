import { Log } from "./logger.js";

async function testLog() {
  const result = await Log(
    "frontend",
    "info",
    "component",
    "Navbar rendered successfully"
  );

  console.log(result);
}

testLog();