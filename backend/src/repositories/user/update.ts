import { Result } from '@badrap/result';
import client from '../client';
import { genericError } from '../types';
import { UserUpdateData} from "./types/data";
import { UserResult } from "./types/result";
import { ConflictingRecordError } from "../../models/errors";

const update = async (data: UserUpdateData): UserResult => {
  try {
    const user = await client.user.findFirst({
      where: { email: data.email }
    })

    if (user && user.id !== data.id) {
      return Result.err(new ConflictingRecordError("Another user with this email already exists."));
    }

    return Result.ok(await client.user.update({
      where: { id: data.id },
      data: {
        email: data.email,
        name: data.name,
        surname: data.surname,
        phoneNumber: data.phoneNumber,
        hashedPassword: data.hashedPassword,
        addresses: {
          deleteMany: {
            userId: data.id
          },
          create: {
            ...data.address
          }
        }
      },
      // include all except the password hash
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        phoneNumber: true,
        createdAt: true,
        deletedAt: true,
        role: true,
        addresses: {
          select: {
            address: true,
            zipCode: true,
            city: true
          }
        }
      }
    }));
  } catch (e) {
    return genericError;
  }
};

export default update;
