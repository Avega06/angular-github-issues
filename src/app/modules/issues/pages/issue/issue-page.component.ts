import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import { IssuesService } from '../../services/issues.service';
import { IssueCommentComponent } from '../../components/issue-comment/issue-comment.component';

@Component({
  selector: 'app-issue-page',
  standalone: true,
  imports: [CommonModule, RouterLink, IssueCommentComponent],
  templateUrl: './issue-page.component.html',
})
export default class IssuePageComponent {
  private router = inject(ActivatedRoute);
  private issueService = inject(IssueService);

  // public issueEffect = effect(
  //   () => {
  //     if (!this.issueNumber()) return;
  //     this.issueService.setIssueNumber(this.issueNumber()!);
  //   },
  //   { allowSignalWrites: true }
  // );

  public issueNumber = toSignal<string>(
    this.router.paramMap.pipe(
      map((params) => params.get('number') ?? ''),
      tap((number) => this.issueService.setIssueNumber(number))
    )
  );

  public issueQuery = this.issueService.issueQuery;
  public commentsQuery = this.issueService.commentsQuery;
}
