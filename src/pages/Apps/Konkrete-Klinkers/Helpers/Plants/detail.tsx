import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPlantById } from '@/api/konkreteKlinkers/plant';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import CustomLoader from '@/components/Loader';

const PlantView = () => {
    const { id } = useParams<{ id: string }>();
    const [plant, setPlant] = useState<{ plant_name: string; plant_code: string } | null>(null);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                const data = await fetchPlantById(id);
                setPlant(data);
            } catch (error) {
                setApiError('Failed to fetch Plant details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlant();
    }, [id]);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Plants', link: '/konkrete-klinkers/plants', isActive: false },
        { label: 'View', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/plants',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Plant Details</h5>
                </div>

                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}

                {loading ? (
                    <CustomLoader />
                ) : (
                    plant && (
                        <div className="space-y-5">
                            {/* Plant Name */}
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Plant Name</label>
                                <div className="flex-1">{plant.plant_name}</div>
                            </div>

                            {/* Plant Address */}
                            <div className="flex items-start">
                                <label className="w-1/4 pr-4 font-medium">Plant Code</label>
                                <div className="flex-1 whitespace-pre-line">{plant.plant_code}</div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default PlantView;
