import { useState } from "react";


export const EditModal = ({ data, closeModal }: { data: any; closeModal: () => void }) => {
    const [formData, setFormData] = useState(data);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Edited Work Order:", formData);
      closeModal();
    };
  
    return (
      <>
        <div className="flex items-center justify-between bg-gray-100 p-4">
          <h5 className="text-lg font-bold">Edit Work Order</h5>
          <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
            ✖
          </button>
        </div>
  
        <form onSubmit={handleSubmit} className="p-5">
          <input type="text" value={formData.jobOrderId} onChange={(e) => setFormData({ ...formData, jobOrderId: e.target.value })} className="input" />
          <input type="text" value={formData.workOrderId} onChange={(e) => setFormData({ ...formData, workOrderId: e.target.value })} className="input" />
          <input type="text" value={formData.product} onChange={(e) => setFormData({ ...formData, product: e.target.value })} className="input" />
          <input type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })} className="input" />
  
          <div className="mt-5 flex justify-end">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </>
    );
  };
  