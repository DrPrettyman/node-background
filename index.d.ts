import { ComponentType } from 'react';

declare const NodeBackground: ComponentType<{
  nodeCount?: number;
  connectionDistance?: number;
  nodeSpeed?: number;
  backgroundColor?: string;
  backgroundColorDark?: string;
  className?: string;
}>;

export default NodeBackground;