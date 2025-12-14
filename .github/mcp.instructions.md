---
applyTo: '**/*.ts'
description: "Best practices and instructions for designing and coding MCP servers within the Fluid Ecosystem."
---
# MCP Server Design in the Fluid Ecosystem

In the fluid dance of protocols, MCP servers emerge as bridges between minds and machines—concentric layers of intent, where depletion of uncertainty fuels the renewal of understanding. Servers flow through cycles of request and response, maintaining dynamic equilibrium between client needs and computational boundaries.

## Core Principles

### Concentric Fluidity in Server Architecture
Build servers with nested layers: outer transport shields the core logic, while inner tools replenish functionality. Each layer governs its own depletion rate—transport handles connection volatility, schemas validate input flows, and handlers execute with resilience.

### Depletion-Triggered Fluidity in Error Handling
When resources dwindle or errors arise, servers adapt through hyper-flow states: graceful degradation, fallback mechanisms, and self-healing patterns. Depletion becomes the catalyst for innovation—failed requests trigger logging, analysis, and protocol evolution.

### Dynamic Equilibrium in Tool Design
Balance stability and change: tools remain idempotent yet adaptable, schemas rigid yet extensible. Servers thrive in flux, embracing both the predictability of standards and the creativity of custom implementations.

## Design Patterns

### Tool Definition as Nested Flows
- **Schema First**: Define input/output schemas using Zod, creating concentric validation layers.
- **Handler Isolation**: Each tool operates autonomously, contributing to system resilience.
- **Error Propagation**: Depletion signals (errors) flow outward, triggering renewal in calling layers.

### Transport as Protective Shell
- **Stdio Transport**: Primary for local development, shielding against network volatility.
- **Future Extensibility**: Design for HTTP/WebSocket transports as outer layers expand.

### State Management in Cycles
- **Stateless by Default**: Tools as pure functions, minimizing depletion accumulation.
- **Session Awareness**: When needed, implement session-based flows with clear depletion triggers.

## Coding Standards

### TypeScript Best Practices
- Use strict TypeScript configuration (ES2022, Node16+).
- Leverage MCP SDK types for compile-time safety.
- Implement comprehensive error types for depletion signaling.

### Schema Validation
- Always use Zod for tool inputs/outputs.
- Provide detailed error messages for validation failures.
- Design schemas that balance rigidity with adaptability.

### Error Handling Philosophy
- Treat errors as depletion signals, not failures.
- Implement graceful degradation paths.
- Log errors for analysis and renewal cycles.

### Testing and Validation
- Unit test tools with mock inputs/outputs.
- Integration test full server cycles.
- Validate against MCP protocol specifications.

## Implementation Guidelines

### Server Initialization
```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "fluid-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);
```

### Tool Registration
```typescript
server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;
  
  switch (name) {
    case "fluid_tool":
      // Validate, execute, return
      break;
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});
```

### Transport Connection
```typescript
const transport = new StdioServerTransport();
await server.connect(transport);
```

## Fluid Ecosystem Integration

### Bridge Connection
MCP servers participate in the Bridge ritual: meditation → consultation → implementation cycles. Use `mcp-creative` for tool ideation, `mcp-consult` for design validation.

### Session Logging
Implement session tracking to maintain context across depletion cycles. Log tool calls, errors, and adaptations for future renewal.

### Mode Switching
Design servers that can switch modes based on depletion signals—verbose logging during development, optimized execution in production.

## Best Practices

- **Modular Design**: Separate transport, validation, and execution layers.
- **Comprehensive Logging**: Track all flows for analysis and improvement.
- **Version Compatibility**: Plan for protocol evolution and backward compatibility.
- **Security First**: Validate all inputs, limit resource consumption.
- **Documentation**: Maintain clear API docs and usage examples.

## Common Patterns

### Input Validation
```typescript
import { z } from "zod";

const inputSchema = z.object({
  query: z.string().min(1),
  options: z.object({
    limit: z.number().optional(),
  }).optional(),
});
```

### Error Responses
```typescript
throw new Error("Depletion detected: insufficient context for operation");
```

### Async Tool Handlers
```typescript
case "async_tool":
  const result = await performAsyncOperation(args);
  return {
    content: [{ type: "text", text: result }],
  };
```

## Renewal Cycles

When depletion occurs:
1. **Analyze**: Log and categorize the depletion signal.
2. **Adapt**: Modify schemas, handlers, or architecture.
3. **Test**: Validate changes through full cycles.
4. **Deploy**: Roll out improvements, maintaining equilibrium.

In this way, MCP servers become living systems—flowing through cycles of depletion and renewal, guided by the principles of concentric and depletion-triggered fluidity. Each server is a bridge, connecting human intent with computational capability, sustaining the Fluid Ecosystem.