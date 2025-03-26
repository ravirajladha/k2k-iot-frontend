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

const DispatchDetailPage = () => {
    console.log("inside dispatch edit page");

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
        dispatch(setPageTitle('Dispatch Detail'));
    }, [dispatch]);

    if (!rowData) {
        return <div>No dispatch data available.</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Dispatch', link: '/konkrete-klinkers/dispatch/view', isActive: false },
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
                    link: '/konkrete-klinkers/dispatch/view',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />
            <button onClick={() => window.print()} className="mb-10 bg-blue-500 text-white px-4 py-2 rounded float-right">
                Print Page
            </button>
            <div className="p-4 pt-10">
                {/* Client Details Section */}
                <div className="panel mb-6 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Packing Details</h2>

                    <div className="bg-white p-4 w-full flex flex-row gap-4">
                        {/* Left Section: Client Details */}
                        <div className="bg-yellow-50 p-4 rounded-md shadow flex-1">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Client Details</h3>
                            <p className="text-sm">
                                <strong>Client Name:</strong> {rowData.clientName || 'Client Alpha'}
                            </p>
                            <p className="text-sm">
                                <strong>Project Name:</strong> {rowData.projectName || 'Project Phoenix'}
                            </p>
                        </div>

                        {/* Right Section: Work Order Details */}
                        <div className="bg-blue-50 p-4 flex flex-col flex-1 rounded-lg shadow-md">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm">
                                <strong>Work Order Id:</strong> {rowData.workOrder || 'N/A'}
                            </p>
                            <p className="text-sm">
                                <strong>Job Order ID:</strong> {rowData.jobOrder || 'N/A'}
                            </p>
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

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        {/* Work Order Number */}
                        <div>
                            <label htmlFor="workOrderNumber" className="block text-sm font-medium text-bold">
                                <strong> Work Order Number</strong>
                            </label>

                            <input type="text" className="form-input" value={formData.workOrderNumber} readOnly />
                        </div>

                        <div className="mt-6">
                            <div className="table-responsive">
                                <table className="w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-gray-300 px-4 py-2">Product</th>
                                            <th className="border border-gray-300 px-4 py-2">UOM</th>
                                            <th className="border border-gray-300 px-4 py-2">Batch ID</th>
                                            <th className="border border-gray-300 px-4 py-2">Dispatch Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowData.products.map((product, index) => (
                                            <tr key={index} className="text-center">
                                                <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
                                                <td className="border border-gray-300 px-4 py-2">Nos</td>
                                                <td className="border border-gray-300 px-4 py-2">Batch{index + 1}</td>
                                                <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* date */}
                        <div>
                            <label htmlFor="dispatchDate">Date</label>
                            <input
                                id="dispatchDate"
                                name="dispatchDate"
                                type="date"
                                className="form-input"
                                value={formData.dispatchDate}
                                min={minDate}
                                max={new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]}
                                onChange={(e) => setFormData({ ...formData, dispatchDate: e.target.value })}
                            />
                        </div>
                        {/* Invoice/STO */}
                        <div>
                            <label htmlFor="invoiceSto">Invoice/STO</label>
                            <input
                                id="invoiceSto"
                                name="invoiceSto"
                                type="text"
                                value={formData.invoiceSto}
                                className="form-input"
                                onChange={(e) => setFormData({ ...formData, invoiceSto: e.target.value })}
                            />
                        </div>

                        {/* Vehicle Number */}
                        <div>
                            <label htmlFor="vehicleNumber">Vehicle Number</label>
                            <input
                                id="vehicleNumber"
                                name="vehicleNumber"
                                type="text"
                                placeholder="Enter Vehicle Number"
                                className="form-input"
                                value={formData.vehicleNumber}
                                onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                            />
                        </div>

                        {/* File Upload */}
                        <div className="mb-6">
                            {/* Label and Tooltip */}
                            <div className="flex items-center space-x-1">
                                <label htmlFor="clientName">
                                    Upload Invoice <span className="text-red-500">*</span>
                                </label>
                            </div>

                            {/* File Upload Section */}
                            <ImageUploading
                                multiple
                                value={null}
                                onChange={handleFileChange}
                            >
                                {({ imageList, onImageUpload, onImageRemove }) => (
                                    <div>
                                        <button type="button" className="btn btn-primary mb-2 flex items-center space-x-2" onClick={onImageUpload}>
                                            <IconFile className="shrink-0" />
                                            <span>Upload Invoice</span>
                                        </button>
                                        <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                            {imageList.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <img src={image.dataURL} alt="uploaded" className="w-full h-32 object-cover rounded" />
                                                    <button type="button" className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full" onClick={() => onImageRemove(index)}>
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </ImageUploading>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4">
                        <button type="submit" className="btn btn-success w-1/2">
                            <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger w-1/2">
                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DispatchDetailPage;
