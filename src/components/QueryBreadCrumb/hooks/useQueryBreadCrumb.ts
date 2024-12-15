import { useEffect, useState } from "react";

type QueryType = {
  type?: string;
  generation?: string;
  search?: string;
};

export const useQueryBreadCrumb = () => {
  const [query, setQuery] = useState<QueryType>({});

  useEffect(() => {
    const savedQuery = sessionStorage.getItem("pokemonSearchQuery");
    if (savedQuery) {
      setQuery(JSON.parse(savedQuery));
    }
  }, []);

  return { query };
};
