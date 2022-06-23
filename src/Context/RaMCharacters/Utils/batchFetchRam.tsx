import { RaMCharacter, RaMResponse } from '../../../Types/RaMCharacters';

export const batchFetchRaM = async (
    url: Url,
    charactersArr: RaMCharacter[] | undefined = undefined,
    signal: AbortSignal
): Promise<RaMCharacter[] | Error> => {
    try {
        const req = await fetch(url, { signal });
        const resp: RaMResponse = await req.json();

        const newCharacters = charactersArr
            ? [...charactersArr, ...resp.results]
            : [...resp.results];

        if (resp.info.next) {
            return batchFetchRaM(resp.info.next, newCharacters, signal);
        }

        return newCharacters;
    } catch (err) {
        throw new Error();
    }
};
