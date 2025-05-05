import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import CustomLoader from '@/components/Loader';
import { fetchProjectById } from '@/api/konkreteKlinkers/project';

const ProjectView = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setproject] = useState<{ client: any; name: string; address: string } | null>(null);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await fetchProjectById(id);
                setproject(data);
            } catch (error) {
                setApiError('Failed to fetch project details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Projects', link: '/konkrete-klinkers/projects', isActive: false },
        { label: 'View', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/projects',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Project Details</h5>
                </div>

                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}

                {loading ? (
                    <CustomLoader />
                ) : (
                    project && (
                        <div className="space-y-5">
                            {/* Client Name */}
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Client Name</label>
                                <div className="flex-1">{project.client?.name}</div>
                            </div>
                            {/* Project Name */}
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Project Name</label>
                                <div className="flex-1">{project.name}</div>
                            </div>

                            {/* Client Address */}
                            <div className="flex items-start">
                                <label className="w-1/4 pr-4 font-medium">Project Address</label>
                                <div className="flex-1 whitespace-pre-line">{project.address}</div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ProjectView;
