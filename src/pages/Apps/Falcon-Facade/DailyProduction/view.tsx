import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import CodeHighlight from '@/components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconBell from '@/components/Icon/IconBell';
import IconCode from '@/components/Icon/IconCode';
import IconHome from '@/components/Icon/IconHome';
import IconUser from '@/components/Icon/IconUser';
import IconPhone from '@/components/Icon/IconPhone';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';
import IconSettings from '@/components/Icon/IconSettings';
import IconLock from '@/components/Icon/IconLock';
import Form from './QcCheckForm';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import DowntimeReasonModal from "./DowntimeReasonCreationModal";
import { FaPencilAlt } from "react-icons/fa";


const Tabs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Production - Falcon Facade'));
    });
    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };
    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '/', isActive: false },
        { label: 'Production', link: '/falcon-facade/production', isActive: true },
        // { label: 'Create', link: '#', isActive: true },
    ];

    const products = [
        {
            description: 'Product A',
            materialCode: 'M001',
            uom: 'Nos',
            requiredQuantity: 100,
            achieved: 80,
            dispatched: 70,
            packed: 60,
            plantCode: 'P1',
            deliveryDate: '2025-01-20',
            dimensions: [
                { name: "A", value: "8cm" },
                { name: "B", value: "10cm" },
                { name: "C", value: "12cm" },
            ],
        },
        {
            description: 'Product B',
            materialCode: 'M002',
            uom: 'Nos',
            requiredQuantity: 200,
            achieved: 180,
            dispatched: 160,
            packed: 140,
            plantCode: 'P2',
            deliveryDate: '2025-01-22',
        },
        {
            description: 'Product C',
            materialCode: 'M003',
            uom: 'Nos',
            requiredQuantity: 150,
            achieved: 130,
            dispatched: 120,
            packed: 110,
            plantCode: 'P3',
            deliveryDate: '2025-01-25',
            dimensions: [
                { name: "A", value: "15cm" },
                { name: "B", value: "17cm" },
                { name: "C", value: "19cm" },
                { name: "D", value: "20cm" },
            ],
        },
        {
            description: 'Product D',
            materialCode: 'M004',
            uom: 'Nos',
            requiredQuantity: 250,
            achieved: 230,
            dispatched: 200,
            packed: 190,
            plantCode: 'P4',
            deliveryDate: '2025-01-28',
            dimensions: [
                { name: "A", value: "15cm" },
                { name: "B", value: "17cm" },
                { name: "C", value: "19cm" },
                { name: "D", value: "20cm" },
            ],
        },
        {
            description: 'Product E',
            materialCode: 'M005',
            uom: 'Nos',
            requiredQuantity: 180,
            achieved: 150,
            dispatched: 140,
            packed: 130,
            plantCode: 'P5',
            deliveryDate: '2025-01-30',
            dimensions: [
                { name: "A", value: "15cm" },
                { name: "B", value: "17cm" },
                { name: "C", value: "19cm" },
                { name: "D", value: "20cm" },
            ],
        }
    ];


    const [showDowntimeReasonModal, setShowDowntimeReasonModal] = useState(false);

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/falcon-facade/job-order',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />


            <div className="space-y-8 pt-5">
                <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                    <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                        <IconBell />
                    </div>
                    <span className="ltr:mr-3 rtl:ml-3">Note: </span>
                    <a href="#" target="_blank" className="block hover:underline" rel="noreferrer">
                        The steps included in the production comes from the products selection or the job order. For now the job order selection is also given for future change. But the job order could be automatically fetched from the job orders page as this page is connected to it. Downtime module also provided with multiple UI.
                    </a>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">

                    {/* Icon Pills */}
                    <div className="panel" id="icon_pills">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Production</h5>
                            {/* <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code4')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button> */}

                            <button
                                className="p-1 flex items-center gap-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 absolute top-2 right-2"
                                onClick={() => setShowDowntimeReasonModal(true)}
                                title="Add Downtime"
                            >
                                <FaPencilAlt size={14} />
                                <span className="text-xs">Downtime1</span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <Tab.Group>
                                <Tab.List className="mt-3 flex flex-wrap gap-2">
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? 'bg-warning text-white !outline-none' : ''}
                                                    before:inline-block' -mb-[1px] flex items-center rounded p-3.5 py-2 hover:bg-warning hover:text-white`}
                                            >
                                                {/* <IconHome className="ltr:mr-2 rtl:ml-2" /> */}
                                                Cutting
                                            </button>
                                        )}
                                    </Tab>
                                    {/* <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? 'bg-warning text-white !outline-none' : ''}
                                                    before:inline-block' -mb-[1px] flex items-center rounded p-3.5 py-2 hover:bg-warning hover:text-white`}
                                            >
                                              
                                                Machining
                                            </button>
                                        )}
                                    </Tab> */}

                                    <Tab className="pointer-events-none -mb-[1px] flex items-center p-3.5 py-2 text-slate-500 dark:text-dark">
                                        <IconLock className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                        Machining
                                    </Tab>
                                    {/* <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? 'bg-warning text-white !outline-none' : ''}
                                                    before:inline-block' -mb-[1px] flex items-center rounded p-3.5 py-2 hover:bg-warning hover:text-white`}
                                            >
Assembling
                                            </button>
                                        )}
                                    </Tab> */}

                                    <Tab className="pointer-events-none -mb-[1px] flex items-center p-3.5 py-2  text-slate-500  dark:text-dark">
                                        <IconLock className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                        Assembling
                                    </Tab>
                                    <Tab className="pointer-events-none -mb-[1px] flex items-center p-3.5 py-2  text-slate-500  dark:text-dark">
                                        <IconLock className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                        Glass Fixing / Glazing
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                        <div className="active pt-5">
                                            <Form />

                                            <div className="overflow-x-auto">
                                                <h5 className="mt-5">Cutting Process Detail</h5>
                                                <table className="table-auto w-full border-collapse border border-gray-200">

                                                    <thead className="bg-gray-100">
                                                        <tr>
                                                            <th className="px-4 py-2 text-left border border-gray-300">Sl. No.</th>
                                                            <th className="px-4 py-2 text-left border border-gray-300">Job Order Id</th>
                                                            <th className="px-4 py-2 text-left border border-gray-300">Work Order Id</th>
                                                            <th className="px-4 py-2 text-left border border-gray-300">Product</th>
                                                            <th className="px-4 py-2 text-left border border-gray-300">PO Quantity</th>
                                                            <th className="px-4 py-2 text-left border border-gray-300">Completed Quantity</th>
                                                            <th className="px-4 py-2 text-left border border-gray-300">Rejected Quantity</th>


                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">

                                                        <tr className="hover:bg-gray-50">
                                                            <td className="px-4 py-2 border border-gray-300">1</td>
                                                            <td className="px-4 py-2 border border-gray-300">JOB1</td>
                                                            <td className="px-4 py-2 border border-gray-300">WO1</td>
                                                            <td className="px-4 py-2 border border-gray-300">Product 1</td>
                                                            <td className="px-4 py-2 border border-gray-300">100</td>
                                                            <td className="px-4 py-2 border border-gray-300">50</td>
                                                            <td className="px-4 py-2 border border-gray-300">5</td>

                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <h5 className="mt-5">QC Check Detail Logs</h5>
                                                <table className="table-auto w-full border-collapse border border-gray-200">
                                                    <thead className="bg-gray-100">
                                                        <tr>
                                                            <th className="px-4 py-2 text-left border border-gray-300">Sl. No.</th>
                                                            <th className="px-4 py-2 text-left border border-gray-300">Product</th>
                                                            <th className="px-4 py-2 text-left border border-gray-300">Rejected Quantity</th>
                                                            <th className="px-4 py-2 text-left border border-gray-300">Created by</th>
                                                            <th className="px-4 py-2 text-left border border-gray-300">Created at</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        <tr className="hover:bg-gray-50">
                                                            <td className="px-4 py-2 border border-gray-300">1</td>
                                                            <td className="px-4 py-2 border border-gray-300">Product 1</td>
                                                            <td className="px-4 py-2 border border-gray-300">50</td>
                                                            <td className="px-4 py-2 border border-gray-300">Bharath</td>
                                                            <td className="px-4 py-2 border border-gray-300">2025-02-18 10:30 AM</td>
                                                        </tr>
                                                        <tr className="hover:bg-gray-50">
                                                            <td className="px-4 py-2 border border-gray-300">2</td>
                                                            <td className="px-4 py-2 border border-gray-300">Product 2</td>
                                                            <td className="px-4 py-2 border border-gray-300">30</td>
                                                            <td className="px-4 py-2 border border-gray-300">Asmin</td>
                                                            <td className="px-4 py-2 border border-gray-300">2025-02-18 11:15 AM</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>



                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div>
                                            <div className="flex items-start pt-5">
                                                <div className="h-20 w-20 flex-none ltr:mr-4 rtl:ml-4">
                                                    <img
                                                        src="/assets/images/profile-34.jpeg"
                                                        alt="img"
                                                        className="m-0 h-20 w-20 rounded-full object-cover ring-2 ring-[#ebedf2] dark:ring-white-dark"
                                                    />
                                                </div>
                                                <div className="flex-auto">
                                                    <h5 className="mb-4 text-xl font-medium">Media heading</h5>
                                                    <p className="text-white-dark">
                                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                                        viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div className="pt-5">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </p>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>fourth tab</Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>

                    </div>

                </div>
                <DowntimeReasonModal isOpen={showDowntimeReasonModal} onClose={() => setShowDowntimeReasonModal(false)} />


            </div>
        </div>
    );
};

export default Tabs;
