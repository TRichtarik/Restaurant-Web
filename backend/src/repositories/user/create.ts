import { Result } from '@badrap/result';
import client from '../client';
import { genericError } from '../types';
import { UserCreateData } from "./types/data";
import { UserResult } from "./types/result";
import { ConflictingRecordError } from "../../models/errors";

const create = async (data: UserCreateData): UserResult => {
  try {
    const user = await client.user.findFirst({
      where: { email: data.email }
    })

    if (user) {
      return Result.err(new ConflictingRecordError("A user with this email already exists."));
    }

    return Result.ok(await client.user.create({
      data: {
        email: data.email,
        name: data.name,
        surname: data.surname,
        phoneNumber: data.phoneNumber,
        hashedPassword: data.hashedPassword,
        role: data.role,
        addresses: {
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

export default create;
