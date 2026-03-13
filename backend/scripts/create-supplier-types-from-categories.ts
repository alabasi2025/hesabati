import "dotenv/config";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "../src/db/index.ts";
import { suppliers, supplierTypes } from "../src/db/schema/index.ts";
import { getNextCategorySequence } from "../src/middleware/sequencing.ts";

async function run() {
  const suppliersWithoutType = await db
    .select({
      id: suppliers.id,
      businessId: suppliers.businessId,
      category: suppliers.category,
      supplierTypeId: suppliers.supplierTypeId,
    })
    .from(suppliers)
    .where(isNull(suppliers.supplierTypeId));

  const createdTypes = new Map<string, number>();
  let updated = 0;

  for (const supplier of suppliersWithoutType) {
    const category =
      typeof supplier.category === 'string' && supplier.category.trim()
        ? supplier.category.trim()
        : 'legacy_supplier';

    const cacheKey = `${supplier.businessId}-${category}`;
    let typeId = createdTypes.get(cacheKey);

    if (!typeId) {
      const [existing] = await db
        .select({ id: supplierTypes.id })
        .from(supplierTypes)
        .where(and(eq(supplierTypes.businessId, supplier.businessId), eq(supplierTypes.subTypeKey, category)))
        .limit(1);

      if (existing) {
        typeId = Number(existing.id);
      } else {
        const seq = await getNextCategorySequence(supplier.businessId, 'fund', db as any);
        const [created] = await db
          .insert(supplierTypes)
          .values({
            businessId: supplier.businessId,
            name: category,
            subTypeKey: category,
            sequenceNumber: seq,
            icon: 'local_shipping',
            color: '#f97316',
            isActive: true,
            description: 'تم إنشاؤه تلقائياً من البيانات القديمة',
          })
          .returning({ id: supplierTypes.id });
        typeId = Number(created.id);
      }

      createdTypes.set(cacheKey, typeId);
    }

    await db
      .update(suppliers)
      .set({ supplierTypeId: typeId, updatedAt: new Date() })
      .where(eq(suppliers.id, supplier.id));
    updated++;
  }

  console.log(
    JSON.stringify(
      {
        suppliersUpdated: updated,
        uniqueTypesEnsured: createdTypes.size,
      },
      null,
      2,
    ),
  );
}

try {
  await run();
} catch (error) {
  console.error("Failed to create supplier types from categories:", error);
  process.exit(1);
}
