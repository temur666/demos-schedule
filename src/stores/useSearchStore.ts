import { create } from 'zustand';

interface SearchState {
    isSearchOpen: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    openSearch: () => void;
    closeSearch: () => void;
    toggleSearch: () => void;
}

/**
 * Global Store for Search functionality using Zustand
 */
export const useSearchStore = create<SearchState>((set) => ({
    isSearchOpen: false,
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
    openSearch: () => set({ isSearchOpen: true }),
    closeSearch: () => set({ isSearchOpen: false, searchQuery: '' }),
    toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
}));
