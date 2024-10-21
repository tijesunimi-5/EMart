import React from 'react'

const Button = ({children, onclick}) => {
  return (
    <button onClick={onclick} className='bg-main-bg text-white px-2 py-1 rounded-md shadow-md border-white border-2'>
      {children}
    </button>
  )
}

export default Button
