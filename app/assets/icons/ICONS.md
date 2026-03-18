# Icons to create (Trello/Monday-style app)

Use the same neubrutalist style as existing icons (white shape, black outline, colored 3D shadow). Export as PNG at 2x or 3x for sharpness.

## Board & layout
- **board** – Grid/columns (e.g. 2–3 columns) for “Board” or “Board view”
- **list** – Single column with lines/dots for “List” column header or sidebar
- **card** – Rectangle with corner fold or simple card shape for “Card” or empty state

## Actions
- **plus** – Already have; use for “Add card” / “Add list”
- **play** – Already have; use for “Start” or “Resume” if you add timers
- **more** / **menu** – Three dots horizontal for card/board menu (or use Feather `more-horizontal`)
- **add-column** – Plus with a column/list shape for “Add list” (optional; can keep Feather plus)

## Status & metadata
- **calendar** – For due dates on cards
- **user** / **assignee** – Person silhouette for “Assigned to”
- **label** / **tag** – Tag or label shape for card labels
- **check** / **checkbox** – Checkmark or checkbox for “Done” / complete state
- **comment** – Speech bubble for comments on cards

## Navigation / chrome
- **home** – House for “Home” tab (or use Feather)
- **bell** – Notifications
- **search** – Magnifier for search
- **settings** – Gear for settings (or use Feather)

## Optional (Monday-style)
- **pulse** – Single “pulse” or row for Monday-style pulse view
- **timeline** – Gantt-style bar or timeline
- **chart** – Simple bar or chart for dashboard

Start with **board**, **list**, **card**, **calendar**, and **label** to match the new home; use Feather for **more**, **plus**, **user** if you want to ship without new assets.

---

## Figma: sizing & export for tab bar and in-app icons

**Tab bar icon (bottom nav)**  
- **Frame size in Figma:** 24×24 or 25×25 pt (that’s the 1x size).  
- **Export:** PNG at **1x = 24×24** or 25×25 px, **2x = 48×48** or 50×50 px, **3x = 72×72** or 75×75 px.  
- **Naming for React Native:**  
  - `play-tab.png` (1x)  
  - `play-tab@2x.png` (2x)  
  - `play-tab@3x.png` (3x)  
  RN will pick the right file by device pixel ratio.  
- **In Figma:** Select the frame → Export → add PNG, set 1x, 2x, 3x (or export once at 1x and use “Scale” 200%, 300% for 2x/3x). Replace the three files in `assets/icons/`.

**In-app icon (e.g. play in a button)**  
- **Frame size:** Match where it’s used (e.g. 56×56 pt for a big button).  
- **Export:** One PNG at 1x, or 2x/3x if you want extra sharpness on high-DPI devices.

**Rule of thumb:** The **frame size in Figma = size in points** (logical pixels). Export at that size for 1x; 2× and 3× that for @2x and @3x. Tab bar icons are ~24–25 pt, so design in a 24×24 or 25×25 frame for tab icons.
