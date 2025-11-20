import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import SubjectCard from './components/SubjectCard'
import SearchBar from './components/SearchBar'
import ChapterList from './components/ChapterList'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function SubjectsScreen({ onOpenSubject }) {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/subjects`)
        const data = await res.json()
        setSubjects(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-slate-900">
      <Header title="HSC Study" subtitle="Maharashtra Board • Std 12" />
      <div className="max-w-md mx-auto px-4 py-4 space-y-3">
        {loading ? (
          <div className="text-center text-blue-300/70 py-20">Loading subjects…</div>
        ) : (
          subjects.map((s) => (
            <SubjectCard
              key={s.id}
              title={s.title}
              chaptersCount={undefined}
              onClick={() => onOpenSubject(s)}
            />
          ))
        )}
        {(!loading && subjects.length === 0) && (
          <div className="text-center text-blue-300/70 py-20">
            No subjects found. Tap to seed data first.
            <div className="mt-4">
              <SeedButton onSeeded={() => window.location.reload()} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function SeedButton({ onSeeded }) {
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)
  const seed = async () => {
    setBusy(true)
    try {
      const res = await fetch(`${API_BASE}/seed`, { method: 'POST' })
      const data = await res.json()
      setDone(data)
      onSeeded?.()
    } catch (e) {
      console.error(e)
    } finally {
      setBusy(false)
    }
  }
  return (
    <button
      onClick={seed}
      disabled={busy}
      className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-60"
    >
      {busy ? 'Seeding…' : done ? 'Seeded' : 'Seed sample chapters'}
    </button>
  )
}

function ChaptersScreen({ subject, onBack }) {
  const [query, setQuery] = useState('')
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch(`${API_BASE}/subjects/${subject.id}/chapters`)
        const data = await res.json()
        setChapters(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchChapters()
  }, [subject.id])

  const filtered = useMemo(() => {
    if (!query) return chapters
    return chapters.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()))
  }, [query, chapters])

  return (
    <div className="min-h-screen bg-slate-900">
      <Header title={subject.title} subtitle="Chapters" onBack={onBack} />
      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        <SearchBar value={query} onChange={setQuery} placeholder="Search chapters" />
        {loading ? (
          <div className="text-center text-blue-300/70 py-20">Loading chapters…</div>
        ) : (
          <ChapterList chapters={filtered} onOpen={(c) => alert(`${c.title}`)} />
        )}
      </div>
    </div>
  )
}

function App() {
  const [activeSubject, setActiveSubject] = useState(null)

  if (activeSubject) {
    return <ChaptersScreen subject={activeSubject} onBack={() => setActiveSubject(null)} />
  }

  return <SubjectsScreen onOpenSubject={setActiveSubject} />
}

export default App
