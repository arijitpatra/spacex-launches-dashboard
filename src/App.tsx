import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.scss";
import Launches from "./components/Launches";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>SpaceX Launches Dashboard</h1>
      <Launches />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
