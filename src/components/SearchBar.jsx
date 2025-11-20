import React from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search chapters' }) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-800/70 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-blue-300/50 outline-none focus:ring-2 focus:ring-blue-500/40"
      />
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300/70" />
    </div>
  )
}
