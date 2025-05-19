# ScrollSnap

![ScrollSnap Demo](./assets/demo.gif)

A lightweight, customizable JavaScript library for implementing smooth scroll-snapping functionality with native-like performance. ScrollSnap provides precise control over scrolling behavior while ensuring a consistent experience across different browsers and devices.

## Features

✅ **Performance Optimized** - Built with performance in mind, using modern browser capabilities  
✅ **Browser Compatibility** - Works across all modern browsers with graceful fallbacks  
✅ **Flexible API** - Easy to integrate with any project structure  
✅ **Zero Dependencies** - No external libraries required  
✅ **Customizable** - Extensive configuration options for different use cases  
✅ **Accessibility** - Keyboard navigation and screen reader friendly  
✅ **Responsive** - Works on all screen sizes and device types  
✅ **TypeScript Support** - Full type definitions included

## Installation

### npm / yarn

```bash
# Using npm
npm install @km-0/scroll-snap

# Using yarn
yarn add @km-0/scroll-snap
```

### CDN

```html
<script src="https://unpkg.com/@km-0/scroll-snap@latest/dist/scrollSnap.min.js"></script>
```

## Basic Usage

```javascript
import { createScrollSnap } from "@km-0/scroll-snap";

// Get the container element
const container = document.querySelector(".scroll-container");

// Initialize ScrollSnap
const scrollSnap = createScrollSnap(container, {
  snapDestination: "0% 100%",
  snapStop: "always",
  snapType: "y mandatory",
  threshold: 0.3,
});

// Enable scroll snapping
scrollSnap.enable();

// Disable when needed
// scrollSnap.disable();
```

## HTML Structure

```html
<div class="scroll-container">
  <section class="snap-section">Section 1</section>
  <section class="snap-section">Section 2</section>
  <section class="snap-section">Section 3</section>
  <section class="snap-section">Section 4</section>
</div>
```

## CSS Requirements

```css
.scroll-container {
  height: 100vh;
  overflow-y: scroll;
  /* Will be applied programmatically, but can be set manually */
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.snap-section {
  height: 100vh;
  /* Will be applied programmatically, but can be set manually */
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

## Configuration Options

ScrollSnap is highly configurable to suit your specific needs:

| Option            | Type    | Default         | Description                                                                                                                              |
| ----------------- | ------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `snapType`        | string  | `'y mandatory'` | Defines the scroll snap type: `'x mandatory'`, `'y mandatory'`, `'both mandatory'`, `'x proximity'`, `'y proximity'`, `'both proximity'` |
| `snapDestination` | string  | `'0% 100%'`     | Sets the snap destination points                                                                                                         |
| `snapStop`        | string  | `'always'`      | Controls whether scrolling always stops on a snap point (`'always'`) or can potentially skip snap points (`'normal'`)                    |
| `threshold`       | number  | `0.3`           | Scrolling threshold to trigger snapping (0.1 to 1.0)                                                                                     |
| `duration`        | number  | `300`           | Animation duration in milliseconds                                                                                                       |
| `easing`          | string  | `'ease-out'`    | Animation timing function                                                                                                                |
| `debounceTime`    | number  | `50`            | Debounce time for scroll events in milliseconds                                                                                          |
| `keyboard`        | boolean | `true`          | Enable keyboard navigation                                                                                                               |
| `wheelCapture`    | boolean | `true`          | Capture wheel events for more precise control                                                                                            |
| `disableOnMobile` | boolean | `false`         | Disable scroll snapping on mobile devices                                                                                                |
| `breakpoint`      | number  | `768`           | Breakpoint for mobile devices (when `disableOnMobile` is true)                                                                           |
| `offset`          | number  | `0`             | Offset in pixels to adjust snap positions                                                                                                |

## Advanced Usage

### Programmatic Navigation

ScrollSnap provides methods to programmatically navigate between sections:

```javascript
// Navigate to the next section
scrollSnap.next();

// Navigate to the previous section
scrollSnap.prev();

// Navigate to a specific section (zero-based index)
scrollSnap.goTo(2); // Go to the third section

// Get the current section index
const currentIndex = scrollSnap.getCurrentIndex();
```

### Events

ScrollSnap emits events that you can listen to:

```javascript
// Listen for snap events
scrollSnap.on("snapStart", (index) => {
  console.log(`Starting to snap to section ${index}`);
});

scrollSnap.on("snapEnd", (index) => {
  console.log(`Finished snapping to section ${index}`);
});

// Remove event listener
scrollSnap.off("snapEnd");
```

### Custom Animation Functions

You can provide custom animation functions for more control:

```javascript
const scrollSnap = createScrollSnap(container, {
  // ...other options

  // Custom animation function
  animationFunction: (start, end, progress) => {
    // Custom animation logic
    return start + (end - start) * easeInOutQuad(progress);
  },
});

// Example easing function
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
```

## Dynamic Content

When adding or removing sections dynamically, call the `update` method to recalculate snap positions:

```javascript
// Add a new section
const newSection = document.createElement("section");
newSection.className = "snap-section";
newSection.textContent = "New Section";
container.appendChild(newSection);

// Update ScrollSnap
scrollSnap.update();
```

## Browser Support

ScrollSnap works on all modern browsers:

- Chrome 69+
- Firefox 68+
- Safari 11+
- Edge 79+
- iOS Safari 11+
- Android Chrome 69+

For older browsers, a fallback mode is provided with basic functionality.

## Performance Considerations

- **Element Heights**: For best performance, use fixed heights for snap sections
- **Animations**: Heavy animations during scrolling may impact performance
- **Large DOM**: With many sections, consider using virtualization techniques
- **Mobile Devices**: Set `disableOnMobile: true` for performance-sensitive mobile applications

## React Integration

```jsx
import React, { useEffect, useRef } from "react";
import { createScrollSnap } from "@km-0/scroll-snap";

function SnapScrollContainer() {
  const containerRef = useRef(null);
  const scrollSnapRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Initialize ScrollSnap
      scrollSnapRef.current = createScrollSnap(containerRef.current, {
        threshold: 0.3,
        duration: 300,
      });

      scrollSnapRef.current.enable();

      // Clean up
      return () => {
        if (scrollSnapRef.current) {
          scrollSnapRef.current.disable();
        }
      };
    }
  }, []);

  return (
    <div className="scroll-container" ref={containerRef}>
      <section className="snap-section">Section 1</section>
      <section className="snap-section">Section 2</section>
      <section className="snap-section">Section 3</section>
    </div>
  );
}

export default SnapScrollContainer;
```

## Vue Integration

```vue
<template>
  <div class="scroll-container" ref="container">
    <section class="snap-section">Section 1</section>
    <section class="snap-section">Section 2</section>
    <section class="snap-section">Section 3</section>
  </div>
</template>

<script>
import { createScrollSnap } from "@km-0/scroll-snap";

export default {
  name: "SnapScrollContainer",
  data() {
    return {
      scrollSnap: null,
    };
  },
  mounted() {
    this.scrollSnap = createScrollSnap(this.$refs.container, {
      threshold: 0.3,
      duration: 300,
    });

    this.scrollSnap.enable();
  },
  beforeDestroy() {
    if (this.scrollSnap) {
      this.scrollSnap.disable();
    }
  },
};
</script>
```

## CSS-Only Alternative

For simpler use cases where JavaScript isn't required, you can use CSS-only scroll snapping:

```css
.scroll-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.snap-section {
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

However, the JavaScript version provides more control, cross-browser consistency, and additional features.

## Troubleshooting

### Common Issues

- **Snapping Not Working**: Ensure the container has `overflow: scroll` or `overflow: auto`
- **Inconsistent Behavior**: Set explicit heights on snap sections
- **Performance Issues**: Try increasing the debounce time or disabling wheel capture
- **Mobile Issues**: Check if `disableOnMobile` is set appropriately

### Debug Mode

Enable debug mode to help troubleshoot issues:

```javascript
const scrollSnap = createScrollSnap(container, {
  debug: true,
  // other options
});
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
