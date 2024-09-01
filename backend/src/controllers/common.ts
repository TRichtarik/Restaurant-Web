import type { Response } from 'express';
import { z, ZodError } from 'zod';
import {
  ConflictingRecordError,
  DeletedRecordError,
  NonexistentRecordError,
  WrongOwnershipError,
} from '../models/errors';

export const errorResponseHandler = (err: Error, res: Response) => {
  switch (err.constructor) {
    case NonexistentRecordError:
    case DeletedRecordError:
      res.status(404).json({ error: err.message });
      break;
    case ZodError:
      res.status(400).json({ error: err });
      break;
    case WrongOwnershipError:
    case ConflictingRecordError:
      res.status(400).json({ error: err.message });
      break;
    default:
      res.status(500).json({ error: 'Internal server error' });
      break;
  }
};

export const Address = z.object({
  address: z.string(),
  city: z.string(),
  zipCode: z.string()
});