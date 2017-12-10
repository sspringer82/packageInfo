import { GraphQLClient } from 'graphql-request';
import { readFile } from 'fs';
import { promisify } from 'util';

const promisedReadFile = promisify(readFile);

const githubUrl = 'https://api.github.com/graphql';

async function getClient(githubUrl: string): Promise<GraphQLClient> {
  return new GraphQLClient(githubUrl, {
    headers: {
      Authorization:
        'Bearer ' + (await promisedReadFile('config/github.token')),
    },
  });
}

function getQuery(): string {
  return `
    query getRepoStats($owner: String!, $repoName: String!){
      repository(owner:$owner name:$repoName) {
        forkCount,
        stargazers {
          totalCount
        }
        watchers {
          totalCount
        }
      }
    }
  `;
}

export async function getRepoStats(
  owner: string,
  repoName: string,
): Promise<any> {
  const client = await getClient(githubUrl);
  const query = getQuery();
  const variables = {
    owner,
    repoName,
  };
  return await client.request(query, variables);
}
