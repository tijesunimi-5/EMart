import React from 'react'

const Card = (props) => {
  return (
    <div className='card text-white w-auto h-auto rounded-md  text-center overflow-hidden'>
      {props.children}
    </div>
  )
}

export default Card
