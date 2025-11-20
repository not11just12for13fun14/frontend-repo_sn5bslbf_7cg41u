import React from 'react'

export default function ChapterList({ chapters, onOpen }) {
  return (
    <div className="space-y-2">
      {chapters.map((ch) => (
        <button
          key={`${ch.number}-${ch.title}`}
          onClick={() => onOpen?.(ch)}
          className="w-full text-left bg-slate-800/70 border border-white/10 rounded-xl p-3 hover:bg-slate-800 transition"
        >
          <div className="text-sm text-blue-300/80">Chapter {ch.number}</div>
          <div className="text-white font-medium leading-snug">{ch.title}</div>
        </button>
      ))}
    </div>
  )
}
