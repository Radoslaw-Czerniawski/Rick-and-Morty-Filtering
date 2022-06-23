import { Dispatch, useEffect, useReducer } from 'react';
import { RaMCharacter } from '../../Types/RaMCharacters';
import { batchFetchRaM } from './Utils/batchFetchRam';

const initialState: Idle = {
    data: undefined,
    filteredData: undefined,
    isLoading: false,
    error: false,
};

function reducer<T>(state: Result<T>, action: Action<T>): Result<T> {
    if (action.type === 'start-loading') {
        return {
            data: undefined,
            filteredData: undefined,
            isLoading: true,
            error: false,
        };
    }
    if (action.type === 'success-loading') {
        return {
            data: action.data,
            filteredData: action.filteredData,
            isLoading: false,
            error: false,
        };
    }
    if (action.type === 'fail-loading') {
        return {
            data: undefined,
            filteredData: undefined,
            isLoading: false,
            error: true,
        };
    }

    if (action.type === 'filter') {
        const newFilteredData = action.filterFn(action.filteredData);

        return {
            data: action.data,
            filteredData: newFilteredData,
            isLoading: false,
            error: false,
        };
    }

    return state;
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

        batchFetchRaM(url, [], signal)
            .then((data) => {
                if (data instanceof Error) {
                    throw new Error('Server response is not ok');
                }

                console.log(data);

                return data;
            })
            .then((data) =>
                dispatch({ type: 'success-loading', data, filteredData: data })
            )
            .catch(() => dispatch({ type: 'fail-loading' }));

        return () => {
            controller.abort();
        };
    }, [url, options]);

    return [state, dispatch];
};
