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
  резина: {
    icon: "🛞",
    color: "from-gray-500 to-stone-400",
    description: "Использованные шины — ценное сырьё для резиновой крошки, покрытий и топлива.",
    tips: [
      "Сдайте старые шины в шиномонтаж — большинство принимают бесплатно при замене",
      "Крупные пункты приёма резины есть при автосервисах и заводах",
      "Никогда не сжигайте шины — выделяют токсичные вещества",
      "Из шин делают детские площадки, покрытия для спортзалов и дорожки",
    ],
  },
  дерево: {
    icon: "🪵",
    color: "from-amber-700 to-yellow-600",
    description: "Деревянные отходы перерабатываются в щепу, опилки, брикеты и новые материалы.",
    tips: [
      "Чистые деревянные доски и поддоны можно отдать бесплатно через Авито или Юлу",
      "Ветки и спилы деревьев принимают в садовых центрах для компостирования",
      "Крашеное и лакированное дерево не перерабатывается — выбрасывайте в крупногабаритный мусор",
      "Опилки и стружку используйте как мульчу для растений или подстилку для животных",
    ],
  },
  строительный: {
    icon: "🧱",
    color: "from-orange-500 to-red-400",
    description: "Строительный мусор (бетон, кирпич, плитка) нельзя смешивать с обычными отходами.",
    tips: [
      "Закажите специальный контейнер для строительного мусора — это обязательно",
      "Кирпич и бетон принимают заводы по переработке стройотходов",
      "Гипсокартон сдайте отдельно — он перерабатывается в новые плиты",
      "Металлические конструкции из ремонта сдайте в металлолом",
    ],
  },
  масло: {
    icon: "🛢️",
    color: "from-yellow-700 to-amber-600",
    description: "Отработанное моторное масло — опасный отход, который нельзя сливать в канализацию.",
    tips: [
      "Сдайте в автосервис или специализированный пункт приёма масел",
      "Никогда не выливайте масло в землю или канализацию — штраф до 50 000 ₽",
      "Храните отработку в герметичной ёмкости до сдачи",
      "Некоторые АЗС принимают отработанное масло бесплатно",
    ],
  },
  батарейки: {
    icon: "🔋",
    color: "from-green-600 to-teal-500",
    description: "Одна батарейка загрязняет 20 м² почвы — обязательно сдавайте на переработку.",
    tips: [
      "Контейнеры для батареек есть в IKEA, Leroy Merlin, Ашан, Магните и других магазинах",
      "Собирайте батарейки дома в коробку и сдавайте раз в месяц",
      "Аккумуляторы от телефонов и ноутбуков сдайте в сервисный центр",
      "Солевые и щелочные батарейки принимают в одном контейнере",
    ],
  },
  лампочки: {
    icon: "💡",
    color: "from-yellow-300 to-lime-300",
    description: "Энергосберегающие и люминесцентные лампы содержат ртуть и требуют особой утилизации.",
    tips: [
      "Люминесцентные и ртутные лампы сдайте в ДЕЗ, ЖЭК или пункт приёма ртутьсодержащих отходов",
      "Обычные лампы накаливания можно выбросить в обычный мусор",
      "LED-лампы сдайте в специализированные пункты или магазины электроники",
      "Разбитую ртутную лампу — вызовите МЧС или специализированную службу",
    ],
  },
  пищевые: {
    icon: "🍱",
    color: "from-lime-500 to-green-400",
    description: "Пищевые отходы составляют до 30% от всего мусора в России.",
    tips: [
      "Компостируйте: очистки овощей, фруктов, кофейная гуща, чайная заварка",
      "Просроченные продукты в упаковке — сначала освободите от упаковки и утилизируйте раздельно",
      "Жидкие остатки супов и напитков можно слить в канализацию",
      "Кости и мясные отходы не компостируются — в обычный мусор",
    ],
  },
  мебель: {
    icon: "🪑",
    color: "from-brown-500 to-amber-800",
    description: "Старая мебель — крупногабаритный отход, который нельзя выбрасывать у подъезда.",
    tips: [
      "Исправную мебель отдайте бесплатно через Авито, Юлу или группы в соцсетях",
      "Закажите вывоз крупногабаритного мусора через управляющую компанию или городской сервис",
      "Деревянную мебель можно разобрать и сдать как дерево или металлолом",
      "ИКЕА принимает свою мебель обратно по программе обмена",
    ],
  },
  упаковка: {
    icon: "📦",
    color: "from-cyan-500 to-sky-400",
    description: "Картонные коробки, пузырчатая плёнка и пенопласт — каждый вид утилизируется по-своему.",
    tips: [
      "Картонные коробки сложите и сдайте в макулатуру или оставьте у мусорных баков",
      "Пузырчатую плёнку и стрейч сдайте в пункты приёма плёнки (часть гипермаркетов)",
      "Пенопласт принимают специализированные пункты — ищите в интернете",
      "Многоразовые коробки предложите соседям — они всегда нужны при переезде",
    ],
  },
};

const synonyms: Record<string, string> = {
  // пластик
  "бутылка": "пластик", "флакон": "пластик", "канистра": "пластик", "пакет": "пластик",
  "полиэтилен": "пластик", "контейнер": "пластик", "ведро": "пластик", "тазик": "пластик",
  "трубка": "пластик", "пвх": "пластик", "полипропилен": "пластик", "стакан одноразовый": "пластик",
  "одноразовая посуда": "пластик", "пластиковый": "пластик",
  // стекло
  "бутылка стеклянная": "стекло", "стеклянная бутылка": "стекло", "банка": "стекло",
  "стеклянная банка": "стекло", "зеркало": "стекло", "оконное стекло": "стекло",
  "рюмка": "стекло", "бокал": "стекло", "стакан": "стекло", "вазон": "стекло",
  "графин": "стекло", "стеклянный": "стекло",
  // металл
  "банка алюминиевая": "металл", "алюминиевая банка": "металл", "консервная банка": "металл",
  "консервы": "металл", "жесть": "металл", "алюминий": "металл", "медь": "металл",
  "железо": "металл", "сталь": "металл", "проволока": "металл", "крышка": "металл",
  "фольга": "металл", "гвоздь": "металл", "болт": "металл", "металлический": "металл",
  // бумага
  "газета": "бумага", "журнал": "бумага", "книга": "бумага", "картон": "бумага",
  "коробка": "упаковка", "макулатура": "бумага", "тетрадь": "бумага", "лист": "бумага",
  "чек": "бумага", "упаковочная бумага": "бумага", "бумажный пакет": "бумага",
  // органика
  "очистки": "органика", "кожура": "органика", "овощи": "органика", "фрукты": "органика",
  "еда": "пищевые", "остатки еды": "пищевые", "кофейная гуща": "органика",
  "чайная заварка": "органика", "яичная скорлупа": "органика", "листья": "органика",
  "трава": "органика", "ветки": "дерево", "скорлупа": "органика",
  // электроника
  "телефон": "электроника", "смартфон": "электроника", "ноутбук": "электроника",
  "компьютер": "электроника", "планшет": "электроника", "телевизор": "электроника",
  "холодильник": "электроника", "стиральная машина": "электроника", "утюг": "электроника",
  "провода": "электроника", "кабель": "электроника", "зарядка": "электроника",
  "наушники": "электроника", "мышка": "электроника", "клавиатура": "электроника",
  // опасные
  "краска": "опасные", "растворитель": "опасные", "лак": "опасные", "клей": "опасные",
  "кислота": "опасные", "химия": "опасные", "лекарства": "опасные", "таблетки": "опасные",
  "термометр": "опасные", "ртуть": "опасные", "пестициды": "опасные", "удобрение": "опасные",
  // текстиль
  "одежда": "текстиль", "футболка": "текстиль", "штаны": "текстиль", "джинсы": "текстиль",
  "куртка": "текстиль", "обувь": "текстиль", "носки": "текстиль", "нижнее бельё": "текстиль",
  "постельное бельё": "текстиль", "полотенце": "текстиль", "ткань": "текстиль",
  // батарейки
  "батарейка": "батарейки", "аккумулятор": "батарейки", "крона": "батарейки",
  "пальчиковая": "батарейки", "мизинчиковая": "батарейки",
  // лампочки
  "лампа": "лампочки", "лампочка": "лампочки", "светодиодная": "лампочки",
  "люминесцентная": "лампочки", "энергосберегающая": "лампочки", "led": "лампочки",
  // резина
  "шина": "резина", "покрышка": "резина", "колесо": "резина", "резиновые сапоги": "резина",
  "перчатки резиновые": "резина", "коврик резиновый": "резина",
  // масло
  "моторное масло": "масло", "отработанное масло": "масло", "автомасло": "масло",
  "трансмиссионное": "масло", "машинное масло": "масло",
  // дерево
  "доска": "дерево", "поддон": "дерево", "паллет": "дерево", "опилки": "дерево",
  "фанера": "дерево", "бревно": "дерево", "щепа": "дерево", "деревянный": "дерево",
  // строительный
  "кирпич": "строительный", "бетон": "строительный", "плитка": "строительный",
  "гипсокартон": "строительный", "штукатурка": "строительный", "черепица": "строительный",
  "стройматериалы": "строительный", "обломки": "строительный", "щебень": "строительный",
  // мебель
  "диван": "мебель", "стол": "мебель", "стул": "мебель", "шкаф": "мебель",
  "кровать": "мебель", "полка": "мебель", "тумба": "мебель", "кресло": "мебель",
  // упаковка
  "пузырчатая плёнка": "упаковка", "стрейч": "упаковка", "пенопласт": "упаковка",
  "упаковочная коробка": "упаковка", "пенополистирол": "упаковка",
  // пищевые
  "хлеб": "пищевые", "мясо": "пищевые", "рыба": "пищевые", "молоко": "пищевые",
  "суп": "пищевые", "просроченное": "пищевые", "объедки": "пищевые", "остатки": "пищевые",
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
  { key: "батарейки", label: "Батарейки", icon: "🔋" },
  { key: "лампочки", label: "Лампочки", icon: "💡" },
  { key: "резина", label: "Резина", icon: "🛞" },
  { key: "масло", label: "Масло", icon: "🛢️" },
  { key: "дерево", label: "Дерево", icon: "🪵" },
  { key: "строительный", label: "Строительный", icon: "🧱" },
  { key: "мебель", label: "Мебель", icon: "🪑" },
  { key: "упаковка", label: "Упаковка", icon: "📦" },
  { key: "пищевые", label: "Пищевые", icon: "🍱" },
];

export default function Index() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [result, setResult] = useState<typeof wasteData[string] | null>(null);
  const [searched, setSearched] = useState(false);

  const findWaste = (searchQuery: string) => {
    const q = searchQuery.toLowerCase().trim();

    // 1. Прямое совпадение с категорией
    const direct = Object.entries(wasteData).find(([key]) => q.includes(key) || key.includes(q));
    if (direct) {
      setResult(direct[1]);
      setActiveFilter(direct[0]);
      setSearched(true);
      return;
    }

    // 2. Поиск по синонимам — от длинных к коротким (чтобы "стеклянная бутылка" > "бутылка")
    const sortedSynonyms = Object.entries(synonyms).sort((a, b) => b[0].length - a[0].length);
    const synonym = sortedSynonyms.find(([word]) => q.includes(word));
    if (synonym) {
      const category = synonym[1];
      setResult(wasteData[category]);
      setActiveFilter(category);
      setSearched(true);
      return;
    }

    setResult(null);
    setActiveFilter(null);
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