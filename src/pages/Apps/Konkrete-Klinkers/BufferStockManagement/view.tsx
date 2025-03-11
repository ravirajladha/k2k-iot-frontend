import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import Dropdown from '@/components/Dropdown';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconPlusCircle from '@/components/Icon/IconPlusCircle';

import 'swiper/css/navigation';
import 'swiper/css/pagination';


import Breadcrumbs from "@/pages/Components/Breadcrumbs";

interface BufferStockRecord {
    workOrderId: string;
    product_id: string;
    quantity: number;
    to_work_order_id: string;
    status: string;
    timestamp: string;
    createdBy: string;
}


const rowData: BufferStockRecord[] = [
    {
        workOrderId: 'WO1234',
        product_id: 'P1234',
        quantity: 500,
        to_work_order_id: 'WO5678',
        status: 'Active',
        timestamp: '2025-01-01 10:30 AM',
        createdBy: 'Bharath',
    },
    {
        workOrderId: 'WO5678',
        product_id: 'P5678',
        quantity: 200,
        to_work_order_id: 'WO1234',
        status: 'Completed',
        timestamp: '2025-01-02 11:00 AM',
        createdBy: 'Kunal',
    },
];

const BufferStockManagement = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Stock Management'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [modal10, setModal10] = useState(false);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

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
    const cols = [
        { accessor: 'materialCode', title: 'Material Code' },
        { accessor: 'productDescription', title: 'Product Description' },
        { accessor: 'quantity', title: 'Quantity' },
        { accessor: 'requiredQuantity', title: 'Required Quantity' },
        { accessor: 'bufferQuantity', title: 'Buffer Quantity' },
        { accessor: 'balanceQuantity', title: 'Balance Quantity' },
        { accessor: 'unitOfMeasurement', title: 'Unit of Measurement' },
        { accessor: 'noOfPiecesPerPunch', title: 'No. of Pieces Per Punch' },
        { accessor: 'qtyInBundle', title: 'Quantity in Bundle' },
        { accessor: 'qtyInNoPerBundle', title: 'Quantity in No. Per Bundle' },
        { accessor: 'status', title: 'Status' },
        { accessor: 'action', title: 'Actions' }, // Placeholder for actions like edit/delete.
    ];


    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '#', isActive: false },
        { label: 'Stock Managemenet', link: '/konkrete-klinkers/stockManagement', isActive: true },
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
                // Check all object values for a match with the search string
                return Object.values(item).some((value) =>
                    value.toString().toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                addButton={{ label: 'Add', link: '/konkrete-klinkers/stockManagement/create',
                    icon: <IconPlusCircle className="text-4xl" /> }}
                />

            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Inventories </h5>
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
                        records={recordsData}
                        columns={[
                            {
                                accessor: 'workOrderId',
                                title: 'Work Order ID',
                                sortable: true,
                            },
                            {
                                accessor: 'product_id', // Updated to match rowData key
                                title: 'Product ID',
                                sortable: true,
                            },
                            {
                                accessor: 'quantity',
                                title: 'Quantity',
                                sortable: true,
                            },
                            {
                                accessor: 'to_work_order_id', // Updated to match rowData key
                                title: 'To Work Order ID',
                                sortable: true,
                            },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: ({ status }) => (
                                    <span
                                        className={`px-2 py-1 text-sm font-medium rounded ${status === 'Active'
                                                ? 'bg-green-100 text-green-700'
                                                : status === 'Completed'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                    >
                                        {status}
                                    </span>
                                ),
                            },
                            {
                                accessor: 'timestamp',
                                title: 'Timestamp',
                                sortable: true,
                            },
                            {
                                accessor: 'createdBy',
                                title: 'Created By',
                                sortable: true,
                            },
                            {
                                accessor: 'actions',
                                title: 'Actions',
                                render: ({ workOrderId }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <NavLink to={`/edit/${workOrderId}`} className="flex hover:text-info">
                                            <span className="btn btn-sm btn-outline-primary">Edit</span>
                                        </NavLink>
                                        <NavLink to={`/view/${workOrderId}`} className="flex hover:text-primary">
                                            <span className="btn btn-sm btn-outline-secondary">View</span>
                                        </NavLink>
                                    </div>
                                ),
                            },
                        ]}
                        highlightOnHover
                        totalRecords={recordsData.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) =>
                            `Showing ${from} to ${to} of ${totalRecords} entries`
                        }
                    />





                </div>
            </div>
        </div>
    );
};

export default BufferStockManagement;
