import React from 'react'
import { redirect } from 'next/navigation'
import AllProvider from '@/constants/AllProvider'
const Provider = ({ params }) => {
  console.log(params.provider[0])
  // console.log(AllProvider.includes(params.provider[0]))
  
  return (
    <div>Provider{JSON.stringify(params)}</div>
  )
}

export default Provider