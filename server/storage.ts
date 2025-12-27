import { db } from "./db";
import {
  simulations,
  type InsertSimulation,
  type Simulation
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createSimulation(simulation: InsertSimulation): Promise<Simulation>;
}

export class DatabaseStorage implements IStorage {
  async createSimulation(insertSimulation: InsertSimulation): Promise<Simulation> {
    const [simulation] = await db
      .insert(simulations)
      .values(insertSimulation)
      .returning();
    return simulation;
  }
}

export const storage = new DatabaseStorage();
