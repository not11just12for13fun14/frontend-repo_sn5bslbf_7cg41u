import React from 'react'
import { BookOpen, ChevronLeft } from 'lucide-react'

export default function Header({ title, onBack, subtitle }) {
  return (
    <div className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur border-b border-white/10">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
        {onBack ? (
          <button
            aria-label="Back"
            onClick={onBack}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white"
          >
            <ChevronLeft size={20} />
          </button>
        ) : (
          <div className="p-2 rounded-full bg-blue-500/20 text-blue-300">
            <BookOpen size={20} />
          </div>
        )}
        <div className="flex-1">
          <div className="text-white font-semibold leading-tight">{title}</div>
          {subtitle && <div className="text-xs text-blue-300/70">{subtitle}</div>}
        </div>
      </div>
    </div>
  )
}
