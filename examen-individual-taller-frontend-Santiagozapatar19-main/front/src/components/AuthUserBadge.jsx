import { useAuth } from '../context/AuthContext'

function AuthUserBadge() {
  const { user, logout, isAuthenticated } = useAuth()

  if (!isAuthenticated) return null

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-end">
        <span className="text-sm font-semibold">
          {user?.name ?? 'Usuario'}
        </span>
        <span className="text-xs text-slate-400">{user?.email}</span>
      </div>
      <button
        onClick={logout}
        className="text-xs px-3 py-1 rounded-full border border-slate-600 hover:bg-slate-800"
      >
        Cerrar sesión
      </button>
    </div>
  )
}

export default AuthUserBadge
