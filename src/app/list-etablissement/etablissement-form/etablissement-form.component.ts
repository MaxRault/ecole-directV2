import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Etablissement } from '../../models/etablissement.model';
import { EtablissemnentService } from '../../services/etablissemnent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etablissement-form',
  templateUrl: './etablissement-form.component.html',
  styleUrls: ['./etablissement-form.component.css']
})
export class EtablissementFormComponent implements OnInit {

  schoolForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private schoolService: EtablissemnentService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.schoolForm = this.formBuilder.group({
      schoolName: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }
  
  onSaveSchool() {
    const schoolName = this.schoolForm.get('schoolName').value;
    const adresse = this.schoolForm.get('adresse').value;
    const newSchool = new Etablissement(schoolName, adresse);
    this.schoolService.createNewSchool(newSchool);
    this.router.navigate(['/etablissement']);
  }


}
