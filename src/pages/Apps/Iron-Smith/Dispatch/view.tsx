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
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
const rowData = [
    {
        sl_no: 1,
        workOrder: 'WO12345',
        products: [
            { productId: 'PRD001', quantity: 10 },
            { productId: 'PRD002', quantity: 5 },
        ],
        invoiceNo: 'INV123456',
        rejectedQuantity: "22",
        vehicleNumber: 'KA-01-MC-1234',
        createdBy: 'Admin',
        timestamp: '2025-01-28T10:25:00Z',
    },
    {
        sl_no: 2,
        workOrder: 'WO12346',
        products: [
            { productId: 'PRD003', quantity: 8 },
            { productId: 'PRD004', quantity: 12 },
        ],
        invoiceNo: 'INV123457',
        rejectedQuantity: "22",

        vehicleNumber: 'KA-02-MC-5678',
        createdBy: 'User1',
        timestamp: '2025-01-28T11:30:00Z',
    },
    {
        sl_no: 3,
        workOrder: 'WO12347',
        products: [
            { productId: 'PRD005', quantity: 15 },
            { productId: 'PRD006', quantity: 7 },
            { productId: 'PRD007', quantity: 3 },
        ],
        invoiceNo: 'INV123458',
        rejectedQuantity: "22",

        vehicleNumber: 'KA-03-MC-9101',
        createdBy: 'Manager',
        timestamp: '2025-01-28T12:45:00Z',
    },
];

const ColumnChooser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Dispatch'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // show/hide
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
        { accessor: 'sl_no', title: 'SL No' },
        { accessor: 'workOrder', title: 'Work Order' },
        { accessor: 'productId', title: 'Product ID' },
        { accessor: 'rejectedQuantity', title: 'Rejected Quantity' },
        { accessor: 'createdBy', title: 'Created By' },
        { accessor: 'timestamp', title: 'Timestamp' },
        { accessor: 'action', title: 'Actions' },
    ];


    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Iron Smith', link: '#', isActive: false },
        { label: 'Dispatch', link: '/iron-smith/dispatch/view', isActive: true },
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
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                const productMatches = item.products.some(
                    (product) =>
                        product.productId.toLowerCase().includes(search.toLowerCase()) ||
                        product.quantity.toString().includes(search.toLowerCase())
                );

                return (
                    item.sl_no.toString().includes(search.toLowerCase()) ||
                    item.workOrder.toLowerCase().includes(search.toLowerCase()) ||
                    productMatches ||
                    item.rejectedQuantity.toString().includes(search.toLowerCase()) ||
                    item.createdBy.toLowerCase().includes(search.toLowerCase()) ||
                    item.timestamp.toLowerCase().includes(search.toLowerCase())
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
        addButton={{ label: 'Add Dispatch', link: '/iron-smith/dispatch/create',
            icon: <IconPlusCircle className="text-4xl" /> }}
        />


            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Dispatch</h5>
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
                                accessor: 'sl_no',
                                title: 'SL No',
                                sortable: true,
                                hidden: hideCols.includes('sl_no'),
                            },
                            {
                                accessor: 'workOrder',
                                title: 'Work Order',
                                sortable: true,
                                hidden: hideCols.includes('workOrder'),
                            },
                            {
                                accessor: 'products',
                                title: 'Shapes',
                                sortable: false, // Sorting can be tricky for arrays
                                hidden: hideCols.includes('products'),
                                render: ({ products }) => (
                                    <div>
                                        {products.map((product, index) => (
                                            <div key={index}>
                                                {product.productId} - {product.quantity}
                                            </div>
                                        ))}
                                    </div>
                                ),
                            },
                            {
                                accessor: 'rejectedQuantity',
                                title: 'Rejected Quantity',
                                sortable: true,
                                hidden: hideCols.includes('rejectedQuantity'),
                            },
                            {
                                accessor: 'createdBy',
                                title: 'Created By',
                                sortable: true,
                                hidden: hideCols.includes('createdBy'),
                            },
                            {
                                accessor: 'timestamp',
                                title: 'Timestamp',
                                sortable: true,
                                hidden: hideCols.includes('timestamp'),
                                render: ({ timestamp }) => (
                                    <div>{new Date(timestamp).toLocaleString()}</div>
                                ),
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                render: ({ sl_no }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <NavLink to={`/edit/${sl_no}`} className="flex hover:text-info">
                                            <IconEdit className="w-4.5 h-4.5" />
                                        </NavLink>
                                        <NavLink to={`/view/${sl_no}`} className="flex hover:text-primary">
                                            <IconEye className="w-4.5 h-4.5" />
                                        </NavLink>
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
                        paginationText={({ from, to, totalRecords }) =>
                            `Showing ${from} to ${to} of ${totalRecords} entries`
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ColumnChooser;
