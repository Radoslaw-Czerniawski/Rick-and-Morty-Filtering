import styled from 'styled-components';
import { theme } from './Colors';
import { RaMStatus } from './Types/RaMCharacters';

export interface StatusProps {
    status: RaMStatus;
}

export const AppWrapper = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${theme.siteBackground};
    padding-top: 55px;
`;

export const Table = styled.table`
    ${theme.filter};
    background-color: ${theme.tableBackground};
    width: 1161px;
    margin-top: 25px;

    border-radius: 5px;
    display: flex;
    flex-direction: column;
`;

export const Head = styled.thead`
    border-bottom: 1px solid ${theme.tableHeadBorder};
`;

export const HeadRow = styled.tr`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 32px;
    height: 42px;
    width: 100%;
    align-items: center;
`;

export const HeadData = styled.th`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
`;

export const Input = styled.input`
    border: 1px solid ${theme.input};
    border-radius: 2px;
    background-color: ${theme.tableBackground};
    margin-left: 24px;
    cursor: pointer;
`;

export const HeadNameWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 249px;
    padding-left: 24px;
`;

export const BodyNameWrapper = styled(HeadNameWrapper)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
`;

export const SpanName = styled.span`
    display: flex;
    justify-content: flex-start;
    font-weight: 400;
    color: ${theme.speciesFontAndTitle};
`;

export const SpanSpecies = styled.span<StatusProps>`
    font-weight: 400;
    color: ${({ status }) =>
        status === 'Alive'
            ? theme.speciesFontAndTitle
            : theme.deadEpisodeSpecies};
`;

export const SpanTitle = styled(SpanName)`
    color: ${theme.speciesFontAndTitle};
    width: 162px;
`;

export const SpanBodyName = styled(SpanName)<StatusProps>`
    color: ${({ status }) =>
        status === 'Alive' || status === 'unknown'
            ? theme.textPrimary
            : theme.deadEpisodeText};
    font-weight: 500;
`;

export const SpanStatus = styled.span<StatusProps>`
    font-weight: 500;
    color: ${({ status }) =>
        status === 'Alive' || status === 'Dead'
            ? theme.textPrimary
            : theme.deadEpisodeText};
`;

export const ArrowWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const TopArrow = styled.img`
    transform: rotateZ(180deg);
    filter: brightness(0) saturate(100%) invert(91%) sepia(1%) saturate(979%)
        hue-rotate(160deg) brightness(87%);
    width: 8px;
`;

export const BottomArrow = styled.img`
    padding-top: 2.62px;
    width: 8px;
`;

export const BodyData = styled.td`
    display: flex;
    justify-content: flex-start;
`;

export const StatusWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const EpisodeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const BodyRow = styled(HeadRow)<StatusProps>`
    border-top: 1px solid ${theme.tableBodyBorder};
    height: 83px;
    background-color: ${({ status }) =>
        status === 'Alive' || status === 'unknown'
            ? theme.tableBackground
            : theme.deadBackground};
`;

export const Avatar = styled.img`
    border: 2px dashed ${theme.tableBodyBorder};
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 15px;
    width: 50px;
    height: 50px;
`;
