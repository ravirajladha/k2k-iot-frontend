import { useState } from "react";
import { DataTable } from "mantine-datatable";

const PackingTable = ({ rowData, openPackingDetailsModal }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filtered data based on the search term
  const filteredData = rowData.filter((row) => {
    return (
      row.workOrderId.toLowerCase().includes(search.toLowerCase()) ||
      row.jobOrder.toLowerCase().includes(search.toLowerCase()) ||
      row.packing_id.toString().includes(search.toLowerCase())
    );
  });

  return (
    <div className="panel bg-slate-50">
      <div className="flex items-center justify-between mb-5">
        <h5 className="font-semibold text-lg dark:text-white-light">Packing Details</h5>
        <input
          type="text"
          className="form-input w-auto"
          placeholder="Search by Serial Number or Product ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="datatables">
        <DataTable
          striped
          className="whitespace-nowrap table-striped"
          records={filteredData}
          columns={[
            { accessor: 'workOrderId', title: 'Work Order ID' },
            { accessor: 'jobOrder', title: 'Job Order ID' },
            { accessor: 'packing_id', title: 'Packing ID' },
            { accessor: 'timestamp', title: 'Date' },
            { accessor: 'createdBy', title: 'Created By' },
            { accessor: 'timestamp', title: 'Created At' },
            {
              accessor: 'details',  // Add a column for the button
              title: 'Details',
              render: (row) => (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => openPackingDetailsModal(row)}
                >
                  View Details
                </button>
              ),
            },
          ]}
          totalRecords={filteredData.length}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
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

export default PackingTable;
