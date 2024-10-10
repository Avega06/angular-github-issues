import { sleep } from '@helpers/sleep';
import { GithubIssue, State } from '../interfaces';
import { environment } from 'src/environments/environment';

const { baseUrl, gitHubToken } = environment;

export const getIssues = async (
  state: State = State.All,
  selectedLabels: string[] = []
): Promise<GithubIssue[]> => {
  const params = new URLSearchParams();
  params.append('state', state);

  if (selectedLabels.length > 0) {
    params.append('labels', selectedLabels.join(','));
  }
  try {
    const resp = await fetch(`${baseUrl}/issues?${params}`, {
      headers: {
        Authorization: `Bearer ${gitHubToken}`,
      },
    });

    if (!resp.ok) throw 'Cant load issues';

    const issues: GithubIssue[] = await resp.json();

    return issues;
  } catch (error) {
    throw 'Could not get issues';
  }
};
