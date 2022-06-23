import { createContext, ReactNode, useContext } from 'react';
import { ContextValue } from '../../Types/RaMCharactersContext';
import { useBatchFetchAndReturnReducer } from './RaMReducer';

const RaMCharactersContext = createContext<ContextValue | null>(null);

interface Props {
    children: ReactNode;
}

export const RaMCharactersProvider = ({ children }: Props) => {
    const value = useBatchFetchAndReturnReducer({
        url: 'https://rickandmortyapi.com/api/character',
    });

    return (
        <RaMCharactersContext.Provider value={value}>
            {children}
        </RaMCharactersContext.Provider>
    );
};

export const useRaMCharacters = () => {
    const value = useContext(RaMCharactersContext);

    if (value === null) {
        throw new Error('Missing RaMCharactersProvider');
    }

    return value;
};
