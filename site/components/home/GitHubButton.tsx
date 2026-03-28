import type { HTMLAttributes } from "react";
import { useEffect, useMemo, useState } from "react";

type GitHubButtonType = "stargazers" | "watchers" | "forks";

const typeToLabel: Record<GitHubButtonType, string> = {
  stargazers: "Star",
  watchers: "Watch",
  forks: "Fork",
};

const typeToPath: Partial<Record<GitHubButtonType, string>> = {
  forks: "network",
};

type CountResponse = Partial<Record<`${GitHubButtonType}_count`, number>>;

const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours

export interface GitHubButtonProps extends Omit<HTMLAttributes<HTMLSpanElement>, "type"> {
  type: GitHubButtonType;
  namespace: string;
  repo: string;
  size?: "large";
}

function GitHubButton({
  className,
  type,
  size,
  namespace,
  repo,
  ...rest
}: GitHubButtonProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const cacheKey = `gh-count-${namespace}-${repo}`;

    const fetchCount = async () => {
      try {
        // Try local cache first
        try {
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const { data, timestamp } = JSON.parse(cached) as {
              data: CountResponse;
              timestamp: number;
            };
            if (Date.now() - timestamp < CACHE_DURATION) {
              const nextCount = data[`${type}_count`];
              if (typeof nextCount === "number") {
                setCount(nextCount);
                return;
              }
            }
          }
        } catch {
          // Ignore localStorage errors
        }

        const response = await fetch(`https://api.github.com/repos/${namespace}/${repo}`, {
          signal: controller.signal,
          headers: {
            Accept: "application/vnd.github+json",
          },
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as CountResponse;

        // Save to cache
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
        } catch {
          // Ignore localStorage errors
        }

        const nextCount = data[`${type}_count`];

        if (typeof nextCount === "number") {
          setCount(nextCount);
        }
      } catch {
        // Ignore network/cancel errors and keep the count hidden.
      }
    };

    void fetchCount();

    return () => {
      controller.abort();
    };
  }, [namespace, repo, type]);

  const buttonClassName = useMemo(() => {
    return ["github-btn", size === "large" ? "github-btn-large" : "", className]
      .filter(Boolean)
      .join(" ");
  }, [className, size]);

  const repoUrl = `https://github.com/${namespace}/${repo}/`;
  const countUrl = `https://github.com/${namespace}/${repo}/${typeToPath[type] || type}/`;

  return (
    <span {...rest} className={buttonClassName}>
      <a className="gh-btn" href={repoUrl} target="_blank" rel="noopener noreferrer">
        <span className="gh-ico" aria-hidden="true" />
        <span className="gh-text">{typeToLabel[type]}</span>
      </a>
      <a
        className="gh-count"
        href={countUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={count !== null ? { display: "block" } : undefined}
      >
        {count}
      </a>
    </span>
  );
}

export default GitHubButton;
