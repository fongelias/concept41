
const GITHUB_CLIENT_CONFIG: Record<string, string> = {
  ORG: 'concept41'
}

const githubAPIBaseUrl = 'https://api.github.com';
const githubRawBaseUrl = 'https://raw.githubusercontent.com';

const GITHUB_PATHS = {
  LIST_REPOS: () => `${githubAPIBaseUrl}/orgs/${GITHUB_CLIENT_CONFIG.ORG}/repos`,
  LIST_FILES: (repoName: string, path: string = '') => `${githubAPIBaseUrl}/repos/${GITHUB_CLIENT_CONFIG.ORG}/${repoName}/contents/${path}`,
  FILE_CONTENTS: (repoName: string, path: string = '') => `${githubRawBaseUrl}/${GITHUB_CLIENT_CONFIG.ORG}/${repoName}/${path}`,
};

export interface GithubRepo extends Record<string, any> {
  name: string,
}

export class GithubClient {
  constructor() {}

  public async listRepos(): Promise<GithubRepo[]> {
    return fetch(GITHUB_PATHS.LIST_REPOS())
      .then((resp: Response) => resp.json());
  }

  public async listFiles(repoName: string, path: string = ''): Promise<GithubFile[]> {
    return fetch(GITHUB_PATHS.LIST_FILES(repoName, path))
      .then((resp: Response) => resp.json())
      .then((filesJson) => filesJson.map((fileJson: Record<string, any>) => new GithubFile(fileJson)));
  }

  public async fileContents(repoName: string, path: string = ''): Promise<string> {
    return fetch(GITHUB_PATHS.FILE_CONTENTS(repoName, path))
      .then((resp: Response) => resp.text());
  }
}

export class GithubFile {
  constructor(private githubFileResponse: Record<string, any>) {}

  public getName(): string {
    return this.githubFileResponse.name
  }

  public async getContents(): Promise<string> {
    return fetch(this.githubFileResponse.download_url).then((resp: Response) => resp.text());
  }
}
