#!/usr/bin/env python3

from textual.app import App, ComposeResult
from textual.containers import Container, Horizontal, Vertical
from textual.widgets import Header, Footer, Static, Button, Input, TextArea, Tree, Tabs, Tab
from textual import events
import asyncio
import json
import subprocess
import threading
import queue

class RetroIDEApp(App):
    """RetroIDE - Circuit-Board Metropolis IDE"""

    CSS = """
    Screen {
        background: black;
    }

    Header {
        background: $primary;
        color: white;
    }

    Footer {
        background: $primary-darken-2;
        color: white;
    }

    #main-container {
        height: 100%;
    }

    #sidebar {
        width: 30;
        background: $panel;
        border-right: solid $primary;
    }

    #content {
        width: 100%;
    }

    #code-editor {
        height: 100%;
    }

    #asset-viewer {
        height: 100%;
    }

    #console {
        height: 20;
        background: $surface;
        border-top: solid $primary;
    }

    Button {
        margin: 1;
    }

    .tab-content {
        padding: 1;
    }
    """

    def __init__(self):
        super().__init__()
        self.mcp_process = None
        self.mcp_queue = queue.Queue()

    def compose(self) -> ComposeResult:
        yield Header()
        with Container(id="main-container"):
            with Horizontal():
                with Vertical(id="sidebar"):
                    yield Static("🖥️ RETROID v2.0", classes="title")
                    yield Button("New Project", id="new-project")
                    yield Button("Open Asset", id="open-asset")
                    yield Button("Build ROM", id="build-rom")
                    yield Button("Run Emulator", id="run-emulator")
                    yield Tree("Projects", id="project-tree")
                with Vertical(id="content"):
                    with Tabs():
                        with Tab("Code", id="code-tab"):
                            yield TextArea("", id="code-editor")
                        with Tab("Assets", id="assets-tab"):
                            yield Static("Asset Forge - Pixel Foundry Active", id="asset-viewer")
                        with Tab("Build", id="build-tab"):
                            yield Static("Build Tools - MCP Grid Online", id="build-viewer")
                    yield Static("Console Output - Circuit-Board Metropolis Initialized", id="console")
        yield Footer()

    async def on_mount(self) -> None:
        self.start_mcp_server()

    def start_mcp_server(self):
        """Start the MCP server in a separate thread"""
        def run_server():
            try:
                self.mcp_process = subprocess.Popen(
                    ["node", "dist/index.js"],
                    stdin=subprocess.PIPE,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    cwd="/home/casey/RetroIDE"
                )
                # In a real implementation, we'd handle MCP protocol here
                # For now, just keep it running
            except Exception as e:
                self.mcp_queue.put(f"Error starting MCP server: {e}")

        thread = threading.Thread(target=run_server, daemon=True)
        thread.start()

    async def on_button_pressed(self, event: Button.Pressed) -> None:
        if event.button.id == "new-project":
            await self.action_new_project()
        elif event.button.id == "open-asset":
            await self.action_open_asset()
        elif event.button.id == "build-rom":
            await self.action_build_rom()
        elif event.button.id == "run-emulator":
            await self.action_run_emulator()

    async def action_new_project(self):
        # Simulate MCP call
        console = self.query_one("#console", Static)
        console.update("Created new retro project. Kernel Plaza activated.")

    async def action_open_asset(self):
        asset_viewer = self.query_one("#asset-viewer", Static)
        asset_viewer.update("Asset Forge: Sprite generated - 16x16 pixels, 4 colors. Diffusion stabilized.")

    async def action_build_rom(self):
        build_viewer = self.query_one("#build-viewer", Static)
        build_viewer.update("MCP Grid: ROM compiled successfully. Data conduits pulsing with momentum.")

    async def action_run_emulator(self):
        console = self.query_one("#console", Static)
        console.update("Emulator Coliseum: ROM loaded. Testing Grounds active - scanline shadows engaged.")

if __name__ == "__main__":
    app = RetroIDEApp()
    app.run()