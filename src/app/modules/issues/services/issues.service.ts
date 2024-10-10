import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getLabels, getIssues, getIssueByNumber } from '../actions';
import { State } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  public selectedState = signal<State>(State.All);
  public selectLabels = signal(new Set<string>());

  public labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  public issuesQuery = injectQuery(() => ({
    queryKey: [
      'issues',
      { state: this.selectedState(), selectedLabels: [...this.selectLabels()] },
    ],
    queryFn: () => getIssues(this.selectedState(), [...this.selectLabels()]),
  }));

  public showIssueByState(state: State) {
    this.selectedState.set(state);
  }

  toggleLabel(label: string) {
    const labels = this.selectLabels();

    if (labels.has(label)) {
      labels.delete(label);
    } else {
      labels.add(label);
    }

    this.selectLabels.set(new Set(labels));
  }
}
