"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ViewPARPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const parId = searchParams.get('id');
    const [parInput, setParInput] = useState({
        entityName: "",
        fundCluster: "",
        receiver: "",
        propertyAcknowledgementNumber: "",
        issuer: "",
        properties: []
    });
    useEffect(()=>{
        const getParDetails = async() =>{
            const response = await fetch(`/api/propertyacknowledgement/${parId}`)
            const data = await response.json();
            setParInput({
                entityName: data.entityName,
                fundCluster: data.fundCluster,
                receiver: data.receiver.fullName,
                propertyAcknowledgementNumber: data.propertyAcknowledgementNumber,
                issuer: data.issuer.fullName,
                properties: data.properties
            })
        }
        if(parId) getParDetails();
    },[parId])

    const handlePrintButton = (e) =>{
        e.preventDefault();
        let originalContents = document.body.innerHTML;
        let printContent = document.getElementById('print-area').innerHTML;
        
        document.body.innerHTML = printContent;
        window.print();
        window.location.reload() //to rerender the components
        // document.body.innerHTML= originalContents
    }

    const tableDataStyles = "border border-slate-300 col-span-1 "
  return (
    <div id="print-area" className="w-3/4 bg-white mx-auto">
        <h1 className="text-center py-4 font-bold">
            PROPERTY ACKNOWLEDGEMENT REPORT
        </h1>
        {parInput?
        (<section className="grid grid-cols-2">
            <div className="col-span-2">Entity Name: {parInput.entityName}</div>
            <div className="col-span-1">Fund Cluster: {parInput.fundCluster}</div>
            <div className="col-span-1">PAR No: {parInput.propertyAcknowledgementNumber}</div>
            <div className="col-span-2">
                <table className="text-center border-collapse border w-full grid-cols-6">
                    <thead>
                        <tr>
                            <th className={tableDataStyles}>Quantity</th>
                            <th className={tableDataStyles}>Unit</th>
                            <th className={tableDataStyles}>Description</th>
                            <th className={tableDataStyles}>Property Number</th>
                            <th className={tableDataStyles}>Date Acquired</th>
                            <th className={tableDataStyles}>Amount</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {parInput.properties?.map((property, index)=>{
                            return (<tr key={index}>
                                <td colSpan={2} className={tableDataStyles}>{property.quantity}</td>
                                <td className={tableDataStyles}>{property.description}</td>
                                <td className={tableDataStyles}>{property.propertyNumber}</td>
                                <td className={tableDataStyles}>{property.dateAcquired}</td>
                                <td className={tableDataStyles}>{property.amount}</td>
                            </tr>)
                        })}
                        <tr>
                            <td colSpan={3}>Received by:
                                <div className="underline">_________{parInput.receiver.toUpperCase()}_____________</div>
                                <div>Signature Over Printed Name of End User</div>
                                <div className="underline">______________________</div>
                                <div>Position/ Office</div>
                                <div className="underline">______________________</div>
                                <div>Date</div>
                            </td>
                            <td colSpan={3}>Issued by:
                                <div className="underline">_________{parInput.issuer.toUpperCase()}_____________</div>
                                <div>Signature Over Printed Name of End User</div>
                                <div className="underline">______________________</div>
                                <div>Position/ Office</div>
                                <div className="underline">______________________</div>
                                <div>Date</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>):null
        }
        <div className="p-4">
            <button onClick={handlePrintButton} className="print:hidden p-4 bg-blue-300 rounded-md border">Print</button>  
        </div>
    </div>
  )
}

export default ViewPARPage