import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClientById } from '@/api/konkreteKlinkers/client';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import CustomLoader from '@/components/Loader';

const ClientView = () => {
    const { id } = useParams<{ id: string }>();
    const [client, setClient] = useState<{ name: string; address: string } | null>(null);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const data = await getClientById(id);
                setClient(data);
            } catch (error) {
                setApiError('Failed to fetch client details.');
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [id]);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Clients', link: '/konkrete-klinkers/clients', isActive: false },
        { label: 'View', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/clients',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Client Details</h5>
                </div>

                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}
                
                {loading ? (
                    <CustomLoader />
                ) : (
                    client && (
                        <div className="space-y-5">
                            {/* Client Name */}
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Client Name</label>
                                <div className="flex-1">{client.name}</div>
                            </div>

                            {/* Client Address */}
                            <div className="flex items-start">
                                <label className="w-1/4 pr-4 font-medium">Client Address</label>
                                <div className="flex-1 whitespace-pre-line">{client.address}</div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ClientView;
