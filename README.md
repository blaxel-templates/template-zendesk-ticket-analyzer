# Blaxel Agent - Zendesk Ticket Analyzer

[![CI](https://github.com/blaxel-templates/template-zendesk-ticket-analyzer/actions/workflows/ci.yml/badge.svg)](https://github.com/blaxel-templates/template-zendesk-ticket-analyzer/actions)
[![npm version](https://img.shields.io/npm/v/@blaxel/zendesk-ticket-analyzer?color=crimson)](https://www.npmjs.com/package/@blaxel/zendesk-ticket-analyzer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<p align="center">
  <img src="https://blaxel.ai/logo.png" alt="Blaxel" width="120">
</p>

**Zendesk Ticket Analyzer** processes tickets via Blaxel SDS-K core. It fetches ticket details, classifies categories, scores sentiment, and generates summaries.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Run Server Locally](#run-server-locally)
  - [Test Agent](#test-agent)
- [API Reference](#api-reference)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- Retrieve ticket details with authenticated Zendesk API
- Classify tickets by category (technical, billing, feature, account, general)
- Score sentiment and label (positive, negative, neutral)
- Generate actionable summaries via GPT-4
- Secure credential handling via environment variables

## Getting Started

### Prerequisites

- Node.js v18+
- Blaxel CLI installed

```bash
curl -fsSL https://raw.githubusercontent.com/blaxel-ai/toolkit/main/install.sh | BINDIR=$HOME/.local/bin bash
```

### Installation

```bash
git clone https://github.com/blaxel-templates/template-zendesk-ticket-analyzer.git
cd template-zendesk-ticket-analyzer
npm install
```

### Configuration

Create a `.env` file:

```env
ZENDESK_USERNAME=your_username
ZENDESK_API_TOKEN=your_api_token
ZENDESK_URL=https://yourdomain.zendesk.com
```

## Usage

### Run Server Locally

```bash
bl serve --hotreload
```

### Test Agent

```bash
bl run agent zendeskAnalyzer --local --data '{"inputs":"Can you give information about ticket #123456"}'
```

## API Reference

### POST /agent

Invoke the agent with input:

**Request**

```http
POST /agent HTTP/1.1
Content-Type: application/json

{
  "agent": "zendeskAnalyzer",
  "inputs": "Analyze ticket #1234"
}
```

**Response**

```json
{
  "category": "technical",
  "sentiment": "positive",
  "summary": "The ticket reports an issue with API authentication. Steps to reproduce..."
}
```

## Development

Project structure:

```
src/
├─ index.ts        # main entry point
├─ agent.ts        # defines chat agent
└─ tools/          # helper modules
```

Run linter/tests:

```bash
npm run lint
npm test
```

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

1. Fork the repo.
2. Create feature branch: `git checkout -b feature/NAME`
3. Commit changes.
4. Push to your fork.
5. Open a Pull Request.

## License

Licensed under MIT. See [LICENSE](LICENSE) for details.
