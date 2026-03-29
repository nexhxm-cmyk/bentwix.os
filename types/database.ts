export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          role: 'owner' | 'admin' | 'manager' | 'employee' | 'client';
          team_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      teams: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['teams']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['teams']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          team_id: string;
          name: string;
          description: string | null;
          status: 'planning' | 'active' | 'on-hold' | 'completed';
          budget: number | null;
          spent: number;
          start_date: string | null;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      tasks: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          description: string | null;
          status: 'todo' | 'in-progress' | 'in-review' | 'done';
          priority: 'low' | 'medium' | 'high' | 'urgent';
          assigned_to: string | null;
          due_date: string | null;
          estimated_hours: number | null;
          actual_hours: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tasks']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['tasks']['Insert']>;
      };
      invoices: {
        Row: {
          id: string;
          team_id: string;
          client_id: string;
          invoice_number: string;
          amount: number;
          status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
          issued_date: string;
          due_date: string;
          paid_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['invoices']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['invoices']['Insert']>;
      };
      payments: {
        Row: {
          id: string;
          invoice_id: string;
          amount: number;
          status: 'pending' | 'completed' | 'failed' | 'refunded';
          stripe_payment_id: string | null;
          payment_date: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['payments']['Insert']>;
      };
      earnings: {
        Row: {
          id: string;
          user_id: string;
          task_id: string;
          amount: number;
          type: 'hourly' | 'fixed' | 'commission';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['earnings']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['earnings']['Insert']>;
      };
      messages: {
        Row: {
          id: string;
          team_id: string;
          channel_id: string;
          user_id: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };
      deals: {
        Row: {
          id: string;
          team_id: string;
          client_id: string;
          title: string;
          value: number;
          stage: 'prospecting' | 'negotiation' | 'proposal' | 'won' | 'lost';
          probability: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['deals']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['deals']['Insert']>;
      };
      subscriptions: {
        Row: {
          id: string;
          team_id: string;
          stripe_customer_id: string;
          stripe_subscription_id: string;
          plan: 'starter' | 'growth' | 'pro';
          status: 'active' | 'trialing' | 'past_due' | 'canceled';
          current_period_start: string;
          current_period_end: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['subscriptions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>;
      };
      roles_permissions: {
        Row: {
          id: string;
          role: 'owner' | 'admin' | 'manager' | 'employee' | 'client';
          permission: string;
          created_at: string;
        };
        Insert: Database['public']['Tables']['roles_permissions']['Row'];
        Update: Partial<Database['public']['Tables']['roles_permissions']['Insert']>;
      };
    };
  };
};

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

export type User = Tables<'users'>;
export type Team = Tables<'teams'>;
export type Project = Tables<'projects'>;
export type Task = Tables<'tasks'>;
export type Invoice = Tables<'invoices'>;
export type Payment = Tables<'payments'>;
export type Message = Tables<'messages'>;
export type Deal = Tables<'deals'>;
export type Subscription = Tables<'subscriptions'>;
