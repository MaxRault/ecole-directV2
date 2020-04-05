import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Professeur } from '../../../models/professeur.model';
import { EtablissemnentService } from '../../../services/etablissemnent.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-professeur-form',
  templateUrl: './professeur-form.component.html',
  styleUrls: ['./professeur-form.component.css']
})
export class ProfesseurFormComponent implements OnInit {
  professeurForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private schoolService: EtablissemnentService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.professeurForm = this.formBuilder.group({
      professeurNom: ['', Validators.required],
      professeurPrenom: ['', Validators.required],
      professeurDateNaiss: ['', Validators.required],
      professeurTel: ['', Validators.required],
      professeurMail: ['', Validators.required],
    });
  }
  
  onSaveSchoolProfesseur() {
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    const professeurNom = this.professeurForm.get('professeurNom').value;
    const professeurPrenom = this.professeurForm.get('professeurPrenom').value;
    const professeurDateNaiss = this.professeurForm.get('professeurDateNaiss').value;
    const professeurTel = this.professeurForm.get('professeurTel').value;
    const professeurMail = this.professeurForm.get('professeurMail').value;
    const newProfesseur = new Professeur(professeurNom, professeurPrenom, professeurDateNaiss, professeurTel, professeurMail);
    console.log('newFormation === ', newProfesseur)
    this.schoolService.createNewSchoolProfesseur(newProfesseur, id, idFormation);
    this.router.navigate(['/etablissement']);
  }
}
