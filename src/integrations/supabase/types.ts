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
      chapters: {
        Row: {
          chapter_type: string | null
          created_at: string | null
          description: string | null
          id: string
          institution_id: string | null
          is_active: boolean | null
          leader_id: string | null
          location: string | null
          member_count: number | null
          name: string
          updated_at: string | null
        }
        Insert: {
          chapter_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          institution_id?: string | null
          is_active?: boolean | null
          leader_id?: string | null
          location?: string | null
          member_count?: number | null
          name: string
          updated_at?: string | null
        }
        Update: {
          chapter_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          institution_id?: string | null
          is_active?: boolean | null
          leader_id?: string | null
          location?: string | null
          member_count?: number | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chapters_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapters_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          chapter_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          event_type: string | null
          id: string
          institution_id: string | null
          is_virtual: boolean | null
          location: string | null
          max_attendees: number | null
          meeting_link: string | null
          registration_fee: number | null
          start_date: string
          status: Database["public"]["Enums"]["event_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          chapter_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          event_type?: string | null
          id?: string
          institution_id?: string | null
          is_virtual?: boolean | null
          location?: string | null
          max_attendees?: number | null
          meeting_link?: string | null
          registration_fee?: number | null
          start_date: string
          status?: Database["public"]["Enums"]["event_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          chapter_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          event_type?: string | null
          id?: string
          institution_id?: string | null
          is_virtual?: boolean | null
          location?: string | null
          max_attendees?: number | null
          meeting_link?: string | null
          registration_fee?: number | null
          start_date?: string
          status?: Database["public"]["Enums"]["event_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions: {
        Row: {
          address: string | null
          created_at: string | null
          description: string | null
          domain: string | null
          established_year: number | null
          id: string
          logo_url: string | null
          name: string
          settings: Json | null
          slug: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          domain?: string | null
          established_year?: number | null
          id?: string
          logo_url?: string | null
          name: string
          settings?: Json | null
          slug: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          domain?: string | null
          established_year?: number | null
          id?: string
          logo_url?: string | null
          name?: string
          settings?: Json | null
          slug?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          application_email: string | null
          application_url: string | null
          company: string
          created_at: string | null
          description: string
          experience_level: string | null
          expires_at: string | null
          id: string
          institution_id: string | null
          job_type: string | null
          location: string | null
          posted_by: string | null
          requirements: string | null
          salary_range: string | null
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          application_email?: string | null
          application_url?: string | null
          company: string
          created_at?: string | null
          description: string
          experience_level?: string | null
          expires_at?: string | null
          id?: string
          institution_id?: string | null
          job_type?: string | null
          location?: string | null
          posted_by?: string | null
          requirements?: string | null
          salary_range?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          application_email?: string | null
          application_url?: string | null
          company?: string
          created_at?: string | null
          description?: string
          experience_level?: string | null
          expires_at?: string | null
          id?: string
          institution_id?: string | null
          job_type?: string | null
          location?: string | null
          posted_by?: string | null
          requirements?: string | null
          salary_range?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          batch_year: number | null
          bio: string | null
          created_at: string | null
          current_company: string | null
          current_position: string | null
          degree: string | null
          department: string | null
          email: string
          first_name: string
          github_url: string | null
          id: string
          institution_id: string | null
          is_job_seeker: boolean | null
          is_mentor: boolean | null
          last_name: string
          linkedin_url: string | null
          location: string | null
          phone: string | null
          privacy_settings: Json | null
          profile_photo_url: string | null
          skills: string[] | null
          twitter_url: string | null
          updated_at: string | null
        }
        Insert: {
          batch_year?: number | null
          bio?: string | null
          created_at?: string | null
          current_company?: string | null
          current_position?: string | null
          degree?: string | null
          department?: string | null
          email: string
          first_name: string
          github_url?: string | null
          id: string
          institution_id?: string | null
          is_job_seeker?: boolean | null
          is_mentor?: boolean | null
          last_name: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          privacy_settings?: Json | null
          profile_photo_url?: string | null
          skills?: string[] | null
          twitter_url?: string | null
          updated_at?: string | null
        }
        Update: {
          batch_year?: number | null
          bio?: string | null
          created_at?: string | null
          current_company?: string | null
          current_position?: string | null
          degree?: string | null
          department?: string | null
          email?: string
          first_name?: string
          github_url?: string | null
          id?: string
          institution_id?: string | null
          is_job_seeker?: boolean | null
          is_mentor?: boolean | null
          last_name?: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          privacy_settings?: Json | null
          profile_photo_url?: string | null
          skills?: string[] | null
          twitter_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          granted_at: string | null
          granted_by: string | null
          id: string
          institution_id: string | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string | null
        }
        Insert: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          institution_id?: string | null
          role: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Update: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          institution_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
          _institution_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      event_status: "draft" | "published" | "cancelled" | "completed"
      job_status: "active" | "closed" | "draft"
      membership_status: "active" | "inactive" | "pending" | "suspended"
      user_role: "alumni" | "admin" | "chapter_leader" | "institution_admin"
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
      event_status: ["draft", "published", "cancelled", "completed"],
      job_status: ["active", "closed", "draft"],
      membership_status: ["active", "inactive", "pending", "suspended"],
      user_role: ["alumni", "admin", "chapter_leader", "institution_admin"],
    },
  },
} as const
