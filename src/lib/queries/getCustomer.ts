import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCustomer(id: number) {
  //returns an array
  const customer = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id));

  return customer[0];
}
