import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.scss";
import List from "./components/List";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>SpaceX Launches Dashboard</h1>
      <List />
    </QueryClientProvider>
  );
}

export default App;
