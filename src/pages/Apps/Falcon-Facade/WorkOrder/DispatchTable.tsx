import { useState } from "react";
import { DataTable } from "mantine-datatable";
import { NavLink } from "react-router-dom";
import IconEye from "@/components/Icon/IconEye";
import IconFile from "@/components/Icon/IconFile";

const DispatchTable = ({ dispatchData, openDispatchDetailsModal }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filtered dispatch data based on search
  const filteredDispatches = dispatchData.filter((dispatch) =>
    dispatch.products.some((product) =>
      product.productName.toLowerCase().includes(search.toLowerCase()) ||
      dispatch.vehicleNumber.toLowerCase().includes(search.toLowerCase())
    )
  );

  // Flatten data for Mantine DataTable (keeping Dispatch ID grouped)
  const tableData = filteredDispatches.flatMap((dispatch) =>
    dispatch.products.map((product, index) => ({
      id: `${dispatch.dispatchId}-${index}`,
      dispatchId: index === 0 ? dispatch.dispatchId : "", // Show dispatch ID only once
      productName: product.productName,
      quantity: product.quantity,
      uom: product.uom,
      timestamp: product.timestamp,
      vehicleNumber: dispatch.vehicleNumber,
      docketNumber: dispatch.docketNumber,
      dispatchObj: dispatch, // Ensure dispatchObj exists
    }))
  );

  return (
    <div className="panel bg-slate-50">
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
        <DataTable
          striped
          className="whitespace-nowrap table-striped"
          records={tableData}
          columns={[
            { accessor: "dispatchId", title: "Dispatch ID" },
            { accessor: "productName", title: "Product Name" },
            { accessor: "quantity", title: "Quantity" },
            { accessor: "uom", title: "UOM" },
            { accessor: "timestamp", title: "Timestamp" },
            { accessor: "vehicleNumber", title: "Vehicle Number" },
            { accessor: "docketNumber", title: "Docket Number" },
            {
              accessor: "actions",
              title: "Actions",
              render: (row: typeof tableData[number]) => (
                <div className="flex space-x-2">
                  {/* Open Modal Button */}
                  <button
                    className="text-blue-500 px-2"
                    onClick={() => openDispatchDetailsModal(row.dispatchObj)}
                  >
                    <IconEye />
                  </button>

                  {/* Challan Redirect Link */}
                  <NavLink
                    to={`/falcon-facade/dispatch/challan`}
                    className="text-blue-500 px-2"
                  >
                    <IconFile />
                  </NavLink>
                </div>
              ),
            },
          ]}
          totalRecords={tableData.length}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={setPage}
          recordsPerPageOptions={[10, 20, 30]}
          onRecordsPerPageChange={setPageSize}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Showing ${from} to ${to} of ${totalRecords} entries`
          }
        />
      </div>
    </div>
  );
};

export default DispatchTable;
