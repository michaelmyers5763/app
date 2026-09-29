import { c } from 'ttag'
import { PreferencesMenuItem } from './PreferencesMenuItem'

export const PREFERENCES_MENU_ITEMS: PreferencesMenuItem[] = [
  { id: 'general', label: c('B6.Preferences.Other.Label').t`General`, icon: 'settings', order: 3 },
  { id: 'security', label: c('B6.Preferences.Other.Label').t`Security`, icon: 'security', order: 4 },
  { id: 'backups', label: c('B6.Preferences.Other.Action').t`Backups`, icon: 'restore', order: 5 },
  { id: 'appearance', label: c('B6.Preferences.Other.Label').t`Appearance`, icon: 'themes', order: 6 },
  { id: 'shortcuts', label: c('B6.Preferences.Other.Label').t`Shortcuts`, icon: 'keyboard', order: 8 },
  { id: 'accessibility', label: c('B6.Preferences.Other.Label').t`Accessibility`, icon: 'accessibility', order: 9 },
  { id: 'get-free-month', label: c('B6.Preferences.Other.Label').t`Get a free month`, icon: 'star', order: 10 },
]

export const READY_PREFERENCES_MENU_ITEMS: PreferencesMenuItem[] = [
  { id: 'general', label: c('B6.Preferences.Other.Label').t`General`, icon: 'settings', order: 3 },
  { id: 'security', label: c('B6.Preferences.Other.Label').t`Security`, icon: 'security', order: 4 },
  { id: 'backups', label: c('B6.Preferences.Other.Action').t`Backups`, icon: 'restore', order: 5 },
  { id: 'appearance', label: c('B6.Preferences.Other.Label').t`Appearance`, icon: 'themes', order: 6 },
]
