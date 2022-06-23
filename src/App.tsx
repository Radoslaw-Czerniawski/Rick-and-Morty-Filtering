import { useMemo, useState } from 'react';
import './App.css';

import './App.css';
import { useRaMCharacters } from './Context/RaMCharacters/RaMCharactersContext';
import { RaMCharacter } from './Types/RaMCharacters';

// const filterer = (arr: RaMCharacter[]) => {
//     const filteredArr = arr.filter((el) => el.species === 'Human');
//     return filteredArr;
// };

const predicates = {
    isAlive: (character: RaMCharacter) => character.status === 'Alive',
};

const pageSize = 5;

export const App = () => {
    const [filters] = useState<(keyof typeof predicates)[]>(['isAlive']);
    const [pageIndex /* setPageIndex */] = useState(0);
    const [{ data }, dispatch] = useRaMCharacters();

    dispatch({ type: 'change-status', payload: { id: 1, status: 'Dead' } });
    const startIndex = useMemo(() => pageSize * pageIndex, [pageIndex]);

    const characters = useMemo(() => {
        return data
            ?.filter((item) =>
                filters.every((filterName) => predicates[filterName](item))
            )
            .slice(startIndex, startIndex + pageSize);
    }, [data, filters]);

    const [characterUpdates, setCharacterUpdates] = useState<
        Partial<RaMCharacter>[]
    >([]);

    const updateCharacter = (id: number, status: RaMCharacter['status']) => {
        setCharacterUpdates((updates) => updates.map);
    };

    // const handleClick = () => {
    //     // if (!data || !filteredData) {
    //     //     return;
    //     // }
    //     // dispatch({
    //     //     type: 'filter',
    //     //     filterFn: filterer,
    //     //     data,
    //     //     filteredData,
    //     // });
    // };

    console.log(characters);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Avatar</th>
                        <th>Origin</th>
                        <th>Episodes</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {characters?.map((el) => {
                        return (
                            <tr key={el.id}>
                                <td>{el.name}</td>
                                <td>
                                    <img
                                        src={el.image}
                                        alt={'Avatar of ' + el.name}
                                    />
                                </td>
                                <td>{el.origin.name}</td>
                                <td>
                                    {el.episodes.slice(0, 2).map((episode) => (
                                        <span key={episode}>{episode}</span>
                                    ))}
                                </td>
                                <td>{el.status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
