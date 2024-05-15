import React from 'react'

const Input = ({value}) => {
  return (
    <div className=' flex items-center justify-center'>
    <div className="relative h-10 md:h-16 w-auto min-w-[200px]">
    <input placeholder=""
      className="uppercase text-center peer h-full w-full border-b border-yellow-500 bg-transparent py-6  font-sans text-2xl md:text-5xl  text-gray-500 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 tracking-widest font-bold " defaultValue={value}  />

  </div>
  </div>
  )
}

export default Input