import { sleep } from '@helpers/sleep';
import { GithubIssue } from '../interfaces';
import { environment } from 'src/environments/environment';

const { baseUrl, gitHubToken } = environment;

export const getIssueByNumber = async (
  issueNumber: string
): Promise<GithubIssue> => {
  try {
    const resp = await fetch(`${baseUrl}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${gitHubToken}`,
      },
    });

    if (!resp.ok) throw 'Cant load issue';

    const issue: GithubIssue = await resp.json();

    return issue;
  } catch (error) {
    throw `Could not get issue ${issueNumber}`;
  }
};
