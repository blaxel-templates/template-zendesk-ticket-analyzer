import { blModel } from "@blaxel/sdk";
import { Agent } from "@mastra/core/agent";
import { analyzeTicketTool } from "./tools/zendesk-ticket-analyzer";

interface Stream {
  write: (data: string) => void;
  end: () => void;
}

export default async function agent(
  input: string,
  stream: Stream
): Promise<void> {
  const agent = new Agent({
    name: "zendesk-ticket-analyzer",
    model: await blModel("sandbox-openai").ToMastra(),
    instructions: `
You are an expert Zendesk support agent.
If someone ask you a question about a ticket, giving you the ticket number, you should retreive it and analyze the ticket description and provide:
1. A category (technical, billing, feature, account, or general)
2. Sentiment score (-1 to 1, where -1 is very negative, 0 is neutral, and 1 is very positive)
3. Sentiment label (positive, negative, or neutral)

Return a summary of the ticket description, the category, the sentiment score and the sentiment label.
    `,
    tools: {
      analyzeTicketTool,
    },
  });

  const response = await agent.stream([{ role: "user", content: input }]);

  let fullText = "";
  for await (const delta of response.textStream) {
    fullText += delta;
    stream.write(delta);
  }
  stream.end();
}
