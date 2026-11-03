# language: fr
@mode:serial
Fonctionnalité: Moyens de paiement

  Contexte:
    Etant donné que je suis sur la page d'accueil
    Et que je suis connecté avec mail et mot de passe
    Et que je suis sur la page du panier
    Et que je supprime tous les articles du panier
    Et que j'ai 10 article "Blue Jeans" dans mon panier
    Et que je suis sur la page du panier
    Et que je coche l'acceptation des conditions générales
    Et que je clique sur "Checkout"
    Et que je sélectionne l'adresse de facturation sauvegardée
    Et que je choisis la méthode de livraison "Ground"

  Plan du scénario: Commander avec le moyen de paiement '<moyen_paiement>'
    Quand je choisis le moyen de paiement '<moyen_paiement>'
    Et je clique sur "Continue"
    Et je clique sur "Confirm"
    Alors le message "Your order has been successfully processed!" est affiché
    Et une référence de commande m'est fournie

    Exemples:
      | moyen_paiement      |
      | Check / Money Order |
      | Cash On Delivery    |

  Scénario: Payer avec Purchase Order avec un numéro de bon de commande
    Quand je choisis le moyen de paiement "Purchase Order"
    Et je renseigne le numéro de bon de commande "PO-12345"
    Et je clique sur "Continue"
    Et je clique sur "Confirm"
    Alors le message "Your order has been successfully processed!" est affiché
    Et une référence de commande m'est fournie

  Scénario: Payer par carte bancaire avec des informations valides
    Quand je choisis le moyen de paiement "Credit Card"
    Et je sélectionne le type de carte "Visa"
    Et je renseigne le titulaire de la carte "Flo Novembre"
    Et je renseigne le numéro de carte "4485564059489345"
    Et je renseigne la date d'expiration "04/2028"
    Et je renseigne le code de sécurité "123"
    Et je clique sur "Continue"
    Et je clique sur "Confirm"
    Alors le message "Your order has been successfully processed!" est affiché
    Et une référence de commande m'est fournie

  Scénario: Payer par carte bancaire avec un numéro invalide
    Quand je choisis le moyen de paiement "Credit Card"
    Et je sélectionne le type de carte "Visa"
    Et je renseigne le titulaire de la carte "Flo Novembre"
    Et je renseigne le numéro de carte "1234"
    Et je renseigne la date d'expiration "04/2028"
    Et je renseigne le code de sécurité "123"
    Et je clique sur "Continue"
    Alors un message d'erreur concernant le numéro de carte est affiché
    Et je ne peux pas confirmer la commande

  Scénario: Payer avec Purchase Order sans numéro de bon de commande
    Quand je choisis le moyen de paiement "Purchase Order"
    Et je clique sur "Continue"
    Et je clique sur "Confirm"
    Alors le message "Your order has been successfully processed!" est affiché
    Et une référence de commande m'est fournie