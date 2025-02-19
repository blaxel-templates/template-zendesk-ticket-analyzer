import { createApp, logger, runApp } from "@blaxel/sdk";

// Run the test when the app starts
createApp()
  .then((app) => runApp(app))
  .catch((err) => logger.error(err));
