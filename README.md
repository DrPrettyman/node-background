# Animated Network Background Component

A React component that creates an animated background for your website with floating nodes and dynamic connections. The component supports both light and dark modes (pass different background colors as props) and is fully responsive.

## Demo

### Light Mode
![Light Mode Demo](demo/demo-light.gif)

### Dark Mode
![Dark Mode Demo](demo/demo-dark.gif)

## Features

- Animated floating nodes with connecting lines
- Responsive design that adapts to window size
- Dark mode support with automatic theme detection
- Customizable parameters
- Smooth animations with canvas rendering
- Pastel color scheme with semi-transparent connections

## Installation

Add the `NodeBackground` component to your React project:

```bash
npm install animated-network-background
```

## Usage

```jsx
import { NodeBackground } from 'animated-network-background';

function App() {
  return (
    <div>
      <NodeBackground />
    </div>
  );
}
```

## Customization

The `NodeBackground` component accepts several props to customize the appearance:

- `nodeCount`: Number of nodes to display (default: 156)
- `connectionDistance`: Maximum distance between nodes (default: 250)
- `nodeSpeed`: Speed of node movement (default: 0.7)
- `backgroundColor`: Background color for light mode (default: 'rgba(251, 243, 216, 0.9)')
- `backgroundColorDark`: Background color for dark mode (default: 'rgba(42, 56, 111, 0.9)')

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.    
