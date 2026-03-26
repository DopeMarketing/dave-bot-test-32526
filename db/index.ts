import { supabase } from '@/lib/supabase';
import type {
  User,
  ApiIntegration,
  KnowledgeBaseEntry,
  SlackBotQuery,
  DataAnalysisReport,
  BusinessMetric,
  SmsAlert,
  MeetingSummary
} from '@/types';

// Users
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return data || [];
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch user: ${error.message}`);
  return data;
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();
  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return data;
}

export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update user: ${error.message}`);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete user: ${error.message}`);
}

// API Integrations
export async function getAllApiIntegrations(): Promise<ApiIntegration[]> {
  const { data, error } = await supabase
    .from('api_integrations')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch API integrations: ${error.message}`);
  return data || [];
}

export async function getApiIntegrationById(id: string): Promise<ApiIntegration | null> {
  const { data, error } = await supabase
    .from('api_integrations')
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch API integration: ${error.message}`);
  return data;
}

export async function createApiIntegration(integration: Omit<ApiIntegration, 'id' | 'created_at' | 'updated_at'>): Promise<ApiIntegration> {
  const { data, error } = await supabase
    .from('api_integrations')
    .insert(integration)
    .select()
    .single();
  if (error) throw new Error(`Failed to create API integration: ${error.message}`);
  return data;
}

export async function updateApiIntegration(id: string, updates: Partial<Omit<ApiIntegration, 'id' | 'created_at' | 'updated_at'>>): Promise<ApiIntegration> {
  const { data, error } = await supabase
    .from('api_integrations')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update API integration: ${error.message}`);
  return data;
}

export async function deleteApiIntegration(id: string): Promise<void> {
  const { error } = await supabase
    .from('api_integrations')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete API integration: ${error.message}`);
}

// Knowledge Base Entries
export async function getAllKnowledgeBaseEntries(): Promise<KnowledgeBaseEntry[]> {
  const { data, error } = await supabase
    .from('knowledge_base_entries')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch knowledge base entries: ${error.message}`);
  return data || [];
}

export async function getKnowledgeBaseEntryById(id: string): Promise<KnowledgeBaseEntry | null> {
  const { data, error } = await supabase
    .from('knowledge_base_entries')
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch knowledge base entry: ${error.message}`);
  return data;
}

export async function createKnowledgeBaseEntry(entry: Omit<KnowledgeBaseEntry, 'id' | 'created_at' | 'updated_at'>): Promise<KnowledgeBaseEntry> {
  const { data, error } = await supabase
    .from('knowledge_base_entries')
    .insert(entry)
    .select()
    .single();
  if (error) throw new Error(`Failed to create knowledge base entry: ${error.message}`);
  return data;
}

export async function updateKnowledgeBaseEntry(id: string, updates: Partial<Omit<KnowledgeBaseEntry, 'id' | 'created_at' | 'updated_at'>>): Promise<KnowledgeBaseEntry> {
  const { data, error } = await supabase
    .from('knowledge_base_entries')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update knowledge base entry: ${error.message}`);
  return data;
}

export async function deleteKnowledgeBaseEntry(id: string): Promise<void> {
  const { error } = await supabase
    .from('knowledge_base_entries')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete knowledge base entry: ${error.message}`);
}

// Slack Bot Queries
export async function getAllSlackBotQueries(): Promise<SlackBotQuery[]> {
  const { data, error } = await supabase
    .from('slack_bot_queries')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch slack bot queries: ${error.message}`);
  return data || [];
}

export async function getSlackBotQueryById(id: string): Promise<SlackBotQuery | null> {
  const { data, error } = await supabase
    .from('slack_bot_queries')
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch slack bot query: ${error.message}`);
  return data;
}

export async function createSlackBotQuery(query: Omit<SlackBotQuery, 'id' | 'created_at' | 'updated_at'>): Promise<SlackBotQuery> {
  const { data, error } = await supabase
    .from('slack_bot_queries')
    .insert(query)
    .select()
    .single();
  if (error) throw new Error(`Failed to create slack bot query: ${error.message}`);
  return data;
}

export async function updateSlackBotQuery(id: string, updates: Partial<Omit<SlackBotQuery, 'id' | 'created_at' | 'updated_at'>>): Promise<SlackBotQuery> {
  const { data, error } = await supabase
    .from('slack_bot_queries')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update slack bot query: ${error.message}`);
  return data;
}

export async function deleteSlackBotQuery(id: string): Promise<void> {
  const { error } = await supabase
    .from('slack_bot_queries')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete slack bot query: ${error.message}`);
}

// Data Analysis Reports
export async function getAllDataAnalysisReports(): Promise<DataAnalysisReport[]> {
  const { data, error } = await supabase
    .from('data_analysis_reports')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch data analysis reports: ${error.message}`);
  return data || [];
}

export async function getDataAnalysisReportById(id: string): Promise<DataAnalysisReport | null> {
  const { data, error } = await supabase
    .from('data_analysis_reports')
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch data analysis report: ${error.message}`);
  return data;
}

export async function createDataAnalysisReport(report: Omit<DataAnalysisReport, 'id' | 'created_at' | 'updated_at'>): Promise<DataAnalysisReport> {
  const { data, error } = await supabase
    .from('data_analysis_reports')
    .insert(report)
    .select()
    .single();
  if (error) throw new Error(`Failed to create data analysis report: ${error.message}`);
  return data;
}

export async function updateDataAnalysisReport(id: string, updates: Partial<Omit<DataAnalysisReport, 'id' | 'created_at' | 'updated_at'>>): Promise<DataAnalysisReport> {
  const { data, error } = await supabase
    .from('data_analysis_reports')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update data analysis report: ${error.message}`);
  return data;
}

export async function deleteDataAnalysisReport(id: string): Promise<void> {
  const { error } = await supabase
    .from('data_analysis_reports')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete data analysis report: ${error.message}`);
}

// Business Metrics
export async function getAllBusinessMetrics(): Promise<BusinessMetric[]> {
  const { data, error } = await supabase
    .from('business_metrics')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch business metrics: ${error.message}`);
  return data || [];
}

export async function getBusinessMetricById(id: string): Promise<BusinessMetric | null> {
  const { data, error } = await supabase
    .from('business_metrics')
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch business metric: ${error.message}`);
  return data;
}

export async function createBusinessMetric(metric: Omit<BusinessMetric, 'id' | 'created_at' | 'updated_at'>): Promise<BusinessMetric> {
  const { data, error } = await supabase
    .from('business_metrics')
    .insert(metric)
    .select()
    .single();
  if (error) throw new Error(`Failed to create business metric: ${error.message}`);
  return data;
}

export async function updateBusinessMetric(id: string, updates: Partial<Omit<BusinessMetric, 'id' | 'created_at' | 'updated_at'>>): Promise<BusinessMetric> {
  const { data, error } = await supabase
    .from('business_metrics')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update business metric: ${error.message}`);
  return data;
}

export async function deleteBusinessMetric(id: string): Promise<void> {
  const { error } = await supabase
    .from('business_metrics')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete business metric: ${error.message}`);
}

// SMS Alerts
export async function getAllSmsAlerts(): Promise<SmsAlert[]> {
  const { data, error } = await supabase
    .from('sms_alerts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch SMS alerts: ${error.message}`);
  return data || [];
}

export async function getSmsAlertById(id: string): Promise<SmsAlert | null> {
  const { data, error } = await supabase
    .from('sms_alerts')
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch SMS alert: ${error.message}`);
  return data;
}

export async function createSmsAlert(alert: Omit<SmsAlert, 'id' | 'created_at' | 'updated_at'>): Promise<SmsAlert> {
  const { data, error } = await supabase
    .from('sms_alerts')
    .insert(alert)
    .select()
    .single();
  if (error) throw new Error(`Failed to create SMS alert: ${error.message}`);
  return data;
}

export async function updateSmsAlert(id: string, updates: Partial<Omit<SmsAlert, 'id' | 'created_at' | 'updated_at'>>): Promise<SmsAlert> {
  const { data, error } = await supabase
    .from('sms_alerts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update SMS alert: ${error.message}`);
  return data;
}

export async function deleteSmsAlert(id: string): Promise<void> {
  const { error } = await supabase
    .from('sms_alerts')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete SMS alert: ${error.message}`);
}

// Meeting Summaries
export async function getAllMeetingSummaries(): Promise<MeetingSummary[]> {
  const { data, error } = await supabase
    .from('meeting_summaries')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch meeting summaries: ${error.message}`);
  return data || [];
}

export async function getMeetingSummaryById(id: string): Promise<MeetingSummary | null> {
  const { data, error } = await supabase
    .from('meeting_summaries')
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch meeting summary: ${error.message}`);
  return data;
}

export async function createMeetingSummary(summary: Omit<MeetingSummary, 'id' | 'created_at' | 'updated_at'>): Promise<MeetingSummary> {
  const { data, error } = await supabase
    .from('meeting_summaries')
    .insert(summary)
    .select()
    .single();
  if (error) throw new Error(`Failed to create meeting summary: ${error.message}`);
  return data;
}

export async function updateMeetingSummary(id: string, updates: Partial<Omit<MeetingSummary, 'id' | 'created_at' | 'updated_at'>>): Promise<MeetingSummary> {
  const { data, error } = await supabase
    .from('meeting_summaries')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update meeting summary: ${error.message}`);
  return data;
}

export async function deleteMeetingSummary(id: string): Promise<void> {
  const { error } = await supabase
    .from('meeting_summaries')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete meeting summary: ${error.message}`);
}