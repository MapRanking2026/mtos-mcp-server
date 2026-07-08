import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";
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

const handlePost = async (req: Request, res: Response) => {
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
};

const handleGet = async (_req: Request, res: Response) => {
  res.status(405).set("Allow", "POST").send("Method Not Allowed");
};

// Serve the MCP endpoint at both "/" and "/mcp" since some clients (e.g.
// ClickUp's "Connect an MCP Server" form) expect the bare URL to work.
app.post("/mcp", handlePost);
app.get("/mcp", handleGet);
app.post("/", handlePost);
app.get("/", handleGet);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Monthly Touch OS MCP running on port ${PORT}`);
});
