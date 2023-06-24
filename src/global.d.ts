/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Allow json import
 */

declare module '*.json' {
  const value: any;
  export default value;
}

/**
 * Allow yaml import
 */

declare module '*.yaml' {
  const value: any;
  export default value;
}
