"use client"
import { useState } from "react";
import { useSession } from "next-auth/react";


const PAR = ({ parInput, handleFormChange }) => {

    const inputClassName = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Create PAR Form</h2>
            <div className="grid grid-cols-2">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propertyAcknowledgementNumber">
                        PAR No.
                    </label>
                    <input
                        className={inputClassName}
                        id="propertyAcknowledgementNumber"
                        name="propertyAcknowledgementNumber"
                        type="text"
                        placeholder="PAR No."
                        value={parInput.propertyAcknowledgementNumber || ""}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="entityName">
                        Entity Name
                    </label>
                    <input
                        className={inputClassName}
                        id="entityName"
                        name="entityName"
                        type="text"
                        placeholder="Entity Name"
                        value={parInput.entityName || ""}
                        onChange={handleFormChange}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2">

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fundCluster">
                        Fund Cluster
                    </label>
                    <input
                        className={inputClassName}
                        id="fundCluster"
                        name="fundCluster"
                        type="text"
                        placeholder="Fund Cluster"
                        value={parInput.fundCluster || ""}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="receiver">
                        Received by:
                    </label>
                    <input
                        className={inputClassName}
                        id="receiver"
                        name="receiver"
                        type="text"
                        placeholder="Received by"
                        value={parInput.receiver || ""}
                        onChange={handleFormChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default PAR