const InputModal = ({ isOpen, closeModal, tempPropertiesData, handleModalFormChange, handleUpdateModalFormSubmit, handleModalFormSubmit, isEdit }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEdit) {
      handleUpdateModalFormSubmit(); // Call your edit handler
    } else {
      handleModalFormSubmit(); // Call your create handler
    }
    closeModal();
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Add Property</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propertyNumber">
                  Property Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="propertyNumber"
                  name="propertyNumber"
                  type="text"
                  required
                  placeholder="Property Number"
                  value={tempPropertiesData.propertyNumber || ""}
                  onChange={handleModalFormChange}
                  disabled={isEdit}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="quantity"
                  name="quantity"
                  type="number"
                  required
                  placeholder="Property Quantity"
                  value={tempPropertiesData.quantity || 0}
                  onChange={handleModalFormChange}
                  min={0}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  name="description"
                  type="text"
                  required
                  placeholder="Property Description"
                  value={tempPropertiesData.description || ""}
                  onChange={handleModalFormChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateAcquired">
                  Date Acquired
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dateAcquired"
                  name="dateAcquired"
                  type="date"
                  required
                  placeholder="Property Date Acquired"
                  value={tempPropertiesData.dateAcquired || ""}
                  onChange={handleModalFormChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                  Amount
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="amount"
                  name="amount"
                  type="number"
                  required
                  placeholder="Property Amount"
                  value={tempPropertiesData.amount || 0}
                  onChange={handleModalFormChange}
                  min={0}
                />
              </div>
              {/* Add other input fields */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isEdit? "Update" : "Save"}
                </button>
              </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputModal;