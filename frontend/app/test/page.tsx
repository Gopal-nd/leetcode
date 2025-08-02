import React from 'react'

const page = () => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  return (
    <div>Backend url : {url}</div>
  )
}

export default page