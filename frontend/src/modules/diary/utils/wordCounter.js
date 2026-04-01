/**
 * Counts the number of words in a given string.
 * @param {string} text - The input text.
 * @returns {number} The word count.
 */
export const countWords = (text) => {
    if (!text || typeof text !== 'string') return 0;
    return text.trim() ? text.trim().split(/\s+/).length : 0;
};
