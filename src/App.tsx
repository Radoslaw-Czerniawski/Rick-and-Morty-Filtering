import { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import './App.css';
import { Episode } from './Components/Episode/Episode';
import {
    RaMCharacter,
    RaMCharacterFromApi,
    RaMResponse,
} from './Types/RaMCharacters';
import { getCharactersByPage, spliceRandom } from './Utils/Utils';

const predicates = {
    isAlive: (character: RaMCharacter) => character.status === 'Alive',
};

const pageSize = 5;

const url = 'https://rickandmortyapi.com/api/character';

const API_RESPONSE_SIZE = 20;

export const App = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);
    // TODO: reset filters
    const [filters] = useState<(keyof typeof predicates)[]>([]);

    const apiPageNumber = useMemo(
        () => Math.floor(((pageNumber - 1) * pageSize) / API_RESPONSE_SIZE) + 1,
        [pageNumber]
    );

    const { data } = useQuery(
        ['characters', apiPageNumber],
        () => getCharactersByPage(url, apiPageNumber),
        {
            select(data: RaMResponse): RaMCharacterFromApi[] {
                return data.results;
            },
        }
    );

    const transformedCharacters = useMemo(() => {
        return data?.map(
            ({ episode, image, id, name, origin, species, status }) => {
                const episodesFromApi = [...episode];

                const episodes =
                    episode.length > 2
                        ? [
                              spliceRandom(episodesFromApi),
                              spliceRandom(episodesFromApi),
                          ]
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
    }, [data]);

    const startIndex = useMemo(
        () => (pageSize * (pageNumber - 1)) % API_RESPONSE_SIZE,
        [pageNumber]
    );

    //TODO: make pagination based on API page and UI page
    const characters = useMemo(() => {
        return transformedCharacters
            ?.filter((item) =>
                filters.every((filterName) => predicates[filterName](item))
            )
            .slice(startIndex, startIndex + pageSize);
    }, [filters, data, pageNumber]);

    const selectCharacter = useCallback((id: number, isChecked: boolean) => {
        setSelectedCharacters((prevState) => {
            const items = new Set([...prevState, id]);
            if (isChecked === false) {
                items.delete(id);
            }
            return Array.from(items);
        });
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                // onChange={handleCheckboxChange}
                            />
                        </th>
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
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={(event) =>
                                            selectCharacter(
                                                el.id,
                                                event.target.checked
                                            )
                                        }
                                        checked={selectedCharacters.includes(
                                            el.id
                                        )}
                                    />
                                </td>
                                <td>{el.name}</td>
                                <td>
                                    <img
                                        src={el.image}
                                        alt={'Avatar of ' + el.name}
                                        width={50}
                                    />
                                </td>
                                <td>{el.origin.name}</td>
                                <td>
                                    {el.episodes.map((episode) => (
                                        <Episode
                                            key={episode}
                                            episodeUrl={episode}
                                        />
                                    ))}
                                </td>
                                <td>{el.status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={() => setPageNumber((x) => x - 1)}>{'<'}</button>
            <span>{pageNumber}</span>
            <button onClick={() => setPageNumber((x) => x + 1)}>{'>'}</button>
        </div>
    );
};
