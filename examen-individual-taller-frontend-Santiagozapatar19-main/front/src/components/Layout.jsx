import AuthUserBadge from './AuthUserBadge'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80">
        <div className="max-w-4xl mx-auto flex items-center justify-between py-4 px-4">
          <h1 className="text-xl font-bold text-emerald-400">
            Post Manager
          </h1>
          <AuthUserBadge />
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}

export default Layout