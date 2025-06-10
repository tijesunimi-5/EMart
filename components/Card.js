import React from 'react'

const Card = ({children, styles, onclick, key}) => {
  return (
    <div key={key}
      className={`card text-white rounded-md  text-center overflow-hidden ${styles}`} onClick={onclick}
    >
      {children}
    </div>
  );
}

export default Card
