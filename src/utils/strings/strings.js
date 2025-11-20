export const minimalText = (str, strLength = 30) => {
    return `${str}`.length > strLength ? `${str}`.substring(0, strLength - 3) + '...' : str;
}
export const capitalizeWord = (word = '') => (word.charAt(0).toUpperCase() + word.substring(1).toLowerCase());
export const capitalizeString = (str = '') => {
    return str.split(' ').map(capitalizeWord).join(' ');
}