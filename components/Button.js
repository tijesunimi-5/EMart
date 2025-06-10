import React from 'react'

const Button = ({children, onClick, styles}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles} text-white px-3 py-1 rounded-md border-white border  `}
    >
      {children}
    </button>
  );
}

export default Button
