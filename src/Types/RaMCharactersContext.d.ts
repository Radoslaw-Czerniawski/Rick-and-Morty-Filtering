import { Dispatch } from 'react';
import { RaMCharacter } from './RaMCharacters';

type ContextValue = [Result<RaMCharacter[]>, Dispatch<Action<RaMCharacter[]>>];
