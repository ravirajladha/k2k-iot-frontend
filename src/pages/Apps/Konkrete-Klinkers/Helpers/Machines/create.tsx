import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from "@/store/store";
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconSave from '@/components/Icon/IconSave';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import Select from 'react-select';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';

interface Factory {
  id: string;
  name: string;
}

interface Client {
  id: string;
  name: string;
  factories: Factory[];
}

const ProjectCreation = () => {
  const baseURL = import.meta.env.VITE_APP_SERVER_URL;
  const userDetail = useSelector((state: IRootState) => state.auth.user) || 'Guest User';

  const [clientsData] = useState<Client[]>([
    {
      id: 'plant1',
      name: 'Plant 1',
      factories: [
        { id: 'factory1', name: 'Factory 1' },
        { id: 'factory2', name: 'Factory 2' },
      ],
    },
    {
      id: 'plant2',
      name: 'Plant 2',
      factories: [
        { id: 'factory3', name: 'Factory 3' },
        { id: 'factory4', name: 'Factory 4' },
      ],
    },
    // Add more clients as needed
  ]);

  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [factories, setFactories] = useState<Factory[]>([]);
  const [selectedFactory, setSelectedFactory] = useState<string | null>(null);
  const [machineName, setMachineName] = useState<string>('');

  const navigate = useNavigate();

  const handleClientChange = (selectedOption: any) => {
    const clientId = selectedOption ? selectedOption.value : null;
    setSelectedClient(clientId);
    const client = clientsData.find((client) => client.id === clientId);
    setFactories(client ? client.factories : []);
    setSelectedFactory(null); // Reset factory selection
  };

  const handleFactoryChange = (selectedOption: any) => {
    setSelectedFactory(selectedOption ? selectedOption.value : null);
  };

  const handleMachineNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMachineName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedClient || !selectedFactory || !machineName) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const userId = userDetail._id;
      const response = await fetch(`${baseURL}/machines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ clientId: selectedClient, factoryId: selectedFactory, machineName, created_by: userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create machine');
      }
      console.log('Machine created successfully');
      navigate('/machines');
    } catch (error) {
      console.error('Error creating machine:', error);
    }
  };

  const breadcrumbItems = [
    { label: 'Home', link: '/', isActive: false },
    { label: 'Machines', link: '/machines', isActive: false },
    { label: 'Create', link: '#', isActive: true },
  ];

  return (
    <div>
      <Breadcrumbs
        items={breadcrumbItems}
        addButton={{ label: 'Back', link: '/konkrete-klinkers/machines', icon: <IconArrowBackward className="text-4xl" /> }}
      />
      <div className="panel">
        <div className="mb-5">
          <h5 className="font-semibold text-lg">Machine Creation</h5>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            {/* Client Selection */}
            <div>
              <label htmlFor="client">Plant</label>
              <Select
                id="client"
                value={selectedClient ? { value: selectedClient, label: clientsData.find(client => client.id === selectedClient)?.name } : null}
                onChange={handleClientChange}
                options={clientsData.map(client => ({ value: client.id, label: client.name }))}
                className="custom-select"
                classNamePrefix="custom-select"
                placeholder="Select Plant"
                isClearable
                required
              />
            </div>

            {/* Factory Selection */}
            {/* {selectedClient && (
              <div>
                <label htmlFor="factory">Factory</label>
                <Select
                  id="factory"
                  value={selectedFactory ? { value: selectedFactory, label: factories.find(factory => factory.id === selectedFactory)?.name } : null}
                  onChange={handleFactoryChange}
                  options={factories.map(factory => ({ value: factory.id, label: factory.name }))}
                  className="custom-select"
                  classNamePrefix="custom-select"
                  placeholder="Select Factory"
                  isClearable
                  required
                />
              </div>
            )} */}

            {/* Machine
::contentReference[oaicite:0]{index=0}
 
            {/* Machine Name Input */}
            {/* {selectedFactory && ( 
            )}
            */}
              <div>
                <label htmlFor="name" className="w-1/4 pr-4">Machine Name</label>
                <input
                  id="machineName"
                  type="text"
                  value={machineName}
                  className="form-input flex-1"
                  onChange={handleMachineNameChange}
                  placeholder="Enter Machine Name"
                  required
                />
              </div>
        
          </div>

          <div className="flex justify-between space-x-4 mt-6">
            {/* Submit Button */}
            <button type="submit" className="btn btn-success flex-1">
              <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
              Submit
            </button>

            {/* Cancel Button */}
            <Link to="/machines" className="flex-1">
              <button type="button" className="btn btn-danger w-full">
                <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectCreation;
