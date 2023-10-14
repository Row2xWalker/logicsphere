"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import DataTable from "./DataTable"

const PTRLists = () => {
    const columns = [
        {
          header: 'PTR Number',
          accessorKey: 'propertyTransferNumber'
        },
        {
          header: 'Entity Name',
          accessorKey: 'entityName'
        },
        {
          header: 'Date',
          accessorKey: 'date',
          cell: row => {
            const date = row.getValue()
            const parsedDate = new Date(date)
            const monthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
            const day = parsedDate.getDate();
            const month = parsedDate.getMonth();
            const year = parsedDate.getFullYear();
            return (
          <div>
            {monthArray[month]+" "+day+", "+year}
             </div>)}
        },
        {
          header: 'Issuer',
          accessorKey: 'issuer.fullName'
        },
        {
          header: 'Receiver',
          accessorKey: 'receiver.fullName'
        },
        {
          header: 'Approver',
          accessorKey: 'approver.fullName'
        },
        {
          header: 'Action',
          accessorKey: '_id',
          cell: row => <div><Link href={`/records/ptr/view-ptr?id=${row.getValue()}`}><span>View</span></Link><Link href={`/records/ptr/edit-ptr?id=${row.getValue()}`}><span className="mx-2">Edit</span></Link><span className="hover:cursor-pointer" onClick={() => handleDelete && handleDelete(row.getValue())}>Delete</span></div>
        }
      ]
    
    const [ptrData, setPtrData] = useState([])

    useEffect(() => {
        const getPTRData = async () => {
            try {
                const res = await fetch('/api/propertytransfer',
                    {
                        "Content-Type": "application/json"
                    })
                if (!res.ok) {
                    return new Response("Error fetching data", { status: 500 })
                }
                const resData = await res.json()
                setPtrData(resData)
                console.log(resData)
            }catch(error){
                console.error(error)
            }
    }
        getPTRData();
    }, [])

    const handleDelete = async (ptr) => {
      const hasConfirmed = confirm(
        "Are you sure you want to delete this product?"
      );
  
      if (hasConfirmed) {
        try {
          await fetch(`/api/propertytransfer/${ptr}`, {
            method: "DELETE",
          });
  
          const filteredPtrData = ptrData.filter((item) => item._id !== ptr);
          setPtrData(filteredPtrData);
          alert("record has been deleted!")
        } catch (error) {
          console.log(error);
        }
      }
    }
    return (
        <div className="">
            <DataTable data={ptrData} columns={columns} />
        </div>
    )
}

export default PTRLists