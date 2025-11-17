declare module 'next/dynamic' {
  import { ComponentType } from 'react';
  
  interface DynamicOptions {
    loading?: () => JSX.Element | null;
    ssr?: boolean;
  }
  
  function dynamic<P = {}>(
    loader: () => Promise<{ default: ComponentType<P> } | ComponentType<P>>,
    options?: DynamicOptions
  ): ComponentType<P>;
  
  export default dynamic;
}

declare module 'next/link' {
  import { ComponentProps } from 'react';
  import Link from 'next/link';
  export default Link;
}

declare module 'react' {
  export function useState<S>(initialState: S | (() => S)): [S, (value: S | ((prev: S) => S)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useRef<T>(initialValue: T): { current: T };
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export function useMemo<T>(factory: () => T, deps: any[]): T;
  export const Fragment: any;
  export type ReactNode = any;
  export type ComponentType<P = {}> = any;
  export type FC<P = {}> = any;
  export default any;
}

declare module 'react/jsx-runtime' {
  const jsx: any;
  const jsxs: any;
  const Fragment: any;
  export { jsx, jsxs, Fragment };
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface Element extends React.ReactElement<any, any> {}
  interface ElementClass extends React.Component<any> {}
  interface ElementAttributesProperty {
    props: {};
  }
  interface ElementChildrenAttribute {
    children: {};
  }
}

