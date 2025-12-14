# RetroIDE User Guide

## Welcome to the Circuit-Board Metropolis

RetroIDE is a revolutionary development environment for creating retro games, designed as a living system that flows through cycles of depletion and renewal. This guide will help you harness the power of the metropolis to bring your retro gaming visions to life.

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/Atomic-Germ/RetroIDE.git
cd RetroIDE

# Install dependencies
npm install
pip install -r requirements.txt

# Build the project
npm run build
```

### Launch RetroIDE

Choose your preferred interface:

```bash
# Web Interface (Recommended)
npm start
# Open http://localhost:3000

# Terminal Interface
python python/retroide_tui.py

# MCP Server Only
npm run dev
```

## Understanding the Metropolis

### The Circuit-Board Metaphor

Imagine RetroIDE as a sprawling circuit board where each component represents a development tool:

- **Kernel Plaza**: Central command core (project management)
- **Instruction Citadel**: Code editing and validation
- **Asset Forge**: Creative tools for sprites, music, and graphics
- **MCP Server Grid**: AI-assisted development engines
- **Testing Grounds**: Emulation and debugging arenas

### Fluid System Principles

RetroIDE embodies two core principles:

1. **Concentric Fluidity**: Nested layers of tools that protect and enhance each other
2. **Depletion-Triggered Fluidity**: Systems adapt when resources dwindle, sparking innovation

## Interface Guide

### Web Interface

The web interface provides a visual circuit-board experience:

1. **Tool Grid**: Click any tool to execute it
2. **Retro Styling**: Green-on-black monospace aesthetic
3. **Real-time Feedback**: Instant results from tool execution

### TUI Interface

The terminal interface offers hands-on development:

- **Sidebar**: Navigation and project management
- **Tabs**: Code, Assets, and Build views
- **Console**: Real-time metropolis activity feed

### MCP API

For programmatic access and AI integration:

```bash
# Start the MCP server
npm start

# Tools are available via stdio protocol
```

## Development Workflow

### 1. Project Creation

```bash
# Via Web/TUI: Click "New Project"
# Via MCP: Use create_retro_project tool
```

Supported platforms: NES, SNES, Genesis, Game Boy

### 2. Code Development

Use the Instruction Citadel to write assembly or C code:

- Syntax highlighting for 6502, Z80, 68K, and LR35902
- Platform-specific validation
- AI-assisted code completion via MCP

### 3. Asset Creation

The Asset Forge provides specialized tools:

- **Pixel Foundry**: Sprite and tile editors
- **Waveform Crucible**: Music and sound design
- **Palette Alchemist**: Color management with hardware constraints

### 4. Build & Test

- **MCP Grid**: Automated compilation across platforms
- **Testing Grounds**: Integrated emulation
- **ROM Generation**: Final cartridge creation

## Tool Reference

### create_retro_project
Initialize a new retro game project.

**Parameters:**
- `platform`: Target system (nes, snes, genesis, gb)
- `projectName`: Project identifier

### generate_sprite
Create sprite assets with hardware constraints.

**Parameters:**
- `width`: Sprite width in pixels
- `height`: Sprite height in pixels
- `colors`: Number of colors (platform-dependent)

### compile_rom
Build ROM files from source code.

**Parameters:**
- `sourceFiles`: Array of source file paths
- `platform`: Target platform

### edit_instruction_file
Edit or create code files with validation.

**Parameters:**
- `filename`: File path
- `content`: Code content
- `platform`: Target platform for validation

### create_asset
Generate various game assets.

**Parameters:**
- `type`: Asset type (tile, sprite, music, palette)
- `name`: Asset identifier
- `platform`: Target platform
- `parameters`: Type-specific options

### build_and_test
Compile and optionally test projects.

**Parameters:**
- `projectName`: Project to build
- `testMode`: Enable testing (optional)

## Advanced Features

### AI-Assisted Development

RetroIDE integrates AI through the MCP ecosystem:

- **Creative Meditation**: Generate ideas and concepts
- **Consultation**: Get expert advice on design decisions
- **Bridge Sessions**: Connect different development phases

### Multi-Platform Development

Target multiple retro systems simultaneously:

- Shared asset libraries
- Cross-platform code compatibility
- Unified build system

### Custom Tool Development

Extend RetroIDE by adding new MCP tools:

```typescript
// Add to src/index.ts
{
  name: "your_custom_tool",
  description: "Your tool description",
  inputSchema: { /* schema */ }
}
```

## Troubleshooting

### Common Issues

**Web interface not loading:**
- Ensure port 3000 is available
- Check that npm start completed successfully

**TUI display issues:**
- Ensure terminal supports Unicode
- Check Python and Textual installation

**MCP connection problems:**
- Verify stdio protocol compatibility
- Check for conflicting processes on ports

### Performance Optimization

- Use the momentum integration system for faster iteration
- Leverage diffusion stabilization for consistent assets
- Monitor the metropolis activity feed for bottlenecks

## Contributing to the Metropolis

### Adding New Tools

1. Define the tool in the MCP server
2. Implement the handler method
3. Update web and TUI interfaces
4. Add documentation

### Extending Platforms

1. Add platform support to tool schemas
2. Implement platform-specific logic
3. Update validation rules
4. Test with target hardware

## The Living System

RetroIDE is designed to evolve through depletion and renewal cycles. As you use it:

- **Depletion Signals**: Performance bottlenecks or feature gaps
- **Renewal Phases**: Tool updates and interface improvements
- **Innovation Triggers**: Community contributions and AI insights

This creates a development environment that grows stronger through use, embodying the principles of concentric and depletion-triggered fluidity.

## Support

- **Documentation**: This guide and README.md
- **Community**: GitHub issues and discussions
- **AI Assistance**: Built-in MCP consultation tools

Welcome to the circuit-board metropolis. May your retro games flow with creativity and precision! ⚡🖥️