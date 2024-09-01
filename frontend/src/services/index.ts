export * as AuthApi from './authApi';
export * as UserApi from './userApi';
export * as RestaurantsApi from './restaurantsApi';
export * as OrderApi from './orderApi';
export * as MenuApi from './menuApi';

export const imageSourcePrefix = import.meta.env.VITE_SUPABASE_URL + "/storage/v1/object/public/images/";