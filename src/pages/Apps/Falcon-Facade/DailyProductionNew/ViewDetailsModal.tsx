import IconX from "@/components/Icon/IconX";
import IconChecks from "@/components/Icon/IconChecks";
import IconPlayCircle from "@/components/Icon/IconPlayCircle";
export const ViewDetailsModal = ({ data, closeModal, handleStartJob, handleStopJob }: 
    { 
        data: any; 
        closeModal: () => void; 
        handleStartJob: (id: string) => void;
        handleStopJob: (id: string) => void;
    }) => {
    console.log(data, "data inside the main modal")
    return (
        <>
            <div className="flex items-center justify-between bg-gray-100 p-4 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">{data?.product || "Semi Finished Work Progress"}</h5>
                <button onClick={closeModal} className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                    <IconX />
                </button>
            </div>

            <div className="p-5">
                <div className="grid grid-cols-2 gap-4">
                    <p><strong>Job Order ID:</strong> {data?.jobOrderId}</p>
                    <p><strong>Work Order ID:</strong> {data?.workOrderId}</p>
                    <p><strong>Product:</strong> {data?.product}</p>
                    <p><strong>Quantity:</strong> {data?.quantity}</p>
                    <p><strong>Semi Finished:</strong> {data?.sf}</p>
                    <p><strong>Completed Quantity:</strong> {data?.completedQuantity}</p>
                    <p><strong>Created At:</strong> {data?.createdAt}</p>
                    <p><strong>Created By:</strong> {data?.createdBy}</p>
                </div>

                {/* Start / Stop Buttons */}
                <div className="mt-5 flex justify-center gap-3">
                    {/* <button 
                        onClick={() => handleStartJob(data?.jobOrderId)} 
                        className="btn btn-success flex items-center gap-1"
                    >
                        <IconPlayCircle className="text-xl" /> Start
                    </button>

                    <button 
                        onClick={() => handleStopJob(data?.jobOrderId)} 
                        className="btn btn-warning flex items-center gap-1"
                    >
                        <IconChecks className="text-xl" /> Stop
                    </button> */}
                </div>

                <div className="mt-5 flex justify-between">
                    <button onClick={closeModal} className="btn btn-outline-primary">
                        Invite QC
                    </button>
                    <button onClick={closeModal} className="btn btn-outline-danger">
                        Close
                    </button>
                </div>
            </div>
        </>
    );
};
