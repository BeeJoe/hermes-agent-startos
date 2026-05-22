import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

/**
 * Hermes' <data>/.env — holds provider credentials (e.g. OPENAI_API_KEY) that
 * Hermes' resolve_runtime_provider() reads. Modeled as a flat string map over a
 * minimal dotenv parse/serialize. merge() preserves keys we don't set.
 */
const shape = z.record(z.string(), z.string())

function parseDotenv(raw: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    out[key] = value
  }
  return out
}

function serializeDotenv(data: Record<string, string>): string {
  return (
    Object.entries(data)
      .map(([k, v]) => `${k}=${/[\s#"']/.test(v) ? JSON.stringify(v) : v}`)
      .join('\n') + '\n'
  )
}

export const envFile = FileHelper.raw(
  sdk.volumes.main.subpath('.env'),
  serializeDotenv,
  parseDotenv,
  (data) => shape.parse(data),
)
