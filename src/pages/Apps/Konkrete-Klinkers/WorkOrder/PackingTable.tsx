import { useState } from "react";
import { DataTable } from "mantine-datatable";
import IconEye from "@/components/Icon/IconEye";

const PackingTable = ({ packingData, openPackingDetailsModal }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter Data
  const filteredData = packingData.filter((row) =>
    row.workOrderId.toLowerCase().includes(search.toLowerCase()) ||
    row.jobOrder.toLowerCase().includes(search.toLowerCase()) ||
    row.packing_id.toString().includes(search.toLowerCase())
  );

  // Flattened data for table (batch-wise breakdown)
  const tableData = filteredData.flatMap((row) =>
    row.products.flatMap((product) =>
      product.semiFinishedProducts.map((batch, index) => ({
        id: `${row.packing_id}-${product.productId}-${batch.sfId}`,
        packingId: index === 0 ? row.packing_id : "",
        workOrderId: index === 0 ? row.workOrderId : "",
        jobOrder: index === 0 ? row.jobOrder : "",
        productName: product.productName,
        uom: product.uom,
        batchId: batch.sfId,
        quantity: batch.quantity,
        qrCodes: batch.qrCodes.join(", "), // Display as a string
        fullData: row, // Store full row for modal
      }))
    )
  );

  return (
    <div className="panel bg-slate-50">
      <div className="flex items-center justify-between mb-5">
        <h5 className="font-semibold text-lg dark:text-white-light">Packing Details</h5>
        <input
          type="text"
          className="form-input w-auto"
          placeholder="Search Work Order, Job Order, Packing ID..."
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
            { accessor: "packingId", title: "Packing ID" },
            { accessor: "workOrderId", title: "Work Order ID" },
            { accessor: "jobOrder", title: "Job Order ID" },
            { accessor: "productName", title: "Product Name" },
            { accessor: "uom", title: "UOM" },
            { accessor: "batchId", title: "Batch ID" },
            { accessor: "quantity", title: "Quantity" },
            { accessor: "qrCodes", title: "QR Codes" },
            {
              accessor: "details",
              title: "Details",
              render: (row: typeof tableData[number]) => (
                <button
                  className="px-4 py-2 text-blue-500"
                  onClick={() => openPackingDetailsModal(row.fullData)}
                >
                  <IconEye />
                </button>
              ),
            },
          ]}
          totalRecords={tableData.length}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
          recordsPerPageOptions={[10, 20, 30]}
          onRecordsPerPageChange={setPageSize}
          minHeight={200}
        />
      </div>
    </div>
  );
};

export default PackingTable;
