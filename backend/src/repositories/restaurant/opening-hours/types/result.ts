import type DbResult from '../../../types';
import { OpeningHour } from "@prisma/client";

export type DbOpeningHours = DbResult<OpeningHour>;
