export const minimalText = (str, strLength = 30) => {
    return `${str}`.length > strLength ? `${str}`.substring(0, strLength - 3) + '...' : str;
}