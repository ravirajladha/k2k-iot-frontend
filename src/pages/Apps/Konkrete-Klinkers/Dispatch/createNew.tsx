import React, { useState, useEffect } from 'react';
import IconX from '@/components/Icon/IconX';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconFile from '@/components/Icon/IconFile';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { fetchDispatchData, storeDispatchData, scanQrIds } from '@/api/konkreteKlinkers/dispatch';
import { fetchWorkOrderData } from '@/api/konkreteKlinkers/workOrder';

const DispatchCreation = () => {
    console.log("came here inside new dispatch");
    
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');
    const [workOrderOptions, setWorkOrderOptions] = useState([]);
    const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
    const [qrCodeInput, setQrCodeInput] = useState('');
    const [scannedItems, setScannedItems] = useState([]);
    console.log("scannedItems", scannedItems);
    
    const [scannedQRCodes, setScannedQRCodes] = useState([]); // Will store Packing document IDs
    const [formData, setFormData] = useState({
        workOrderNumber: '',
        dispatchDate: '',
        invoiceSto: '',
        vehicleNumber: '',
        files: [],
    });
    const [showTooltip, setShowTooltip] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch work orders for dropdown
    useEffect(() => {
        const fetchWorkOrders = async () => {
            try {
                const options = await fetchWorkOrderData();
                const workOrderData = options.map((workOrder) => ({
                    value: workOrder._id,
                    label: `${workOrder.work_order_number}`,
                }));
                setWorkOrderOptions(workOrderData);
            } catch (error) {
                setApiError('Failed to fetch work orders. Please try again.');
            }
        };
        fetchWorkOrders();
    }, []);

    // Handle work order selection
    const handleWorkOrderChange = (selectedOption) => {
        setSelectedWorkOrder(selectedOption?.value || null);
        setFormData((prev) => ({
            ...prev,
            workOrderNumber: selectedOption?.value || '',
        }));
        setScannedItems([]);
        setScannedQRCodes([]);
    };

    // Handle QR code scanning
    const handleQRCodeInput = async () => {
        if (!qrCodeInput) {
            setApiError('Please enter a QR code.');
            return;
        }

        if (!selectedWorkOrder) {
            setApiError('Please select a work order first.');
            return;
        }

        // Check if the QR code has already been scanned (using the Packing document ID)
        if (scannedQRCodes.some((item) => item.qrCodeString === qrCodeInput)) {
            setApiError('This QR code has already been scanned.');
            return;
        }

        try {
            console.log("qrCodeInput", qrCodeInput);
            
            const qrData = await scanQrIds(qrCodeInput);
            console.log("qrData", qrData);
            
            if (!qrData) {
                setApiError('Invalid QR code. No product found.');
                return;
            }

            if (qrData.work_order !== selectedWorkOrder) {
                setApiError('Scanned QR code does not belong to the selected Work Order.');
                return;
            }

            // Ensure qr_id or qr_code exists
            const qrId = qrData.qr_id || qrData.qr_code;
            if (!qrId) {
                setApiError('QR code ID is missing in the response.');
                return;
            }

            const newItem = {
                id: qrCodeInput, // For display purposes
                title: qrData.product.description,
                uom: qrData.uom,
                batchIds: [qrId], // Initialize as an array with the current qr_id
                dispatchQuantity: qrData.product_quantity,
                productId: qrData.product._id,
                workOrder: qrData.work_order,
                packingId: qrData._id, // Store the Packing document ID
            };

            // Check if the product already exists in scanned items
            const existingItemIndex = scannedItems.findIndex(
                (item) => item.productId === newItem.productId && item.workOrder === newItem.workOrder
            );

            if (existingItemIndex !== -1) {
                // Update dispatch quantity and append the new qr_id to batchIds
                const updatedItems = [...scannedItems];
                // Ensure batchIds is an array
                if (!Array.isArray(updatedItems[existingItemIndex].batchIds)) {
                    updatedItems[existingItemIndex].batchIds = updatedItems[existingItemIndex].batchId
                        ? [updatedItems[existingItemIndex].batchId]
                        : [];
                }
                updatedItems[existingItemIndex].batchIds.push(qrId); // Append the new qr_id
                updatedItems[existingItemIndex].dispatchQuantity += newItem.dispatchQuantity;
                setScannedItems(updatedItems);
            } else {
                // Add new item
                setScannedItems([...scannedItems, newItem]);
            }

            // Store the Packing document ID along with the QR code string for reference
            setScannedQRCodes([
                ...scannedQRCodes,
                { packingId: qrData.qr_code, qrCodeString: qrCodeInput },
            ]);
            setQrCodeInput('');
            setApiError('');
        } catch (error) {
            setApiError(error.response?.data?.message || 'Failed to scan QR code. Please try again.');
        }
    };

    // Remove a scanned item
    const removeItem = (qrCode) => {
        setScannedItems(scannedItems.filter((item) => item.id !== qrCode));
        setScannedQRCodes(scannedQRCodes.filter((item) => item.qrCodeString !== qrCode));
    };

    // Handle file change for invoice upload
    const handleFileChange = (imageList) => {
        setFormData((prev) => ({ ...prev, files: imageList }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        if (!formData.workOrderNumber) {
            setApiError('Please select a work order.');
            return;
        }

        if (scannedItems.length === 0) {
            setApiError('Please scan at least one QR code before submitting.');
            return;
        }

        if (!formData.dispatchDate) {
            setApiError('Please select a dispatch date.');
            return;
        }

        if (!formData.invoiceSto) {
            setApiError('Please enter an invoice/STO number.');
            return;
        }

        if (!formData.vehicleNumber) {
            setApiError('Please enter a vehicle number.');
            return;
        }

        if (!formData.files || formData.files.length === 0) {
            setApiError('Please upload an invoice file.');
            return;
        }

        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('work_order', formData.workOrderNumber);
            formDataToSend.append('invoice_or_sto', formData.invoiceSto);
            formDataToSend.append('vehicle_number', formData.vehicleNumber);
            // Send the array of Packing document IDs
            console.log("scannedQRCodes", scannedQRCodes);
            
            const packingIds = scannedQRCodes.map((item) => item.packingId);
            formDataToSend.append('qr_codes', JSON.stringify(packingIds));
            formDataToSend.append('date', formData.dispatchDate);

            if (formData.files.length > 0) {
                const file = formData.files[0].file;
                formDataToSend.append('invoice_file', file);
            }

            await storeDispatchData(formDataToSend);
            navigate('/konkrete-klinkers/dispatch/view');
        } catch (error) {
            setApiError(error.response?.data?.message || 'Failed to create dispatch. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Date constraints
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    const minDate = sevenDaysAgo.toISOString().split('T')[0];
    const maxDate = nextWeek.toISOString().split('T')[0];

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Dispatch', link: '/konkrete-klinkers/dispatch/view', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

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

            <div className="panel">
                <div className="mb-5 flex items-center justify-between">
                    <h5 className="font-semibold text-lg dark:text-white-light">Dispatch Creation</h5>
                    <button
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600 relative"
                    >
                        <span className="flex items-center">
                            <IconInfoCircle className="me-2" />
                        </span>
                        {showTooltip && (
                            <div className="absolute top-0 right-full ml-2 w-64 bg-gray-800 text-white text-sm p-3 rounded shadow-lg z-50">
                                Currently the QR code string will check the existing work order and provide the products scanned while packing.
                            </div>
                        )}
                    </button>
                </div>

                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        {/* Work Order Number */}
                        <div>
                            <label htmlFor="workOrderNumber" className="block text-sm font-medium text-bold">
                                <strong>Work Order Number</strong>
                            </label>
                            <Select
                                id="workOrderNumber"
                                options={workOrderOptions}
                                onChange={handleWorkOrderChange}
                                placeholder="Select Work Order"
                                isSearchable
                            />
                        </div>

                        {/* QR Code Scanning */}
                        <div className="flex items-center space-x-2">
                            <label htmlFor="qrCodeInput" className="block text-sm font-medium text-bold">
                                <strong>Scan QR Code</strong>
                                <hr />
                                <span className="text-sm text-slate-600"> (***a/c to work order)</span>
                            </label>
                            <input
                                id="qrCodeInput"
                                type="text"
                                placeholder="Enter QR Code"
                                className="form-input"
                                value={qrCodeInput}
                                onChange={(e) => setQrCodeInput(e.target.value)}
                            />
                            <button type="button" className="btn btn-primary" onClick={handleQRCodeInput}>
                                Scan
                            </button>
                        </div>

                        {/* Scanned Product List */}
                        {scannedItems.length > 0 && (
                            <div className="mt-6">
                                <h3 className="font-semibold text-lg">Scanned Products</h3>
                                <div className="table-responsive">
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border border-gray-300 px-4 py-2">Product</th>
                                                <th className="border border-gray-300 px-4 py-2">UOM</th>
                                                <th className="border border-gray-300 px-4 py-2">Batch ID</th>
                                                <th className="border border-gray-300 px-4 py-2">Dispatch Quantity</th>
                                                <th className="border border-gray-300 px-4 py-2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {scannedItems.map((item, index) => (
                                                <tr key={index} className="text-center">
                                                    <td className="border border-gray-300 px-4 py-2">{item.title}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.uom}</td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {(item.batchIds || (item.batchId ? [item.batchId] : [])).join(', ') || 'N/A'}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.dispatchQuantity}</td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <button type="button" onClick={() => removeItem(item.id)}>
                                                            <IconX className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Date */}
                        <div>
                            <label htmlFor="dispatchDate">Date</label>
                            <input
                                id="dispatchDate"
                                name="dispatchDate"
                                type="date"
                                className="form-input"
                                value={formData.dispatchDate}
                                min={minDate}
                                max={maxDate}
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
                                placeholder="Enter Invoice or STO"
                                className="form-input"
                                value={formData.invoiceSto}
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
                            <div className="flex items-center space-x-1">
                                <label htmlFor="invoiceFile">
                                    Upload Invoice <span className="text-red-500">*</span>
                                </label>
                                <div className="relative flex items-center">
                                    <button onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className="text-gray-500 hover:text-gray-700">
                                        <IconInfoCircle className="h-5 w-5" />
                                    </button>
                                    {showTooltip && (
                                        <div className="absolute top-0 left-full ml-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                                            An invoice PDF which can be attached with the dispatch.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <ImageUploading multiple={false} value={formData.files} onChange={handleFileChange}>
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
                                                    <button
                                                        type="button"
                                                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                                        onClick={() => onImageRemove(index)}
                                                    >
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
                        <button type="submit" className="btn btn-success w-1/2" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 inline-block align-middle"></span>
                            ) : (
                                <>
                                    <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                    Submit
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger w-1/2"
                            onClick={() => navigate('/konkrete-klinkers/dispatch/view')}
                            disabled={isSubmitting}
                        >
                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DispatchCreation;