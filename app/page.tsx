export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Dave Bot</div>
          <div className="space-x-4">
            <a href="/login" className="text-gray-600 hover:text-gray-900">Login</a>
            <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Sign Up</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Business Automation
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect your tools, automate reports, and get intelligent alerts. Dave Bot integrates with Slack, HubSpot, Google Sheets, and more.
          </p>
          <a href="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700">
            Start Free Trial
          </a>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Integrations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Slack Knowledge Base</h3>
              <p className="text-gray-600">Query your CEO's knowledge base directly from Slack for strategic decisions.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Automated Reports</h3>
              <p className="text-gray-600">Generate analysis reports from HubSpot and Google Sheets data automatically.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Smart Alerts</h3>
              <p className="text-gray-600">Get SMS notifications when critical business metrics change.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Simple Pricing</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-4xl font-bold text-blue-600 mb-4">$99/month</div>
            <p className="text-gray-600 mb-6">Everything you need to automate your business operations</p>
            <a href="/signup" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Start Trial
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}