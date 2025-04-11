import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import { Dialog, Transition } from '@headlessui/react';
import IconEye from '@/components/Icon/IconEye';

import { DataTable } from 'mantine-datatable';
import AnimateHeight from 'react-animate-height';
import IconFile from '@/components/Icon/IconFile';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconArrowLeft from '@/components/Icon/IconArrowLeft';
import IconMultipleForwardRight from '@/components/Icon/IconMultipleForwardRight';
// import PackingTable from './PackingTable'; // Import PackingTable
// import ViewPackingDetailsModal from './PackingModal';
// import DispatchDetailsModal from './DispatchDetailsModal';
// import DispatchTable from './DispatchTable';
// import QcCheckTable from './QcCheckTable';
// import QcCheckDetailsModal from './QcCheckDetailsModal'; // Import QC Check Details Modal

const WorkOrderPage = () => {
    const dispatch = useDispatch();

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAchievedModal, setShowAchievedModal] = useState(false);
    const [showRejectedModal, setShowRejectedModal] = useState(false);
    const [selectedAchievedLogs, setSelectedAchievedData] = useState([]);
    const [selectedRejectedLogs, setSelectedRejectedData] = useState([]);
    const [modalTitle, setModalTitle] = useState('');

    const [isPackingModalOpen, setIsPackingModalOpen] = useState(false);
    const [selectedPackingData, setSelectedPackingData] = useState(null);

    const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
    const [selectedDispatch, setSelectedDispatch] = useState(null);

    const [isQcCheckModalOpen, setIsQcCheckModalOpen] = useState(false);
    const [selectedQcCheck, setSelectedQcCheck] = useState(null);

    const dispatchData = [
        {
            dispatchId: 'D001',
            workOrderId: 'WO001',
            jobOrderId: 'JO001',
            vehicleNumber: 'V1234',
            docketNumber: 'DN001',
            products: [
                {
                    productId: 'P001',
                    productName: 'Inward Window',
                    uom: 'Nos',
                    quantity: 50,
                    vehicleNumber: 'V1234',
                    docketNumber: 'DN001',
                    timestamp: '2025-03-04 10:30 AM',
                    qrCodes: ['QR001', 'QR002', 'QR003'],
                },
                {
                    productId: 'P002',
                    productName: 'Outward Window',
                    uom: 'Nos',
                    quantity: 150,
                    vehicleNumber: 'V1234',
                    docketNumber: 'DN001',
                    timestamp: '2025-03-04 10:30 AM',
                    qrCodes: ['QR004', 'QR005', 'QR006'],
                },
            ],
        },
        {
            dispatchId: 'D002',
            workOrderId: 'WO001',
            jobOrderId: 'JO001',
            vehicleNumber: 'V1234',
            docketNumber: 'DN001',
            products: [
                {
                    productId: 'P001',
                    productName: 'Inward Window',
                    uom: 'Nos',
                    quantity: 50,
                    vehicleNumber: 'V1234',
                    docketNumber: 'DN001',
                    timestamp: '2025-03-04 10:30 AM',
                    qrCodes: ['QR001', 'QR002', 'QR003'],
                },
                {
                    productId: 'P002',
                    productName: 'Outward Window',
                    uom: 'Nos',
                    quantity: 150,
                    vehicleNumber: 'V1234',
                    docketNumber: 'DN001',
                    timestamp: '2025-03-04 10:30 AM',
                    qrCodes: ['QR004', 'QR005', 'QR006'],
                },
            ],
        },
    ];

    const qcCheckData = [
        {
            workOrderId: 'WO001',
            jobOrderId: 'JO001',
            products: [
                {
                    checkId: 'QC001',
                    productId: 'P001',
                    productName: 'Inward Window',
                    uom: 'Nos',
                    quantity: 50,
                    semiFinished: ['SF1', 'SF2', 'SF3'],
                },
                {
                    checkId: 'QC002',
                    productId: 'P002',
                    productName: 'Inward Door',
                    uom: 'Nos',
                    quantity: 60,
                    semiFinished: ['SF1', 'SF2', 'SF3'],
                },
                {
                    checkId: 'QC003',
                    productId: 'P003',
                    productName: 'Fixed Window',
                    uom: 'Nos',
                    quantity: 70,
                    semiFinished: ['SF1', 'SF2', 'SF3'],
                },
            ],
        },
    ];

    const recordsData = {
        id: 1,
        jobOrderId: 'JO1234',
        workOrderId: 'WO5678',
        fromDate: '2025-01-01',
        toDate: '2025-01-15',
        plantName: 'Plant A',
        factoryName: 'Factory X',
        clientName: 'Client Alpha',
        projectName: 'Project Phoenix',
        products: [
            {
                productId: 'P-001',
                productName: 'Inward Door',
                uom: 'Nos',
                code: 'TYPE-P5(T)',
                colorCode: 'RAL 9092',
                width: '1047',
                height: '1025',
                poQuantity: 1000,
                achievedTillNow: 800,
                rejectedQuantity: 50,
                plannedQuantity: 1000,
                date: '2025-01-05',
            },
            {
                productId: 'P-002',
                productName: 'Glazed Window',
                uom: 'Nos',
                code: 'TYPE-P4(T)',
                colorCode: 'RAL 9093',
                width: '1045',
                height: '1020',
                poQuantity: 500,
                achievedTillNow: 450,
                rejectedQuantity: 30,
                plannedQuantity: 500,
                date: '2025-01-10',
            },
        ],
    };

    const openPackingDetailsModal = (data) => {
        setSelectedPackingData(data);
        setIsPackingModalOpen(true);
    };

    const closePackingModal = () => {
        setIsPackingModalOpen(false);
        setSelectedPackingData(null);
    };

    const openDispatchDetailsModal = (dispatch) => {
        setSelectedDispatch(dispatch);
        setIsDispatchModalOpen(true);
    };

    const closeDispatchModal = () => {
        setIsDispatchModalOpen(false);
        setSelectedDispatch(null);
    };

    const openQcCheckDetailsModal = (qcCheck) => {
        setSelectedQcCheck(qcCheck);
        setIsQcCheckModalOpen(true);
    };

    const closeQcCheckModal = () => {
        setIsQcCheckModalOpen(false);
        setSelectedQcCheck(null);
    };

    const closeAchievedModal = () => setShowAchievedModal(false);
    const closeRejectedModal = () => setShowRejectedModal(false);

    const openAchievedModal = (step) => {
        if (step.hasOwnProperty('achievedLogs')) {
            setSelectedAchievedData(step.achievedLogs || []);
            setModalTitle('Achieved Quantity Logs for Job Order');
        } else {
            setSelectedAchievedData(step.achievedLogs || []);
            setModalTitle(`Achieved Logs for ${step.name} Step`);
        }
        setShowAchievedModal(true);
    };

    const openRejectedModal = (step) => {
        if (step.hasOwnProperty('rejectedLogs')) {
            setSelectedRejectedData(step.rejectedLogs || []);
            setModalTitle('Rejected Quantity Logs for Job Order');
        } else {
            setSelectedRejectedData(step.rejectedLogs || []);
            setModalTitle(`Rejected Logs for ${step.name} Step`);
        }
        setShowRejectedModal(true);
    };

    const closeModal = () => {
        setShowAchievedModal(false);
        setShowRejectedModal(false);
    };

    useEffect(() => {
        dispatch(setPageTitle('Work Order Detail'));
    }, [dispatch]);

    const clientDetails = {
        clientName: 'ABC Corp',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        gst: '123456789ABC',
        placeOfSupply: 'New York',
    };

    const products = [
        {
            description: 'Inward Door',
            materialCode: 'M001',
            uom: 'Nos',
            requiredQuantity: 100,
            achieved: 80,
            colorCode: 'RAL 9092',
            code: 'SAC-101',
            height: 1047,
            width: 1025,
            dispatched: 70,
            packed: 60,
            plantCode: 'P1',
            deliveryDate: '2025-01-20',
            dimensions: [
                { name: 'A', value: '8cm' },
                { name: 'B', value: '10cm' },
                { name: 'C', value: '12cm' },
            ],
        },
        {
            description: 'Fixed Door',
            materialCode: 'M002',
            uom: 'Nos',
            requiredQuantity: 200,
            achieved: 180,
            colorCode: 'RAL 9093',
            code: 'SAC-102',
            height: 1057,
            width: 1035,
            dispatched: 160,
            packed: 140,
            plantCode: 'P2',
            deliveryDate: '2025-01-22',
        },
        {
            description: 'Fixed Window',
            materialCode: 'M003',
            uom: 'Nos',
            requiredQuantity: 150,
            achieved: 130,
            colorCode: 'RAL 9094',
            code: 'SAC-103',
            height: 1055,
            width: 1055,
            dispatched: 120,
            packed: 110,
            plantCode: 'P3',
            deliveryDate: '2025-01-25',
            dimensions: [
                { name: 'A', value: '15cm' },
                { name: 'B', value: '17cm' },
                { name: 'C', value: '19cm' },
                { name: 'D', value: '20cm' },
            ],
        },
        {
            description: 'Facade',
            materialCode: 'M004',
            uom: 'Nos',
            requiredQuantity: 250,
            achieved: 230,
            colorCode: 'RAL 9095',
            code: 'SAC-104',
            height: 1047,
            width: 1025,
            dispatched: 200,
            packed: 190,
            plantCode: 'P4',
            deliveryDate: '2025-01-28',
            dimensions: [
                { name: 'A', value: '15cm' },
                { name: 'B', value: '17cm' },
                { name: 'C', value: '19cm' },
                { name: 'D', value: '20cm' },
            ],
        },
        {
            description: 'Curtain Wall',
            materialCode: 'M005',
            uom: 'Nos',
            requiredQuantity: 180,
            achieved: 150,
            colorCode: 'RAL 9096',
            code: 'SAC-105',
            height: 1047,
            width: 1025,
            dispatched: 140,
            packed: 130,
            plantCode: 'P5',
            deliveryDate: '2025-01-30',
            dimensions: [
                { name: 'A', value: '15cm' },
                { name: 'B', value: '17cm' },
                { name: 'C', value: '19cm' },
                { name: 'D', value: '20cm' },
            ],
        },
    ];

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
                    productId: 'PRD001',
                    productName: 'Product1',
                    uom: 'nos',
                    semiFinishedProducts: [
                        {
                            sfId: 'SF1',
                            quantity: 3,
                            qrCodes: ['QR1', 'QR2', 'QR3'],
                        },
                        {
                            sfId: 'SF2',
                            quantity: 2,
                            qrCodes: ['QR4', 'QR5'],
                        },
                    ],
                },
                {
                    productId: 'PRD002',
                    productName: 'Product2',
                    uom: 'nos',
                    semiFinishedProducts: [
                        {
                            sfId: 'SF3',
                            quantity: 1,
                            qrCodes: ['QR6'],
                        },
                    ],
                },
            ],
        },
        {
            packing_id: 2,
            workOrderId: 'WO12346',
            jobOrder: 'JO98766',
            status: 'Completed',
            createdBy: 'Pending',
            timestamp: '2025-02-25 10:30 AM',
            products: [
                {
                    productId: 'PRD003',
                    productName: 'Product3',
                    uom: 'nos',
                    semiFinishedProducts: [
                        {
                            sfId: 'SF4',
                            quantity: 4,
                            qrCodes: ['QR7', 'QR8', 'QR9', 'QR10'],
                        },
                    ],
                },
                {
                    productId: 'PRD004',
                    productName: 'Product4',
                    uom: 'nos',
                    semiFinishedProducts: [
                        {
                            sfId: 'SF5',
                            quantity: 5,
                            qrCodes: ['QR11', 'QR12', 'QR13', 'QR14', 'QR15'],
                        },
                    ],
                },
            ],
        },
    ];

    const mockAchievedLogs1 = [
        {
            timestamp: '2025-03-03T12:00:00Z',
            quantityAchieved: 22,
            createdBy: 'John Doe',
        },
        {
            timestamp: '2025-03-03T14:30:00Z',
            quantityAchieved: 33,
            createdBy: 'Jane Smith',
        },
    ];
    const mockRejectedLogs1 = [
        {
            timestamp: '2025-03-03T13:00:00Z',
            quantityRejected: 3,
            createdBy: 'John Doe',
        },
        {
            timestamp: '2025-03-03T15:00:00Z',
            quantityRejected: 2,
            createdBy: 'Alice Brown',
        },
    ];
    const mockAchievedLogs2 = [
        {
            timestamp: '2025-03-03T12:00:00Z',
            quantityAchieved: 22,
            createdBy: 'Hasna',
        },
        {
            timestamp: '2025-03-03T14:30:00Z',
            quantityAchieved: 33,
            createdBy: 'Kaavish',
        },
    ];
    const mockRejectedLogs2 = [
        {
            timestamp: '2025-03-03T13:00:00Z',
            quantityRejected: 3,
            createdBy: 'Ravi ',
        },
        {
            timestamp: '2025-03-03T15:00:00Z',
            quantityRejected: 2,
            createdBy: 'Raj',
        },
    ];

    const jobOrders = [
        {
            id: 1,
            productName: 'Inward Door',
            uom: 'Nos',
            poQuantity: 100,
            plannedQuantity: 90,
            achievedQuantity: 80,
            rejectedQuantity: 10,
            semiFinishedTasks: [
                {
                    id: 'SF101',
                    name: 'Semi Finished 1',
                    file: null,
                    remark: 'Initial cutting process',
                    steps: [
                        {
                            name: 'Cutting',
                            poQuantity: 30,
                            plannedQuantity: 25,
                            achievedQuantity: 22,
                            rejectedQuantity: 3,
                            achievedLogs: mockAchievedLogs1,
                            rejectedLogs: mockRejectedLogs1,
                        },
                        {
                            name: 'Machining',
                            poQuantity: 40,
                            plannedQuantity: 35,
                            achievedQuantity: 33,
                            rejectedQuantity: 2,
                            achievedLogs: mockAchievedLogs2,
                            rejectedLogs: mockRejectedLogs2,
                        },
                    ],
                },
            ],
        },
    ];

    const workOrder = {
        id: 'abc123',
        createdAt: '2025-01-10 10:30 AM',
        createdBy: {
            name: 'Bharath Kumar',
            role: 'Manager',
        },
        plantCode: '123',
        prodReqDate: '2025-01-21',
        prodReqrDate: '2025-01-22',
        deadline: '2025-01-30',
        issuedBy: 'V Gouda',
        receivedBy: 'M R Bhaske',
        status: 'In Progress',
        bufferStock: 'False',
    };

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const PAGE_SIZES = [5, 10, 20];

    const packingData = [
        {
            serialNumber: 'BR001',
            productId: 'P101',
            workOrderId: 'WO111',
            quantity: 500,
            rejectedQuantity: 10,
            date: '2025-01-10 10:30 AM',
            createdBy: 'Bharath',
        },
        {
            workOrderId: 'WO112',
            serialNumber: 'BR002',
            productId: 'P102',
            quantity: 450,
            rejectedQuantity: 5,
            date: '2025-01-11 11:15 AM',
            createdBy: 'Samira',
        },
        {
            serialNumber: 'BR003',
            productId: 'P103',
            workOrderId: 'WO113',
            quantity: 600,
            rejectedQuantity: 15,
            date: '2025-01-12 09:45 AM',
            createdBy: 'ALisha',
        },
        {
            serialNumber: 'BR004',
            productId: 'P104',
            workOrderId: 'WO114',
            quantity: 550,
            rejectedQuantity: 20,
            date: '2025-01-13 02:20 PM',
            createdBy: 'Ravi ',
        },
    ];

    const filteredData = packingData.filter((item) => item.serialNumber.toLowerCase().includes(search.toLowerCase()) || item.productId.toLowerCase().includes(search.toLowerCase()));

    const filteredData1 = dispatchData.filter((dispatch) => dispatch.products.some((product) => product.productName.toLowerCase().includes(search.toLowerCase())));

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '/', isActive: false },
        { label: 'Work Order', link: '/falcon-facade/work-orders/', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/falcon-facade/work-orders', icon: <IconArrowBackward className="text-4xl" /> }} />
            <button onClick={() => window.print()} className="mb-10 bg-blue-500 text-white px-4 py-2 rounded float-right">
                Print Page
            </button>
            <div className="p-4 pt-10">
                {/* Client Details Section */}
                <div className="panel mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Client & Work Order Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg shadow">
                        {/* Left Section: Client Details */}
                        <div className="bg-yellow-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Client Details</h3>
                            <p className="text-sm">
                                <strong>Client Name:</strong> {clientDetails.clientName}
                            </p>
                            <p className="text-sm">
                                <strong>Project Name:</strong> Lorem, ipsum.
                            </p>
                            <p className="text-sm">
                                <strong>Address:</strong> {clientDetails.address}
                            </p>
                        </div>

                        {/* Right Section: Work Order Details */}
                        <div className="bg-blue-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm">
                                <strong>Work Order Number:</strong> {workOrder.id}
                            </p>
                            <p className="text-sm">
                                <strong>Plant Code:</strong> {workOrder.plantCode}
                            </p>
                            {/* <p className="text-sm">
                                <strong>Production Request Date:</strong> {workOrder.prodReqDate}
                            </p>
                            <p className="text-sm">
                                <strong>Production Requirement Date:</strong> {workOrder.prodReqrDate}
                            </p>
                            <p className="text-sm">
                                <strong>Issued By:</strong> {workOrder.issuedBy}
                            </p>
                            <p className="text-sm">
                                <strong>Received By:</strong> {workOrder.receivedBy}
                            </p>
                            <p className="text-sm">
                                <strong>Created At:</strong> {workOrder.createdAt}
                            </p>
                            <p className="text-sm">
                                <strong>Created By:</strong> {workOrder.createdBy.name} ({workOrder.createdBy.role})
                            </p> */}
                            <p className="text-sm mt-2">
                                <strong>Date:</strong> {workOrder.deadline}
                            </p>
                            {/* <div className="flex items-center gap-2 mt-2">
                                <strong>Files:</strong>
                                <IconFile className="text-gray-600" />
                            </div> */}
                        </div>

                        <div className="bg-gray-300 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Job Order Details</h3>
                            <p className="text-sm">
                                <strong>Job Order Id:</strong> JO1
                            </p>
                            <p className="text-sm">
                                <strong>Created By:</strong> Bharath (Manager)
                            </p>
                            <p className="text-sm">
                                <strong>Created At:</strong> 28/02/2025 12:24:23
                            </p>
                            <p className="text-sm">
                                <strong>Status:</strong>
                                <span
                                    className={`ml-2 px-2 py-1 rounded text-sm font-semibold
                    ${workOrder.status === 'In Progress' ? 'text-blue-500' : workOrder.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}
                                >
                                    {workOrder.status}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Progress Section */}
                <div className="panel mb-4 bg-gray-100" id="labeled">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Overall Progress</h5>
                        <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                            <div className="bg-info h-4 rounded-full w-4/5 text-center text-white text-xs">80%</div>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <div className="panel mb-6 bg-blue-100">
                    <h2 className="text-lg font-semibold mb-4">Products</h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left border border-gray-300">Description</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">UOM</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Sac Code</th>
                                    {/* <th className="px-4 py-2 text-left border border-gray-300">Color Code</th> */}
                                    {/* <th className="px-4 py-2 text-left border border-gray-300">Height</th> */}
                                    {/* <th className="px-4 py-2 text-left border border-gray-300">Width</th> */}
                                    {/* <th className="px-4 py-2 text-left border border-gray-300">Quantity</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Achieved</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Dispatched</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Packed</th> */}
                                    <th className="px-4 py-2 text-left border border-gray-300"> Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((product, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border border-gray-300">{product.description}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.uom}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.code}</td>
                                        {/* <td className="px-4 py-2 border border-gray-300">{product.colorCode}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.height}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.width}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.requiredQuantity}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.achieved}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.dispatched}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.packed}</td> */}
                                        <td className="px-4 py-2 border border-gray-300">{product.deliveryDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal for Dimensions */}
                    <Transition appear show={showModal} as={Fragment}>
                        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
                            <div className="flex items-center justify-center min-h-screen px-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                                        <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                                            {selectedProduct?.description} - Dimensions
                                        </Dialog.Title>
                                        <div className="mt-4">
                                            {selectedProduct?.dimensions.length > 0 ? (
                                                <table className="w-full text-sm text-left border border-gray-300">
                                                    <thead>
                                                        <tr className="bg-gray-100 text-gray-700">
                                                            <th className="p-2 border border-gray-300">Dimension</th>
                                                            <th className="p-2 border border-gray-300">Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedProduct.dimensions.map((dim, index) => (
                                                            <tr key={index} className="border-t border-gray-300">
                                                                <td className="p-2 border border-gray-300">{dim.name}</td>
                                                                <td className="p-2 border border-gray-300">{dim.value}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p className="text-gray-500 text-sm">No dimensions available.</p>
                                            )}
                                        </div>
                                        <div className="mt-5 flex justify-end">
                                            <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600" onClick={closeModal}>
                                                Close
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>

                    {/* Achieved Quantity Modal */}
                    <Transition appear show={showAchievedModal} as={Fragment}>
                        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
                            <div className="flex items-center justify-center min-h-screen px-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                                        <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                                            {modalTitle}
                                        </Dialog.Title>
                                        <div className="mt-4">
                                            {selectedAchievedLogs.length > 0 ? (
                                                <table className="w-full text-sm text-left border border-gray-300">
                                                    <thead>
                                                        <tr className="bg-gray-100 text-gray-700">
                                                            <th className="p-2 border border-gray-300">Timestamp</th>
                                                            <th className="p-2 border border-gray-300">Quantity Achieved</th>
                                                            <th className="p-2 border border-gray-300">Created By</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedAchievedLogs.map((log, index) => (
                                                            <tr key={index} className="border-t border-gray-300">
                                                                <td className="p-2 border border-gray-300">{log.timestamp}</td>
                                                                <td className="p-2 border border-gray-300">{log.quantityAchieved}</td>
                                                                <td className="p-2 border border-gray-300">{log.createdBy}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p className="text-gray-500 text-sm">No logs available.</p>
                                            )}
                                        </div>
                                        <div className="mt-5 flex justify-end">
                                            <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600" onClick={closeModal}>
                                                Close
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>

                    {/* Rejected Quantity Modal */}
                    <Transition appear show={showRejectedModal} as={Fragment}>
                        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
                            <div className="flex items-center justify-center min-h-screen px-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                                        <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                                            {modalTitle}
                                        </Dialog.Title>
                                        <div className="mt-4">
                                            {selectedRejectedLogs.length > 0 ? (
                                                <table className="w-full text-sm text-left border border-gray-300">
                                                    <thead>
                                                        <tr className="bg-gray-100 text-gray-700">
                                                            <th className="p-2 border border-gray-300">Timestamp</th>
                                                            <th className="p-2 border border-gray-300">Quantity Rejected</th>
                                                            <th className="p-2 border border-gray-300">Created By</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedRejectedLogs.map((log, index) => (
                                                            <tr key={index} className="border-t border-gray-300">
                                                                <td className="p-2 border border-gray-300">{log.timestamp}</td>
                                                                <td className="p-2 border border-gray-300">{log.quantityRejected}</td>
                                                                <td className="p-2 border border-gray-300">{log.createdBy}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p className="text-gray-500 text-sm">No logs available.</p>
                                            )}
                                        </div>
                                        <div className="mt-5 flex justify-end">
                                            <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600" onClick={closeModal}>
                                                Close
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>
                </div>

                {/* Job Orders Display */}
                <div className="panel mb-4 bg-gray-100 p-4 rounded-lg shadow">
                    {jobOrders.map((jobOrder) => (
                        <div key={jobOrder.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Job Order - {jobOrder.id}</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                                <div>
                                    <p className="text-sm">
                                        <strong>Product Name:</strong> {jobOrder.productName}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Sales Order Number:</strong> SL-123
                                    </p>
                                    <p className="text-sm">
                                        <strong>System:</strong> Schuco
                                    </p>
                                    <p className="text-sm">
                                        <strong>Product System:</strong> Casement Window 45 Series
                                    </p>
                                    <p className="text-sm">
                                        <strong>UOM:</strong> {jobOrder.uom}
                                    </p>
                                    <p className="text-sm">
                                        <strong>PO Quantity:</strong> {jobOrder.poQuantity}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Range Date:</strong> 2025-07-05 to 2025-07-10
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm">
                                        <strong>Achieved Quantity:</strong>
                                        <span className="text-green-600 font-semibold cursor-pointer flex items-center" onClick={() => openAchievedModal(jobOrder)}>
                                            {jobOrder.achievedQuantity}
                                            <IconMultipleForwardRight className="ml-2" />
                                        </span>
                                    </p>
                                    <p className="text-sm">
                                        <strong>Rejected Quantity:</strong>
                                        <span className="text-red-500 font-semibold cursor-pointer flex items-center" onClick={() => openRejectedModal(jobOrder)}>
                                            {jobOrder.rejectedQuantity}
                                            <IconMultipleForwardRight className="ml-2" />
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Semi-Finished Tasks */}
                            <div className="mt-4 bg-gray-50 p-4 rounded-md">
                                <h3 className="text-md font-semibold mb-2">Semi-Finished Production</h3>
                                {jobOrder.semiFinishedTasks.map((sf) => (
                                    <div key={sf.id} className="border p-4 mb-4 bg-white shadow-sm rounded-md">
                                        <h4 className="text-md font-semibold mb-2">{sf.name}</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm font-semibold">File:</p>
                                                {sf.file ? <p className="text-green-600">File Uploaded</p> : <p className="text-gray-500">No file uploaded</p>}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">Remarks:</p>
                                                <p className="text-gray-700">{sf.remark}</p>
                                            </div>
                                        </div>
                                        {/* Steps Table */}
                                        <div className="mt-4">
                                            <table className="w-full border-collapse border border-gray-200 text-sm">
                                                <thead className="bg-gray-100 dark:bg-gray-700">
                                                    <tr>
                                                        <th className="px-4 py-2 border">Step Name</th>
                                                        <th className="px-4 py-2 border">PO Quantity</th>
                                                        <th className="px-4 py-2 border">Planned Quantity</th>
                                                        <th className="px-4 py-2 border">Achieved Quantity</th>
                                                        <th className="px-4 py-2 border">Rejected Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sf.steps.map((step, index) => (
                                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                            <td className="px-4 py-2 border">{step.name}</td>
                                                            <td className="px-4 py-2 border">{step.poQuantity}</td>
                                                            <td className="px-4 py-2 border">{step.plannedQuantity}</td>
                                                            <td className="px-4 py-2 border text-blue-500 font-semibold">
                                                                <span className="cursor-pointer" onClick={() => openAchievedModal(step)}>
                                                                    {step.achievedQuantity}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-2 border text-red-500 font-semibold">
                                                                <span className="cursor-pointer" onClick={() => openRejectedModal(step)}>
                                                                    {step.rejectedQuantity}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="panel mb-4 bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Internal Work Order</h2>

                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left border border-gray-300">Product Name</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Sales Order Number</th>
                                <th className="px-4 py-2 text-left border border-gray-300">System</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Product System</th>
                                <th className="px-4 py-2 text-left border border-gray-300">UOM</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Color Code</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Code</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Width</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Height</th>
                                <th className="px-4 py-2 text-left border border-gray-300">PO Quantity</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Range Date</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Achieved Quantity</th>
                                <th className="px-4 py-2 text-left border border-gray-300">Rejected Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recordsData.products.map((product, index) => (
                                <tr key={product.productId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.productName}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">SL-123</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">Schuco</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">Casement Window 45 Series</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.uom}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.colorCode}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.code}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.width}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.height}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.poQuantity}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">2025-07-05 to 2025-07-10</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.achievedTillNow}</td>
                                    <td className="px-4 py-2 text-left border border-gray-300">{product.rejectedQuantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* <PackingTable rowData={rowData} openPackingDetailsModal={openPackingDetailsModal} />

                <ViewPackingDetailsModal isOpen={isPackingModalOpen} closePackingModal={closePackingModal} data={selectedPackingData} />

                <DispatchTable dispatchData={dispatchData} openDispatchDetailsModal={openDispatchDetailsModal} />

                <DispatchDetailsModal isOpen={isDispatchModalOpen} closeDispatchModal={closeDispatchModal} dispatch={selectedDispatch} />

                <QcCheckTable qcCheckData={qcCheckData} openQcCheckDetailsModal={openQcCheckDetailsModal} />

                <QcCheckDetailsModal isOpen={isQcCheckModalOpen} closeQcCheckModal={closeQcCheckModal} qcCheck={selectedQcCheck} /> */}
            </div>
        </div>
    );
};

export default WorkOrderPage;
