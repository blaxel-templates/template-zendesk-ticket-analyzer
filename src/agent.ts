import { getDefaultThread, wrapAgent } from "@blaxel/sdk";
import { HumanMessage } from "@langchain/core/messages";
import { CompiledGraph } from "@langchain/langgraph";
import { FastifyRequest } from "fastify";
import { v4 as uuidv4 } from "uuid";
import { ZendeskAnalyzer } from "./functions/zendeskAnalyzer";
import { zendeskConfig } from "./config";

type InputType = {
  inputs: string | null;
  input: string | null;
  ticketId?: string | number;
};

type AgentType = {
  agent: CompiledGraph<any, any, any, any, any, any>;
};

const req = async (request: FastifyRequest, args: AgentType) => {
  const { agent } = args;
  const body = (await request.body) as InputType;
  const thread_id = getDefaultThread(request) || uuidv4();
  const input = body.inputs || body.input || "";
  const responses: any[] = [];

  const stream = await agent.stream(
    { messages: [new HumanMessage(input)] },
    { configurable: { thread_id } }
  );

  for await (const chunk of stream) {
    responses.push(chunk);
  }
  const content = responses[responses.length - 1];
  return content.agent.messages[content.agent.messages.length - 1].content;
};

export const agent = wrapAgent(req, {
  agent: {
    metadata: {
      name: "zendesk-ticket-analyzer",
    },
    spec: {
      model: "gpt-4o-test-mep-nick",
      prompt: `
You are an expert Zendesk support agent.
If someone ask you a question about a ticket, giving you the ticket number, you should retreive it and analyze the ticket description and provide:
1. A category (technical, billing, feature, account, or general)
2. Sentiment score (-1 to 1, where -1 is very negative, 0 is neutral, and 1 is very positive)
3. Sentiment label (positive, negative, or neutral)

Return a summary of the ticket description, the category, the sentiment score and the sentiment label.
    `,
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
  },
});
