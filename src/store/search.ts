import { create } from "zustand";

interface SearchStore {
  query: string;
  isOpen: boolean;
  recentSearches: string[];

  setQuery: (query: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  query: "",
  isOpen: false,
  recentSearches: [],

  setQuery: (query) => set({ query }),
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: "" }),

  addRecentSearch: (query) => {
    if (!query.trim()) return;
    const current = get().recentSearches;
    const filtered = current.filter((s) => s !== query);
    set({ recentSearches: [query, ...filtered].slice(0, 8) });
  },

  clearRecentSearches: () => set({ recentSearches: [] }),
}));
