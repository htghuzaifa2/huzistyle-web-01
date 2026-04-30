'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const getInitialTheme = () => {
        if (typeof window === 'undefined') return 'light';

        // Check if user has a saved preference
        const savedTheme = localStorage.getItem('huzi-theme');

        if (savedTheme) {
            return savedTheme;
        }

        // First visit: default to light mode (no system detection)
        return 'light';
    };

    const [themeMode, setThemeMode] = useState(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;

        if (themeMode === 'system') {
            // If user explicitly chooses 'system', detect current system preference
            const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.setAttribute('data-theme', isDark ? 'dark' : 'light');
        } else {
            root.setAttribute('data-theme', themeMode);
        }

        // Save user's theme preference
        localStorage.setItem('huzi-theme', themeMode);
    }, [themeMode]);

    // Listen for system theme changes when user has 'system' selected
    useEffect(() => {
        if (themeMode !== 'system') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            const root = document.documentElement;
            root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [themeMode]);

    const setTheme = (newTheme) => {
        setThemeMode(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ themeMode, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
