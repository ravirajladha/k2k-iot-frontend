import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconFile from '@/components/Icon/IconFile';
import logo from '../../../../../public/assets/images/logo-iron-smith.png';

const JobOrderPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { jobOrder } = location.state || {};
    console.log('jobOrder', jobOrder);

    React.useEffect(() => {
        dispatch(setPageTitle('Work Order Detail'));
    }, [dispatch]);

    if (!jobOrder) {
        return <div>No job order data available.</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Iron Smith', link: '/', isActive: false },
        { label: 'Job Order/Planning', link: '/iron-smith/job-order/view', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/iron-smith/job-order/view', icon: <IconArrowBackward className="text-4xl" /> }} />
            <button onClick={() => window.print()} className="mb-10 bg-blue-500 text-white px-4 py-2 rounded float-right">
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
                                <strong>Client Name:</strong> {jobOrder.clientName}
                            </p>
                            <p className="text-sm">
                                <strong>Project Name:</strong> {jobOrder.projectName}
                            </p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-md shadow">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm">
                                <strong>Work Order Number:</strong> {jobOrder.workOrderId}
                            </p>
                            <p className="text-sm">
                                <strong>Job Order ID:</strong> {jobOrder.jobOrderId}
                            </p>
                            <p className="text-sm">
                                <strong>Dates:</strong> {jobOrder.fromDate} - {jobOrder.toDate}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <div className="panel mb-6">
                    <div className="flex gap-6 justify-center">
                        {jobOrder.products.map((product, index) => (
                            <div key={index} className="product-card bg-white border border-gray-800 p-1 flex flex-col w-[30rem] overflow-hidden relative" style={{ height: '350px' }}>
                                {/* Logo in the left corner */}
                                <div className="logo absolute left-0 top-0 p-1">
                                    <img src={logo} alt="Logo" className="w-30 h-7" />
                                </div>

                                {/* S.No in the right corner */}
                                <div className="serial-number absolute right-0 top-0 p-1 text-right">
                                    <span className="font-semibold text-xs">S.No: {index + 1}</span>
                                </div>

                                <div className="product-header border-b border-gray-200 pb-1 mb-1 text-center w-full mt-6">
                                    <h3 className="text-sm font-semibold">Project Phoenix: CAM-01-00011</h3>
                                </div>
                                <div className="flex flex-row justify-between">
                                    {/* Key-Value Data */}
                                    <div className="product-details flex-1 p-1 text-xs">
                                        <div className="grid grid-cols-2 gap-1 ">
                                            <div>
                                                <strong>BBS NO:</strong>
                                            </div>
                                            <div className="font-semibold">CAM-01-00011</div>
                                            <div>
                                                <strong>Member:</strong>
                                            </div>
                                            <div>SHEARWALL</div>
                                            <div>
                                                <strong>Desc:</strong>
                                            </div>
                                            <div className="whitespace-nowrap">SHEARWALL BBS 3RD RAFT</div>
                                            <div>
                                                <strong>Bar Mark:</strong>
                                            </div>
                                            <div>SW11-5</div>
                                            <div>
                                                <strong>Item No:</strong>
                                            </div>
                                            <div>{product.productId}</div>
                                            <div>
                                                <strong>Dia:</strong>
                                            </div>
                                            <div className="font-semibold">8</div>
                                            <div>
                                                <strong>CL:</strong>
                                            </div>
                                            <div>2840</div>
                                            <div>
                                                <strong>Qty:</strong>
                                            </div>
                                            <div className="font-semibold">{product.poQuantity}</div>
                                            <div>
                                                <strong>Wt / Kgs:</strong>
                                            </div>
                                            <div className="font-semibold">117.91</div>
                                            <img src="https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_1280.png" alt="QR Code" className="w-40 h-34 mt-2" />
                                        </div>
                                    </div>

                                    {/* QR Code, Bar Image, and Table */}
                                    <div className="qr-code-container flex flex-col items-center ml-6">
                                        <img src="https://i.ibb.co/Zp5bKfs3/Screenshot-2025-03-06-102703.png" alt="Dimension Image" className="w-34 h-32 mt-10 mb-6 ml-6" />
                                        <table className="border-collapse mt-1">
                                            <thead>
                                                <tr>
                                                    <th className="border border-gray-300">A</th>
                                                    <th className="border border-gray-300">B</th>
                                                    <th className="border border-gray-300">C</th>
                                                    <th className="border border-gray-300">D</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="border border-gray-300">120</td>
                                                    <td className="border border-gray-300">120</td>
                                                    <td className="border border-gray-300">120</td>
                                                    <td className="border border-gray-300">5770</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobOrderPage;
