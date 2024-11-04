import React from 'react'

const page = () => {
  return (
    <div className="bg-main-bg h-[100vh] text-white">
      <div className='pt-10 relative'>
        <div className='bg-white h-[150px] relative'></div>
        <div className='profile rounded-full bg-blue-400 w-[150px] h-[150px] ml-4 absolute bottom-[-80px]'></div>
      </div>
    </div>
  );
}

export default page
