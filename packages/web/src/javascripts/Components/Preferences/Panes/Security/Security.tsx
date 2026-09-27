import { NativeFeatureIdentifier, FeatureStatus } from '@standardnotes/snjs'
import { FunctionComponent } from 'react'

import { WebApplication } from '@/Application/WebApplication'
import Encryption from './Encryption'
import PasscodeLock from './PasscodeLock'
import Privacy from './Privacy'
import Protections from './Protections'
import ErroredItems from './ErroredItems'
import PreferencesPane from '@/Components/Preferences/PreferencesComponents/PreferencesPane'
import BiometricsLock from '@/Components/Preferences/Panes/Security/BiometricsLock'
import MultitaskingPrivacy from '@/Components/Preferences/Panes/Security/MultitaskingPrivacy'
import U2FView from './U2F/U2FView/U2FView'

interface SecurityProps {
  application: WebApplication
}

const Security: FunctionComponent<SecurityProps> = (props) => {
  const isNativeMobileWeb = props.application.isNativeMobileWeb()

  const isU2FFeatureAvailable =
    props.application.features.getFeatureStatus(
      NativeFeatureIdentifier.create(NativeFeatureIdentifier.TYPES.UniversalSecondFactor).getValue(),
    ) === FeatureStatus.Entitled && props.application.sessions.getUser() !== undefined

  return (
    <PreferencesPane>
      <Encryption />
      {props.application.items.invalidNonVaultedItems.length > 0 && <ErroredItems />}
      <Protections application={props.application} />
      {isU2FFeatureAvailable && (
        <U2FView application={props.application} is2FAEnabled={false} loadAuthenticatorsCallback={() => {}} />
      )}
      {isNativeMobileWeb && <MultitaskingPrivacy application={props.application} />}
      <PasscodeLock application={props.application} />
      {isNativeMobileWeb && <BiometricsLock application={props.application} />}
      {props.application.sessions.getUser() && <Privacy application={props.application} />}
    </PreferencesPane>
  )
}

export default Security
