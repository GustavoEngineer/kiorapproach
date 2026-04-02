const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/diario';

/**
 * Service to handle tactical diary synchronization with MongoDB
 */
const diaryService = {
    /**
     * Fetch all entries or a specific one by date
     * @param {string} date - ISO String or Date
     */
    getEntries: async () => {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('ERR::FETCH_FAILED');
        return response.json();
    },

    /**
     * Create a new tactical log record
     * @param {Object} data - Diario Model
     */
    createEntry: async (data) => {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('ERR::SAVE_FAILED');
        return response.json();
    },

    /**
     * Update an existing tactical log record
     * @param {string} id - Database ID
     * @param {Object} data - Updated Data
     */
    updateEntry: async (id, data) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('ERR::UPDATE_FAILED');
        return response.json();
    }
};

export default diaryService;
