import { LangDict } from './default'

// No non-default translations yet. Add locales here as `<lang>: { <id>: '...' }`.
// With this empty, i18n() returns the English key string for every locale.
export default {} satisfies Record<string, LangDict>
