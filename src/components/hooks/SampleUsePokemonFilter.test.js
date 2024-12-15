import { renderHook, act } from "@testing-library/react";
import { usePokemonFilter } from "./usePokemonFilter";
import { useRouter } from "next/router";
import { updateSessionStorage } from "../../lib/sessions/updateSessionStorage";
import { mockedEnrichPokemonDataList } from "../../../__mocks__/pokemonMocks/pokemonRes";

jest.mock("../../lib/sessions/updateSessionStorage", () => ({
  updateSessionStorage: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("usePokemonFilter", () => {
  let mockRouter;
  let mockPush;

  beforeEach(() => {
    mockPush = jest.fn();
    mockRouter = {
      query: {},
      pathname: "/",
      push: mockPush,
    };
    useRouter.mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("hook should mount with empty values", () => {
    const { result } = renderHook(() =>
      usePokemonFilter(mockedEnrichPokemonDataList)
    );

    expect(result.current.currentTypeFilter).toBe("");
    expect(result.current.currentGenerationFilter).toBe("");
    expect(result.current.searchQuery).toBe("");
    expect(updateSessionStorage).toHaveBeenCalledWith({
      type: "",
      generation: "",
      search: "",
    });
  });

  it("hook starts with query params from router/url", () => {
    mockRouter.query = {
      type: "fire",
      generation: "generation-i",
      search: "char",
    };

    const { result } = renderHook(() =>
      usePokemonFilter(mockedEnrichPokemonDataList)
    );

    expect(result.current.currentTypeFilter).toBe("fire");
    expect(result.current.currentGenerationFilter).toBe("generation-i");
    expect(result.current.searchQuery).toBe("char");
    expect(updateSessionStorage).toHaveBeenCalledWith(
      (mockRouter.query = {
        type: "fire",
        generation: "generation-i",
        search: "char",
      })
    );
  });

  it("handles type change", () => {
    const { result } = renderHook(() =>
      usePokemonFilter(mockedEnrichPokemonDataList)
    );

    act(() => {
      result.current.handleTypeChange({
        target: { value: "fire" },
      });
    });

    expect(result.current.currentTypeFilter).toBe("fire");
    expect(mockPush).toHaveBeenCalledWith(
      {
        pathname: "/",
        query: { type: "fire" },
      },
      undefined,
      { shallow: true }
    );
    expect(updateSessionStorage).toHaveBeenCalledWith(
      expect.objectContaining({ type: "fire" })
    );
  });

  it("handles generation change", () => {
    const { result } = renderHook(() =>
      usePokemonFilter(mockedEnrichPokemonDataList)
    );

    act(() => {
      result.current.handleGenerationChange({
        target: { value: "generation-i" },
      });
    });

    expect(result.current.currentGenerationFilter).toBe("generation-i");
    expect(mockPush).toHaveBeenCalledWith(
      {
        pathname: "/",
        query: { generation: "generation-i" },
      },
      undefined,
      { shallow: true }
    );
    expect(updateSessionStorage).toHaveBeenCalledWith(
      expect.objectContaining({ generation: "generation-i" })
    );
  });

  it("handles search query (text input)", () => {
    const { result } = renderHook(() =>
      usePokemonFilter(mockedEnrichPokemonDataList)
    );

    act(() => {
      result.current.handleSearchQuery({
        target: { value: "char" },
      });
    });

    expect(result.current.searchQuery).toBe("char");
    expect(mockPush).toHaveBeenCalledWith(
      {
        pathname: "/",
        query: { search: "char" },
      },
      undefined,
      { shallow: true }
    );
    expect(updateSessionStorage).toHaveBeenCalledWith(
      expect.objectContaining({ search: "char" })
    );
  });

  it("filters pokemon correctly 🤞🏽", () => {
    mockRouter.query = {
      type: "fire",
      generation: "generation-i",
      search: "char",
    };

    const { result } = renderHook(() =>
      usePokemonFilter(mockedEnrichPokemonDataList)
    );

    const filteredPokemon = result.current.filteredPokemon();

    expect(filteredPokemon.length).toBe(3);
    expect(filteredPokemon[0].types).toContain("fire");
    expect(filteredPokemon[0].generation).toBe("generation-i");
    expect(
      filteredPokemon[0].evolutionChain.some((evo) => evo.includes("char"))
    ).toBe(true);
  });

  it("hook provides additional data for types and generations", () => {
    const { result } = renderHook(() =>
      usePokemonFilter(mockedEnrichPokemonDataList)
    );

    expect(result.current.types).toEqual(mockedEnrichPokemonDataList.types);
    expect(result.current.generations).toEqual(
      mockedEnrichPokemonDataList.generations
    );
  });

  it("hook handles multiple filter conditions", () => {
    mockRouter.query = {
      type: "water",
      generation: "generation-i",
      search: "squirtle",
    };

    const { result } = renderHook(() =>
      usePokemonFilter(mockedEnrichPokemonDataList)
    );

    const filteredPokemon = result.current.filteredPokemon();

    expect(filteredPokemon.length).toBe(3);
    expect(filteredPokemon[0].types).toContain("water");
    expect(filteredPokemon[0].generation).toBe("generation-i");
    expect(
      filteredPokemon[0].evolutionChain.some((evolution) =>
        evolution.includes("squirtle")
      )
    ).toBe(true);
  });

  it("returns all pokemon when no filters are applied", () => {
    const { result } = renderHook(() =>
      usePokemonFilter(mockedEnrichPokemonDataList)
    );

    const filteredPokemon = result.current.filteredPokemon();

    expect(filteredPokemon.length).toBe(
      mockedEnrichPokemonDataList.pokemon.length
    );
  });
});
