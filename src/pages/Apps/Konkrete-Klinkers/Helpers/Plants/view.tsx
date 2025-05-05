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
import { fetchPlantData } from '@/api/konkreteKlinkers/plant';

const breadcrumbItems = [
    { label: 'Home', link: '/', isActive: false },
    { label: 'Konkrete Klinkers', link: '#', isActive: false },
    { label: 'Plants', link: '/konkrete-klinkers/plants', isActive: true },
];

const Plants = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPlants = async () => {
        try {
            dispatch(setPageTitle('Plants'));
            setLoading(true);
            const data = await fetchPlantData();
            setPlants(data);
        } catch (error) {
            console.error('Failed to fetch Plants:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPlants();
    }, [dispatch]);

    const columns = [
        {
            accessor: 'plant_name',
            title: 'Plant Name',
            sortable: true,
        },
        {
            accessor: 'plant_code',
            title: 'Plant Code',
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
                    label: 'Add Plant',
                    link: '/konkrete-klinkers/plants/create',
                    icon: <IconPlusCircle className="text-4xl" />,
                }}
            />
            {loading ? <CustomLoader /> : <CustomTable pageHeader={'Plants'} data={plants} columns={columns} isRtl={isRtl} />}
        </div>
    );
};

export default Plants;
