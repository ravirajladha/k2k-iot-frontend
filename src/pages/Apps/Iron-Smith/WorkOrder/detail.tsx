import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import { Dialog, Transition } from "@headlessui/react";
import IconEye from '@/components/Icon/IconEye';

import { DataTable } from 'mantine-datatable';
import AnimateHeight from 'react-animate-height';
import IconFile from '@/components/Icon/IconFile';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import IconArrowBackward from '@/components/Icon/IconArrowBackward';

const WorkOrderPage = () => {
    const dispatch = useDispatch();

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const openModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
    };


    useEffect(() => {
        dispatch(setPageTitle('Work Order Detail'));
    }, [dispatch]);

    // Sample data for demonstration
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
            description: 'Steel Rod',
            materialCode: 'M001',
            uom: 'Nos',
            requiredQuantity: 100,
            achieved: 80,
            barMark: "BM111",
            memberDetails: "P1",
            dispatched: 70,
            packed: 60,
            plantCode: 'P1',
            deliveryDate: '2025-01-20',
            dimensions: [
                { name: "A", value: "8cm" },
                { name: "B", value: "10cm" },
                { name: "C", value: "12cm" },
            ],
        },
        {
            description: 'Cast Iron Rod',
            materialCode: 'M002',
            uom: 'Nos',
            barMark: "BM111",
            memberDetails: "P2",
            requiredQuantity: 200,
            achieved: 180,
            dispatched: 160,
            packed: 140,
            plantCode: 'P2',
            deliveryDate: '2025-01-22',
        },
        {
            description: 'Iron Rod',
            materialCode: 'M003',
            uom: 'Nos',
            barMark: "BM114",
            memberDetails: "P4",
            requiredQuantity: 150,
            achieved: 130,
            dispatched: 120,
            packed: 110,
            plantCode: 'P3',
            deliveryDate: '2025-01-25',
            dimensions: [
                { name: "A", value: "15cm" },
                { name: "B", value: "17cm" },
                { name: "C", value: "19cm" },
                { name: "D", value: "20cm" },
            ],
        },
        {
            description: 'Mixed Iron Rod',
            materialCode: 'M004',
            uom: 'Nos',
            barMark: "BM112",
            memberDetails: "P3",
            requiredQuantity: 250,
            achieved: 230,
            dispatched: 200,
            packed: 190,
            plantCode: 'P4',
            deliveryDate: '2025-01-28',
            dimensions: [
                { name: "A", value: "15cm" },
                { name: "B", value: "17cm" },
                { name: "C", value: "19cm" },
                { name: "D", value: "20cm" },
            ],
        },
        {
            description: 'Steel',
            materialCode: 'M005',
            uom: 'Nos',
            requiredQuantity: 180,
            barMark: "BM111",
            memberDetails: "P2",
            achieved: 150,
            dispatched: 140,
            packed: 130,
            plantCode: 'P5',
            deliveryDate: '2025-01-30',
            dimensions: [
                { name: "A", value: "15cm" },
                { name: "B", value: "17cm" },
                { name: "C", value: "19cm" },
                { name: "D", value: "20cm" },
            ],
        }
    ];


    const jobOrders = [
        {
            id: 1,
            productName: 'Steel Rods',
            uom: 'Nos',
         
            poQuantity: 100,
            plannedQuantity: 90,
            achievedQuantity: 80,
            rejectedQuantity: 10,
            dailyReports: [
                {
                    createdBy: 'Operator 1',
                    date: '2025-01-10',
                    poQuantity: 50,
                    plannedQuantity: 45,
                    achievedQuantity: 40,
                    rejectedQuantity: 5,
                    recycledQuantity: 2,
                },
                {
                    createdBy: 'Operator 2',
                    date: '2025-01-11',
                    poQuantity: 50,
                    plannedQuantity: 50,
                    achievedQuantity: 40,
                    rejectedQuantity: 10,
                    recycledQuantity: 3,
                },
            ],
            machineAssigned: ["Machine A - Bending", "Machine B - Cutting", "Machine C - Folding"],
        },
        {
            id: 2,
            productName: 'Iron Rods',
            uom: 'Nos',
        
            poQuantity: 200,
            plannedQuantity: 180,
            achievedQuantity: 170,
            rejectedQuantity: 10,
            dailyReports: [
                {
                    createdBy: 'Operator 3',
                    date: '2025-01-12',
                    poQuantity: 100,
                    plannedQuantity: 90,
                    achievedQuantity: 85,
                    rejectedQuantity: 5,
                    recycledQuantity: 4,
                },
                {
                    createdBy: 'Operator 4',
                    date: '2025-01-13',
                    poQuantity: 100,
                    plannedQuantity: 90,
                    achievedQuantity: 85,
                    rejectedQuantity: 5,
                    recycledQuantity: 3,
                },
            ],
            machineAssigned: ["Machine A - Bending", "Machine B - Cutting", "Machine C - Folding"],

        },

    ];


    const workOrder = {
        id: 'abc123',
        createdAt: '2025-01-10 10:30 AM',
        createdBy: {
            name: 'Bharath Kumar',
            role: 'Manager',
        },
        deadline: '2025-01-20',
        status: 'In Progress',
        // priority: 'High',
        bufferStock: "False",
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

    const dispatchData = [
        {
            dispatchId: 'D001',
            products: [
                {
                    productName: 'Steel Rod',
                    quantity: 500,
                    uom: 'Nos',
                    rate: 10,
                    amount: 5000,
                    timestamp: '2025-01-15 10:30 AM',
                    vehicleNumber: 'KA-01-1234',
                    docketNumber: 'DOC001',
                },
                {
                    productName: 'Cast Iron Rod',
                    quantity: 300,
                    uom: 'Nos',
                    rate: 12,
                    amount: 3600,
                    timestamp: '2025-01-15 10:30 AM',
                    vehicleNumber: 'KA-01-1234',
                    docketNumber: 'DOC001',
                },
            ],
        },
        {
            dispatchId: 'D002',
            products: [
                {
                    productName: 'Iron Rod',
                    quantity: 400,
                    uom: 'Nos',
                    rate: 15,
                    amount: 6000,
                    timestamp: '2025-01-16 11:00 AM',
                    vehicleNumber: 'KA-02-5678',
                    docketNumber: 'DOC002',
                },
            ],
        },
    ];

    const qcData = [
        {
            slNo: "1",
            product: "Steel Rod",
            recycledQty: "5",
            rejectedQty: "10",
            remark: "Product failure due to maximum yeilding point."
        },
        {
            slNo: "2",
            product: "Iron Rod",
            recycledQty: "5",
            rejectedQty: "10",
            remark: "Passed at maximum pressure test."
        },
        {
            slNo: "3",
            product: "Cast Iron Rod",
            recycledQty: "5",
            rejectedQty: "10",
            remark: "Passed maximum bending."
        }
    ]

    const filteredData = packingData.filter(
        (item) =>
            item.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
            item.productId.toLowerCase().includes(search.toLowerCase())
    );

    const [expandedJobOrders, setExpandedJobOrders] = useState(jobOrders.map((job) => job.id));

    const toggleJobOrder = (id: any) => {
        if (expandedJobOrders.includes(id)) {
            setExpandedJobOrders((prev) => prev.filter((jobId) => jobId !== id));
        } else {
            setExpandedJobOrders((prev) => [...prev, id]);
        }
    };
    // Filter data based on search
    const filteredData1 = dispatchData.filter((dispatch) =>
        dispatch.products.some(
            (product) =>
                product.productName.toLowerCase().includes(search.toLowerCase()) ||
                product.vehicleNumber.toLowerCase().includes(search.toLowerCase())
        )
    );


    const downtimeDetails = [
        { serialNumber: 1, description: "Machine maintenance", numberOfHours: 4, remarks: "Scheduled maintenance" },
        { serialNumber: 2, description: "Power outage", numberOfHours: 2, remarks: "Unexpected" },
        { serialNumber: 3, description: "Operator error", numberOfHours: 1.5, remarks: "Resolved" },
    ];

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Iron Smith', link: '/', isActive: false },
        { label: 'Work Order', link: '/konkrete-klinkers/work-order/view', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    return (

        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{ label: 'Back', link: '/konkrete-klinkers/work-order/view', icon: <IconArrowBackward className="text-4xl" /> }}
            />
            <button
                onClick={() => window.print()}
                className="mb-10 bg-blue-500 text-white px-4 py-2 rounded float-right"
            >
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
                            <p className="text-sm"><strong>Client Name:</strong> {clientDetails.clientName}</p>
                            <p className="text-sm"><strong>Project Name:</strong> Lorem, ipsum.</p>
                            <p className="text-sm"><strong>Address:</strong> {clientDetails.address}</p>
                        </div>

                        {/* Right Section: Work Order Details */}
                        <div className="bg-blue-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm"><strong>Work Order Number:</strong> {workOrder.id}</p>
                            <p className="text-sm"><strong>Created At:</strong> {workOrder.createdAt}</p>
                            <p className="text-sm"><strong>Created By:</strong> {workOrder.createdBy.name} ({workOrder.createdBy.role})</p>

                            <div className="flex items-center gap-2 mt-2">
                                <strong>Files:</strong>
                                <IconFile className="text-gray-600" />
                            </div>

                            <p className="text-sm mt-2"><strong>Dates:</strong> {workOrder.deadline}</p>

                            <p className="text-sm"><strong>Status:</strong>
                                <span className={`ml-2 px-2 py-1 rounded text-sm font-semibold 
                    ${workOrder.status === 'In Progress' ? 'text-blue-500' :
                                        workOrder.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
                                    {workOrder.status}
                                </span>
                            </p>


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
                                    <th className="px-4 py-2 text-left border border-gray-300">Shapes</th>
                                    {/* <th className="px-4 py-2 text-left border border-gray-300">Material Code</th> */}
                                    <th className="px-4 py-2 text-left border border-gray-300">UOM</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Bar Mark</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Member Details</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">PO Quantity</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Achieved</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Dispatched</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Packed</th>
                                    {/* <th className="px-4 py-2 text-left border border-gray-300">Plant Code</th> */}
                                    <th className="px-4 py-2 text-left border border-gray-300">Delivery Date</th>
                                    {/* <th className="px-4 py-2 text-left border border-gray-300">Actions</th> */}

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((product, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border border-gray-300">{product.description}</td>
                                        {/* <td className="px-4 py-2 border border-gray-300">{product.materialCode}</td> */}
                                        <td className="px-4 py-2 border border-gray-300">{product.uom}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.barMark}</td>

                                        <td className="px-4 py-2 border border-gray-300">{product.memberDetails}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.requiredQuantity}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.achieved}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.dispatched}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.packed}</td>
                                        {/* <td className="px-4 py-2 border border-gray-300">{product.plantCode}</td> */}
                                        <td className="px-4 py-2 border border-gray-300">{product.deliveryDate}</td>
                                        {/* <td className="px-4 py-2 border border-gray-300">
                                            <button
                                                className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-700"
                                                onClick={() => openModal(product)}
                                            >
                                                <IconEye />                                    </button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal for Dimensions */}
                    {/* MODAL USING HEADLESS UI */}
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
                                            <button
                                                type="button"
                                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                                onClick={closeModal}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>


                </div>

                {/* progress section */}
                <div className="panel mb-4 bg-gray-100" id="labeled">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Overall Progress</h5>
                        {/* </div> */}
                        {/* <div className="mb-5 space-y-5"> */}
                        <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                            <div className="bg-info h-4 rounded-full w-4/5 text-center text-white text-xs">80%</div>
                        </div>
                    </div>
                </div>

                {/* new job orders */}
                <div className="panel mb-4 bg-gray-100 p-4 rounded-lg shadow">
                    {jobOrders.map((jobOrder) => (
                        <div key={jobOrder.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
                            {/* Job Order Header */}
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                                Job Order - {jobOrder.id}
                            </h2>

                            {/* Job Order Details Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                                <div>
                                    <p className="text-sm"><strong>Sales Order Number:</strong> Lorem, ipsum.</p>
                                    <p className="text-sm"><strong>Date:</strong> 20/02/2025 - 30-03-2025</p>
                                </div>
                                <div>
                                    <p className="text-sm"><strong>Plant Name:</strong> Lorem, ipsum.</p>
                                </div>
                            </div>

                            {/* Product Details Table */}
                            <div className="overflow-x-auto mt-3">
                                <table className="w-full border-collapse border border-gray-200 text-sm">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr className="text-gray-700 dark:text-white">
                                            <th className="px-4 py-2 border">Shapes</th>
                                            <th className="px-4 py-2 border">UOM</th>
                                            <th className="px-4 py-2 border">PO Quantity</th>
                                            <th className="px-4 py-2 border">Machine Assigned</th>

                                            <th className="px-4 py-2 border">Planned Quantity</th>
                                            <th className="px-4 py-2 border">Achieved Till Date</th>
                                            <th className="px-4 py-2 border">Achieved Quantity</th>
                                            <th className="px-4 py-2 border">Rejected Quantity</th>

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-4 py-2 border">{jobOrder.productName}</td>
                                            <td className="px-4 py-2 border">{jobOrder.uom}</td>
                                            <td className="px-4 py-2 border">{jobOrder.poQuantity}</td>
                                            <td>
                                                {jobOrder.machineAssigned.length > 0
                                                    ? jobOrder.machineAssigned.join(", ") // Show multiple machines
                                                    : "No Machines Assigned"}
                                            </td>
                                            <td className="px-4 py-2 border">{jobOrder.plannedQuantity}</td>
                                            <td className="px-4 py-2 border text-green-600 font-semibold">100</td>
                                            <td className="px-4 py-2 border text-blue-500 font-semibold">{jobOrder.achievedQuantity}</td>
                                            <td className="px-4 py-2 border text-red-500 font-semibold">{jobOrder.rejectedQuantity}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Toggle Button for Production Reports */}
                            <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={() => toggleJobOrder(jobOrder.id)}
                                    className="flex items-center text-primary font-semibold transition-all hover:text-blue-600"
                                >
                                    <span className={`mr-2 transition-transform ${expandedJobOrders.includes(jobOrder.id) ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                    {expandedJobOrders.includes(jobOrder.id) ? 'Hide Production Reports' : 'Show Production Reports'}
                                </button>
                            </div>

                            {/* Expandable Daily Production Reports */}
                            <AnimateHeight
                                duration={300}
                                height={expandedJobOrders.includes(jobOrder.id) ? 'auto' : 0}
                                className="bg-gray-50 dark:bg-gray-900 rounded mt-3"
                            >
                                <ul className="text-gray-600 dark:text-gray-300">
                                    {jobOrder.dailyReports.map((report, index) => (
                                        <li key={index} className="p-3 border border-gray-200 rounded mb-3">
                                            <h3 className="text-md font-semibold text-gray-800 dark:text-white">
                                                Daily Report - {report.date} (Sales Order: DPR1123) (Created by {report.createdBy})
                                            </h3>
                                            <div className="overflow-x-auto mt-2">
                                                <table className="w-full border-collapse border border-gray-200 text-sm">
                                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                                        <tr>
                                                            <th className="px-4 py-2 border">PO Quantity</th>
                                                            <th className="px-4 py-2 border">Planned Quantity</th>
                                                            <th className="px-4 py-2 border">Achieved Quantity</th>
                                                            <th className="px-4 py-2 border">Rejected Quantity</th>
                                                            <th className="px-4 py-2 border">Recycled Quantity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="px-4 py-2 border">{report.poQuantity}</td>
                                                            <td className="px-4 py-2 border">{report.plannedQuantity}</td>
                                                            <td className="px-4 py-2 border">{report.achievedQuantity}</td>
                                                            <td className="px-4 py-2 border">{report.rejectedQuantity}</td>
                                                            <td className="px-4 py-2 border">{report.recycledQuantity}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </AnimateHeight>

                            {/* Downtime Details Section */}
                            <div className="mt-6 bg-red-50 dark:bg-red-900 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-red-600 dark:text-red-300 mb-3">Downtime Details</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-200 text-sm">
                                        <thead className="bg-red-100 dark:bg-red-700 text-red-800 dark:text-white">
                                            <tr>
                                                <th className="px-4 py-2 border">Sl. No.</th>
                                                <th className="px-4 py-2 border">Description</th>
                                                <th className="px-4 py-2 border">Hours</th>
                                                <th className="px-4 py-2 border">Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {downtimeDetails.map((downtime, index) => (
                                                <tr key={index} className="hover:bg-red-50 dark:hover:bg-red-800">
                                                    <td className="px-4 py-2 border">{downtime.serialNumber}</td>
                                                    <td className="px-4 py-2 border">{downtime.description}</td>
                                                    <td className="px-4 py-2 border">{downtime.numberOfHours}</td>
                                                    <td className="px-4 py-2 border">{downtime.remarks}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Packing Section */}
                <div className="panel  bg-slate-50">
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
                                { accessor: 'serialNumber', title: 'Serial Number' },
                                // { accessor: 'workOrderId', title: 'Work Order ID' },

                                { accessor: 'productId', title: 'Product ID' },
                                { accessor: 'date', title: 'Date & Time' },
                                { accessor: 'quantity', title: 'Quantity' },
                                { accessor: 'rejectedQuantity', title: 'Rejected Quantity' },
                                { accessor: 'createdBy', title: 'Created By' },

                            ]}
                            totalRecords={filteredData.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            minHeight={200}
                            paginationText={({ from, to, totalRecords }) =>
                                `Showing ${from} to ${to} of ${totalRecords} entries`
                            }
                        />
                    </div>
                </div>

                {/* Dispatch Section */}
                <div className="panel mt-4 bg-slate-50">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Dispatch Details</h5>
                        <input
                            type="text"
                            className="form-input w-auto"
                            placeholder="Search by Product Name or Vehicle Number..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="datatables">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-200">
                                <thead className="bg-gray-100">

                                    <tr>
                                        <th>Dispatch ID</th>
                                        {/* <th>Work Order Id</th> */}
                                        <th>Shapes</th>
                                        <th>Quantity</th>
                                        <th>UOM</th>
                                        {/* <th>Rate</th>
                                        <th>Amount</th> */}
                                        <th>Timestamp</th>
                                        <th>Vehicle Number</th>
                                        <th>Docket Number</th>
                                        <th>Files</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData1.map((dispatch) => (
                                        <React.Fragment key={dispatch.dispatchId}>
                                            {/* Dispatch Header */}
                                            <tr className="bg-gray-100 font-bold">
                                                <td colSpan={7}>Dispatch ID: {dispatch.dispatchId}</td>
                                                <td><IconFile /></td>
                                            </tr>
                                            {/* Products under Dispatch */}
                                            {dispatch.products.map((product, index) => (
                                                <tr key={index}>
                                                    <td></td> {/* Empty cell for Dispatch ID */}

                                                    <td>{product.productName}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>{product.uom}</td>
                                                    {/* <td>{product.rate}</td>
                                                    <td>{product.amount}</td> */}
                                                    <td>{product.timestamp}</td>
                                                    <td>{product.vehicleNumber}</td>
                                                    <td>{product.docketNumber}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="panel mt-4 bg-slate-50">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">QC Details</h5>
                        <input type="text" className="form-input w-auto" placeholder="Search by Product Name or Vehicle Number..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="datatables">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th>Sl No.</th>
                                        <th>Shapes</th>
                                        <th>Recycled Qty</th>
                                        <th>Rejected Qty</th>
                                        <th>Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {qcData.map((qc) => (
                                        <tr key={qc.slNo}>
                                            <td>{qc.slNo}</td>
                                            <td>{qc.product}</td>
                                            <td>{qc.recycledQty}</td>
                                            <td>{qc.rejectedQty}</td>
                                            <td>{qc.remark}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default WorkOrderPage;
