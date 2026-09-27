import { compareVersions } from 'compare-versions'
import { BrowserWindow, dialog, shell } from 'electron'
import { action, computed, makeObservable, observable } from 'mobx'
import { MessageType } from '../../../test/TestIpcMessage'
import { AppState } from '../../AppState'
import { StoreKeys } from './Store/StoreKeys'
import { updates as str } from './Strings'
import { autoUpdatingAvailable } from './Types/Constants'
import { handleTestMessage } from './Utils/Testing'
import { isTesting } from './Utils/Utils'

export class UpdateState {
  latestVersion: string | null = null
  enableAutoUpdate: boolean
  checkingForUpdate = false
  autoUpdateDownloaded = false
  lastCheck: Date | null = null

  constructor(private appState: AppState) {
    this.enableAutoUpdate = autoUpdatingAvailable && appState.store.get(StoreKeys.EnableAutoUpdate)
    makeObservable(this, {
      latestVersion: observable,
      enableAutoUpdate: observable,
      checkingForUpdate: observable,
      autoUpdateDownloaded: observable,
      lastCheck: observable,

      updateNeeded: computed,

      toggleAutoUpdate: action,
      setCheckingForUpdate: action,
      autoUpdateHasBeenDownloaded: action,
      checkedForUpdate: action,
    })

    if (isTesting()) {
      handleTestMessage(MessageType.UpdateState, () => ({
        lastCheck: this.lastCheck,
      }))
    }
  }

  get updateNeeded(): boolean {
    if (this.latestVersion) {
      return compareVersions(this.latestVersion, this.appState.version) === 1
    } else {
      return false
    }
  }

  toggleAutoUpdate(): void {
    this.enableAutoUpdate = !this.enableAutoUpdate
    this.appState.store.set(StoreKeys.EnableAutoUpdate, this.enableAutoUpdate)
  }

  setCheckingForUpdate(checking: boolean): void {
    this.checkingForUpdate = checking
  }

  autoUpdateHasBeenDownloaded(version: string | null): void {
    this.autoUpdateDownloaded = true
    this.latestVersion = version
  }

  checkedForUpdate(latestVersion: string | null): void {
    this.lastCheck = new Date()
    this.latestVersion = latestVersion
  }
}

export function setupUpdates(_window: BrowserWindow, _appState: AppState): void {
  return
}

export function openChangelog(state: UpdateState): void {
  const url = 'https://github.com/standardnotes/app/releases'
  const latestVersion = state.latestVersion
  if (latestVersion) {
    const tagPath = `tag/%40standardnotes%2Fdesktop%40${latestVersion}`
    void shell.openExternal(`${url}/${tagPath}`)
  } else {
    void shell.openExternal(url)
  }
}

export async function showUpdateInstallationDialog(parentWindow: BrowserWindow, appState: AppState): Promise<void> {
  if (!appState.updates.latestVersion) {
    return
  }

  await dialog.showMessageBox(parentWindow, {
    type: 'info',
    title: str().updateReady.title,
    message: str().updateReady.message(appState.updates.latestVersion),
    buttons: [str().updateReady.installLater, str().updateReady.quitAndInstall],
    cancelId: 0,
  })
}

export async function checkForUpdate(_appState: AppState, _state: UpdateState, _userTriggered = false): Promise<void> {
  return
}
