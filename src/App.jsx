import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Route";
import Foodprovider  from "./provider/Foodprovider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      
      <Foodprovider>
        <RouterProvider router={router} />
      </Foodprovider>
      {import.meta.env.MODE === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
