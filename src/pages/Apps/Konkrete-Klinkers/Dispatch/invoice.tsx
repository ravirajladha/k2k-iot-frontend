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
    const reduxDispatch = useReduxDispatch(); // Renamed to avoid naming conflict
    const location = useLocation();
    const dispatchData = location.state?.dispatchData;

    useEffect(() => {
        reduxDispatch(setPageTitle('Invoice Preview')); // Use renamed variable here
    }, [reduxDispatch]);

    if (!dispatchData) {
        return <div>No data available for the invoice</div>;
    }

    const { workOrderNumber, clientName, projectName, productId, uom, dispatchQuantity, invoiceSto, vehicleNumber } =
        dispatchData;

    const exportTable = () => {
        window.print();
    };

    const items = [
        {
            id: 1,
            title: `Product: Rs. {MATERIAL CODE}`,
            quantity: dispatchQuantity,
            uom: 'nos',
        },
    ];

    const columns = [
        {
            key: 'id',
            label: 'S.NO',
        },
        {
            key: 'title',
            label: 'ITEMS',
        },
        {
            key: 'quantity',
            label: 'QTY',
        },
        {
            key: 'uom',
            label: 'UOM',
            class: 'ltr:text-right rtl:text-left',
        },
     
    ];

    return (
        <div>
            <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6">
                {/* <button type="button" className="btn btn-info gap-2">
                    <IconSend />
                    Send Invoice
                </button> */}

                <button type="button" className="btn btn-primary gap-2" onClick={() => exportTable()}>
                    <IconPrinter />
                    Print
                </button>
                {/* 
                <button type="button" className="btn btn-success gap-2">
                    <IconDownload />
                    Download
                </button> */}


            </div>
            <div className="panel">
                <div className="flex justify-between items-start flex-wrap gap-4 px-4">
                    {/* Left Section: Company Logo and Addresses */}
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

                    {/* Right Section: QR Code and IRN Number */}
                    {/* <div className="flex flex-col items-center space-y-2">
                        <img src="/qrCode.png" alt="QR Code" className="w-24 h-24" />
                        <p className="text-white-dark">IRN: 1234567890</p>
                    </div> */}
                </div>



                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="border border-gray-300 rounded-md p-4 space-y-4">
                    {/* Header */}
                    <div className="text-center font-bold text-lg uppercase">
                        <p>PAN No. AACCT6977C GST No. 29AACCT6977C1ZZ CIN No. U45200TG2007PTC054531</p>
                        <p className="mt-2 text-xl">DC CUM TAX INVOICE</p>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Client Name and Address */}
                        <div className="border border-gray-300 p-4 rounded-md">
                            <h3 className="font-semibold text-center border-b border-gray-300 pb-2">Client Name and Address</h3>
                            <p className="mt-2 font-bold">Prestige Beta Projects Private</p>
                            <p>Ammanikere, Bellandur Village</p>
                            <p>Varthur Hobli, Bengaluru East Taluk</p>
                            <p>Bengaluru-560103</p>
                            <p className="mt-2">Client GST: 29AAMCP5351N1ZO</p>
                            <p>Place of Supply: Karnataka (29)</p>
                            <p className="mt-2">Tax Applicable under RCM: No</p>
                        </div>

                        {/* Ship To */}
                        <div className="border border-gray-300 p-4 rounded-md">
                            <h3 className="font-semibold text-center border-b border-gray-300 pb-2">Ship To</h3>
                            <p className="mt-2 font-bold">Prestige Lake Shore Drive</p>
                            <p>Ammanikere, Bellandur Village</p>
                            <p>Varthur Hobli, Bengaluru East Taluk</p>
                            <p>BENGALURU-560103</p>
                        </div>

                        {/* Invoice Details */}
                        <div className="border border-gray-300 p-4 rounded-md">
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
                                <div className="flex justify-between">
                                    <span className="font-medium">Document Date:</span>
                                    <span>18.11.2024</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Order No.:</span>
                                    <span>4900007103 Dt 24.10.2024</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Vehicle No.:</span>
                                    <span>KA34A1530</span>
                                </div>
                                {/* <div className="flex justify-between">
                                    <span className="font-medium">Docket No.:</span>
                                    <span>MT NO 45505</span>
                                </div> */}
                                <div className="flex justify-between">
                                    <span className="font-medium">Project:</span>
                                    <span>K2K Block & Pavers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="table-responsive mt-6">
                    <table className="table-striped">
                        <thead>
                            <tr>
                                {columns.map((column) => {
                                    return (
                                        <th key={column.key} className={column?.class}>
                                            {column.label}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.quantity}</td>
                                        <td className="ltr:text-right rtl:text-left"> {item.uom}</td>
                                        {/* <td className="ltr:text-right rtl:text-left">Rs. {item.amount}</td> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {/* <div className="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                    <div></div>
                    <div className="ltr:text-right rtl:text-left space-y-2">
                        <div className="flex items-center">
                            <div className="flex-1">TOTAL QUANTIT</div>
                            <div className="w-[37%]">10</div>
                        </div>
                       
                    </div>
                </div> */}



    {/* Bank Details */}
  
 



  {/* General Terms and Conditions */}
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
