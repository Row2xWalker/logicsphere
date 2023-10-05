"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import { useState } from "react";


const PAR = () => {
    const [parInput, setParInput] = useState({
        entityName:"",
        fundCluster:"",
        receivedBy:"",
        parNumber:"",
        issuedBy:"",
        properties:[]
    })

    const [properties, setProperties]= useState({
        quantity:0,
        description:"",
        propertyNumber:"",
        dateAcquired:"",
        amount:""
    });
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setParInput(values => ({...values, [name]: value}))
    }
    

    return (
        <main className="container mx-auto py-8 flex-grow">
            <div className="bg-white p-4 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Generate PAR Form</h2>
                {/* Simple Form */}
                <form>
                    <div className="grid grid-cols-2">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="entityName">
                                Entity Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="entityName"
                                name="entityName"
                                type="text"
                                placeholder="Entity Name"
                                value={parInput.entityName||""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fundCluster">
                                Fund Cluster
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="fundCluster"
                                name="fundCluster"
                                type="text"
                                placeholder="Fund Cluster"
                                value={parInput.fundCluster||""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="receivedBy">
                                Received by:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="receivedBy"
                                name="receivedBy"
                                type="text"
                                placeholder="Received by"
                                value={parInput.receivedBy||""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parNumber">
                                PAR No.
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="parNumber"
                                name="parNumber"
                                type="text"
                                placeholder="PAR No."
                                value={parInput.parNumber||""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild >
                            <button className="bg-green-500 hover:bg-green-700 p-2 rounded text-white font-bold  focus:outline-none focus:shadow-outline">
                                Add Item
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Add property</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                Description
                                </Label>
                                <Input 
                                    className="col-span-3"
                                    id="description" 
                                    name="description" 
                                    placeholder="Property Description"
                                    value={properties.description||""}
                                    onChange={handleChange}
                                     />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="quantity" className="text-right">
                                Quantity
                                </Label>
                                <Input 
                                    className="col-span-3"
                                    type="number" 
                                    id="quantity" 
                                    name="quantity" 
                                    placeholder="Property Quantity"
                                    value={properties.quantity||""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="propertyNumber" className="text-right">
                                Property Number
                                </Label>
                                <Input 
                                    className="col-span-3" 
                                    id="propertyNumber" 
                                    name="propertyNumber" 
                                    placeholder="Property Number"
                                    value={properties.propertyNumber||""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="dateacquired" className="text-right">
                                Date Acquired
                                </Label>
                                <Input id="dateacquired" type="date" value="" className="col-span-3" />
                            </div> 
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                Amount
                                </Label>
                                <Input type="number" id="amount" value="" className="col-span-3" />
                            </div>
                            </div>
                            <DialogFooter>
                            <button type="submit" className="bg-green-500 hover:bg-green-700 p-2 rounded text-white font-bold  focus:outline-none focus:shadow-outline">Add property</button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Quantity:
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Description:
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Property Number:
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date Acquired:
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">1</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">Apple Charger</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"></td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"></td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center ">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default PAR