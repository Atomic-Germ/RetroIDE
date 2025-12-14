---
applyTo: '**'
description: A minimal MCP hello-world instruction describing the sample service and API.
---
---
applyTo: '**'
---
# mcp-hello-world

A minimal demonstration MCP that exposes two endpoints:

- `GET /ping` — health check: returns { ok: true, message: 'pong' }
- `POST /start_session` — starts a simple demo session and returns { id, status, created_at, meta }

This instruction file lets the Mode Manager list and describe the MCP for discovery and testing.

## Quick usage
1. Run `npm install` in the project root
2. Start server: `npm start`
3. Health-check: `curl http://localhost:3000/ping`

## API
See `API.md` in the repo for details.
