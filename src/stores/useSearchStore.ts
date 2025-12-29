import { useState, useCallback } from 'react';

/**
 * Store (ViewModel) for Search functionality
 */
export const useSearchStore = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const openSearch = useCallback(() => {
        setIsSearchOpen(true);
    }, []);

    const closeSearch = useCallback(() => {
        setIsSearchOpen(false);
        setSearchQuery('');
    }, []);

    const toggleSearch = useCallback(() => {
        setIsSearchOpen(prev => !prev);
    }, []);

    return {
        isSearchOpen,
        searchQuery,
        setSearchQuery,
        openSearch,
        closeSearch,
        toggleSearch,
    };
};
