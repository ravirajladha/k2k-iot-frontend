import React, { useState, Fragment } from 'react';
import { Tab } from '@headlessui/react'; // Ensure you have @headlessui/react installed
import StockTransferForm from './StockTransferForm';
import BufferStockTransferForm from './BufferStockTransferForm';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
const StockBufferManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'stockTransfer' | 'bufferStockTransfer'>('stockTransfer');

    return (
        <div>
        <Breadcrumbs
                items={[
                    { label: 'Home', link: '/', isActive: false },
                    { label: 'Konkrete Klinkers', link: '/', isActive: false },
                    { label: ' Stock Management', link: '/konkrete-klinkers/stockManagement', isActive: false },
                    { label: 'Create', link: '/#', isActive: true },

                ]}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/stockManagement',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />


            <div className="panel mb-5">
                <Tab.Group>
                    <Tab.List className="mt-3 flex flex-wrap gap-2">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? 'bg-warning text-white !outline-none' : ''}
                                        before:inline-block -mb-[1px] flex items-center rounded p-3.5 py-2 hover:bg-warning hover:text-white`}
                                    onClick={() => setActiveTab('stockTransfer')}
                                >
                                    Stock Transfer
                                </button>
                            )}
                        </Tab>

                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? 'bg-warning text-white !outline-none' : ''}
                                        before:inline-block -mb-[1px] flex items-center rounded p-3.5 py-2 hover:bg-warning hover:text-white`}
                                    onClick={() => setActiveTab('bufferStockTransfer')}
                                >
                                    Buffer Stock Transfer
                                </button>
                            )}
                        </Tab>
                    </Tab.List>

                    <Tab.Panels className="mt-4">
                        <Tab.Panel>
                            {activeTab === 'stockTransfer' && <StockTransferForm />}
                        </Tab.Panel>
                        <Tab.Panel>
                            {activeTab === 'bufferStockTransfer' && <BufferStockTransferForm />}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

export default StockBufferManagement;
