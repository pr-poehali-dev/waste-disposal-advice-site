import Icon from "@/components/ui/icon";
import { WasteCategory, filterCategories } from "@/data/wasteData";

type Props = {
  query: string;
  activeFilter: string | null;
  result: WasteCategory | null;
  searched: boolean;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  onFilter: (key: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
};

export default function SearchSection({
  query,
  activeFilter,
  result,
  searched,
  onQueryChange,
  onSearch,
  onClear,
  onFilter,
  onKeyDown,
}: Props) {
  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-16 pb-10 text-center">
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs text-white/60 mb-8"
            style={{ border: "1px solid rgba(34,197,94,0.2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-slow inline-block"></span>
            Узнай, как правильно утилизировать любой мусор
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-tight mb-4">
            Что делать с
            <br />
            <span className="gradient-text">этим мусором?</span>
          </h1>
          <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Введи название отходов и получи точные советы по их правильной утилизации
          </p>

          {/* Search Bar */}
          <div
            className="relative max-w-xl mx-auto mb-6 search-glow rounded-2xl transition-all duration-300"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center px-5 py-4 gap-3">
              <Icon name="Search" size={20} className="text-white/40 flex-shrink-0" />
              <input
                className="flex-1 bg-transparent text-white placeholder:text-white/30 text-base outline-none"
                placeholder="Например: пластиковая бутылка, стекло, батарейки..."
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={onKeyDown}
              />
              {query && (
                <button
                  onClick={onClear}
                  className="text-white/30 hover:text-white/60 transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
            <button
              onClick={onSearch}
              className="absolute right-2 top-2 bottom-2 px-5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #22c55e, #06b6d4)", color: "#0a1a0f" }}
            >
              Найти
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => onFilter(cat.key)}
                className={`filter-chip flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border ${
                  activeFilter === cat.key
                    ? "active text-[#0a1a0f]"
                    : "text-white/60 hover:text-white border-white/10 hover:border-white/25"
                }`}
                style={
                  activeFilter === cat.key
                    ? { background: "linear-gradient(135deg, #22c55e, #06b6d4)", borderColor: "transparent" }
                    : { background: "rgba(255,255,255,0.04)" }
                }
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Result */}
      {searched && (
        <section className="px-6 pb-10">
          <div className="max-w-2xl mx-auto animate-fade-in">
            {result ? (
              <div
                className="rounded-2xl p-6 glass-card glow-green"
                style={{ border: "1px solid rgba(34,197,94,0.2)" }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="text-4xl">{result.icon}</div>
                  <div>
                    <div
                      className={`text-xs font-semibold uppercase tracking-widest mb-1 bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}
                    >
                      Советы по утилизации
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{result.description}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {result.tips.map((tip, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 animate-slide-up"
                      style={{ animationDelay: `${i * 0.08}s`, opacity: 0, animationFillMode: "forwards" }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                        style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-white/80 text-sm leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div
                className="rounded-2xl p-8 glass-card text-center"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="text-4xl mb-3">🤔</div>
                <p className="text-white/60 text-sm">
                  Не нашли советов для <span className="text-white font-medium">«{query}»</span>
                  <br />
                  Попробуй одну из категорий ниже или уточни запрос
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
