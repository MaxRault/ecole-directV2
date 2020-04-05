export class Etablissement {
    id: number;
    formation: {
      nom: string;
      annee: string;
      commentaire: string;
      };
      etudiant: {
        nom: string;
        prenom: string;
        dateNaisse: string;
        mail: string;
        tel: string;
      };
      matieres: {
        nom: string;
        nomProf: string;
        commentaire: string;
      };
    constructor(public nom: string, public adresse: string) {
    }
  }