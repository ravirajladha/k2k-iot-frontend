// Sample Data for DPR Reports

export interface Report {
    workOrderNumber: string;
    jobOrderNumber: string;
    clientName: string;
    projectName: string;
    productName: string;
    materialCode: string;
    UOM: string;
    POQuantity: number;
    achievedTillNow: number;
    rejectQuantity: number;
    recycleQuantity: number;
    startedBy: string;
    startedAt: string | null;
    stoppedAt: string | null;
    status: 'Running' | 'Stopped' | 'Not Started' | 'Finished';
    date: string;
}

export interface ProductionLog {
    timestamp: string;
    productId: string;
    numberOfBlocks: number;
}

export interface DowntimeLog {
    reason: string;
    startTime: string;
    endTime: string;
    duration: string;
    actionTaken: string;
}

export const pastReports: Report[] = [
    {
        workOrderNumber: 'WO-2001',
        jobOrderNumber: 'JO-3001',
        clientName: 'L&T Constructions',
        projectName: 'Mumbai Metro Expansion',
        productName: 'Steel Rods',
        materialCode: 'SR-98765',
        UOM: 'Nos',
        POQuantity: 1200,
        achievedTillNow: 1150,
        rejectQuantity: 20,
        recycleQuantity: 30,
        startedBy: 'Rajesh Kumar',
        startedAt: '07:45 AM',
        stoppedAt: '06:30 PM',
        status: 'Running',
        date: '2024-12-20',
    },
    {
        workOrderNumber: 'WO-2002',
        jobOrderNumber: 'JO-3002',
        clientName: 'Reliance Infra',
        projectName: 'Bangalore Smart City',
        productName: 'Iron Rods',
        materialCode: 'CM-45678',
        UOM: 'Nos',
        POQuantity: 800,
        achievedTillNow: 750,
        rejectQuantity: 10,
        recycleQuantity: 20,
        startedBy: 'Pooja Mehta',
        startedAt: '08:00 AM',
        stoppedAt: '07:00 PM',
        status: 'Finished',
        date: '2024-12-18',
    },
];

export const currentReports: Report[] = [
    {
        workOrderNumber: 'WO-1001',
        jobOrderNumber: 'JO-2001',
        clientName: 'ABC Constructions',
        projectName: 'Metro Bridge',
        productName: 'Concrete Blocks',
        materialCode: 'CB-56789',
        UOM: 'Ton',
        POQuantity: 500,
        achievedTillNow: 320,
        rejectQuantity: 15,
        recycleQuantity: 10,
        startedBy: 'Bharath',
        startedAt: '08:30 AM',
        stoppedAt: null,
        status: 'Running',
        date: '2025-01-10',
    },
    {
        workOrderNumber: 'WO-1002',
        jobOrderNumber: 'JO-2002',
        clientName: 'XYZ Builders',
        projectName: 'Highway Expansion',
        productName: 'Cement Bags',
        materialCode: 'CB-56790',
        UOM: 'Bags',
        POQuantity: 600,
        achievedTillNow: 400,
        rejectQuantity: 10,
        recycleQuantity: 15,
        startedBy: 'Amit Sharma',
        startedAt: '09:00 AM',
        stoppedAt: null,
        status: 'Stopped',
        date: '2025-01-12',
    },
];

export const futureReports: Report[] = [
    {
        workOrderNumber: 'WO-3001',
        jobOrderNumber: 'JO-4001',
        clientName: 'Tata Projects',
        projectName: 'Delhi High-Speed Rail',
        productName: 'Reinforced Cement Concrete',
        materialCode: 'RCC-2025',
        UOM: 'Ton',
        POQuantity: 1500,
        achievedTillNow: 0,
        rejectQuantity: 0,
        recycleQuantity: 0,
        startedBy: '-',
        startedAt: null,
        stoppedAt: null,
        status: 'Not Started',
        date: '2025-02-15',
    },
    {
        workOrderNumber: 'WO-3002',
        jobOrderNumber: 'JO-4002',
        clientName: 'GMR Infra',
        projectName: 'Hyderabad Airport Expansion',
        productName: 'Aluminum Frames',
        materialCode: 'AF-90876',
        UOM: 'Units',
        POQuantity: 900,
        achievedTillNow: 0,
        rejectQuantity: 0,
        recycleQuantity: 0,
        startedBy: '-',
        startedAt: null,
        stoppedAt: null,
        status: 'Not Started',
        date: '2025-03-10',
    },
];

export const sampleProductionLogs: ProductionLog[] = [
    { timestamp: '2025-02-04 10:30 AM', productId: 'P001', numberOfBlocks: 150 },
    { timestamp: '2025-02-04 11:00 AM', productId: 'P002', numberOfBlocks: 120 },
    { timestamp: '2025-02-04 11:30 AM', productId: 'P003', numberOfBlocks: 200 },
];

export const sampleDowntimeLogs: DowntimeLog[] = [
    {
        reason: 'Machine Failure',
        startTime: '10:30 AM',
        endTime: '11:15 AM',
        duration: '45 mins',
        actionTaken: 'Technician repaired the motor',
    },
    {
        reason: 'Power Outage',
        startTime: '02:00 PM',
        endTime: '02:45 PM',
        duration: '45 mins',
        actionTaken: 'Backup generator used',
    },
    {
        reason: 'Material Shortage',
        startTime: '04:00 PM',
        endTime: '04:30 PM',
        duration: '30 mins',
        actionTaken: 'Restocked materials',
    },
];
