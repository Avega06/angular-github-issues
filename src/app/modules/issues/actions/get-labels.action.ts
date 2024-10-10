import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces';
import { environment } from 'src/environments/environment';

const { baseUrl, gitHubToken } = environment;

export const getLabels = async (): Promise<GithubLabel[]> => {
  try {
    const resp = await fetch(`${baseUrl}/labels`, {
      headers: {
        Authorization: `Bearer ${gitHubToken}`,
      },
    });

    if (!resp.ok) throw 'Cant load labels';

    const labels: GithubLabel[] = await resp.json();

    return labels;
  } catch (error) {
    throw 'Could not get labels';
  }
};
