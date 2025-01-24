import { Select } from "./components";

function App() {
  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <Select>
        <Select.Trigger>Velg hunderase</Select.Trigger>

        <Select.Content>
          <Select.Item>Dog 1</Select.Item>
          <Select.Item>Dog 2</Select.Item>
          <Select.Item>Dog 3</Select.Item>
        </Select.Content>
      </Select>
    </main>
  );
}

export default App;
