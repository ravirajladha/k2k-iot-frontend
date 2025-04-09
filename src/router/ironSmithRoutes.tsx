import { lazy } from 'react';
const Error = lazy(() => import('../components/Error'));
const Dashboard = lazy(() => import('../pages/Index'));
const NewDashboard = lazy(() => import('../pages/OverallDashboard'));

// const NewDashboard = lazy(() => import('../pages/OverallDashboard'));

const Faq = lazy(() => import('../pages/Faq'));
const Notification = lazy(() => import('@/pages/Apps/Notifications'));
const basePath = '/iron-smith';

import {
    // QCCheckView,
    QCCheckViewNew,
    QCCheckViewDetail,
    QcCheckCreateIronSmith,
    
    WorkOrderView,
    WorkOrderCreate,
    WorkOrderDetail,
 
    ProductView,
    ProductCreate,
    ProductDetail,
    HelperClients,
    HelperClientCreate,
    HelperClientDetail,
    HelperClientEditQty,
    HelperClientViewMaterial,
    HelperProjects,
    HelperProjectCreate,
    HelperProjectDetail,
    HelperPlants,
    HelperPlantCreate,
    HelperFactories,
    HelperFactoryCreate,
    HelperMachines,
    HelperMachineCreate,
    HelperMachineDetails,


    DailyProductionPlanningView,
    DailyProductionPlanningCreate,
    DailyProductionPlanningNewView,
    DailyProductionPlanningNewCreate,
    // JobOrderView,
    JobOrderViewNew,
    JobOrderDetail,

    JobOrderCreate,

    InventoryView,
    InventoryViewDetail,

    // PackingView,
    PackingViewNew, ///New
    PackingViewDetail, ///New
    PackingCreate,
    // DispatchView,
    DispatchViewNew,  ///New
    DispatchViewDetail,  ///New
    DispatchEditDetail,  ///New
    DispatchCreate,
    DipatchInvoiceView,


  Canvas,
} from '../pages/Apps/Iron-Smith';
import { workerData } from 'worker_threads';

// User-specific components
const Users = lazy(() => import('@/pages/Apps/Users'));
const UsersProfile = lazy(() => import('@/pages/Apps/Users/Profile'));
const UsersAccountSettings = lazy(() => import('@/pages/Apps/Users/AccountSetting'));

export const ironSmithRoutes = [

     // Work Order
     {
        path: `/${basePath}/work-order`,
        element: <WorkOrderView />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/canvas`,
        element: <Canvas />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/work-order/create`,
        element: <WorkOrderCreate />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/work-order/detail`,
        element: <WorkOrderDetail />,
        layout: 'admin',
    },

      // Product
      {
        path: `/${basePath}/products`,
        element: <ProductView />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/product/create`,
        element: <ProductCreate />,
        layout: 'admin',
    },

      // Work Order

      {
        path: `${basePath}/work-order/view`,
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
    
    // Job Order
    // {
    //     path: `${basePath}/job-order/view`,
    //     element: <JobOrderView />,
    //     layout: 'admin',
    // },
    {
        path: `${basePath}/job-order/view`,
        element: <JobOrderViewNew />,
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
    
    // Daily Production Report
    {
        path: `${basePath}/production-planning/view`,
        element: <DailyProductionPlanningView />,
        layout: 'admin',
    },
    {
        path: `${basePath}/production-planning/create`,
        element: <DailyProductionPlanningCreate />,
        layout: 'admin',
    },
    
    // Daily Production Report New
    {
        path: `${basePath}/production-planning-new/view`,
        element: <DailyProductionPlanningNewView />,
        layout: 'admin',
    },
    {
        path: `${basePath}/production-planning-new/create`,
        element: <DailyProductionPlanningNewView />,
        layout: 'admin',
    },
    
    // QC Check
    // {
    //     path: `${basePath}/qc-check/view`,
    //     element: <QCCheckView />,
    //     layout: 'admin',
    // },
    {
        path: `${basePath}/qc-check/view`,
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
        element: <QcCheckCreateIronSmith />,
        layout: 'admin',
    },
    
    // Product
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
        path: `${basePath}/product/detail`,
        element: <ProductDetail />,
        layout: 'admin',
    },
    
    // Inventory
    {
        path: `${basePath}/inventories`,
        element: <InventoryView />,
        layout: 'admin',
    },
    {
        path: `${basePath}/inventories/create`,
        element: <InventoryView />,
        layout: 'admin',
    },
    {
        path: `${basePath}/inventory/detail`,
        element: <InventoryViewDetail />,
        layout: 'admin',
    },
    
    // Packing
    // {
    //     path: `${basePath}/packing/view`,
    //     element: <PackingView />,
    //     layout: 'admin',
    // },
    {
        path: `${basePath}/packing/view`,   ///New
        element: <PackingViewNew />,
        layout: 'admin',
    },
    {
        path: `${basePath}/packing/detail`,   ///New
        element: <PackingViewDetail />,
        layout: 'admin',
    },
    {
        path: `${basePath}/packing/create`,
        element: <PackingCreate />,
        layout: 'admin',
    },
    
    // Dispatch
    // {
    //     path: `${basePath}/dispatch/view`,
    //     element: <DispatchView />,
    //     layout: 'admin',
    // },
    {
        path: `${basePath}/dispatch/view`,
        element: <DispatchViewNew/>,
        layout: 'admin',
    },
    {
        path: `${basePath}/dispatch/detail`,
        element: <DispatchViewDetail/>,
        layout: 'admin',
    },
    {
        path: `${basePath}/dispatch/edit`,
        element: <DispatchEditDetail/>,
        layout: 'admin',
    },
    {
        path: `${basePath}/dispatch/create`,
        element: <DispatchCreate />,
        layout: 'admin',
    },
    {
        path: `${basePath}/dispatch/invoice/view`,
        element: <DipatchInvoiceView />,
        layout: 'admin',
    },
    

// MACHINES

    {
        path: `/${basePath}/machines`,
        element: <HelperMachines />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/machines/create`,
        element: <HelperMachineCreate />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/machines/details`,
        element: <HelperMachineDetails />,
        layout: 'admin',
    },
    
    // HELPERS CLIENTS
    {
        path: `/${basePath}/clients`,
        element: <HelperClients />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/clients/create`,
        element: <HelperClientCreate />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/clients/edit/:id`,
        element: <HelperClientCreate />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/clients/raw-material`,
        element: <HelperClientDetail />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/clients/raw-material/edit`,
        element: <HelperClientEditQty />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/clients/raw-material/view`,
        element: <HelperClientViewMaterial />,
        layout: 'admin',
    },
    
    // PROJECTS
    {
        path: `/${basePath}/projects`,
        element: <HelperProjects />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/projects/create`,
        element: <HelperProjectCreate />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/projects/edit/:id`,
        element: <HelperProjectCreate />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/projects/details`,
        element: <HelperProjectDetail />,
        layout: 'admin',
    },
    
    // PLANTS
    {
        path: `/${basePath}/plants`,
        element: <HelperPlants />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/plants/create`,
        element: <HelperPlantCreate />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/plants/edit/:id`,
        element: <HelperPlantCreate />,
        layout: 'admin',
    },
    
    // FACTORIES
    {
        path: `/${basePath}/factories`,
        element: <HelperFactories />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/factories/create`,
        element: <HelperFactoryCreate />,
        layout: 'admin',
    },
    {
        path: `/${basePath}/factories/edit/:id`,
        element: <HelperFactoryCreate />,
        layout: 'admin',
    },
    

];

// export { protectedRoutes };



// its pretty unlikely
// you are the lawyer
// just barely
// its harder to make money as use to beforeAll
// i got recruited into government workerData