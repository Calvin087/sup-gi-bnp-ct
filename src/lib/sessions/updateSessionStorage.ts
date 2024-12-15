export const updateSessionStorage = (data: Record<string, string>) => {
  sessionStorage.setItem("pokemonSearchQuery", JSON.stringify(data));
};
