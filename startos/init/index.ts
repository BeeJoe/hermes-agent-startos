import { actions } from '../actions'
import { restoreInit } from '../backups'
import { setDependencies } from '../dependencies'
import { versionGraph } from '../versions'
import { setInterfaces } from '../interfaces'
import { sdk } from '../sdk'
import { initializeService } from './initializeService'
import { installTasks } from './installTasks'
import { reconcileCodexTask } from './reconcileCodexTask'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  setInterfaces,
  setDependencies,
  actions,
  installTasks,
  initializeService,
  reconcileCodexTask,
)

export const uninit = sdk.setupUninit(versionGraph)
