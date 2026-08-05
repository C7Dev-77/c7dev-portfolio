import { Database } from './database';

export type { Database } from './database';

export type MonetizationProduct = Database['public']['Tables']['products']['Row'];
export type Producto = Database['public']['Tables']['productos']['Row'];
export type Proyecto = Database['public']['Tables']['proyectos']['Row'];
export type FreeClaim = Database['public']['Tables']['free_claims']['Row'];
export type Purchase = Database['public']['Tables']['purchases']['Row'];
