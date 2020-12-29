import { Octokit } from "@octokit/rest";
import { fromUnixTime, format } from "date-fns";

const octokit = new Octokit();

export async function getCommitsActivityData() {
  const commitsActivityData = await octokit.repos
    .getCommitActivityStats({
      owner: "Asplund-Samuelsson",
      repo: "redmagpie",
    })
    .then(({ data }) => {
      return data;
    });

  // weekly activity data management to move to an external module
  const allTotal = [];
  const allWeekAsTimeStamp = [];
  commitsActivityData.forEach((weeklyActivity) => {
    allTotal.push(weeklyActivity.total);
    allWeekAsTimeStamp.push(format(fromUnixTime(weeklyActivity.week), "MMMM"));
  });
  const commitsActivity = { allTotal, allWeekAsTimeStamp };

  /*   console.log(commitsData); */

  return commitsActivity;
}
