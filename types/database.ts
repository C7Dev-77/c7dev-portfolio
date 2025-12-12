// types/database.ts
// Interfaces para las tablas de Supabase

// ============================================
// PRODUCTOS (Tienda / Digital CODES)
// ============================================
export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url: string;
  link_free: string;
  link_paid: string;
  // Nuevos campos para demo
  video_url?: string;          // URL de YouTube embed
  capturas?: string[];         // Array de URLs de capturas
  tags?: string[];             // Tecnologías usadas
  categoria?: string;          // Categoría del producto
  destacado?: boolean;         // Producto destacado
  activo?: boolean;            // Visible en tienda
  orden?: number;              // Orden de visualización
  created_at?: string;
  updated_at?: string;
}

export type ProductoInsert = Omit<Producto, 'id' | 'created_at' | 'updated_at'>;
export type ProductoUpdate = Partial<ProductoInsert> & { id: string };

// ============================================
// PROYECTOS (Portafolio)
// ============================================
export interface Proyecto {
  id: string;
  titulo: string;
  descripcion: string;
  imagen_url: string;
  repo_url?: string;
  demo_url?: string;
  video_url?: string;
  capturas?: string[];
  tags?: string[];
  categoria?: string;
  destacado?: boolean;
  activo?: boolean;
  orden?: number;
  created_at?: string;
  updated_at?: string;
}

export type ProyectoInsert = Omit<Proyecto, 'id' | 'created_at' | 'updated_at'>;
export type ProyectoUpdate = Partial<ProyectoInsert> & { id: string };

// ============================================
// DATABASE TYPES (Supabase)
// ============================================
export interface Database {
  public: {
    Tables: {
      productos: {
        Row: Producto;
        Insert: ProductoInsert;
        Update: ProductoUpdate;
      };
      proyectos: {
        Row: Proyecto;
        Insert: ProyectoInsert;
        Update: ProyectoUpdate;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}