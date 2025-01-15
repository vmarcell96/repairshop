import { db } from "@/db";
import { customers, tickets } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getOpenTickets() {
    const results = db
        .select({
            ticketDate: tickets.createdAt,
            title: tickets.title,
            firstName: customers.firstName,
            lastName: customers.lastName,
            email: customers.email,
            tech: tickets.tech,
        })
        .from(tickets)
        .leftJoin(customers, eq(tickets.customerId, customers.id))
        .where(eq(tickets.completed, false));

    return results;
}
