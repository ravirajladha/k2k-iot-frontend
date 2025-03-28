import { useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { NavLink } from 'react-router-dom';
import IconEye from '@/components/Icon/IconEye';
import IconFile from '@/components/Icon/IconFile';

const QcCheckTable = ({ qcCheckData, openQcCheckDetailsModal }) => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filter QC check data based on search
    const filteredQcChecks = qcCheckData.filter((qcCheck) => qcCheck.products.some((product) => product.productName.toLowerCase().includes(search.toLowerCase())));

    // Flatten data for Mantine DataTable (keeping QC Check ID grouped)
    const tableData = filteredQcChecks.flatMap((qcCheck) =>
        qcCheck.products.map((product, index) => ({
            id: `${qcCheck.workOrderId}-${index}`,
            workOrderId: index === 0 ? qcCheck.workOrderId : '', // Show workOrderId only once
            jobOrderId: qcCheck.jobOrderId,
            productName: product.productName,
            uom: product.uom,
            quantity: product.quantity,
            qcCheckObj: qcCheck, // Ensure qcCheckObj exists
        }))
    );

    return (
        <div className="panel bg-slate-50">
            <div className="flex items-center justify-between mb-5">
                <h5 className="font-semibold text-lg dark:text-white-light">QC Check Details</h5>
                <input type="text" className="form-input w-auto" placeholder="Search by Product Name..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div className="datatables">
                <DataTable
                    striped
                    className="whitespace-nowrap table-striped"
                    records={tableData}
                    columns={[
                        { accessor: 'workOrderId', title: 'Work Order ID' },
                        { accessor: 'jobOrderId', title: 'Job Order ID' },
                        { accessor: 'productName', title: 'Product Name' },
                        { accessor: 'uom', title: 'UOM' },
                        { accessor: 'quantity', title: 'Quantity' },
                        {
                            accessor: 'actions',
                            title: 'Actions',
                            render: (row) => (
                                <div className="flex space-x-2">
                                    {/* Open Modal Button */}
                                    <button
                                        className="text-blue-500 px-2"
                                        // onClick={() => openQcCheckDetailsModal(row.qcCheckObj)}
                                    >
                                        <IconEye />
                                    </button>

                                    {/* Challan Redirect Link */}
                                    {/* <NavLink to={`/falcon-facade/qc-check/challan`} className="text-blue-500 px-2">
                                        <IconFile />
                                    </NavLink> */}
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
                    paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                />
            </div>
        </div>
    );
};

export default QcCheckTable;
