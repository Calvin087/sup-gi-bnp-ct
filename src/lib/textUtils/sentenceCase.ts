export const sentenceCaseGeneration = (generation: string) => {
  return generation
    .split("-")
    .map((word) =>
      word.length <= 5
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
};

export const sentenceCaseType = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
};

export const sentenceCaseName = (name: string) => {
  return name
    .split("-")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};
