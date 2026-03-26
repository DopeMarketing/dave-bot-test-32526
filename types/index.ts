export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Owner' | 'Admin' | 'Tester';
  slack_user_id: string | null;
  phone_number: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ApiIntegration {
  id: string;
  user_id: string;
  service_name: 'slack' | 'hubspot' | 'chatgpt' | 'google_sheets' | 'google_drive' | 'twilio' | 'activecampaign' | 'zapier';
  credentials: Record<string, any>;
  is_active: boolean;
  last_sync_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface KnowledgeBaseEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  tags: string[] | null;
  embedding_vector: number[] | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface SlackBotQuery {
  id: string;
  user_id: string;
  slack_channel_id: string;
  slack_message_ts: string;
  query_text: string;
  response_text: string | null;
  knowledge_entries_used: string[] | null;
  anthropic_response_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface DataAnalysisReport {
  id: string;
  user_id: string;
  report_name: string;
  data_sources: string[];
  report_config: Record<string, any>;
  generated_content: string | null;
  raw_data: Record<string, any> | null;
  delivery_channels: string[];
  schedule_cron: string | null;
  last_generated_at: Date | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface BusinessMetric {
  id: string;
  user_id: string;
  metric_name: string;
  data_source: string;
  query_config: Record<string, any>;
  threshold_conditions: Record<string, any>;
  current_value: number | null;
  last_checked_at: Date | null;
  check_frequency_minutes: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface SmsAlert {
  id: string;
  user_id: string;
  business_metric_id: string;
  phone_number: string;
  message_content: string;
  twilio_message_sid: string | null;
  delivery_status: 'pending' | 'sent' | 'delivered' | 'failed';
  sent_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface MeetingSummary {
  id: string;
  user_id: string;
  meeting_title: string;
  meeting_date: Date;
  participants: string[] | null;
  source_content: string | null;
  ai_summary: string | null;
  google_drive_file_id: string | null;
  google_drive_url: string | null;
  chatgpt_request_id: string | null;
  processing_status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: Date;
  updated_at: Date;
}

export interface ConversationInsight {
  id: string;
  user_id: string;
  slack_channel_id: string;
  slack_message_ts: string;
  conversation_context: string;
  extracted_insights: Record<string, any> | null;
  lead_email: string | null;
  activecampaign_contact_id: string | null;
  lead_score_impact: number | null;
  sync_status: 'pending' | 'synced' | 'failed';
  synced_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface CustomerFeedbackAnalysis {
  id: string;
  user_id: string;
  feedback_source: string;
  source_reference_id: string | null;
  raw_feedback: string;
  customer_identifier: string | null;
  ai_analysis: Record<string, any> | null;
  sentiment_score: number | null;
  key_themes: string[] | null;
  chatgpt_request_id: string | null;
  analysis_status: 'pending' | 'analyzing' | 'completed' | 'failed';
  analyzed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface WorkflowExecution {
  id: string;
  user_id: string;
  workflow_type: string;
  trigger_source: string;
  input_data: Record<string, any> | null;
  output_data: Record<string, any> | null;
  execution_status: 'running' | 'completed' | 'failed' | 'cancelled';
  error_details: string | null;
  duration_ms: number | null;
  started_at: Date;
  completed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Database {
  users: User;
  api_integrations: ApiIntegration;
  knowledge_base_entries: KnowledgeBaseEntry;
  slack_bot_queries: SlackBotQuery;
  data_analysis_reports: DataAnalysisReport;
  business_metrics: BusinessMetric;
  sms_alerts: SmsAlert;
  meeting_summaries: MeetingSummary;
  conversation_insights: ConversationInsight;
  customer_feedback_analysis: CustomerFeedbackAnalysis;
  workflow_executions: WorkflowExecution;
}