'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export function CompareProvider({ children }) {
    const [compareList, setCompareList] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('huzi_compare_list');
        if (saved) {
            try {
                setCompareList(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse compare list", e);
            }
        }
    }, []);

    // Save to localStorage when updated
    useEffect(() => {
        localStorage.setItem('huzi_compare_list', JSON.stringify(compareList));
    }, [compareList]);

    const addToCompare = (product) => {
        setCompareList(prev => {
            if (prev.find(p => p.id === product.id)) return prev;
            if (prev.length >= 4) {
                alert("You can only compare up to 4 products at a time.");
                return prev;
            }
            return [...prev, product];
        });
    };

    const removeFromCompare = (productId) => {
        setCompareList(prev => prev.filter(p => p.id !== productId));
    };

    const isInCompare = (productId) => {
        return compareList.some(p => p.id === productId);
    };

    return (
        <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare }}>
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    return useContext(CompareContext);
}
