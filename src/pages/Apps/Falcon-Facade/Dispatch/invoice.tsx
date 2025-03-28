import { useEffect, useState } from 'react';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconPrinter from '@/components/Icon/IconPrinter';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';

const DispatchChallan = () => {
    const reduxDispatch = useReduxDispatch();
    const location = useLocation();
    const dispatchId = location.state?.dispatchId;

    const [dispatchData] = useState({
        workOrderNumber: 'WO101',
        clientName: 'Client A',
        projectName: 'Project X',
        productId: 'Product A',
        uom: 'Box',
        dispatchQuantity: 10,
        invoiceSto: 'INV-12345',
        vehicleNumber: 'KA-01-1234',
        products: [
            {
                productId: 'PRD001',
                productName: 'Glass Facade',
                uom: 'Nos',
                semiFinishedProducts: [
                    {
                        sfId: 'SF1',
                        quantity: 50,
                        qrCodes: ['QR1', 'QR2', 'QR3', 'QR4', 'QR5'],
                        hsnCode: 'HSN123',
                        rate: 500,
                        amount: 2500,
                    },
                ],
            },
        ],
    });

    useEffect(() => {
        reduxDispatch(setPageTitle('Dispatch Challan'));
    }, [reduxDispatch]);

    const handlePrint = () => {
        window.print();
    };

    const columns = [
        { key: 'id', label: 'S.NO' },
        { key: 'productName', label: 'Product Name' },
        { key: 'sfId', label: 'SF' },
        { key: 'dispatchQty', label: 'Dispatch Qty' },
        { key: 'code', label: 'Code' },
        { key: 'colorCode', label: 'Color Code' },
        { key: 'height', label: 'Height' },
        { key: 'width', label: 'Width' },
        { key: 'hsnCode', label: 'HSN Code' },
        { key: 'boq', label: 'BOQ' },
        { key: 'rate', label: 'Rate' },
        { key: 'amount', label: 'Amount' },
        { key: 'hardwareIncluded', label: 'Hardware Included' },
    ];

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '/', isActive: false },
        { label: 'Dispatch', link: '/falcon-facade/dispatch', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/falcon-facade/dispatch', icon: <IconArrowBackward className="text-4xl" /> }} />
            <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6">
                <button type="button" className="btn btn-primary gap-2" onClick={handlePrint}>
                    <IconPrinter />
                    Print
                </button>
            </div>

            <div className="panel">
                <div className="flex justify-between items-start flex-wrap gap-4 px-4">
                    <div className="flex flex-col space-y-2">
                        <img src="/k2k_iot_logo.jfif" alt="Company Logo" className="w-14" />
                        <div className="text-white-dark">
                            <p>46, 3rd Floor, BEML Layout</p>
                            <p>Rajarajeshwari Nagar</p>
                            <p>Bengaluru, Karnataka 560098</p>
                            <p>kodstech@gmail.com</p>
                            <p>+91 8987999988</p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <p>
                            <strong>Work Order:</strong> {dispatchData.workOrderNumber}
                        </p>
                        <p>
                            <strong>Client:</strong> {dispatchData.clientName}
                        </p>
                        <p>
                            <strong>Project:</strong> {dispatchData.projectName}
                        </p>
                        <p>
                            <strong>Invoice/Order:</strong> {dispatchData.invoiceSto}
                        </p>
                        <p>
                            <strong>Vehicle Number:</strong> {dispatchData.vehicleNumber}
                        </p>
                    </div>
                </div>

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="border border-gray-300 rounded-md p-4 space-y-4 overflow-x-auto">
                    {' '}
                    {/* Added overflow-x-auto */}
                    <table className="table-striped min-w-full table-auto">
                        {' '}
                        {/* Updated classes */}
                        <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th key={column.key} className="px-4 py-2 text-left whitespace-nowrap">
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dispatchData.products?.map((product, index) =>
                                product.semiFinishedProducts.map((sf, sfIndex) => (
                                    <tr key={`${index}-${sfIndex}`}>
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{product.productName}</td>
                                        <td className="px-4 py-2">{sf.sfId}</td>
                                        <td className="px-4 py-2">{sf.quantity}</td>
                                        <td className="px-4 py-2">TYPE-P5(T)</td>
                                        <td className="px-4 py-2">RAL 9092</td>
                                        <td className="px-4 py-2">1047</td>
                                        <td className="px-4 py-2">1025</td>
                                        <td className="px-4 py-2">{sf.hsnCode}</td>
                                        <td className="px-4 py-2">100kg</td>
                                        <td className="px-4 py-2">{sf.rate}</td>
                                        <td className="px-4 py-2">{sf.amount}</td>
                                        <td className="px-4 py-2">{sf.qrCodes.length > 0 ? 'Yes' : 'No'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 p-4 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-800">
                    <h3 className="font-semibold text-lg mb-4">General Terms and Conditions</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>All payments must be made within the due date mentioned in the invoice.</li>
                        <li>Any disputes regarding the invoice should be reported within 7 days.</li>
                        <li>Goods once sold are not refundable or returnable.</li>
                        <li>Taxes are applicable as per government norms.</li>
                        <li>The company reserves the right to change terms without prior notice.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DispatchChallan;
