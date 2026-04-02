import { pgClient } from "../src/db/index.ts";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const log: string[] = [];

async function main() {
  log.push("Adding color columns...");

  const check1 = await pgClient`
    SELECT column_name FROM information_schema.columns
    WHERE table_name='sidebar_sections' AND column_name='color'
  `;

  if (check1.length === 0) {
    await pgClient`ALTER TABLE sidebar_sections ADD COLUMN color varchar(30) DEFAULT '#6366f1'`;
    log.push("Added color column to sidebar_sections");
  } else {
    log.push("sidebar_sections.color already exists");
  }

  const check2 = await pgClient`
    SELECT column_name FROM information_schema.columns
    WHERE table_name='sidebar_items' AND column_name='color'
  `;

  if (check2.length === 0) {
    await pgClient`ALTER TABLE sidebar_items ADD COLUMN color varchar(30)`;
    log.push("Added color column to sidebar_items");
  } else {
    log.push("sidebar_items.color already exists");
  }

  log.push("Done!");
  const outPath = resolve(
    import.meta.dirname ?? ".",
    "scripts/migration-result.txt",
  );
  writeFileSync(outPath, log.join("\n"), "utf-8");
  await pgClient.end();
}

main().catch((err) => {
  log.push("ERROR: " + String(err));
  const outPath = resolve(
    import.meta.dirname ?? ".",
    "scripts/migration-result.txt",
  );
  writeFileSync(outPath, log.join("\n"), "utf-8");
  pgClient.end().then(() => process.exit(1));
});
