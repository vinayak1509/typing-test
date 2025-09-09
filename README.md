# Typing App

Minimal, responsive typing trainer built with plain HTML, CSS and JavaScript.

## Files
- [index.html](index.html) — main UI and markup.  
- [styles.css](styles.css) — styles and layout.  
- [app.js](app.js) — core logic and event handling.

## Quick start
1. Open [index.html](index.html) in a browser to run locally (no build required).
2. Or serve the folder and visit `http://localhost:8000`:
   - Python 3: `python -m http.server`  
3. Click "Start", choose a passage or paste custom text, then type.

## Key code points
- Default timer: [`START_TIME`](app.js)  
- Core controls: [`start()`](app.js) and [`reset()`](app.js)  
- Passages array: [`passages`](app.js)  
- Highlighting & UI update: [`highlightPosition()`](app.js) and other helpers in [app.js](app.js)

## Notes
- Mode select (`time` vs `words`) UI exists in [index.html](index.html) but the `words` mode behavior is not fully implemented yet — see [`mode`](app.js) handling.
- Designed to be a simple, easy-to-extend demo — feel free to add persistent storage, multiple difficulty levels, or improved metrics.
