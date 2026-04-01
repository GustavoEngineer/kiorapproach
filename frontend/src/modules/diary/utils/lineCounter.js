/**
 * Splits a text into an array of lines and returns the count.
 * @param {string} text - The input text.
 * @returns {string[]} An array of lines.
 */
export const getLinesArray = (text) => {
    if (typeof text !== 'string') return [''];
    return text.split('\n');
};

/**
 * Returns the line count of a text.
 * @param {string} text - The input text.
 * @returns {number} The total number of lines.
 */
export const countLines = (text) => {
    return getLinesArray(text).length;
};
