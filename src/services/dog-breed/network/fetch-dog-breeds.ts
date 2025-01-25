import { DogBreed } from "../types";

const API_ENDPOINT = "https://api.thedogapi.com/v1/breeds";

export const fetchDogBreeds = async () => {
  const url = new URL(API_ENDPOINT);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Failed to fetch dog breeds");
  }

  const data: DogBreed[] = await response.json();
  return data;
}