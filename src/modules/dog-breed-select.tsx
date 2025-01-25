import { Select, type SelectProps } from "../components";
import { useDogBreedsQuery } from "../services";

export const DogBreedSelect: React.FC<SelectProps> = ({ id, name }) => {
  const { data, isLoading, isError } = useDogBreedsQuery();

  return (
    <Select id={id} name={name} loading={isLoading} error={isError}>
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
