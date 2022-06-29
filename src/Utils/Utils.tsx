export const getEpisode = async (episodeUrl: string) => {
    const response = await fetch(episodeUrl);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const getCharactersByPage = async (url: string, queryParams: string) => {
    const response = await fetch(url + queryParams);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const spliceRandom = (arr: string[]): string => {
    return arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
};
