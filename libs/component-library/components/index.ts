/**
 * This file exports all components from the library for easier imports.
 * Instead of importing from specific file paths, components can be imported
 * directly from '@component-library/components'.
 *
 * Example usage:
 *
 * ```typescript
 * import {
 *   ButtonComponent,
 * } from '@component-library/components';
 * ```
 */

// components
export * from './button/button.component';
export * from './checkbox/checkbox.component';
export * from './dropdown/dropdown.component';
export * from './icon/icon.component';
export * from './input/input.component';
export * from './modal/modal.component';
export * from './navbar/navbar.component';
export * from './sidebar/sidebar.component';
export * from './table/table.component';

// models and interfaces
export * from './modal/interface/modal.interface';
export * from './table/interface/table.interface';
