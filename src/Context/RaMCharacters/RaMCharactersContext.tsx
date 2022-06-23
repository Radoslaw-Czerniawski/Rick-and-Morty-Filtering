import { createContext, ReactNode, useContext } from 'react';
import { ContextValue } from '../../Types/RaMCharactersContext';
import { useBatchFetchAndReturnReducer } from './RaMReducer';

const Context = createContext<ContextValue | null>(null);

interface Props {
    children: ReactNode;
}

export const RaMCharactersProvider = ({ children }: Props) => {
    const value = useBatchFetchAndReturnReducer(
        'https://rickandmortyapi.com/api/character'
    );

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useRaMCharacters = () => {
    const value = useContext(Context);

    if (value === null) {
        throw new Error('Missing RaMCharactersProvider');
    }

    return value;
};
