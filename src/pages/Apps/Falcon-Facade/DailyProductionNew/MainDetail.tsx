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
        dispatch(setPageTitle('Production Detail'));
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
    const productDetails = {
        name: 'Product 1',
        system: 'System 1',
        productSystem: "Product System 1",

    };

    const products = [
        {
            description: 'Product A',
            materialCode: 'M001',
            uom: 'Nos',
            requiredQuantity: 100,
            achieved: 80,
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

    ];

    const jobOrders = [
        {
            id: 1,
            productName: 'Product A',
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
            productName: 'Product B',
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

    const productionData = [
        {
            serialNumber: "P001",
            quantity: 100,
            dateTime: "2025-02-25 10:30 AM",
            createdBy: "Bharath",
            dueDate: "2025-03-01",
        },
        {
            serialNumber: "P002",
            quantity: 250,
            dateTime: "2025-02-24 02:45 PM",
            createdBy: "Rutu",
            dueDate: "2025-02-28",
        },
        {
            serialNumber: "P003",
            quantity: 75,
            dateTime: "2025-02-23 08:15 AM",
            createdBy: "Kunal",
            dueDate: "2025-03-02",
        },
        {
            serialNumber: "P004",
            quantity: 320,
            dateTime: "2025-02-22 04:20 PM",
            createdBy: "Emily Johnson",
            dueDate: "2025-02-29",
        },
        {
            serialNumber: "P005",
            quantity: 150,
            dateTime: "2025-02-21 01:10 PM",
            createdBy: "Ravi",
            dueDate: "2025-03-03",
        },
    ];

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

    const qualityCheckData = [
        {
            serialNumber: "QC001",
            rejectedQuantity: 10,
            remarks: "Defective material",
            createdBy: "Ravi",
            timestamp: "2025-02-25 10:30 AM",
            poQuantity: 500,
            achievedTillNow: 450,
        },
        {
            serialNumber: "QC002",
            rejectedQuantity: 5,
            remarks: "Minor scratches",
            createdBy: "Raj",
            timestamp: "2025-02-24 02:45 PM",
            poQuantity: 600,
            achievedTillNow: 590,
        },
        {
            serialNumber: "QC003",
            rejectedQuantity: 20,
            remarks: "Incorrect dimensions",
            createdBy: "Ashmin",
            timestamp: "2025-02-23 08:15 AM",
            poQuantity: 700,
            achievedTillNow: 670,
        },
        {
            serialNumber: "QC004",
            rejectedQuantity: 15,
            remarks: "Improper alignment",
            createdBy: "Kaveri",
            timestamp: "2025-02-22 04:20 PM",
            poQuantity: 400,
            achievedTillNow: 380,
        },
        {
            serialNumber: "QC005",
            rejectedQuantity: 8,
            remarks: "Color mismatch",
            createdBy: "User",
            timestamp: "2025-02-21 01:10 PM",
            poQuantity: 550,
            achievedTillNow: 540,
        },
    ];



    const filteredData = productionData.filter(
        (item) =>
            item.serialNumber.toLowerCase().includes(search.toLowerCase())
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

    const filteredQCCheckData = qualityCheckData.filter(
        (item) =>
            item.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
            item.createdBy.toLowerCase().includes(search.toLowerCase()) ||
            item.remarks.toLowerCase().includes(search.toLowerCase())
    );

    const downtimeDetails = [
        { serialNumber: 1, description: "Machine maintenance", numberOfHours: 4, remarks: "Scheduled maintenance" },
        { serialNumber: 2, description: "Power outage", numberOfHours: 2, remarks: "Unexpected" },
        { serialNumber: 3, description: "Operator error", numberOfHours: 1.5, remarks: "Resolved" },
    ];

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '/', isActive: false },
        { label: 'Production', link: '/falcon-facade/work-order', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    return (

        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{ label: 'Back', link: '/falcon-facade/productionNew', icon: <IconArrowBackward className="text-4xl" /> }}
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
                    <h2 className="text-lg font-semibold mb-4">Semi Finished Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg shadow">
                        <div className="bg-blue-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm"><strong>Work Order Number:</strong> {workOrder.id}</p>
                            <p className="text-sm"><strong>Job Order Number:</strong> {workOrder.id}</p>

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

                        <div className="bg-yellow-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Product Details</h3>
                            <p className="text-sm"><strong>Product Name:</strong> {productDetails.name}</p>

                            <p className="text-sm"><strong>Master System:</strong>{productDetails.system}</p>

                            <p className="text-sm"><strong>Product System:</strong> {productDetails.productSystem}</p>

                            <p className="text-sm"><strong>Project Name:</strong> </p>
                            <p className="text-sm"><strong>Deadline Range:</strong> 16-02-2025 to 21-02-2025</p>
                            <p className="text-sm"><strong>Schedule Date:</strong> 11-02-2025</p>
                        </div>

                        <div className="bg-gray-300 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Semi Finished Details</h3>
                            <p className="text-sm"><strong>SF ID:</strong> SF1</p>
                            <p className="text-sm"><strong>Created By:</strong> Bharath (Manager)</p>
                            <p className="text-sm"><strong>Created At:</strong> 28/02/2025 12:24:23</p>
                            <p className="text-sm"><strong>Status:</strong> Started</p>

                        </div>
                    </div>
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

                {/* Products Section */}
                <div className="panel mb-6 bg-blue-100">
                    <h2 className="text-lg font-semibold mb-4">Semi Finished </h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left border border-gray-300">Description</th>
                                    {/* <th className="px-4 py-2 text-left border border-gray-300">Material Code</th> */}
                                    <th className="px-4 py-2 text-left border border-gray-300">UOM</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">PO Quantity</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Achieved</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Dispatched</th>
                                    <th className="px-4 py-2 text-left border border-gray-300">Packed</th>
                                    {/* <th className="px-4 py-2 text-left border border-gray-300">Plant Code</th> */}
                                    {/* <th className="px-4 py-2 text-left border border-gray-300">Delivery Date</th> */}
                                    {/* <th className="px-4 py-2 text-left border border-gray-300">Actions</th> */}

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((product, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border border-gray-300">{product.description}</td>
                                        {/* <td className="px-4 py-2 border border-gray-300">{product.materialCode}</td> */}
                                        <td className="px-4 py-2 border border-gray-300">{product.uom}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.requiredQuantity}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.achieved}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.dispatched}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.packed}</td>
                                        {/* <td className="px-4 py-2 border border-gray-300">{product.plantCode}</td> */}
                                        {/* <td className="px-4 py-2 border border-gray-300">{product.deliveryDate}</td> */}
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

                {/* Production Section */}
                <div className="panel bg-slate-50">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Production Details</h5>
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
                                { accessor: 'serialNumber', title: 'Sl No' }, // Serial Number
                                { accessor: 'quantity', title: 'Quantity' }, // Quantity Produced
                                { accessor: 'dateTime', title: 'Date & Time' }, // Production Date
                                { accessor: 'createdBy', title: 'Created By' }, // User who created the entry
                                { accessor: 'dueDate', title: 'Due Date' }, // Expected Completion Date
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

                {/* QC Check Data */}
                <div className="panel bg-slate-50">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Quality Check Details</h5>
                        <input
                            type="text"
                            className="form-input w-auto"
                            placeholder="Search by Serial Number, Created By, or Remarks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="datatables">
                        <DataTable
                            striped
                            className="whitespace-nowrap table-striped"
                            records={filteredQCCheckData.map((item) => ({
                                ...item,
                                balance: item.poQuantity - item.achievedTillNow - item.rejectedQuantity, // Calculating balance dynamically
                            }))}
                            columns={[
                                { accessor: "serialNumber", title: "Sl No" }, // Serial Number
                                { accessor: "rejectedQuantity", title: "Rejected Qty" }, // Rejected Quantity
                                { accessor: "remarks", title: "Remarks" }, // Remarks
                                { accessor: "createdBy", title: "Created By" }, // User who created the entry
                                { accessor: "timestamp", title: "Timestamp" }, // Quality Check Date & Time
                                { accessor: "poQuantity", title: "PO Quantity" }, // Purchase Order Quantity
                                { accessor: "achievedTillNow", title: "Achieved Till Now" }, // Quantity Achieved So Far
                                { accessor: "balance", title: "Balance" }, // Balance Calculation
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


            </div>
        </div>

    );
};

export default WorkOrderPage;
