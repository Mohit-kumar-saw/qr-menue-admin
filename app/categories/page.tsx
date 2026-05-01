"use client";

import React, { useState } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, Save, X, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";
import { cn } from "@/lib/utils";

const API_BASE_URL = "http://localhost:4000/api";

export default function CategoriesPage() {
  const { categories, refreshData, loading } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [categoryName, setCategoryName] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await axios.put(`${API_BASE_URL}/categories/${editingCategory._id}`, { name: categoryName });
      } else {
        await axios.post(`${API_BASE_URL}/categories`, { name: categoryName });
      }
      setCategoryName("");
      setEditingCategory(null);
      setShowModal(false);
      refreshData();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? Items in this category will remain but become uncategorized.")) return;
    try {
      await axios.delete(`${API_BASE_URL}/categories/${id}`);
      refreshData();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Categories</h1>
          <p className="text-gray-500">Organize your menu items efficiently</p>
        </div>
        <button 
          onClick={() => { setCategoryName(""); setEditingCategory(null); setShowModal(true); }}
          className="hidden md:flex bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus size={20} /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="p-20 text-center text-gray-400">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LayoutGrid size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium">No categories found. Start by adding one!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {categories.map((cat) => (
              <div key={cat._id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 font-black text-xl shadow-inner">
                    {cat.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-lg text-zinc-900">{cat.name}</span>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mt-0.5">Category</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => {
                      setCategoryName(cat.name);
                      setEditingCategory(cat);
                      setShowModal(true);
                    }}
                    className="p-3 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(cat._id)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative z-10 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black text-zinc-900 tracking-tight leading-none mb-2">
                    {editingCategory ? "Edit" : "New"} Category
                  </h3>
                  <p className="text-gray-500 text-sm">Enter the name for your category</p>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Category Name</label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white outline-none transition-all font-bold text-lg text-zinc-900 placeholder:text-gray-300"
                    placeholder="e.g. Signature Cocktails"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-4 rounded-2xl font-bold bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-zinc-600 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Save size={20} />
                    {editingCategory ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (Mobile Only) */}
      <button 
        onClick={() => { setCategoryName(""); setEditingCategory(null); setShowModal(true); }}
        className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 z-40 transition-transform"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
