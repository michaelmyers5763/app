import { Title } from '@/Components/Preferences/PreferencesComponents/Content'
import { WebApplication } from '@/Application/WebApplication'
import { observer } from 'mobx-react-lite'
import { FunctionComponent } from 'react'
import { AccountIllustration } from '@standardnotes/icons'
import PreferencesGroup from '../../PreferencesComponents/PreferencesGroup'
import PreferencesSegment from '../../PreferencesComponents/PreferencesSegment'
import { c } from 'ttag'

type Props = {
  application: WebApplication
}

const Authentication: FunctionComponent<Props> = ({ application: _application }) => {
  return (
    <PreferencesGroup>
      <PreferencesSegment>
        <div className="flex flex-col items-center px-4 md:px-12">
          <AccountIllustration className="mb-3" />
          <Title>{c('B6.Preferences.Account.Title').t`You're not signed in`}</Title>
          <div className="mb-3 text-center text-base lg:text-sm">
            {c('B6.Preferences.Account.Info').t`Offline mode enabled.`}
          </div>
        </div>
      </PreferencesSegment>
    </PreferencesGroup>
  )
}

export default observer(Authentication)
