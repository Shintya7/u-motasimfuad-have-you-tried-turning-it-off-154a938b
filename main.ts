// Have You Tried Turning It Off? — one funny line a hopeless tech support
// agent says to a desperate customer. The program writes the line to
// /output/entry.txt (or $OUTPUT_PATH).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Have you tried turning it off and on again? I ask because that's also my entire plan for this call.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 199 characters,
// not only whitespace. Validate the line before writing it.
function validateLine(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > 199) {
    throw new Error(`line must be 1-199 characters, got ${chars.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("line must be a single line");
  }
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("line must not contain control characters");
  }
  if (!/[A-Za-z]/.test(line)) {
    throw new Error("line must contain letters");
  }
}

try {
  validateLine(LINE);
} catch (err) {
  console.error(`error: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
}

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
