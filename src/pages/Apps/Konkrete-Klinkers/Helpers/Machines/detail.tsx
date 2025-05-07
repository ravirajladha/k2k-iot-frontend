import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import CustomLoader from '@/components/Loader';
import { fetchMachineById } from '@/api/konkreteKlinkers/machine';

const MachineView = () => {
    const { id } = useParams<{ id: string }>();
    const [machine, setMachine] = useState<{ plant_id: any; name: string } | null>(null);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMachine = async () => {
            try {
                const data = await fetchMachineById(id);
                setMachine(data);
            } catch (error) {
                setApiError('Failed to fetch Machine details.');
            } finally {
                setLoading(false);
            }
        };

        fetchMachine();
    }, [id]);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Machines', link: '/konkrete-klinkers/machines', isActive: false },
        { label: 'View', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/machines',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Machine Details</h5>
                </div>

                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}

                {loading ? (
                    <CustomLoader />
                ) : (
                    machine && (
                        <div className="space-y-5">
                            {/* Plant Name */}
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Plant Name</label>
                                <div className="flex-1">{machine.plant_id?.plant_name}</div>
                            </div>
                            {/* machine Name */}
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Project Name</label>
                                <div className="flex-1">{machine.name}</div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default MachineView;
