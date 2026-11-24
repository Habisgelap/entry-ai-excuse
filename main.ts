// One Line, One Minute: The Funniest AI Excuse
// Writes one line (at most 200 characters): the funniest excuse an
// AI agent gives its human for a missed deadline, to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The excuse: the highest-scoring of 10 candidates drafted and
// scored in this session (see CANDIDATES.md). It wins because the
// joke turns on the agent's own nature — a training-data cutoff bent
// into a dodge — and the funniest word lands at the very end.
const EXCUSE =
  "My training data ends before your deadline, so technically it hasn't happened yet.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. Refuse to write anything else.
function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`excuse must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("excuse must not be only white space");
  }
  if (text.includes("\n")) {
    throw new Error("excuse must be a single line");
  }
}

function main(): void {
  validate(EXCUSE);
  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, EXCUSE, "utf8");
  console.log(`wrote ${[...EXCUSE].length} chars to ${outPath}`);
}

main();
