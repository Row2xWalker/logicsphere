"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const ViewPTRPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const ptrId = searchParams.get('id');
    const [ptrInput, setPtrInput] = useState({
        propertyTransferNumber: "",
        date: "",
        entityName: "",
        fundCluster: "",
        fromAccountableOfficer: "",
        toAccountableOfficer: "",
        transferType: "",
        transferReason: "",
        approver: {
            fullName: "",
            designation: "",
            date: ""
        },
        issuer: {
            fullName: "",
            designation: "",
            date: ""
        },
        receiver: {
            fullName: "",
            designation: "",
            date: ""
        },
        properties: []
    });
    useEffect(() => {
        const getPtrDetails = async () => {
            const response = await fetch(`/api/propertytransfer/${ptrId}`)
            const data = await response.json();
            setPtrInput({
                propertyTransferNumber: data.propertyTransferNumber,
                date: data.date,
                entityName: data.entityName,
                fundCluster: data.fundCluster,
                fromAccountableOfficer: data.fromAccountableOfficer,
                toAccountableOfficer: data.toAccountableOfficer,
                transferType: data.transferType,
                transferReason: data.transferReason,
                approver: data.approver,
                issuer: data.issuer,
                receiver: data.receiver,
                properties: data.properties
            })
        }
        if (ptrId) getPtrDetails();
    }, [ptrId])

    const handlePrintButton = (e) => {
        e.preventDefault();
        let originalContents = document.body.innerHTML;
        let printContent = document.getElementById('print-area').innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        window.location.reload() //to rerender the components
        // document.body.innerHTML= originalContents
    }
    const tableHeaderStyle = "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
    const tableDataStyle = "border border-slate-300 col-span-1 "
    return (
        <div id="print-area" className="w-3/4 bg-white mx-auto">
            <h1 className="text-center py-4 font-bold">
                PROPERTY ACKNOWLEDGEMENT REPORT
            </h1>
            {ptrInput ?
                (<section className="grid grid-cols-2">
                    <div className="col-span-1">Entity Name: {ptrInput.entityName}</div>
                    <div className="col-span-1">Fund Cluster: {ptrInput.fundCluster}</div>
                    <div className="mt-2 col-span-1 border">
                        <div>
                            From Accountable Officer/Agency/Fund Cluster: {ptrInput.fromAccountableOfficer}
                        </div>
                        <div>
                            To Accountable Officer/Agency/Fund Cluster: {ptrInput.toAccountableOfficer}
                        </div>
                    </div>
                    <div className="mt-2  col-span-1 border">
                        <div>
                            PTR No: {ptrInput.propertyTransferNumber}
                        </div>
                        <div>
                            Date: {ptrInput.date?.slice(0,10)}
                        </div>
                    </div>
                    <div className="col-span-2">
                        Transfer Type: {ptrInput.transferType}
                    </div>
                    <div className="col-span-2">
                        <table className="text-center border-collapse border w-full grid-cols-6">
                            <thead>
                                <tr>
                                    <th className={tableDataStyle}>Date Acquired</th>
                                    <th className={tableDataStyle}>Property Number</th>
                                    <th className={tableDataStyle}>Description</th>
                                    <th className={tableDataStyle}>Amount</th>
                                    <th className={tableDataStyle}>Condition</th>

                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {ptrInput.properties?.map((property, index) => {
                                    return (<tr key={index}>
                                        <td className={tableDataStyle}>{property.dateAcquired?.slice(0,10)}</td>
                                        <td className={tableDataStyle}>{property.propertyNumber}</td>
                                        <td className={tableDataStyle}>{property.description}</td>
                                        <td className={tableDataStyle}>{property.amount}</td>
                                        <td className={tableDataStyle}>{property.condition}</td>
                                    </tr>)
                                })}

                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-2">
                        <div className="border">
                            Reason for Transfer: {ptrInput.transferReason}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className={tableHeaderStyle}>
                                    </th>
                                    <th className={tableHeaderStyle}>
                                        Approved by:
                                    </th>
                                    <th className={tableHeaderStyle}>
                                        Released/Issued by:
                                    </th>
                                    <th className={tableHeaderStyle}>
                                        Received by:
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td className={tableDataStyle}>Signature</td>
                                    <td className={tableDataStyle}>
                                       ______________________________

                                    </td>
                                    <td className={tableDataStyle}>
                                    ______________________________
                                    </td>
                                    <td className={tableDataStyle}>

                                    ______________________________
                                    </td>
                                </tr>
                                <tr >
                                    <td className={tableDataStyle}>Name</td>
                                    <td className={tableDataStyle}>
                                        {ptrInput.approver?.fullName}

                                    </td>
                                    <td className={tableDataStyle}>
                                        {ptrInput.issuer?.fullName}
                                    </td>
                                    <td className={tableDataStyle}>

                                        {ptrInput.receiver?.fullName}
                                    </td>
                                </tr>
                                <tr >
                                    <td className={tableDataStyle}>Designation</td>
                                    <td className={tableDataStyle}>

                                        {ptrInput.approver?.designation}

                                    </td>
                                    <td className={tableDataStyle}>
                                        {ptrInput.issuer?.designation}
                                    </td>
                                    <td className={tableDataStyle}>
                                        {ptrInput.receiver?.designation}
                                    </td>
                                </tr>

                                <tr >
                                    <td className={tableDataStyle}>Date</td>
                                    <td className={tableDataStyle}>
                                        {ptrInput.approver?.date?.slice(0, 10)}
                                    </td>
                                    <td className={tableDataStyle}>
                                        {ptrInput.issuer?.date?.slice(0, 10)}
                                    </td>
                                    <td className={tableDataStyle}>
                                        {ptrInput.receiver?.date?.slice(0, 10)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>) : null
            }
            <div className="p-4">
                <button onClick={handlePrintButton} className="print:hidden p-4 bg-blue-300 rounded-md border">Print</button>
            </div>
        </div>
    )
}

export default ViewPTRPage