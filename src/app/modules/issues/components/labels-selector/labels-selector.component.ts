import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { GithubLabel } from '../../interfaces';
import { IssuesService } from '../../services/issues.service';
import { Label } from '../../interfaces/github-issues.interface';

@Component({
  selector: 'issues-labels-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labels-selector.component.html',
})
export class LabelsSelectorComponent {
  public labels = input.required<GithubLabel[]>();
  public issuesService = inject(IssuesService);

  public isSelected(labelName: string) {
    return this.issuesService.selectLabels().has(labelName);
  }

  public onLabelClick(labelName: string) {
    this.issuesService.toggleLabel(labelName);
  }
}
