# Blaxel Agent - Zendesk Ticket Analyzer

<p align="center">
  <img src="https://blaxel.ai/logo.png" alt="Blaxel"/>
</p>

This repository implements a Zendesk Ticket Analysis agent built using the [Blaxel SDK](https://blaxel.ai). The agent processes Zendesk support tickets and provides automated analysis including ticket categorization, sentiment analysis, and summary generation. It can analyze tickets based on their ticket numbers and provide insights such as the ticket category (technical, billing, feature, account, or general), sentiment score, and sentiment label.

## How it works

The agent processes Zendesk support tickets through a streamlined analysis pipeline:

1. **Ticket Retrieval**

   - Uses the Zendesk API to fetch ticket details using the provided ticket number
   - Authenticates using configured Zendesk credentials (username, API token, and URI)

2. **Analysis Pipeline**

   - Processes the ticket description to determine:
     - Category classification (technical, billing, feature, account, or general)
     - Sentiment analysis with score (-1 to 1) and label (positive, negative, or neutral)
     - Generates a comprehensive ticket summary

3. **Components**

   - `ZendeskAnalyzer`: Core function that interfaces with the Zendesk API
   - GPT-4 powered analysis for accurate categorization and sentiment detection
   - Secure credential management through environment variables

4. **Execution Flow**
   ```
   Ticket ID → Zendesk API → Content Analysis → Insights Generation → Response
   ```

The agent provides a comprehensive analysis of support tickets, helping teams understand ticket context, urgency, and customer sentiment at a glance.

## Prerequisites

- **Node.js:** v18 or later.
- **Blaxel CLI:** Ensure you have the Blaxel CLI installed. If not, install it globally:
  ```bash
  curl -fsSL https://raw.githubusercontent.com/beamlit/toolkit/main/install.sh | BINDIR=$HOME/.local/bin sh
  ```
- **Blaxel login:** Login to Blaxel platform
  ```bash
    bl login YOUR-WORKSPACE
  ```

## Installation

- **Clone the repository and install the dependencies**:

  ```bash
  git clone https://github.com/beamlit/template-zendesk-ticket-analyzer.git
  cd template-zendesk-ticket-analyzer
  npm install
  ```

- **Environment Variables:** Create a `.env` file with your configuration. You can begin by copying the sample file:

  ```bash
  cp .env-sample .env
  ```

  Then, update the following values with your own credentials:

  - Zendesk credentials: `ZENDESK_USERNAME`, `ZENDESK_API_TOKEN`, `ZENDESK_URI`

- **Blaxel apply:** register your integration connection / functions / models on blaxel.ai

```bash
bl apply -R -f .blaxel
```

## Running the Server Locally

Start the development server with hot reloading using the Blaxel CLI command:

```bash
bl serve --hotreload
```

_Note:_ This command starts the server and enables hot reload so that changes to the source code are automatically reflected.

## Testing the agent

The server will start on port 1338. You can test the agent using the Blaxel CLI:

```bash
bl run agent my-agent --local --data '{"inputs":"Can you give information about the ticket number 1234567890"}'
OR
bl chat my-agent --local
```

## Deploying to Blaxel

When you are ready to deploy your application, run:

```bash
bl deploy
```

This command uses your code and the configuration files under the `.blaxel` directory to deploy your application.

## Project Structure

- **src/**
  - `index.ts` - The main entry point of the application.
  - `agent.ts` - Configures the chat agent, streams HTTP
    responses, and integrates conversational context.
  - `tools` - Directory to add your tools available to your agent.
  - `config.ts` - Contains configuration and environment variable setup.
- **.blaxel/** - Contains configuration files for Blaxel functions and models.
- **tsconfig.json** - TypeScript compiler configuration.
- **package.json** - Lists dependencies and defines various project scripts.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
