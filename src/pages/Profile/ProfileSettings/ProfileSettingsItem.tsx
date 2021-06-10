import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import classnames from 'classnames'
import { AppState } from '../../../store/store'
import { EditOutlined } from '@ant-design/icons'
import './profileSettings.scss'

export const SettingsItem: React.FC<SettingsItemProps> = React.memo(({
   value, name, type, label, action, setPasswordError, setPassword
}) => {
   const dispatch = useDispatch()
   const { id } = useSelector((state: AppState) => state.user)
   const item = useSelector((state: AppState) => state.user[value])

   const [currentValue, setCurrentValue] = React.useState<string | null>(null) // Current field value 
   const [editMode, setEditMode] = React.useState(type === 'password' ? true : false) // Toggle edit mode
   const [error, setError] = React.useState<string | null>(null) // Current field error

   let schema = yup.object() // Validator init

   // Get the appropriate validator
   const setSchema = () => {
      switch (type) {
         case 'text':
            return schema = yup.object().shape({
               item: yup.string().min(2, 'Минимум 2 символа').max(25, 'Максимум 25 символов')
            })

         case 'email':
            return schema = yup.object().shape({
               item: yup.string().min(2, 'Минимум 2 символа').max(25, 'Максимум 25 символов').email('Неккоректный email')
            })

         case 'password':
            return schema = yup.object().shape({
               item: yup.string().min(6, 'Минимум 6 символов').max(25, 'Максимум 25 символов').required('Обязательное поле'),
            })

         default:
            return schema
      }
   }

   // Action during field change
   const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      setSchema()
      validator(value)
      setCurrentValue(value)
   }

   // Validator actions
   const validator = async (value: string) => {
      const isValid = await schema.isValid({ item: value })

      if (!isValid) schema.validate({ item: value }).catch(value => setError(value.errors[0]))
      else setError(null)
   }

   // Dispatch data field to store
   const onSetValue = () => {
      if (type === 'password') {
         !currentValue && setError('Обязательное поле')
         setPasswordError && setPasswordError(!!error)
      }
      
      if (!error) {
         setEditMode(type === 'password' ? true : false)

         if (currentValue !== item && currentValue) {
            id && action && dispatch(action(id, currentValue))
            
            type === 'password' && setPassword && setPassword && dispatch(setPassword(currentValue))
         }
      }
   }

   React.useEffect(() => { item !== null ? setCurrentValue(`${item}`) : setCurrentValue('') }, [item])

   return (
      <div className="profile__settings-item">
         <p className="profile__settings-label">{label}:</p>
         {editMode ? (
            <>
               <input
                  className={classnames("static", { "error": error })}
                  value={`${currentValue}`}
                  type={type}
                  name={`${name}_change`}
                  onChange={e => onValueChange(e)}
                  onBlur={onSetValue}
                  autoFocus={type !== 'password' && true}
               />
               {error && <span className="profile__settings-error">{error}</span>}
            </>
         ) : (
            <div className="profile__settings-area" onClick={e => setEditMode(true)}>
               <p>{item}</p>
               {error && <span>{error}</span>}
               <EditOutlined />
            </div>
         )}
      </div>
   )
})

// Types
type SettingsItemProps = {
   value: 'login' | 'email' | 'password' | 'newPassword'
   name: string
   label: string
   type: string
   action?: (id: string | null, value: string) => void
   setPassword?: (value: string) => void
   setPasswordError?: (value: boolean) => void
}
