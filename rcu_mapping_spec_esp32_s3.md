# RCU Mapping Specification (ESP32-S3)

## Overview

This document defines the mapping format for Toyama RCU (Room Control Unit) running on **ESP32-S3** hardware. The mapping system allows keypads to control relays, DIN rail modules, DALI lighting, and LED feedback across the bus.

> **Note:** This document covers both V3 (legacy) and V4 (current) formats. For ESP32-WROOM based controllers without DALI support, see the ESP32-WROOM specification.

---

## Platform

| Property | Value |
|----------|-------|
| Hardware | ESP32-S3 |
| Format Versions | V3 (Legacy), V4 (Current) |
| LED Logic | V3: Input-driven (optimistic), V4: Acknowledgement-driven |
| DALI Support | Yes |

---

## Format Versions

### V3 (Legacy)
Input-driven LED logic where keypress simultaneously controls actuators and updates LEDs optimistically. Supported for backward compatibility.

### V4 (Current)
Acknowledgement-driven LED logic where actuator confirmation triggers LED updates, ensuring feedback reflects actual system state.

---

# V3 Legacy Format

## Structure

```json
{
  "k": 1,
  "atype": "v3",
  "x": [type, address, button, state],
  "a": "relay:state,relay:state,...",
  "l": "type,addr,btn,state;...",
  "cr": "",
  "d": "type,addr,channel,value;...",
  "cd": "",
  "dali": "master,dali_addr,mode,param;...",
  "cdali": "master,dali_addr,mode,param,timeout;..."
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `k` | number | Yes | Always `1` (legacy, ignored) |
| `atype` | string | Yes | Always `"v3"` |
| `x` | array | Yes | Input trigger |
| `a` | string | No | RCU relay actions |
| `l` | string | No | LED updates (immediate, optimistic) |
| `cr` | string | No | Reserved (empty) |
| `d` | string | No | DIN rail actions |
| `cd` | string | No | Reserved (empty) |
| `dali` | string | No | DALI immediate actions |
| `cdali` | string | No | DALI timed actions |

---

## Input Trigger (`x`)

Defines which keypad button press triggers this mapping.

```
[keypad_type, address, button, state]
```

| Index | Description | Values |
|-------|-------------|--------|
| 0 | Keypad type | Device type identifier |
| 1 | Address | Bus address of keypad |
| 2 | Button | Button number on keypad |
| 3 | State | `0` = OFF, `1` = ON |

**Example:** `[3, 16, 1, 1]` — Keypad type 3, address 16, button 1, ON

---

## RCU Relay Actions (`a`)

Comma-separated list of relay commands.

```
relay:state,relay:state,...
```

| Field | Description | Values |
|-------|-------------|--------|
| relay | Relay number | 1-26 |
| state | Target state | `0` = OFF, `1` = ON |

**Example:** `"1:1,2:0,3:1"` — Turn ON relay 1, OFF relay 2, ON relay 3

---

## LED Updates (`l`)

Semicolon-separated list of LED state changes. In V3, these fire immediately on keypress (optimistic).

```
type,addr,btn,state;type,addr,btn,state;...
```

| Field | Description |
|-------|-------------|
| type | Keypad type |
| addr | Keypad bus address |
| btn | Button/LED number |
| state | `0` = OFF, `1` = ON |

**Example:** `"3,5,1,1;3,6,1,1"` — Turn ON LED 1 on keypads at addresses 5 and 6

---

## DIN Rail Actions (`d`)

Semicolon-separated list of DIN rail commands.

```
type,addr,channel,value;type,addr,channel,value;...
```

| Field | Description |
|-------|-------------|
| type | DIN rail device type |
| addr | Bus address |
| channel | Output channel on device |
| value | Target value (0-100 for dimmers) |

**Example:** `"6,8,1,100;6,8,2,50"` — Set channel 1 to 100%, channel 2 to 50%

---

## DALI Actions (`dali`)

Semicolon-separated list of DALI commands for immediate execution.

```
master,dali_addr,mode,param;master,dali_addr,mode,param;...
```

| Field | Description |
|-------|-------------|
| master | RS485 master address (0-15) |
| dali_addr | DALI address (1-64 individual, 65+ groups) |
| mode | Command mode (1=Dimming, 2=Color Temp) |
| param | Action or value |

### DALI Address Mapping

| Address | Description |
|---------|-------------|
| 1-64 | Individual DALI short addresses |
| 65 | Group 0 |
| 66 | Group 1 |
| 67 | Group 2 |
| ... | ... |
| 80 | Group 15 |

### DALI Mode 1: Dimming

| Param | Action |
|-------|--------|
| 0 | OFF |
| 1 | ON |
| 2 | Toggle |
| 3 | Increase brightness |
| 4 | Decrease brightness |
| 10-254 | Set brightness level |

### DALI Mode 2: Color Temperature

| Param | Action |
|-------|--------|
| 3 | Warmer (decrease Kelvin) |
| 4 | Cooler (increase Kelvin) |
| 22-65 | Set Kelvin/100 (2200K-6500K) |

**Examples:**

```
"1,5,1,1"         — Master 1, address 5, turn ON
"1,5,1,0"         — Master 1, address 5, turn OFF
"1,5,1,2"         — Master 1, address 5, toggle
"1,5,1,3"         — Master 1, address 5, increase brightness
"1,5,1,4"         — Master 1, address 5, decrease brightness
"1,5,2,3"         — Master 1, address 5, warmer
"1,5,2,4"         — Master 1, address 5, cooler
"1,65,1,1"        — Master 1, Group 0, turn ON
"1,5,1,1;1,6,1,1" — Turn ON addresses 5 and 6
```

---

## DALI Timed Actions (`cdali`)

Semicolon-separated list of DALI commands with timeout (auto-revert).

```
master,dali_addr,mode,param,timeout;...
```

- `timeout`: Seconds before action reverts

**Example:** `"1,5,1,1,30"` — Turn ON address 5, auto-off after 30 seconds

---

## V3 Examples

### Simple Relay Toggle

```json
{
  "k": 1,
  "atype": "v3",
  "x": [3, 5, 1, 1],
  "a": "1:1",
  "l": "3,5,1,1",
  "cr": "",
  "d": "",
  "cd": ""
}
```

### Master Scene with Relays, DIN, and DALI

```json
{
  "k": 1,
  "atype": "v3",
  "x": [3, 16, 1, 1],
  "a": "1:1,2:0,3:1,4:1,5:1,20:1,21:1,22:1",
  "l": "3,15,1,1;3,5,5,1;3,5,2,0;3,5,3,1;3,5,4,0;3,6,1,1;3,6,2,0;3,6,3,1;3,6,4,0;3,6,5,1;3,22,1,1",
  "cr": "",
  "d": "6,8,1,100;6,8,2,100;6,8,3,100;6,8,4,100;6,9,1,100;6,9,2,100;6,9,3,100;6,9,4,100",
  "cd": "",
  "dali": "1,5,1,254;1,6,1,128",
  "cdali": ""
}
```

### DALI-Only Scene

```json
{
  "k": 1,
  "atype": "v3",
  "x": [3, 100, 1, 1],
  "a": "",
  "l": "",
  "cr": "",
  "d": "",
  "cd": "",
  "dali": "1,5,1,1;1,6,1,1;1,7,1,1"
}
```

### DALI Timed Action

```json
{
  "k": 1,
  "atype": "v3",
  "x": [3, 100, 1, 1],
  "a": "",
  "l": "",
  "cr": "",
  "d": "",
  "cd": "",
  "dali": "1,5,1,254",
  "cdali": "1,10,1,128,60"
}
```

---

# V4 Format

## Structure

```json
{
  "key_mappings": [],
  "led_ack_mappings": [],
  "dali_ack_mappings": []
}
```

---

## key_mappings

Defines what happens when a keypad button is pressed. Same fields as V3 but without `l` field (LED logic moved to ack mappings).

### Format

```json
{
  "atype": "v3",
  "x": [type, address, button, state],
  "a": "relay:state,relay:state,...",
  "d": "type,addr,channel,value;...",
  "dali": "master,dali_addr,mode,param;...",
  "cdali": "master,dali_addr,mode,param,timeout;..."
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `atype` | string | Yes | Always `"v3"` |
| `x` | array | Yes | Input trigger: `[keypad_type, address, button, state]` |
| `a` | string | No | RCU relay actions |
| `d` | string | No | DIN rail actions |
| `dali` | string | No | DALI immediate actions |
| `cdali` | string | No | DALI timed actions |

---

## led_ack_mappings

Defines LED updates triggered by RCU relay or DIN rail acknowledgements.

### Format

```json
{
  "atype": "ledackmap",
  "x": [...],
  "l": "type,addr,btn,state;..."
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `atype` | string | Yes | Always `"ledackmap"` |
| `x` | array | Yes | Actuator ACK trigger |
| `l` | string | Yes | LED updates to apply |

### ACK Trigger (`x`)

The `x` field format depends on actuator type (determined by array length):

#### RCU Relay ACK (2 elements)

```
[relay_id, state]
```

| Index | Description | Values |
|-------|-------------|--------|
| 0 | Relay ID | 1-26 |
| 1 | State | `0` = OFF, `1` = ON |

**Example:** `[5, 1]` — Triggers when relay 5 acknowledges ON state

#### DIN Rail ACK (4 elements)

```
[din_type, address, channel, state]
```

| Index | Description | Values |
|-------|-------------|--------|
| 0 | DIN device type | e.g., `82` (0x52) for relay module |
| 1 | Bus address | |
| 2 | Channel | |
| 3 | State | Device-specific |

**Example:** `[82, 3, 2, 2]` — Triggers when DIN relay module at address 3, channel 2 reaches state 2

---

## dali_ack_mappings

Defines LED updates triggered by DALI device acknowledgements.

### Format

```json
{
  "atype": "daliledackmap",
  "x": [master, dali_addr, mode, value],
  "l": "type,addr,btn,state;..."
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `atype` | string | Yes | Always `"daliledackmap"` |
| `x` | array | Yes | DALI ACK trigger |
| `l` | string | Yes | LED updates to apply |

### DALI ACK Trigger (`x`)

```
[master, dali_addr, mode, value]
```

| Index | Description | Values |
|-------|-------------|--------|
| 0 | Master | RS485 master address (0-15) |
| 1 | DALI address | 1-64 individual, 65+ groups |
| 2 | Mode | 0=Query, 1=Dimming, 2=Color Temp |
| 3 | Value | Response value to match |

**Examples:**

```
[1, 5, 1, 254]  — Master 1, address 5, dimming mode, brightness 254 (full ON)
[1, 5, 1, 0]    — Master 1, address 5, dimming mode, brightness 0 (OFF)
[1, 5, 2, 40]   — Master 1, address 5, color temp mode, 4000K
```

---

## V4 Examples

### Example 1: Relay LED Feedback

When relay 5 turns ON, light LED 1 on panel 3:

```json
{
  "atype": "ledackmap",
  "x": [5, 1],
  "l": "3,3,1,1;"
}
```

### Example 2: DIN LED Feedback

When DIN relay module (type 82/0x52) at address 3, channel 2 reaches state 2, turn OFF LED 3 on panel 4:

```json
{
  "atype": "ledackmap",
  "x": [82, 3, 2, 2],
  "l": "3,4,3,0;"
}
```

### Example 3: Multiple LED Actions

When relay 10 turns OFF, update multiple LEDs:

```json
{
  "atype": "ledackmap",
  "x": [10, 0],
  "l": "3,3,1,0;3,4,2,1;3,5,3,0;"
}
```

### Example 4: DALI LED Feedback - ON State

When DALI address 5 reports brightness 254, turn ON LED 1:

```json
{
  "atype": "daliledackmap",
  "x": [1, 5, 1, 254],
  "l": "3,100,1,1;"
}
```

### Example 5: DALI LED Feedback - OFF State

When DALI address 5 reports brightness 0, turn OFF LED 1:

```json
{
  "atype": "daliledackmap",
  "x": [1, 5, 1, 0],
  "l": "3,100,1,0;"
}
```

### Example 6: Complete Scene with All ACK Types

```json
{
  "key_mappings": [
    {
      "atype": "v3",
      "x": [3, 100, 1, 1],
      "a": "1:1",
      "d": "6,6,2,100",
      "dali": "1,5,1,254;1,6,1,128"
    }
  ],
  "led_ack_mappings": [
    {
      "atype": "ledackmap",
      "x": [1, 1],
      "l": "3,100,1,1;"
    },
    {
      "atype": "ledackmap",
      "x": [82, 6, 2, 100],
      "l": "3,100,2,1;"
    }
  ],
  "dali_ack_mappings": [
    {
      "atype": "daliledackmap",
      "x": [1, 5, 1, 254],
      "l": "3,100,3,1;"
    },
    {
      "atype": "daliledackmap",
      "x": [1, 6, 1, 128],
      "l": "3,100,4,1;"
    }
  ]
}
```

---

## Device Type Reference

| Type | Hex | Device |
|------|-----|--------|
| 2 | 0x02 | Keypad variant A |
| 3 | 0x03 | Keypad variant B |
| 6 | 0x06 | DIN rail dimmer |
| 82 | 0x52 | DIN relay module |

---

## DALI Quick Reference

### Address Mapping

| Mapping Address | DALI Address | Description |
|-----------------|--------------|-------------|
| 1-64 | 0-63 | Individual short addresses |
| 65 | 128 | Group 0 |
| 66 | 129 | Group 1 |
| ... | ... | ... |
| 80 | 143 | Group 15 |

### Mode 1: Dimming Commands

| Param | Action |
|-------|--------|
| 0 | OFF |
| 1 | ON |
| 2 | Toggle |
| 3 | Increase brightness |
| 4 | Decrease brightness |

### Mode 2: Color Temperature Commands

| Param | Action |
|-------|--------|
| 3 | Warmer |
| 4 | Cooler |

---

## Constraints

| Parameter | Limit |
|-----------|-------|
| RCU relays | 1-26 |
| DIN values | 0-100 (dimmers) |
| DALI masters | 0-15 |
| DALI addresses | 1-64 (individual), 65+ (groups) |
| LED states | `0` (OFF), `1` (ON) |

### Separators

| Character | Usage |
|-----------|-------|
| `;` | Between entries in `l`, `d`, `dali`, `cdali` |
| `:` | Between relay and state in `a` |
| `,` | Between fields within entries |

---

## Migration from V3 to V4

1. Move mappings into `key_mappings` array
2. Remove `k`, `cr`, `cd` fields
3. Remove `l` field from key_mappings
4. Create `led_ack_mappings` entries for relay/DIN ACK triggers
5. Create `dali_ack_mappings` entries for DALI ACK triggers
6. Map actuator states to their expected LED states

This ensures LED feedback is reliable and reflects actual system state.
