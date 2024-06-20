import React from 'react'
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  console.log(location.pathname)
  return (
    <div className=''>Dashboard LIB</div>
  )
}

export default Dashboard