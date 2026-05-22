import { sdk } from '../sdk'
import { configureProvider } from './configureProvider'
import { loginToOs } from './loginToOs'

export const actions = sdk.Actions.of()
  .addAction(configureProvider)
  .addAction(loginToOs)
