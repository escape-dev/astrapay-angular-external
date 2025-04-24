import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Note, NoteService } from './note/note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  notes: Note[] = [];
  form: FormGroup

  constructor(private formBuilder: FormBuilder, private noteService: NoteService) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService.getAll().subscribe((data) => {
      this.notes = data;
    })
  }

  createNote() {
    if (this.form.valid) {
      this.noteService.create(this.form.value).subscribe(() => {
        this.loadNotes();
        this.form.reset();
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  deleteNote(id: number) {
    const confirmed = window.confirm("Are you sure to delete this note?")

    if (confirmed) {
      this.noteService.delete(id).subscribe(() => this.loadNotes() );
    }
  }

  showValidationError(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field && field.touched && field.invalid) {
      if (field.errors?.['required']) {
        return `${fieldName} cannot be empty`;
      } 
    }

    return null
  }
}
