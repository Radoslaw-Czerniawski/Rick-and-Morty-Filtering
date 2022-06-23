import { RaMCharacter, RaMStatus } from './RaMCharacters';

type FetchParams = Parameters<typeof window.fetch>;
type Url = FetchParams[0];
type Options = FetchParams[1];

interface Idle {
    data: undefined;
    isLoading: false;
    error: false;
}

interface Success<T> {
    data: T;
    isLoading: false;
    error: false;
}

interface Pending {
    data: undefined;
    isLoading: true;
    error: false;
}

interface Fail {
    data: undefined;
    isLoading: false;
    error: true;
}

interface Filtered<T> {
    data: T;
    isLoading: false;
    error: false;
}

type Result<T extends RaMCharacter[]> = Idle | Success<T> | Pending | Fail;

type Reducer<T extends RaMCharacter[]> = (
    state: Result<T>,
    action: Action<T>
) => Result<T>;

interface StartLoading {
    type: 'start-loading';
}
interface SuccessLoading<T> {
    type: 'success-loading';
    data: T;
}

interface FailLoading {
    type: 'fail-loading';
}

interface ChangeStatus {
    type: 'change-status';
    // payload: Pick<RaMCharacter, 'id' | 'status'>;
    payload: Payload;
}

interface Payload {
    id: number;
    status: RaMStatus;
}

type Action<T> = StartLoading | SuccessLoading<T> | FailLoading | ChangeStatus;
