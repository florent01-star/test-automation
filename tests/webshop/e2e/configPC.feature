Fonctionnalité: Configuration d'un ordinateur classique

  Contexte:
    Etant donné que je suis sur la page "Build your own computer"

  Plan du scénario: Le PC configuré est correct dans le panier
    Quand je configure l'ordinateur avec:
      | Processor | <processor> |
      | RAM       | <ram>       |
      | HDD       | <hdd>       |
      | OS        | <os>        |
      | Software  | <software>  |
    Et j'ajoute l'ordinateur au panier
    Et je consulte le panier
    Alors je retrouve les options choisies
      | Processor | <processor> |
      | RAM       | <ram>       |
      | HDD       | <hdd>       |
      | OS        | <os>        |
      | Software  | <software>  |
    Et le panier contient 1 article

    Exemples:
      | profil    | processor                                      | ram           | hdd            | os                       | software                       |
      | cheap     | 2.2 GHz Intel Pentium Dual-Core E2200          | 2 GB          | 320 GB         | Windows 10 [+60.00]      | Aucun                          |
      | normal    | 2.5 GHz Intel Pentium Dual-Core E2200 [+15.00] | 8GB [+60.00]  | 320 GB         | Ubuntu                   | Acrobat Reader [+10.00]        |

  Plan du scénario: Les suppléments des options de ram sont corrects dans le panier
    Quand je configure l'ordinateur avec:
      | Processor | 2.5 GHz Intel Pentium Dual-Core E2200 [+15.00] |
      | RAM       | <ram>               |
      | HDD       | 320 GB              |
      | OS        | Windows 10 [+60.00] |
      | Software  | Aucun               |
    Et j'ajoute l'ordinateur au panier
    Et je consulte le panier
    Alors le sous-total du panier est '<subtotal>'

    Exemples:
      | ram          | subtotal |
      | 2 GB         | 1275.00  |
      | 4GB [+20.00] | 1295.00  |
      | 8GB [+60.00] | 1335.00  |

  Plan du scénario: Une option payante software est reflétée dans le panier
    Quand je configure l'ordinateur avec:
      | Processor | 2.2 GHz Intel Pentium Dual-Core E2200 |
      | RAM       | 4GB [+20.00]         |
      | HDD       | 320 GB               |
      | OS        | Windows 10 [+60.00]  |
      | Software  | <software>           |
    Et j'ajoute l'ordinateur au panier
    Et je consulte le panier
    Alors le sous-total du panier est '<subtotal>'

    Exemples:
      | software                    | subtotal |
      | Aucun                       | 1280.00  |
      | Acrobat Reader [+10.00]     | 1290.00  |
      | Microsoft Office [+50.00]   | 1330.00  |
      | Total Commander [+5.00]     | 1285.00  |