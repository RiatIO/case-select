import { useQuery } from "@tanstack/react-query"
import { fetchDogBreeds } from "../network/fetch-dog-breeds"
import { queryKeys } from "../query-keys"

export const useDogBreedsQuery = () => {
  return useQuery({ queryKey: queryKeys.dogBreeds(), queryFn: fetchDogBreeds })
}