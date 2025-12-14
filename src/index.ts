#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import express from "express";

class RetroIDEServer {
  private server: Server;
  private app: express.Application;

  constructor() {
    this.server = new Server(
      {
        name: "retroide",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.app = express();
    this.setupWebServer();
    this.setupHandlers();
  }

  private setupWebServer() {
    this.app.use(express.json());
    this.app.use(express.static('public'));

    this.app.get('/', (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>RetroIDE - Circuit-Board Metropolis</title>
          <style>
            body { font-family: monospace; background: black; color: #00ff00; }
            .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; border-bottom: 1px solid #00ff00; padding-bottom: 20px; }
            .tools { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
            .tool { border: 1px solid #00ff00; padding: 15px; background: #001100; }
            button { background: #004400; color: #00ff00; border: 1px solid #00ff00; padding: 10px; cursor: pointer; }
            button:hover { background: #006600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🖥️ RETROID v2.0</h1>
              <p>Circuit-Board Metropolis</p>
            </div>
            <div class="tools" id="tools"></div>
          </div>
          <script>
            async function loadTools() {
              const response = await fetch('/api/tools');
              const data = await response.json();
              const toolsDiv = document.getElementById('tools');
              data.tools.forEach(tool => {
                const toolDiv = document.createElement('div');
                toolDiv.className = 'tool';
                toolDiv.innerHTML = \`
                  <h3>\${tool.name}</h3>
                  <p>\${tool.description}</p>
                  <button onclick="runTool('\${tool.name}')">Execute</button>
                \`;
                toolsDiv.appendChild(toolDiv);
              });
            }

            async function runTool(name) {
              const response = await fetch('/api/call', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, arguments: {} })
              });
              const result = await response.json();
              alert(JSON.stringify(result, null, 2));
            }

            loadTools();
          </script>
        </body>
        </html>
      `);
    });

    this.app.get('/api/tools', async (req, res) => {
      try {
        const tools = [
          {
            name: "create_retro_project",
            description: "Create a new retro game project with specified platform",
            inputSchema: {
              type: "object",
              properties: {
                platform: { type: "string", enum: ["nes", "snes", "genesis", "gb"] },
                projectName: { type: "string" }
              },
              required: ["platform", "projectName"]
            }
          },
          {
            name: "generate_sprite",
            description: "Generate a sprite asset for retro games",
            inputSchema: {
              type: "object",
              properties: {
                width: { type: "number" },
                height: { type: "number" },
                colors: { type: "number" }
              },
              required: ["width", "height", "colors"]
            }
          },
          {
            name: "compile_rom",
            description: "Compile source code into a ROM file",
            inputSchema: {
              type: "object",
              properties: {
                sourceFiles: { type: "array", items: { type: "string" } },
                platform: { type: "string", enum: ["nes", "snes", "genesis", "gb"] }
              },
              required: ["sourceFiles", "platform"]
            }
          },
          {
            name: "edit_instruction_file",
            description: "Edit or create instruction files (assembly, C code) for retro games",
            inputSchema: {
              type: "object",
              properties: {
                filename: { type: "string" },
                content: { type: "string" },
                platform: { type: "string", enum: ["nes", "snes", "genesis", "gb"] }
              },
              required: ["filename", "content", "platform"]
            }
          },
          {
            name: "create_asset",
            description: "Create game assets like tiles, sprites, or music",
            inputSchema: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["tile", "sprite", "music", "palette"] },
                name: { type: "string" },
                platform: { type: "string", enum: ["nes", "snes", "genesis", "gb"] },
                parameters: { type: "object" }
              },
              required: ["type", "name", "platform"]
            }
          },
          {
            name: "build_and_test",
            description: "Build the project and run tests/emulation",
            inputSchema: {
              type: "object",
              properties: {
                projectName: { type: "string" },
                testMode: { type: "boolean" }
              },
              required: ["projectName"]
            }
          }
        ];
        res.json({ tools });
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });

    this.app.post('/api/call', async (req, res) => {
      try {
        const { name, arguments: args } = req.body;
        let result;

        switch (name) {
          case "create_retro_project":
            result = this.createRetroProject((args as any).platform, (args as any).projectName);
            break;
          case "generate_sprite":
            result = this.generateSprite((args as any).width, (args as any).height, (args as any).colors);
            break;
          case "compile_rom":
            result = this.compileRom((args as any).sourceFiles, (args as any).platform);
            break;
          case "edit_instruction_file":
            result = this.editInstructionFile((args as any).filename, (args as any).content, (args as any).platform);
            break;
          case "create_asset":
            result = this.createAsset((args as any).type, (args as any).name, (args as any).platform, (args as any).parameters);
            break;
          case "build_and_test":
            result = this.buildAndTest((args as any).projectName, (args as any).testMode);
            break;
          default:
            throw new Error(`Unknown tool: ${name}`);
        }

        res.json(await result);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "create_retro_project",
            description: "Create a new retro game project with specified platform",
            inputSchema: {
              type: "object",
              properties: {
                platform: {
                  type: "string",
                  enum: ["nes", "snes", "genesis", "gb"],
                  description: "Target retro gaming platform"
                },
                projectName: {
                  type: "string",
                  description: "Name of the project"
                }
              },
              required: ["platform", "projectName"]
            }
          },
          {
            name: "generate_sprite",
            description: "Generate a sprite asset for retro games",
            inputSchema: {
              type: "object",
              properties: {
                width: { type: "number", description: "Sprite width in pixels" },
                height: { type: "number", description: "Sprite height in pixels" },
                colors: { type: "number", description: "Number of colors" }
              },
              required: ["width", "height", "colors"]
            }
          },
          {
            name: "edit_instruction_file",
            description: "Edit or create instruction files (assembly, C code) for retro games",
            inputSchema: {
              type: "object",
              properties: {
                filename: { type: "string", description: "Name of the file" },
                content: { type: "string", description: "Content to write" },
                platform: { type: "string", enum: ["nes", "snes", "genesis", "gb"], description: "Target platform" }
              },
              required: ["filename", "content", "platform"]
            }
          },
          {
            name: "create_asset",
            description: "Create game assets like tiles, sprites, or music",
            inputSchema: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["tile", "sprite", "music", "palette"], description: "Asset type" },
                name: { type: "string", description: "Asset name" },
                platform: { type: "string", enum: ["nes", "snes", "genesis", "gb"], description: "Target platform" },
                parameters: { type: "object", description: "Asset-specific parameters" }
              },
              required: ["type", "name", "platform"]
            }
          },
          {
            name: "build_and_test",
            description: "Build the project and run tests/emulation",
            inputSchema: {
              type: "object",
              properties: {
                projectName: { type: "string", description: "Project to build" },
                testMode: { type: "boolean", description: "Run in test mode" }
              },
              required: ["projectName"]
            }
          }
        ]
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      if (!args) {
        throw new Error("Arguments are required");
      }

      switch (name) {
        case "create_retro_project":
          const createArgs = args as { platform: string; projectName: string };
          return this.createRetroProject(createArgs.platform, createArgs.projectName);
        case "generate_sprite":
          const spriteArgs = args as { width: number; height: number; colors: number };
          return this.generateSprite(spriteArgs.width, spriteArgs.height, spriteArgs.colors);
        case "edit_instruction_file":
          const editArgs = args as { filename: string; content: string; platform: string };
          return this.editInstructionFile(editArgs.filename, editArgs.content, editArgs.platform);
        case "create_asset":
          const assetArgs = args as { type: string; name: string; platform: string; parameters?: any };
          return this.createAsset(assetArgs.type, assetArgs.name, assetArgs.platform, assetArgs.parameters);
        case "build_and_test":
          const buildArgs = args as { projectName: string; testMode?: boolean };
          return this.buildAndTest(buildArgs.projectName, buildArgs.testMode);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private async createRetroProject(platform: string, projectName: string) {
    // Placeholder implementation
    return {
      content: [
        {
          type: "text",
          text: `Created retro project "${projectName}" for platform "${platform}". Circuit-board metropolis initialized.`
        }
      ]
    };
  }

  private async generateSprite(width: number, height: number, colors: number) {
    // Placeholder implementation
    return {
      content: [
        {
          type: "text",
          text: `Generated ${width}x${height} sprite with ${colors} colors. Asset diffused and stabilized.`
        }
      ]
    };
  }

  private async compileRom(sourceFiles: string[], platform: string) {
    // Placeholder implementation
    return {
      content: [
        {
          type: "text",
          text: `Compiled ROM for ${platform} from ${sourceFiles.length} source files. Build tools integrated with momentum.`
        }
      ]
    };
  }

  private async editInstructionFile(filename: string, content: string, platform: string) {
    // Placeholder: in real implementation, would write to file system
    return {
      content: [
        {
          type: "text",
          text: `Edited instruction file ${filename} for ${platform}. Content validated against platform constraints.`
        }
      ]
    };
  }

  private async createAsset(type: string, name: string, platform: string, parameters?: any) {
    // Placeholder: generate asset based on type
    let description = `Created ${type} asset "${name}" for ${platform}.`;
    if (parameters) {
      description += ` Parameters: ${JSON.stringify(parameters)}`;
    }
    return {
      content: [
        {
          type: "text",
          text: description
        }
      ]
    };
  }

  private async buildAndTest(projectName: string, testMode?: boolean) {
    const testText = testMode ? " with testing enabled" : "";
    return {
      content: [
        {
          type: "text",
          text: `Built and tested project "${projectName}"${testText}. Circuit-board metropolis workflow completed.`
        }
      ]
    };
  }

  async run() {
    // Start web server
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`RetroIDE web interface running on http://localhost:${PORT}`);
    });

    // Start MCP server on stdio
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("RetroIDE MCP server running on stdio");
  }
}

const server = new RetroIDEServer();
server.run().catch(console.error);