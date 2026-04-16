export default function AppHeader() {
  return (
    <header className="border-b border-white/5 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
            style={{ background: "linear-gradient(135deg, #22c55e, #06b6d4)" }}
          >
            ♻
          </div>
          <span className="font-display text-base font-bold text-white tracking-tight">ЭкоСовет</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <button className="text-sm text-white/60 hover:text-white transition-colors">Главная</button>
          <button
            className="text-sm text-white/60 hover:text-white transition-colors"
            onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
          >
            Категории
          </button>
        </nav>
      </div>
    </header>
  );
}
