import { Select } from "../components";
import { useDogBreedsQuery } from "../services";

export const DogBreedSelect = () => {
  const { data } = useDogBreedsQuery();

  return (
    <Select onChange={(value) => console.log(value)}>
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
