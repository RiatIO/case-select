import { Select } from "../components";
import { useDogBreedsQuery } from "../services";

interface Props {
  id?: string;
}
export const DogBreedSelect: React.FC<Props> = ({ id }) => {
  const { data, isLoading, isError } = useDogBreedsQuery();

  return (
    <Select
      id={id}
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
