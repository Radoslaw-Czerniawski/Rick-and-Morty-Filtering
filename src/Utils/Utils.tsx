export const getEpisode = async (episodeUrl: string) => {
    const response = await fetch(episodeUrl);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const getCharactersByPage = async (url: string, pageNumber: number) => {
    const response = await fetch(url + '?page=' + pageNumber);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const spliceRandom = (arr: string[]): string => {
    return arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
};
