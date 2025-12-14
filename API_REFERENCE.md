# RetroIDE MCP API Reference

## Overview

RetroIDE provides a comprehensive set of Model Context Protocol (MCP) tools for retro game development. This reference documents all available tools, their parameters, return values, and usage examples.

## Tool Categories

### Project Management
- [create_retro_project](#create_retro_project)

### Asset Creation
- [generate_sprite](#generate_sprite)
- [create_asset](#create_asset)

### Code Development
- [edit_instruction_file](#edit_instruction_file)

### Build & Compilation
- [compile_rom](#compile_rom)
- [build_and_test](#build_and_test)

## Tool Specifications

### create_retro_project

Initialize a new retro game project with platform-specific scaffolding.

#### Input Schema
```json
{
  "type": "object",
  "properties": {
    "platform": {
      "type": "string",
      "enum": ["nes", "snes", "genesis", "gb"],
      "description": "Target retro gaming platform"
    },
    "projectName": {
      "type": "string",
      "description": "Name of the project"
    }
  },
  "required": ["platform", "projectName"]
}
```

#### Returns
```json
{
  "content": [
    {
      "type": "text",
      "text": "Created retro project \"ProjectName\" for platform \"platform\". Circuit-board metropolis initialized."
    }
  ]
}
```

#### Example
```json
{
  "name": "create_retro_project",
  "arguments": {
    "platform": "nes",
    "projectName": "MyFirstGame"
  }
}
```

---

### generate_sprite

Generate a sprite asset with hardware-specific constraints.

#### Input Schema
```json
{
  "type": "object",
  "properties": {
    "width": {
      "type": "number",
      "description": "Sprite width in pixels",
      "minimum": 8,
      "maximum": 64
    },
    "height": {
      "type": "number",
      "description": "Sprite height in pixels",
      "minimum": 8,
      "maximum": 64
    },
    "colors": {
      "type": "number",
      "description": "Number of colors (platform-dependent)",
      "minimum": 2,
      "maximum": 256
    }
  },
  "required": ["width", "height", "colors"]
}
```

#### Returns
```json
{
  "content": [
    {
      "type": "text",
      "text": "Generated 16x16 sprite with 4 colors. Asset diffused and stabilized."
    }
  ]
}
```

#### Platform Constraints
- **NES**: Max 4 colors per sprite
- **SNES**: Max 16 colors per sprite
- **Genesis**: Max 16 colors per sprite
- **Game Boy**: Max 4 colors total

#### Example
```json
{
  "name": "generate_sprite",
  "arguments": {
    "width": 16,
    "height": 16,
    "colors": 4
  }
}
```

---

### create_asset

Create various types of game assets with platform-specific optimization.

#### Input Schema
```json
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "enum": ["tile", "sprite", "music", "palette"],
      "description": "Type of asset to create"
    },
    "name": {
      "type": "string",
      "description": "Asset identifier"
    },
    "platform": {
      "type": "string",
      "enum": ["nes", "snes", "genesis", "gb"],
      "description": "Target platform"
    },
    "parameters": {
      "type": "object",
      "description": "Asset-type specific parameters"
    }
  },
  "required": ["type", "name", "platform"]
}
```

#### Asset Types

##### Tile
```json
{
  "parameters": {
    "width": 8,
    "height": 8,
    "colors": 4
  }
}
```

##### Sprite
```json
{
  "parameters": {
    "width": 16,
    "height": 16,
    "colors": 4,
    "animation": true
  }
}
```

##### Music
```json
{
  "parameters": {
    "format": "mod",
    "channels": 4,
    "tempo": 125
  }
}
```

##### Palette
```json
{
  "parameters": {
    "colors": 16,
    "optimize": true
  }
}
```

#### Returns
```json
{
  "content": [
    {
      "type": "text",
      "text": "Created tile asset \"background_tile\" for nes. Parameters: {...}"
    }
  ]
}
```

#### Example
```json
{
  "name": "create_asset",
  "arguments": {
    "type": "sprite",
    "name": "player_sprite",
    "platform": "nes",
    "parameters": {
      "width": 16,
      "height": 16,
      "colors": 4
    }
  }
}
```

---

### edit_instruction_file

Edit or create instruction files (assembly/C code) with platform validation.

#### Input Schema
```json
{
  "type": "object",
  "properties": {
    "filename": {
      "type": "string",
      "description": "Path to the instruction file"
    },
    "content": {
      "type": "string",
      "description": "Code content to write"
    },
    "platform": {
      "type": "string",
      "enum": ["nes", "snes", "genesis", "gb"],
      "description": "Target platform for validation"
    }
  },
  "required": ["filename", "content", "platform"]
}
```

#### Returns
```json
{
  "content": [
    {
      "type": "text",
      "text": "Edited instruction file main.asm for nes. Content validated against platform constraints."
    }
  ]
}
```

#### Validation Features
- Opcode validation for target CPU
- Memory mapping checks
- Hardware register validation
- Syntax error detection

#### Example
```json
{
  "name": "edit_instruction_file",
  "arguments": {
    "filename": "src/main.asm",
    "content": "LDA #$01\\nSTA $2000",
    "platform": "nes"
  }
}
```

---

### compile_rom

Compile source files into a ROM image for the target platform.

#### Input Schema
```json
{
  "type": "object",
  "properties": {
    "sourceFiles": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of source files to compile"
    },
    "platform": {
      "type": "string",
      "enum": ["nes", "snes", "genesis", "gb"],
      "description": "Target platform"
    }
  },
  "required": ["sourceFiles", "platform"]
}
```

#### Returns
```json
{
  "content": [
    {
      "type": "text",
      "text": "Compiled ROM for nes from 3 source files. Build tools integrated with momentum."
    }
  ]
}
```

#### Supported Compilers
- **NES**: cc65, asm6
- **SNES**: WLA-DX, xkas
- **Genesis**: SGDK, asm68k
- **Game Boy**: RGBDS, GBDK

#### Example
```json
{
  "name": "compile_rom",
  "arguments": {
    "sourceFiles": ["src/main.asm", "src/data.asm", "src/header.asm"],
    "platform": "nes"
  }
}
```

---

### build_and_test

Build a project and optionally run tests/emulation.

#### Input Schema
```json
{
  "type": "object",
  "properties": {
    "projectName": {
      "type": "string",
      "description": "Name of the project to build"
    },
    "testMode": {
      "type": "boolean",
      "description": "Enable testing after build",
      "default": false
    }
  },
  "required": ["projectName"]
}
```

#### Returns
```json
{
  "content": [
    {
      "type": "text",
      "text": "Built and tested project \"MyGame\" with testing enabled. Circuit-board metropolis workflow completed."
    }
  ]
}
```

#### Build Process
1. Source file compilation
2. Asset processing and optimization
3. ROM linking and packaging
4. Optional emulation testing
5. Validation and checksum generation

#### Example
```json
{
  "name": "build_and_test",
  "arguments": {
    "projectName": "MyAwesomeGame",
    "testMode": true
  }
}
```

## Error Handling

All tools return standardized error responses:

```json
{
  "content": [
    {
      "type": "text",
      "text": "Error: Invalid platform specified"
    }
  ]
}
```

## Performance Characteristics

- **Response Time**: < 100ms for simple operations
- **Memory Usage**: Platform-dependent (NES: ~50KB, SNES: ~200KB)
- **Concurrent Operations**: Up to 10 simultaneous tool calls
- **Caching**: Asset and compilation results cached for 5 minutes

## Integration Examples

### Complete Game Development Workflow

```javascript
// 1. Create project
await callTool("create_retro_project", {
  platform: "nes",
  projectName: "SpaceShooter"
});

// 2. Create assets
await callTool("create_asset", {
  type: "sprite",
  name: "player_ship",
  platform: "nes",
  parameters: { width: 16, height: 16, colors: 4 }
});

// 3. Write code
await callTool("edit_instruction_file", {
  filename: "src/main.asm",
  content: "LDA #$01\\nSTA $2000",
  platform: "nes"
});

// 4. Build and test
await callTool("build_and_test", {
  projectName: "SpaceShooter",
  testMode: true
});
```

### Asset Pipeline Automation

```javascript
const assets = [
  { type: "sprite", name: "enemy1", params: { width: 16, height: 16, colors: 4 } },
  { type: "tile", name: "background", params: { width: 8, height: 8, colors: 4 } },
  { type: "music", name: "bgm", params: { format: "mod", channels: 4 } }
];

for (const asset of assets) {
  await callTool("create_asset", {
    type: asset.type,
    name: asset.name,
    platform: "nes",
    parameters: asset.params
  });
}
```

## Platform-Specific Notes

### NES (6502)
- 16KB PRG-ROM, 8KB CHR-ROM typical
- 2KB RAM, PPUs with specific timing requirements
- Color palette: 52 colors total

### SNES (65816)
- Variable ROM sizes (up to 4MB)
- Multiple graphics modes
- Color palette: 256 colors + effects

### Genesis (68000 + Z80)
- 64KB RAM, expandable cartridge ROM
- Dual CPU architecture
- Color palette: 512 colors

### Game Boy (LR35902)
- 32KB ROM, 8KB RAM
- 4 shades of green/gray
- Strict memory and timing constraints

## Version History

- **v1.0.0**: Initial release with 6 core tools
- Support for NES, SNES, Genesis, Game Boy platforms
- Web and TUI interfaces
- MCP protocol compliance

For questions or contributions, see the main README.md or create an issue on GitHub.