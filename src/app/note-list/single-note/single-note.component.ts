import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css']
})
export class SingleNoteComponent implements OnInit {

  note: Note;

  constructor(private route: ActivatedRoute, private notesService: NoteService,
              private router: Router) {}

  ngOnInit() {
    this.note = new Note('', '');
    // tslint:disable-next-line: no-string-literal
    const id = this.route.snapshot.params['id'];
    this.notesService.getSingleNote(+id).then(
      (note: Note) => {
        this.note = note;
      }
    );
  }

  onBack() {
    this.router.navigate(['/notes']);
  }

}
