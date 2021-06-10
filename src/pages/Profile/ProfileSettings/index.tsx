import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, fetchEmail, fetchLogin, fetchPassword } from '../../../store/reducers/userReducer'
import { AppState } from '../../../store/store'
import { SettingsItem } from './ProfileSettingsItem'
import { DownOutlined, LoadingOutlined, UpOutlined } from '@ant-design/icons'
import './profileSettings.scss'

// TODO: Refactoring all the functions. It looks rather complicated. There is need a more simple structure

export const Settings: React.FC = React.memo(() => {
   const dispatch = useDispatch()
   const { id, password, newPassword, message, isLoading } = useSelector((state: AppState) => state.user)

   const [editMode, setEditMode] = React.useState(false) // Toggle edit mode

   const [isPasswordError, setPasswordError] = React.useState(false) // Check password error exists
   const [isNewPasswordError, setNewPasswordError] = React.useState(false) // Check new password error exists

   const errosCheck = !isPasswordError && !isNewPasswordError // Check all the conditions

   // Fetch password update
   const onSetPasswords = (id: string | null, password: string | null, newPassword: string | null) => {
      errosCheck && id && dispatch(fetchPassword(id, password, newPassword))
   }

   // Set toggle edit mode
   const onSetEditMode = () => {
      if (password && newPassword) {
         dispatch(actions.setPassword(null))
         dispatch(actions.setNewPassword(null))
      }
      // onSetPasswords(null, null, null)
      setEditMode(!editMode)
   }

   return (
      <div className="profile__settings">
         {isLoading ? (
            <div className="profile__settings-loading"><LoadingOutlined /></div>
         ) : (
            <Fragment>
               <SettingsItem value={'login'} name="login" label="Логин" type="text" action={fetchLogin} />
               <SettingsItem value={'email'} name="email" label="Email" type="email" action={fetchEmail} />
               <div className="profile__settings-passwords-label" onClick={onSetEditMode}>
                  <p>Изменить пароль</p>
                  {editMode ? <UpOutlined /> : <DownOutlined />}
               </div>
               {editMode &&
                  <div className="profile__settings-passwords">
                     {message && <span className="profile__settings-message">{message}</span>}
                     <div className="profile__settings-passwords-container">
                        <SettingsItem
                           value={'password'}
                           name="password"
                           label="Текущий пароль"
                           type="password"
                           setPassword={actions.setPassword}
                           setPasswordError={setPasswordError}
                        />
                        <SettingsItem
                           value={'newPassword'}
                           name="newPassword"
                           label="Новый пароль"
                           type="password"
                           setPassword={actions.setNewPassword}
                           setPasswordError={setNewPasswordError}
                        />
                     </div>
                     <button className="button" disabled={!errosCheck} onClick={e => onSetPasswords(
                        id, password, newPassword
                     )}>Изменить</button>
                  </div>
               }
            </Fragment>
         )}
      </div>
   )
})
