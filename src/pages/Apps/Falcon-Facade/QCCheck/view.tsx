import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';

import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import Dropdown from '@/components/Dropdown';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconPlusCircle from '@/components/Icon/IconPlusCircle';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconTrash from '@/components/Icon/IconTrash';

import IconEye from '@/components/Icon/IconEye';
import IconX from '@/components/Icon/IconX';

// import { Breadcrumbs } from '../../Breadcrumbs../components/Breadcrumbs';
// import { Breadcrumbs } from '@mantine/core';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
const rowData = [
    {
        sl_no: 1,
        workOrder: 'WO12345',
        jobOrder: 'JO98765',
        productId: 'PRD001',
        rejectedQuantity: 5,
        recycledQuantity: 3,
        remark: 'Glass glazing fix',

        createdBy: 'Admin',
        timestamp: '2025-01-28T10:25:00Z',
    },
    {
        sl_no: 2,
        workOrder: 'WO12346',
        jobOrder: 'JO98766',
        productId: 'PRD002',
        rejectedQuantity: 2,
        recycledQuantity: 1,
        remark: 'Cutting issue',

        createdBy: 'User1',
        timestamp: '2025-01-28T11:30:00Z',
    },
    {
        sl_no: 3,
        workOrder: 'WO12347',
        jobOrder: 'JO98767',
        productId: 'PRD003',
        rejectedQuantity: 8,
        recycledQuantity: 5,
        remark: 'Assembling mismatch a/c to documents',
        createdBy: 'Manager',
        timestamp: '2025-01-28T12:45:00Z',
    },
];

const ColumnChooser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Quality Control Check'));
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
        { accessor: 'jobOrder', title: 'Job Order' },
        { accessor: 'productId', title: 'Product ID' },
        { accessor: 'rejectedQuantity', title: 'Rejected Quantity' },
        { accessor: 'recycledQuantity', title: 'Recycled Quantity' },
        { accessor: 'remark', title: 'Remark' },
        { accessor: 'createdBy', title: 'Created By' },
        { accessor: 'timestamp', title: 'Timestamp' },
        { accessor: 'action', title: 'Actions' },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQCCheck, setSelectedQCCheck] = useState<any | null>(null); // Selected QC Check Data

    const handleViewDetails = (qcCheck: any) => {
        setSelectedQCCheck(qcCheck);
        setIsModalOpen(true);
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '#', isActive: false },
        { label: 'QC Check', link: '/falcon-facade/qc-check/view', isActive: true },
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
                return (
                    item.sl_no.toString().includes(search.toLowerCase()) ||
                    item.workOrder.toLowerCase().includes(search.toLowerCase()) ||
                    item.jobOrder.toLowerCase().includes(search.toLowerCase()) ||
                    item.productId.toLowerCase().includes(search.toLowerCase()) ||
                    item.rejectedQuantity.toString().includes(search.toLowerCase()) ||
                    item.recycledQuantity.toString().includes(search.toLowerCase()) ||
                    item.remark.toString().includes(search.toLowerCase()) ||
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
                addButton={{
                    label: 'Add QC Check',
                    link: '/falcon-facade/qc-check/create',
                    icon: <IconPlusCircle className="text-4xl" />,
                }}
            />

            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">QC Check</h5>
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
                                accessor: 'jobOrder',
                                title: 'Job Order',
                                sortable: true,
                                hidden: hideCols.includes('jobOrder'),
                            },
                            {
                                accessor: 'productId',
                                title: 'Product ID',
                                sortable: true,
                                hidden: hideCols.includes('productId'),
                            },
                            {
                                accessor: 'rejectedQuantity',
                                title: 'Rejected Quantity',
                                sortable: true,
                                hidden: hideCols.includes('rejectedQuantity'),
                            },
                            {
                                accessor: 'recycledQuantity',
                                title: 'Recycled Quantity',
                                sortable: true,
                                hidden: hideCols.includes('recycledQuantity'),
                            },
                            {
                                accessor: 'remark',
                                title: 'Remark',
                                sortable: true,
                                hidden: hideCols.includes('remark'),
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
                                render: ({ timestamp }) => <div>{new Date(timestamp).toLocaleString()}</div>,
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                render: (qcCheck) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        {/* <NavLink to={`/edit/${qcCheck.sl_no}`} className="flex hover:text-info">
                                            <IconEdit className="w-4.5 h-4.5" />
                                        </NavLink> */}
                                        <button className="flex hover:text-primary" onClick={() => handleViewDetails(qcCheck)}>
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
                </div>

                {/* QC Check Details Modal */}
                <Transition appear show={isModalOpen} as={Fragment}>
                    <Dialog as="div" open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/60" />
                        </Transition.Child>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center px-4 py-8">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-2xl text-black dark:text-white-dark">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        >
                                            <IconX />
                                        </button>
                                        <div className="text-lg font-medium bg-gray-100 dark:bg-gray-900 p-5 flex justify-between">
                                            QC Check Details
                                            <button className="bg-blue-500 text-white px-6 py-1 mr-10  rounded-md" onClick={() => window.print()}>
                                                Print
                                            </button>
                                        </div>
                                        <div className="p-5">
                                            {selectedQCCheck ? (
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm font-semibold">SL No:</p>
                                                        <p className="text-sm">{selectedQCCheck.sl_no}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">Work Order:</p>
                                                        <p className="text-sm">{selectedQCCheck.workOrder}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">Job Order:</p>
                                                        <p className="text-sm">{selectedQCCheck.jobOrder}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">Product ID:</p>
                                                        <p className="text-sm">{selectedQCCheck.productId}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">Rejected Quantity:</p>
                                                        <p className="text-sm">{selectedQCCheck.rejectedQuantity}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">Recycled Quantity:</p>
                                                        <p className="text-sm">{selectedQCCheck.recycledQuantity}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">Created By:</p>
                                                        <p className="text-sm">{selectedQCCheck.createdBy}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">Timestamp:</p>
                                                        <p className="text-sm">{new Date(selectedQCCheck.timestamp).toLocaleString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">Remark:</p>
                                                        <p className="text-sm">Brick broken due to excess water.</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500">No QC check selected.</p>
                                            )}
                                            <div className="mt-5 flex justify-end">
                                                <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={() => setIsModalOpen(false)}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
};

export default ColumnChooser;
