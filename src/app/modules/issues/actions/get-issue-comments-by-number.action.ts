import { sleep } from '@helpers/sleep';
import { GithubIssue } from '../interfaces';
import { environment } from 'src/environments/environment';

const { baseUrl, gitHubToken } = environment;

export const getIssueCommentsByNumber = async (
  issueNumber: string
): Promise<GithubIssue[]> => {
  try {
    const resp = await fetch(`${baseUrl}/issues/${issueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${gitHubToken}`,
      },
    });

    if (!resp.ok) throw 'Cant load comments';

    const comments: GithubIssue[] = await resp.json();

    return comments;
  } catch (error) {
    throw 'Could not get comments';
  }
};
