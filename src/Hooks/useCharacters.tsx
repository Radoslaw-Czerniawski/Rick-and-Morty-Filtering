import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { RaMResponse } from '../Types/RaMCharacters';
import { getCharactersByPage, spliceRandom } from '../Utils/Utils';
import { debounce } from 'lodash';
const url = 'https://rickandmortyapi.com/api/character';

export const pageSize = 5;
const API_RESPONSE_SIZE = 20;

export type SpeciesOption = '' | '&species=human' | '&species=alien';
export type StatusOption =
    | ''
    | '&status=alive'
    | '&status=dead'
    | '&status=unknown';

export type Filters = SpeciesOption | StatusOption;

export const useCharacters = (pageNumber: number) => {
    const [filters, setFilters] = useState<Filters[]>([]);
    const [search, setSearch] = useState<string>('');

    const filtersApi = useMemo(() => {
        return {
            setSpecies: (specie: SpeciesOption) => {
                setFilters((prevState) => {
                    return prevState
                        .filter((item) => !item.startsWith('&species'))
                        .concat(specie);
                });
            },
            setStatus: (status: StatusOption) => {
                setFilters((prevState) => {
                    return prevState
                        .filter((item) => !item.startsWith('&status'))
                        .concat(status);
                });
            },
            setSearch: debounce((search: string) => {
                setSearch('&name=' + search);
            }, 300),
        };
    }, []);

    const apiPageNumber = useMemo(
        () =>
            `?page=${
                Math.floor((pageNumber * pageSize) / API_RESPONSE_SIZE) + 1
            }`,
        [pageNumber]
    );
    const queryParams = useMemo(
        () =>
            apiPageNumber +
            filters.reduce((acc, next) => (acc + next) as Filters, '') +
            search,
        [filters, apiPageNumber, search]
    );
    const { data, isLoading } = useQuery(
        ['characters', queryParams],
        () => getCharactersByPage(url, queryParams),
        {
            select: (data: RaMResponse): RaMResponse => data,
        }
    );

    const transformedCharacters = useMemo(() => {
        return data?.results?.map(
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
        () => (pageSize * pageNumber) % API_RESPONSE_SIZE,
        [pageNumber]
    );

    const characters = useMemo(() => {
        return transformedCharacters?.slice(startIndex, startIndex + pageSize);
    }, [transformedCharacters, startIndex]);

    const info = data?.info;

    return { characters, isLoading, info, filtersApi };
};

export type FiltersApi = ReturnType<typeof useCharacters>['filtersApi'];
