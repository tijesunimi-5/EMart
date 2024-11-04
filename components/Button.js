import React from 'react'

const Button = ({children, onClick}) => {
  return (
    <button onClick={onClick} className=' text-white px-2 py-1 rounded-md shadow-md button'>
      {children}
    </button>
  )
}

export default Button
