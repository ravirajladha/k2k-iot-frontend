import React, { useState } from 'react';
import IconX from '@/components/Icon/IconX';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconChecks from '@/components/Icon/IconChecks';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconFile from '@/components/Icon/IconFile';

import Select from 'react-select'
interface WorkOrder {
    id: string;
    plantCode: string;
    clientName: string;
    projectName: string;
}
interface QRCodeData {
    productId: string;  // Unique identifier for product
    workOrder: string;
    product: string;
    uom: string;
    quantity: number;
    height?: string;  // Optional fields for additional details
    width?: string;
    hsnCode?: string;
    boq?: string;
    rate?: string;
    amount?: string;
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
        "QR123456": { productId: "P001", workOrder: "WO101", product: "Inward Window", uom: "Nos", quantity: 50 },
        "QR654321": { productId: "P002", workOrder: "WO101", product: "Outward Window", uom: "Nos", quantity: 30 },
        "QR789012": { productId: "P001", workOrder: "WO101", product: "Facade", uom: "Nos", quantity: 100 }, // Same productId as "QR123456"
        "QR345678": { productId: "P003", workOrder: "WO103", product: "Curtain Wall", uom: "Nos", quantity: 20 },
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

        const qrData = QR_CODE_DATA[qrCodeInput];

        if (!qrData) {
            alert("Invalid QR Code. No product found.");
            return;
        }
        console.log(selectedWorkOrder,)
        if (selectedWorkOrder && qrData.workOrder !== selectedWorkOrder) {
            alert("Scanned QR Code does not belong to the selected Work Order.");
            return;
        }

        // Prevent scanning the same QR code twice
        if (scannedQRCodes.includes(qrCodeInput)) {
            alert("This QR Code is already scanned.");
            return;
        }

        setScannedQRCodes([...scannedQRCodes, qrCodeInput]); // Store scanned QR code

        // Check if the same product_id already exists
        const existingItemIndex = items.findIndex((item) => item.productId === qrData.productId);

        if (existingItemIndex !== -1) {
            // Update quantity if product already exists
            const updatedItems = [...items];
            updatedItems[existingItemIndex].dispatchQuantity += qrData.quantity;
            setItems(updatedItems);
        } else {
            // Add new row with extra input fields
            setItems([
                ...items,
                {
                    id: qrCodeInput,  // Store QR code for uniqueness
                    productId: qrData.productId,  // Identify product
                    title: qrData.product,
                    uom: qrData.uom,
                    dispatchQuantity: qrData.quantity,
                    height: "5m",
                    width: "3m",
                    hsnCode: "HSN1234",
                    boq: "100kg",
                    hardware: "",
                    rate: "500",
                    amount: (qrData.quantity * 500).toString(), // Auto calculate amount
                },
            ]);
        }

        setQrCodeInput('');
    };

    const updateItem = (index: number, field: string, value: string) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;

        // Auto-update amount when rate changes
        if (field === "rate") {
            updatedItems[index]["amount"] = (parseFloat(value) * updatedItems[index]["dispatchQuantity"]).toString();
        }

        setItems(updatedItems);
    };




    const removeItem = (qrCode: string) => {
        setItems(items.filter((item: any) => item.id !== qrCode));
        setScannedQRCodes(scannedQRCodes.filter((code) => code !== qrCode));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) {
            alert("Please scan at least one QR Code before submitting.");
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
    const [items, setItems] = useState<any>([]);


    // const [items, setItems] = useState<any>([
    //     { id: 1, title: 'Product 1', uom: 'Nos', dispatchQuantity: 0, plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0, recycledQuantity: 0 },

    // ]);

    // Get today's date
    const today = new Date();

    // Get the date 7 days from today
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '/', isActive: false },
        { label: 'Dispatch', link: '/falcon-facade/dispatch/view', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/falcon-facade/dispatch',
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
                                Currently the QR code string will check the existing work order , and provide the products scanned while packing.
                                QR-CODE-STRING: QR123456,QR654321,QR789012,QR345678.
                                The first three is of product 1. the third qr code will increase the quantity as it of same product_id. the fourth qr code matched with work order 3.
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
                        <div  >
                            <label htmlFor="workOrderNumber" className="block text-sm font-medium text-bold">
                                <strong> Work Order Number</strong>
                            </label>
                            <Select
                                id="workOrderNumber"
                                options={workOrderOptions}
                                onChange={handleWorkOrderChange}
                                placeholder="Select Work Order"
                                isSearchable
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <label htmlFor="workOrderNumber" className="block text-sm font-medium text-bold">
                                <strong> Scan QR Code </strong>
                                <hr />
                                <div></div>
                                <span className="text-sm text-slate-600"> (***a/c to work order)</span>
                            </label>

                            <input
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
                        {items.length > 0 && (
    <div className="mt-4 overflow-x-auto">
        <h3 className="font-semibold text-xs">Scanned Products</h3>
        <div className="table-responsive">
            <table className="w-auto min-w-full border-collapse border border-gray-300 text-xs">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-2 py-1">Product</th>
                        <th className="border border-gray-300 px-2 py-1">UOM</th>
                        <th className="border border-gray-300 px-2 py-1">SF</th>

                        <th className="border border-gray-300 px-2 py-1">Dispatch Qty</th>
                        <th className="border border-gray-300 px-2 py-1">Height</th>
                        <th className="border border-gray-300 px-2 py-1">Width</th>
                        <th className="border border-gray-300 px-2 py-1">HSN Code</th>
                        <th className="border border-gray-300 px-2 py-1">BOQ</th>
                        <th className="border border-gray-300 px-2 py-1">Rate</th>
                        <th className="border border-gray-300 px-2 py-1">Amount</th>
                        <th className="border border-gray-300 px-2 py-1">Hardware Included</th>

                        <th className="border border-gray-300 px-2 py-1">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} className="text-center">
                            <td className="border border-gray-300 px-2 py-1">{item.title}</td>
                            <td className="border border-gray-300 px-2 py-1">{item.uom}</td>
                            <td className="border border-gray-300 px-2 py-1">SF1</td>

                            <td className="border border-gray-300 px-2 py-1">{item.dispatchQuantity}</td>
                            <td className="border border-gray-300 px-2 py-1">
                                <input
                                    type="text"
                                    value={item.height}
                                    onChange={(e) => updateItem(index, "height", e.target.value)}
                                    className="form-input w-16 text-xs"
                                />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                                <input
                                    type="text"
                                    value={item.width}
                                    onChange={(e) => updateItem(index, "width", e.target.value)}
                                    className="form-input w-16 text-xs"
                                />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                                <input
                                    type="text"
                                    value={item.hsnCode}
                                    onChange={(e) => updateItem(index, "hsnCode", e.target.value)}
                                    className="form-input w-20 text-xs"
                                />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                                <input
                                    type="text"
                                    value={item.boq}
                                    onChange={(e) => updateItem(index, "boq", e.target.value)}
                                    className="form-input w-16 text-xs"
                                />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                                <input
                                    type="text"
                                    value={item.rate}
                                    onChange={(e) => updateItem(index, "rate", e.target.value)}
                                    className="form-input w-16 text-xs"
                                />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                                <input
                                    type="text"
                                    value={item.amount}
                                    onChange={(e) => updateItem(index, "amount", e.target.value)}
                                    className="form-input w-16 text-xs"
                                />
                            </td> 
                             <td className="border border-gray-300 px-2 py-1">
                                <input
                                    type="text"
                                    value={item.hardware}
                                    onChange={(e) => updateItem(index, "hardware", e.target.value)}
                                    className="form-input w-16 text-xs"
                                />
                            </td>

                            <td className="border border-gray-300 px-2 py-1">
                                <button type="button" onClick={() => removeItem(item.id)}>
                                    <IconX className="w-4 h-4" />
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
                        {/* date */}
                        <div>
                            <label htmlFor="invoiceSto">Date</label>
                            <input
                                id="date"
                                name="date"
                                type="date"
                                className="form-input"
                                value={formData.invoiceSto}
                                min={new Date().toISOString().split("T")[0]} // Today's date
                                max={new Date(new Date().setDate(new Date().getDate() + 7))
                                    .toISOString()
                                    .split("T")[0]} // 7 days from today
                                onChange={(e) => setFormData({ ...formData, invoiceSto: e.target.value })}
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
                            // onChange={handleInputChange}
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
                            // onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="vehicleNumber">Contact Person Details</label>
                            <input
                                id="vehicleNumber"
                                name="vehicleNumber"
                                type="text"
                                placeholder="Enter Vehicle Number"
                                className="form-input"
                                value={formData.vehicleNumber}
                            // onChange={handleInputChange}
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
                                    <button
                                        onMouseEnter={() => setShowTooltip(true)}
                                        onMouseLeave={() => setShowTooltip(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
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
                                        <button
                                            type="button"
                                            className="btn btn-primary mb-2 flex items-center space-x-2"
                                            onClick={onImageUpload}
                                        >
                                            <IconFile className="shrink-0" />
                                            <span>Upload Invoice</span>
                                        </button>
                                        <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                            {imageList.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={image.dataURL}
                                                        alt="uploaded"
                                                        className="w-full h-32 object-cover rounded"
                                                    />
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
