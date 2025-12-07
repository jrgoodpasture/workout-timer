    # Workout Timer

A simple, customizable interval timer for workouts, built with React Native and Expo.

## Prerequisites

- **Node.js**: Version 24+ recommended (managed via `nvm`).
- **Xcode**: Required for building the iOS app.
- **CocoaPods**: Required for iOS dependencies.

## Installation

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Network Setup (If on restricted network)**:
    If you encounter SSL or registry errors, ensure you have the `.npmrc` file configured and use the SSL bypass flag:
    ```bash
    export NODE_TLS_REJECT_UNAUTHORIZED=0
    ```

## Running in Development (Expo Go)

To run the app using the Expo Go app on your phone (requires phone and computer on the same network/hotspot):

```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0 && npx expo start
```

Scan the QR code with your iPhone Camera.

## Building for iOS (Offline / Release Mode)

To install the app directly onto your iPhone so it works **offline** (without the development server), follow these steps.

### 1. Generate the Offline Bundle
Since we are bypassing the standard Expo build servers, we must manually generate the JavaScript bundle.

Run this command in your terminal:

```bash
# Switch to correct Node version and generate bundle
source ~/.nvm/nvm.sh && nvm use 24 && \
export NODE_TLS_REJECT_UNAUTHORIZED=0 && \
npx expo export --platform ios && \
cp dist/_expo/static/js/ios/*.hbc ios/main.jsbundle
```

### 2. Configure Xcode
1.  Open the project workspace:
    ```bash
    xed ios
    ```
2.  **Add the Bundle**:
    *   In Xcode, right-click the **WorkoutTimer** folder (left sidebar).
    *   Select **"Add Files to 'WorkoutTimer'..."**.
    *   Select `ios/main.jsbundle`.
    *   **Crucial**: Ensure "Copy items if needed" is CHECKED and the "WorkoutTimer" target is selected.
3.  **Set to Release Mode**:
    *   Go to **Product** > **Scheme** > **Edit Scheme...**
    *   Select **Run** (sidebar).
    *   Change **Build Configuration** to **Release**.

### 3. Install on Device
1.  Connect your iPhone via USB.
2.  Select your device in the top toolbar.
3.  Click the **Play** button (Run).
4.  On your iPhone, go to **Settings > General > VPN & Device Management** and trust your developer certificate.

## Troubleshooting

**"No script URL provided" Error:**
This means the app cannot find the JavaScript code.
*   **Fix**: Ensure you ran the "Generate the Offline Bundle" command above AND added `main.jsbundle` to Xcode correctly.
*   **Fix**: Ensure Xcode Scheme is set to **Release**, not Debug.

**Network/SSL Errors:**
Always prepend commands with `export NODE_TLS_REJECT_UNAUTHORIZED=0` if you are on a restricted network.
