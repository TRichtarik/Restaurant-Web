import { FC, ReactNode } from 'react';
import useAuth from '../hooks/useAuth';

type AuthorizedProps = {
  children: ReactNode,
  roles: ("CUSTOMER" | "MANAGER")[]
}

const Authorized: FC<AuthorizedProps> = ({ children, roles }) => {
  const { auth } = useAuth();

  if (!auth || !roles.includes(auth.role)) return null;
  return <>{children}</>;
}

export default Authorized;