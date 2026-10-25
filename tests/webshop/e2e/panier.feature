# language: fr
Fonctionnalité: Panier

  Contexte:
    Etant donné que je suis sur la page du panier

  Plan du scénario: Supprimer un article parmi trois
    Etant donné que j'ai 3 articles différents dans mon panier
    Et que je suis sur la page du panier
    Quand je supprime l'article '<article>'
    Alors le panier contient 2 articles
    Et l'article '<article>' n'apparait plus dans le panier

    Exemples:
      | article          |
      | Blue Jeans       |
      | Casual Golf Belt |

  Plan du scénario: Modifier la quantité met à jour les totaux
    Etant donné que j'ai 2 articles différents dans mon panier
    Et que je suis sur la page du panier
    Quand je modifie la quantité de l'article '<article>' à '<quantite>'
    Et je clique sur "Update cart"
    Alors le total de la ligne '<article>' correspond au prix unitaire multiplié par '<quantite>'
    Et le sous-total du panier correspond à la somme des lignes

    Exemples:
      | article          | quantite |
      | Blue Jeans       | 5        |
      | Casual Golf Belt | 7        |

  Scénario: Appliquer un code de réduction invalide
    Etant donné que j'ai 1 article dans mon panier
    Et que je suis sur la page du panier
    Quand je saisis le code de réduction "CODEINVALIDE123"
    Et je clique sur "Apply coupon"
    Alors le message "The coupon code you entered couldn't be applied to your order" est affiché

  Scénario: Appliquer un code de réduction valide
    Etant donné que j'ai 1 article dans mon panier
    Et que je suis sur la page du panier
    Quand je saisis le code de réduction "PercentageTotal"
    Et je clique sur "Apply coupon"
    Alors le message "The coupon code was applied" est affiché
    Et le montant total du panier après réduction est inférieur au sous-total initial

  Scénario: Checkout sans accepter les conditions générales
    Etant donné que j'ai 1 article dans mon panier
    Et que je suis sur la page du panier
    Quand je ne coche pas l'acceptation des conditions
    Et je clique sur "Checkout"
    Alors le message "Please accept the terms of service before the next step." est affiché
    Et je reste sur la page du panier

  Plan du scénario: Estimer les frais de livraison
    Etant donné que j'ai 1 article dans mon panier
    Et que je suis sur la page du panier
    Quand je sélectionne le pays '<pays>'
    Et je saisis le code postal '<code_postal>'
    Et je clique sur "Estimate shipping"
    Alors les options de livraison sont affichées avec leur coût

    Exemples:
      | pays          | code_postal |
      | United States | 90210       |
      | France        | 75001       |

  Scénario: Continuer ses achats depuis le panier
    Etant donné que j'ai 1 article dans mon panier
    Et que je suis sur la page du panier
    Quand je clique sur "Continue shopping"
    Alors je suis redirigé sur la page d'accueil

  Scénario: Appliquer une carte cadeau invalide
    Etant donné que j'ai 1 article dans mon panier
    Et que je suis sur la page du panier
    Quand je saisis le code de carte cadeau "GIFT-INVALID-123"
    Et je clique sur "Add gift card"
    Alors le message "The coupon code you entered couldn't be applied to your order" est affiché

  Scénario: Vider entièrement le panier
    Etant donné que j'ai 3 articles différents dans mon panier
    Et que je suis sur la page du panier
    Quand je supprime tous les articles du panier
    Alors le panier est vide
    Et le message "Your Shopping Cart is empty!" est affiché