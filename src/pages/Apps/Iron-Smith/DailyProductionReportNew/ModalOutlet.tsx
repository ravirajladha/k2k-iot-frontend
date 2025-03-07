import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ViewDetailsModal } from './ViewDetailsModal';
import UpdateCompletedQuantityModal from './UpdateCompletedQuantityModal';
import QCCheckModal from './QCCheckModal';

interface ModalOutletProps {
    isOpen: boolean;
    closeModal: () => void;
    type: 'view' | 'updateCompletedQuantity' | 'qcCheck';
    data?: any;
}

const handleStartJob = (jobOrderId: string) => {
    console.log(`Starting job with ID: ${jobOrderId}`);
};

const handleStopJob = (jobOrderId: string) => {
    console.log(`Stopping job with ID: ${jobOrderId}`);
};

export const ModalOutlet: React.FC<ModalOutletProps> = ({ isOpen, closeModal, type, data }) => {
    console.log(type, data, 'type and data inside ModalOutlet');

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={closeModal} className="relative z-50">
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                <div className="fixed inset-0 overflow-y-auto flex justify-center items-start p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full shadow-lg">
                            {type === 'view' && <ViewDetailsModal data={data} closeModal={closeModal} handleStartJob={handleStartJob} handleStopJob={handleStopJob} />}
                            {type === 'updateCompletedQuantity' && <UpdateCompletedQuantityModal isOpen={isOpen} setShowUpdateModal={closeModal} data={data} />}
                            {type === 'qcCheck' && <QCCheckModal isOpen={isOpen} setShowQCCheck={closeModal} data={data} />}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};
