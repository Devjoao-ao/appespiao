import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertSimulation } from "@shared/routes";

export function useCreateSimulation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertSimulation) => {
      const res = await fetch(api.simulations.create.path, {
        method: api.simulations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error("Failed to create simulation");
      }
      
      return api.simulations.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      // Optional: Invalidate queries if we had a list view
    },
  });
}
