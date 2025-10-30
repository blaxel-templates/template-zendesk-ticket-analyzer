import { tool } from "ai";
import * as Zendesk from "node-zendesk";
import { z } from "zod";
import { zendeskConfig } from "../config";

interface TicketAnalysis {
  description: string;
}

// Create Zendesk client
const client = Zendesk.createClient({
  username: zendeskConfig.username,
  token: zendeskConfig.token,
  remoteUri: zendeskConfig.remoteUri,
});

// Get ticket from Zendesk
const getTicket = async (ticketId: number): Promise<TicketAnalysis | null> => {
  return new Promise((resolve, reject) => {
    client.tickets.show(ticketId, (err: any, req: any, ticket: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(ticket);
    });
  });
};

// Return the ticket description
const analyzeTicket = async ({
  ticketId,
}: {
  ticketId: number;
}): Promise<TicketAnalysis | null> => {
  try {
    // Fetch ticket from Zendesk
    const ticket = await getTicket(ticketId);
    if (!ticket) {
      return null;
    }

    return {
      description: ticket.description,
    };
  } catch (error) {
    console.error("Error analyzing ticket:", error);
    return null;
  }
};

export const analyzeTicketTool = tool({
  description:
    "Analyzes a Zendesk ticket to provide categorization, sentiment analysis, and a summary",
  inputSchema: z.object({ ticketId: z.number() }),
  execute: analyzeTicket,
});
