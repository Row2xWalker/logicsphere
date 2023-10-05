"use client"

import {signOut} from "next-auth/react";
import {useSession} from "next-auth/react";
import Image from "next/image";
const Header = () => {

  const {data:session} = useSession();
  return (
    <header className="py-4 z-20">
        <div className="flex justify-between mx-8">
          <div className="h-20 bg-white rounded-md">
            
          </div>
          <div className="my-auto">
          <span className="mx-4">
          {session?.user?.name.first}
          </span>
          <button className="hover:bg-blue-700 rounded-md px-2" onClick={()=> signOut()}>
            Sign Out
          </button>
          </div>
        </div>
    </header>
  )
}

export default Header