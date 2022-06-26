import { useQuery } from 'react-query';
import { getEpisode } from '../../Utils/Utils';

export const Episode = ({ episodeUrl }: { episodeUrl: string }) => {
    const { data } = useQuery(['episodes', episodeUrl], () =>
        getEpisode(episodeUrl)
    );
    return <span>{data?.name}</span>;
};
