import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {

  noteForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private notesService: NoteService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.noteForm = this.formBuilder.group({
      nomEleve: ['', Validators.required],
      note: ['', Validators.required],
      matieres: ['', Validators.required]
    });
  }
  
  onSaveNote() {
    const nomEleve = this.noteForm.get('nomEleve').value;
    const note = this.noteForm.get('note').value;
    const matieres = this.noteForm.get('matieres').value;
    const newNote = new Note(nomEleve, note);
    newNote.matieres = matieres;
    this.notesService.createNewNote(newNote);
    this.router.navigate(['/notes']);
  }

}
