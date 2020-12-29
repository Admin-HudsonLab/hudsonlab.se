import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

export async function getCommitsData() {

  const data = await octokit.repos.getCommitActivityStats({
    owner: "Asplund-Samuelsson",
    repo: "redmagpie",
  }).then(({ data }) => {
    return data
  });;


  return data
} 