import { MantineProvider } from "@mantine/core";
import "./App.css";
import "@mantine/core/styles.css";

const App = () => {
  return (
    <MantineProvider>
      <h1 className="bg-red-600 text-white p-4">
        Test Tailwind
      </h1>
    </MantineProvider>
  );
};

export default App;
