import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Etudiant } from '../../../models/etudiant.model';
import { EtablissemnentService } from '../../../services/etablissemnent.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-etudiant-form',
  templateUrl: './etudiant-form.component.html',
  styleUrls: ['./etudiant-form.component.css']
})
export class EtudiantFormComponent implements OnInit {
  etudiantForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private schoolService: EtablissemnentService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.etudiantForm = this.formBuilder.group({
      etudiantNom: ['', Validators.required],
      etudiantPrenom: ['', Validators.required],
      etudiantDateNaiss: ['', Validators.required],
      etudiantTel: ['', Validators.required],
      etudiantMail: ['', Validators.required],
    });
  }
  
  onSaveSchoolEtudiant() {
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    const etudiantNom = this.etudiantForm.get('etudiantNom').value;
    const etudiantPrenom = this.etudiantForm.get('etudiantPrenom').value;
    const etudiantDateNaiss = this.etudiantForm.get('etudiantDateNaiss').value;
    const etudiantTel = this.etudiantForm.get('etudiantTel').value;
    const etudiantMail = this.etudiantForm.get('etudiantMail').value;
    const newEtudiant = new Etudiant(etudiantNom, etudiantPrenom, etudiantDateNaiss, etudiantTel, etudiantMail);
    console.log('newFormation === ', newEtudiant)
    this.schoolService.createNewSchoolEtudiant(newEtudiant, id, idFormation);
    this.router.navigate(['/etablissement']);
  }
}
