import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconFile from '@/components/Icon/IconFile';

const DispatchViewDetailPage = () => {
    console.log('inside dispatch view page');

    const dispatch = useDispatch();
    const location = useLocation();
    const { rowData } = location.state || {};
    console.log('rowData', rowData);

    useEffect(() => {
        dispatch(setPageTitle('Dispatch Detail'));
    }, [dispatch]);

    if (!rowData || !rowData.products) {
        return <div>No dispatch data available.</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Iron Smith', link: '/', isActive: false },
        { label: 'Dispatch', link: '/iron-smith/dispatch/view', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
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
            <button onClick={() => window.print()} className="mb-10 bg-blue-500 text-white px-4 py-2 rounded float-right">
                Print Page
            </button>
            <div className="p-4 pt-10">
                {/* Client Details Section */}
                <div className="panel mb-6 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Dispatch Details</h2>

                    <div className="bg-white p-4 w-full flex flex-row gap-4">
                        {/* Left Section: Client Details */}
                        <div className="bg-yellow-50 p-4 rounded-md shadow flex-1">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Client Details</h3>
                            <p className="text-sm">
                                <strong>Client Name:</strong> {rowData.clientName || 'Client Alpha'}
                            </p>
                            <p className="text-sm">
                                <strong>Project Name:</strong> {rowData.projectName || 'Project Phoenix'}
                            </p>
                        </div>

                        {/* Right Section: Work Order Details */}
                        <div className="bg-blue-50 p-4 flex flex-col flex-1 rounded-lg shadow-md">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm">
                                <strong>Work Order Id:</strong> {rowData.workOrder || 'N/A'}
                            </p>
                            <p className="text-sm">
                                <strong>Job Order ID:</strong> {rowData.jobOrder || 'N/A'}
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

                <div className="panel mb-6 p-4 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        <div className="table-responsive">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">Sl No.</th>
                                        <th className="border border-gray-300 px-4 py-2">Shape</th>
                                        <th className="border border-gray-300 px-4 py-2">UOM</th>
                                        <th className="border border-gray-300 px-4 py-2">Batch ID</th>
                                        <th className="border border-gray-300 px-4 py-2">Dispatch Quantity</th>
                                        <th className="border border-gray-300 px-4 py-2">Date</th>
                                        <th className="border border-gray-300 px-4 py-2">Invoice/STO</th>
                                        <th className="border border-gray-300 px-4 py-2">Vehicle No</th>
                                        <th className="border border-gray-300 px-4 py-2">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rowData.products.map((product, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                            <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
                                            <td className="border border-gray-300 px-4 py-2">Nos</td>
                                            <td className="border border-gray-300 px-4 py-2">Batch{index + 1}</td>
                                            <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                                            <td className="border border-gray-300 px-4 py-2">{rowData.timestamp.split('T')[0]}</td>
                                            <td className="border border-gray-300 px-4 py-2">{rowData.invoiceNo}</td>
                                            <td className="border border-gray-300 px-4 py-2">{rowData.vehicleNumber}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <IconFile className="text-gray-600" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DispatchViewDetailPage;
