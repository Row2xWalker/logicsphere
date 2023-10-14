"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import DataTable from "./DataTable"

const PARLists = () => {
    const columns = [
        {
          header: 'PAR Number',
          accessorKey: 'propertyAcknowledgementNumber'
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
          header: 'Action',
          accessorKey: '_id',
          cell: row => <div><Link href={`/records/par/view-par?id=${row.getValue()}`}><span>View</span></Link><Link href={`/records/par/edit-par?id=${row.getValue()}`}><span className="mx-2">Edit</span></Link><span className="hover:cursor-pointer" onClick={() => handleDelete && handleDelete(row.getValue())}>Delete</span></div>
        }
      ]
    
    const [parData, setParData] = useState([])

    useEffect(() => {
        const getPARData = async () => {
            try {
                const res = await fetch('/api/propertyacknowledgement',
                    {
                        "Content-Type": "application/json"
                    })
                if (!res.ok) {
                    return new Response("Error fetching data", { status: 500 })
                }
                const resData = await res.json()
                setParData(resData)
                console.log(resData)
            }catch(error){
                console.error(error)
            }
    }
        getPARData();
    }, [])

    const handleDelete = async (par) => {
      const hasConfirmed = confirm(
        "Are you sure you want to delete this product?"
      );
  
      if (hasConfirmed) {
        try {
          await fetch(`/api/propertyacknowledgement/${par}`, {
            method: "DELETE",
          });
  
          const filteredParData = parData.filter((item) => item._id !== par);
          setParData(filteredParData);
        } catch (error) {
          console.log(error);
        }
      }
    }
    return (
        <div className="">
            <DataTable data={parData} columns={columns} />
        </div>
    )
}

export default PARLists