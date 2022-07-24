import React, { FC, ReactNode } from 'react'

const Button: FC<{ children: ReactNode }> =
  ({ children, ...props }) => {
    return (
      <button
        {...props}
        className='bg-secondaryDark hover:bg-secondary text-bgPrimary py-2 px-4 rounded mx-auto my-4'
      >
        {children}
      </button>
    )
  }

export default Button