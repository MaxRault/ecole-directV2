import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Matiere } from '../../../models/matieres.model';
import { EtablissemnentService } from '../../../services/etablissemnent.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matiere-form',
  templateUrl: './matiere-form.component.html',
  styleUrls: ['./matiere-form.component.css']
})
export class MatiereFormComponent implements OnInit {
  matiereForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private schoolService: EtablissemnentService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.matiereForm = this.formBuilder.group({
      matiereNom: ['', Validators.required],
      nomProf: ['', Validators.required],
      commentaire: ['', Validators.required],
    });
  }
  
  onSaveSchoolMatiere() {
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    const matiereNom = this.matiereForm.get('matiereNom').value;
    const nomProf = this.matiereForm.get('nomProf').value;
    const commentaire = this.matiereForm.get('commentaire').value;
    const newMatiere = new Matiere(matiereNom, nomProf, commentaire);
    console.log('newFormation === ', newMatiere)
    this.schoolService.createNewSchoolMatiere(newMatiere, id, idFormation);
    this.router.navigate(['/etablissement']);
  }
}
