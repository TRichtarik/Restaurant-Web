enum UserRole {
  CUSTOMER = 'CUSTOMER',
  MANAGER = 'MANAGER',
}

export type UserSession = {
  id: number;
  email: string;
  role: UserRole;
};

export type EditUserData = {
  name: string;
  surname: string;
  email: string;
  password: string | undefined;
  phoneNumber: string;
  address: {
    address: string;
    city: string;
    zipCode: string;
  };
};

export type RegisterUserData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: {
    address: string;
    city: string;
    zipCode: string;
  };
};

export type AccountData = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  role: UserRole,
  addresses: {
    id: string;
    address: string;
    city: string;
    zipCode: string;
  }[];
}