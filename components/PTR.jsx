import React from 'react'
const PTR = () => {
    const getDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate().toString().padStart(2, '0');
    
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
      }
  return (
    <main className="container mx-auto py-8 flex-grow">
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Generate PTR Form</h2>
       {/* Simple Form */}
       <form>
        <div className="grid grid-cols-2">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Entity Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Entity Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Fund Cluster
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Cluster"
            />
          </div>
          </div>


        <div className="grid grid-cols-2">
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                From Accountable Officer/Agency/Fund Cluster
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Accountable Officer/Agency/Fund Cluster"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                To Accountable Officer/Agency/Fund Cluster
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Accountable Officer/Agency/Fund Cluster"
              />
            </div>
          </div>
          <div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              PTR No. (AutoGenerated)
            </label>
            <input
                className=" appearance-none   w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               
                disabled={true}
              />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Date {getDate()}
            </label>
            <div
                className=" appearance-none   w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               
                disabled={true}
              />
          </div>
          </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Transfer Type:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Transfer Type"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Reason for Transfer:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Reason for Transfer"
            />
          </div>
          <div className="bg-white shadow-md rounded my-6">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">

            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Approved by:
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Released/Issued by:
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Received by:
            </th>
          </tr>
        </thead>
        <tbody>
            <tr >
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">Signature</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">Printed Name</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">Designation</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">Date</td>
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

export default PTR