import React from 'react'
import { Field as FormikField, useFormikContext } from 'formik'
import classnames from 'classnames'

const Filed: React.FC<FieldProps> = ({ name, placeholder, type, label, authError }) => {
   const formik = useFormikContext<RegisterValues>()

   const errors = formik.errors[name]
   const touched = formik.touched[name]

   return (
      <div className={classnames("auth-form__group",
         {"error": (errors && touched) || authError},
         {"success": touched && !errors && !authError},
         {"checkbox": label}
      )}>
         <div className="auth-form__group-inner">
            <FormikField
               className="auth-form__input"
               id={name}
               name={name}
               placeholder={placeholder}
               type={type}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values[name]}
               checked={formik.values[name]}
            />
            {label && <label htmlFor={name}>{label}</label>}
         </div>
         {errors && touched && <span>{errors}</span>}
      </div>
   )
}

export default Filed

type RegisterValues = {
   login: string
   email: string
   password: string
   confirmed_password: string
   check: boolean
}
type FieldProps = {
   name: 'login' | 'email' | 'password' | 'confirmed_password' | 'check'
   placeholder: string
   type: string
   label?: string
   authError?: string | null
}
