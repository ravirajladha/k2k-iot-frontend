import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import Select from 'react-select';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";


interface ClientOption {
  value: string;
  label: string;
}

const ProjectCreation = () => {
  const baseURL = import.meta.env.VITE_APP_SERVER_URL;
  const navigate = useNavigate();

  const userDetail = useSelector((state: IRootState) => state.auth.user) || 'Guest User';

  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
  });

  const clientOptions: ClientOption[] = [
    { value: 'client1', label: 'Client 1' },
    { value: 'client2', label: 'Client 2' },
    { value: 'client3', label: 'Client 3' },
  ];

  const handleClientChange = (selectedOption: any) => {
    if (selectedOption) {
      setFormData((prev) => ({
        ...prev,
        clientName: selectedOption.label,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        clientName: '',
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userId = userDetail._id;
      const response = await fetch(`${baseURL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ ...formData, created_by: userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      console.log('Project created successfully');
      // navigate('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        border: 'none',
      },
      '&:focus': {
        border: 'none',
        boxShadow: 'none',
      },
    }),
    input: (base: any) => ({
      ...base,
      outline: 'none',
    }),
  };
  const breadcrumbItems = [
    { label: 'Home', link: '/', isActive: false },
    { label: 'Projects', link: '/projects', isActive: false },
    { label: 'Create', link: '#', isActive: true },
];

  return (
    <div>
       <Breadcrumbs
                items={breadcrumbItems}
                addButton={{ label: 'Back', link: '/iron-smith/projects', icon: <IconArrowBackward className="text-4xl" /> }}
                />
      <div className="panel">
        <div className="mb-5">
          <h5 className="font-semibold text-lg">Project Creation</h5>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Client Name */}
          <div className="flex items-center">
            <label htmlFor="clientName" className="w-1/4 pr-4">Client Name</label>
            <Select
              id="clientName"
              name="clientName"
              options={clientOptions}
              onChange={handleClientChange}
              className="form-input flex-1"
              placeholder="Select Client"
              styles={customStyles}
            />
          </div>

          {/* Project Name */}
          <div className="flex items-center">
            <label htmlFor="projectName" className="w-1/4 pr-4">Project Name</label>
            <input
              id="projectName"
              name="projectName"
              type="text"
              placeholder="Enter Project Name"
              className="form-input flex-1"
              value={formData.projectName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="projectName" className="w-1/4 pr-4">Project Address</label>
            <input
              id="projectName"
              name="projectName"
              type="text"
              placeholder="Enter Project Address"
              className="form-input flex-1"
              value={formData.projectName}
              onChange={handleInputChange}
              required
            />
          </div>
          

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-between space-x-4 mt-6">
            <button type="submit" className="btn btn-success flex-1">
              <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
              Submit
            </button>
            <button type="button" className="btn btn-danger flex-1" onClick={() => navigate('/projects')}>
              <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectCreation;
