import { DogBreedSelect } from "./modules";

const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);

  console.log("Hunderase", form.get("hunderase"));
};

function App() {
  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <main className="w-screen flex items-center justify-center h-screen flex-col">
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="hunderase" className="text-sm">
            Hunderase
          </label>
          <DogBreedSelect id="hunderase" />
        </form>
      </main>
    </>
  );
}

export default App;
