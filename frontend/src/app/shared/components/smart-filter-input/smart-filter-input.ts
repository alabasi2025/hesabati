import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { matchesSearchQuery, normalizeSearchText } from '../../helpers';

@Component({
  selector: 'app-smart-filter-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './smart-filter-input.html',
  styleUrl: './smart-filter-input.scss',
})
export class SmartFilterInputComponent {
  @Input() inputId = '';
  @Input() label = '';
  @Input() title = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() suggestions: string[] = [];
  @Input() allowClear = true;
  @Input() maxSuggestions = 30;

  @Output() valueChange = new EventEmitter<string>();
  @Output() committed = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();

  showSuggestions = signal(false);
  activeSuggestionIndex = signal(-1);

  getFilteredSuggestions(): string[] {
    const all = (this.suggestions || []).filter((v) => String(v || '').trim().length > 0);
    const query = normalizeSearchText(this.value);
    const items = query
      ? all.filter((item) => matchesSearchQuery(query, item))
      : all;
    return items.slice(0, this.maxSuggestions);
  }

  onInput(value: string) {
    this.valueChange.emit(String(value || ''));
    this.showSuggestions.set(true);
    this.activeSuggestionIndex.set(-1);
  }

  onCommit(value: string) {
    this.committed.emit(String(value || ''));
  }

  onFocus() {
    if (this.getFilteredSuggestions().length > 0) {
      this.showSuggestions.set(true);
    }
  }

  onBlur() {
    globalThis.setTimeout(() => {
      this.showSuggestions.set(false);
      this.activeSuggestionIndex.set(-1);
    }, 120);
  }

  onKeydown(event: KeyboardEvent) {
    const options = this.getFilteredSuggestions();
    if (!options.length) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.showSuggestions.set(true);
      const current = this.activeSuggestionIndex();
      const dir = event.key === 'ArrowDown' ? 1 : -1;
      const next = current < 0 ? (dir > 0 ? 0 : options.length - 1) : (current + dir + options.length) % options.length;
      this.activeSuggestionIndex.set(next);
      return;
    }

    if (event.key === 'Enter') {
      const idx = this.activeSuggestionIndex();
      if (this.showSuggestions() && idx >= 0 && idx < options.length) {
        event.preventDefault();
        this.selectSuggestion(options[idx]!);
      }
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.showSuggestions.set(false);
      this.activeSuggestionIndex.set(-1);
    }
  }

  selectSuggestion(value: string) {
    const picked = String(value || '');
    this.valueChange.emit(picked);
    this.committed.emit(picked);
    this.showSuggestions.set(false);
    this.activeSuggestionIndex.set(-1);
  }

  clear() {
    this.valueChange.emit('');
    this.committed.emit('');
    this.cleared.emit();
    this.showSuggestions.set(false);
    this.activeSuggestionIndex.set(-1);
  }
}
