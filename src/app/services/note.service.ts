import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Note } from '../models/note.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;



@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor() {
    this.getNotes();
}
  notes: Note[] = [];
  notesSubject = new Subject<Note[]>();

  emitNotes() {
    this.notesSubject.next(this.notes);
  }

  saveNotes() {
    firebase.database().ref('users/notes').set(this.notes);
  }

  getNotes() {
    firebase.database().ref('users/notes')
      .on('value', (data: DataSnapshot) => {
          this.notes = data.val() ? data.val() : [];
          this.emitNotes();
        }
      );
  }

  getSingleNote(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('users/notes/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewNote(newNote: Note) {
    this.notes.push(newNote);
    this.saveNotes();
    this.emitNotes();
  }

  removeNote(note: Note) {
    const noteIndexToRemove = this.notes.findIndex(
      (noteEl) => {
        if(noteEl === note) {
          return true;
        }
      }
    );
    this.notes.splice(noteIndexToRemove, 1);
    this.saveNotes();
    this.emitNotes();
  }
}
