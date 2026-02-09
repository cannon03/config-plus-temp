# New Features 2026 - Implementation Architecture Plan

## Executive Summary

This plan extends the Toyama RCU Planner UI to support advanced hardware configuration, global product search, and specialized automation workflows. The implementation introduces three major hardware types (Corridor Panels, Logic Boards, DALI modules), a global product catalog system, and enhanced workflow management while maintaining the existing Svelte 5 + Tailwind CSS architecture.

## Tech Stack Context

**Framework & Language:**

- SvelteKit v2.43.2 with Svelte v5.39.5 (using runes system)
- TypeScript v5.9.2 (strict mode)
- Vite v7.1.7 as build tool

**Key Libraries:**

- Tailwind CSS v4 with native Vite plugin
- shadcn-svelte component system
- Lucide Svelte for icons
- No server-side rendering (static SPA mode)

**Architectural Patterns:**

- Svelte 5 runes for state management ($state, $derived, $effect)
- Context API for dashboard-wide state sharing
- Event-driven updates via window events
- API layer with centralized CRUD patterns
- Component hierarchy: base → composed → feature-specific

**Current Hardware Types:**

- Keypads (1-6 keys with visual mapping)
- Loads (6 types: phase_cut, relay, 1-10v, curtain, dali-dt6, dali-dt8)
- RCUs & DIN Modules with channel configuration
- Zones, Rooms, Scenes with hierarchical organization

## Requirements

### Functional Requirements

**FR1 - Unit Notes:**

- Persistent notes section for each unit to display and edit batch-specific info and exceptions
- Persist changes to backend

**FR2 - Product Management:**

- Fuzzy-search autocomplete in "Add Product" dialog
- "Add to Global Catalog" toggle when creating new products
- Interface to browse and select from the Global Toyama Product Catalog

**FR3 - Corridor Panel UI:**

- Specialized setup screen for Corridor Panels
- Fixed mapping interface for standard LEDs (DND, MMR, Occupancy)
- Dedicated "Bell Mapping" interface to link the bell button directly to an RCU relay

**FR4 - Logic Board UI:**

- Configuration screen for 1-4 channel logic boards
- Toggle between `Push Button` and `On/Off` modes for each of the 4 inputs
- Visual representation of modular switch connections

**FR5 - Keycard Setup:**

- New interface to configure RCU dry contact inputs
- Dropdowns to select "Insert Scene" and "Remove Scene"

**FR6 - Advanced LED Logic:**

- Support for the new `keycard_inserted` condition type in the Keypad programming UI
- Visualize occupancy status coordination across keypads and corridor panels

**FR7 - DALI Configuration Interface:**

- Specialized UI for DALI DIN modules
- **DT6 (WWCW)**: Color temperature sliders and range configuration
- **DT8 (RGB)**: Color picker and RGB channel management
- Short address assignment (0-63) and driver discovery UI placeholders
- Protocol preview tool for 12-byte protocol commands

**FR8 - Workflow Integration:**

- Update the Hardware phase to include Logic Board and DALI module configuration
- Update the Keypad phase to handle the specialized Corridor Panel subtype
- New "Access Control" step for Keycard and Corridor Panel integration

### Non-Functional Requirements

**NFR1 - Maintainability:** Follow existing patterns for components, API layer, and state management
**NFR2 - Performance:** No significant performance degradation for new UI components
**NFR3 - Type Safety:** All new features must have complete TypeScript definitions
**NFR4 - UX Consistency:** New features must blend seamlessly with existing UI/UX patterns
**NFR5 - Testing:** Maintain existing event-driven update patterns for consistency

## Current State Analysis

### Strengths

1. **Established Patterns**: Clear component, API, and type definition patterns that can be replicated
2. **Runes-Based State**: Modern Svelte 5 architecture with reactive primitives
3. **Event System**: Loose coupling via window events enables easy integration of new features
4. **Dashboard Context**: Well-designed context sharing for complex multi-entity views
5. **Tailwind v4**: Latest styling system with good performance characteristics

### Constraints

1. **No Server-Side Rendering**: All data fetching is client-side, requiring careful load optimization
2. **Static SPA Mode**: Limited routing flexibility, requires careful URL planning
3. **Event-Driven Architecture**: Complex state updates must go through event system
4. **Type Rigidity**: Strong TypeScript enforcement means new types must be well-designed

### Technical Debt Considerations

1. **Keypad Type System**: Current keypad types (1-6 keys) will need to accommodate Corridor Panel as a new subtype
2. **Load Types**: DALI types (dali-dt6, dali-dt8) are already defined but lack dedicated UI
3. **API Event Targets**: Will need to add new reload targets for new entities
4. **Dashboard Layout**: Current 5-tab structure may need reorganization

## Architectural Options

### Option 1: Incremental Extension (Primary Recommendation)

**Description**: Extend the existing architecture by adding new hardware types as specialized variants within current systems, reusing patterns while introducing minimal new abstractions.

**Approach:**

- Corridor Panel as a new Keypad subtype with dedicated UI
- Logic Board as a new DIN Module subtype
- DALI configuration as specialized Load configuration views
- Global Product Catalog as a parallel API layer with unified search UI
- Notes as a new field on Unit entity with dedicated component

**Pros**:

- Maintains consistency with existing patterns
- Minimizes cognitive overhead for developers
- Reduces risk of breaking changes
- Leverages existing event system and context API
- Faster development time (est. 4-6 weeks)

**Cons**:

- Some hardware types don't perfectly fit existing categories
- May need special-case handling in shared components
- Corridor Panel as Keypad subtype could feel forced

**Justification**: This is the primary choice because:

- Alignment with existing patterns: The project's strength lies in consistent patterns - reusing them ensures maintainability
- Risk assessment: **Low** - Extending proven patterns reduces introduction of bugs
- Complexity: **Medium** - Some architectural stretching but well-defined
- Maintainability: **High** - Future developers will understand the extensions

---

### Option 2: Modular Hardware Abstraction Layer

**Description**: Introduce a new abstraction layer where all hardware types (Keypads, Logic Boards, Corridor Panels, DALI modules) are treated uniformly through a configuration-driven approach.

**Approach**:

- Create base `HardwareConfig` type with flexible schema
- Define hardware type registry with configuration objects
- Build generic configuration components that render based on type config
- Global Product Catalog integrated as first-class product system
- Separate "Access Control" module for keycard and door-related features

**Pros**:

- Highly extensible for future hardware types
- Cleaner separation of concerns
- More testable through configuration-driven approach
- Reduces code duplication in the long term

**Cons**:

- Higher initial development effort (est. 7-9 weeks)
- Requires significant refactoring of existing components
- Higher learning curve for team members
- Risk of over-engineering for current requirements

**When to choose**: If the roadmap includes many more hardware types (10+), or if the team plans to expose hardware configuration as an API to external integrators.

- Alignment with existing patterns: **Low** - Introduces new paradigm
- Risk assessment: **Medium** - More moving parts, but well-tested patterns can emerge
- Complexity: **High** - New abstraction layer adds complexity
- Maintainability: **High** (long term) / **Medium** (short term)

---

### Option 3: Feature-Based Vertical Slices

**Description**: Implement each major feature area as a self-contained module with its own routing, state management, and API integration, integrating with the main app at the layout level.

**Approach**:

- `/hardware-setup` route for Corridor Panel and Logic Board
- `/dali-config` route for DALI configuration
- `/access-control` route for Keycard and Corridor Panel integration
- `/products` route for Global Catalog management
- Each slice has its own stores, API clients, and event systems
- Minimal dependencies between slices

**Pros**:

- Clear feature boundaries
- Easier to test in isolation
- Can be developed in parallel by multiple developers
- Each slice can have its own deployment strategy

**Cons**:

- UX fragmentation - users navigate between different areas
- Code duplication across slices (forms, modals, cards)
- Harder to maintain consistent UX patterns
- Increased bundle size

**When to choose**: If the team has multiple developers who need to work in parallel with minimal coordination, or if some features may be optional/feature-flagged.

- Alignment with existing patterns: **Low** - Moves away from unified dashboard
- Risk assessment: **High** - Fragmentation risks
- Complexity: **Medium** - Individual slices are simpler, overall is more complex
- Maintainability: **Low** - Duplication increases maintenance burden

## Decision Guidance

| Factor             | Option 1 (Incremental) | Option 2 (Modular Abstraction) | Option 3 (Vertical Slices) |
| ------------------ | ---------------------- | ------------------------------ | -------------------------- |
| Development time   | Low (4-6 weeks)        | High (7-9 weeks)               | Medium (6-8 weeks)         |
| Maintenance burden | Low                    | Medium                         | High                       |
| Scalability        | Medium                 | High                           | Low                        |
| Learning curve     | Low                    | High                           | Medium                     |
| Team alignment     | High                   | Medium                         | Low                        |
| UX consistency     | High                   | Medium                         | Low                        |

## Technical Specification

**Based on Option 1 - Incremental Extension**

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Unit Dashboard Layout                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Overview     │  │ Zones & Rooms│  │ Loads        │         │
│  │ + Notes      │  │              │  │              │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│  ┌──────────────┐  ┌──────────────┐                          │
│  │ Hardware     │  │ Keypads      │                          │
│  │ ┌──────────┐ │  │ ┌──────────┐ │                          │
│  │ │ RCUs     │ │  │ │ Keypads  │ │                          │
│  │ │ DIN Mods │ │  │ │ Corridors│ │                          │
│  │ │ Logic    │ │  │ └──────────┘ │                          │
│  │ │ DALI     │ │  │              │                          │
│  │ └──────────┘ │  │              │                          │
│  └──────────────┘  └──────────────┘                          │
│  ┌──────────────────────────────────────┐                    │
│  │ Access Control (New Tab)              │                    │
│  │ ┌──────────┐  ┌──────────────────┐    │                    │
│  │ │ Keycards │  │ Corridor Bell    │    │                    │
│  │ └──────────┘  │ LED Coordination │    │                    │
│  │               └──────────────────┘    │                    │
│  └──────────────────────────────────────┘                    │
└─────────────────────────────────────────────────────────────────┘

Global Product Catalog:
┌──────────────────────────────────────┐
│ Product Search (Fuzzy)               │
│ ┌──────────────────────────────────┐  │
│ │ Add Product Dialog:              │  │
│ │ - Name [autocomplete]            │  │
│ │ - Type                           │  │
│ │ ☑ Add to Global Catalog         │  │
│ └──────────────────────────────────┘  │
│ ┌──────────────────────────────────┐  │
│ │ Browse Global Catalog            │  │
│ │ [Product Cards with "Add" button]│  │
│ └──────────────────────────────────┘  │
└──────────────────────────────────────┘
```

### Components

#### New Components

**1. Unit Notes Section**

- Path: `/lib/components/composed/cards/UnitNotesCard.svelte`
- Props: `unit: UnitResponse`
- State: `notes: string` (editable)
- Features: Textarea with auto-save, timestamp for last edit

**2. Global Product Search**

- Path: `/lib/components/composed/forms/ProductSearchForm.svelte`
- Props: `onProductSelect: (product) => void`, `allowCreateGlobal: boolean`
- Features: Fuzzy search input, results dropdown, "Create New" button, "Add to Global" toggle

**3. Corridor Panel Form & Card**

- Path:
  - `/lib/components/composed/forms/CorridorPanelForm.svelte`
  - `/lib/components/composed/cards/CorridorPanelCard.svelte`
- State:
  - LED mappings: `{ dnd: string, mmr: string, occupancy: string }`
  - Bell mapping: `{ relayId: string }`
- Features: Fixed LED assignment UI, Bell relay selector, preview visualization

**4. Logic Board Form & Card**

- Path:
  - `/lib/components/composed/forms/LogicBoardForm.svelte`
  - `/lib/components/composed/cards/LogicBoardCard.svelte`
- State:
  - Channel configurations: `ChannelConfig[]` where each has mode (push/onoff) and connections
- Features: 1-4 channel toggles, mode switch per channel, visual connection diagram

**5. Keycard Setup Form**

- Path: `/lib/components/composed/forms/KeycardSetupForm.svelte`
- State:
  - `dryContactId: string`
  - `insertSceneId: string`
  - `removeSceneId: string`
- Features: RCU input selector, scene dropdowns, validation

**6. DALI Configuration Form**

- Path: `/lib/components/composed/forms/DALIConfigForm.svelte`
- Props: `loadType: 'dali-dt6' | 'dali-dt8'`
- State:
  - For DT6: `{ minTemp: number, maxTemp: number, defaultTemp: number }`
  - For DT8: `{ r: number, g: number, b: number }`
  - Short address: `number` (0-63)
- Features: Color picker, sliders, address assignment, protocol preview button

**7. Protocol Preview Modal**

- Path: `/lib/components/composed/modals/ProtocolPreviewModal.svelte`
- Props: `protocolData: Uint8Array`
- Features: Hex display, byte-by-byte annotation, copy button

**8. Occupancy Status Visualizer**

- Path: `/lib/components/composed/cards/OccupancyStatusCard.svelte`
- Features: Keypad list with occupancy indicators, Corridor Panel status, real-time updates

#### Modified Components

**1. UnitActionsCard**

- Add "Manage Notes" action
- Integrate notes preview in card body

**2. LoadForm**

- Add conditional DALI configuration section
- Trigger DALI config modal for dali-dt6 and dali-dt8 types

**3. KeypadList**

- Filter/handle new "corridor_panel" keypad type
- Route to CorridorPanelCard for corridor panels

**4. KeypadKeyInfoModal**

- Add "keycard_inserted" option to condition dropdown
- Add occupancy-related trigger options

**5. Hardware tab in dashboard layout**

- Add Logic Board section
- Add DALI Configuration section
- Update navigation

**6. Add Product Dialogs (across forms)**

- Replace simple inputs with ProductSearchForm component
- Handle global catalog toggle

### Data Flow

#### Product Search Flow

```
User types in ProductSearchForm
    ↓
Fuzzy search via API (debounced)
    ↓
Results dropdown displays
    ↓
User selects product OR clicks "Create New"
    ↓
If "Create New":
    - Show form fields
    - Check "Add to Global Catalog" toggle
    - Submit creates:
        * Project-specific product
        * Global catalog entry (if toggled)
    ↓
Product added to parent entity (load/zone/etc.)
```

#### Corridor Panel Configuration Flow

```
User creates new Keypad with type "corridor_panel"
    ↓
KeypadList routes to CorridorPanelCard
    ↓
User clicks "Configure"
    ↓
CorridorPanelForm opens in modal
    ↓
LED mappings:
    - Fixed slots for DND, MMR, Occupancy
    - Dropdowns to select target channels/load IDs
    ↓
Bell mapping:
    - Select RCU and relay
    - Visual preview of connection
    ↓
Submit saves to Keypad entity with specialized fields
    ↓
dispatch('reload:keypads')
    ↓
Access Control dashboard updates occupancy status
```

#### DALI Configuration Flow

```
User creates/edit Load with type "dali-dt6" or "dali-dt8"
    ↓
LoadForm detects DALI type
    ↓
Shows "Configure DALI" button
    ↓
User clicks → DALIConfigForm opens
    ↓
For DT6:
    - Temperature range sliders (2700K-6500K)
    - Default temperature input
    ↓
For DT8:
    - RGB color picker
    - Individual channel sliders
    ↓
Short address:
    - Input field (0-63)
    - "Discover Drivers" button (shows placeholder)
    ↓
User clicks "Preview Protocol"
    ↓
ProtocolPreviewModal displays 12-byte command
    ↓
Submit saves DALI config to Load entity
    ↓
dispatch('reload:loads')
```

#### Keycard Setup Flow

```
User navigates to Access Control tab
    ↓
KeycardSetupForm displayed
    ↓
Select RCU from dropdown
    ↓
Select dry contact input from list
    ↓
Dropdowns populated with available scenes:
    - "Insert Scene"
    - "Remove Scene"
    ↓
Submit creates KeycardConfig entity
    ↓
dispatch('reload:keycards')
    ↓
KeypadKeyInfoModal shows "keycard_inserted" option
```

#### Occupancy Coordination Flow

```
Keypad or Corridor Panel changes occupancy state
    ↓
Backend updates state
    ↓
WebSocket/polling triggers:
    dispatch('reload:occupancy')
    ↓
OccupancyStatusCard updates all connected devices
    ↓
Visual indicators update in real-time
```

### API Design

#### New API Endpoints

```typescript
// Global Product Catalog
GET    /api/v1/products/global          // Search global catalog
POST   /api/v1/products/global          // Add to global catalog
GET    /api/v1/products/search?q=...    // Fuzzy search (searches both project and global)

// Corridor Panel Configuration
GET    /api/v1/keypads/{id}/corridor    // Get corridor panel config
PATCH  /api/v1/keypads/{id}/corridor    // Update corridor panel config

// Logic Board Configuration
GET    /api/v1/din-modules/{id}/logic   // Get logic board config
PATCH  /api/v1/din-modules/{id}/logic   // Update logic board config

// Keycard Configuration
GET    /api/v1/units/{id}/keycards      // List keycard configs
POST   /api/v1/units/{id}/keycards      // Create keycard config
PATCH  /api/v1/keycards/{id}            // Update keycard config
DELETE /api/v1/keycards/{id}            // Delete keycard config

// DALI Configuration
GET    /api/v1/loads/{id}/dali          // Get DALI config
PATCH  /api/v1/loads/{id}/dali          // Update DALI config
POST   /api/v1/dali/preview             // Generate protocol preview

// Unit Notes
GET    /api/v1/units/{id}/notes         // Get unit notes
PATCH  /api/v1/units/{id}/notes         // Update unit notes

// Occupancy Status
GET    /api/v1/units/{id}/occupancy     // Get occupancy status for all devices
```

#### Updated API Patterns

```typescript
// Extended Product type
interface ProductResponse {
	id: string;
	name: string;
	type: string;
	isGlobal: boolean;
	catalogId?: string; // If from global catalog
	specifications?: Record<string, any>;
}

// Extended Keypad type for Corridor Panel
interface KeypadResponse {
	id: string;
	name: string;
	type: '1-key' | '2-key' | '3-key' | '4-key' | '6-key' | 'corridor_panel';
	// ... existing fields
	corridorConfig?: {
		ledMappings: {
			dnd: string; // Channel ID
			mmr: string;
			occupancy: string;
		};
		bellMapping: {
			rcuId: string;
			relayId: string;
		};
	};
}

// Extended DinModule for Logic Board
interface DinModuleResponse {
	id: string;
	name: string;
	type: 'relay' | '1-10v' | 'dali' | 'logic';
	// ... existing fields
	logicConfig?: {
		channels: Array<{
			id: number; // 1-4
			mode: 'push-button' | 'on-off';
			connections: string[]; // Connected device IDs
		}>;
	};
}

// Extended Load for DALI
interface LoadResponse {
	id: string;
	name: string;
	type: 'phase_cut' | 'relay' | '1-10v' | 'curtain' | 'dali-dt6' | 'dali-dt8';
	// ... existing fields
	daliConfig?: {
		shortAddress: number; // 0-63
		// DT6 specific
		wwcw?: {
			minTemp: number; // Kelvin
			maxTemp: number;
			defaultTemp: number;
		};
		// DT8 specific
		rgb?: {
			r: number; // 0-255
			g: number;
			b: number;
		};
	};
}

// New Keycard Config
interface KeycardResponse {
	id: string;
	unitId: string;
	rcuId: string;
	dryContactInput: number;
	insertSceneId: string;
	removeSceneId: string;
	createdAt: string;
	updatedAt: string;
}

// Unit Notes
interface UnitNotesResponse {
	unitId: string;
	notes: string;
	lastEditedAt: string;
	lastEditedBy: string;
}
```

### State Management

#### Updates to Dashboard Context

```typescript
// src/lib/context/dashboard.ts
export function createDashboardContext() {
	const context = $state({
		// ... existing fields
		unitNotes: $state<UnitNotesResponse | null>(null),
		keycardConfigs: $state<KeycardResponse[]>([]),
		occupancyStatus: $state<Record<string, boolean>>({}) // deviceId -> occupied
	});

	// New methods
	async function refreshUnitNotes() {
		context.unitNotes = await fetchUnitNotes(context.unit.id);
	}

	async function refreshKeycards() {
		context.keycardConfigs = await fetchKeycardConfigs(context.unit.id);
	}

	async function refreshOccupancy() {
		const status = await fetchOccupancyStatus(context.unit.id);
		context.occupancyStatus = status;
	}

	return {
		...context,
		refreshUnitNotes,
		refreshKeycards,
		refreshOccupancy
	};
}
```

#### New Reload Targets

```typescript
// src/lib/constants/api.ts
export const RELOAD_TARGETS = {
	// ... existing targets
	UNIT_NOTES: 'reload:unit_notes',
	KEYCARDS: 'reload:keycards',
	OCCUPANCY: 'reload:occupancy',
	CORRIDOR_PANELS: 'reload:corridor_panels',
	LOGIC_BOARDS: 'reload:logic_boards',
	DALI_CONFIG: 'reload:dali_config',
	GLOBAL_PRODUCTS: 'reload:global_products'
} as const;
```

#### Product Search Store

```typescript
// src/lib/stores/product-search.ts
interface ProductSearchState {
	query: string;
	results: ProductResponse[];
	isLoading: boolean;
	isGlobalOnly: boolean;
}

let searchState = $state<ProductSearchState>({
	query: '',
	results: [],
	isLoading: false,
	isGlobalOnly: false
});

export const productSearchStore = {
	get query() {
		return searchState.query;
	},
	set query(value: string) {
		searchState.query = value;
	},
	get results() {
		return searchState.results;
	},
	get isLoading() {
		return searchState.isLoading;
	},
	get isGlobalOnly() {
		return searchState.isGlobalOnly;
	},
	set isGlobalOnly(value: boolean) {
		searchState.isGlobalOnly = value;
	},

	async search() {
		searchState.isLoading = true;
		searchState.results = await searchProducts(searchState.query, searchState.isGlobalOnly);
		searchState.isLoading = false;
	}
};
```

### Security Considerations

**1. Product Catalog Access:**

- Global catalog is read-only for standard users
- Only admins can add/update global catalog entries
- Project-specific products follow existing unit-level permissions

**2. Keycard Configuration:**

- Requires unit-level edit permissions
- Dry contact mapping validation to prevent conflicts

**3. DALI Protocol Preview:**

- Read-only operation, no security risk
- Validates address range (0-63) before sending

**4. Unit Notes:**

- Follows unit-level permissions
- Tracks last edited by user for audit trail

## Implementation Phases

### Phase 1: Foundation & Infrastructure

**Dependencies**: None
**Duration**: 1 week

**Tasks**:

- [ ] Create type definitions for new entities
  - `src/lib/types/corridor_panel.ts`
  - `src/lib/types/logic_board.ts`
  - `src/lib/types/keycard.ts`
  - `src/lib/types/dali_config.ts`
  - `src/lib/types/product.ts` (extended)
- [ ] Create API client functions
  - `src/lib/api/corridor_panel.ts`
  - `src/lib/api/logic_board.ts`
  - `src/lib/api/keycard.ts`
  - `src/lib/api/dali_config.ts`
  - `src/lib/api/product.ts` (extended with search)
- [ ] Add new reload targets to constants
- [ ] Update DashboardContext with new state
- [ ] Create base components stubs for testing
- [ ] Set up new routes structure

**Deliverables**:

- Complete type definitions
- API layer ready for integration
- Dashboard context extended
- Test routes accessible

---

### Phase 2: Product Management System

**Dependencies**: Phase 1
**Duration**: 1 week

**Tasks**:

- [ ] Implement ProductSearchForm component
  - Fuzzy search with debouncing
  - Results dropdown
  - "Create New" toggle
  - "Add to Global" checkbox
- [ ] Implement GlobalCatalogBrowser component
  - Grid of product cards
  - Filter by type
  - "Add to Project" button
- [ ] Update LoadForm to use ProductSearchForm
- [ ] Update ZoneForm to use ProductSearchForm
- [ ] Create product management page at `/products`
- [ ] Implement product API with global catalog support
- [ ] Add product search to global search (if exists)

**Deliverables**:

- Product search with fuzzy matching
- Global catalog browsing interface
- Integration with existing forms
- "Add to Global" functionality working

---

### Phase 3: Unit Notes Enhancement

**Dependencies**: Phase 1
**Duration**: 3 days

**Tasks**:

- [ ] Implement UnitNotesCard component
  - Textarea for editing
  - Read-only display mode
  - Last edited timestamp
  - Auto-save on change (debounced)
- [ ] Update UnitActionsCard to include notes preview
- [ ] Add notes API endpoint integration
- [ ] Update dashboard layout to show notes on Overview tab
- [ ] Add "Manage Notes" action to unit menu

**Deliverables**:

- Notes editable and persistent
- Auto-save working
- Display on unit overview

---

### Phase 4: Corridor Panel Configuration

**Dependencies**: Phase 1, Phase 2
**Duration**: 1 week

**Tasks**:

- [ ] Extend Keypad type to include 'corridor_panel'
- [ ] Implement CorridorPanelCard component
  - Display LED mappings
  - Display Bell mapping
  - Visual preview
- [ ] Implement CorridorPanelForm component
  - Fixed LED slots (DND, MMR, Occupancy)
  - Relay selector for Bell
  - Validation
- [ ] Update KeypadList to handle corridor panels
  - Filter/routing logic
  - Different card rendering
- [ ] Add corridor panel API functions
- [ ] Create corridor panel configuration route: `/units/[id]/dashboard/keypads/corridor/[id]`
- [ ] Test corridor panel creation and editing

**Deliverables**:

- Corridor Panel type functional
- LED mapping UI working
- Bell mapping UI working
- Integration with Keypad tab

---

### Phase 5: Logic Board Configuration

**Dependencies**: Phase 1
**Duration**: 1 week

**Tasks**:

- [ ] Extend DinModule type to include 'logic' type
- [ ] Implement LogicBoardCard component
  - Display channel configurations
  - Visual connection diagram
- [ ] Implement LogicBoardForm component
  - 1-4 channel selector
  - Mode toggle per channel (push/onoff)
  - Connection selector
  - SVG visualization of connections
- [ ] Update DinModuleList to show logic boards
- [ ] Add logic board API functions
- [ ] Create logic board configuration UI in Hardware tab
- [ ] Test logic board creation and editing

**Deliverables**:

- Logic Board type functional
- Channel configuration working
- Visual connection diagram
- Integration with Hardware tab

---

### Phase 6: Keycard Setup

**Dependencies**: Phase 1
**Duration**: 1 week

**Tasks**:

- [ ] Implement KeycardSetupForm component
  - RCU selector
  - Dry contact input selector
  - Scene dropdowns (Insert/Remove)
  - Validation
- [ ] Implement KeycardCard component for listing
- [ ] Create KeycardList component
- [ ] Implement keycard API functions
- [ ] Create "Access Control" tab in dashboard layout
  - Route: `/units/[id]/dashboard/access-control`
  - Layout file
  - Data loading
- [ ] Add access control to navigation bar
- [ ] Test keycard configuration

**Deliverables**:

- Keycard configuration functional
- Access Control tab created
- Navigation updated
- Scene selection working

---

### Phase 7: DALI Configuration Interface

**Dependencies**: Phase 1, Phase 2
**Duration**: 1.5 weeks

**Tasks**:

- [ ] Implement DALIConfigForm component
  - Conditional rendering for DT6 vs DT8
  - Color temperature sliders (DT6)
  - RGB color picker (DT8)
  - Short address input (0-63)
  - "Discover Drivers" button (placeholder)
- [ ] Implement ProtocolPreviewModal component
  - 12-byte hex display
  - Byte-by-byte annotation
  - Copy to clipboard
- [ ] Update LoadForm to show "Configure DALI" button
  - Only for dali-dt6 and dali-dt8 types
  - Open DALI config modal
- [ ] Implement DALI protocol generation API
  - Preview endpoint
- [ ] Add DALI-specific validation
- [ ] Test DALI configuration for both types
- [ ] Test protocol preview

**Deliverables**:

- DT6 configuration working
- DT8 configuration working
- Protocol preview functional
- Integration with Load forms

---

### Phase 8: Advanced LED Logic & Occupancy

**Dependencies**: Phase 4, Phase 6
**Duration**: 1 week

**Tasks**:

- [ ] Implement OccupancyStatusCard component
  - List all keypads with occupancy status
  - Show corridor panel status
  - Real-time updates
- [ ] Update KeypadKeyInfoModal
  - Add "keycard_inserted" to condition types
  - Add occupancy-related triggers
- [ ] Implement occupancy status API
  - GET endpoint for device status
  - WebSocket/polling for real-time updates
- [ ] Add occupancy visualization to Access Control tab
- [ ] Test occupancy coordination
- [ ] Test keycard condition in keypad programming

**Deliverables**:

- Occupancy status visualizer working
- Keycard inserted condition available
- Real-time status updates
- Coordination between devices

---

### Phase 9: UI/UX Harmonization & Workflow Integration

**Dependencies**: All previous phases
**Duration**: 1 week

**Tasks**:

- [ ] Update Hardware tab to include Logic Board and DALI sections
- [ ] Update Keypad phase to handle Corridor Panel subtype
- [ ] Integrate Access Control tab into project setup flow
- [ ] Add progress tracking for new hardware types
- [ ] Update ProjectProgressCard to include new features
- [ ] Ensure unified search for project and global products
- [ ] Polish transitions and animations
- [ ] Update breadcrumb navigation for new routes
- [ ] Review and refine all new UI components for consistency

**Deliverables**:

- All tabs updated
- Project progress tracking includes new features
- Unified product search
- Consistent UX across all features

---

### Phase 10: Testing, Documentation & Deployment

**Dependencies**: Phase 9
**Duration**: 1 week

**Tasks**:

- [ ] End-to-end testing of all new features
- [ ] Cross-browser testing
- [ ] Performance testing (especially DALI config and product search)
- [ ] Update API documentation
- [ ] Create user documentation for new features
- [ ] Code review and refactoring
- [ ] Bug fixes
- [ ] Prepare deployment
- [ ] Deploy to staging for final review
- [ ] Deploy to production

**Deliverables**:

- All features tested and working
- Documentation updated
- Production deployment complete

---

**Total Estimated Duration**: 9-10 weeks

## Risk Analysis

### High-Priority Risks

1. **Risk**: Corridor Panel as Keypad subtype may not fit well with existing keypad patterns
   - **Impact**: Medium - Could require refactoring of keypad-related components
   - **Probability**: Medium
   - **Mitigation**:
     - Create a separate branch to prototype Corridor Panel as a standalone entity type
     - If it doesn't fit, introduce new "Panel" entity type with shared keypad characteristics
     - Keep keypad types flexible to accommodate future panel types

2. **Risk**: DALI protocol generation may have incorrect byte structure
   - **Impact**: High - Could cause incorrect hardware configuration
   - **Probability**: Low - API should handle protocol correctly
   - **Mitigation**:
     - Add validation in the protocol preview
     - Include protocol version checksum
     - Test with actual DALI hardware before deploying to production
     - Provide clear documentation of byte structure for troubleshooting

3. **Risk**: Real-time occupancy updates may cause performance issues
   - **Impact**: Medium - UI lag during updates
   - **Probability**: Medium - Depends on number of devices
   - **Mitigation**:
     - Implement debouncing for occupancy status updates
     - Use efficient state updates (avoid full re-renders)
     - Limit polling frequency if using polling instead of WebSocket
     - Consider optimistic updates for better perceived performance

4. **Risk**: Global Product Catalog may have permission issues
   - **Impact**: High - Users may not be able to add products as expected
   - **Probability**: Medium - Permission model not yet defined
   - **Mitigation**:
     - Clearly define permission model early in Phase 2
     - Implement proper admin controls
     - Add clear UI feedback when permissions are insufficient
     - Document permission requirements in user guide

### Option-Specific Risks (Option 1)

5. **Risk**: Incremental approach may lead to code duplication across similar hardware types
   - **Impact**: Medium - Maintenance burden over time
   - **Probability**: High - Expected with incremental approach
   - **Mitigation**:
     - Extract common patterns into base components where possible
     - Use composition over inheritance
     - Document duplicated patterns for future refactoring
     - Plan for eventual abstraction if more hardware types are added

6. **Risk**: Access Control as a new tab may fragment user experience
   - **Impact**: Low - Users may not find the feature
   - **Probability**: Low - Clear navigation should mitigate
   - **Mitigation**:
     - Add prominent visual cues when keycard-related features are needed
     - Include Access Control in project setup wizard
     - Add contextual links from Keypad and Corridor Panel configurations
     - Provide onboarding tooltips

## Testing Strategy

### Unit Testing

- **Tools**: Vitest (already configured in the project)
- **Coverage Target**: 70% for new components
- **Focus Areas**:
  - Product search fuzzy matching logic
  - DALI protocol generation
  - Keypad type discrimination (corridor vs standard)
  - Logic board channel configuration
  - Keycard scene selection validation

### Integration Testing

- **Approach**: Test component interactions with API layer
- **Test Cases**:
  - Product search → product creation → add to entity flow
  - Corridor panel creation → LED mapping → Bell mapping flow
  - Logic board creation → channel configuration → save flow
  - Keycard setup → dry contact assignment → save flow
  - DALI load creation → DT6/DT8 config → protocol preview flow
  - Occupancy status updates → Keypad condition trigger flow

### End-to-End Testing

- **Tools**: Playwright (recommended for SvelteKit)
- **User Journeys**:
  1. **Complete Project Setup with New Hardware**:
     - Create unit
     - Add notes
     - Configure corridor panel
     - Setup logic board
     - Configure DALI loads
     - Setup keycard
     - Verify occupancy coordination
  2. **Global Product Catalog Workflow**:
     - Browse global catalog
     - Add products to project
     - Create new product and add to global catalog
     - Search and reuse products
  3. **Access Control Configuration**:
     - Navigate to Access Control tab
     - Configure keycard
     - Link to scenes
     - Verify keypad conditions use keycard_inserted

### Performance Testing

- **Product Search**: Measure query response time with 1000+ products
- **DALI Config**: Measure protocol generation time
- **Occupancy Updates**: Test with 100+ devices to ensure no UI lag
- **Criteria**:
  - Product search < 500ms
  - DALI protocol generation < 200ms
  - Occupancy status update < 100ms

## Success Criteria

- [ ] All 7 feature areas from new_features_2026.md implemented and functional
- [ ] Product search with fuzzy matching working for global and project products
- [ ] Corridor Panel LED and Bell mapping configurable and persisting
- [ ] Logic Board channel modes switchable with visual connections
- [ ] Keycard setup complete with scene assignments
- [ ] DALI configuration for both DT6 and DT8 types working
- [ ] Protocol preview accurately displaying 12-byte commands
- [ ] Occupancy status visualizing across all devices in real-time
- [ ] Keycard_inserted condition available in Keypad programming
- [ ] Unit Notes editable and auto-saving
- [ ] All new hardware types integrated into project workflow
- [ ] Unit/Project progress tracking includes new features
- [ ] Zero breaking changes to existing functionality
- [ ] TypeScript compilation with no errors
- [ ] 70%+ code coverage on new components
- [ ] Performance benchmarks met (search < 500ms, protocol < 200ms)
- [ ] Cross-browser testing passed (Chrome, Firefox, Safari, Edge)
- [ ] User documentation complete
- [ ] Production deployment successful

## Handoff Notes for Build Agent

### Critical Dependencies

1. **API Readiness**: The backend API must support all new endpoints before frontend development can complete Phase 2. Coordinate with backend team on endpoint specifications.

2. **DALI Protocol Specification**: The exact byte structure for DALI protocol commands must be documented by hardware team. Implementing the protocol preview requires this specification.

3. **Permission Model**: Global Product Catalog requires clear permission rules (who can add to global catalog). Define this before Phase 2.

### Implementation Order

Follow the phase order strictly. Each phase builds on the previous ones. Do not attempt to skip ahead.

### Component Reuse

When creating new components, check existing patterns first:

- Forms: Reference `LoadForm.svelte` or `ZoneForm.svelte`
- Cards: Reference `KeypadCard.svelte` or `LoadCard.svelte`
- Lists: Reference `KeypadList.svelte` or `LoadList.svelte`
- Modals: Reference `KeypadKeyInfoModal.svelte`

### Event System

Always dispatch the appropriate reload event after successful mutations:

```typescript
window.dispatchEvent(new Event(RELOAD_TARGETS.CORRIDOR_PANELS));
window.dispatchEvent(new Event(RELOAD_TARGETS.KEYCARDS));
// etc.
```

### Styling Guidelines

- Use Tailwind CSS v4 utilities
- Follow shadcn-svelte component patterns
- Use `cn()` utility for conditional classes (from `src/lib/utils.ts`)
- Maintain consistent spacing, colors, and typography with existing UI

### Type Safety

- Never use `any` type
- Always define Response and Request types
- Use type assertions only when receiving API responses
- Add comments explaining complex type relationships

### Performance Considerations

- Debounce all search inputs (use existing pattern from search components)
- Use `$derived` for computed values
- Avoid nested `$state` objects where possible
- Lazy load modals (use `{#key modalKey}` pattern)

### Accessibility

- All forms must have proper labels
- Color pickers must have keyboard alternatives
- Modal focus management (use existing Modal component)
- ARIA labels for custom UI elements

### Testing

- Write tests alongside implementation, not after
- Test edge cases (empty states, invalid inputs, boundary values)
- Mock API responses in tests

### Deployment

- Deploy phases incrementally to staging environment
- Get QA sign-off before moving to next phase
- Monitor for errors in production after each deployment

### Contact Points

- **Backend Team**: API endpoint specifications and data models
- **Hardware Team**: DALI protocol specification and hardware constraints
- **UX Team**: Visual design for new hardware configuration screens
- **QA Team**: Testing requirements and acceptance criteria
