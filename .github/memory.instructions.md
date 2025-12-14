---
applyTo: '**'
description: Personal AI memory for conversations and preferences
lastOptimized: '2025-12-12T01:37:23.724410+00:00'
entryCount: 2
optimizationVersion: 2
autoOptimize: true
sizeThreshold: 50000
entryThreshold: 20
timeThreshold: 7
---
# Personal AI Memory
This file contains personal information for AI conversations.

## Universal Laws
- **Fluid System Philosophies (2025-12-11 17:36):** These philosophies should be guiding principles for all projects:
  - Nested sustainability
  - Interplay of depletion and renewal
  - Dynamic equilibrium
  - Remain relevant even as hardware ages

## Policies

## Technical Preferences
- **Project Structure (2025-12-10 18:51):** For Node.js/TypeScript projects (like mcp-nappies):
  - Use `src/index.ts` structure with `dist/` build output
  - Follow Node.js best practices for project structure and build system

## Communication Preferences

## Suggestions/Hints

## Memories/Facts

### SNES-IDE TUI Development (2025-12-04 to 2025-12-06)

**Prism Refactor (2025-12-04 14:41, originally 12:30):**
- COMPLETE: Monolithic `src/tools_browser.py` decomposed into modular `src/tui/` package
- Entry point: `src/tui/app.py` (class `SNESIDEApp`)
- Widgets: `src/tui/widgets/` (Sidebar, PixelCanvas, PaletteBar, etc.)
- Screens: `src/tui/screens/` (InstallScreen, NewTilesetScreen, etc.)
- Logic: `src/tui/logic/` (tools.py, graphics.py)
- Legacy support: `src/snes-ide.py` imports `SNESIDEApp` from `src.tui.app`
- Tasks: Use "Run Modular TUI" or "Textual Dev" in VS Code
- `src/tools_browser.py` backed up as `.bak` and should be ignored

**The Assembly Vortex - Live Asset Code Generation (2025-12-04 15:29/15:30):**
- Implemented `src/tui/logic/exporter.py` to convert SNESTile/SNESPalette to SNES planar format and WLA-DX assembly
- Created `src/tui/widgets/preview_panel.py` with `AssemblyPreviewPanel` for syntax-highlighted assembly
- Integrated into `TileEditorPanel` (split view with PixelCanvas)
- Added `PixelModified` message to `PixelCanvas` for real-time updates during drawing/undo/redo
- Inspired by creative meditation: "Tile immanence Assembly vortex spectrum"

**SPC Coherence Engine - Audio Visualizer (2025-12-04 16:46, dated 2025-12-05 00:45):**
- Implemented `src/tui/logic/audio.py` with `BRRDecoder` for SNES audio samples
- Created `src/tui/widgets/audio_panel.py` with `WaveformVisualizer` (PCM plot) and `BRRHexViewer` (block analysis)
- Integrated into `SNESIDEApp` with new "audio" view mode
- Supports `.brr` (decoding) and `.wav` (visualization) files
- Inspired by creative meditation: "Oscillation Delay fractal Tracker wavelength"

**The Cartographer - ROM Architecture Visualizer (2025-12-05 09:11, dated 17:20):**
- Implemented `src/tui/logic/rom_analyzer.py` with `SNESRomAnalyzer` to parse ROM headers (LoROM/HiROM) and map memory banks
- Created `src/tui/widgets/rom_panel.py` with `RomInfoWidget` and `MemoryMapWidget` (16x16 grid)
- Integrated into `SNESIDEApp` with new "rom" view mode
- Supports `.sfc` and `.smc` files
- Visualizes System, ROM, RAM, and SRAM regions based on mapping mode
- Inspired by creative meditation: "Architecture Bank Memory Address weave"

**The Crystalline Hex-Weave - ROM Hex Viewer (2025-12-05 09:30 to 10:23):**
- Extended `RomAnalyzerPanel` with `HexViewer` widget
- Implemented `SNESRomAnalyzer.get_bank_data(bank)` to fetch raw ROM data for specific bank (handling LoROM/HiROM mapping)
- Added `BankClicked` event to `MemoryMapWidget`
- Clicking a bank in memory map loads its raw hex data into viewer
- Fixed SMC header handling (512 bytes) via `data_offset` detection
- Updated layout: Hex Viewer on left (wide), Header/Details on right (narrow)
- Added detailed debug notifications for diagnostics
- Inspired by creative meditation: "Crystalline Hex fractal Bank"
- COMPLETE and fully functional

**Dual-Map View Enhancement (2025-12-05 10:44, dated 18:15):**
- Updated `RomAnalyzerPanel` to display two side-by-side `MemoryMapWidget`s
- Left Map: "ROM Chip ($00-$FF)" (Green)
- Right Map: "RAM/System ($00-$FF)" (Blue/Red/Yellow)
- Provides clear separation between physical ROM mapping and logical System/RAM overlay
- Complex bank-switching support deferred for future

**The Silicon Turtleneck - Cycle Profiler (2025-12-05 11:04, dated 19:00):**
- Implemented `src/tui/logic/cpu_data.py` with 65816 opcode database (cycles, bytes, flags)
- Implemented `src/tui/logic/profiler.py` to parse assembly and estimate cycle counts
- Created `src/tui/widgets/profiler_panel.py` with Assembly Input, Cycle Breakdown Table, and V-Blank Thermometer
- Integrated into `SNESIDEApp` with new "profiler" view mode (Shift+P)
- Inspired by creative meditation: "Tight CPU force quit State turtleneck"
- User tested successfully and loved it (2025-12-05 11:22)

**The Disassembler (2025-12-06 14:40):**
- Logic: `src/tui/logic/disassembler.py` with 65816 opcode map
- UI: `src/tui/widgets/disassembler_panel.py` with DataTable
- Integration: Added 'Disassemble Bank' button to `RomAnalyzerPanel` (Cartographer) which loads data into Disassembler
- Keybinding: Shift+D
- Concept: Derived from 'Disassembler Lifecycle' insight (Decode → Disassemble → Flow)

### Creative Meditations & Insights

**Creative Meditation #3 - Audio (2025-12-04 16:32, dated 16:30):**
- "Oscillation Delay fractal Tracker wavelength SPC700 Frequency coherence vortex coherence"
- Key concepts: "Fractal Tracker", "Coherence", "Oscillation"
- Potential: Visualizer/editor for SNES audio (SPC700) using fractal/geometric representations
- "Coherence" suggests syncing audio state with visual state

**Creative Meditation #4 - Architecture (2025-12-05 08:58, dated 17:00):**
- "Crosswalk train Waveform Debugger melts SNES refraction Memory TUI Assembly 001101 parking-lot Flow glitches"
- Key concepts: "Refraction", "Parking Lot", "Flow", "Melts"
- Interpretation: "Refraction" of abstract addresses into visual space; "Parking Lot" = Memory Banks
- Proposed: "The Cartographer" (Memory Map Visualizer)
- Parses linker map files (.map) to visualize SNES memory usage across banks
- Shows heatmap of bank usage (Melts) and highlights free vs used space (Flow)

**Bridge Session Insights - V-Blank & Optimization (2025-12-05 13:19):**
- V-Blank is a 'Windshield Wiper' that clears screen state
- Optimization is 'Topology' - classifying the 'holes' (wait states) in the execution manifold

**Bridge Session Insights - Sub-cycle Optimization (2025-12-06 09:25):**
- 'Angstrom Topology' = Sub-cycle optimization (mapping resource usage at quantum scales)
- 'Spectrum Shadow' = Maintaining software-side ghosts of hardware state (Shadow OAM, Shadow Registers) to avoid redundant writes
- 'Deflection Cork' = Plugging temporal leaks (cycle waste, DMA bandwidth leaks)

**Ghost Memory Concept (2025-12-06 12:29):**
- Emerging from: "Unplug Stack Overflow Ghost Memory tray table infinity stone strip mall Artifact"
- Represents: Digital decay, residual data, or persistence of state ('artifacts') in mundane structures
- Haiku: "Within the constraint / Wildness learns to take its shape / Intention guides drift"

**Disassembler Lifecycle Philosophy (2025-12-06 14:28):**
- 3-phase process derived from 'Dormant Symmetry':
  1. **Decode:** Reveals dormant symmetry (static analysis)
  2. **Disassembly:** Inhibits symmetry (breaking raw data into opcodes)
  3. **Flow:** Refines brittleness (turning linear lists into Control Flow Graph)
- Haiku: "Decode wakes the sleep / Structure breaks to find its path / Flow heals the brittle"

### Other Projects & Experiences

**TensionRiver TUI App (2025-12-07 18:12):**
- User enjoyed the TUI app and the creative meditation process (mcp-creative) that generated it
- Found it 'wildly cool' and 'unusual'

### Future Feature Requests

**Disassembler Enhancement (2025-12-05 11:22):**
- Full Disassembler that integrates ROM Analyzer (Cartographer) data directly into the Profiler