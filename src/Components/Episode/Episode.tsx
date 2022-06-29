import { useQuery } from 'react-query';
import { getEpisode } from '../../Utils/Utils';
import TextTruncate from 'react-text-truncate';
import styled from 'styled-components';
import { theme } from '../../Colors';
import { RaMStatus } from '../../Types/RaMCharacters';

export const Episode = ({
    episodeUrl,
    status,
}: {
    episodeUrl: string;
    status: RaMStatus;
}) => {
    const { data } = useQuery(['episodes', episodeUrl], () =>
        getEpisode(episodeUrl)
    );

    // const element = useMemo(
    //     () => (status === 'Alive' ? StyledName : StyledDeadName),
    //     [status]
    // );

    const text = (
        <TextTruncate
            line={1}
            truncateText="…"
            text={data?.name}
        ></TextTruncate>
    );

    return (
        data &&
        (status === 'Alive' ? (
            <StyledName>{text}</StyledName>
        ) : (
            <StyledDeadName>{text}</StyledDeadName>
        ))
    );
};

const StyledName = styled.span`
    font-weight: 400;
    color: ${theme.textPrimary};
`;

const StyledDeadName = styled.span`
    font-weight: 400;
    color: ${theme.deadEpisodeText};
`;
