export const textToColor = (input: string) => {
  let hash = 0;

  // Generate a hash from the input string
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to a hex color
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, '0'); // Ensure 2-digit hex
  }

  return color;
}