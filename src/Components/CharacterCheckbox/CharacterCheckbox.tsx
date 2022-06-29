import * as S from '../../StylesApp';

import {
    useCharacterSelectionApi,
    useSelectedCharacterIds,
} from '../../Contexts/CharactersSelection';
import { useCallback, ChangeEvent } from 'react';

interface Props {
    characterId: number;
}

export const CharacterCheckbox = ({ characterId }: Props) => {
    const selectedCharacters = useSelectedCharacterIds();
    const { selectCharacter } = useCharacterSelectionApi();

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            selectCharacter(characterId, event.target.checked);
        },
        [characterId]
    );

    return (
        <S.Input
            type="checkbox"
            onChange={handleChange}
            checked={selectedCharacters.includes(characterId)}
        />
    );
};
