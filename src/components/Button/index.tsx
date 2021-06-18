import React from 'react'
import classnames from 'classnames'
import './button.scss'

const Button: React.FC<Props> = React.memo(({ children, size }) => {
   return (
      <button className={classnames("button",
         {"large": size === 'large'},
         {"small": size === 'small'},
      )}>
         {children}
      </button>
   )
})

export default Button

// Types
type Props = {
   size?: 'large' | 'small'
}
