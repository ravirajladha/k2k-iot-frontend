

interface Product {
    productId: string;
    uom: string;
    poQuantity: number;
    achievedTillNow: number;
    rejectedQuantity: number;
    plannedQuantity: number;
    date: string;
}

interface JobOrder {
    id: number;
    jobOrderId: string;
    workOrderId: string;
    fromDate: string;
    toDate: string;
    plantName: string;
    factoryName: string;
    clientName: string;
    projectName: string;
    products: Product[];
}


const rowData: JobOrder[] = [
    {
        id: 1,
        jobOrderId: 'JO1234',
        workOrderId: 'WO5678',
        fromDate: '2025-01-01',
        toDate: '2025-01-15',
        plantName: 'Plant A',
        factoryName: 'Factory X',
        clientName: 'Client Alpha',
        projectName: 'Project Phoenix',
        products: [
            { productId: 'P-001', uom: 'Kg', poQuantity: 1000, achievedTillNow: 800, rejectedQuantity: 50, plannedQuantity: 1000, date: '2025-01-05' },
            { productId: 'P-002', uom: 'Ton', poQuantity: 500, achievedTillNow: 450, rejectedQuantity: 30, plannedQuantity: 500, date: '2025-01-10' }
        ]
    },
    {
        id: 2,
        jobOrderId: 'JO1235',
        workOrderId: 'WO5679',
        fromDate: '2025-02-01',
        toDate: '2025-02-20',
        plantName: 'Plant B',
        factoryName: 'Factory Y',
        clientName: 'Client Beta',
        projectName: 'Project Pegasus',
        products: [
            { productId: 'P-003', uom: 'Kg', poQuantity: 800, achievedTillNow: 750, rejectedQuantity: 20, plannedQuantity: 800, date: '2025-02-08' }
        ]
    }
];

export { rowData };
