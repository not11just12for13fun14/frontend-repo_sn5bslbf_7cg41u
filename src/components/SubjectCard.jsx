import React from 'react'
import { ChevronRight } from 'lucide-react'

export default function SubjectCard({ title, onClick, chaptersCount }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-slate-800/70 border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:bg-slate-800 transition"
    >
      <div>
        <div className="text-white font-medium">{title}</div>
        {chaptersCount != null && (
          <div className="text-xs text-blue-300/70 mt-1">{chaptersCount} chapters</div>
        )}
      </div>
      <ChevronRight className="text-blue-300" size={20} />
    </button>
  )
}
