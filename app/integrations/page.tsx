import { createServerSupabaseClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function IntegrationsPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // TODO: Read integrations and integration_configs from database
  const availableIntegrations = [
    { name: 'Slack', status: 'connected', icon: '💬' },
    { name: 'HubSpot', status: 'disconnected', icon: '🔶' },
    { name: 'Google Sheets', status: 'connected', icon: '📊' },
    { name: 'Twilio', status: 'disconnected', icon: '📱' },
    { name: 'Active Campaign', status: 'disconnected', icon: '📧' },
    { name: 'Google Drive', status: 'connected', icon: '📁' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Dave Bot</div>
          <a href="/dashboard" className="text-blue-600 hover:text-blue-800">← Back to Dashboard</a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600 mt-2">Connect and manage your third-party integrations</p>
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableIntegrations.map((integration) => (
            <div key={integration.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <h3 className="text-xl font-semibold">{integration.name}</h3>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  integration.status === 'connected' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {integration.status}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">
                {integration.status === 'connected' 
                  ? 'Successfully connected and syncing data' 
                  : 'Connect to enable automation features'}
              </p>
              
              {/* TODO: Implement integration connection/configuration with writes to integrations, integration_configs */}
              <button className={`w-full py-2 px-4 rounded-lg font-medium ${
                integration.status === 'connected'
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
                {integration.status === 'connected' ? 'Configure' : 'Connect'}
              </button>
            </div>
          ))}
        </div>

        {/* Connection Status Overview */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <div className="space-y-3">
            {availableIntegrations.map((integration) => (
              <div key={integration.name} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{integration.icon}</span>
                  <span className="font-medium">{integration.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    integration.status === 'connected' ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  <span className="text-sm text-gray-600">
                    {integration.status === 'connected' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}