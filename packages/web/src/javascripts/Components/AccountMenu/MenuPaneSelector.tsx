import { WebApplicationGroup } from '@/Application/WebApplicationGroup'
import { observer } from 'mobx-react-lite'
import { FunctionComponent } from 'react'
import { AccountMenuPane } from './AccountMenuPane'
import ConfirmPassword from './ConfirmPassword'
import GeneralAccountMenu from './GeneralAccountMenu'

type Props = {
  mainApplicationGroup: WebApplicationGroup
  menuPane: AccountMenuPane
  setMenuPane: (pane: AccountMenuPane) => void
  closeMenu: () => void
}

const MenuPaneSelector: FunctionComponent<Props> = ({ menuPane, setMenuPane, closeMenu, mainApplicationGroup }) => {
  switch (menuPane) {
    case AccountMenuPane.GeneralMenu:
      return (
        <GeneralAccountMenu
          mainApplicationGroup={mainApplicationGroup}
          setMenuPane={setMenuPane}
          closeMenu={closeMenu}
        />
      )
    case AccountMenuPane.SignIn:
    case AccountMenuPane.Register:
      return (
        <GeneralAccountMenu
          mainApplicationGroup={mainApplicationGroup}
          setMenuPane={setMenuPane}
          closeMenu={closeMenu}
        />
      )
    case AccountMenuPane.ConfirmPassword:
      return <ConfirmPassword setMenuPane={setMenuPane} email="" password="" />
  }
}

export default observer(MenuPaneSelector)
