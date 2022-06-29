import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CharactersSelectionProvider } from './Contexts/CharactersSelection';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

root.render(
    <QueryClientProvider client={queryClient}>
        <CharactersSelectionProvider>
            <App />
        </CharactersSelectionProvider>
    </QueryClientProvider>
);
