export function useUtils(){
    function setImageSize(imageUrl, size) {
        const questionMarkIndex = imageUrl.indexOf('?');
        if (questionMarkIndex === -1) {
            // If no query string, just append the new parameter
            return `${imageUrl}?w=${size}`;
        } else {
            // Replace or append the 'w' parameter
            const baseUrl = imageUrl.slice(0, questionMarkIndex);
            const queryParams = new URLSearchParams(imageUrl.slice(questionMarkIndex + 1));
            queryParams.set('w', size); // Sets 'w' parameter, replacing existing or adding new
            return `${baseUrl}?${queryParams}`;
        }
    }

    function setImageSizeV2(imageUrl, size) {
        // Check if the URL already has query parameters
        const hasQuery = imageUrl.includes('?');

        if (hasQuery) {
            // Remove existing width (w) parameter if it exists
            const urlWithoutW = imageUrl.replace(/(\?|&)w=\d*(&|$)/, '$1').replace(/&$/, '');
            // Append the new width parameter
            return `${urlWithoutW}&w=${size}`;
        } else {
            // No query parameters, just append
            return `${imageUrl}?w=${size}`;
        }
    }

    return{
        setImageSize,
        setImageSizeV2
    }
}