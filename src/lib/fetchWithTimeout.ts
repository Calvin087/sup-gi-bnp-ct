type FetchWithTimeoutOptions = {
  timeout?: number;
} & RequestInit;

export const fetchWithTimeout = async <T>(
  url: string,
  options: FetchWithTimeoutOptions = {}
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    options.timeout || 15000
  );

  const fetchOptions = {
    signal: controller.signal,
    ...options,
  };

  try {
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.status}`);
    }

    const data: T = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};
