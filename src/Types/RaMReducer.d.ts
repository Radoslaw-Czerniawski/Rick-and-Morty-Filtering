type FetchParams = Parameters<typeof window.fetch>;
type Url = FetchParams[0];
type Options = FetchParams[1];

interface Idle {
    data: undefined;
    filteredData: undefined;
    isLoading: false;
    error: false;
}

interface Success<T> {
    data: T;
    filteredData: T;
    isLoading: false;
    error: false;
}

interface Pending {
    data: undefined;
    filteredData: undefined;
    isLoading: true;
    error: false;
}

interface Fail {
    data: undefined;
    filteredData: undefined;
    isLoading: false;
    error: true;
}

interface Filtered<T> {
    data: T;
    filteredData: T;
    isLoading: false;
    error: false;
}

type Result<T> = Idle | Success<T> | Pending | Fail | Filtered<T>;

type Reducer<T> = (state: Result<T>, action: Action<T>) => Result<T>;

interface StartLoading {
    type: 'start-loading';
}
interface SuccessLoading<T> {
    type: 'success-loading';
    data: T;
    filteredData: T;
}
type FilterFn<T> = (el: T) => T;
interface Filter<T, FilterFn> {
    type: 'filter';
    data: T;
    filteredData: T;
    filterFn: FilterFn;
}

interface FailLoading {
    type: 'fail-loading';
}

type Action<T> =
    | StartLoading
    | SuccessLoading<T>
    | FailLoading
    | Filter<T, FilterFn<T>>;
