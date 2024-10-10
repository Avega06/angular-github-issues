import { environment } from 'src/environments/environment.development';
import { getIssueByNumber } from './get-issue-by-number.action';

const issueNumber = '123';
const { baseUrl, gitHubToken } = environment;

const mockIssue = {
  id: 123,
  number: issueNumber,
  body: '#Hola Mundo',
};
describe('getIssueByNumberAction', () => {
  it('should fetch issue succesfully', async () => {
    const requestUrl = `${baseUrl}/issues/${issueNumber}`;

    const issueResponse = new Response(JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const issue = await getIssueByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestUrl, {
      headers: {
        Authorization: `Bearer ${gitHubToken}`,
      },
    });
  });

  it('should not fetch issue succesfully', async () => {
    const requestUrl = `${baseUrl}/issues/${issueNumber}`;

    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    try {
      const issue = await getIssueByNumber(issueNumber);
      expect(true).toBeFalse();
    } catch (error) {
      expect(error).toBe(`Could not get issue ${issueNumber}`);
    }

    // expect(window.fetch).toHaveBeenCalledWith(requestUrl, {
    //   headers: {
    //     Authorization: `Bearer ${gitHubToken}`,
    //   },
    // });
  });
});
