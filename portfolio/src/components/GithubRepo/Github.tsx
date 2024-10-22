"use client";

import { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  html_url: string;
}

interface UserRepos {
  username: string;
  repos?: Repo[];
  error?: string;
}

export default function GithubRepos() {
  const [repos, setRepos] = useState<UserRepos[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      const usernames = "IsabellaMedeiros1,IgorWJ,cristianrcaja,GuiRomanholi,StaniukaitisPaula";
      try {
        const response = await fetch(`/api/git-hub?usernames=${encodeURIComponent(usernames)}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar repositórios.");
        }
        const data: UserRepos[] = await response.json();
        setRepos(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchRepos();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Repositórios do GitHub</h2>
      {repos.map((user) => (
        <div key={user.username}>
          <h3>{user.username}</h3>
          <ul>
            {user.repos && !user.error ? (
              user.repos.map((repo) => (
                <li key={repo.id}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </li>
              ))
            ) : (
              <li>{user.error || 'Nenhum repositório encontrado.'}</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
