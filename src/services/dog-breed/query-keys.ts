

export const queryKeys = {
  all: ['myApp'] as const,

  dogBreeds: () => [...queryKeys.all, 'dogBreeds'] as const,
}