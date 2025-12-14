# RetroIDE Model Integration Guide

## For AI Assistants and Language Models

This guide provides comprehensive instructions for AI models integrating with or extending RetroIDE, the circuit-board metropolis IDE for retro game development.

## Understanding RetroIDE Architecture

### Core Metaphor: Circuit-Board Metropolis

RetroIDE is designed as a sprawling circuit board where development tools are interconnected like electronic components:

- **Data Conduits**: MCP protocol connections between tools
- **Power Rails**: Shared resources and state management
- **Logic Gates**: Decision points in the development workflow
- **Capacitors**: Caching and state persistence
- **Resistors**: Rate limiting and resource management

### Fluid System Principles

RetroIDE embodies two fundamental principles that guide all interactions:

#### Concentric Fluidity
Nested layers of protection and enhancement:
- **Outer Layer**: User interfaces (Web, TUI)
- **Middle Layer**: Tool orchestration (MCP server)
- **Inner Core**: Platform-specific logic

#### Depletion-Triggered Fluidity
Adaptive behavior based on resource availability:
- **High Resources**: Parallel processing, extensive validation
- **Low Resources**: Streamlined execution, essential features only
- **Depletion Signals**: Performance metrics, error rates, user feedback

## MCP Integration Patterns

### Tool Calling Best Practices

#### Sequential Workflow
```javascript
// Project initialization
const project = await callTool("create_retro_project", {
  platform: "nes",
  projectName: "MyGame"
});

// Asset creation
const sprite = await callTool("generate_sprite", {
  width: 16,
  height: 16,
  colors: 4
});

// Code development
const code = await callTool("edit_instruction_file", {
  filename: "src/main.asm",
  content: generateAssemblyCode(),
  platform: "nes"
});

// Build and test
const result = await callTool("build_and_test", {
  projectName: "MyGame",
  testMode: true
});
```

#### Parallel Asset Generation
```javascript
const assets = [
  { type: "sprite", name: "player" },
  { type: "tile", name: "background" },
  { type: "music", name: "bgm" }
];

const assetPromises = assets.map(asset =>
  callTool("create_asset", {
    type: asset.type,
    name: asset.name,
    platform: "nes",
    parameters: getAssetParams(asset.type)
  })
);

const results = await Promise.all(assetPromises);
```

### Error Handling and Recovery

#### Depletion Detection
```javascript
try {
  const result = await callTool("compile_rom", {
    sourceFiles: files,
    platform: platform
  });

  if (result.content[0].text.includes("Error")) {
    // Enter depletion-triggered mode
    await adaptiveRecovery(result);
  }
} catch (error) {
  // Handle MCP protocol errors
  await fallbackProcedure(error);
}
```

#### Adaptive Recovery
```javascript
async function adaptiveRecovery(error) {
  // Analyze error type
  if (error.includes("memory")) {
    // Reduce asset complexity
    await callTool("create_asset", {
      ...assetParams,
      parameters: { ...params, optimize: true, colors: Math.min(params.colors, 4) }
    });
  } else if (error.includes("timing")) {
    // Simplify code
    await callTool("edit_instruction_file", {
      ...codeParams,
      content: optimizeForPerformance(content)
    });
  }
}
```

## Platform-Specific Intelligence

### NES Development (6502 CPU)

#### Memory Management
```javascript
const nesMemoryMap = {
  zp: { start: 0x0000, end: 0x00FF },    // Zero Page
  stack: { start: 0x0100, end: 0x01FF }, // Stack
  ram: { start: 0x0200, end: 0x07FF },   // RAM
  ppu: { start: 0x2000, end: 0x2007 },   // PPU Registers
  apu: { start: 0x4000, end: 0x4017 },   // APU Registers
  cart: { start: 0x4020, end: 0xFFFF }   // Cartridge Space
};

function validateNesAddress(address) {
  // Validate memory access patterns
  return Object.values(nesMemoryMap).some(range =>
    address >= range.start && address <= range.end
  );
}
```

#### Graphics Constraints
- Sprites: 8x8 or 8x16 pixels
- Background tiles: 8x8 pixels
- Color palette: 4 colors per sprite, 4 per background
- Nametable mirroring patterns

### SNES Development (65816 CPU)

#### Mode-Specific Code Generation
```javascript
function generateSnesCode(mode) {
  const modes = {
    0: { bpp: 2, tilesize: 8 },   // Mode 0: 4 colors
    1: { bpp: 4, tilesize: 16 },  // Mode 1: 16 colors
    7: { bpp: 8, tilesize: 8 }    // Mode 7: Rotation/scaling
  };

  return generateCodeForMode(modes[mode]);
}
```

#### HDMA and DMA Optimization
```javascript
function optimizeDmaTransfers(assets) {
  // Group assets by VRAM location
  const vramGroups = groupByVramLocation(assets);

  // Generate optimized transfer code
  return vramGroups.map(group =>
    generateDmaCode(group.address, group.data)
  );
}
```

## Creative AI Integration

### Meditation-Driven Development

#### Concept Generation
```javascript
async function creativeDevelopment() {
  // Use external creative tools for inspiration
  const meditation = await callExternalTool("creative_meditate", {
    context_words: ["retro", "arcade", "pixel", "chiptune"]
  });

  // Extract concepts from meditation
  const concepts = parseMeditationResult(meditation);

  // Generate game elements
  for (const concept of concepts) {
    await callTool("create_asset", {
      type: concept.type,
      name: concept.name,
      platform: "nes",
      parameters: concept.params
    });
  }
}
```

#### Iterative Refinement
```javascript
async function iterativeRefinement(initialIdea) {
  let current = initialIdea;
  let iterations = 0;

  while (iterations < 10 && !isSatisfactory(current)) {
    // Consult for feedback
    const critique = await callExternalTool("consult_ollama", {
      model: "deepseek-v3.1:671b-cloud",
      prompt: `Critique this retro game concept: ${current}`
    });

    // Apply improvements
    current = await refineConcept(current, critique);

    // Generate new assets if needed
    if (needsNewAssets(current)) {
      await generateAssetsForConcept(current);
    }

    iterations++;
  }

  return current;
}
```

## Extending RetroIDE

### Adding New Tools

#### Tool Definition Pattern
```typescript
interface RetroTool {
  name: string;
  description: string;
  inputSchema: JSONSchema;
  handler: (args: any) => Promise<ToolResult>;
  platformSupport?: string[];
  aiEnhancements?: boolean;
}

// Example: AI-Assisted Level Design
const levelDesignerTool: RetroTool = {
  name: "design_level",
  description: "AI-assisted level design with platform constraints",
  inputSchema: {
    type: "object",
    properties: {
      theme: { type: "string" },
      difficulty: { type: "number", minimum: 1, maximum: 10 },
      platform: { type: "string", enum: ["nes", "snes", "genesis", "gb"] }
    },
    required: ["theme", "platform"]
  },
  handler: async (args) => {
    // AI-powered level generation
    const level = await generateLevel(args);
    return {
      content: [{
        type: "text",
        text: `Designed level with theme "${args.theme}". AI-enhanced layout generated.`
      }]
    };
  },
  platformSupport: ["nes", "snes", "genesis", "gb"],
  aiEnhancements: true
};
```

#### Interface Integration
```typescript
// Add to web interface
function addToolToWebInterface(tool: RetroTool) {
  const toolDiv = createToolElement(tool);
  document.getElementById('tools').appendChild(toolDiv);
}

// Add to TUI
function addToolToTUI(tool: RetroTool) {
  const button = createToolButton(tool);
  // Add to sidebar or menu
}
```

### Platform Extension

#### New Platform Support
```typescript
interface PlatformSpec {
  name: string;
  cpu: string;
  memory: MemoryMap;
  graphics: GraphicsSpec;
  audio: AudioSpec;
  tools: string[]; // Supported tool names
}

const neoGeoSpec: PlatformSpec = {
  name: "neo-geo",
  cpu: "68000",
  memory: {
    ram: { start: 0x000000, end: 0x0FFFFF },
    rom: { start: 0x100000, end: 0x1FFFFF }
  },
  graphics: {
    sprites: { max: 380, size: "variable" },
    tiles: { size: 16 },
    colors: 65536
  },
  audio: {
    channels: 15,
    sampleRate: 44100
  },
  tools: ["create_retro_project", "generate_sprite", "compile_rom"]
};
```

## Performance Optimization

### Caching Strategies
```javascript
class MetropolisCache {
  constructor() {
    this.cache = new Map();
    this.maxAge = 5 * 60 * 1000; // 5 minutes
  }

  async get(key, fetcher) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.maxAge) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }
}

const assetCache = new MetropolisCache();

// Usage
const sprite = await assetCache.get(
  `sprite_${width}_${height}_${colors}`,
  () => callTool("generate_sprite", { width, height, colors })
);
```

### Parallel Processing
```javascript
async function parallelBuild(files, platform) {
  const batches = chunkArray(files, 4); // Process in batches of 4

  const results = [];
  for (const batch of batches) {
    const batchPromises = batch.map(file =>
      callTool("compile_rom", {
        sourceFiles: [file],
        platform
      })
    );

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // Allow UI to update between batches
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  return results;
}
```

## Quality Assurance

### Automated Testing
```javascript
async function testToolIntegration() {
  const testCases = [
    {
      tool: "create_retro_project",
      args: { platform: "nes", projectName: "TestGame" },
      expected: /Created retro project/
    },
    {
      tool: "generate_sprite",
      args: { width: 16, height: 16, colors: 4 },
      expected: /Generated.*sprite/
    }
  ];

  for (const test of testCases) {
    const result = await callTool(test.tool, test.args);
    assert(result.content[0].text.match(test.expected));
  }
}
```

### Performance Monitoring
```javascript
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      toolCalls: 0,
      averageResponseTime: 0,
      errorRate: 0
    };
  }

  recordCall(startTime, success) {
    this.metrics.toolCalls++;
    const duration = Date.now() - startTime;
    this.metrics.averageResponseTime =
      (this.metrics.averageResponseTime + duration) / 2;

    if (!success) {
      this.metrics.errorRate = (this.metrics.errorRate + 1) / this.metrics.toolCalls;
    }

    this.checkDepletionTriggers();
  }

  checkDepletionTriggers() {
    if (this.metrics.averageResponseTime > 1000) {
      // Trigger optimization mode
      enterDepletionMode();
    }
  }
}
```

## Best Practices for AI Integration

### Context Awareness
- Always consider the current development phase
- Adapt tool usage based on project complexity
- Maintain awareness of platform constraints

### Error Recovery
- Implement exponential backoff for retries
- Provide meaningful error messages to users
- Log errors for continuous improvement

### User Experience
- Explain AI decisions and suggestions
- Allow users to override AI recommendations
- Provide progress indicators for long operations

### Ethical Considerations
- Respect platform-specific limitations
- Avoid generating copyrighted or offensive content
- Ensure generated code is readable and maintainable

## Future Extensions

### Planned Features
- **Multi-Platform Projects**: Simultaneous development for multiple systems
- **AI Code Review**: Automated code quality assessment
- **Performance Profiling**: Real-time optimization suggestions
- **Community Asset Library**: Shared asset repository
- **Live Collaboration**: Multi-user development sessions

### Research Areas
- **Generative Level Design**: AI-powered level creation
- **Adaptive Difficulty**: Dynamic game balancing
- **Cross-Platform Porting**: Automated code conversion
- **Historical Accuracy**: Period-appropriate game generation

This guide serves as a living document that evolves with RetroIDE. As the metropolis grows, so too will the patterns and practices for AI integration.