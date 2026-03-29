-- Bentwix OS Database Schema
-- Run this SQL in Supabase to set up the complete database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'manager', 'employee', 'client');
CREATE TYPE project_status AS ENUM ('planning', 'active', 'on-hold', 'completed');
CREATE TYPE task_status AS ENUM ('todo', 'in-progress', 'in-review', 'done');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE earning_type AS ENUM ('hourly', 'fixed', 'commission');
CREATE TYPE deal_stage AS ENUM ('prospecting', 'negotiation', 'proposal', 'won', 'lost');
CREATE TYPE subscription_plan AS ENUM ('starter', 'growth', 'pro');
CREATE TYPE subscription_status AS ENUM ('active', 'trialing', 'past_due', 'canceled');

-- Teams table
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  logo_url TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  role user_role DEFAULT 'employee',
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status project_status DEFAULT 'planning',
  budget DECIMAL(12, 2),
  spent DECIMAL(12, 2) DEFAULT 0,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status task_status DEFAULT 'todo',
  priority task_priority DEFAULT 'medium',
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  due_date DATE,
  estimated_hours DECIMAL(5, 2),
  actual_hours DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Invoices table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  client_id UUID REFERENCES users(id) ON DELETE SET NULL,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  status invoice_status DEFAULT 'draft',
  issued_date DATE NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  status payment_status DEFAULT 'pending',
  stripe_payment_id VARCHAR(255),
  payment_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Earnings table
CREATE TABLE earnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  amount DECIMAL(12, 2) NOT NULL,
  type earning_type NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  channel_id VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Deals table
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  client_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  value DECIMAL(12, 2) NOT NULL,
  stage deal_stage DEFAULT 'prospecting',
  probability INTEGER DEFAULT 50,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID UNIQUE NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  plan subscription_plan NOT NULL,
  status subscription_status DEFAULT 'active',
  current_period_start TIMESTAMP NOT NULL,
  current_period_end TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Roles and Permissions table
CREATE TABLE roles_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role user_role NOT NULL,
  permission VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(role, permission)
);

-- Insert default permissions
INSERT INTO roles_permissions (role, permission) VALUES
('owner', 'manage_team'),
('owner', 'manage_billing'),
('owner', 'manage_users'),
('owner', 'view_all'),
('admin', 'manage_users'),
('admin', 'manage_projects'),
('admin', 'view_all'),
('manager', 'manage_projects'),
('manager', 'manage_tasks'),
('manager', 'view_team'),
('employee', 'manage_tasks'),
('employee', 'view_assigned'),
('client', 'view_limited');

-- Indexes
CREATE INDEX idx_users_team_id ON users(team_id);
CREATE INDEX idx_projects_team_id ON projects(team_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_invoices_team_id ON invoices(team_id);
CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX idx_earnings_user_id ON earnings(user_id);
CREATE INDEX idx_messages_team_id ON messages(team_id);
CREATE INDEX idx_messages_channel_id ON messages(channel_id);
CREATE INDEX idx_deals_team_id ON deals(team_id);
CREATE INDEX idx_subscriptions_team_id ON subscriptions(team_id);

-- Enable RLS (Row Level Security)
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies (sample - implement based on your auth setup)
CREATE POLICY "Users can view their team" ON users
  FOR SELECT USING (team_id IN (SELECT team_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can view team projects" ON projects
  FOR SELECT USING (team_id IN (SELECT team_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can view assigned tasks" ON tasks
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE team_id IN (SELECT team_id FROM users WHERE id = auth.uid())
    )
  );
