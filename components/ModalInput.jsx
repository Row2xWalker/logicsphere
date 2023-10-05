"use client"
import React, { useState } from 'react';
import Modal from 'react-modal';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '400px', // You can adjust the max width as needed
    padding: '1rem',
    backgroundColor: 'white',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '0.375rem',
  },
};

const ModalInput = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
  
    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleSubmit = () => {
      // Handle form submission here
      console.log('Input Value:', inputValue);
      closeModal();
    };
  
    return (
      <div>
        <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Open Modal Input
        </button>
  
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={modalStyle}
          contentLabel="Example Modal"
        >
          <h2 className="text-lg font-semibold mb-4">Modal Input</h2>
          <div>
            <label htmlFor="inputField" className="block mb-2">Input:</label>
            <input
              type="text"
              id="inputField"
              value={inputValue}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
            Submit
          </button>
          <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 ml-2 mt-4 rounded">
            Close
          </button>
        </Modal>
      </div>
    );
  };

export default ModalInput