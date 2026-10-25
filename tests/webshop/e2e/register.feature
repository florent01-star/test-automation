# language: fr
Fonctionnalité: Inscription d'un utilisateur

  Contexte:
    Etant donné que je suis sur la page d'inscription

  Plan du scénario: Inscription avec des informations valides
    Quand je m'inscris en tant que '<genre>' avec le prénom '<prenom>', le nom '<nom>' et le mot de passe '<mdp>'
    Alors le message 'Your registration completed' est affiché
    Et je suis connecté avec le compte créé

    Exemples:
      | genre  | prenom | nom      | mdp      |
      | Male   | Flo    | Novembre | password |
      | Female | Elo    | Novembre | password |

  Scénario: Inscription avec un email déjà utilisé
    Etant donné qu'un compte existe avec l'email 'testflorent2@gmail.com'
    Quand je m'inscris avec l'email 'testflorent2@gmail.com'
    Alors le message d'erreur 'The specified email already exists' est affiché en rouge

  Plan du scénario: Inscription avec un champ obligatoire manquant
    Quand je m'inscris sans renseigner le champ '<champ>'
    Alors le message d'erreur '<message>' est affiché en rouge

    Exemples:
      | champ      | message                 |
      | Last Name  | Last name is required.  |
      | First Name | First name is required. |
      | Email      | Email is required.      |

  Scénario: Inscription avec des mots de passe différents
    Quand je m'inscris avec le mot de passe 'password' et la confirmation 'password1'
    Alors le message d'erreur 'The password and confirmation password do not match.' est affiché en rouge

  Plan du scénario: Inscription avec un mot de passe trop court
    Quand je m'inscris avec le mot de passe '<mdp>'
    Alors le message d'erreur 'The password should have at least 6 characters.' est affiché en rouge

    Exemples:
      | mdp  |
      | pass |
      | a    |

  Scénario: Inscription avec un email invalide
    Quand je m'inscris avec l'email 'test'
    Alors le message d'erreur 'Wrong email' est affiché en rouge