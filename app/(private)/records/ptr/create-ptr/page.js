"use client"
import React, { useState } from 'react'
import PTRForm from '@components/PTRForm'
import PTRInputModal from '@components/PTRInputModal';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

const PtrNewPage = () => {
  
  const {data:session} = useSession()
  const router = useRouter()
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
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const updatedPtrInput = {
        ...ptrInput,
        issuer: {
            fullName: session?.user?.name.first+" "+session?.user?.name.middle+" "+session?.user?.name.last
        }
    };

    // const formDataToSubmit = {
    //     ...updatedPtrInput,
    //     properties: updatedPtrInput.properties.concat(propertiesData),
    // };
    try {
        const ptrFormData = await fetch('/api/propertytransfer/new', {
            "method": 'post',
            "Content-Type": "application/json",
            "body": JSON.stringify(updatedPtrInput)
        })
        // const parFormJsonData = await parFormData.json();
    } catch (err) {
        throw new Error("Failed saving PAR request", { status: 401 })
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

export default PtrNewPage