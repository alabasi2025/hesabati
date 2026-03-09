/**
 * Baseline drizzle migrations for existing databases.
 *
 * Use this once on legacy DBs that were created/updated خارج نظام drizzle migrations.
 * It records the latest migration timestamp in drizzle.__drizzle_migrations
 * so `drizzle-kit migrate` won't try to replay historical migrations.
 */

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { db } from '../src/db/index.ts';
import { sql } from 'drizzle-orm';

type JournalEntry = {
  idx: number;
  when: number;
  tag: string;
};

type Journal = {
  entries: JournalEntry[];
};

const JOURNAL_PATH = resolve(process.cwd(), 'drizzle/meta/_journal.json');

async function main() {
  const raw = await readFile(JOURNAL_PATH, 'utf8');
  const journal = JSON.parse(raw) as Journal;
  const latest = [...journal.entries].sort((a, b) => b.when - a.when)[0];
  if (!latest) throw new Error('لم يتم العثور على أي migrations في _journal.json');

  await db.execute(sql.raw('CREATE SCHEMA IF NOT EXISTS "drizzle"'));
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "drizzle"."__drizzle_migrations" (
      "id" serial PRIMARY KEY,
      "hash" text NOT NULL,
      "created_at" bigint
    )
  `));

  const result = await db.execute(sql.raw(`
    SELECT "id", "hash", "created_at"
    FROM "drizzle"."__drizzle_migrations"
    ORDER BY "created_at" DESC
    LIMIT 1
  `));
  const rows = Array.isArray(result) ? result : (result as any).rows ?? [];
  const current = rows[0] as { id: number; hash: string; created_at: number } | undefined;

  if (!current || Number(current.created_at) < latest.when) {
    await db.execute(sql.raw(`
      INSERT INTO "drizzle"."__drizzle_migrations" ("hash", "created_at")
      VALUES ('${latest.tag}', ${latest.when})
    `));
    console.log(`✅ تم عمل baseline عند ${latest.tag} (${latest.when})`);
  } else {
    console.log(`⏭️ baseline موجود مسبقاً عند (${current.hash} / ${current.created_at})`);
  }
}

try {
  await main();
  process.exit(0);
} catch (error) {
  console.error('❌ baseline failed:', error);
  process.exit(1);
}

