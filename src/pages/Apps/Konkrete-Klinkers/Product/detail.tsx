import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import CustomLoader from '@/components/Loader';
import { fetchProductById } from '@/api/konkreteKlinkers/product';

const ProductView = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (error) {
                setApiError('Failed to fetch Product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Products', link: '/konkrete-klinkers/products', isActive: false },
        { label: 'View', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/products',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Product Details</h5>
                </div>

                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}

                {loading ? (
                    <CustomLoader />
                ) : (
                    product && (
                        <div className="space-y-5">
                            {/* Client Name */}
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Material Code</label>
                                <div className="flex-1">{product.material_code}</div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Plant</label>
                                <div className="flex-1">{product.plant?.plant_name}</div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Material Code</label>
                                <div className="flex-1">{product.material_code}</div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">No. of Pieces Per Punch</label>
                                <div className="flex-1">{product.no_of_pieces_per_punch}</div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">UOM</label>
                                <div className="flex-1">{product.uom}</div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Qty in Bundle</label>
                                <div className="flex-1">{product.qty_in_bundle}</div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Area per Unit (Sqmt)</label>
                                <div className="flex-1">{product.area}</div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/4 pr-4 font-medium">Description</label>
                                <div className="flex-1">{product.description}</div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ProductView;
