import { useEffect, useContext } from 'react';
import { DiaryContext } from '../context/DiaryContext';

/**
 * Hook to manage tactical diary entry state and persistence via global Context
 * @param {Date} selectedDate 
 */
export const useDiary = (selectedDate) => {
    const context = useContext(DiaryContext);

    if (!context) {
        throw new Error('useDiary must be used within a DiaryProvider');
    }

    const {
        id, setTitle,
        title, setContent,
        content, numPagina,
        loading, saving,
        status, loadEntry,
        saveRecord, updateDraft
    } = context;

    // Trigger load only when date physically changes
    useEffect(() => {
        if (selectedDate) {
            loadEntry(selectedDate);
        }
    }, [selectedDate]); // Se elimina loadEntry de dependencias para evitar ciclos innecesarios

    // Adaptive setters that update both local context and the draft cache
    const wrappedSetTitle = (val) => updateDraft(selectedDate, 'title', val);
    const wrappedSetContent = (val) => updateDraft(selectedDate, 'content', val);

    return {
        id,
        title,
        setTitle: wrappedSetTitle,
        content,
        setContent: wrappedSetContent,
        numPagina,
        loading,
        saving,
        status,
        saveRecord: (metrics) => saveRecord(selectedDate, metrics)
    };
};
