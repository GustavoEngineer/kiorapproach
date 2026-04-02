import React, { createContext, useState, useCallback } from 'react';
import diaryService from '../services/diaryService';

export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [numPagina, setNumPagina] = useState(1);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState('READY');
    
    // Drafts cache: { "YYYY-MM-DD": { title, content, id } }
    const [drafts, setDrafts] = useState({});

    // Helper to get consistent local date string YYYY-MM-DD
    const getLocalDateStr = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    };

    const loadEntry = useCallback(async (selectedDate) => {
        const dateStr = getLocalDateStr(selectedDate);
        
        // 1. Check if we have an unsaved draft for this date already in memory
        if (drafts[dateStr]) {
            const draft = drafts[dateStr];
            setId(draft.id);
            setTitle(draft.title);
            setContent(draft.content);
            setNumPagina(draft.numPagina || 1);
            setStatus('READY');
            return;
        }

        setLoading(true);
        setStatus('LOADING');
        try {
            const response = await diaryService.getEntries();
            const entries = response.data || [];
            
            const allPossibleDates = [...entries.map(e => new Date(e.fecha)), selectedDate];
            const earliestDate = new Date(Math.min(...allPossibleDates));
            const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
            const start = startOfDay(earliestDate);
            const target = startOfDay(selectedDate);
            const diffInDays = Math.floor((target.getTime() - start.getTime()) / (1000 * 3600 * 24));
            const dynamicPage = diffInDays + 1;
            
            const entry = entries.find(e => getLocalDateStr(e.fecha) === dateStr);
            
            if (entry) {
                setId(entry._id);
                setTitle(entry.titulo || '');
                setContent(entry.contenido || '');
                setNumPagina(dynamicPage);
                setStatus('LOADED');
            } else {
                setId(null);
                setTitle('');
                setContent('');
                setNumPagina(dynamicPage);
                setStatus('READY');
            }
        } catch (error) {
            console.error('DIARY_LOAD_ERROR:', error);
            setStatus('ERROR');
        } finally {
            setLoading(false);
        }
    }, [drafts]);

    const updateDraft = useCallback((date, field, value) => {
        const dateStr = getLocalDateStr(date);
        // Map field to local state first
        if (field === 'title') setTitle(value);
        if (field === 'content') setContent(value);

        // Update drafts cache to preserve unsaved changes
        setDrafts(prev => ({
            ...prev,
            [dateStr]: {
                ...prev[dateStr],
                [field]: value,
                id: (field === 'id') ? value : (prev[dateStr]?.id || id),
                numPagina: (field === 'numPagina') ? value : (prev[dateStr]?.numPagina || numPagina)
            }
        }));
    }, [id, numPagina]);

    const saveRecord = async (selectedDate, metrics = {}) => {
        if (saving) return;
        setSaving(true);
        setStatus('SAVING');
        
        const dateStr = getLocalDateStr(selectedDate);
        const data = {
            titulo: title || `LOG_${dateStr}`,
            contenido: content,
            fecha: selectedDate,
            numPagina: numPagina,
            metadatos: {
                lineas: metrics.lineas || 0,
                palabras: metrics.palabras || 0
            }
        };

        try {
            let result;
            if (id) {
                result = await diaryService.updateEntry(id, data);
            } else {
                result = await diaryService.createEntry(data);
                if (result.success) setId(result.data._id);
            }

            if (result.success) {
                setStatus('SAVED');
                // Clear draft for this date as it is now saved
                setDrafts(prev => {
                    const newDrafts = { ...prev };
                    delete newDrafts[dateStr];
                    return newDrafts;
                });
                setTimeout(() => setStatus('READY'), 3000);
            }
        } catch (error) {
            console.error('DIARY_SAVE_ERROR:', error);
            setStatus('ERROR');
        } finally {
            setSaving(false);
        }
    };

    return (
        <DiaryContext.Provider value={{
            id, setId,
            title, setTitle: (val) => updateDraft(new Date(), 'title', val),
            content, setContent: (val) => updateDraft(new Date(), 'content', val),
            numPagina, setNumPagina,
            loading, saving, status, setStatus,
            loadEntry, saveRecord,
            updateDraft // Expose updateDraft for more explicit control if needed
        }}>
            {children}
        </DiaryContext.Provider>
    );
};
