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
    woNumber: string;
    plantCode: string;
    clientName: string;
    projectName: string;
    address: string;
}

interface QRCodeData {
    productId: string;
    workOrder: string;
    product: string;
    uom: string;
    code: string;
    colorCode: string;
    balanceQty: string;
    totalQty: string;
    quantity: number;
    height?: string;
    width?: string;
    hsnCode?: string;
    boq?: string;
    rate?: string;
    amount?: string;
}

interface FormData {
    clientName: string;
    projectName: string;
    woNumber: string;
    workOrderNumber: string;
    address: string;
    workOrderDate: string;
    productId: string;
    uom: string;
    orderQuantity: string;
    plantCode: string;
    files: ImageListType;
    dispatchQuantity: string;
    dispatchDate: string;
    invoiceSto: string;
    vehicleNumber: string;
    contactDetails: string;
    qrCodeImage: string;
    ticketNumber: string;
}

const DispatchCreation = () => {
    const [selectedWorkOrder, setSelectedWorkOrder] = useState<string | null>(null);
    const [scannedQRCodes, setScannedQRCodes] = useState<string[]>([]);
    const [qrCodeInput, setQrCodeInput] = useState<string>('');
    const [items, setItems] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        workOrderNumber: '',
        plantCode: '',
        woNumber: '',
        clientName: '',
        projectName: '',
        address: '',
        productId: '',
        uom: '',
        dispatchQuantity: '',
        dispatchDate: '',
        invoiceSto: '',
        vehicleNumber: '',
        contactDetails: '',
        qrCodeImage: '',
        gatePassNo: '',
        dcNo: '',
        ticketNumber: '',
    });
    const [showTooltip, setShowTooltip] = useState(false);

    // const workOrders: WorkOrder[] = [
    //     { id: 'WO101', plantCode: 'PC001', clientName: 'Client A', projectName: 'Project X', address: '123 Main St, City A' },
    //     { id: 'WO102', plantCode: 'PC002', clientName: 'Client B', projectName: 'Project Y', address: '456 Oak Ave, City B' },
    //     { id: 'WO103', plantCode: 'PC003', clientName: 'Client C', projectName: 'Project Z', address: '789 Pine Rd, City C' },
    // ];
    const workOrders: WorkOrder[] = [
        { id: 'JO101', woNumber: 'JO101', plantCode: 'PC001', clientName: 'Client A', projectName: 'Project X', address: '123 Main St, City A' },
        { id: 'JO102', woNumber: 'JO102', plantCode: 'PC002', clientName: 'Client B', projectName: 'Project Y', address: '456 Oak Ave, City B' },
        { id: 'JO103', woNumber: 'JO103', plantCode: 'PC003', clientName: 'Client C', projectName: 'Project Z', address: '789 Pine Rd, City C' },
    ];

    const QR_CODE_DATA: Record<string, QRCodeData> = {
        QR123456: { productId: 'P001', workOrder: 'JO101', product: 'Inward Window', uom: 'Nos', quantity: 50, code: 'TYPE-P5(T)', colorCode: 'RAL 9092', balanceQty: '50', totalQty: '100' },
        QR654321: { productId: 'P002', workOrder: 'JO101', product: 'Outward Window', uom: 'Nos', quantity: 30, code: 'TYPE-P5(T)', colorCode: 'RAL 9092', balanceQty: '50', totalQty: '100' },
        QR789012: { productId: 'P001', workOrder: 'JO101', product: 'Facade', uom: 'Nos', quantity: 100, code: 'TYPE-P5(T)', colorCode: 'RAL 9092', balanceQty: '50', totalQty: '100' },
        QR345678: { productId: 'P003', workOrder: 'JO103', product: 'Curtain Wall', uom: 'Nos', quantity: 20, code: 'TYPE-P5(T)', colorCode: 'RAL 9092', balanceQty: '50', totalQty: '100' },
    };

    const workOrderOptions = workOrders.map((wo) => ({
        value: wo.id,
        label: `${wo.id}`,
    }));

    const handleWorkOrderChange = (selectedOption: any) => {
        const selectedWorkOrder = workOrders.find((wo) => wo.id === selectedOption?.value) || {
            id: '',
            woNumber: '',
            clientName: '',
            address: '',
        };
        setSelectedWorkOrder(selectedOption?.value || null);
        setFormData((prev) => ({
            ...prev,
            workOrderNumber: selectedOption?.value || '',
            woNumber: selectedWorkOrder.woNumber,
            clientName: selectedWorkOrder.clientName,
            address: selectedWorkOrder.address,
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
            alert('Invalid QR Code. No product found.');
            return;
        }
        if (selectedWorkOrder && qrData.workOrder !== selectedWorkOrder) {
            alert('Scanned QR Code does not belong to the selected Work Order.');
            return;
        }
        if (scannedQRCodes.includes(qrCodeInput)) {
            alert('This QR Code is already scanned.');
            return;
        }

        setScannedQRCodes([...scannedQRCodes, qrCodeInput]);
        const existingItemIndex = items.findIndex((item) => item.productId === qrData.productId);

        if (existingItemIndex !== -1) {
            const updatedItems = [...items];
            updatedItems[existingItemIndex].dispatchQuantity += qrData.quantity;
            setItems(updatedItems);
        } else {
            setItems([
                ...items,
                {
                    id: qrCodeInput,
                    productId: qrData.productId,
                    title: qrData.product,
                    uom: qrData.uom,
                    dispatchQuantity: qrData.quantity,
                    balanceQuantity: qrData.balanceQty,
                    totalQuantity: qrData.totalQty,
                    code: qrData.code,
                    colorCode: qrData.colorCode,
                    height: '1047',
                    width: '1025',
                    hsnCode: 'HSN1234',
                    boq: '100kg',
                    hardware: '',
                    rate: '500',
                    amount: (qrData.quantity * 500).toString(),
                },
            ]);
        }
        setQrCodeInput('');
    };

    const updateItem = (index: number, field: string, value: string) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        if (field === 'rate') {
            updatedItems[index]['amount'] = (parseFloat(value) * updatedItems[index]['dispatchQuantity']).toString();
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

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const minDate = sevenDaysAgo.toISOString().split('T')[0];

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
                                Currently the QR code string will check the existing work order , and provide the products scanned while packing. QR-CODE-STRING: QR123456,QR654321,QR789012,QR345678.
                                The first three is of product 1. the third qr code will increase the quantity as it of same product_id. the fourth qr code matched with work order 3.
                            </div>
                        )}
                    </button>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Work Order Number */}
                        <div>
                            <label htmlFor="workOrderNumber" className="block text-sm font-medium text-bold">
                                <strong>Job Order Number</strong>
                            </label>
                            <Select
                                id="workOrderNumber"
                                options={workOrderOptions}
                                onChange={handleWorkOrderChange}
                                placeholder="Select Job Order"
                                isSearchable
                                value={workOrderOptions.find((option) => option.value === formData.workOrderNumber) || null}
                            />
                        </div>
                        {/* Client Name */}
                        <div>
                            <label htmlFor="woNumber" className="block text-sm font-medium">
                                <strong>WO Number</strong>
                            </label>
                            <input id="woNumber" type="text" className="form-input w-full" value={formData.woNumber} readOnly placeholder="Work Order will appear here" />
                        </div>
                        <div>
                            <label htmlFor="clientName" className="block text-sm font-medium">
                                <strong>Client Name</strong>
                            </label>
                            <input id="clientName" type="text" className="form-input w-full" value={formData.clientName} readOnly placeholder="Client name will appear here" />
                        </div>
                        {/* Address */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium">
                                <strong>Address</strong>
                            </label>
                            <input id="address" type="text" className="form-input w-full" value={formData.address} readOnly placeholder="Address will appear here" />
                        </div>
                        {/* QR Code Input */}
                        <div className="flex items-end space-x-2">
                            <div className="flex-1">
                                <label htmlFor="qrCodeInput" className="block text-sm font-medium text-bold">
                                    <strong>Scan QR Code</strong>
                                    <span className="text-sm text-slate-600"> (***a/c to work order)</span>
                                </label>
                                <input id="qrCodeInput" type="text" placeholder="Enter QR Code" className="form-input w-full" value={qrCodeInput} onChange={(e) => setQrCodeInput(e.target.value)} />
                            </div>
                            <button type="button" className="btn btn-primary mt-6" onClick={handleQRCodeInput}>
                                Scan
                            </button>
                        </div>
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
                                            <th className="border border-gray-300 px-2 py-1">Balance Qty</th>
                                            <th className="border border-gray-300 px-2 py-1">Total Qty</th>
                                            <th className="border border-gray-300 px-2 py-1">Code</th>
                                            <th className="border border-gray-300 px-2 py-1">Color Code</th>
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
                                                <td className="border border-gray-300 px-2 py-1">{item.balanceQuantity}</td>
                                                <td className="border border-gray-300 px-2 py-1">{item.totalQuantity}</td>
                                                <td className="border border-gray-300 px-2 py-1">{item.code}</td>
                                                <td className="border border-gray-300 px-2 py-1">{item.colorCode}</td>
                                                <td className="border border-gray-300 px-2 py-1">
                                                    <input type="text" value={item.height} onChange={(e) => updateItem(index, 'height', e.target.value)} className="form-input w-16 text-xs" />
                                                </td>
                                                <td className="border border-gray-300 px-2 py-1">
                                                    <input type="text" value={item.width} onChange={(e) => updateItem(index, 'width', e.target.value)} className="form-input w-16 text-xs" />
                                                </td>
                                                <td className="border border-gray-300 px-2 py-1">
                                                    <input type="text" value={item.hsnCode} onChange={(e) => updateItem(index, 'hsnCode', e.target.value)} className="form-input w-20 text-xs" />
                                                </td>
                                                <td className="border border-gray-300 px-2 py-1">
                                                    <input type="text" value={item.boq} onChange={(e) => updateItem(index, 'boq', e.target.value)} className="form-input w-16 text-xs" />
                                                </td>
                                                <td className="border border-gray-300 px-2 py-1">
                                                    <input type="text" value={item.rate} onChange={(e) => updateItem(index, 'rate', e.target.value)} className="form-input w-16 text-xs" />
                                                </td>
                                                <td className="border border-gray-300 px-2 py-1">
                                                    <input type="text" value={item.amount} onChange={(e) => updateItem(index, 'amount', e.target.value)} className="form-input w-16 text-xs" />
                                                </td>
                                                <td className="border border-gray-300 px-2 py-1">
                                                    <input type="text" value={item.hardware} onChange={(e) => updateItem(index, 'hardware', e.target.value)} className="form-input w-16 text-xs" />
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

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                        <div>
                            <label htmlFor="contactDetails">Contact Person Details</label>
                            <input
                                id="contactDetails"
                                name="contactDetails"
                                type="text"
                                placeholder="Enter contact person details"
                                className="form-input"
                                value={formData.contactDetails}
                                onChange={(e) => setFormData({ ...formData, contactDetails: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="contactDetails">Gate Pass No:</label>
                            <input
                                id="contactDetails"
                                name="contactDetails"
                                type="text"
                                placeholder="Enter gate pass number"
                                className="form-input"
                                value={formData.gatePassNo}
                                onChange={(e) => setFormData({ ...formData, gatePassNo: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="ticketNumber">Ticket No:</label>
                            <input
                                id="ticketNumber"
                                name="ticketNumber"
                                type="text"
                                placeholder="Enter Ticket number"
                                className="form-input"
                                value={formData.ticketNumber}
                                onChange={(e) => setFormData({ ...formData, ticketNumber: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="contactDetails">DC No:</label>
                            <input
                                id="contactDetails"
                                name="contactDetails"
                                type="text"
                                placeholder="Enter DC number"
                                className="form-input"
                                value={formData.dcNo}
                                onChange={(e) => setFormData({ ...formData, dcNo: e.target.value })}
                            />
                        </div>
                        <div className="mb-6">
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
                            <ImageUploading multiple value={null} onChange={handleFileChange}>
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
