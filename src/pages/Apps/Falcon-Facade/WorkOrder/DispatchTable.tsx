import { NavLink } from "react-router-dom";
// import { IconFile } from "@tabler/icons"; 
import IconFile from "@/components/Icon/IconFile";
import React, { useEffect, useState, Fragment } from 'react';
import IconEye from "@/components/Icon/IconEye";
const DispatchTable = ({ dispatchData, openDispatchDetailsModal }) => {
  const [search, setSearch] = useState("");

  const filteredDispatches = dispatchData.filter((dispatch) => {
    console.log(dispatch, "dispatch data inside the tale")
    return (
      dispatch.products.some((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase()) ||
        product.vehicleNumber.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  return (
    <div className="panel mt-4 bg-slate-50">
      <div className="flex items-center justify-between mb-5">
        <h5 className="font-semibold text-lg dark:text-white-light">Dispatch Details</h5>
        <input
          type="text"
          className="form-input w-auto"
          placeholder="Search by Product Name or Vehicle Number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="datatables">
  <div className="overflow-x-auto">
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th>Dispatch ID</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>UOM</th>
          <th>Timestamp</th>
          <th>Vehicle Number</th> {/* Added Vehicle Number column */}
          <th>Docket Number</th> {/* Added Docket Number column */}
          <th>Files</th>
        </tr>
      </thead>
      <tbody>
        {filteredDispatches.map((dispatch) => (
          <React.Fragment key={dispatch.dispatchId}>
            {/* Dispatch Header Row */}
            <tr className="bg-gray-100 font-bold">
              <td colSpan={5}>Dispatch ID: {dispatch.dispatchId}</td>
              {/* Vehicle and Docket number for the dispatch */}
              <td>{dispatch.vehicleNumber}</td>
              <td>{dispatch.docketNumber}</td>
              <td>
                <IconFile />
              </td>
            </tr>
            {/* Products under Dispatch */}
            {dispatch.products.map((product, index) => (
              <tr key={index}>
                {/* Empty cell for dispatch ID, Vehicle, and Docket number */}
                <td></td>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{product.uom}</td>
                <td>{product.timestamp}</td>
                <td>
                  <NavLink
                    to={`/falcon-facade/dispatch/challan/${dispatch.dispatchId}`}
                    className="text-blue-500"
                    onClick={() => openDispatchDetailsModal(dispatch)}
                  >
                    <IconEye />
                  </NavLink>
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
</div>



    </div>
  );
};

export default DispatchTable;
