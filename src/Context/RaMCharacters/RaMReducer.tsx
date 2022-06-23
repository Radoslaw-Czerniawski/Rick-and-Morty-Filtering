import { Dispatch, useEffect, useReducer } from 'react';
import { RaMCharacter } from '../../Types/RaMCharacters';
import {
    Action,
    Idle,
    Options,
    Reducer,
    Result,
    Url,
} from '../../Types/RaMReducer';
import { batchFetchRaM, spliceRandom } from './Utils/batchFetchRam';

const initialState: Idle = {
    data: undefined,
    isLoading: false,
    error: false,
};

function reducer<T extends RaMCharacter[]>(
    state: Result<T>,
    action: Action<T>
): Result<T> {
    switch (action.type) {
        case 'start-loading':
            return {
                data: undefined,
                isLoading: true,
                error: false,
            };

        case 'success-loading':
            return {
                data: action.data,
                isLoading: false,
                error: false,
            };

        case 'fail-loading':
            return {
                data: undefined,
                isLoading: false,
                error: true,
            };
        case 'change-status':
            return {
                ...state,
                data: state.data?.map((item) =>
                    item.id === action.payload.id
                        ? {
                              ...item,
                              status: action.payload.status,
                          }
                        : item
                ),
            };

        default:
            return state;
    }
}

export const useBatchFetchAndReturnReducer = (
    url: Url,
    options?: Options
): [Result<RaMCharacter[]>, Dispatch<Action<RaMCharacter[]>>] => {
    const [state, dispatch] = useReducer<Reducer<RaMCharacter[]>>(
        reducer,
        initialState
    );

    useEffect(() => {
        dispatch({ type: 'start-loading' });
        const controller = new AbortController();
        const signal = controller.signal;

        batchFetchRaM(url, [], options, signal)
            .then((data) => {
                if (data instanceof Error) {
                    throw new Error('Server response is not ok');
                }

                return data;
            })
            .then((data): RaMCharacter[] => {
                return data.map(
                    ({ episode, image, id, name, origin, species, status }) => {
                        const episodes =
                            episode.length > 2
                                ? [spliceRandom(episode), spliceRandom(episode)]
                                : episode;

                        return {
                            episodes: episodes,
                            image,
                            id,
                            name,
                            origin,
                            species,
                            status,
                        };
                    }
                );
            })
            .then((data) => dispatch({ type: 'success-loading', data }))
            .catch(() => dispatch({ type: 'fail-loading' }));

        return () => {
            controller.abort();
        };
    }, [url, options]);

    return [state, dispatch];
};
