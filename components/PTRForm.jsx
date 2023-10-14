"use client"


const PTRForm = ({openModal, ptrInput, propertiesData, handleFormChange, handleFormSubmit, handleEditProperty, handleDeleteProperty}) => {
  // const getDate = () => {
  //     const currentDate = new Date();
  //     const year = currentDate.getFullYear();
  //     const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  //     const month = monthNames[currentDate.getMonth()];
  //     const day = currentDate.getDate().toString().padStart(2, '0');

  //     const formattedDate = `${day}-${month}-${year}`;
  //     return formattedDate
  //   }
  const labelStyle = "block text-gray-700 text-sm font-bold mb-2";
  const inputStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  const tableHeaderStyle = "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
  const tableDataStyle = "px-5 py-5 border-b border-gray-200 bg-white text-sm"
  const tableDataInputStyle = "shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
  
  
  return (
    <main className="container mx-auto py-8 flex-grow">
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Generate PTR Form</h2>
        {/* Simple Form */}
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2">
            <div className="mb-4">
              <label className={labelStyle} htmlFor="propertyTransferNumber">
                PTR No.
              </label>
              <input
                className={inputStyle}
                id="propertyTransferNumber"
                name="propertyTransferNumber"
                type="text"
                placeholder="PTR No."
                value={ptrInput.propertyTransferNumber || ""}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-4">
              <label className={labelStyle} htmlFor="date">
                Date
              </label>
              <input
                className={inputStyle}
                id="date"
                name="date"
                type="date"
                placeholder="Date"
                value={ptrInput.date.slice(0,10) || ""}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-4">
              <label className={labelStyle} htmlFor="entityName">
                Entity Name
              </label>
              <input
                className={inputStyle}
                id="entityName"
                name="entityName"
                type="text"
                placeholder="Entity Name"
                value={ptrInput.entityName || ""}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-4">
              <label className={labelStyle} htmlFor="fundCluster">
                Fund Cluster
              </label>
              <input
                className={inputStyle}
                id="fundCluster"
                name="fundCluster"
                type="text"
                placeholder="Fund Cluster"
                value={ptrInput.fundCluster || ""}
                onChange={handleFormChange}
              />
            </div>
          <div className="mb-4">
            <label className={labelStyle} htmlFor="fromAccountableOfficer">
              From Accountable Officer/Agency/Fund Cluster
            </label>
            <input
              className={inputStyle}
              id="fromAccountableOfficer"
              name="fromAccountableOfficer"
              type="text"
              placeholder="From Accountable Officer/Agency/Fund Cluster"
              value={ptrInput.fromAccountableOfficer || ""}
              onChange={handleFormChange}
            />
          </div>
          <div className="mb-4">
            <label className={labelStyle} htmlFor="toAccountableOfficer">
              To Accountable Officer/Agency/Fund Cluster
            </label>
            <input
              className={inputStyle}
              id="toAccountableOfficer"
              name="toAccountableOfficer"
              type="text"
              placeholder="To Accountable Officer/Agency/Fund Cluster"
              value={ptrInput.toAccountableOfficer || ""}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label className={labelStyle} htmlFor="transferType">
              Transfer Type:
            </label>
            <input
              className={inputStyle}
              id="transferType"
              name="transferType"
              type="text"
              placeholder="Transfer Type"
              value={ptrInput.transferType || ""}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label className={labelStyle} htmlFor="transferReason">
              Reason for Transfer:
            </label>
            <input
              className={inputStyle}
              id="transferReason"
              name="transferReason"
              type="text"
              placeholder="Reason for Transfer"
              value={ptrInput.transferReason || ""}
              onChange={handleFormChange}
            />
          </div>

          </div>
          <div className="bg-white shadow-md rounded my-6">
            <div className="flex justify-end pb-4">
                  <button
                      type="button"
                      onClick={openModal}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4  rounded"
                  >
                      Add Item
                  </button>
              </div>
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className={tableHeaderStyle}>
                    Property Number
                  </th>
                  <th className={tableHeaderStyle}>
                    Description
                  </th>
                  <th className={tableHeaderStyle}>
                    Date Acquired
                  </th>
                  <th className={tableHeaderStyle}>
                    Amount
                  </th>
                  <th className={tableHeaderStyle}>
                    Condition of PPE
                  </th>
                  <th className={tableHeaderStyle}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {propertiesData.map((property, index) => (
                  <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {property.propertyNumber}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {property.description}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {property.dateAcquired.slice(0,10)}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {property.amount}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {property.condition}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                          <button
                              type="button"
                              onClick={() => handleEditProperty(index, property)}
                              className="p-2 text-red-500 hover:text-blue-700 bg-blue-400"
                          >
                              Edit
                          </button>
                          <button
                              type="button"
                              onClick={() => handleDeleteProperty(index)}
                              className="text-red-500 hover:text-red-700"
                          >
                              Delete
                          </button>

                      </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white shadow-md rounded my-6">
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
                  <td className={tableDataStyle}>Name</td>
                  <td className={tableDataStyle}>
                    <input className={tableDataInputStyle}
                      id="approver.fullName"
                      name="approver.fullName"
                      type="text"
                      placeholder="Name"
                      value={ptrInput.approver.fullName || ""}
                      onChange={handleFormChange}
                    />
                  </td>
                  <td className={tableDataStyle}>
                    <input className={tableDataInputStyle}
                      id="issuer.fullName"
                      name="issuer.fullName"
                      type="text"
                      placeholder="Name"
                      value={ptrInput.issuer.fullName || ""}
                      onChange={handleFormChange}
                    />
                  </td>
                  <td className={tableDataStyle}>
                    <input className={tableDataInputStyle}
                      id="receiver.fullName"
                      name="receiver.fullName"
                      type="text"
                      placeholder="Name"
                      value={ptrInput.receiver.fullName || ""}
                      onChange={handleFormChange}
                    />
                  </td>
                </tr>
                <tr >
                  <td className={tableDataStyle}>Designation</td>
                  <td className={tableDataStyle}>
                    <input className={tableDataInputStyle}
                      id="approver.designation"
                      name="approver.designation"
                      type="text"
                      placeholder="Designation"
                      value={ptrInput.approver.designation || ""}
                      onChange={handleFormChange}
                    />
                  </td>
                  <td className={tableDataStyle}>
                    <input className={tableDataInputStyle}
                      id="issuer.designation"
                      name="issuer.designation"
                      type="text"
                      placeholder="Designation"
                      value={ptrInput.issuer.designation || ""}
                      onChange={handleFormChange}
                    />
                  </td>
                  <td className={tableDataStyle}>
                    <input className={tableDataInputStyle}
                      id="receiver.designation"
                      name="receiver.designation"
                      type="text"
                      placeholder="Designation"
                      value={ptrInput.receiver.designation || ""}
                      onChange={handleFormChange}
                    />
                  </td>
                </tr>

                <tr >
                  <td className={tableDataStyle}>Date</td>
                  <td className={tableDataStyle}>
                    <input className={tableDataInputStyle}
                      id="approver.date"
                      name="approver.date"
                      type="date"
                      placeholder="Date"
                      value={ptrInput.approver.date?.slice(0,10) || ""}
                      onChange={handleFormChange}
                    />
                  </td>
                  <td className={tableDataStyle}>
                    <input className={tableDataInputStyle}
                      id="issuer.date"
                      name="issuer.date"
                      type="date"
                      placeholder="Date"
                      value={ptrInput.issuer.date?.slice(0,10) || ""}
                      onChange={handleFormChange}
                    />
                  </td>
                  <td className={tableDataStyle}>
                    <input className={tableDataInputStyle}
                      id="receiver.date"
                      name="receiver.date"
                      type="date"
                      placeholder="Date"
                      value={ptrInput.receiver.date?.slice(0,10) || ""}
                      onChange={handleFormChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          <div className="flex items-center justify-center">
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

export default PTRForm