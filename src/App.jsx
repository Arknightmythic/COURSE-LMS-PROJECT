import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const quaryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={quaryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
