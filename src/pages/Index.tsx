import { useState } from "react";
import { wasteData, synonyms, WasteCategory } from "@/data/wasteData";
import AppHeader from "@/components/AppHeader";
import SearchSection from "@/components/SearchSection";
import CategoriesSection from "@/components/CategoriesSection";

export default function Index() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [result, setResult] = useState<WasteCategory | null>(null);
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

  const handleClear = () => {
    setQuery("");
    setResult(null);
    setSearched(false);
    setActiveFilter(null);
  };

  return (
    <div className="min-h-screen mesh-bg" style={{ background: "hsl(160, 20%, 6%)" }}>
      <AppHeader />
      <SearchSection
        query={query}
        activeFilter={activeFilter}
        result={result}
        searched={searched}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        onClear={handleClear}
        onFilter={handleFilter}
        onKeyDown={handleKeyDown}
      />
      <CategoriesSection activeFilter={activeFilter} onFilter={handleFilter} />
    </div>
  );
}
