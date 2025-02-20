import * as Zendesk from "node-zendesk";
// import { ChatOpenAI } from "@langchain/openai";
import { getChatModel } from "@blaxel/sdk";
import { wrapFunction } from "@blaxel/sdk";
import { zendeskConfig } from "../config";
import { z } from "zod";

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
const getTicket = async (ticketId: number): Promise<any> => {
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

export default wrapFunction(analyzeTicket, {
  name: "zendesk-ticket-analyzer",
  description:
    "Analyzes a Zendesk ticket to provide categorization, sentiment analysis, and a summary",
  parameters: [
    {
      name: "ticketId",
      type: "number",
      description: "The Zendesk ticket ID to analyze",
    },
  ],
  function: {
    runtime: {
      envs: [
        {
          name: "ZENDESK_USERNAME",
          value: zendeskConfig.username,
        },
        {
          name: "ZENDESK_API_TOKEN",
          value: zendeskConfig.token,
        },
        {
          name: "ZENDESK_URI",
          value: zendeskConfig.remoteUri,
        },
      ],
    },
  },
});
