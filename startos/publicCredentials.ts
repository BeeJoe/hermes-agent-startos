import * as fs from 'node:fs/promises'
import { T, z } from '@start9labs/start-sdk'
import { sdk } from './sdk'

const credentialsSchema = z.object({ apiKey: z.string() })

/**
 * Read the API key a dependency publishes on its `public` volume (e.g. vLLM's
 * `credentials.json`). Mounts that volume into a transient subcontainer via
 * `Mounts.mountDependency` — reading a dependency's volume needs no volume of
 * our own. Returns null if unavailable (dependency not installed/running, file
 * missing, or no key).
 */
export async function readDependencyApiKey(
  effects: T.Effects,
  dependencyId: string,
): Promise<string | null> {
  try {
    return await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'hermes-agent' },
      sdk.Mounts.of().mountDependency({
        dependencyId,
        volumeId: 'public',
        subpath: 'credentials.json',
        mountpoint: '/credentials.json',
        type: 'file',
        readonly: true,
      }),
      `${dependencyId}-creds`,
      async (sub) => {
        const raw = await fs.readFile(sub.subpath('/credentials.json'), 'utf8')
        return credentialsSchema.parse(JSON.parse(raw)).apiKey
      },
    )
  } catch {
    return null
  }
}
