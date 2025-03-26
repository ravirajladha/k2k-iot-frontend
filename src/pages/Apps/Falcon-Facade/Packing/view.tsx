import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import Dropdown from '@/components/Dropdown';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconPlusCircle from '@/components/Icon/IconPlusCircle';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
// import { Breadcrumbs } from '../../Breadcrumbs../components/Breadcrumbs';
// import { Breadcrumbs } from '@mantine/core';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import ViewDetailsModal from './viewModel';
const rowData = [
    {
        packing_id: 1,
        workOrderId: 'WO12345',
        jobOrder: 'JO98765',
        status: 'Pending',
        createdBy: 'Pending',
        timestamp: '2025-02-25 10:30 AM',

        products: [
            {
                productId: 'Inward Window',
                productName: 'Inward Window',
                uom: 'nos',
                semiFinishedProducts: [
                    {
                        sfId: 'SF1',
                        quantity: 3, // This means 3 QR codes will be generated for this SF
                        qrCodes: ['QR1', 'QR2', 'QR3'],
                    },
                    {
                        sfId: 'SF2',
                        quantity: 2, // This means 2 QR codes will be generated for SF2
                        qrCodes: ['QR4', 'QR5'],
                    },
                ],
            },
            {
                productId: 'Outward Window',
                productName: 'Outward Window',
                uom: 'nos',
                semiFinishedProducts: [
                    {
                        sfId: 'SF3',
                        quantity: 1, // 1 QR code for SF3
                        qrCodes: ['QR6'],
                    },
                ],
            },
        ],
    },
    {
        packing_id: 2, // Added new row data
        workOrderId: 'WO12346',
        jobOrder: 'JO98766',
        status: 'Completed',
        createdBy: 'Pending',
        timestamp: '2025-02-25 10:30 AM',
        products: [
            {
                productId: 'Facade',
                productName: 'Facade',
                uom: 'nos',
                semiFinishedProducts: [
                    {
                        sfId: 'SF4',
                        quantity: 4, // This means 4 QR codes will be generated for SF4
                        qrCodes: ['QR7', 'QR8', 'QR9', 'QR10'],
                    },
                ],
            },
            {
                productId: 'Curtain Wall',
                productName: 'Curtain Wall',
                uom: 'nos',
                semiFinishedProducts: [
                    {
                        sfId: 'SF5',
                        quantity: 5, // This means 5 QR codes will be generated for SF5
                        qrCodes: ['QR11', 'QR12', 'QR13', 'QR14', 'QR15'],
                    },
                ],
            },
        ],
    },
    // You can add more rows here as needed
];

const Packing = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Packing'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // show/hide
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [modalType, setModalType] = useState<'view' | null>(null);
    const [selectedRowData, setSelectedRowData] = useState<any>(null);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [hideCols, setHideCols] = useState<any>(['age', 'dob', 'isActive']);

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    const openModal = (type: 'view', packing_id: number) => {
        // Find the specific row using packing_id
        const selectedRow = rowData.find((row) => row.packing_id === packing_id);

        // Log the found row data for debugging
        console.log(selectedRow, 'selectedRowData');

        // Set the row data to show in the modal
        setSelectedRowData(selectedRow);
        setModalType(type);
    };

    const closeModal = () => {
        setModalType(null); // Close the modal
        setSelectedRowData(null); // Clear the selected row data
    };

    const cols = [
        { accessor: 'packing_id', title: 'SL No' },
        { accessor: 'workOrder', title: 'Work Order' },
        // { accessor: 'jobOrder', title: 'Job Order' },
        { accessor: 'productId', title: 'Product ID' },
        { accessor: 'rejectedQuantity', title: 'Rejected Quantity' },
        { accessor: 'qrCode', title: 'QR Code String' },
        { accessor: 'status', title: 'Status' },
        { accessor: 'createdBy', title: 'Created By' },
        { accessor: 'timestamp', title: 'Timestamp' },
        { accessor: 'action', title: 'Actions' },
    ];

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '#', isActive: false },
        { label: 'Packing', link: '/falcon-facade/packing/view', isActive: true },
    ];

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                // Check against row-level properties like packing_id and workOrderId
                const matchesRowData =
                    item.packing_id.toString().includes(search.toLowerCase()) ||
                    item.workOrderId.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.toLowerCase().includes(search.toLowerCase()) ||
                    item.createdBy.toLowerCase().includes(search.toLowerCase()) ||
                    item.timestamp.toLowerCase().includes(search.toLowerCase());

                // Check against properties inside the products array
                const matchesProductData = item.products.some(
                    (product) =>
                        product.productId.toLowerCase().includes(search.toLowerCase()) ||
                        product.semiFinishedProducts.some(
                            (sf) =>
                                sf.sfId.toLowerCase().includes(search.toLowerCase()) || // Check SF id
                                sf.qrCodes.some((qrCode) => qrCode.toLowerCase().includes(search.toLowerCase())) // Check qrCodes in SF
                        )
                );

                // Return true if any condition matches
                return matchesRowData || matchesProductData;
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Add Packing',
                    link: '/falcon-facade/packing/create',
                    icon: <IconPlusCircle className="text-4xl" />,
                }}
            />

            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Packing</h5>
                    <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                        <div className="flex md:items-center md:flex-row flex-col gap-5">
                            <div className="dropdown">
                                <Dropdown
                                    placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                    btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                    button={
                                        <>
                                            <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                            <IconCaretDown className="w-5 h-5" />
                                        </>
                                    }
                                >
                                    <ul className="!min-w-[140px]">
                                        {cols.map((col, i) => {
                                            return (
                                                <li
                                                    key={i}
                                                    className="flex flex-col"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <div className="flex items-center px-4 py-1">
                                                        <label className="cursor-pointer mb-0">
                                                            <input
                                                                type="checkbox"
                                                                checked={!hideCols.includes(col.accessor)}
                                                                className="form-checkbox"
                                                                defaultValue={col.accessor}
                                                                onChange={(event: any) => {
                                                                    setHideCols(event.target.value);
                                                                    showHideColumns(col.accessor, event.target.checked);
                                                                }}
                                                            />
                                                            <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="text-right">
                            <input type="text" className="form-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={rowData}
                        columns={[
                            {
                                accessor: 'packing_id',
                                title: 'Packing ID',
                                sortable: true,
                            },
                            {
                                accessor: 'workOrderId',
                                title: 'Work Order ID',
                                sortable: true,
                            },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                            },
                            {
                                accessor: 'productId',
                                title: 'Product Name',
                                render: ({ products }) => products.map((product) => product.productId).join(', '),
                                sortable: true,
                            },
                            {
                                accessor: 'qrCode',
                                title: 'QR Codes',
                                render: ({ products }) => {
                                    // Concatenate all QR codes for each product
                                    const qrCodes = products.flatMap((product) => product.semiFinishedProducts.flatMap((sf) => sf.qrCodes));
                                    return qrCodes.join(', ');
                                },
                                sortable: true,
                            },
                            {
                                accessor: 'rejectedQuantity',
                                title: 'Rejected Quantity',
                                render: ({ products }) => products.reduce((total, product) => total + product.semiFinishedProducts.reduce((sfTotal, sf) => sfTotal + sf.quantity, 0), 0),
                                sortable: true,
                            },
                            {
                                accessor: 'createdBy',
                                title: 'Created By',
                                sortable: true,
                            },
                            {
                                accessor: 'timestamp',
                                title: 'Timestamp',
                                sortable: true,
                                render: ({ timestamp }) => new Date(timestamp).toLocaleString(),
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                render: ({ packing_id }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        {/* <NavLink to={`/edit/${packing_id}`} className="flex hover:text-info">
            <IconEdit className="w-4.5 h-4.5" />
          </NavLink> */}
                                        <button
                                            onClick={() => openModal('view', packing_id)} // Pass packing_id to openModal
                                            className="flex hover:text-primary"
                                        >
                                            <IconEye className="w-4.5 h-4.5" />
                                           
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        highlightOnHover
                        totalRecords={rowData.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                    />

                    {modalType === 'view' && selectedRowData && <ViewDetailsModal isOpen={modalType === 'view'} closeModal={closeModal} data={selectedRowData} />}
                </div>
            </div>
        </div>
    );
};

export default Packing;
