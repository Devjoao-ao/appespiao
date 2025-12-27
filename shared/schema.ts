import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const simulations = pgTable("simulations", {
  id: serial("id").primaryKey(),
  gender: text("gender").notNull(), // 'male' | 'female'
  phoneNumber: text("phone_number"),
  step: text("step").default("initial"), // tracking progress
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSimulationSchema = createInsertSchema(simulations).pick({
  gender: true,
  phoneNumber: true,
  step: true,
});

export type Simulation = typeof simulations.$inferSelect;
export type InsertSimulation = z.infer<typeof insertSimulationSchema>;
