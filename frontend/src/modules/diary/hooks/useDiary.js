import { useState, useEffect, useCallback } from 'react';
import diaryService from '../services/diaryService';

/**
 * Hook to manage tactical diary entry state and persistence
 * @param {Date} selectedDate 
 */
export const useDiary = (selectedDate) => {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [numPagina, setNumPagina] = useState(1);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState('READY'); // READY, SAVING, SAVED, ERROR

    // Helper to get consistent local date string YYYY-MM-DD
    const getLocalDateStr = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    };

    const dateStr = getLocalDateStr(selectedDate);

    // Fetch entries and find the one for the selected date
    const loadEntry = useCallback(async () => {
        setLoading(true);
        setStatus('LOADING');
        try {
            const result = await diaryService.getEntries();
            const entries = result.data || [];
            
            // Buscar el registro que coincida con la fecha localmente
            const entry = entries.find(e => getLocalDateStr(e.fecha) === dateStr);
            
            if (entry) {
                setId(entry._id);
                setTitle(entry.titulo || '');
                setContent(entry.contenido || '');
                setNumPagina(entry.numPagina || 1);
                setStatus('LOADED');
            } else {
                // Reset for new entry
                setId(null);
                setTitle('');
                setContent('');
                setNumPagina(entries.length + 1); // Sugerencia de página
                setStatus('READY');
            }
        } catch (error) {
            console.error('DIARY_LOAD_ERROR:', error);
            setStatus('ERROR');
        } finally {
            setLoading(false);
        }
    }, [dateStr]);

    useEffect(() => {
        loadEntry();
    }, [loadEntry]);

    /**
     * Save or Update the current tactical record
     */
    const saveRecord = async (metrics = {}) => {
        if (saving) return;
        
        setSaving(true);
        setStatus('SAVING');
        
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
            if (id) {
                const result = await diaryService.updateEntry(id, data);
                if (result.success) setStatus('SAVED');
            } else {
                const result = await diaryService.createEntry(data);
                if (result.success) {
                    setId(result.data._id);
                    setStatus('SAVED');
                }
            }
            
            // Reset status after 3 seconds
            setTimeout(() => setStatus('READY'), 3000);
        } catch (error) {
            console.error('DIARY_SAVE_ERROR:', error);
            setStatus('ERROR');
        } finally {
            setSaving(false);
        }
    };

    return {
        id,
        title,
        setTitle,
        content,
        setContent,
        numPagina,
        setNumPagina,
        loading,
        saving,
        status,
        saveRecord
    };
};
