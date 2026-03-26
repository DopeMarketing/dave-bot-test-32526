import { createServerSupabaseClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // TODO: Read bot_activities, alerts, integrations, reports from database
  const activities = []
  const alerts = []
  const integrations = []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Dave Bot</div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user.email}</span>
            <button className="text-gray-600 hover:text-gray-900">Settings</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your automation activities and system status</p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Active Integrations</h3>
            <p className="text-3xl font-bold text-blue-600">{integrations.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Today's Activities</h3>
            <p className="text-3xl font-bold text-green-600">{activities.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Active Alerts</h3>
            <p className="text-3xl font-bold text-yellow-600">{alerts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Reports Generated</h3>
            <p className="text-3xl font-bold text-purple-600">24</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Feed */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Recent Activities</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500">No recent activities</p>
            </div>
          </div>

          {/* Quick Actions & Alerts */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <a href="/slack" className="block w-full text-left p-3 border rounded hover:bg-gray-50">
                  Slack Bot Setup
                </a>
                <a href="/integrations" className="block w-full text-left p-3 border rounded hover:bg-gray-50">
                  Add Integration
                </a>
                <a href="/reports" className="block w-full text-left p-3 border rounded hover:bg-gray-50">
                  Create Report
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Alerts Summary</h2>
              <p className="text-gray-500">No active alerts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}