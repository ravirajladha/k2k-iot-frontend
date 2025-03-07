import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import sortBy from 'lodash/sortBy';

import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import IconChecks from '@/components/Icon/IconChecks';
import IconPause from "react-icons/fa";
import IconPlayCircle from '@/components/Icon/IconPlayCircle';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import Dropdown from '@/components/Dropdown';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';

// import { FaPause, FaPlay, FaCheck, FaEye, FaEdit } from "react-icons/fa";


import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import IconX from '@/components/Icon/IconX';
import IconPlusCircle from '@/components/Icon/IconPlusCircle';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import IconTrash from '@/components/Icon/IconTrash';
import QCCheckModal from './QCCheckModal';
import { ModalOutlet } from './ModalOutlet';

// Type definition for WorkOrder
interface WorkOrder {
    slNo: number;
    jobOrderId: string;
    workOrderId: string;
    product: string;
    quantity: number;
    completedQuantity: number;
    sf: string;
    createdAt: string;
    createdBy: string;
}

const rowData: WorkOrder[] = [
    {
        slNo: 1,
        jobOrderId: "JOB-001",
        workOrderId: "WO-1001",
        product: "Inward Door",
        quantity: 100,
        sf: "SF1",
        completedQuantity: 80,
        createdAt: "2024-02-17 14:30",
        createdBy: "user1",
    },
    {
        slNo: 2,
        jobOrderId: "JOB-002",
        workOrderId: "WO-1002",
        product: "Fixed Door",
        quantity: 200,
        sf: "SF2",
        completedQuantity: 200,
        createdAt: "2024-02-16 10:15",
        createdBy: "user2",
    },
    {
        slNo: 3,
        jobOrderId: "JOB-003",
        workOrderId: "WO-1003",
        product: "Fixed Window",
        sf: "SF1",
        quantity: 50,
        completedQuantity: 20,
        createdAt: "2024-02-15 12:45",
        createdBy: "user3",
    },
    {
        slNo: 4,
        jobOrderId: "JOB-004",
        workOrderId: "WO-1004",
        product: "Facade",
        sf: "SF2",
        quantity: 500,
        completedQuantity: 450,
        createdAt: "2024-02-14 08:00",
        createdBy: "user4",
    },
];
const ProductView = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Production - Falcon Facade'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [modal10, setModal10] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<WorkOrder | null>(null);
    // const [recordsData, setRecordsData] = useState<WorkOrder[]>(initialData);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'createdAt', // Ensure this exists in WorkOrder
        direction: 'asc',
    });

    // show/hide
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [modalType, setModalType] = useState<"view" | "updateCompletedQuantity" | "qcCheck" | null>(null);
    const [selectedData, setSelectedData] = useState(null);
    const openModal = (type: "view" | "updateCompletedQuantity" | "qcCheck", jobOrderId: string) => {
        // Find the selected row by jobOrderId
        const selectedRow = rowData.find((row) => row.jobOrderId === jobOrderId);
        console.log("Opening Modal with Data:", selectedRow); // Log the selected row
    
        setModalType(type);  // Set the modal type (view, updateCompletedQuantity, qcCheck)
        setSelectedData(selectedRow);  // Pass only the selected row
        setModal10(true);  // Open the modal
    };
    
    
    const [search, setSearch] = useState('');
    // const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    //     columnAccessor: 'id',
    //     direction: 'asc',
    // });

    const [hideCols, setHideCols] = useState<any>(['quantity']);

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };


    const handleStartJob = (jobOrderId) => {
        alert(`Job with ID ${jobOrderId} started.`);
        // TODO: Implement API call or actual functionality to start the job
    };
    
    const handleStopJob = (jobOrderId) => {
        alert(`Job with ID ${jobOrderId} stopped.`);
        // TODO: Implement API call or actual functionality to stop the job
    };
    
    const handleCompleteJob = (jobOrderId) => {
        alert(`Job with ID ${jobOrderId} marked as completed.`);
        // TODO: Implement API call or actual functionality to mark the job as complete
    };

    const cols = [
        { accessor: 'materialCode', title: 'Material Code' },
        // { accessor: 'productDescription', title: 'Product Description' },
        { accessor: 'plantCode', title: 'Plant Code' },
        { accessor: 'unitOfMeasurement', title: 'Unit of Measurement' },
        { accessor: 'noOfPiecesPerPunch', title: 'No. of Pieces Per Punch' },
        { accessor: 'qtyInBundle', title: 'Quantity in Bundle' },
        { accessor: 'sf', title: 'Semi Finished' },
        { accessor: 'qtyInNoPerBundle', title: 'Quantity in No. Per Bundle' },
        { accessor: 'status', title: 'Status' },
        { accessor: 'action', title: 'Actions' }, // Placeholder for actions like edit/delete.
    ];

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '#', isActive: false },
        { label: 'Products', link: '/falcon-facade/products', isActive: true },
    ];

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // useEffect(() => {
    //     setInitialRecords(() => {
    //         return rowData.filter((item) => {
    //             return (
    //                 item.materialCode.toString().includes(search.toLowerCase()) ||
    //                 item.productDescription.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.plantCode.toString().includes(search.toLowerCase()) ||

    //                 item.unitOfMeasurement.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.noOfPiecesPerPunch.toString().includes(search.toLowerCase()) ||
    //                 item.qtyInBundle.toString().includes(search.toLowerCase()) ||
    //                 item.qtyInNoPerBundle.toString().includes(search.toLowerCase()) ||
    //                 item.status.toLowerCase().includes(search.toLowerCase())
    //             );
    //         });
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [search]);


    const columns = [
        { accessor: "slNo", title: "Sl. No", sortable: true },
        { accessor: "jobOrderId", title: "Job Order ID", sortable: true },
        { accessor: "workOrderId", title: "Work Order ID", sortable: true },
        { accessor: "product", title: "Product", sortable: true },
        { accessor: "quantity", title: "Quantity", sortable: true },
        { accessor: "sf", title: "Semi Finished", sortable: true },
        { accessor: "completedQuantity", title: "Completed Quantity", sortable: true },
        { accessor: "createdAt", title: "Created At", sortable: true },
        { accessor: "createdBy", title: "Created By", sortable: true },
        {
            accessor: "actions",
            title: "Actions",
            sortable: false,
            render: ({ jobOrderId }) => (
                <div className="flex gap-2">
                    
                    {/* View Job Details */}
                    <button className="btn btn-primary flex items-center gap-1">
                        <Link to="/falcon-facade/productionNew/view" className="flex items-center gap-1">
                            <IconEye className="text-xl" /> View Details
                        </Link>
                    </button>
        
                    {/* Quick View */}
                    <button onClick={() => openModal("view", jobOrderId)} className="btn btn-primary flex items-center gap-1">
                        <IconEye className="text-xl" /> Quick View
                    </button>
        
                    {/* Update Completed Quantity */}
                    <button onClick={() => openModal("updateCompletedQuantity", jobOrderId)} className="btn btn-secondary flex items-center gap-1">
                        <IconEdit className="text-xl" /> Update Quantity
                    </button>
        
                    {/* QC Check */}
                    <button onClick={() => openModal("qcCheck", jobOrderId)} className="btn btn-danger flex items-center gap-1">
                        <IconChecks className="text-xl" /> QC Check
                    </button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    return (
        <div>

            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Semi Finished Detail </h5>
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
                                        {columns.map((col, i) => {
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
                    <DataTable<WorkOrder>
                        className="whitespace-nowrap table-hover"
                        records={rowData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={rowData.length}
                        recordsPerPage={pageSize}  // Use state variable
                        page={page}
                        onPageChange={setPage}  // Set new page when changed
                        onRecordsPerPageChange={setPageSize}  // ✅ Add this function
                        recordsPerPageOptions={[5, 10, 15, 20]}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        withBorder={true}
                        paginationText={({ from, to, totalRecords }) =>
                            `Showing ${from} to ${to} of ${totalRecords} entries`
                        }
                    />


                    {/* Use ModalOutlet for the different modal types */}
                    <ModalOutlet isOpen={!!modalType} closeModal={() => setModalType(null)} type={modalType} data={selectedData} />
                </div>

            </div>
        </div>
    );
};

export default ProductView;
