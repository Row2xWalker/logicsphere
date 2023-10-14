"use client"

import PTRForm from '@components/PTRForm';
import PTRInputModal from '@components/PTRInputModal';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditPtrPage = () => {
    const router = useRouter()
  const {data:session} = useSession();
  const searchParams = useSearchParams();
  const ptrId = searchParams.get('id');
  const [ptrInput, setPtrInput] = useState({
      propertyTransferNumber: "",
      date:"",
      entityName: "",
      fundCluster: "",
      fromAccountableOfficer: "",
      toAccountableOfficer: "",
      transferType: "",
      transferReason: "",
      approver:{
        fullName:  "",
        designation:  "",
        date:  ""
      },
      issuer:{
        fullName: "",
        designation:  "",
        date:  ""
      },
      receiver:{
        fullName:  "",
        designation:  "",
        date:  ""
      },
      properties: []
    });
    const [tempPropertiesData, setTempPropertiesData] = useState({
        propertyNumber: "",
        dateAcquired: "",
        description: "",
        amount: 0,
        condition: "",
    });
    const [propertiesData, setPropertiesData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const closeModal = ()=> {
      setIsEdit(false);
      setIsOpen(false);
      setTempPropertiesData({
        propertyNumber: "",
        dateAcquired: "",
        description: "",
        amount: 0,
        condition: "",
      });    
    }

    useEffect(()=>{
        const getPtrDetails = async() =>{
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
                properties:[]
            })
            setPropertiesData(data.properties);
        }
        if(ptrId) getPtrDetails();
    },[ptrId])
  const openModal = () => {
      setIsOpen(true);
  };
  const handleModalFormChange = (e) => {
    const { name, value } = e.target;
        if (name === 'date') { // Parse the input value as a Date object
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
  }
  const handleModalFormSubmit = () => {

    setPropertiesData([...propertiesData, tempPropertiesData]);
    console.log(propertiesData)
    setIsOpen(false);

  }

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

  const handleUpdateModalFormSubmit = (e) => {
     // Create a copy of propertiesData
     const updatedPropertiesData = [...propertiesData];
     // Find the index of the edited property in the array (you may need an ID or another way to identify it)
     const indexToEdit = updatedPropertiesData.findIndex(
         (property) => property.propertyTransferNumber === tempPropertiesData.propertyTransferNumber
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
        propertyNumber: "",
        dateAcquired: "",
        description: "",
        amount: 0,
        condition: "",
    })
  }


  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if(name === "date"){
        const selectedDate = new Date(value);
        if (!isNaN(selectedDate)) {
            // Format the date as "YYYY-MM-DD"
            const formattedDate = selectedDate.toISOString().slice(0, 10);

            setPtrInput((prevData) => ({
                ...prevData,
                [name]: formattedDate,
            }));
        } else {
            // Invalid input, do not update state
            // You can show an error message or take other actions here
        }
    }else{
        // Split the 'name' attribute into an array to access the nested properties
        const nameParts = name.split('.');
        setPtrInput((prevData) => {
        // Create a copy of the current state
        const updatedData = { ...prevData };
    
        // Traverse the nested structure to find the target property
        let current = updatedData;
        for (let i = 0; i < nameParts.length - 1; i++) {
            current = current[nameParts[i]];
        }
    
        // Update the target property with the new value
        current[nameParts[nameParts.length - 1]] = value;
    
        return updatedData;
        });
    }
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    // const updatedPtrInput = {
    //     ...ptrInput,
    //     issuer: {
    //         fullName: session?.user?.name.first+" "+session?.user?.name.middle+" "+session?.user?.name.last
    //     }
    // };

    const formDataToSubmit = {
        ...ptrInput,
        properties: ptrInput.properties.concat(propertiesData),
    };
    console.log(formDataToSubmit)
    try {
        const ptrFormData = await fetch('/api/propertytransfer/'+ptrId, {
            "method": 'PATCH',
            "Content-Type": "application/json",
            "body": JSON.stringify(formDataToSubmit)
        })
        // const parFormJsonData = await parFormData.json();
    } catch (err) {
        throw new Error("Failed updating PTR request", { status: 401 })
    }

    // router.push("/records/ptr");
};
  return (
    <>
      <PTRForm ptrInput={ptrInput}
        propertiesData={propertiesData} 
        handleFormChange={handleFormChange} 
        handleFormSubmit={handleFormSubmit}
        handleDeleteProperty={handleDeleteProperty} 
        handleEditProperty={handleEditProperty}
        openModal={openModal}
      />
      <PTRInputModal
            isOpen={isOpen}
            closeModal={closeModal}
            tempPropertiesData={tempPropertiesData}
            handleModalFormChange={handleModalFormChange}
            handleModalFormSubmit={handleModalFormSubmit}
            isEdit={isEdit}
            handleUpdateModalFormSubmit={handleUpdateModalFormSubmit}
        />    
    </>
  )
}

export default EditPtrPage