# Workout Timer Plan

## Overview
This is a React Native application designed for iOS to facilitate HIIT (High Intensity Interval Training) workouts. The app will function as a precision timer that alternates between periods of high-intensity activity and low-intensity rest.

## Tech Stack & Build Tools
- **Framework:** React Native (via Expo)
  - For React Native, **Metro** is the standard bundler. We will use **Expo** to simplify the iOS build process, access native APIs (Haptics, Audio), and manage the development workflow.
- **Language:** TypeScript (Recommended for robustness) or JavaScript.
- **State Management:** React Context or simple local state for MVP.

## Application Requirements (MVP)

### 1. Configuration (Home Screen)
The user must be able to configure the workout before starting.
- **Sets:** Number of high-intensity intervals (e.g., 8 rounds).
- **Work Interval:** Duration of high-intensity effort (Default: 45s).
- **Rest Interval:** Duration of low-intensity recovery (Default: 15s).
- **Warm-up:** (New) Duration of preparation time before the first set.
- **Cool-down:** (New) Duration of recovery time after the last set.

### 2. Active Workout (Timer Screen)
- **Start Button:** Initiates the workout sequence.
- **Timer Display:** Large, readable countdown.
- **Interval Indicator:** Visual cue showing if the user should be "Working" or "Resting".
- **Controls:**
    - **Tap Anywhere to Pause:** Tapping anywhere on the screen toggles Play/Pause.
    - **Reset/Exit:** Button to cancel the workout and return to configuration.

### 3. Audio & Feedback (Crucial for HIIT)
- **Sound Effects:** Distinct beeps for:
    - 3-2-1 Countdown.
    - Phase change (Work -> Rest, Rest -> Work).
    - Workout Complete.
- **Audio Ducking:** Lower background music volume when timer sounds play.
- **Haptic Feedback:** Vibration on phase changes (useful if sound is off).
- **Background Execution:** Timer must continue accurately even if the screen is locked or the user switches apps.

## Styling and Design Plan

### Visual Language
- **Theme:** Dark Mode by default (Saves battery, better for gym environments).
- **Typography:**
    - **Timer:** Large **Monospaced** font (e.g., `Courier`, `Roboto Mono`, or iOS system monospaced variant). This prevents the text from "jittering" as numbers change width (especially '1').
    - **Labels:** Clean sans-serif for "WORK", "REST", "SETS LEFT".

### Color Coding (State Awareness)
The entire background or a significant UI element should change color to indicate the current state so it's visible from a distance.
- **High Intensity (Work):** Bright Green (e.g., `#32CD32`) or High-Energy Orange.
- **Low Intensity (Rest):** Muted Blue or Red (e.g., `#FF4500`).
- **Warm-up / Cool-down:** Yellow or Purple.
- **Paused:** Dimmed / Greyed out overlay.

### Layout
- **Center Stage:** The countdown timer is the hero element.
- **Progress:**
    - **Circular Progress Ring:** Visual representation of time left in the current interval.
    - **Set Counter:** "Set 3 of 8" clearly visible.

## State Management
The application needs to track the current workout state:
- `status`: `idle` | `running` | `paused` | `completed`
- `phase`: `warmup` | `work` | `rest` | `cooldown`
- `currentSet`: Integer (1 to Total Sets)
- `timeRemaining`: Integer (Seconds)

## Development Roadmap
1.  **Setup:** Initialize Expo project.
2.  **Core Logic:** Build the timer hook (handling background time drift).
3.  **UI Skeleton:** Build the Configuration and Timer screens.
4.  **Feedback:** Integrate `expo-av` for sound and `expo-haptics`.
5.  **Polish:** Apply styling, color transitions, and animations.


