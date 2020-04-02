export class User {
    matieres: string;
    formation: string;
    post: string;
    constructor(public nom: string, public prenom: string, public droit: string, public mail: string, public password: string) {
    }
  }