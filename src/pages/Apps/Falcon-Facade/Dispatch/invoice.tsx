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
        uom: 'Nos',
        dispatchQuantity: 10,
        invoiceSto: 'INV-12345',
        vehicleNumber: 'KA-01-1234',
        gatePass: '2176',
        dcNo: '7688',
        products: [
            {
                productId: 'PRD001',
                productName: 'Glass Facade',
                uom: 'Nos',
                dispatchDate: '30-05-2025',
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

    // Calculate the total amount
    const totalAmount = dispatchData.products.reduce((total, product) => {
        return total + product.semiFinishedProducts.reduce((sfTotal, sf) => sfTotal + (sf.amount || 0), 0);
    }, 0);

    // Format the total amount with commas
    const formattedTotalAmount = totalAmount.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const columns = [
        { key: 'id', label: 'Sl.No' },
        { key: 'productName', label: 'Material Description' },
        { key: 'sfId', label: 'SF' },
        { key: 'dispatchQty', label: 'Qty' },
        { key: 'height', label: 'Height' },
        { key: 'width', label: 'Width' },
        { key: 'hsnCode', label: 'HSN Code' },
        { key: 'boq', label: 'Boq' },
        { key: 'uom', label: 'UOM' },
        { key: 'rate', label: 'Rate' },
        { key: 'dispatchDate', label: 'Dispatch Date' },
        { key: 'amount', label: 'Amount' },
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
                        <img src="/falcon-facade.png" alt="Company Logo" className="w-28" />
                        <div className="text-dark">
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
                        <p>
                            <strong>Gate Pass:</strong> {dispatchData.gatePass}
                        </p>
                        <p>
                            <strong>DC No:</strong> {dispatchData.dcNo}
                        </p>
                    </div>
                </div>

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="border border-gray-300 rounded-md p-4 space-y-4 overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th key={column.key} className="px-4 py-2 text-left border border-gray-300 font-semibold text-sm">
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dispatchData.products?.map((product, index) =>
                                product.semiFinishedProducts.map((sf, sfIndex) => (
                                    <tr key={`${index}-${sfIndex}`}>
                                        <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.productName}</td>
                                        <td className="px-4 py-2 border border-gray-300">{sf.sfId}</td>
                                        <td className="px-4 py-2 border border-gray-300">{sf.quantity}</td>
                                        <td className="px-4 py-2 border border-gray-300">1047</td>
                                        <td className="px-4 py-2 border border-gray-300">1025</td>
                                        <td className="px-4 py-2 border border-gray-300">{sf.hsnCode}</td>
                                        <td className="px-4 py-2 border border-gray-300">100</td>
                                        <td className="px-4 py-2 border border-gray-300">{dispatchData.uom}</td>
                                        <td className="px-4 py-2 border border-gray-300">{sf.rate}</td>
                                        <td className="px-4 py-2 border border-gray-300">{product.dispatchDate}</td>
                                        <td className="px-4 py-2 border border-gray-300">{sf.amount}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={columns.length - 1} className="px-4 py-2 border border-gray-300 font-semibold text-left">
                                    TOTAL AMOUNT :
                                </td>
                                <td className="px-4 py-2 border border-gray-300 font-semibold text-right">{formattedTotalAmount}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="mt-8 flex justify-between items-center px-4">
                        <div className="text-center">
                            <div className="border-t border-gray-400 w-40 mb-2"></div>
                            <p className="text-sm font-semibold">Receiver Signature & Date</p>
                        </div>
                        <div className="text-center mt-10">
                            <div className="border-t border-gray-400 w-40 mb-2"></div>
                            <p className="text-sm font-semibold">Authorised Signature</p>
                        </div>
                    </div>
                </div>

                {/* Signature Section */}

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
