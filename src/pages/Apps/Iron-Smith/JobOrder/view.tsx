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
import IconEye from '@/components/Icon/IconEye';
import IconX from '@/components/Icon/IconX';
import { rowData } from './sampleData';


// import { Breadcrumbs } from '../../Breadcrumbs../components/Breadcrumbs';
// import { Breadcrumbs } from '@mantine/core';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
interface Product {
    productId: string;
    uom: string;
    poQuantity: number;
    achievedTillNow: number;
    rejectedQuantity: number;
    plannedQuantity: number;
    date: string;
}

interface JobOrder {
    id: number;
    jobOrderId: string;
    workOrderId: string;
    fromDate: string;
    toDate: string;
    plantName: string;
    factoryName: string;
    clientName: string;
    projectName: string;
    products: Product[];
}

const ColumnChooser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Job Order / Planning'));
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

    const [hideCols, setHideCols] = useState<any>(['plantName', 'clientName']);

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

    // data table modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJobOrder, setSelectedJobOrder] = useState<JobOrder | null>(null);

    const handleViewDetails = (jobOrder: JobOrder) => {
        setSelectedJobOrder(jobOrder);
        setIsModalOpen(true);
    };

    const cols = [
        { accessor: 'id', title: 'Serial Number' },
        { accessor: 'jobOrderId', title: 'Job Order ID' },
        { accessor: 'workOrderId', title: 'Work Order ID' },
        { accessor: 'fromDate', title: 'From Date' },
        { accessor: 'toDate', title: 'To Date' },
        { accessor: 'plantName', title: 'Plant Name' },
        // { accessor: 'factoryName', title: 'Factory Name' },
        { accessor: 'clientName', title: 'Client Name' },
        { accessor: 'projectName', title: 'Project Name' },
        { accessor: 'action', title: 'Actions' },
    ];

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Iron Smith', link: '#', isActive: false },
        { label: 'Job Order / Planning', link: '/iron-smiths/job-order/view', isActive: true },
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
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.jobOrderId.toLowerCase().includes(search.toLowerCase()) ||
                    item.workOrderId.toLowerCase().includes(search.toLowerCase()) ||
                    item.fromDate.toLowerCase().includes(search.toLowerCase()) ||
                    item.toDate.toLowerCase().includes(search.toLowerCase()) ||
                    item.plantName.toLowerCase().includes(search.toLowerCase()) ||
                    // item.factoryName.toLowerCase().includes(search.toLowerCase()) ||
                    item.clientName.toLowerCase().includes(search.toLowerCase()) ||
                    item.projectName.toLowerCase().includes(search.toLowerCase())
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
                    label: 'Add Job Order', 
                    link: '/iron-smith/job-order/create',
                    icon: <IconPlusCircle className="text-4xl" />
                }}
            />


            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Job Order / Planning</h5>
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
                            { accessor: 'id', title: 'Serial Number', sortable: true, hidden: hideCols.includes('id') },
                            {
                                accessor: 'jobOrderId',
                                title: 'Job Order ID',
                                sortable: true,
                                hidden: hideCols.includes('jobOrderId'),
                            },
                            {
                                accessor: 'workOrderId',
                                title: 'Work Order ID',
                                sortable: true,
                                hidden: hideCols.includes('workOrderId'),
                            },
                            {
                                accessor: 'fromDate',
                                title: 'From Date',
                                sortable: true,
                                hidden: hideCols.includes('fromDate'),
                                render: ({ fromDate }) => <div>{formatDate(fromDate)}</div>,
                            },
                            {
                                accessor: 'toDate',
                                title: 'To Date',
                                sortable: true,
                                hidden: hideCols.includes('toDate'),
                                render: ({ toDate }) => <div>{formatDate(toDate)}</div>,
                            },
                            {
                                accessor: 'plantName',
                                title: 'Plant Name',
                                sortable: true,
                                hidden: hideCols.includes('plantName'),
                            },
                            // {
                            //     accessor: 'factoryName',
                            //     title: 'Factory Name',
                            //     sortable: true,
                            //     hidden: hideCols.includes('factoryName'),
                            // },
                            {
                                accessor: 'clientName',
                                title: 'Client Name',
                                sortable: true,
                                hidden: hideCols.includes('clientName'),
                            },
                            {
                                accessor: 'projectName',
                                title: 'Project Name',
                                sortable: true,
                                hidden: hideCols.includes('projectName'),
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                render: (jobOrder) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <button className="flex hover:text-primary" onClick={() => handleViewDetails(jobOrder)}>
                                            <IconEye />
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        highlightOnHover
                        totalRecords={initialRecords.length}
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

                    {/* Job Order Details Modal */}
                    <Transition appear show={isModalOpen} as={Fragment}>
                        <Dialog as="div" open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                                                Job Order Details
                                                <button className="bg-blue-500 text-white px-6 py-1 mr-10  rounded-md" onClick={() => window.print()}>
                                                    Print
                                                </button>
                                            </div>
                                            <div className="p-5">
                                                {selectedJobOrder ? (
                                                    <>
                                                        {/* Job Order Main Details */}
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <p className="text-sm font-semibold">Work Order:</p>
                                                                <p className="text-sm">{selectedJobOrder.workOrderId}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold">Job Order:</p>
                                                                <p className="text-sm">{selectedJobOrder.jobOrderId}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold">Client:</p>
                                                                <p className="text-sm">{selectedJobOrder.clientName}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold">Project:</p>
                                                                <p className="text-sm">{selectedJobOrder.projectName}</p>
                                                            </div>
                                                        </div>

                                                        {/* Product Details */}
                                                        <h3 className="mt-4 text-lg font-semibold">Product Details</h3>
                                                        <table className="w-full border mt-2">
                                                            <thead>
                                                                <tr className="bg-gray-100">
                                                                    <th className="p-2 border">Product ID</th>
                                                                    <th className="p-2 border">UOM</th>
                                                                    <th className="p-2 border">PO Qty</th>
                                                                    <th className="p-2 border">Achieved</th>
                                                                    <th className="p-2 border">Rejected</th>
                                                                    <th className="p-2 border">Planned</th>
                                                                    <th className="p-2 border">Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {selectedJobOrder.products.map((product, index) => (
                                                                    <tr key={index} className="border">
                                                                        <td className="p-2 border">{product.productId}</td>
                                                                        <td className="p-2 border">{product.uom}</td>
                                                                        <td className="p-2 border">{product.poQuantity}</td>
                                                                        <td className="p-2 border">{product.achievedTillNow}</td>
                                                                        <td className="p-2 border">{product.rejectedQuantity}</td>
                                                                        <td className="p-2 border">{product.plannedQuantity}</td>
                                                                        <td className="p-2 border">{product.date}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </>
                                                ) : (
                                                    <p className="text-sm text-gray-500">No job order selected.</p>
                                                )}
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>


                </div>

            </div>
        </div>
    );
};

export default ColumnChooser;
