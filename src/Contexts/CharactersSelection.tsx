import { ReactNode, createContext, useState, useMemo, useContext } from 'react';

type InitialState = number[];
type Api = {
    selectCharacter: (id: number, isChecked: boolean) => void;
};

const StateContext = createContext<InitialState | null>(null);
const ApiContext = createContext<Api | null>(null);

interface Props {
    children: ReactNode;
}

export const CharactersSelectionProvider = ({ children }: Props) => {
    const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);

    const api = useMemo(() => {
        return {
            selectCharacter: (id: number, isChecked: boolean) => {
                setSelectedCharacters((prevState) => {
                    const items = new Set([...prevState, id]);
                    if (isChecked === false) {
                        items.delete(id);
                    }
                    return Array.from(items);
                });
            },
        };
    }, []);

    return (
        <StateContext.Provider value={selectedCharacters}>
            <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
        </StateContext.Provider>
    );
};

export const useSelectedCharacterIds = () => {
    const value = useContext(StateContext);

    if (value === null) {
        throw new Error('Missing CharacterSelectionProvider');
    }

    return value;
};

export const useCharacterSelectionApi = () => {
    const api = useContext(ApiContext);

    if (api === null) {
        throw new Error('Missing CharacterSelectionProvider');
    }

    return api;
};
