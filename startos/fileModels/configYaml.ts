import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

/**
 * Hermes' own config file: <data>/config.yaml.
 *
 * Hermes (and its dashboard) is the source of truth — the user edits most of
 * this through the dashboard. We only touch a few keys (skills wiring, provider
 * routing, and — in the future — mcp_servers). Every level we model is a
 * `looseObject` so keys we don't model survive a merge() instead of being
 * stripped by the schema parse, preserving 2-way binding with the dashboard.
 *
 * TODO(build): pin the provider/model routing shape against the upstream
 * config schema once confirmed (see hermes-agent.nousresearch.com/docs/.../configuration).
 */
const shape = z.looseObject({
  skills: z
    .looseObject({
      external_dirs: z.array(z.string()).catch([]),
    })
    .optional(),
  plugins: z
    .looseObject({
      enabled: z.array(z.string()).catch([]),
      disabled: z.array(z.string()).catch([]),
    })
    .optional(),
  // Remote MCP servers. Empty until the StartOS MCP server ships; then the
  // Grant Access action writes an entry here pointing at https://<osIp>/mcp/v1.
  mcp_servers: z.looseObject({}).optional(),
})

export const configYaml = FileHelper.yaml(
  { base: sdk.volumes.main, subpath: 'config.yaml' },
  shape,
)
