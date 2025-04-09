import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';

const EditPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { diameter, quantity: initialQuantity } = location.state || { diameter: 'N/A', quantity: 0 };
    const [quantity, setQuantity] = useState(parseFloat(initialQuantity) || 0);

    const handleSave = () => {
        console.log(`Saving diameter ${diameter} with quantity ${quantity}`);
        // Add save logic here (e.g., API call)
        navigate('/iron-smith/clients/raw-materials'); // Navigate back to inventory list
    };

    const handleCancel = () => {
        navigate('/iron-smith/clients/raw-materials'); // Navigate back to inventory list
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-5">
                Edit Quantity
            </h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <table className="w-full border-collapse mb-6">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 text-left">Diameter (mm)</th>
                            <th className="border p-3 text-left">Quantity (tonne)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-3">{diameter}</td>
                            <td className="border p-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                    step="1"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-between space-x-4 mt-6">
                    <button 
                        onClick={handleSave}
                        className="btn btn-success flex-1 flex items-center justify-center"
                    >
                        <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Submit
                    </button>
                    <button 
                        onClick={handleCancel}
                        className="btn btn-danger flex-1 flex items-center justify-center"
                    >
                        <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPage;