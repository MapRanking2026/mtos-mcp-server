import { randomUUID } from "node:crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import server from "./index.js";

const app = createMcpExpressApp({
  host: "0.0.0.0",
  allowedHosts: [
    "mtosmcp.mapranking.com",
    "localhost",
    "127.0.0.1",
  ],
});

const transports = new Map<string, StreamableHTTPServerTransport>();

function createTransport() {
  let transport: StreamableHTTPServerTransport;

  transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: (sessionId) => {
      transports.set(sessionId, transport);
    },
  });

  transport.onclose = () => {
    const { sessionId } = transport;
    if (sessionId) {
      transports.delete(sessionId);
    }
  };

  return transport;
}

app.post("/mcp", async (req, res) => {
  try {
    const sessionIdHeader = req.headers["mcp-session-id"];
    const sessionId = Array.isArray(sessionIdHeader)
      ? sessionIdHeader[0]
      : sessionIdHeader;

    let transport = sessionId ? transports.get(sessionId) : undefined;

    if (!transport) {
      if (sessionId || !isInitializeRequest(req.body)) {
        res.status(400).json({
          jsonrpc: "2.0",
          error: {
            code: -32000,
            message: "Bad Request: No valid session ID provided",
          },
          id: null,
        });
        return;
      }

      transport = createTransport();
      await server.connect(transport);
    }

    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: error instanceof Error ? error.message : "Internal server error",
        },
        id: null,
      });
    }
  }
});

app.get("/mcp", async (_req, res) => {
  res.status(405).set("Allow", "POST").send("Method Not Allowed");
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Monthly Touch OS MCP running on port ${PORT}`);
});
