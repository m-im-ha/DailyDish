import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Route";
import  Foodprovider  from "./provider/Foodprovider";

function App() {
  return (
    <div>
      <Foodprovider>
        <RouterProvider router={router} />
      </Foodprovider>
    </div>
  );
}

export default App;
