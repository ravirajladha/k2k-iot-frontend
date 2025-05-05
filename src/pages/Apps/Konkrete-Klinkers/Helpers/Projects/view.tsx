import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { IRootState } from '@/store/store';
import { setPageTitle } from '@/store/slices/themeConfigSlice';

import CustomTable from '@/components/CustomTable';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconPlusCircle from '@/components/Icon/IconPlusCircle';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import CustomLoader from '@/components/Loader';
import { fetchProjectData } from '@/api/konkreteKlinkers/project';

const breadcrumbItems = [
    { label: 'Home', link: '/', isActive: false },
    { label: 'Helpers', link: '#', isActive: false },
    { label: 'Projects', link: '/konkrete-klinkers/projects', isActive: true },
];

const Projects = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProjects = async () => {
        try {
            dispatch(setPageTitle('Projects'));
            setLoading(true);
            const data = await fetchProjectData();
            console.log(data);

            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch Projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProjects();
    }, [dispatch]);

    const columns = [
        {
            accessor: 'name',
            title: 'Project Name',
            sortable: true,
        },
        {
            accessor: 'created_by.username',
            title: 'Created By',
            sortable: true,
        },
        {
            accessor: 'createdAt',
            title: 'Created At',
            sortable: true,
            render: ({ createdAt }) => <div>{new Date(createdAt).toLocaleDateString()}</div>,
        },
        {
            accessor: 'action',
            title: 'Actions',
            sortable: false,
            render: ({ _id }) => (
                <div className="flex gap-4 items-center w-max mx-auto">
                    <NavLink to={`${_id}/edit`} className="flex hover:text-info">
                        <IconEdit className="w-4.5 h-4.5" />
                    </NavLink>
                    <NavLink to={`${_id}/detail`} className="flex hover:text-primary">
                        <IconEye />
                    </NavLink>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Add Project',
                    link: '/konkrete-klinkers/projects/create',
                    icon: <IconPlusCircle className="text-4xl" />,
                }}
            />
            {loading ? <CustomLoader /> : <CustomTable pageHeader={'Projects'} data={projects} columns={columns} isRtl={isRtl} />}
        </div>
    );
};

export default Projects;
