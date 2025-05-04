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
      profiles: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          facebook: string | null
          instagram: string | null
          phone: string | null
          twitter: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          facebook?: string | null
          instagram?: string | null
          phone?: string | null
          twitter?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          facebook?: string | null
          instagram?: string | null
          phone?: string | null
          twitter?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address_city: string | null
          address_district: string | null
          address_state: string | null
          address_street: string | null
          address_zip: string | null
          agent_name: string | null
          agent_phone: string | null
          allows_parties: boolean | null
          allows_pets: boolean | null
          allows_smoking: boolean | null
          baths: number
          beds: number
          building_material: string | null
          cadastral_code: string | null
          ceiling_height: number | null
          condition: string | null
          contact_email: string | null
          created_at: string | null
          description: string | null
          facebook_url: string | null
          featured: boolean | null
          floor_level: number | null
          furniture_type: string | null
          has_air_conditioning: boolean | null
          has_alarm: boolean | null
          has_audio_system: boolean | null
          has_cable_tv: boolean | null
          has_cinema: boolean | null
          has_co_detector: boolean | null
          has_coffee_machine: boolean | null
          has_dishwasher: boolean | null
          has_dryer: boolean | null
          has_electric_kettle: boolean | null
          has_electric_oven: boolean | null
          has_elevator: boolean | null
          has_evacuation_ladder: boolean | null
          has_fire_fighting_system: boolean | null
          has_fireplace: boolean | null
          has_gas: boolean | null
          has_gas_stove: boolean | null
          has_hair_dryer: boolean | null
          has_heater: boolean | null
          has_induction_oven: boolean | null
          has_internet: boolean | null
          has_iron: boolean | null
          has_live_protection: boolean | null
          has_locked_entrance: boolean | null
          has_locked_yard: boolean | null
          has_loggia: boolean | null
          has_microwave: boolean | null
          has_perimeter_cameras: boolean | null
          has_phone_line: boolean | null
          has_refrigerator: boolean | null
          has_satellite_tv: boolean | null
          has_smoke_detector: boolean | null
          has_tv: boolean | null
          has_vacuum_cleaner: boolean | null
          has_vent: boolean | null
          has_ventilation: boolean | null
          has_washing_machine: boolean | null
          heating_type: string | null
          hot_water_type: string | null
          id: string
          instagram_handle: string | null
          is_accessible: boolean | null
          kitchen_type: string | null
          lat: number | null
          listing_type: string | null
          lng: number | null
          near_bank: boolean | null
          near_bus_stop: boolean | null
          near_city_center: boolean | null
          near_greenery: boolean | null
          near_kindergarten: boolean | null
          near_old_district: boolean | null
          near_park: boolean | null
          near_pharmacy: boolean | null
          near_school: boolean | null
          near_shopping_centre: boolean | null
          near_subway: boolean | null
          near_supermarket: boolean | null
          parking_type: string | null
          phone_number: string | null
          plan: string | null
          price: number
          price_per_sqm: number | null
          project_name: string | null
          property_type: string | null
          reference_number: string | null
          rooms: number | null
          sqft: number
          status: string | null
          storeroom_type: string | null
          terrace_area: number | null
          title: string
          total_floors: number | null
          twitter_handle: string | null
          updated_at: string | null
          user_id: string | null
          year_built: number | null
        }
        Insert: {
          address_city?: string | null
          address_district?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          agent_name?: string | null
          agent_phone?: string | null
          allows_parties?: boolean | null
          allows_pets?: boolean | null
          allows_smoking?: boolean | null
          baths?: number
          beds?: number
          building_material?: string | null
          cadastral_code?: string | null
          ceiling_height?: number | null
          condition?: string | null
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          facebook_url?: string | null
          featured?: boolean | null
          floor_level?: number | null
          furniture_type?: string | null
          has_air_conditioning?: boolean | null
          has_alarm?: boolean | null
          has_audio_system?: boolean | null
          has_cable_tv?: boolean | null
          has_cinema?: boolean | null
          has_co_detector?: boolean | null
          has_coffee_machine?: boolean | null
          has_dishwasher?: boolean | null
          has_dryer?: boolean | null
          has_electric_kettle?: boolean | null
          has_electric_oven?: boolean | null
          has_elevator?: boolean | null
          has_evacuation_ladder?: boolean | null
          has_fire_fighting_system?: boolean | null
          has_fireplace?: boolean | null
          has_gas?: boolean | null
          has_gas_stove?: boolean | null
          has_hair_dryer?: boolean | null
          has_heater?: boolean | null
          has_induction_oven?: boolean | null
          has_internet?: boolean | null
          has_iron?: boolean | null
          has_live_protection?: boolean | null
          has_locked_entrance?: boolean | null
          has_locked_yard?: boolean | null
          has_loggia?: boolean | null
          has_microwave?: boolean | null
          has_perimeter_cameras?: boolean | null
          has_phone_line?: boolean | null
          has_refrigerator?: boolean | null
          has_satellite_tv?: boolean | null
          has_smoke_detector?: boolean | null
          has_tv?: boolean | null
          has_vacuum_cleaner?: boolean | null
          has_vent?: boolean | null
          has_ventilation?: boolean | null
          has_washing_machine?: boolean | null
          heating_type?: string | null
          hot_water_type?: string | null
          id?: string
          instagram_handle?: string | null
          is_accessible?: boolean | null
          kitchen_type?: string | null
          lat?: number | null
          listing_type?: string | null
          lng?: number | null
          near_bank?: boolean | null
          near_bus_stop?: boolean | null
          near_city_center?: boolean | null
          near_greenery?: boolean | null
          near_kindergarten?: boolean | null
          near_old_district?: boolean | null
          near_park?: boolean | null
          near_pharmacy?: boolean | null
          near_school?: boolean | null
          near_shopping_centre?: boolean | null
          near_subway?: boolean | null
          near_supermarket?: boolean | null
          parking_type?: string | null
          phone_number?: string | null
          plan?: string | null
          price: number
          price_per_sqm?: number | null
          project_name?: string | null
          property_type?: string | null
          reference_number?: string | null
          rooms?: number | null
          sqft?: number
          status?: string | null
          storeroom_type?: string | null
          terrace_area?: number | null
          title: string
          total_floors?: number | null
          twitter_handle?: string | null
          updated_at?: string | null
          user_id?: string | null
          year_built?: number | null
        }
        Update: {
          address_city?: string | null
          address_district?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          agent_name?: string | null
          agent_phone?: string | null
          allows_parties?: boolean | null
          allows_pets?: boolean | null
          allows_smoking?: boolean | null
          baths?: number
          beds?: number
          building_material?: string | null
          cadastral_code?: string | null
          ceiling_height?: number | null
          condition?: string | null
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          facebook_url?: string | null
          featured?: boolean | null
          floor_level?: number | null
          furniture_type?: string | null
          has_air_conditioning?: boolean | null
          has_alarm?: boolean | null
          has_audio_system?: boolean | null
          has_cable_tv?: boolean | null
          has_cinema?: boolean | null
          has_co_detector?: boolean | null
          has_coffee_machine?: boolean | null
          has_dishwasher?: boolean | null
          has_dryer?: boolean | null
          has_electric_kettle?: boolean | null
          has_electric_oven?: boolean | null
          has_elevator?: boolean | null
          has_evacuation_ladder?: boolean | null
          has_fire_fighting_system?: boolean | null
          has_fireplace?: boolean | null
          has_gas?: boolean | null
          has_gas_stove?: boolean | null
          has_hair_dryer?: boolean | null
          has_heater?: boolean | null
          has_induction_oven?: boolean | null
          has_internet?: boolean | null
          has_iron?: boolean | null
          has_live_protection?: boolean | null
          has_locked_entrance?: boolean | null
          has_locked_yard?: boolean | null
          has_loggia?: boolean | null
          has_microwave?: boolean | null
          has_perimeter_cameras?: boolean | null
          has_phone_line?: boolean | null
          has_refrigerator?: boolean | null
          has_satellite_tv?: boolean | null
          has_smoke_detector?: boolean | null
          has_tv?: boolean | null
          has_vacuum_cleaner?: boolean | null
          has_vent?: boolean | null
          has_ventilation?: boolean | null
          has_washing_machine?: boolean | null
          heating_type?: string | null
          hot_water_type?: string | null
          id?: string
          instagram_handle?: string | null
          is_accessible?: boolean | null
          kitchen_type?: string | null
          lat?: number | null
          listing_type?: string | null
          lng?: number | null
          near_bank?: boolean | null
          near_bus_stop?: boolean | null
          near_city_center?: boolean | null
          near_greenery?: boolean | null
          near_kindergarten?: boolean | null
          near_old_district?: boolean | null
          near_park?: boolean | null
          near_pharmacy?: boolean | null
          near_school?: boolean | null
          near_shopping_centre?: boolean | null
          near_subway?: boolean | null
          near_supermarket?: boolean | null
          parking_type?: string | null
          phone_number?: string | null
          plan?: string | null
          price?: number
          price_per_sqm?: number | null
          project_name?: string | null
          property_type?: string | null
          reference_number?: string | null
          rooms?: number | null
          sqft?: number
          status?: string | null
          storeroom_type?: string | null
          terrace_area?: number | null
          title?: string
          total_floors?: number | null
          twitter_handle?: string | null
          updated_at?: string | null
          user_id?: string | null
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
