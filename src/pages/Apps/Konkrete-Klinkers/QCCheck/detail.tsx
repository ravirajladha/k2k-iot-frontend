import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import CustomLoader from '@/components/Loader';
import { fetchQcById } from '@/api/konkreteKlinkers/qc';

const ProductView = () => {
    const { id } = useParams<{ id: string }>();
    const [qcData, setQcData] = useState<any>(null);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQcData = async () => {
            try {
                const data = await fetchQcById(id);
                setQcData(data);
            } catch (error) {
                setApiError('Failed to fetch qc details.');
            } finally {
                setLoading(false);
            }
        };

        fetchQcData();
    }, [id]);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Products', link: '/konkrete-klinkers/qc-check', isActive: false },
        { label: 'View', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/qc-check',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Qc Details</h5>
                </div>

                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}

                {loading ? (
                    <CustomLoader />
                ) : (
                    qcData && (
                        <div className="space-y-5">
                            {/* Client Name */}
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Job Order</label>
                                <div className="flex-1">{qcData.job_order}</div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Work Order Number</label>
                                <div className="flex-1">{qcData.work_order?.work_order_number}</div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Product</label>
                                <div className="flex-1">{qcData.product_id._id}</div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Rejected Quantity</label>
                                <div className="flex-1">{qcData.rejected_quantity}</div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Remarks</label>
                                <div className="flex-1">{qcData.remarks}</div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ProductView;
