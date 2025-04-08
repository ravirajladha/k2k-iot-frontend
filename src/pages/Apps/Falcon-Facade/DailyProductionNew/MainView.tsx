import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import CodeHighlight from '@/components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconBell from '@/components/Icon/IconBell';
import IconLock from '@/components/Icon/IconLock';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import DowntimeReasonModal from './DowntimeReasonCreationModal';
import { FaPencilAlt } from 'react-icons/fa';
import Table from './Table';

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
                { name: 'A', value: '8cm' },
                { name: 'B', value: '10cm' },
                { name: 'C', value: '12cm' },
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
                { name: 'A', value: '15cm' },
                { name: 'B', value: '17cm' },
                { name: 'C', value: '19cm' },
                { name: 'D', value: '20cm' },
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
                { name: 'A', value: '15cm' },
                { name: 'B', value: '17cm' },
                { name: 'C', value: '19cm' },
                { name: 'D', value: '20cm' },
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
                { name: 'A', value: '15cm' },
                { name: 'B', value: '17cm' },
                { name: 'C', value: '19cm' },
                { name: 'D', value: '20cm' },
            ],
        },
    ];

    const [showDowntimeReasonModal, setShowDowntimeReasonModal] = useState(false);

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                // addButton={{
                //     label: 'Back',
                //     link: '/falcon-facade/job-order',
                //     icon: <IconArrowBackward className="text-4xl" />,
                // }}
            />

            <div className="space-y-8 pt-5">
                <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                    <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                        <IconBell />
                    </div>
                    <span className="ltr:mr-3 rtl:ml-3">Note: </span>
                    <a href="#" target="_blank" className="block hover:underline" rel="noreferrer">
                        The steps included in the production comes from the post selection job order. For now the job order selection is also given for future change. But the job order could be
                        automatically fetched from the job orders page as this page is connected to it. Increase of production quantities and qc check modal has been provided.
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
                                <span className="text-xs">Test Modal</span>
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
                                                Cutting
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? 'bg-warning text-white !outline-none' : ''}
                                                    before:inline-block' -mb-[1px] flex items-center rounded p-3.5 py-2 hover:bg-warning hover:text-white`}
                                            >
                                                Machining
                                            </button>
                                        )}
                                    </Tab>

                                    {/* <Tab className="pointer-events-none -mb-[1px] flex items-center p-3.5 py-2 text-slate-500 dark:text-dark">
                                        <IconLock className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                        Machining
                                    </Tab> */}
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
                                        <div>
                                            <div className="overflow-x-auto w-full">
                                                <Table />
                                            </div>
                                        </div>
                                    </Tab.Panel>

                                    <Tab.Panel>
                                        At what moment the process are going to change in the module. Scene: a product once started with the cutting process , should be activated in the machining
                                        state.
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
