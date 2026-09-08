<div align="center">

# MEDLOC

### Edge AI Physiological State Monitor for Soldiers



[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=react-router)](https://reactrouter.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> **Zero cloud. Zero standing transmission.**  
> A soldier's condition and location stay private until the moment intervention is genuinely needed.

</div>

---

## Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [How MEDLOC Works](#how-medloc-works)
- [Core Features](#core-features)
- [Hardware Architecture](#hardware-architecture)
- [Applications](#applications)
- [Web App](#web-app)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

---

## Overview

MEDLOC is an **Edge AI physiological state monitor** designed for combat deployment. Unlike conventional battlefield health monitoring systems that continuously stream biometric data to a cloud backend, MEDLOC keeps all classification on-device — and only transmits the bare minimum payload when a soldier's condition genuinely deteriorates beyond their own personal baseline.

The system classifies each soldier's physiological state into one of three tiers — **NORMAL**, **STRAIN**, or **CRITICAL** — and gates every transmission decision locally, without requiring any connectivity to HQ.

---

## The Problem

Continuous biometric monitoring in contested environments creates four compounding failure modes:

| Problem | Impact |
|---|---|
| **Privacy / OPSEC** | A live stream of HR, SpO₂, and GPS is a real-time intelligence feed for any adversary who intercepts the signal |
| **Latency** | Cloud round-trips add seconds to classification — on the battlefield, that window is life-critical |
| **Bandwidth** | Streaming raw sensor data from a full squad saturates tactical radio bandwidth and degrades command comms |
| **Contested Connectivity** | Any cloud-dependent system fails completely the moment comms are jammed — MEDLOC keeps running |

---

## How MEDLOC Works

MEDLOC operates as a **three-state machine** running entirely on the soldier's vest hardware:

```
┌──────────────────────────────────────────────────────────────────┐
│                        ON-DEVICE INFERENCE                        │
│                                                                   │
│  Sensors → Feature Extraction → Learned Model + Rule Fallback     │
│                          │                                        │
│              ┌───────────┼───────────┐                           │
│              ▼           ▼           ▼                           │
│          NORMAL        STRAIN      CRITICAL                      │
│         (silent)   (local alert) (burst TX)                      │
└──────────────────────────────────────────────────────────────────┘
```

### State 1 — NORMAL 🟢
- Vitals fall within the soldier's **personalised learned baseline**
- Device classifies continuously — **transmits nothing**
- Zero RF emissions, zero location exposure

### State 2 — STRAIN 🟡
- Elevated readings detected (still within safe range for that individual)
- **Local haptic/audio alert** to the soldier and immediate squad
- **No transmission** — network stays clean, position stays hidden

### State 3 — CRITICAL 🔴
- A genuine deviation from the personal baseline confirmed by both the learned model and the rule-based fallback
- A single **minimal burst packet** is transmitted: **5 fields only**
  - Severity classification
  - Heart Rate (BPM)
  - SpO₂ (%)
  - Model confidence score
  - Last-known GPS fix (queried **only at this moment**)
- Raw sensor streams are **never** transmitted

> **Key principle:** MEDLOC doesn't diagnose injuries — it learns each soldier's own normal. A 130 BPM reading means something very different for the same soldier mid-sprint vs. post-impact.

---

## Core Features

### 🔬 On-Device Inference
All physiological state classification runs locally via **TensorFlow Lite Micro** on the vest's embedded MCU. The classification loop has zero dependency on network availability — it produces a decision whether or not the device can see HQ.

### 📏 Personalised Baseline Learning
During a short calibration window, the model learns each individual's resting and active physiological norms. This dramatically reduces false positives (a fit soldier's elevated HR during a run doesn't trigger an alert) and ensures every CRITICAL transmission is genuinely actionable.

### 📦 Burst-Only Transmission
The system is designed around the principle that **the network is a liability, not an asset**. The only data ever placed on the air is the 5-field CRITICAL packet — and only when the on-device decision has already been made.

### 📍 GPS Queried on Escalation Only
The GPS module is **powered off** during NORMAL and STRAIN states. It receives power and acquires a fix at the exact moment of CRITICAL escalation — that single coordinate is included in the burst packet. The device's location is never continuously broadcast.

### 🦺 Distributed Vest-Integrated Sensor Nodes
Sensor nodes at **head, chest, and waist** form a BLE mesh on the soldier's body. The redundant placement means a single damaged sensor doesn't break the system. The hub aggregates readings from all nodes locally.

### 📐 Explainable Rule-Based Fallback
A deterministic, threshold-based classifier runs **alongside** the learned model at all times. If the ML model's output is below a confidence threshold, the rule-based system takes over — ensuring the system always produces a decision, even in edge cases the model wasn't trained on.

### 🔒 Transmission Queuing on Comms Loss
If a CRITICAL state is confirmed but the radio link is unavailable (jammed, terrain-blocked), the burst packet is **queued on-device**. The moment connectivity is restored, the packet is sent immediately — with a precise record of when the event actually occurred. The on-device decision is never lost.

### 🌙 Dark Mode
The command-center web dashboard supports full dark mode, persisted to `localStorage`.

---

## Hardware Architecture

```
┌─────────────────────────────────────────────────────┐
│                  SOLDIER VEST                        │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │
│  │  HEAD NODE  │  │ CHEST NODE  │  │ WAIST NODE │  │
│  │ MAX30102    │  │ MAX30102    │  │ MPU6050    │  │
│  │ (HR/SpO₂)  │  │ MLX90614   │  │ (IMU/Fall) │  │
│  └──────┬──────┘  └──────┬──────┘  └─────┬──────┘  │
│         └────────── BLE Mesh ─────────────┘         │
│                          │                          │
│              ┌───────────▼────────────┐             │
│              │    HUB (nRF52840 /     │             │
│              │    ESP32 + RPi Pico)   │             │
│              │  • TFLite Inference    │             │
│              │  • Baseline Model      │             │
│              │  • Rule-Based Fallback │             │
│              │  • Packet Encryption   │             │
│              └───────────┬────────────┘             │
│                          │ AES-128                  │
│                   u-blox GPS ← (on escalation only) │
└──────────────────────────┼──────────────────────────┘
                           │ LoRa / 433 MHz RF
                           │ (CRITICAL burst only)
                    ┌──────▼──────┐
                    │  HQ RELAY   │
                    │  Command    │
                    │  Dashboard  │
                    └─────────────┘
```

### Component List

| Category | Part |
|---|---|
| Hub MCU | Raspberry Pi Pico / nRF52840 / ESP32 |
| HR & SpO₂ | MAX30102 |
| Temperature | MLX90614 (non-contact IR) |
| IMU / Activity | MPU6050 (accel + gyro) |
| ML Runtime | TensorFlow Lite Micro |
| Radio | LoRa module / 433 MHz RF |
| GPS | u-blox NEO-M8N (duty-cycled) |
| Security | AES-128 packet-level encryption |
| Power | LiPo + solar harvesting backup |

---

## Applications

### 🪖 Primary — Infantry Combat Monitoring
Real-time physiological triage for dismounted infantry squads. The medic / platoon commander receives a CRITICAL alert only when it counts — with enough information (HR, SpO₂, location) to prioritise response without exposing the squad's position at all other times.

### 🏔️ Special Operations
In denied-communications environments where continuous radio silence is mandatory, MEDLOC's burst-on-escalation model is the only viable monitoring architecture. The system operates autonomously for the entire mission duration and only breaks radio silence for a genuine emergency.

### 🚁 MEDEVAC Pre-Positioning
Because the CRITICAL packet includes GPS coordinates, forward medical teams can begin mobilising the moment the packet is received — without waiting for a voice call or secondary confirmation.

### 🧠 Post-Mission Analytics
The on-device logs (never transmitted during the mission) can be offloaded for medical review after the operation — providing a full physiological record for injury assessment, fitness evaluation, and model improvement.

### 🚒 Emergency First Responders
The same architecture applies to firefighters (temperature + HR in high-exertion environments), search-and-rescue teams operating in comms-degraded terrain, and disaster response personnel.

### 🏋️ Elite Athlete Monitoring
The personalised-baseline approach is directly applicable to high-performance sports science — detecting overtraining, heat stress, and cardiovascular anomalies specific to each athlete's profile, without continuous data egress to a cloud platform.

---

## Web App

This repository contains the **command-center web dashboard** — a scripted simulation of what HQ sees when a MEDLOC device escalates. It is a full Vite + React SPA with two routes:

| Route | Description |
|---|---|
| `/` | Landing page — overview, problem, solution, features |
| `/command-center` | Standalone Command & Control dashboard |

The Command Center implements a **7-state interactive simulation** driven by React `useState`:

```
OFFLINE → INITIALIZING → MONITORING → [JAMMED] → INCOMING → DISPATCH → ENROUTE
```

- State machine transitions on user interaction and `setTimeout` timers
- COMMS JAMMED / AVAILABLE toggle simulates contested connectivity
- Full scrollable event log with real `HH:MM:SS` timestamps
- Dispatch confirmation modal
- Reset returns the full system to State 0

> **Note:** This dashboard is a simulation of the receiving end only. The physiological state classification itself runs on the physical/simulated device — see the linked Wokwi project for the embedded side.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/code-silver01/Medloc.git
cd Medloc

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173/**

### Build for Production

```bash
npm run build
# Output in ./dist/
```

---

## Project Structure

```
Medloc/
├── index.html                      # HTML entry point + Google Fonts
├── vite.config.js                  # Vite configuration
├── package.json
└── src/
    ├── main.jsx                    # App entry — BrowserRouter
    ├── App.jsx                     # Route definitions + dark mode state
    ├── index.css                   # Global CSS + CSS custom-property theming
    ├── pages/
    │   ├── LandingPage.jsx         # / route
    │   └── CommandCenterPage.jsx   # /command-center route
    └── components/
        ├── Navbar.jsx              # Fixed nav + dark mode toggle
        ├── Hero.jsx                # Hero section + mini status panel
        ├── Problem.jsx             # 4-card problem statement
        ├── Solution.jsx            # 3-state visual + callout
        ├── Features.jsx            # Feature grid + tech stack strip
        ├── Footer.jsx              # Team credits + Wokwi link
        └── CommandCenter.jsx       # Full 7-state command center
```

---

## Tech Stack (Web)

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 6 |
| Routing | React Router v7 |
| Styling | Vanilla CSS (custom properties, no Tailwind) |
| Fonts | Playfair Display + Inter (Google Fonts) |
| State | React `useState` / `useEffect` / `useRef` |
| Theme | `[data-theme="dark"]` attribute + CSS variables, `localStorage` |

---

## Team

**Wire We Here**

| Name | Role |
|---|---|
| Omi Agarwal | Hardware & Embedded Systems |
| Jiya Agarwal | ML Model & Baseline Algorithm |
| Ishi Jain | Sensor Integration & Firmware |
| Aditya Goel | Web Dashboard & System Architecture |

---

<div align="center">

*MEDLOC — Built for the edge. Designed for silence.*

</div>
