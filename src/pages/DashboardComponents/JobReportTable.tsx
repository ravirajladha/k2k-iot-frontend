import React from 'react';

interface JobReport {
  id: number;
  plantName: string;
  workOrderNumber: string;
  productName: string;
  poQuantity: number;
  plannedQuantity: number;
  achievedQuantity: number;
  rejectedQuantity: number;
  status: 'Completed' | 'In Process' | 'Pending';
}

const jobReports: JobReport[] = [
  {
    id: 1,
    plantName: 'Plant A',
    workOrderNumber: 'WO12345',
    productName: 'Product X',
    poQuantity: 1000,
    plannedQuantity: 950,
    achievedQuantity: 900,
    rejectedQuantity: 50,
    status: 'Completed',
  },
  // Add more job reports as needed
];


const JobReportsTable: React.FC = () => {
  return (
    <div className="">
         <div>
                                    <div className="text-lg font-bold">Daily Job Reports</div>
                                </div>
      {/* <div className="mb-5 text-lg font-bold">Daily Job Reports</div> */}
      <div className="table-responsive">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Order Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planned Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achieved Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rejected Quantity</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {jobReports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.plantName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.workOrderNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.poQuantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.plannedQuantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.achievedQuantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.rejectedQuantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                  <span
                    className={`badge rounded-full px-2 py-1 ${
                      report.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : report.status === 'In Process'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobReportsTable;
