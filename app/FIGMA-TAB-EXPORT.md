# Tab icon export from Figma (avoid pixelation)

Tab icons look pixelated when the PNG is too small for the device pixel ratio. Use **density-specific exports** so each device gets a sharp image.

## Target size

- **Logical size in app:** 24×24 pt.
- **Export at 3 scales:** 1x, 2x, 3x.

## In Figma

1. Set the **frame** for the tab icon to **24×24** (or 24×24 for square; Account can be 24×34 if you keep aspect).
2. Export **PNG** at three scales (use "Export" panel):
   - **1x** → save as `account-tab.png` (24×24 px)
   - **2x** → save as `account-tab@2x.png` (48×48 px)
   - **3x** → save as `account-tab@3x.png` (72×72 px)

Same for the Boards tab icon: `board-tab.png`, `board-tab@2x.png`, `board-tab@3x.png`.

## File names (React Native)

Put all 6 files in `app/assets/icons/`:

- `board-tab.png` (24×24), `board-tab@2x.png` (48×48), `board-tab@3x.png` (72×72)
- `account-tab.png` (24×24 or 24×34), `account-tab@2x.png` (48×48 or 48×68), `account-tab@3x.png` (72×72 or 72×102)

Use the **base name** in code: `require('../../assets/icons/account-tab.png')`. React Native will pick the right file for the device.

## Why 4x looked bad

Exporting a single **4x** file (e.g. 96×96) means:

- On 1x devices the image is scaled **down** (can look soft).
- On 2x/3x the bundler might still serve that one file and the system scales it, or the logical size is wrong and the icon clips or pixelates.

Exporting **1x, 2x, 3x** separately gives the right pixel size per density and keeps the icon sharp.
