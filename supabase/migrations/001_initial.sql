BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Owner', 'Admin', 'Tester')),
  slack_user_id TEXT,
  phone_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_slack_user_id ON users(slack_user_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);

-- API integrations table
CREATE TABLE api_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL CHECK (service_name IN ('slack', 'hubspot', 'chatgpt', 'google_sheets', 'google_drive', 'twilio', 'activecampaign', 'zapier')),
  credentials JSONB NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_api_integrations_user_service ON api_integrations(user_id, service_name);
CREATE INDEX idx_api_integrations_user_id ON api_integrations(user_id);
CREATE INDEX idx_api_integrations_service_name ON api_integrations(service_name);
CREATE INDEX idx_api_integrations_created_at ON api_integrations(created_at);

-- Knowledge base entries table
CREATE TABLE knowledge_base_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  embedding_vector VECTOR(1536),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_knowledge_base_entries_user_id ON knowledge_base_entries(user_id);
CREATE INDEX idx_knowledge_base_entries_tags ON knowledge_base_entries USING GIN(tags);
CREATE INDEX idx_knowledge_base_entries_embedding ON knowledge_base_entries USING ivfflat (embedding_vector vector_cosine_ops) WITH (lists = 100);
CREATE INDEX idx_knowledge_base_entries_created_at ON knowledge_base_entries(created_at);

-- Slack bot queries table
CREATE TABLE slack_bot_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  slack_channel_id TEXT NOT NULL,
  slack_message_ts TEXT NOT NULL,
  query_text TEXT NOT NULL,
  response_text TEXT,
  knowledge_entries_used UUID[],
  anthropic_response_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_slack_bot_queries_user_id ON slack_bot_queries(user_id);
CREATE INDEX idx_slack_bot_queries_slack_channel_id ON slack_bot_queries(slack_channel_id);
CREATE INDEX idx_slack_bot_queries_created_at ON slack_bot_queries(created_at);

-- Data analysis reports table
CREATE TABLE data_analysis_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  report_name TEXT NOT NULL,
  data_sources TEXT[] NOT NULL,
  report_config JSONB NOT NULL,
  generated_content TEXT,
  raw_data JSONB,
  delivery_channels TEXT[] NOT NULL,
  schedule_cron TEXT,
  last_generated_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_data_analysis_reports_user_id ON data_analysis_reports(user_id);
CREATE INDEX idx_data_analysis_reports_is_active ON data_analysis_reports(is_active);
CREATE INDEX idx_data_analysis_reports_last_generated_at ON data_analysis_reports(last_generated_at);
CREATE INDEX idx_data_analysis_reports_created_at ON data_analysis_reports(created_at);

-- Business metrics table
CREATE TABLE business_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  data_source TEXT NOT NULL,
  query_config JSONB NOT NULL,
  threshold_conditions JSONB NOT NULL,
  current_value NUMERIC,
  last_checked_at TIMESTAMPTZ,
  check_frequency_minutes INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_business_metrics_user_id ON business_metrics(user_id);
CREATE INDEX idx_business_metrics_is_active ON business_metrics(is_active);
CREATE INDEX idx_business_metrics_last_checked_at ON business_metrics(last_checked_at);
CREATE INDEX idx_business_metrics_created_at ON business_metrics(created_at);

-- SMS alerts table
CREATE TABLE sms_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  business_metric_id UUID NOT NULL REFERENCES business_metrics(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  message_content TEXT NOT NULL,
  twilio_message_sid TEXT,
  delivery_status TEXT NOT NULL CHECK (delivery_status IN ('pending', 'sent', 'delivered', 'failed')),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sms_alerts_user_id ON sms_alerts(user_id);
CREATE INDEX idx_sms_alerts_business_metric_id ON sms_alerts(business_metric_id);
CREATE INDEX idx_sms_alerts_delivery_status ON sms_alerts(delivery_status);
CREATE INDEX idx_sms_alerts_created_at ON sms_alerts(created_at);

-- Meeting summaries table
CREATE TABLE meeting_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  meeting_title TEXT NOT NULL,
  meeting_date TIMESTAMPTZ NOT NULL,
  participants TEXT[],
  source_content TEXT,
  ai_summary TEXT,
  google_drive_file_id TEXT,
  google_drive_url TEXT,
  chatgpt_request_id TEXT,
  processing_status TEXT NOT NULL CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_meeting_summaries_user_id ON meeting_summaries(user_id);
CREATE INDEX idx_meeting_summaries_meeting_date ON meeting_summaries(meeting_date);
CREATE INDEX idx_meeting_summaries_processing_status ON meeting_summaries(processing_status);
CREATE INDEX idx_meeting_summaries_created_at ON meeting_summaries(created_at);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE slack_bot_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_analysis_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_summaries ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "owner_all" ON users FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON api_integrations FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON knowledge_base_entries FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON slack_bot_queries FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON data_analysis_reports FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON business_metrics FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON sms_alerts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON meeting_summaries FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

COMMIT;