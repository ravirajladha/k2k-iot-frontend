import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';

const JobOrderPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { rowData } = location.state || {}; // Access the rowData passed from the previous component
    console.log("rowData", rowData);

    React.useEffect(() => {
        dispatch(setPageTitle('Packing Detail'));
    }, [dispatch]);

    if (!rowData) {
        return <div>No packing data available.</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Work Order', link: '/konkrete-klinkers/packing/view', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/packing/view',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />
            <button
                onClick={() => window.print()}
                className="mb-10 bg-blue-500 text-white px-4 py-2 rounded float-right"
            >
                Print Page
            </button>
            <div className="p-4 pt-10">
                {/* Client Details Section */}
                <div className="panel mb-6 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Client & Work Order Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg shadow">
                        {/* Left Section: Client Details */}
                        <div className="bg-yellow-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Client Details</h3>
                            <p className="text-sm">
                                <strong>Client Name:</strong> {rowData.clientName || 'N/A'}
                            </p>
                            <p className="text-sm">
                                <strong>Project Name:</strong> {rowData.projectName || 'N/A'}
                            </p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm">
                                <strong>Work Order Number:</strong> {rowData.workOrder || 'N/A'}
                            </p>
                            <p className="text-sm">
                                <strong>Job Order ID:</strong> {rowData.jobOrder || 'N/A'}
                            </p>
                            <p className="text-sm">
                                <strong>Status:</strong> {rowData.status || 'N/A'}
                            </p>
                            <p className="text-sm">
                                <strong>Created By:</strong> {rowData.createdBy || 'N/A'}
                            </p>
                            <p className="text-sm">
                                <strong>Timestamp:</strong> {new Date(rowData.timestamp).toLocaleString() || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <div className="panel mb-6">
                    <div className="flex gap-6 justify-center">
                        <div className="product-card bg-white border border-gray-800 p-4 flex flex-col w-[30rem] overflow-hidden relative">
                            {/* Logo in the left corner */}
                            <div className="logo absolute left-0 top-0 p-1">
                                {/* <img src={logo} alt="Logo" className="w-30 h-7" /> */}
                            </div>

                            {/* S.No in the right corner */}
                            <div className="serial-number absolute right-0 top-0 p-1 text-right">
                                <span className="font-semibold text-xs">S.No: {rowData.sl_no}</span>
                            </div>

                            <div className="product-header border-b border-gray-200 pb-1 mb-1 text-center w-full mt-6">
                                <h3 className="text-sm font-semibold">Project Phoenix: CAM-01-00011</h3>
                            </div>
                            <div className="flex flex-row justify-between">
                                {/* Key-Value Data */}
                                <div className="product-details flex-1 p-1 text-xs">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="font-semibold">CAM-01-00011</div>
                                        <div>SHEARWALL</div>
                                        <div>
                                            <strong>Item No:</strong>
                                        </div>
                                        <div>{rowData.productid}</div>
                                        <div>
                                            <strong>Qty:</strong>
                                        </div>
                                        <div className="font-semibold">{rowData.rejectedQuantity + rowData.recycledQuantity}</div>
                                    </div>
                                </div>

                                {/* QR Code, Bar Image, and Table */}
                                <div className="qr-code-container flex flex-col items-center ml-8">
                                    <img src="https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_1280.png" alt="QR Code" className="w-24 h-24 mb-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobOrderPage;
