import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconEye from '@/components/Icon/IconEye';

const InventoryDetailPage = () => {
    console.log('inside job order detail page');

    const dispatch = useDispatch();
    const location = useLocation();
    const { client } = location.state || {};
    console.log('rowData', client);

    useEffect(() => {
        dispatch(setPageTitle('Work Order Detail'));
    }, [dispatch]);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Iron Smith', link: '/', isActive: false },
        { label: 'Clients', link: '/iron-smith/clients/raw-materials', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    const clientDetails = {
        clientName: 'ABC Corp',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        gst: '123456789ABC',
        placeOfSupply: 'New York',
    };

    const [quantities, setQuantities] = useState({
        8: 100,
        10: 200,
        12: 150,
        16: 250,
        20: 300,
        25: 350,
        32: 400,
    });

    const handleQuantityChange = (diameter, value) => {
        const parsedValue = value === '' ? 0 : parseFloat(value) || 0;
        setQuantities((prev) => ({
            ...prev,
            [diameter]: parsedValue,
        }));
    };

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/iron-smith/clients',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />
            <button onClick={() => window.print()} className="mb-10 bg-blue-500 text-white px-4 py-2 rounded float-right">
                Print Page
            </button>
            <div className="p-4 pt-10">
                <div className="panel mb-6 bg-gray-100 p-4 rounded-lg shadow-md flex justify-center">
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">Client Details</h2>
                        <div className="bg-yellow-50 p-6 rounded-lg shadow-lg w-full max-w-4xl">
                            <div className="text-sm text-center flex justify-center items-center space-x-4 text-gray-800">
                                <span><strong>Client Name:</strong> {clientDetails.clientName}</span>
                                <span>|</span>
                                <span><strong>Address:</strong> {clientDetails.address}</span>
                                <span>|</span>
                                <span><strong>City:</strong> {clientDetails.city}</span>
                                <span>|</span>
                                <span><strong>State:</strong> {clientDetails.state}</span>
                                <span>|</span>
                                <span><strong>GST:</strong> {clientDetails.gst}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel mb-6 bg-blue-100">
                    <h2 className="text-lg font-semibold mb-4">Raw Material Data</h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left border border-gray-300 w-auto">Diameter</th>
                                    <th className="px-4 py-2 text-left border border-gray-300 w-auto">Qty (in tonne)</th>
                                    <th className="px-4 py-2 text-left border border-gray-300 w-32">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {Object.keys(quantities).map((diameter) => (
                                    <tr key={diameter} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border border-gray-300">{diameter} mm</td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            <input
                                                type="number"
                                                className="form-input w-32"
                                                placeholder="Qty (in tonne)"
                                                min="0"
                                                step="0.01"
                                                disabled
                                                value={quantities[parseInt(diameter)]}
                                                onChange={(e) => handleQuantityChange(parseInt(diameter), e.target.value)}
                                            />
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300 relative w-16">
                                            <NavLink 
                                                to={`#`}
                                                state={{ diameter, quantity: quantities[parseInt(diameter)] }}
                                                className="flex hover:text-info absolute left-2"
                                            >
                                                <IconTrashLines className="w-4.5 h-4.5" />
                                            </NavLink>
                                            <NavLink 
                                                to={`/iron-smith/clients/raw-material/view`} 
                                                state={{ diameter, quantity: quantities[parseInt(diameter)] }} 
                                                className="flex hover:text-primary absolute right-2"
                                            >
                                                <IconEye />
                                            </NavLink>
                                        </td>
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

export default InventoryDetailPage;