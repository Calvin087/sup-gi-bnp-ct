import { getAllPokemonDetails } from "./getAllPokemonDetails.ts";
import { getEvolutionImages } from "./getEvolutionImages.ts";
import { fetchWithTimeout } from "../fetchWithTimeout.ts";
import {
  mockedPokemonResponseBulbasaur,
  mockedPokemonResponseIvysaur,
  mockedPokemonResponseVenusaur,
  mockedEnrichPokemonData,
} from "../../../__mocks__/pokemonMocks/pokemonRes";

jest.mock("../fetchWithTimeout");

describe("Sample Pokemon Utils Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/1/";
  const { id, types, name, sprites, stats, weight, height, cries, species } =
    mockedPokemonResponseBulbasaur;

  const expectedPokemonObject = {
    id: id,
    types: types.map((type) => type.type.name),
    name: name,
    images: {
      frontDefaultAnimated: sprites.other.showdown.front_default,
      frontDefault: sprites.front_default,
    },
    stats: stats,
    weight: weight,
    height: height,
    cries: cries.latest,
    speciesUrl: species.url,
  };

  it("should build pokemon object", async () => {
    fetchWithTimeout.mockResolvedValue(mockedPokemonResponseBulbasaur);
    const response = await getAllPokemonDetails(pokemonUrl);
    expect(fetchWithTimeout).toHaveBeenCalledWith(pokemonUrl);
    expect(response).toEqual(expectedPokemonObject);
  });

  it("should throw an error when fetch fails", async () => {
    const errorMessage = "No data returned";
    fetchWithTimeout.mockRejectedValue(new Error(errorMessage));

    await expect(getAllPokemonDetails(pokemonUrl)).rejects.toThrow(
      errorMessage
    );
    expect(fetchWithTimeout).toHaveBeenCalledWith(pokemonUrl);
  });

  it("should fetch evolution images for a Pokemon", async () => {
    const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

    fetchWithTimeout
      .mockResolvedValueOnce(mockedPokemonResponseBulbasaur)
      .mockResolvedValueOnce(mockedPokemonResponseIvysaur)
      .mockResolvedValueOnce(mockedPokemonResponseVenusaur);

    const expected = [
      {
        id: mockedPokemonResponseBulbasaur.id,
        name: mockedPokemonResponseBulbasaur.name,
        image: mockedPokemonResponseBulbasaur.sprites.front_default,
      },
      {
        id: mockedPokemonResponseIvysaur.id,
        name: mockedPokemonResponseIvysaur.name,
        image: mockedPokemonResponseIvysaur.sprites.front_default,
      },
      {
        id: mockedPokemonResponseVenusaur.id,
        name: mockedPokemonResponseVenusaur.name,
        image: mockedPokemonResponseVenusaur.sprites.front_default,
      },
    ];

    const evolutionImages = await getEvolutionImages(
      mockedEnrichPokemonData,
      baseUrl
    );

    expect(evolutionImages).toEqual(expected);
  });
});
