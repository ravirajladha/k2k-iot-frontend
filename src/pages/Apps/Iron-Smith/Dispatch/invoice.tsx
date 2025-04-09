import { useEffect } from 'react';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconSend from '@/components/Icon/IconSend';
import IconPrinter from '@/components/Icon/IconPrinter';
import IconDownload from '@/components/Icon/IconDownload';
import IconEdit from '@/components/Icon/IconEdit';
import IconPlus from '@/components/Icon/IconPlus';

const InvoicePreview = () => {
    const reduxDispatch = useReduxDispatch();
    const location = useLocation();
    const dispatchData = location.state?.dispatchData;

    useEffect(() => {
        reduxDispatch(setPageTitle('Invoice Preview'));
    }, [reduxDispatch]);

    if (!dispatchData) {
        return <div>No data available for the invoice</div>;
    }

    const { workOrderNumber, clientName, projectName, productId, uom, dispatchQuantity, invoiceSto, vehicleNumber } = dispatchData;

    const exportTable = () => {
        window.print();
    };

    const items = [
        {
            id: 1,
            title: `Steel Rods`,
            hsnCode: `721420`,
            member: 'SHEARWALL',
            quantity: dispatchQuantity,
            diameter: '10',
            barMark: 'SW11-6',
            uom: 'MT',
            rate: '54,700',
            amount: '54,700',
            dispatchDate: '15-04-2025',
        },
    ];

    const columns = [
        { key: 'id', label: 'S.NO' },
        { key: 'title', label: 'MATERIAL DESCRIPTION' },
        { key: 'hsnCode', label: 'HSN CODE' },
        { key: 'quantity', label: 'QTY' },
        { key: 'uom', label: 'UOM', class: 'text-right' },
        { key: 'rate', label: 'RATE', class: 'text-right' },
        { key: 'dispatchDate', label: 'DISPATCH DATE', class: 'text-right' },
        { key: 'amount', label: 'AMOUNT', class: 'text-right' },
    ];

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + parseFloat(item.amount.replace(/,/g, '')), 0).toLocaleString('en-IN');

    return (
        <div>
            <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6">
                <button type="button" className="btn btn-primary gap-2" onClick={() => exportTable()}>
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
                </div>

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="border border-gray-300 rounded-md p-4 space-y-4">
                    <div className="text-center font-bold text-lg uppercase">
                        <p>PAN No. AACCT6977C GST No. 29AACCT6977C1ZZ CIN No. U45200TG2007PTC054531</p>
                        <p className="mt-2 text-xl">DC CUM TAX INVOICE</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className=" p-4 rounded-md lg:col-start-1">
                            <h3 className="font-semibold text-center border-b border-gray-300 pb-2">Client Name and Address</h3>
                            <p className="mt-2 font-bold">Prestige Beta Projects Private</p>
                            <p>Ammanikere, Bellandur Village</p>
                            <p>Varthur Hobli, Bengaluru East Taluk</p>
                            <p>Bengaluru-560103</p>
                            <p>Bengaluru-560103</p>
                            <p className="mt-2">Client GST: 29AAMCP5351N1ZO</p>
                            <p>Place of Supply: Karnataka (29)</p>
                            <p className="mt-2">Tax Applicable under RCM: No</p>
                        </div>

                        <div className=" p-4 rounded-md lg:col-start-3">
                            <h3 className="font-semibold text-center border-b border-gray-300 pb-2">Invoice Details</h3>
                            <div className="mt-2 space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-medium">Invoice No.:</span>
                                    <span>SI2995000922</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Int. Doc. No.:</span>
                                    <span>2001032612</span>
                                </div>
                                {/* <div className="flex justify-between">
                                    <span className="font-medium">Document Date:</span>
                                    <span>18.11.2024</span>
                                </div> */}
                                <div className="flex justify-between">
                                    <span className="font-medium">Order No.:</span>
                                    <span>4900007103 Dt 24.10.2024</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Vehicle No.:</span>
                                    <span>KA34A1530</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Gate Pass No.:</span>
                                    <span>121512</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Contact Person:</span>
                                    <span>9632526210 - Mr. Harish</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Project:</span>
                                    <span>K2K Steel</span>
                                </div>
                                <h3 className="font-semibold text-center border-b border-gray-300 pb-2"></h3>
                                <p className="mt-2 font-bold">Prestige Lake Shore Drive</p>
                                <p>Ammanikere, Bellandur Village, BENGALURU-560103</p>
                                {/* <p>BENGALURU-560103</p> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="panel mb-6 p-4 rounded-lg mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        <div className="table-responsive">
                            <table className="w-full border-collapse border border-gray-300 table-striped">
                                <thead>
                                    <tr className="bg-gray-200">
                                        {columns.map((column) => (
                                            <th key={column.key} className={`border border-gray-300 px-4 py-2 ${column?.class || ''}`}>
                                                {column.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id} className="text-center">
                                            <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.title}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.hsnCode}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">{item.uom}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">{item.rate}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">{item.dispatchDate}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">{item.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={columns.length - 1} className="px-4 py-2 border border-gray-300 font-semibold text-left">
                                            TOTAL AMOUNT :
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300 font-semibold text-right">{totalAmount}</td>
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
                    </div>
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

export default InvoicePreview;
