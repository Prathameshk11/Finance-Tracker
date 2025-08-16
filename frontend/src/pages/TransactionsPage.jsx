import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Filter, Search, Calendar, TrendingUp, TrendingDown } from "lucide-react"
import axios from "axios"
import TransactionModal from "../components/TransactionModal"

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/api/transactions")
      setTransactions(response.data)
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleTransactionAdded = () => {
    fetchTransactions()
    setShowModal(false)
    setEditingTransaction(null)
  }

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axios.delete(`/api/transactions/${id}`)
        fetchTransactions()
      } catch (error) {
        console.error("Error deleting transaction:", error)
      }
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === "all" || transaction.type === filter
    const matchesSearch =
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.note && transaction.note.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading transactions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            All Transactions
          </h1>
          <p className="text-gray-600 mt-2">Manage and track all your financial transactions</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="group flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">Filter by type:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === "all"
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("INCOME")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === "INCOME"
                    ? "bg-green-100 text-green-700 shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Income
              </button>
              <button
                onClick={() => setFilter("EXPENSE")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === "EXPENSE"
                    ? "bg-red-100 text-red-700 shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Expenses
              </button>
            </div>
          </div>

          <div className="flex-1 lg:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        {filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Type
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
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                          transaction.type === "INCOME" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.type === "INCOME" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      {transaction.note || "No description"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                      <span className={`${transaction.type === "INCOME" ? "text-green-600" : "text-red-600"}`}>
                        {transaction.type === "INCOME" ? "+" : "-"}₹{transaction.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="Edit transaction"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Delete transaction"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {filter === "all" ? "No transactions found" : `No ${filter.toLowerCase()} transactions found`}
            </h4>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "Try adjusting your search terms or filters"
                : "Add your first transaction to get started with tracking your finances!"}
            </p>
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
        <TransactionModal
          transaction={editingTransaction}
          onClose={() => {
            setShowModal(false)
            setEditingTransaction(null)
          }}
          onTransactionAdded={handleTransactionAdded}
        />
      )}
    </div>
  )
}

export default TransactionsPage
