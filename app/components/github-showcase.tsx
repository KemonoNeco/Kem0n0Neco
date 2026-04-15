"use client";

import { useGithubRepos, LANGUAGE_COLORS } from "../hooks/use-github-repos";

export default function GithubShowcase() {
  const { repos, loading } = useGithubRepos();

  return (
    <div>
      <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.15em] text-[var(--on-surface-variant)] mb-3">
        GitHub
      </h3>

      {loading ? (
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full bg-[var(--on-surface-variant)]"
            style={{ animation: "pulse-glow 1.5s ease-in-out infinite" }}
          />
          <span className="text-xs text-[var(--on-surface-variant)]">Loading repos...</span>
        </div>
      ) : repos.length === 0 ? (
        <p className="text-xs text-[var(--on-surface-variant)]">No repos found</p>
      ) : (
        <div className="flex flex-col gap-2">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-subtle px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 group block"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(255, 105, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-display)] text-sm font-medium text-[var(--primary)] group-hover:text-[var(--on-surface)] transition-colors">
                  {repo.name}
                </span>
                {repo.stars > 0 && (
                  <span className="text-xs text-[var(--on-surface-variant)]">
                    ★ {repo.stars}
                  </span>
                )}
              </div>
              {repo.description && (
                <p className="text-xs text-[var(--on-surface-variant)] truncate mt-0.5">
                  {repo.description}
                </p>
              )}
              {repo.language && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        repo.languageColor ??
                        LANGUAGE_COLORS[repo.language] ??
                        "var(--on-surface-variant)",
                    }}
                  />
                  <span className="text-[10px] text-[var(--on-surface-variant)]">
                    {repo.language}
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
