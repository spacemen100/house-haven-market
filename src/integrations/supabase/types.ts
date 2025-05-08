export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          address_city: string
          address_district: string | null
          address_state: string | null
          address_street: string | null
          address_zip: string | null
          agent_name: string | null
          agent_phone: string | null
          baths: number
          beds: number
          cadastral_code: string | null
          ceiling_height: number | null
          condition: Database["public"]["Enums"]["property_condition"] | null
          contact_email: string | null
          created_at: string | null
          description: string | null
          facebook_url: string | null
          featured: boolean | null
          floor_level: number | null
          has_air_conditioning: boolean | null
          has_elevator: boolean | null
          has_ventilation: boolean | null
          id: string
          instagram_handle: string | null
          is_accessible: boolean | null
          kitchen_type: Database["public"]["Enums"]["kitchen_type"] | null
          lat: number | null
          listing_type: Database["public"]["Enums"]["listing_type"]
          lng: number | null
          phone_number: string | null
          plan: string | null
          price: number
          project_name: string | null
          property_type: Database["public"]["Enums"]["property_type"]
          rooms: number | null
          m2: number // Changé de sqft à m2
          status: Database["public"]["Enums"]["property_status"] | null
          terrace_area: number | null
          title: string
          total_floors: number | null
          twitter_handle: string | null
          updated_at: string | null
          year_built: number | null
        }
        Insert: {
          address_city: string
          address_district?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          agent_name?: string | null
          agent_phone?: string | null
          baths?: number
          beds?: number
          cadastral_code?: string | null
          ceiling_height?: number | null
          condition?: Database["public"]["Enums"]["property_condition"] | null
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          facebook_url?: string | null
          featured?: boolean | null
          floor_level?: number | null
          has_air_conditioning?: boolean | null
          has_elevator?: boolean | null
          has_ventilation?: boolean | null
          id?: string
          instagram_handle?: string | null
          is_accessible?: boolean | null
          kitchen_type?: Database["public"]["Enums"]["kitchen_type"] | null
          lat?: number | null
          listing_type: Database["public"]["Enums"]["listing_type"]
          lng?: number | null
          phone_number?: string | null
          plan?: string | null
          price: number
          project_name?: string | null
          property_type: Database["public"]["Enums"]["property_type"]
          rooms?: number | null
          m2?: number // Changé de sqft à m2
          status?: Database["public"]["Enums"]["property_status"] | null
          terrace_area?: number | null
          title: string
          total_floors?: number | null
          twitter_handle?: string | null
          updated_at?: string | null
          year_built?: number | null
        }
        Update: {
          address_city?: string
          address_district?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          agent_name?: string | null
          agent_phone?: string | null
          baths?: number
          beds?: number
          cadastral_code?: string | null
          ceiling_height?: number | null
          condition?: Database["public"]["Enums"]["property_condition"] | null
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          facebook_url?: string | null
          featured?: boolean | null
          floor_level?: number | null
          has_air_conditioning?: boolean | null
          has_elevator?: boolean | null
          has_ventilation?: boolean | null
          id?: string
          instagram_handle?: string | null
          is_accessible?: boolean | null
          kitchen_type?: Database["public"]["Enums"]["kitchen_type"] | null
          lat?: number | null
          listing_type?: Database["public"]["Enums"]["listing_type"]
          lng?: number | null
          phone_number?: string | null
          plan?: string | null
          price?: number
          project_name?: string | null
          property_type?: Database["public"]["Enums"]["property_type"]
          rooms?: number | null
          m2?: number // Changé de sqft à m2
          status?: Database["public"]["Enums"]["property_status"] | null
          terrace_area?: number | null
          title?: string
          total_floors?: number | null
          twitter_handle?: string | null
          updated_at?: string | null
          year_built?: number | null
        }
        Relationships: []
      }
      property_amenities: {
        Row: {
          amenity: string
          id: string
          property_id: string | null
        }
        Insert: {
          amenity: string
          id?: string
          property_id?: string | null
        }
        Update: {
          amenity?: string
          id?: string
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_amenities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_equipment: {
        Row: {
          equipment: string
          id: string
          property_id: string | null
        }
        Insert: {
          equipment: string
          id?: string
          property_id?: string | null
        }
        Update: {
          equipment?: string
          id?: string
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_equipment_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_images: {
        Row: {
          id: string
          image_url: string
          is_primary: boolean | null
          property_id: string | null
        }
        Insert: {
          id?: string
          image_url: string
          is_primary?: boolean | null
          property_id?: string | null
        }
        Update: {
          id?: string
          image_url?: string
          is_primary?: boolean | null
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_internet_tv: {
        Row: {
          id: string
          option_name: string
          property_id: string | null
        }
        Insert: {
          id?: string
          option_name: string
          property_id?: string | null
        }
        Update: {
          id?: string
          option_name?: string
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_internet_tv_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_nearby_places: {
        Row: {
          id: string
          place_name: string
          property_id: string | null
        }
        Insert: {
          id?: string
          place_name: string
          property_id?: string | null
        }
        Update: {
          id?: string
          place_name?: string
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_nearby_places_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_online_services: {
        Row: {
          id: string
          property_id: string | null
          service_name: string
        }
        Insert: {
          id?: string
          property_id?: string | null
          service_name: string
        }
        Update: {
          id?: string
          property_id?: string | null
          service_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_online_services_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_security: {
        Row: {
          id: string
          property_id: string | null
          security_feature: string
        }
        Insert: {
          id?: string
          property_id?: string | null
          security_feature: string
        }
        Update: {
          id?: string
          property_id?: string | null
          security_feature?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_security_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_storage: {
        Row: {
          id: string
          property_id: string | null
          storage_type: string
        }
        Insert: {
          id?: string
          property_id?: string | null
          storage_type: string
        }
        Update: {
          id?: string
          property_id?: string | null
          storage_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_storage_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
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
      kitchen_type: "american" | "open" | "closed"
      listing_type: "sale" | "rent" | "rent_by_day"
      property_condition: "new" | "good" | "needs_renovation"
      property_status: "free" | "under_caution" | "under_construction"
      property_type: "house" | "apartment" | "land" | "commercial"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      kitchen_type: ["american", "open", "closed"],
      listing_type: ["sale", "rent", "rent_by_day"],
      property_condition: ["new", "good", "needs_renovation"],
      property_status: ["free", "under_caution", "under_construction"],
      property_type: ["house", "apartment", "land", "commercial"],
    },
  },
} as const
