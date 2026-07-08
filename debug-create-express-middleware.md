[OPEN] create-express-middleware

Issue
- Runtime error when starting the TypeScript MCP server around `createExpressMiddleware`.

Hypotheses
- H1: `McpServer` from `@modelcontextprotocol/sdk/server/mcp.js` does not expose `createExpressMiddleware()` in the installed SDK version.
- H2: Express integration moved to a different transport/API in SDK v1.29.0, so current server bootstrap uses an outdated example.
- H3: The default export from `src/mcp/index.ts` is initialized correctly, but the runtime object shape differs from expected due to ESM import/version mismatch.
- H4: The app entrypoint starts `src/mcp/server.ts` eagerly, so any missing method throws during boot before tools register fully.

Evidence plan
- Inspect installed SDK types/source for `createExpressMiddleware` support.
- Reproduce startup failure and capture exact stack trace.
- Compare available server transports in installed package and adapt bootstrap to supported API.

Status
- Open
