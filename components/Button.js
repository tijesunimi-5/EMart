import React from 'react'

const Button = ({children, onClick, styles}) => {
  return (
    <button
      onClick={onClick}
      className={`text-white px-2 py-1 rounded-md border-white  btn ${styles}`}
    >
      {children}
    </button>
  );
}

export default Button
