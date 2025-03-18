import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconFile from '@/components/Icon/IconFile';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';

const StcokDetailPage = () => {
    // console.log("inside dispatch edit page");

    const dispatch = useDispatch();
    const location = useLocation();
    const { rowData } = location.state || {}; // Access the rowData passed from the previous component
    console.log('rowData', rowData);

    const [formData, setFormData] = useState({
        workOrderNumber: rowData.workOrder || '',
        invoiceSto: rowData.invoiceNo || '',
        vehicleNumber: rowData.vehicleNumber || '',
        dispatchDate: rowData.timestamp ? new Date(rowData.timestamp).toISOString().split('T')[0] : '',
    });

    useEffect(() => {
        dispatch(setPageTitle('Stock Detail'));
    }, [dispatch]);

    if (!rowData) {
        return <div>No dispatch data available.</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Stock Managemenet', link: '/konkrete-klinkers/stockManagement', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    const handleFileChange = (imageList: ImageListType) => {
        // Handle file change logic here
    };

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const minDate = sevenDaysAgo.toISOString().split('T')[0];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/stockManagement',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />
            <button onClick={() => window.print()} className="mb-10 bg-blue-500 text-white px-4 py-2 rounded float-right">
                Print Page
            </button>
            <div className="p-4 pt-10">
                {/* Client Details Section */}
                <div className="panel mb-6 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Stock Transfer Details</h2>

                    <div className="bg-white p-4 w-full flex flex-row gap-4">
                        {/* Left Section: Client Details */}
                        <div className="bg-yellow-50 p-4 rounded-md shadow flex-1">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Client Details</h3>
                            <p className="text-sm">
                                <strong>Client Name:</strong> {rowData.clientName || 'Client Alpha'}
                            </p>
                            <p className="text-sm">
                                <strong>Project Name:</strong> {rowData.projectName || 'Project Alpha'}
                            </p>
                        </div>

                        {/* Right Section: Work Order Details */}
                        <div className="bg-blue-50 p-4 flex flex-col flex-1 rounded-lg shadow-md">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm">
                                <strong>Work Order Id:</strong> {rowData.workOrderId || 'N/A'}
                            </p>
                            {/* <p className="text-sm">
                                <strong>Job Order ID:</strong> {rowData.jobOrderId || 'N/A'}
                            </p> */}
                            {/* <p className="text-sm">
                                <strong>Status:</strong> {rowData.status || 'N/A'}
                            </p> */}
                            <p className="text-sm">
                                <strong>Created By:</strong> {rowData.createdBy || 'N/A'}
                            </p>
                            <p className="text-sm">
                                <strong>Timestamp:</strong> {new Date(rowData.timestamp).toLocaleString() || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-6 mt-6 justify-center border p-5 rounded-lg">
                    <div className="product-card border rounded-lg shadow p-4 flex flex-col items-center w-96 overflow-hidden relative">
                        <div className="serial-number absolute  top-0 p-1 text-right mb-5">
                            <span className="font-semibold text-lg">Transfered From</span>
                        </div>

                        <div className="product-header border-b border-gray-400 pb-1 mb-1 w-full mt-6 text-center">
                            <h3 className="text-sm font-semibold">Product: {rowData.product_id}</h3>
                        </div>

                        <div className="flex items-center justify-center w-full">
                            {/* Key-Value Data */}
                            <div className="product-details p-2 text-xs ">
                                <div className="grid grid-cols-2 gap-1">
                                    <div className="font-semibold">Work Order Id</div>
                                    <div>: {rowData.workOrderId}</div>
                                    {/* <div className="font-semibold">Job Order Id</div>
                                    <div>: {rowData.jobOrderId}</div> */}
                                    <div className="font-semibold">Client Name</div>
                                    <div>: Client Alpha</div>
                                    <div className="font-semibold">Project Name</div>
                                    <div>: Project Alpha</div>
                                    <div>
                                        <strong>Transfered Qty</strong>
                                    </div>
                                    <div>: {rowData.quantity}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="product-card  border rounded-lg  shadow p-4 flex flex-col items-center w-96 overflow-hidden relative">
                        {/* S.No in the right corner */}
                        <div className="serial-number absolute  top-0 p-1 text-right mb-5">
                            <span className="font-semibold text-lg">Transfered To</span>
                        </div>

                        <div className="product-header border-b border-gray-400 pb-1 mb-1  w-full mt-6 text-center">
                            <h3 className="text-sm font-semibold">Product: {rowData.product_id}</h3>
                        </div>
                        <div className="flex items-center">
                            {/* Key-Value Data */}
                            <div className="product-details p-2 text-xs">
                                <div className="grid grid-cols-2 gap-1">
                                    <div className="font-semibold">Work Order Id</div>
                                    <div>: {rowData.to_work_order_id}</div>
                                    {/* <div className="font-semibold">Job Order Id</div>
                                    <div>: {rowData.to_job_order_id}</div> */}
                                    <div className="font-semibold">Client Name</div>
                                    <div>: Client Beta</div>
                                    <div className="font-semibold">Project Name</div>
                                    <div>: Project Beta</div>
                                    <div>
                                        <strong>Received Qty</strong>
                                    </div>
                                    <div>: {rowData.quantity}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StcokDetailPage;
