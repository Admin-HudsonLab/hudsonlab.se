import { Octokit } from "@octokit/rest";
import { fromUnixTime, getTime } from "date-fns";
import { mockAllWeekAsTimeStamp, mockAllTotalRedmagpie, mockAllTotalGenomeScaleModels } from "./mock-data/githubapi-commits-mockdata";

const octokit = new Octokit({ auth: process.env.GITHUBAPI_ADMIN_HUDSONLAB_PERSONAL_ACCESS_TOKEN });

export async function getCommitsActivityData(owner, repo) {
  const commitsActivityData = await octokit.repos
    .getCommitActivityStats({
      owner: owner,
      repo: repo,
    })
    .then(({ data }) => {
      return data;
    });

  // weekly activity data management to move to an external module
  const allTotal = [];
  const allWeekAsTimeStamp = [];
  commitsActivityData.forEach((weeklyActivity) => {
    allTotal.push(weeklyActivity.total);
    allWeekAsTimeStamp.push(getTime(fromUnixTime(weeklyActivity.week)));
  });
  const commitsActivity = { allTotal, allWeekAsTimeStamp };
  
  return commitsActivity;
}

export async function getMockCommitsActivityData(owner, repo) {
  let commitsActivity = {};
  if (repo === "redmagpie") {
    commitsActivity = { allTotal: mockAllTotalRedmagpie, allWeekAsTimeStamp: mockAllWeekAsTimeStamp };
  }
  if (repo === "genome-scale-models") {
    commitsActivity = { allTotal: mockAllTotalGenomeScaleModels, allWeekAsTimeStamp: mockAllTotalRedmagpie }; 
  }
  return commitsActivity;
}
