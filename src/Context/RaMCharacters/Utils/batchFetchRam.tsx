import { RaMCharacterFromApi, RaMResponse } from '../../../Types/RaMCharacters';
import { Options, Url } from '../../../Types/RaMReducer';

export const batchFetchRaM = async (
    url: Url,
    charactersArr: RaMCharacterFromApi[] | undefined = [],
    options: Options,
    signal: AbortSignal
): Promise<RaMCharacterFromApi[] | Error> => {
    try {
        const req = await fetch(url, { ...options, signal });
        const resp: RaMResponse = await req.json();

        const newCharacters = [...charactersArr, ...resp.results];

        if (resp.info.next) {
            return batchFetchRaM(
                resp.info.next,
                newCharacters,
                options,
                signal
            );
        }

        return newCharacters;
    } catch (err) {
        throw new Error();
    }
};

export const spliceRandom = <T = unknown,>(arr: T[]) => {
    return arr.splice(Math.floor(Math.random() * arr.length))[0];
};
