import React from 'react'
import { Card } from "flowbite-react";

const CardStats = ({stat}) => {
  return (
    <Card className="w-fit h-fit flex items-center justify-center text-center bg-white dark:bg-gray-800">
      <div>
        <h5 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          {stat.data}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {stat.title}
        </p>
      </div>
    </Card>
  )
}

export default CardStats