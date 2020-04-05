import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Etablissement } from '../models/etablissement.model';
import { Formation } from '../models/formation.model';
import { Matiere } from '../models/matieres.model';
import { Professeur } from '../models/professeur.model';
import { Etudiant } from '../models/etudiant.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class EtablissemnentService {
  constructor() {
    this.getSchoolData();
}
  school: Etablissement[] = [];
  schoolFormationData: Formation[] = [];
  schoolMatiere: Matiere[] = [];
  schoolProfesseur: Professeur[] = [];
  schoolEtudiant: Etudiant[] = [];
  schoolSubject = new Subject<Etablissement[]>();
  schoolFormationSubject = new Subject<Formation[]>();
  schoolMatiereSubject = new Subject<Matiere[]>();
  schoolProfesseurSubject = new Subject<Professeur[]>();
  schoolEtudiantSubject = new Subject<Etudiant[]>();

  emitSchool() {
    this.schoolSubject.next(this.school);
  }

  emitSchoolFormationData() {
    this.schoolFormationSubject.next(this.schoolFormationData);
  }

  emitSchoolMatiere() {
    this.schoolMatiereSubject.next(this.schoolMatiere);
  }

  emitSchoolProfesseur() {
    this.schoolProfesseurSubject.next(this.schoolProfesseur);
  }

  emitSchoolEtudiant() {
    this.schoolEtudiantSubject.next(this.schoolEtudiant);
  }

  saveSchool() {
    firebase.database().ref('/etablissement').set(this.school);
  }

  saveFormationSchool(id: number) {
    firebase.database().ref('/etablissement/' + id + '/formation').set(this.schoolFormationData);
  }

  saveSchoolMatiere(id: number, idFormation: number) {
    firebase.database().ref('/etablissement/' + id + '/formation/' + idFormation + '/matiere').set(this.schoolMatiere);
  }

  saveSchoolProfesseur(id: number, idFormation: number) {
    firebase.database().ref('/etablissement/' + id + '/formation/' + idFormation + '/professeur').set(this.schoolProfesseur);
  }

  saveSchoolEtudiant(id: number, idFormation: number) {
    firebase.database().ref('/etablissement/' + id + '/formation/' + idFormation + '/etudiant').set(this.schoolEtudiant);
  }

  getSchoolData() {
    firebase.database().ref('/etablissement')
      .on('value', (data: DataSnapshot) => {
          this.school = data.val() ? data.val() : [];
          this.emitSchool();
        }
      );
  }

  getFormationData(id: number) {
    firebase.database().ref('/etablissement/' + id + '/formation')
      .on('value', (data: DataSnapshot) => {
          console.log('data === ',data.val())
          this.schoolFormationData = data.val() ? data.val() : [];
          this.emitSchoolFormationData();
        }
      );
  }

  getMatiereData(id: number, idFormation: number) {
    firebase.database().ref('/etablissement/' + id + '/formation/' + idFormation + '/matiere')
      .on('value', (data: DataSnapshot) => {
          console.log('data === ',data.val())
          this.schoolMatiere = data.val() ? data.val() : [];
          this.emitSchoolMatiere();
        }
      );
  }

  getProfesseurData(id: number, idFormation: number) {
    firebase.database().ref('/etablissement/' + id + '/formation/' + idFormation + '/professeur')
      .on('value', (data: DataSnapshot) => {
          console.log('data === ',data.val())
          this.schoolProfesseur = data.val() ? data.val() : [];
          this.emitSchoolProfesseur();
        }
      );
  }

  getEtudiantData(id: number, idFormation: number) {
    firebase.database().ref('/etablissement/' + id + '/formation/' + idFormation + '/etudiant')
      .on('value', (data: DataSnapshot) => {
          console.log('data === ',data.val())
          this.schoolEtudiant = data.val() ? data.val() : [];
          this.emitSchoolEtudiant();
        }
      );
  }

  getSingleShcoolEtudiant(id: number, idFormation: number, idEtudiant: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/etablissement/' + id + '/formation/' + idFormation + '/etudiant/' + idEtudiant).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getSingleShcoolProfesseur(id: number, idFormation: number, idProfesseur: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/etablissement/' + id + '/formation/' + idFormation + '/professeur/' + idProfesseur).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getSingleShcoolMatiere(id: number, idFormation: number, idMatiere: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/etablissement/' + id + '/formation/' + idFormation + '/matiere/' + idMatiere).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getSingleFormationShcool(id: number, idFormation: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/etablissement/' + id + '/formation/' + idFormation).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getSingleShcool(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/etablissement/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewSchool(newSchool: Etablissement) {
    this.school.push(newSchool);
    this.saveSchool();
    this.emitSchool();
  }

  createNewFormationSchool(newFormation: Formation, id: number) {
    console.log(newFormation)
    this.schoolFormationData.push(newFormation);
    this.saveFormationSchool(id);
    this.emitSchoolFormationData();
  }

  createNewSchoolMatiere(newMatiere: Matiere, id: number, idFormation: number) {
    console.log(newMatiere)
    this.schoolMatiere.push(newMatiere);
    this.saveSchoolMatiere(id, idFormation);
    this.emitSchoolMatiere();
  }

  createNewSchoolProfesseur(newTeacher: Professeur, id: number, idFormation: number) {
    console.log(newTeacher)
    this.schoolProfesseur.push(newTeacher);
    this.saveSchoolProfesseur(id, idFormation);
    this.emitSchoolProfesseur();
  }

  createNewSchoolEtudiant(newStudent: Etudiant, id: number, idFormation: number) {
    console.log(newStudent)
    this.schoolEtudiant.push(newStudent);
    this.saveSchoolEtudiant(id, idFormation);
    this.emitSchoolEtudiant();
  }

  removeSchoolEtudiant(etudiant: Etudiant, id: number, idFormation: number) {
    const schoolEtudiantIndexToRemove = this.schoolEtudiant.findIndex(
      (etudiantEl) => {
        if(etudiantEl === etudiant) {
          return true;
        }
      }
    );
    this.schoolEtudiant.splice(schoolEtudiantIndexToRemove, 1);
    this.saveSchoolEtudiant(id, idFormation);
    this.emitSchoolEtudiant();
  }

  removeSchoolProfesseur(professeur: Professeur, id: number, idFormation: number) {
    const schoolProfesseurIndexToRemove = this.schoolProfesseur.findIndex(
      (professeurEl) => {
        if(professeurEl === professeur) {
          return true;
        }
      }
    );
    this.schoolProfesseur.splice(schoolProfesseurIndexToRemove, 1);
    this.saveSchoolProfesseur(id, idFormation);
    this.emitSchoolProfesseur();
  }

  removeSchoolMatiere(matiere: Matiere, id: number, idFormation: number) {
    const schoolMatiereIndexToRemove = this.schoolMatiere.findIndex(
      (matiereEl) => {
        if(matiereEl === matiere) {
          return true;
        }
      }
    );
    this.schoolMatiere.splice(schoolMatiereIndexToRemove, 1);
    this.saveSchoolMatiere(id, idFormation);
    this.emitSchoolMatiere();
  }

  removeFormationSchool(formation: Formation, id: number) {
    const schoolFormationIndexToRemove = this.schoolFormationData.findIndex(
      (formationEl) => {
        if(formationEl === formation) {
          return true;
        }
      }
    );
    this.schoolFormationData.splice(schoolFormationIndexToRemove, 1);
    this.saveFormationSchool(id);
    this.emitSchoolFormationData();
  }

  removeSchool(school: Etablissement) {
    const schoolIndexToRemove = this.school.findIndex(
      (userEl) => {
        if(userEl === school) {
          return true;
        }
      }
    );
    this.school.splice(schoolIndexToRemove, 1);
    this.saveSchool();
    this.emitSchool();
  }
}
