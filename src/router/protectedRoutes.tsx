// mainRoutes.js
import { konkereKlinkersRoutes } from './konkereKlinkersRoutes';
import { ironSmithRoutes } from './ironSmithRoutes';
import { falconFacadeRoutes } from './falconFacadeRoutes';

export const protectedRoutes = [
    ...konkereKlinkersRoutes,
    ...ironSmithRoutes,
    ...falconFacadeRoutes,
];
