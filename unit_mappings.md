# EXPORT MAPPINGS \u2013 Domain Architecture Overview

## Unit Information

* **Project:** EXPORT MAPPINGS
* **Unit Name:** MAP UNIT 1
* **Unit ID:** 29

This document describes the logical and physical structure of the lighting automation project, focusing on **layout hierarchy**, **load-to-channel mapping**, and **scene behavior**.

---

## 1. Spatial Structure (Layout Domain)

### Zone

* **Ground Floor** (Zone ID: 52)

### Room

* **Living Room** (Room ID: 101)

All loads, inputs, scenes, and hardware mappings in this project are scoped to this single room.

---

## 2. Loads (Controlled Endpoints)

The Living Room contains **10 electrical loads**, grouped by control type.

### Relay Loads (On / Off)

| Load Name       | Load ID | Wattage |
| --------------- | ------: | ------: |
| MAIN LIGHTS     |     246 |    45 W |
| READING LIGHT   |     248 |    10 W |
| HALL LIGHTS     |     250 |    10 W |
| CORRIDOR LIGHTS |     252 |    10 W |
| CORNER LIGHTS   |     254 |    30 W |

### Phase-Cut Dimmers

| Load Name       | Load ID | Wattage |
| --------------- | ------: | ------: |
| HALL DIMMER     |     247 |    50 W |
| READING DIMMER  |     249 |    10 W |
| CORRIDOR DIMMER |     253 |    15 W |

### 1\u201310V Dimmers

| Load Name     | Load ID | Wattage |
| ------------- | ------: | ------: |
| MAIN DIMMER   |     251 |    75 W |
| CORNER DIMMER |     255 |     0 W |

Each load represents a **single controllable endpoint** in the domain graph.

---

## 3. Input Devices (Keypads)

* **6 keypads** (addresses 1\u20136)
* **11 total keys**
* All inputs are of type `keypad`
* All keypads are connected on **CAT6 branch 1**

Keypads do not directly control loads. Instead, they **trigger scenes**, which then apply values to loads.

---

## 4. Hardware Execution Layer

### Main RCU

* **RCU Name:** MAIN RCU
* **RCU ID:** 28
* **Total Channels:** 16

#### Direct RCU Relay Channels

| RCU Channel | Load Name       | Load ID |
| ----------- | --------------- | ------: |
| 1           | MAIN LIGHTS     |     246 |
| 2           | READING LIGHT   |     248 |
| 3           | HALL LIGHTS     |     250 |
| 4           | CORRIDOR LIGHTS |     252 |
| 5           | CORNER LIGHTS   |     254 |

#### DIN Modules

##### Phase-Cut DIN Module

| Module Channel | Load Name       | Load ID |
| -------------- | --------------- | ------: |
| 1              | HALL DIMMER     |     247 |
| 2              | READING DIMMER  |     249 |
| 3              | CORRIDOR DIMMER |     253 |

##### 1\u201310V DIN Module

| Module Channel | Load Name     | Load ID |
| -------------- | ------------- | ------: |
| 1              | MAIN DIMMER   |     251 |
| 2              | CORNER DIMMER |     255 |

This layer defines **how logical load values are physically executed**.

---

## 5. Scenes (Behavior Layer)

All scenes:

* Are **room-scoped** (Living Room)
* Have **priority = 1**
* Use a **2000 ms fade time**
* Control brightness/value only (no color, CT, or RGB)

### 5.1 Master Scene

#### \u201cKey 1\u201d \u2013 All ON

* Turns **all 10 loads ON (100%)**
* Acts as a **global activation scene** for the room

---

### 5.2 Individual Load Scenes

Each major load typically has:

* One **ON scene (100%)**
* One **OFF scene (0%)**

Examples:

* MAIN LIGHTS \u2192 ON / OFF scenes
* HALL DIMMER \u2192 ON / OFF scenes
* READING DIMMER \u2192 ON / OFF scenes
* CORNER LIGHTS \u2192 ON / OFF scenes
* CORNER DIMMER \u2192 ON / OFF scenes

These scenes allow **fine-grained control** via keypads or automation logic.

---

### 5.3 Functional / Dedicated Scenes

Some scenes target a **single functional intent**, such as:

* CORRIDOR LIGHT 1
* CORRIDOR DIMMER 1
* MAIN DIMMER
* READING LIGHT
* READING DIMMER

These scenes adjust only one load and are typically bound to **specific keypad keys**.

---
