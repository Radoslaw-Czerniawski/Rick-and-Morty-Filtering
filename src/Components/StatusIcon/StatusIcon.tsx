import { RaMStatus } from '../../Types/RaMCharacters';
import death from '../../assets/death.svg';
import alive from '../../assets/alive.svg';
import unknown from '../../assets/unknown.svg';
import { useMemo } from 'react';

export const StatusIcon = ({ status }: { status: RaMStatus }) => {
    const source = useMemo(() => {
        if (status === 'Alive') {
            return alive;
        } else if (status === 'Dead') {
            return death;
        } else {
            return unknown;
        }
    }, [status]);

    return <img src={source} alt="status icon" />;
};
