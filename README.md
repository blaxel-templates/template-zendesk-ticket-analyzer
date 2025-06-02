# Blaxel Zendesk Ticket Analyzer Agent

<p align="center">
  <img src="https://blaxel.ai/logo.png" alt="Blaxel" width="200"/>
</p>

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js 18+](https://img.shields.io/badge/node-18+-green.svg)](https://nodejs.org/en/download)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)](https://www.typescriptlang.org/)
[![Mastra](https://img.shields.io/badge/Mastra-powered-brightgreen.svg)](https://mastra.ai/)
[![Zendesk](https://img.shields.io/badge/Zendesk-integration-orange.svg)](https://www.zendesk.com/)

</div>

An intelligent customer support agent that automatically analyzes Zendesk tickets to provide categorization, sentiment analysis, and comprehensive summaries. This template integrates directly with the Zendesk API to retrieve ticket data and leverages AI models for advanced analysis including category classification, sentiment scoring, and automated insights generation. Built with Mastra and TypeScript for robust performance and seamless integration with the Blaxel platform.

## 📑 Table of Contents

- [✨ Features](#features)
- [🚀 Quick Start](#quick-start)
- [📋 Prerequisites](#prerequisites)
- [💻 Installation](#installation)
- [🔧 Usage](#usage)
  - [Running Locally](#running-locally)
  - [Testing](#testing)
  - [Deployment](#deployment)
- [📁 Project Structure](#project-structure)
- [❓ Troubleshooting](#troubleshooting)
- [👥 Contributing](#contributing)
- [🆘 Support](#support)
- [📄 License](#license)

## ✨ Features

- Automated Zendesk ticket analysis with comprehensive insights
- Multi-category classification (technical, billing, feature, account, general)
- Advanced sentiment analysis with numerical scoring (-1 to 1) and label classification
- Direct Zendesk API integration for real-time ticket retrieval
- Intelligent summary generation for ticket content
- Secure credential management with environment variable support
- Mastra-powered agent framework with tool integration
- Streaming responses for real-time analysis
- TypeScript implementation with robust type safety
- Easy deployment and integration with Blaxel platform

## 🚀 Quick Start

For those who want to get up and running quickly:

```bash
# Clone the repository
git clone https://github.com/blaxel-ai/template-zendesk-ticket-analyzer.git

# Navigate to the project directory
cd template-zendesk-ticket-analyzer

# Install dependencies
npm install

# Set up environment variables
cp .env-sample .env
# Edit .env with your Zendesk credentials

# Apply Blaxel configuration
bl apply -R -f .blaxel

# Start the development server
bl serve --hotreload

# In another terminal, test the agent
bl chat --local zendesk-ticket-analyzer
```

## 📋 Prerequisites

- **Node.js:** 18.0 or later
- **[NPM](https://www.npmjs.com/):** Node package manager
- **Zendesk Account:** Active Zendesk instance with API access
- **Zendesk API Token:** Generated from your Zendesk admin panel
- **[Blaxel CLI](https://docs.blaxel.ai/Get-started):** Ensure you have the Blaxel CLI installed. If not, install it globally:
  ```bash
  curl -fsSL https://raw.githubusercontent.com/blaxel-ai/toolkit/main/install.sh | BINDIR=/usr/local/bin sudo -E sh
  ```
- **Blaxel login:** Login to Blaxel platform
  ```bash
  bl login YOUR-WORKSPACE
  ```

## 💻 Installation

**Clone the repository and install dependencies:**

```bash
git clone https://github.com/blaxel-ai/template-zendesk-ticket-analyzer.git
cd template-zendesk-ticket-analyzer
npm install
```

**Set up environment variables:**

```bash
cp .env-sample .env
```

Edit the `.env` file with your Zendesk credentials:

```env
ZENDESK_USERNAME=your_zendesk_username # your zendesk username, generally your email
ZENDESK_API_TOKEN=your_zendesk_api_token # your zendesk api token
ZENDESK_URI=your_zendesk_uri # your zendesk uri (e.g. https://your-subdomain.zendesk.com/api/v2)
```

**Apply Blaxel configuration:**

```bash
bl apply -R -f .blaxel
```

This command registers your integration connections, functions, and models on the Blaxel platform.

## 🔧 Usage

### Running Locally

Start the development server with hot reloading:

```bash
bl serve --hotreload
```

For production build and run:

```bash
bl serve
```

_Note:_ The development server automatically restarts when you make changes to the source code and runs on port 1338.

### Testing

You can test your Zendesk ticket analyzer agent locally:

```bash
# Using the Blaxel CLI chat interface
bl chat --local zendesk-ticket-analyzer
```

Example queries you can test:

```
Can you give information about the ticket number 1234567890
```

```
Analyze ticket #5678 for me
```

```
What's the sentiment and category of ticket 9999?
```

You can also run it directly with specific input:

```bash
bl run agent zendesk-ticket-analyzer --local --data '{"input": "Can you give information about the ticket number 1234567890"}'
```

**Expected Analysis Output:**
- **Category:** One of technical, billing, feature, account, or general
- **Sentiment Score:** Numerical value from -1 (very negative) to 1 (very positive)
- **Sentiment Label:** positive, negative, or neutral
- **Summary:** Comprehensive analysis of the ticket content

### Deployment

When you are ready to deploy your agent:

```bash
bl deploy
```

This command uses your code and the configuration files under the `.blaxel` directory to deploy your Zendesk ticket analyzer as an agent on the Blaxel platform.

## 📁 Project Structure

- **src/index.ts** - Main application entry point and Fastify server setup
- **src/agent.ts** - Core agent implementation with Mastra framework integration
- **src/tools/zendesk-ticket-analyzer.ts** - Zendesk API integration tool for ticket retrieval
- **src/config.ts** - Configuration and environment variable setup
- **.blaxel/** - Blaxel configuration files for functions and models
- **blaxel.toml** - Blaxel deployment configuration with Zendesk environment variables
- **package.json** - NPM package configuration with scripts and dependencies
- **tsconfig.json** - TypeScript compiler configuration
- **.env-sample** - Template for required Zendesk environment variables
- **LICENSE** - MIT license file

## ❓ Troubleshooting

### Common Issues

1. **Blaxel Platform Issues**:
   - Ensure you're logged in to your workspace: `bl login MY-WORKSPACE`
   - Verify models are available: `bl get models`
   - Check that functions exist: `bl get functions`

2. **Zendesk API Connection Issues**:
   - Verify your Zendesk API token is valid and has proper permissions
   - Check that your Zendesk URI format is correct (e.g., https://your-subdomain.zendesk.com/api/v2)
   - Ensure your Zendesk username (usually email) is correct
   - Confirm your Zendesk instance allows API access

3. **Ticket Retrieval Issues**:
   - Verify the ticket number exists in your Zendesk instance
   - Check that the ticket is accessible with your API credentials
   - Ensure the ticket has content to analyze (description field)
   - Verify network connectivity to Zendesk servers

4. **Environment Configuration Issues**:
   - Ensure all required environment variables are set in `.env`
   - Check that sensitive credentials are properly configured in Blaxel secrets
   - Verify the `.blaxel` configuration is applied: `bl apply -R -f .blaxel`
   - Confirm environment variable names match those in `blaxel.toml`

5. **TypeScript and Build Issues**:
   - Make sure you have Node.js 18+
   - Try `npm install` to reinstall dependencies
   - Check for TypeScript compilation errors with `npm run build`
   - Verify all type definitions are properly installed

For more help, please [submit an issue](https://github.com/blaxel-templates/template-zendesk-ticket-analyzer/issues) on GitHub.

## 👥 Contributing

Contributions are welcome! Here's how you can contribute:

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push** to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Submit** a Pull Request

Please make sure to update tests as appropriate and follow the TypeScript code style of the project.

## 🆘 Support

If you need help with this template:

- [Submit an issue](https://github.com/blaxel-templates/template-zendesk-ticket-analyzer/issues) for bug reports or feature requests
- Visit the [Blaxel Documentation](https://docs.blaxel.ai) for platform guidance
- Check the [Mastra Documentation](https://mastra.ai/docs) for framework-specific help
- Review the [Zendesk API Documentation](https://developer.zendesk.com/api-reference/) for integration guidance
- Join our [Discord Community](https://discord.gg/G3NqzUPcHP) for real-time assistance

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
