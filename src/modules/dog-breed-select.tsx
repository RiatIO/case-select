import { Select } from "../components";
import { useDogBreedsQuery } from "../services";

export const DogBreedSelect = () => {
  const { data, isLoading, isError } = useDogBreedsQuery();

  return (
    <Select
      onChange={(value) => console.log(value)}
      loading={isLoading}
      error={isError}
    >
      <Select.Trigger>Velg hunderase</Select.Trigger>

      <Select.Content>
        {data?.map((dogBreed) => (
          <Select.Item
            key={dogBreed.id}
            value={String(dogBreed.id)}
            name={dogBreed.name}
            description={dogBreed.temperament}
          />
        ))}
      </Select.Content>
    </Select>
  );
};
