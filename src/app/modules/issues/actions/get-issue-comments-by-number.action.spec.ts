import { environment } from 'src/environments/environment.development';
import { getIssueCommentsByNumber } from './get-issue-comments-by-number.action';

const issueNumber = '123';

const mockComments: any[] = [
  { id: 1, body: 'First comment', user: { login: 'user1' } },
  { id: 2, body: 'Second comment', user: { login: 'user2' } },
];

const { baseUrl, gitHubToken } = environment;

describe('getIssueComments', () => {
  it('should fetch issue comments succesfuly', async () => {
    const requestUrl = `${baseUrl}/issues/${issueNumber}/comments`;

    const issueResponse = new Response(JSON.stringify(mockComments), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const comments = await getIssueCommentsByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestUrl, {
      headers: {
        Authorization: `Bearer ${gitHubToken}`,
      },
    });
    expect(comments).toEqual(mockComments);
  });

  it('should throw an error if the response is not ok', async () => {
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    try {
      await getIssueCommentsByNumber(issueNumber);
      expect(true).toBeFalse();
    } catch (error) {
      expect(error).toBe('Could not get comments');
    }
  });
});
