"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Plus,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Calendar,
  Target,
  Zap,
  Mail,
  Download,
  FileText,
} from "lucide-react"
import axios from "axios"
import TransactionModal from "../components/TransactionModal"
import jsPDF from "jspdf"
import "jspdf-autotable"

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [weeklyReport, setWeeklyReport] = useState(null)
  const [monthlyReport, setMonthlyReport] = useState(null)
  const [yearlyReport, setYearlyReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)

  const fetchDashboardData = async () => {
    try {
      const [dashboardRes, weeklyRes, monthlyRes, yearlyRes] = await Promise.all([
        axios.get("/api/transactions/dashboard"),
        axios.get("/api/reports/weekly"),
        axios.get("/api/reports/monthly"),
        axios.get("/api/reports/yearly"),
      ])

      setDashboardData(dashboardRes.data)
      setWeeklyReport(weeklyRes.data)
      setMonthlyReport(monthlyRes.data)
      setYearlyReport(yearlyRes.data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleTransactionAdded = () => {
    fetchDashboardData()
    setShowModal(false)
  }

  const handleEmailReport = async (period) => {
    setEmailLoading(true)
    try {
      const response = await axios.post(`/api/reports/email/${period}`)
      alert(response.data.message)
    } catch (error) {
      alert("Failed to send email: " + (error.response?.data?.error || error.message))
    } finally {
      setEmailLoading(false)
    }
  }

  const handleExportCSV = async () => {
    setExportLoading(true)
    try {
      const response = await axios.get("/api/reports/export/csv", {
        responseType: "blob",
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "transactions.csv")
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      alert("Failed to export CSV")
    } finally {
      setExportLoading(false)
    }
  }

  const handleExportPDF = async () => {
    setExportLoading(true)
    try {
      const response = await axios.get("/api/transactions")
      const transactions = response.data

      const doc = new jsPDF()
      doc.setFontSize(20)
      doc.text("Transaction Report", 14, 22)
      doc.setFontSize(12)
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32)

      const tableData = transactions.map((t) => [
        new Date(t.date).toLocaleDateString(),
        t.type,
        t.category,
        `₹${t.amount.toFixed(2)}`,
        t.note || "-",
      ])

      doc.autoTable({
        head: [["Date", "Type", "Category", "Amount", "Note"]],
        body: tableData,
        startY: 40,
      })

      doc.save("transactions.pdf")
    } catch (error) {
      alert("Failed to export PDF")
    } finally {
      setExportLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const pieData = dashboardData?.expensesByCategory
    ? Object.entries(dashboardData.expensesByCategory).map(([category, amount]) => ({
        name: category,
        value: Number.parseFloat(amount),
      }))
    : []

  const reportData = [
    { name: "Weekly", income: weeklyReport?.totalIncome || 0, expenses: weeklyReport?.totalExpenses || 0 },
    { name: "Monthly", income: monthlyReport?.totalIncome || 0, expenses: monthlyReport?.totalExpenses || 0 },
    { name: "Yearly", income: yearlyReport?.totalIncome || 0, expenses: yearlyReport?.totalExpenses || 0 },
  ]

  const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#8b5cf6", "#06b6d4", "#f97316"]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Financial Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Track your financial progress and insights</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="group flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Export Actions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Download className="h-5 w-5 mr-2 text-blue-600" />
          Export & Email Reports
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExportCSV}
            disabled={exportLoading}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50"
          >
            <FileText className="h-4 w-4" />
            <span>{exportLoading ? "Exporting..." : "Export CSV"}</span>
          </button>
          <button
            onClick={handleExportPDF}
            disabled={exportLoading}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50"
          >
            <FileText className="h-4 w-4" />
            <span>{exportLoading ? "Exporting..." : "Export PDF"}</span>
          </button>
          <button
            onClick={() => handleEmailReport("weekly")}
            disabled={emailLoading}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-50"
          >
            <Mail className="h-4 w-4" />
            <span>{emailLoading ? "Sending..." : "Email Weekly Report"}</span>
          </button>
          <button
            onClick={() => handleEmailReport("monthly")}
            disabled={emailLoading}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-purple-100 text-purple-700 hover:bg-purple-200 disabled:opacity-50"
          >
            <Mail className="h-4 w-4" />
            <span>{emailLoading ? "Sending..." : "Email Monthly Report"}</span>
          </button>
          <button
            onClick={() => handleEmailReport("yearly")}
            disabled={emailLoading}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-50"
          >
            <Mail className="h-4 w-4" />
            <span>{emailLoading ? "Sending..." : "Email Yearly Report"}</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 font-semibold text-sm uppercase tracking-wide">Total Income</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{dashboardData?.totalIncome?.toFixed(2) || "0.00"}
                </p>
                <p className="text-green-600 text-sm mt-1 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  This month
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 font-semibold text-sm uppercase tracking-wide">Total Expenses</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{dashboardData?.totalExpenses?.toFixed(2) || "0.00"}
                </p>
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  This month
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
          <div
            className={`absolute inset-0 ${
              (dashboardData?.netBalance || 0) >= 0
                ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10"
                : "bg-gradient-to-r from-orange-500/10 to-red-500/10"
            }`}
          ></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`font-semibold text-sm uppercase tracking-wide ${
                    (dashboardData?.netBalance || 0) >= 0 ? "text-blue-600" : "text-orange-600"
                  }`}
                >
                  Net Balance
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{dashboardData?.netBalance?.toFixed(2) || "0.00"}
                </p>
                <p
                  className={`text-sm mt-1 flex items-center ${
                    (dashboardData?.netBalance || 0) >= 0 ? "text-blue-600" : "text-orange-600"
                  }`}
                >
                  <IndianRupee className="h-4 w-4 mr-1" />
                  Current balance
                </p>
              </div>
              <div
                className={`p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 ${
                  (dashboardData?.netBalance || 0) >= 0
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                    : "bg-gradient-to-r from-orange-500 to-red-500"
                }`}
              >
                <IndianRupee className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Financial Reports Overview</h3>
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
            <Calendar className="h-5 w-5 text-white" />
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [`₹${value.toFixed(2)}`, ""]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="income" fill="#22c55e" name="Income" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Expense Categories Pie Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Expense Categories</h3>
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Target className="h-5 w-5 text-white" />
            </div>
          </div>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${value.toFixed(2)}`, "Amount"]} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Target className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">No expense data available</p>
              <p className="text-sm">Add some expenses to see your spending breakdown</p>
            </div>
          )}
        </div>

        {/* Category Bar Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Spending Overview</h3>
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
          </div>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pieData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [`₹${value.toFixed(2)}`, "Amount"]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="value" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Zap className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">No spending data available</p>
              <p className="text-sm">Start tracking expenses to see your spending patterns</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
            <Calendar className="h-5 w-5 text-white" />
          </div>
        </div>

        {dashboardData?.recentTransactions?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dashboardData.recentTransactions.map((transaction, index) => (
                  <tr key={transaction.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.note || "No description"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                      <span className={`${transaction.type === "INCOME" ? "text-green-600" : "text-red-600"}`}>
                        {transaction.type === "INCOME" ? "+" : "-"}₹{transaction.amount.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No transactions yet</h4>
            <p className="text-gray-600 mb-6">Add your first transaction to get started with tracking your finances!</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              <span>Add Transaction</span>
            </button>
          </div>
        )}
      </div>

      {/* Transaction Modal */}
      {showModal && (
        <TransactionModal onClose={() => setShowModal(false)} onTransactionAdded={handleTransactionAdded} />
      )}
    </div>
  )
}

export default Dashboard
