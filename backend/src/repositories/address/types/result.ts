import type DbResult from '../../types';
import { Address } from "@prisma/client";

export type DbAddress = DbResult<Address>;
