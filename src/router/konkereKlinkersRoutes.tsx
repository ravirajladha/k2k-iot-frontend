import { lazy } from 'react';
const Error = lazy(() => import('../components/Error'));
const Dashboard = lazy(() => import('../pages/Index'));
const NewDashboard = lazy(() => import('../pages/OverallDashboard'));

// const NewDashboard = lazy(() => import('../pages/OverallDashboard'));

const Faq = lazy(() => import('../pages/Faq'));
const Notification = lazy(() => import('@/pages/Apps/Notifications'));
const basePath = '/konkrete-klinkers';

import {
    QCCheckView,
    QCCheckCreate,
    WorkOrderView,
    WorkOrderCreate,
    WorkOrderDetail,
    DailyProductionPlanningView,
    DailyProductionPlanningCreate,
    DailyProductionPlanningNewView,
    DailyProductionPlanningNewCreate,
    // JobOrderView,
    JobOrderViewNew, /////New
    JobOrderDetail, /////New
    JobOrderCreate,
    ProductView,
    ProductCreate,
    InventoryView,
    InventoryViewNew,
    InventoryViewDetail,

    // PackingView,
    PackingViewNew, ////
    PackingDetail, /////

    PackingCreate,
    DispatchView,
    DispatchEditDetail, //////////
    DispatchCreate,
    DipatchInvoiceView,
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
    StockManagementView,
    StockManagementCreate,
    StockManagmentViewDetail,
    StockManagmentEditDetail
} from '../pages/Apps/Konkrete-Klinkers';
import { workerData } from 'worker_threads';

// User-specific components
const Users = lazy(() => import('@/pages/Apps/Users'));

const UsersProfile = lazy(() => import('@/pages/Apps/Users/Profile'));
const UsersAccountSettings = lazy(() => import('@/pages/Apps/Users/AccountSetting'));

export const konkereKlinkersRoutes = [
    {
        path: '/',
        element: <Dashboard />,
        layout: 'admin',
    },
    {
        path: '/overallDashboard',
        element: <NewDashboard />,
        layout: 'admin',
    },
    {
        path: '/faq',
        element: <Faq />,
        layout: 'admin',
    },
    {
        path: '/notification',
        element: <Notification />,
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
        path: `${basePath}/job-order/view`, ////////New
        element: <JobOrderViewNew />,
        layout: 'admin',
    },
    {
        path: `${basePath}/job-order/detail`, ////////New
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
    {
        path: `${basePath}/qc-check/view`,
        element: <QCCheckView />,
        layout: 'admin',
    },
    {
        path: `${basePath}/qc-check/create`,
        element: <QCCheckCreate />,
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
    
    // Inventory
    // {
    //     path: `${basePath}/inventories`,
    //     element: <InventoryView />,
    //     layout: 'admin',
    // },
    {
        path: `${basePath}/inventories`,
        element: <InventoryViewNew />,
        layout: 'admin',
    },
    {
        path: `${basePath}/inventory/detail`,
        element: <InventoryViewDetail />,
        layout: 'admin',
    },
    {
        path: `${basePath}/inventories/create`,
        element: <InventoryView />,
        layout: 'admin',
    },
    
    // Buffer Stock Management
    {
        path: `${basePath}/stockManagement`,
        element: <StockManagementView />,
        layout: 'admin',
    },
    
    {
        path: `${basePath}/stockManagement/create`,
        element: <StockManagementCreate />,
        layout: 'admin',
    },
    {
        path: `${basePath}/stockManagement/detail`,
        element: <StockManagmentViewDetail />,
        layout: 'admin',
    },
    {
        path: `${basePath}/stockManagement/editDetail`,
        element: <StockManagmentEditDetail />,
        layout: 'admin',
    },
    
    // Packing
    // {
    //     path: `${basePath}/packing/view`,
    //     element: <PackingView />,
    //     layout: 'admin',
    // },
    {
        path: `${basePath}/packing/view`,
        element: <PackingViewNew />,
        layout: 'admin',
    },

    {
        path: `${basePath}/packing/detail`,
        element: <PackingDetail />,
        layout: 'admin',
    },
    {
        path: `${basePath}/packing/create`,
        element: <PackingCreate />,
        layout: 'admin',
    },
    
    // Dispatch
    {
        path: `${basePath}/dispatch/view`,
        element: <DispatchView />,
        layout: 'admin',
    },
    {
        path: `${basePath}/dispatch/editDetail`,
        element: <DispatchEditDetail />,
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
    

    //HELPERS CLIENTS
    // clients
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
        path: `${basePath}/clients/edit/:id`,
        element: <HelperClientCreate />,
        layout: 'admin',
    },

    // projects
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
        path: `${basePath}/projects/edit/:id`,
        element: <HelperProjectCreate />,
        layout: 'admin',
    },

    // plants
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
        path: `${basePath}/plants/edit/:id`,
        element: <HelperPlantCreate />,
        layout: 'admin',
    },

    // factories
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
    {
        path: `${basePath}/factories/edit/:id`,
        element: <HelperFactoryCreate />,
        layout: 'admin',
    },

    // machines
    {
        path: `${basePath}/machines`,
        element: <HelperMachines />,
        layout: 'admin',
    },
    {
        path: `${basePath}/machines/create`,
        element: <HelperMachineCreate />,
        layout: 'admin',
    },
    {
        path: `${basePath}/machines/edit/:id`,
        element: <HelperMachineCreate />,
        layout: 'admin',
    },

    // User Routes
    {
        path: '/users',
        element: <Users />,
        layout: 'default',
    },
    {
        path: '/users/profile',
        element: <UsersProfile />,
        layout: 'default',
    },
    {
        path: '/users/edit',
        element: <UsersAccountSettings />,
        layout: 'default',
    },
    // Catch-all
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },



];

// export { protectedRoutes };



// its pretty unlikeyly
// you are the lawyer
// just barely
// its harder to make money as use to beforeAll
// i got recruited into government workerData