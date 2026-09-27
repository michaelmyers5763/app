import { FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import Tools from './Tools'
import Defaults from './Defaults'
import PreferencesPane from '../../PreferencesComponents/PreferencesPane'
import Persistence from './Persistence'
import SmartViews from './SmartViews/SmartViews'
import NewNoteDefaults from './NewNoteDefaults'
import { useApplication } from '@/Components/ApplicationProvider'

const General: FunctionComponent = () => {
  const application = useApplication()

  return (
    <PreferencesPane>
      <Persistence application={application} />
      <Defaults application={application} />
      <NewNoteDefaults />
      <Tools application={application} />
      <SmartViews application={application} featuresController={application.featuresController} />
    </PreferencesPane>
  )
}

export default observer(General)
