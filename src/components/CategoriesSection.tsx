import { wasteData, filterCategories } from "@/data/wasteData";

type Props = {
  activeFilter: string | null;
  onFilter: (key: string) => void;
};

export default function CategoriesSection({ activeFilter, onFilter }: Props) {
  return (
    <>
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
                  onClick={() => onFilter(cat.key)}
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
    </>
  );
}
