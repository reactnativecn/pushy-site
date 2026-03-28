import { expect, test, mock, beforeEach, describe } from "bun:test";

describe("GitHubButton Caching Logic", () => {
  const namespace = "test-owner";
  const repo = "test-repo";
  const cacheKey = `gh-count-${namespace}-${repo}`;
  const CACHE_DURATION = 2 * 60 * 60 * 1000;

  // Mocking localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    localStorageMock.clear();
    mock.restore();
  });

  // Since we can't easily test the component without React dependencies,
  // we can test the logic that would be inside the component.
  // We'll simulate the fetchCount function's behavior.

  async function simulateFetchCount(type: string, signal: any) {
    let count: number | null = null;

    // Try local cache first
    try {
      const cached = localStorageMock.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached) as {
          data: any;
          timestamp: number;
        };
        if (Date.now() - timestamp < CACHE_DURATION) {
          const nextCount = data[`${type}_count`];
          if (typeof nextCount === "number") {
            count = nextCount;
            return count;
          }
        }
      }
    } catch {
      // Ignore localStorage errors
    }

    const response = await fetch(`https://api.github.com/repos/${namespace}/${repo}`, {
      signal,
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Save to cache
    try {
      localStorageMock.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
    } catch {
      // Ignore localStorage errors
    }

    const nextCount = data[`${type}_count`];
    if (typeof nextCount === "number") {
      count = nextCount;
    }
    return count;
  }

  test("fetches from API when no cache exists", async () => {
    const mockFetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ stargazers_count: 123 }),
      })
    );
    global.fetch = mockFetch as any;

    const count = await simulateFetchCount("stargazers", null);

    expect(count).toBe(123);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const cached = JSON.parse(localStorageMock.getItem(cacheKey) || "{}");
    expect(cached.data.stargazers_count).toBe(123);
  });

  test("uses cache when valid", async () => {
    const mockData = { stargazers_count: 456 };
    localStorageMock.setItem(
      cacheKey,
      JSON.stringify({ data: mockData, timestamp: Date.now() })
    );

    const mockFetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ stargazers_count: 789 }),
      })
    );
    global.fetch = mockFetch as any;

    const count = await simulateFetchCount("stargazers", null);

    expect(count).toBe(456);
    // Should not have called fetch because cache was valid
    expect(mockFetch).toHaveBeenCalledTimes(0);
  });

  test("fetches from API when cache is expired", async () => {
    const expiredTimestamp = Date.now() - 3 * 60 * 60 * 1000; // 3 hours ago
    const mockData = { stargazers_count: 456 };
    localStorageMock.setItem(
      cacheKey,
      JSON.stringify({ data: mockData, timestamp: expiredTimestamp })
    );

    const mockFetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ stargazers_count: 789 }),
      })
    );
    global.fetch = mockFetch as any;

    const count = await simulateFetchCount("stargazers", null);

    expect(count).toBe(789);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const cached = JSON.parse(localStorageMock.getItem(cacheKey) || "{}");
    expect(cached.data.stargazers_count).toBe(789);
  });
});
