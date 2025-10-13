---
description: Highlight

next:
  text: History
  link: /extensions/History/index.md
---

# Highlight

The Highlight extension allows you to highlight text in your editor.

- Based on TipTap's highlight extension. [@tiptap/extension-highlight](https://tiptap.dev/docs/editor/extensions/marks/highlight)

## Usage

```tsx
import { Highlight } from 'reactjs-tiptap-editor/highlight'; // [!code ++]

const extensions = [
  ...,
  // Import Extensions Here
  Highlight // [!code ++]
];
```

## Options

### shortcutKeys

Type: `string[]`\
Default: `['⇧', 'mod', 'H']`

Keyboard shortcuts for the extension.

### defaultColor

Type: `string`\
Default: `none`

The initial color used in the action button. If not provided, no color is selected.
