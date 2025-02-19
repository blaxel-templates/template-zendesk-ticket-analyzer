import dotenv from "dotenv";

dotenv.config();

export const zendeskConfig = {
  username: process.env.ZENDESK_USERNAME!,
  token: process.env.ZENDESK_API_TOKEN!,
  remoteUri: process.env.ZENDESK_URI!,
};
