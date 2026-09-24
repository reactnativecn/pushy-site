import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours

export interface StarRepoProps {
  /** GitHub repository in `owner/name` form. */
  repo: string;
  /** Short invitation shown under the repository name. */
  children?: ReactNode;
}

function formatCount(count: number) {
  if (count < 1000) {
    return String(count);
  }
  const value = count / 1000;
  return `${value >= 10 ? Math.round(value) : value.toFixed(1).replace(/\.0$/, "")}k`;
}

function useStarCount(repo: string) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const cacheKey = `gh-stars-${repo}`;

    const load = async () => {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { value, timestamp } = JSON.parse(cached) as {
            value: number;
            timestamp: number;
          };
          if (Date.now() - timestamp < CACHE_DURATION && typeof value === "number") {
            setCount(value);
            return;
          }
        }
      } catch {
        // Ignore localStorage errors
      }

      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`, {
          signal: controller.signal,
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!response.ok) {
          return;
        }
        const { stargazers_count: value } = (await response.json()) as {
          stargazers_count?: number;
        };
        if (typeof value !== "number") {
          return;
        }
        setCount(value);
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ value, timestamp: Date.now() }));
        } catch {
          // Ignore localStorage errors
        }
      } catch {
        // Ignore network/cancel errors and keep the count hidden.
      }
    };

    void load();

    return () => {
      controller.abort();
    };
  }, [repo]);

  return count;
}

const GitHubMark = () => (
  <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className="star-repo__star">
    <path d="M8 .9l2.2 4.46 4.92.72-3.56 3.47.84 4.9L8 12.13l-4.4 2.32.84-4.9L.88 6.08l4.92-.72L8 .9z" />
  </svg>
);

function StarRepo({ repo, children }: StarRepoProps) {
  const count = useStarCount(repo);
  const url = `https://github.com/${repo}`;

  return (
    <div className="star-repo not-prose">
      <a className="star-repo__main" href={url} target="_blank" rel="noopener noreferrer">
        <span className="star-repo__mark">
          <GitHubMark />
        </span>
        <span className="star-repo__body">
          <span className="star-repo__name">{repo}</span>
          {children ? <span className="star-repo__text">{children}</span> : null}
        </span>
      </a>
      <a
        className="star-repo__button"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Star ${repo} on GitHub`}
      >
        <StarIcon />
        <span>Star</span>
        {count !== null ? <span className="star-repo__count">{formatCount(count)}</span> : null}
      </a>
    </div>
  );
}

export default StarRepo;
