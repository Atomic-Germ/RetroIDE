# RetroIDE

Circuit-Board Metropolis IDE for Retro Game Development

## Overview

RetroIDE is a comprehensive development environment for creating retro games, built using the Model Context Protocol (MCP). It provides a unified interface for code editing, asset creation, compilation, and testing across multiple retro gaming platforms including NES, SNES, Genesis, and Game Boy.

## Features

- **MCP Server Integration**: AI-assisted development with specialized servers for different aspects of game creation
- **Text-Based User Interface**: Retro-styled TUI built with Textual, featuring a circuit-board metropolis aesthetic
- **Multi-Platform Support**: Target multiple retro consoles with platform-specific tools and constraints
- **Asset Pipeline**: Integrated sprite editors, tilemap tools, and sound composers
- **Build System**: Cross-platform compilation and ROM generation
- **Real-time Emulation**: Built-in testing and debugging capabilities

## Architecture

RetroIDE follows a circuit-board metropolis design where MCP servers act as modular compilation points, connected through data conduits for seamless workflow integration.

## Installation

```bash
npm install
pip install -r requirements.txt
npm run build
```

## Usage

### MCP Server
```bash
npm start
```

### Web Interface
Open http://localhost:3000 in your browser for the circuit-board metropolis web IDE.

### TUI Interface
```bash
python python/retroide_tui.py
```

The TUI provides:
- Project management and creation
- Code editing with syntax highlighting
- Asset creation and visualization
- Build tools integration
- Emulator testing interface

## MCP Tools

The RetroIDE MCP server provides tools for:

- `create_retro_project`: Initialize new retro game projects
- `generate_sprite`: Create sprite assets with platform constraints
- `compile_rom`: Build ROM files from source code
- `edit_instruction_file`: Edit assembly/C code files
- `create_asset`: Generate various game assets
- `build_and_test`: Compile and test projects

## Fluid System Principles

This project embodies concentric fluidity and depletion-triggered fluidity, maintaining dynamic equilibrium in the development process.

## Documentation

- **[User Guide](USER_GUIDE.md)**: Comprehensive guide for human users
- **[API Reference](API_REFERENCE.md)**: Detailed MCP tool specifications
- **[Model Integration Guide](MODEL_INTEGRATION_GUIDE.md)**: Guide for AI assistants
- **[Developer Guide](DEVELOPERS-README.md)**: Technical development information