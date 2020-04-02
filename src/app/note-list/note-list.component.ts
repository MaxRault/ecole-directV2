import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Note } from '../models/note.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, OnDestroy {
  notes: Note[];
  notesSubscription: Subscription;

  constructor(private notesService: NoteService, private router: Router) {}

  ngOnInit() {
    this.notesSubscription = this.notesService.notesSubject.subscribe(
      (notes: Note[]) => {
        this.notes = notes;
      }
    );
    this.notesService.emitNotes();
  }

  onNewNote() {
    this.router.navigate(['/notes', 'new']);
  }

  onDeleteNote(note: Note) {
    this.notesService.removeNote(note);
  }

  onViewNote(id: number) {
    this.router.navigate(['/notes', 'view', id]);
  }
  ngOnDestroy() {
    this.notesSubscription.unsubscribe();
  }

}
