import { MenuItem } from '@prisma/client';
import type DbResult from '../../../types';

export type Menu = {
    id: number,
    restaurantName: string,
    date: Date,
    menuItems: MenuItem[]
}

export type MenuResult = DbResult<Menu>;
export type DbMenus = DbResult<Menu[]>;