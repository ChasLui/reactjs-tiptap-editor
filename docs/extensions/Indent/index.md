---
description: Indent

next:
  text: Italic
  link: /extensions/Italic/index.md
---

# Indent

- Handles indenting text in the editor.

## Usage

```tsx
import { Indent } from 'reactjs-tiptap-editor/indent'; // [!code ++]

const extensions = [
  ...,
  // Import Extensions Here
  Indent // [!code ++]
];
```

## Options

### shortcutKeys

Type: `string[][]`\
Default: `[['Tab'], ['Shift', 'Tab']]`

Keyboard shortcuts for the extension.
