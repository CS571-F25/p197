Constellations JSON schema
==========================

This file documents the expected structure for `constellations.json`.

File: `src/assets/constellations.json`

Each entry is an object with the following properties:

- `name` (string): the common name of the constellation (e.g., "Orion").
- `season` (string): the season when the constellation is most visible (e.g., "winter", "spring", "summer", "autumn").
- `stars` (array of strings): an array of prominent star names (or star IDs) that belong to the constellation.
- `origin` (string): short note about the constellation's origin or mythology.

There will be 88 constellation objects (the IAU-recognized constellations). Start by adding them as objects in the `constellations.json` array.

Example:

```
{
  "name": "Orion",
  "season": "winter",
  "stars": ["Betelgeuse", "Rigel", "Bellatrix", "Saiph"],
  "origin": "Greek mythology; representation of a hunter"
}
```

Notes:
- Keep the file as a valid JSON array (no comments in the JSON itself).
- Use consistent seasons ("winter", "spring", "summer", "autumn").
