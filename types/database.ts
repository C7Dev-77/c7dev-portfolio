export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      free_claims: {
        Row: {
          ad_verified: boolean
          created_at: string | null
          download_token: string
          expires_at: string
          id: string
          ip_hash: string | null
          product_id: string | null
        }
        Insert: {
          ad_verified?: boolean
          created_at?: string | null
          download_token: string
          expires_at: string
          id?: string
          ip_hash?: string | null
          product_id?: string | null
        }
        Update: {
          ad_verified?: boolean
          created_at?: string | null
          download_token?: string
          expires_at?: string
          id?: string
          ip_hash?: string | null
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "free_claims_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      productos: {
        Row: {
          activo: boolean | null
          capturas: string[] | null
          categoria: string | null
          created_at: string
          descripcion: string | null
          destacado: boolean | null
          id: string
          imagen_url: string | null
          link_free: string | null
          link_paid: string | null
          nombre: string
          orden: number | null
          precio: number | null
          tags: string[] | null
          video_url: string | null
        }
        Insert: {
          activo?: boolean | null
          capturas?: string[] | null
          categoria?: string | null
          created_at?: string
          descripcion?: string | null
          destacado?: boolean | null
          id?: string
          imagen_url?: string | null
          link_free?: string | null
          link_paid?: string | null
          nombre: string
          orden?: number | null
          precio?: number | null
          tags?: string[] | null
          video_url?: string | null
        }
        Update: {
          activo?: boolean | null
          capturas?: string[] | null
          categoria?: string | null
          created_at?: string
          descripcion?: string | null
          destacado?: boolean | null
          id?: string
          imagen_url?: string | null
          link_free?: string | null
          link_paid?: string | null
          nombre?: string
          orden?: number | null
          precio?: number | null
          tags?: string[] | null
          video_url?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          external_product_id: string | null
          has_free_version: boolean | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_featured: boolean | null
          price_cents: number
          slug: string
          storage_path: string
          tags: string[] | null
          title: string
          video_url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          external_product_id?: string | null
          has_free_version?: boolean | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          price_cents?: number
          slug: string
          storage_path: string
          tags?: string[] | null
          title: string
          video_url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          external_product_id?: string | null
          has_free_version?: boolean | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          price_cents?: number
          slug?: string
          storage_path?: string
          tags?: string[] | null
          title?: string
          video_url?: string | null
        }
        Relationships: []
      }
      proyectos: {
        Row: {
          activo: boolean | null
          capturas: string[] | null
          categoria: string | null
          created_at: string
          demo_url: string | null
          descripcion: string | null
          destacado: boolean | null
          id: string
          imagen_url: string | null
          orden: number | null
          repo_url: string | null
          tags: string[] | null
          titulo: string
          video_url: string | null
        }
        Insert: {
          activo?: boolean | null
          capturas?: string[] | null
          categoria?: string | null
          created_at?: string
          demo_url?: string | null
          descripcion?: string | null
          destacado?: boolean | null
          id?: string
          imagen_url?: string | null
          orden?: number | null
          repo_url?: string | null
          tags?: string[] | null
          titulo: string
          video_url?: string | null
        }
        Update: {
          activo?: boolean | null
          capturas?: string[] | null
          categoria?: string | null
          created_at?: string
          demo_url?: string | null
          descripcion?: string | null
          destacado?: boolean | null
          id?: string
          imagen_url?: string | null
          orden?: number | null
          repo_url?: string | null
          tags?: string[] | null
          titulo?: string
          video_url?: string | null
        }
        Relationships: []
      }
      purchases: {
        Row: {
          buyer_email: string | null
          created_at: string | null
          id: string
          product_id: string | null
          provider: string
          provider_order_id: string | null
          status: string
        }
        Insert: {
          buyer_email?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          provider?: string
          provider_order_id?: string | null
          status?: string
        }
        Update: {
          buyer_email?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          provider?: string
          provider_order_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
