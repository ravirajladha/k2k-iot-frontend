import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';

const MachineDetailPage = () => {
    console.log('inside job order detail page');

    const dispatch = useDispatch();
    const location = useLocation();
    const { rowData } = location.state || {};
    console.log('rowData', rowData);

    useEffect(() => {
        dispatch(setPageTitle('Work Order Detail'));
    }, [dispatch]);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Iron Smith', link: '/', isActive: false },
        { label: 'Machines', link: '/iron-smith/machines/detail', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/iron-smith/machines',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />
            {/* <button onClick={() => window.print()} className="mb-10 bg-blue-500 text-white px-4 py-2 rounded float-right">
                Print Page
            </button> */}
            <div className="p-4 pt-10">
                {/* <div className="panel mb-6 bg-gray-100 p-4 rounded-lg shadow-md flex justify-center"> */}
                    {/* Add content here if needed */}
                {/* </div> */}
                <div className="panel mb-6 bg-blue-100">
                    <h2 className="text-lg font-semibold mb-4">Machine Data</h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left border border-gray-300 w-auto">Sl No.</th>
                                    <th className="px-4 py-2 text-left border border-gray-300 w-auto">Machine Name</th>
                                    <th className="px-4 py-2 text-left border border-gray-300 w-auto">Factory Name</th>
                                    <th className="px-4 py-2 text-left border border-gray-300 w-32">Plant Name</th>
                                    <th className="px-4 py-2 text-left border border-gray-300 w-32">Created By</th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border border-gray-300">{rowData?.id || '-'}</td>
                                    <td className="px-4 py-2 border border-gray-300">{rowData?.machine_name || '-'}</td>
                                    <td className="px-4 py-2 border border-gray-300">{rowData?.factory_name || '-'}</td>
                                    <td className="px-4 py-2 border border-gray-300">{rowData?.plant_name || '-'}</td>
                                    <td className="px-4 py-2 border border-gray-300">{rowData?.created_by || '-'}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MachineDetailPage;