"use client"

import { useState, useEffect } from "react"
import { X, Calendar, IndianRupee, Plus } from "lucide-react"
import axios from "axios"

const TransactionModal = ({ transaction, onClose, onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    type: "EXPENSE",
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    note: "",
  })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")

  useEffect(() => {
    fetchCategories()
  }, [formData.type])

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount.toString(),
        date: transaction.date,
        note: transaction.note || "",
      })
    }
  }, [transaction])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/categories/${formData.type}`)
      setCategories(response.data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset category when type changes
      ...(name === "type" && { category: "" }),
    }))
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return

    try {
      await axios.post("/api/categories", {
        name: newCategoryName.trim(),
        type: formData.type,
      })

      setNewCategoryName("")
      setShowNewCategory(false)
      fetchCategories()
      setFormData((prev) => ({ ...prev, category: newCategoryName.trim() }))
    } catch (error) {
      setError("Failed to add category")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const payload = {
        ...formData,
        amount: Number.parseFloat(formData.amount),
      }

      if (transaction) {
        await axios.put(`/api/transactions/${transaction.id}`, payload)
      } else {
        await axios.post("/api/transactions", payload)
      }

      onTransactionAdded()
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {transaction ? "Edit Transaction" : "Add New Transaction"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Transaction Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, type: "INCOME", category: "" }))}
                className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                  formData.type === "INCOME"
                    ? "bg-green-50 border-green-300 text-green-700 shadow-sm"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">💰</span>
                  <span>Income</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, type: "EXPENSE", category: "" }))}
                className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                  formData.type === "EXPENSE"
                    ? "bg-red-50 border-red-300 text-red-700 shadow-sm"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">💸</span>
                  <span>Expense</span>
                </div>
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                Category
              </label>
              <button
                type="button"
                onClick={() => setShowNewCategory(!showNewCategory)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add New
              </button>
            </div>

            {showNewCategory && (
              <div className="mb-3 flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}

            <select
              id="category"
              name="category"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="date"
                name="date"
                type="date"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <label htmlFor="note" className="block text-sm font-semibold text-gray-700 mb-2">
              Note (Optional)
            </label>
            <textarea
              id="note"
              name="note"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 resize-none"
              placeholder="Add a note about this transaction..."
              value={formData.note}
              onChange={handleChange}
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? transaction
                  ? "Updating..."
                  : "Adding..."
                : transaction
                  ? "Update Transaction"
                  : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionModal
