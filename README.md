# Blaxel Agent - Zendesk Ticket Analyzer

<div align="center">
  <img src="https://blaxel.ai/logo.png" alt="Blaxel" width="200"/>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Node.js](https://img.shields.io/badge/Node.js-%3E=18-brightgreen.svg)](https://nodejs.org/)
</div>

An agent that integrates with the Zendesk API to fetch, analyze, and summarize support tickets using Blaxel SDK.

## 📋 Table of Contents

- [🚀 Features](#-features)
- [⚡️ Quick Start](#-quick-start)
- [📋 Prerequisites](#-prerequisites)
- [💻 Installation](#-installation)
- [🧩 Usage](#-usage)
  - [Running Locally](#running-locally)
  - [Testing Your Agent](#testing-your-agent)
  - [Deployment to Blaxel](#deployment-to-blaxel)
- [📖 API Reference](#-api-reference)
- [🗂️ Project Structure](#️-project-structure)
- [🔍 Examples](#-examples)
- [🐞 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [💬 Support](#-support)
- [📄 License](#-license)

## 🚀 Features

- **Ticket Retrieval**: Fetch ticket details via Zendesk API using ticket number.  
- **Analysis Pipeline**: Perform category classification, sentiment analysis (score & label), and generate summary.  
- **Secure Credentials**: Manage Zendesk credentials via environment variables.  
- **Extensible**: Easily adapt to new analysis components or data sources.

## ⚡️ Quick Start

```bash
git clone https://github.com/blaxel-templates/template-zendesk-ticket-analyzer.git
cd template-zendesk-ticket-analyzer
env .env-sample .env
npm install
```

Configure your `.env` with Zendesk credentials and Blaxel API token.

## 📋 Prerequisites

- **Node.js**: v18 or later  
- **Blaxel CLI**: Ensure the [Blaxel CLI](https://github.com/blaxel-ai/toolkit) is installed (`npm install -g @blaxel/cli`)

## 💻 Installation

```bash
git clone https://github.com/blaxel-templates/template-zendesk-ticket-analyzer.git
cd template-zendesk-ticket-analyzer
npm install
env .env-sample .env
```

Update the following in your `.env`:  
```bash
ZENDESK_USERNAME=your_username
ZENDESK_API_TOKEN=your_token
ZENDESK_URL=https://your-domain.zendesk.com
BLAXEL_API_TOKEN=your_blaxel_api_token
```

## 🧩 Usage

### Running Locally

```bash
bl serve --hotreload
```

_This starts the server with hot reload for instant code updates._

### Testing Your Agent

```bash
bl chat zendesk-ticket-analyzer --local
```

### Deployment to Blaxel

```bash
bl deploy
```

## 📖 API Reference

- **POST** `/agents/{agent_id}/run`  
  Run the agent with input:  
  ```json
  { "ticket_number": "1234567890" }
  ```
- **GET** `/agents/{agent_id}/info`  
  Retrieve agent configuration and metadata.
- **GET** `/health`  
  Health check endpoint.

_For detailed API docs, see your Blaxel dashboard._

## 🗂️ Project Structure

```
template-zendesk-ticket-analyzer/
├─ .blaxel/             # Blaxel agent config
├─ src/                 # Source code
│  ├─ index.js          # Entry point
│  └─ zendeskAnalyzer.js# Core analysis logic
├─ .env-sample          # Sample environment variables
├─ package.json         # Project dependencies & scripts
├─ package-lock.json    # Lockfile
└─ README.md            # This file
```

## 🔍 Examples

**Run analysis via cURL**
```bash
curl -X POST http://localhost:1338/agents/{agent_id}/run \
  -H "Content-Type: application/json" \
  -d '{"ticket_number":"1234567890"}'
```

**Get agent info**
```bash
curl http://localhost:1338/agents/{agent_id}/info
```

## 🐞 Troubleshooting

- **Node version**: Ensure you use Node.js >=18.  
- **Blaxel CLI**: Verify `bl --version` outputs the installed version.  
- For other issues, open an issue on GitHub.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository  
2. **Create** your feature branch (`git checkout -b feature/your-feature`)  
3. **Commit** your changes (`git commit -m "feat: add new feature"`)  
4. **Push** to the branch (`git push origin feature/your-feature`)  
5. **Submit** a Pull Request

## 💬 Support

If you need help, open an issue or contact the Blaxel team.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
