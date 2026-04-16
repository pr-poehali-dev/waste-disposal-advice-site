import { useState } from "react";
import Icon from "@/components/ui/icon";

const wasteData: Record<string, { icon: string; color: string; tips: string[]; description: string }> = {
  пластик: {
    icon: "🧴",
    color: "from-blue-500 to-cyan-400",
    description: "Пластик — один из самых распространённых видов отходов. Перерабатывается в новые изделия.",
    tips: [
      "Сдайте в пункт приёма вторсырья — ищите маркировку ♻ 1–7 на дне",
      "Смойте остатки пищи перед сдачей — грязный пластик не принимают",
      "Плёнку и пакеты сдавайте отдельно от твёрдого пластика",
      "Пластик с маркировкой 3 (PVC) и 6 (PS) перерабатывается реже — уточните у пункта приёма",
    ],
  },
  стекло: {
    icon: "🍾",
    color: "from-emerald-400 to-teal-400",
    description: "Стекло перерабатывается бесконечное количество раз без потери качества.",
    tips: [
      "Сдайте в специальные контейнеры для стекла или пункты приёма",
      "Разделите по цвету: прозрачное, зелёное, коричневое — это повышает ценность сырья",
      "Промойте банки и бутылки от остатков",
      "Битое стекло упакуйте в плотную бумагу перед утилизацией",
    ],
  },
  металл: {
    icon: "🔧",
    color: "from-slate-400 to-zinc-300",
    description: "Металл — ценное вторсырьё. Алюминий перерабатывается с экономией 95% энергии.",
    tips: [
      "Алюминиевые банки сдайте в ближайший пункт приёма металлолома",
      "Консервные банки смойте и сдавите для экономии места",
      "Металлические крышки можно сдавать вместе с банками",
      "Крупный металлолом (бытовая техника) вывезут бесплатно многие пункты",
    ],
  },
  органика: {
    icon: "🍃",
    color: "from-green-500 to-lime-400",
    description: "Органические отходы превращаются в компост — ценное удобрение для растений.",
    tips: [
      "Компостируйте на даче: фрукты, овощи, яичная скорлупа, кофейная гуща",
      "Не добавляйте в компост мясо, рыбу и молочные продукты",
      "Используйте специальные компостные баки для балкона или кухни",
      "Многие города принимают пищевые отходы в биопакетах — уточните в мэрии",
    ],
  },
  бумага: {
    icon: "📄",
    color: "from-yellow-400 to-amber-300",
    description: "Из 1 тонны макулатуры получают 800 кг новой бумаги, сохраняя 10–17 деревьев.",
    tips: [
      "Сдавайте газеты, журналы, картон в пункты приёма макулатуры",
      "Уберите скобки, скрепки и скотч перед сдачей",
      "Бумага с жирными пятнами или пропитанная не перерабатывается",
      "Чеки и термобумага не являются макулатурой — выбрасывайте в обычный мусор",
    ],
  },
  электроника: {
    icon: "💻",
    color: "from-violet-500 to-purple-400",
    description: "Электроотходы содержат опасные вещества и ценные металлы — нельзя выбрасывать в обычный мусор.",
    tips: [
      "Сдайте в фирменный магазин техники — многие принимают старые устройства",
      "Батарейки и аккумуляторы — только в специальные контейнеры (есть в гипермаркетах)",
      "Крупную технику забирают бесплатно многие сервисные центры",
      "Не разбивайте экраны — ртуть в люминесцентных лампах опасна",
    ],
  },
  опасные: {
    icon: "⚗️",
    color: "from-red-500 to-orange-400",
    description: "Лаки, краски, химикаты и медикаменты требуют особой утилизации.",
    tips: [
      "Медикаменты сдайте в любую аптеку — они обязаны принять",
      "Краски и растворители — только в специальные пункты опасных отходов",
      "Батарейки никогда не выбрасывайте в обычный мусор",
      "Ртутные термометры и лампы — в пункты приёма ртутьсодержащих отходов",
    ],
  },
  текстиль: {
    icon: "👕",
    color: "from-pink-500 to-rose-400",
    description: "Одежда и ткани перерабатываются в набивку, ветошь и новые волокна.",
    tips: [
      "Ненужную одежду отдайте в секонд-хенд или благотворительные организации",
      "Поношенный текстиль сдайте в контейнеры H&M, Zara или специальные пункты",
      "Постельное бельё и полотенца принимают приюты для животных",
      "Старые вещи можно разрезать на тряпки для уборки",
    ],
  },
};

const filterCategories = [
  { key: "пластик", label: "Пластик", icon: "🧴" },
  { key: "стекло", label: "Стекло", icon: "🍾" },
  { key: "металл", label: "Металл", icon: "🔧" },
  { key: "органика", label: "Органика", icon: "🍃" },
  { key: "бумага", label: "Бумага", icon: "📄" },
  { key: "электроника", label: "Электроника", icon: "💻" },
  { key: "опасные", label: "Опасные", icon: "⚗️" },
  { key: "текстиль", label: "Текстиль", icon: "👕" },
];

export default function Index() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [result, setResult] = useState<typeof wasteData[string] | null>(null);
  const [searched, setSearched] = useState(false);

  const findWaste = (searchQuery: string) => {
    const q = searchQuery.toLowerCase().trim();
    const found = Object.entries(wasteData).find(([key]) => q.includes(key) || key.includes(q));
    if (found) {
      setResult(found[1]);
    } else {
      setResult(null);
    }
    setSearched(true);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    setActiveFilter(null);
    findWaste(query);
  };

  const handleFilter = (key: string) => {
    if (activeFilter === key) {
      setActiveFilter(null);
      setResult(null);
      setSearched(false);
      setQuery("");
      return;
    }
    setActiveFilter(key);
    setQuery(key);
    setResult(wasteData[key]);
    setSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen mesh-bg" style={{ background: "hsl(160, 20%, 6%)" }}>
      {/* Header */}
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
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setResult(null);
                    setSearched(false);
                    setActiveFilter(null);
                  }}
                  className="text-white/30 hover:text-white/60 transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
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
                onClick={() => handleFilter(cat.key)}
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

      {/* Categories Section */}
      <section className="px-6 pb-20" id="categories">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">Все категории</h2>
            <p className="text-white/40 text-sm">Нажми на карточку, чтобы узнать советы</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filterCategories.map((cat) => {
              const data = wasteData[cat.key];
              return (
                <button
                  key={cat.key}
                  onClick={() => handleFilter(cat.key)}
                  className="category-card glass-card rounded-2xl p-5 text-left group"
                  style={{
                    border:
                      activeFilter === cat.key
                        ? "1px solid rgba(34,197,94,0.4)"
                        : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <div className="font-semibold text-white text-sm mb-1 group-hover:text-green-400 transition-colors">
                    {cat.label}
                  </div>
                  <div className="text-white/40 text-xs leading-relaxed line-clamp-2">{data.description}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8 text-center">
        <p className="text-white/25 text-xs">
          ЭкоСовет — помогаем сортировать и утилизировать отходы правильно
        </p>
      </footer>
    </div>
  );
}