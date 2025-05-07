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
import { fetchProductData } from '@/api/konkreteKlinkers/product';

const breadcrumbItems = [
    { label: 'Home', link: '/', isActive: false },
    { label: 'Konkrete Klinkers', link: '#', isActive: false },
    { label: 'Products', link: '/konkrete-klinkers/products', isActive: true },
];
const Products = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        try {
            dispatch(setPageTitle('Products'));
            setLoading(true);
            const data = await fetchProductData();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch Products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, [dispatch]);

    const columns = [
        {
            accessor: 'material_code',
            title: 'Material Code',
            sortable: true,
        },
        {
            accessor: 'plant.plant_name',
            title: 'Plant name',
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
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Add Product', link: '/konkrete-klinkers/products/create', icon: <IconPlusCircle className="text-4xl" /> }} />
            {loading ? <CustomLoader /> : <CustomTable pageHeader={'Products'} data={products} columns={columns} isRtl={isRtl} />}
        </div>
    );
};

export default Products;
