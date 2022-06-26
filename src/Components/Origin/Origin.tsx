import { useQuery } from 'react-query';
import TextTruncate from 'react-text-truncate';
import { getEpisode } from '../../Utils/Utils';

import * as S from './StylesOrigin';

export const Origin = ({
    originUrl,
    originName,
}: {
    originUrl: string;
    originName: string;
}) => {
    const { data } = useQuery(['episodes', originUrl], () =>
        getEpisode(originUrl)
    );

    if (originName === 'unknown') {
        return <S.SpanUnknown>{originName}</S.SpanUnknown>;
    }

    return (
        <S.OriginWrapper>
            <TextTruncate line={1} truncateText="…" text={originName} />
            {data?.type === 'Planet' && <S.SpanType>{data.type}</S.SpanType>}
        </S.OriginWrapper>
    );
};
