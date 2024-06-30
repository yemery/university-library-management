import React, { useEffect, useState } from 'react'
import TestChart from '../../components/charts/TestChart'
import api from '../../services/api'

function Dashboard() {
  const [data, setData] = useState([])
 useEffect(() => {
  api.get('/borrows/most-borrowed/',
  {headers: {
    'Authorization': `Bearer ${localStorage.getItem('access')}`
  }}
  )
  .then(response => setData(response.data))

 } , [])
  return (
    <div className="w-[500px]">
      <TestChart data={data}/>
    </div>
  )
}

export default Dashboard