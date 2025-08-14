import { useEffect } from "react";
import { todoApi } from "./services/api";

const App = () => {
  useEffect(() => {
    const test = async () => {
      const data = await todoApi.deleteTodo(6);

      console.log(data);
    };

    test();
  }, []);

  return <div className="bg-red-100">App</div>;
};

export default App;
