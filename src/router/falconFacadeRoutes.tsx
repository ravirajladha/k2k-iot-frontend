const basePath = '/falcon-facade';

import {
    QCCheckView,
    QCCheckViewNew, //New
    QCCheckViewDetail, //New
    QCCheckCreate,
    WorkOrderView,
    WorkOrderCreate,
    WorkOrderDetail,

    //////////New Work Order Tab -
    NewWorkOrderCreate,
    NewWorkOrderView,
    NewWorkOrderViewDetail,

    ProductView,
    ProductCreate,
    HelperClients,
    HelperClientCreate,
    HelperProjects,
    HelperProjectCreate,
    HelperPlants,
    HelperPlantCreate,
    HelperFactories,
    HelperFactoryCreate,
    HelperMachines,
    HelperMachineCreate,
    // ProductionPlanningView,
    // ProductionPlanningCreate,
    DailyProductionDetail,
    DailyProductionView,
    DailyProductionCreate,
    DailyProductionNewView,
    Systems,
    SystemsCreate,
    ProductSystems,
    ProductSystemCreate,
    JobOrderView,
    JobOrderDetail, //New
    JobOrderCreate,
    InventoryView,
    PackingView,
    PackingCreate,
    // PackingDetail, //New
    PackingDetailNew, //New
    PackingViewNew, //New
    DispatchView,
    DispatchCreate,
    DispatchChallanView,
    // DispatchInvoiceView,
    // DeliveryChallanView,
} from '../pages/Apps/Falcon-Facade';
// export { default as DailyProductionView } from './DailyProduction/view';
// export { default as DailyProductionCreate } from './DailyProduction/create';
export const falconFacadeRoutes = [
    // Work Order Routes
    // {
    //     path: `${basePath}/qc-check`,
    //     element: <QCCheckView />,
    //     layout: 'admin',
    // },
    {
        path: `${basePath}/qc-check`,
        element: <QCCheckViewNew />,
        layout: 'admin',
    },
    {
        path: `${basePath}/qc-check/detail`,
        element: <QCCheckViewDetail />,
        layout: 'admin',
    },
    {
        path: `${basePath}/qc-check/create`,
        element: <QCCheckCreate />,
        layout: 'admin',
    },
    {
        path: `${basePath}/work-order`,
        element: <WorkOrderView />,
        layout: 'admin',
    },
    {
        path: `${basePath}/work-order/create`,
        element: <WorkOrderCreate />,
        layout: 'admin',
    },
    {
        path: `${basePath}/work-order/detail`,
        element: <WorkOrderDetail />,
        layout: 'admin',
    },

    //New Work Order Tab -
    {
        path: `${basePath}/work-orders`,
        element: <NewWorkOrderView />,
        layout: 'admin',
    },
    {
        path: `${basePath}/work-orders/create`,
        element: <NewWorkOrderCreate />,
        layout: 'admin',
    },
    {
        path: `${basePath}/work-orders/detail`,
        element: <NewWorkOrderViewDetail />,
        layout: 'admin',
    },

    // Job Order Routes
    {
        path: `${basePath}/job-order`,
        element: <JobOrderView />,
        layout: 'admin',
    },
    {
        path: `${basePath}/job-order/detail`,
        element: <JobOrderDetail />,
        layout: 'admin',
    },
    {
        path: `${basePath}/job-order/create`,
        element: <JobOrderCreate />,
        layout: 'admin',
    },

    {
        path: `${basePath}/products`,
        element: <ProductView />,
        layout: 'admin',
    },
    {
        path: `${basePath}/product/create`,
        element: <ProductCreate />,
        layout: 'admin',
    },

    {
        path: `${basePath}/product-systems`,
        element: <ProductSystems />,
        layout: 'admin',
    },
    {
        path: `${basePath}/product-system/create`,
        element: <ProductSystemCreate />,
        layout: 'admin',
    },
    {
        path: `${basePath}/systems`,
        element: <Systems />,
        layout: 'admin',
    },
    {
        path: `${basePath}/systems/create`,
        element: <SystemsCreate />,
        layout: 'admin',
    },

    // Production Planning Routes
    {
        path: `${basePath}/production`,
        element: <DailyProductionView />,
        layout: 'admin',
    },
    {
        path: `${basePath}/productionNew`,
        element: <DailyProductionNewView />,
        layout: 'admin',
    },
    {
        path: `${basePath}/productionNew/view`,
        element: <DailyProductionDetail />,
        layout: 'admin',
    },

    {
        path: `${basePath}/production-planning/create`,
        element: <DailyProductionCreate />,
        layout: 'admin',
    },

    // Packing Routes
    // {
    //     path: `${basePath}/packing`,
    //     element: <PackingView />,
    //     layout: 'admin',
    // },
    {
        path: `${basePath}/packing`,
        element: <PackingViewNew />,
        layout: 'admin',
    },
    {
        path: `${basePath}/packing/create`,
        element: <PackingCreate />,
        layout: 'admin',
    },
    // {
    //     path: `${basePath}/packing/detail`,
    //     element: <PackingDetail />,
    //     layout: 'admin',
    // },
    {
        path: `${basePath}/packing/detail`,
        element: <PackingDetailNew />,
        layout: 'admin',
    },

    // Dispatch Routes
    {
        path: `${basePath}/dispatch`,
        element: <DispatchView />,
        layout: 'admin',
    },
    {
        path: `${basePath}/dispatch/create`,
        element: <DispatchCreate />,
        layout: 'admin',
    },
    {
        path: `${basePath}/dispatch/challan`,
        element: <DispatchChallanView />,
        layout: 'admin',
    },

    // Delivery Challan Route
    // {
    //     path: `${basePath}/delivery-challan`,
    //     element: <DeliveryChallanView />,
    //     layout: 'admin',
    // },

    // Helper Modules
    {
        path: `${basePath}/clients`,
        element: <HelperClients />,
        layout: 'admin',
    },
    {
        path: `${basePath}/clients/create`,
        element: <HelperClientCreate />,
        layout: 'admin',
    },
    {
        path: `${basePath}/projects`,
        element: <HelperProjects />,
        layout: 'admin',
    },
    {
        path: `${basePath}/projects/create`,
        element: <HelperProjectCreate />,
        layout: 'admin',
    },
    {
        path: `${basePath}/plants`,
        element: <HelperPlants />,
        layout: 'admin',
    },
    {
        path: `${basePath}/plants/create`,
        element: <HelperPlantCreate />,
        layout: 'admin',
    },
    {
        path: `${basePath}/factories`,
        element: <HelperFactories />,
        layout: 'admin',
    },
    {
        path: `${basePath}/factories/create`,
        element: <HelperFactoryCreate />,
        layout: 'admin',
    },
];
