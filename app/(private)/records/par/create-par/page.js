"use client"

import PARForm from '@components/PARForm'
import PARFormProperties from '@components/PARFormProperties';
import PARInputModal from '@components/PARInputModal'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NewParPage = () => {
    const router = useRouter();
    const {data: session} = useSession()
    const [parInput, setParInput] = useState({
        entityName: "",
        fundCluster: "",
        receiver: "",
        propertyAcknowledgementNumber: "",
        issuer: "",
        properties: []
    });
    const [tempPropertiesData, setTempPropertiesData] = useState({
        quantity: 0,
        description: "",
        propertyNumber: "",
        dateAcquired: "",
        amount: 0,
    });
    const [propertiesData, setPropertiesData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const handleModalFormChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dateAcquired') { // Parse the input value as a Date object
            const selectedDate = new Date(value);
            if (!isNaN(selectedDate)) {
                // Format the date as "YYYY-MM-DD"
                const formattedDate = selectedDate.toISOString().slice(0, 10);

                setTempPropertiesData((prevData) => ({
                    ...prevData,
                    [name]: formattedDate,
                }));
            } else {
                // Invalid input, do not update state
                // You can show an error message or take other actions here
            }
        } else if (name === 'amount' || name == "quantity") {
            // Validate the amount input
            const intValue = parseInt(value);

            if (!isNaN(intValue) && intValue >= 0) {
                // The input is a valid positive integer
                setTempPropertiesData((prevData) => ({
                    ...prevData,
                    [name]: intValue,
                }));
            } else {
                // Invalid input, do not update state
                // You can show an error message or take other actions here
            }
        } else {
            // Handle other fields here
            setTempPropertiesData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleDeleteProperty = (index) => {
         // Create a copy of propertiesData
         const updatedPropertiesData = [...propertiesData];

         // Remove the element at the specified index
         updatedPropertiesData.splice(index, 1);
 
         // Update the state with the modified array
         setPropertiesData(updatedPropertiesData);
    };

    const handleEditProperty = (index, currentProperty) => {
        setTempPropertiesData(propertiesData[index]);

        // Open the modal
        setIsEdit(true);
        setIsOpen(true);
      };

    const handleModalFormSubmit = (e) => {
        setPropertiesData([...propertiesData, tempPropertiesData]);
        console.log(propertiesData)
        setIsOpen(false);
    };

    const handleUpdateModalFormSubmit = (e) => {
        // Create a copy of propertiesData
        const updatedPropertiesData = [...propertiesData];
        console.log(tempPropertiesData.propertyNumber)
        // Find the index of the edited property in the array (you may need an ID or another way to identify it)
        const indexToEdit = updatedPropertiesData.findIndex(
            (property) => property.propertyNumber === tempPropertiesData.propertyNumber
        );

        // Replace the property at the specified index with the edited property
        if (indexToEdit !== -1) {
            updatedPropertiesData[indexToEdit] = tempPropertiesData;
            setPropertiesData(updatedPropertiesData);
        }

        // Close and reinitialize the modal
        setIsEdit(false);
        setIsOpen(false);
        setTempPropertiesData({
            quantity: 0,
            description: "",
            propertyNumber: "",
            dateAcquired: "",
            amount: 0,
        })
    };


    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setParInput((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        const updatedParInput = {
            ...parInput,
            issuer: {
                fullName: session?.user?.name.first+" "+session?.user?.name.middle+" "+session?.user?.name.last
            },
            receiver: {
                fullName: parInput.receiver
            }
        };

        const formDataToSubmit = {
            ...updatedParInput,
            properties: updatedParInput.properties.concat(propertiesData),
        };
        try {
            const parFormData = await fetch('/api/propertyacknowledgement/new', {
                "method": 'post',
                "Content-Type": "application/json",
                "body": JSON.stringify(formDataToSubmit)
            })
            // const parFormJsonData = await parFormData.json();
        } catch (err) {
            throw new Error("Failed saving PAR request", { status: 401 })
        }

        router.push("/records/par");
    };
  return (
    <div className="container mx-auto py-8 flex-grow bg-white p-4 shadow-md rounded-lg">
         <form onSubmit={handleFormSubmit}>
            <PARForm handleFormSubmit={handleFormSubmit} parInput={parInput} handleFormChange={handleFormChange}/>
            {/* Render the InputModal component */}
            
            <div className="flex justify-end mt-4">
                <button
                    type="button"
                    onClick={openModal}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4  rounded"
                >
                    Add Item
                </button>
            </div>
        <PARFormProperties propertiesData={propertiesData} handleDeleteProperty={handleDeleteProperty} handleEditProperty={handleEditProperty}/>
            <div className="flex items-center ">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
        
        <PARInputModal
            isOpen={isOpen}
            closeModal={()=> {
                setIsEdit(false);
                setIsOpen(false);
                setTempPropertiesData({
                quantity: 0,
                description: "",
                propertyNumber: "",
                dateAcquired: "",
                amount: 0,
                });    
            }}
            tempPropertiesData={tempPropertiesData}
            handleModalFormChange={handleModalFormChange}
            handleModalFormSubmit={handleModalFormSubmit}
            isEdit={isEdit}
            handleUpdateModalFormSubmit={handleUpdateModalFormSubmit}
        />
    </div>
  )
}

export default NewParPage