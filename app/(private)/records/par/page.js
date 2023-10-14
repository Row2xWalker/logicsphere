
import PARLists from '@components/PARLists'
import Link from 'next/link'
import React from 'react'

const ParPage = () => {
  return (
    <div className='mx-auto w-3/4'>
      <h1 className="font-bold text-xl my-4">Property Acknowledgement Lists</h1>
      <div className="flex justify-end my-2">
        <Link href="/records/par/create-par">
        <button className="hover:bg-green-700 bg-green-500 p-2 rounded-md text-white ">
          Create New
        </button>
      </Link>
      </div>
      <PARLists />
    </div>
  )
}

export default ParPage