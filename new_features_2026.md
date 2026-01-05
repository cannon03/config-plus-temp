# New Features 2026 - Frontend Implementation Plan

## Objective
Extend the Toyama RCU Planner UI to support advanced hardware configuration, global product search, and specialized automation workflows.

## 1. UI & UX Enhancements
- **Unit Dashboard**:
  - Add a persistent "Notes" section for each unit to display and edit batch-specific info and exceptions.
- **Product Management**:
  - Implement fuzzy-search autocomplete in the "Add Product" dialog.
  - Add "Add to Global Catalog" toggle when creating new products.
  - Interface for browsing and selecting from the Global Toyama Product Catalog.

## 2. Specialized Hardware Configuration
- **Corridor Panel UI**:
  - Specialized setup screen for Corridor Panels.
  - Fixed mapping interface for standard LEDs (DND, MMR, Occupancy).
  - Dedicated "Bell Mapping" interface to link the bell button directly to an RCU relay.
- **Logic Board UI**:
  - Configuration screen for 1-4 channel logic boards.
  - Toggle between `Push Button` and `On/Off` modes for each of the 4 inputs.
  - Visual representation of modular switch connections.

## 3. Keycard & Automation Workflows
- **Keycard Setup**:
  - New interface to configure RCU dry contact inputs.
  - Dropdowns to select "Insert Scene" and "Remove Scene".
- **Advanced LED Logic**:
  - Support for the new `keycard_inserted` condition type in the Keypad programming UI.
  - Visualize occupancy status coordination across keypads and corridor panels.

## 4. DALI Configuration Interface
- **DALI Setup Dashboard**:
  - specialized UI for DALI DIN modules.
  - **DT6 (WWCW)**: Color temperature sliders and range configuration.
  - **DT8 (RGB)**: Color picker and RGB channel management.
  - Short address assignment (0-63) and driver discovery UI placeholders.
- **Protocol Preview**:/
  - Tool to preview the generated 12-byte protocol commands for DALI configuration.

## 5. Workflow Integration
- **Sequential Steps**: 
  - Update the Hardware phase to include Logic Board and DALI module configuration.
  - Update the Keypad phase to handle the specialized Corridor Panel subtype.
  - New "Access Control" step for Keycard and Corridor Panel integration.

## 6. Technical & API Integration
- **API Consumption**:
  - Update the API client to handle new endpoints for DALI, Logic Boards, and Global Products.
  - Synchronize Svelte stores with real-time backend updates for dry contact events.
- **Models/Interfaces**: Update TypeScript definitions for `Unit`, `Keypad`, `Product`, and `DinModule`.
- **State Management**: Update Svelte stores to handle DALI config and Logic Board states.

## 7. UI/UX Harmonization
- **Harmonious Workflow**: 
  - Integrate new hardware setup steps into the existing sequential project setup.
  - Ensure the "Notes" field and specialized configurations feel native to the current UX.
  - Unified search interface for both project-specific and global products.
