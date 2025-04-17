import React, { useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconEye from '@/components/Icon/IconEye';

const ClientDetailPage = () => {
    console.log('inside job order detail page');

    const dispatch = useDispatch();
    const location = useLocation();
    const { diameter } = location.state || {};
    console.log('rowData', diameter);

    useEffect(() => {
        dispatch(setPageTitle('Work Order Detail'));
    }, [dispatch]);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Iron Smith', link: '/', isActive: false },
        { label: 'Clients', link: '/iron-smith/clients', isActive: false },
        { label: 'Raw Material', link: '/iron-smith/clients/raw-material', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    // Sample data for work orders
    const workOrders = [
        { workOrder: 'WO101', used: 50, date: '2025-04-01' },
        { workOrder: 'WO102', used: 20, date: '2025-04-02' },
        { workOrder: 'WO103', used: 10, date: '2025-04-03' },
        { workOrder: 'WO104', used: 30, date: '2025-04-04' },
        { workOrder: 'WO105', used: 40, date: '2025-04-05' },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/iron-smith/clients/raw-material',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />
            <div className="p-4 pt-10">
                <div className="panel mb-6 bg-blue-100">
                    <h2 className="text-lg font-semibold mb-4">Diameter - {diameter || 'N/A'} mm</h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left border border-gray-300 w-auto">Sl No.</th>
                                    <th className="px-4 py-2 text-left border border-gray-300 w-auto">Work Order</th>
                                    <th className="px-4 py-2 text-left border border-gray-300 w-auto">Used</th>
                                    <th className="px-4 py-2 text-left border border-gray-300 w-auto">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {workOrders.map((order, index) => (
                                    <tr key={order.workOrder} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                                        <td className="px-4 py-2 border border-gray-300">{order.workOrder}</td>
                                        <td className="px-4 py-2 border border-gray-300">{order.used}</td>
                                        <td className="px-4 py-2 border border-gray-300">{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDetailPage;