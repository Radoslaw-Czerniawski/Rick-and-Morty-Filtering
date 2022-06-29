import styled from 'styled-components';
import { theme } from '../../Colors';

export const OriginWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SpanUnknown = styled.span`
    color: ${theme.textUnknown};
`;

export const SpanName = styled.span`
    width: 150px;
    font-weight: 400;
    color: ${theme.textPrimary};
`;

export const SpanType = styled.span`
    font-weight: 400;
    margin-top: 8px;
    color: #8c9193;
`;
