import React from 'react';

interface ProductionReport {
  operatorName: string;
  workOrderNumber: string;
  achievedQuantity: number;
  rejectedQuantity: number;
}

const productionData: ProductionReport[] = [
  {
    operatorName: 'Bharath',
    workOrderNumber: 'WO12345',
    achievedQuantity: 100,
    rejectedQuantity: 5,
  },
  {
    operatorName: 'Ravi',
    workOrderNumber: 'WO12346',
    achievedQuantity: 150,
    rejectedQuantity: 3,
  },
  // Add more entries as needed
];

const ProductionReportTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
       <div>
                                    <div className="text-lg font-bold">Daily Production Report</div>
                                </div>
      <table className="min-w-full border border-gray-200">
        <thead className="">
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Operator Name</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Work Order Number</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Achieved Quantity</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Rejected Quantity</th>
          </tr>
        </thead>
        <tbody>
          {productionData.map((report, index) => (
            <tr key={index} className="">
              <td className="py-2 px-4 border-b  text-gray-300">{report.operatorName}</td>
              <td className="py-2 px-4 border-b  text-gray-300 border-gray-300 ">{report.workOrderNumber}</td>
              <td className="py-2 px-4 border-b text-gray-300 border-gray-300 ">{report.achievedQuantity}</td>
              <td className="py-2 px-4 border-b text-gray-300 border-gray-300 ">{report.rejectedQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionReportTable;
