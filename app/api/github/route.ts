import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  try {
    let repos;

    if (token) {
      // Use GraphQL for pinned repos
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query {
            user(login: "${process.env.GITHUB_USERNAME || "KemonoNeco"}") {
              pinnedItems(first: 4, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    name
                    description
                    url
                    stargazerCount
                    forkCount
                    primaryLanguage { name color }
                  }
                }
              }
            }
          }`,
        }),
        next: { revalidate: 300 },
      });

      if (res.ok) {
        const data = await res.json();
        const pinnedNodes = data?.data?.user?.pinnedItems?.nodes;
        if (pinnedNodes?.length) {
          repos = pinnedNodes.map(
            (r: {
              name: string;
              description: string | null;
              url: string;
              stargazerCount: number;
              forkCount: number;
              primaryLanguage: { name: string; color: string } | null;
            }) => ({
              name: r.name,
              description: r.description,
              url: r.url,
              stars: r.stargazerCount,
              forks: r.forkCount,
              language: r.primaryLanguage?.name ?? null,
              languageColor: r.primaryLanguage?.color ?? null,
            })
          );
        }
      }
    }

    // Fallback: REST API (no token needed)
    if (!repos) {
      const res = await fetch(
        `https://api.github.com/users/${process.env.GITHUB_USERNAME || "KemonoNeco"}/repos?sort=updated&per_page=4`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          next: { revalidate: 300 },
        }
      );

      if (!res.ok) {
        return NextResponse.json([], { status: 502 });
      }

      const data = await res.json();
      repos = data.map(
        (r: {
          name: string;
          description: string | null;
          html_url: string;
          stargazers_count: number;
          forks_count: number;
          language: string | null;
        }) => ({
          name: r.name,
          description: r.description,
          url: r.html_url,
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language,
          languageColor: null,
        })
      );
    }

    return NextResponse.json(repos, {
      headers: { "Cache-Control": "public, max-age=300" },
    });
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
