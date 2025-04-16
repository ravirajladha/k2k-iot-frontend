import React, { useState } from 'react';
import IconX from '@/components/Icon/IconX';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconChecks from '@/components/Icon/IconChecks';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconFile from '@/components/Icon/IconFile';

import Select from 'react-select';
interface WorkOrder {
    id: string;
    plantCode: string;
    clientName: string;
    projectName: string;
}
interface QRCodeData {
    workOrder: string;
    product: string;
    uom: string;
    quantity: number;
}
interface FormData {
    clientName: string;
    projectName: string;
    workOrderNumber: string;
    workOrderDate: string;
    productId: string;
    uom: string;
    orderQuantity: string;
    plantCode: string;
    files: ImageListType;
}

const DispatchCreation = () => {
    const [selectedWorkOrder, setSelectedWorkOrder] = useState<string | null>(null);
    const [scannedQRCodes, setScannedQRCodes] = useState<string[]>([]);
    const [qrCodeInput, setQrCodeInput] = useState<string>('');
    // const [items, setItems] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        workOrderNumber: '',
        plantCode: '',
        clientName: '',
        projectName: '',
        productId: '',
        uom: '',
        dispatchQuantity: '',
        dispatchDate: '',
        invoiceSto: '',
        vehicleNumber: '',
        qrCodeImage: '',
    });
    const [showTooltip, setShowTooltip] = useState(false);

    const [isQRCodeGenerated, setIsQRCodeGenerated] = useState(false);

    const workOrders = [
        { id: 'WO101', plantCode: 'PC001', clientName: 'Client A', projectName: 'Project X' },
        { id: 'WO102', plantCode: 'PC002', clientName: 'Client B', projectName: 'Project Y' },
        { id: 'WO103', plantCode: 'PC003', clientName: 'Client C', projectName: 'Project Z' },
    ];

    const QR_CODE_DATA: Record<string, QRCodeData> = {
        QR123456: { workOrder: 'WO101', product: 'Steel Rod', uom: 'Nos', quantity: 50 },
        QR654321: { workOrder: 'WO101', product: 'Iron Rod', uom: 'Nos', quantity: 30 },
    };

    const workOrderOptions = workOrders.map((wo) => ({
        value: wo.id,
        label: `${wo.id} - ${wo.clientName} (${wo.projectName})`,
    }));

    const handleWorkOrderChange = (selectedOption: any) => {
        setSelectedWorkOrder(selectedOption?.value || null);
        setFormData((prev) => ({
            ...prev,
            workOrderNumber: selectedOption?.value || '',
        }));
        setScannedQRCodes([]);
        setItems([]);
    };

    const handleFileChange = (imageList: ImageListType) => {
        setFormData((prev) => ({ ...prev, files: imageList }));
    };
    const handleQRCodeInput = () => {
        if (!qrCodeInput) return;

        // Prevent duplicate scans
        if (scannedQRCodes.includes(qrCodeInput)) {
            alert('This QR Code is already scanned.');
            return;
        }

        const qrData = QR_CODE_DATA[qrCodeInput];

        if (!qrData) {
            alert('Invalid QR Code. No product found.');
            return;
        }

        if (selectedWorkOrder && qrData.workOrder !== selectedWorkOrder) {
            alert('Scanned QR Code does not belong to the selected Work Order.');
            return;
        }

        setScannedQRCodes([...scannedQRCodes, qrCodeInput]);

        setItems([
            ...items,
            {
                id: qrCodeInput,
                title: qrData.product,
                uom: qrData.uom,
                dispatchQuantity: qrData.quantity,
            },
        ]);

        setQrCodeInput('');
    };

    const removeItem = (qrCode: string) => {
        setItems(items.filter((item: any) => item.id !== qrCode));
        setScannedQRCodes(scannedQRCodes.filter((code) => code !== qrCode));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) {
            alert('Please scan at least one QR Code before submitting.');
            return;
        }

        console.log('Submitting Dispatch:', {
            workOrderNumber: formData.workOrderNumber,
            scannedQRCodes,
            products: items,
            invoiceSto: formData.invoiceSto,
            vehicleNumber: formData.vehicleNumber,
        });
    };

    // const handleQRCodeGeneration = () => {
    //     // Mock QR code generation
    //     setFormData((prev) => ({
    //         ...prev,
    //         qrCodeImage: 'https://via.placeholder.com/150?text=QR+Code', // Replace with real QR code logic
    //     }));
    //     setIsQRCodeGenerated(true);
    // };

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     console.log('Form Data:', formData);
    // };

    const [items, setItems] = useState<any>([{ id: 1, title: 'Cast Iron Rod', uom: 'Nos', dispatchQuantity: 10, plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0, recycledQuantity: 0 }]);

    // Get today's date
    const today = new Date();

    // Get the date 7 days from today
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const minDate = sevenDaysAgo.toISOString().split('T')[0];

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Iron Smith', link: '/', isActive: false },
        { label: 'Dispatch', link: '/iron-smith/dispatch/view', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/iron-smith/dispatch/view',
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
                                Currenlty the QR code string will check the exisiting work order , and provide the products scanned while packing. QR-CODE-STRING: QR123456,QR654321
                            </div>
                        )}
                    </button>
                </div>
                {/* <div className="mb-5">
                    <h5 className="font-semibold text-lg">Dispatch Creation</h5>
                </div> */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        {/* Work Order Number */}
                        <div>
                            <label htmlFor="workOrderNumber" className="block text-sm font-medium text-bold">
                                <strong> Work Order Number</strong>
                            </label>
                            <Select id="workOrderNumber" options={workOrderOptions} onChange={handleWorkOrderChange} placeholder="Select Work Order" isSearchable />
                        </div>
                        <div className="flex items-center space-x-2">
                            <label htmlFor="workOrderNumber" className="block text-sm font-medium text-bold">
                                <strong> Scan QR Code </strong>
                                <hr />
                                <div></div>
                                <span className="text-sm text-slate-600"> (***a/c to work order)</span>
                            </label>
                            <input type="text" placeholder="Enter QR Code" className="form-input" value={qrCodeInput} onChange={(e) => setQrCodeInput(e.target.value)} />
                            <button type="button" className="btn btn-primary" onClick={handleQRCodeInput}>
                                Scan
                            </button>
                        </div>

                        {/* Scanned Product List */}
                        {items.length > 0 && (
                            <div className="mt-6">
                                <h3 className="font-semibold text-lg">Scanned Products</h3>
                                <div className="table-responsive">
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border border-gray-300 px-4 py-2">Product</th>
                                                <th className="border border-gray-300 px-4 py-2">UOM</th>
                                                <th className="border border-gray-300 px-4 py-2">Dispatch Quantity</th>
                                                <th className="border border-gray-300 px-4 py-2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item: any) => (
                                                <tr key={item.id} className="text-center">
                                                    <td className="border border-gray-300 px-4 py-2">{item.title}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.uom}</td>
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
                        {/* Display Selected Work Order Details */}
                        {/* {selectedWorkOrder ? (
                            <div className="p-4 bg-gray-100 rounded col-span-3">
                                <h6 className="font-semibold text-md mb-2">Selected Work Order Details</h6>
                                <p>
                                    <strong>Plant Code:</strong> {selectedWorkOrder.plantCode}
                                </p>
                                <p>
                                    <strong>Client Name:</strong> {selectedWorkOrder.clientName}
                                </p>
                                <p>
                                    <strong>Project Name:</strong> {selectedWorkOrder.projectName}
                                </p>
                            </div>
                        ) : (
                            <p className="text-gray-600 col-span-3">
                                Please select a work order to see the details.
                            </p>
                        )} */}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* date */}
                        <div>
                            <label htmlFor="invoiceSto">Date</label>
                            <input
                                id="date"
                                name="date"
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
                                placeholder="Enter Invoice or STO"
                                className="form-input"
                                value={formData.invoiceSto}
                                onChange={(e) => setFormData({ ...formData, invoiceSto: e.target.value })}
                            />
                        </div>
                        {/* </div> */}

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
                                <div className="relative flex items-center">
                                    <button onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className="text-gray-500 hover:text-gray-700">
                                        <IconInfoCircle className="h-5 w-5" />
                                    </button>
                                    {showTooltip && (
                                        <div className="absolute top-0 left-full ml-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                                            An invoice pdf which can be attached with the invoice.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* File Upload Section */}
                            <ImageUploading
                                multiple
                                value={null}
                                onChange={handleFileChange}
                                // maxNumber={maxNumber}
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

export default DispatchCreation;
