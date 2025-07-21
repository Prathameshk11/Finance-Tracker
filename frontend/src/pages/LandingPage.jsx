import { Link } from "react-router-dom"
import { DollarSign, BarChart3, Shield, Smartphone, Star, ArrowRight } from "lucide-react"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                FinanceTracker
              </span>
            </div>
            <div className="space-x-4">
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-xl font-medium transition-all duration-200 text-gray-700 hover:text-gray-900 hover:bg-white/60"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-6xl">
          

          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent">
              Master Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Financial Future
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your financial habits with our intelligent expense tracking, beautiful insights, and powerful
            analytics. Take control of your money like never before.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/register"
              className="group px-8 py-4 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl text-lg flex items-center space-x-2"
            >
              <span>Start Tracking Free</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 rounded-xl font-semibold transition-all duration-200 bg-white/80 text-gray-700 hover:bg-white hover:text-gray-900 shadow-lg hover:shadow-xl text-lg border border-gray-200"
            >
              Sign In
            </Link>
          </div>

          
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed Financially</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make financial management effortless and insightful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Smart Tracking</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Effortlessly log income and expenses with our intuitive interface and smart categorization
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Visual Insights</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Beautiful charts and graphs that reveal your spending patterns and financial trends
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Bank-Level Security</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Your financial data is protected with enterprise-grade encryption and security
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Mobile First</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Access your finances anywhere with our responsive design and mobile optimization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Financial Life?</h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of users who have already taken control of their finances and achieved their financial goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="group px-8 py-4 rounded-xl font-semibold transition-all duration-200 bg-white text-blue-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl text-lg flex items-center space-x-2"
            >
              <span>Start Your Journey Today</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold">FinanceTracker</span>
          </div>
          <p className="text-gray-400 mb-6">
            Empowering individuals to achieve financial freedom through smart money management
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <span>© 2024 FinanceTracker. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
