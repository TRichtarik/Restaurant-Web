import { Result } from '@badrap/result';
import client from '../client';
import { genericError } from '../types';
import { UserReadOneData } from "./types/data";
import { UserResult, UserWithPasswordResult} from "./types/result";
import { DeletedRecordError, NonexistentRecordError } from "../../models/errors";

const readSpecificUser = async (data: UserReadOneData): UserWithPasswordResult => {
  try {
    const user = await client.user.findUnique({
      where: data,
      include: {
        addresses: {
          select: {
            id: true,
            address: true,
            city: true,
            zipCode: true
          }
        }
      }
    });

    if (user === null) {
      return Result.err(new NonexistentRecordError('The specified user does not exist!'));
    }

    if (user.deletedAt !== null) {
      return Result.err(new DeletedRecordError('The specified user has already been deleted!'));
    }

    return Result.ok(user);
  } catch (e) {
    return genericError;
  }
}

const readSpecific = async (data: UserReadOneData): UserResult => {
  const result = await readSpecificUser(data);

  if (result.isErr) {
    return result;
  }

  // we ignore the warning here because there seems to be no cleaner solution
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hashedPassword, ...userData } = result.unwrap();
  return Result.ok(userData);
};

const readSpecificWithPassword = async (data: UserReadOneData): UserWithPasswordResult => {
  return await readSpecificUser(data);
};

export default {
  one: readSpecific,
  oneWithPassword: readSpecificWithPassword
};