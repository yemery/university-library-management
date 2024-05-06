import React from 'react'

function Button({text, action}) {
  return (
    <button className="text-white bg-black hover:opacity-75 focus:ring- focus:outline-none  font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center capitalize"
    onClick={action}>{text}</button>
  )
}

export default Button