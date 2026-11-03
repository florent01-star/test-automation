# language: fr
@mode:serial
Fonctionnalité: Commande

  Contexte:
    Etant donné que je suis sur la page du panier
    Et que je supprime tous les articles du panier
    Et que je suis sur la page d'accueil

  Scénario: Commander en mode invité
    Etant donné que j'ai 10 article "Blue Jeans" dans mon panier
    Et que je suis sur la page du panier
    Et que je sauvegarde le montant total du panier
    Quand je coche l'acceptation des conditions générales
    Et je clique sur "Checkout"
    Et je choisis de commander en tant qu'invité
    Et je renseigne l'adresse de facturation pour un invité
    Et je choisis la méthode de livraison "Ground"
    Et je choisis le moyen de paiement "Check / Money Order"
    Et je clique sur "Continue"
    Et je clique sur "Confirm"
    Alors le message "Your order has been successfully processed!" est affiché
    Et une référence de commande m'est fournie
    Et le statut de la commande est "Pending"

  Scénario: Commander en étant déjà connecté avec une adresse sauvegardée
    Etant donné que je suis connecté avec mail et mot de passe
    Et que je supprime tous les articles du panier
    Et que j'ai 10 article "Blue Jeans" dans mon panier
    Et que je suis sur la page du panier
    Quand je coche l'acceptation des conditions générales
    Et je clique sur "Checkout"
    Et je sélectionne l'adresse de facturation sauvegardée
    Et je choisis la méthode de livraison "Ground"
    Et je choisis le moyen de paiement "Check / Money Order"
    Et je clique sur "Continue"
    Et je clique sur "Confirm"
    Alors le message "Your order has been successfully processed!" est affiché
    Et une référence de commande m'est fournie
    Et le statut de la commande est "Pending"

  Scénario: Commander en étant connecté et en ayant un code de réduction 
    Etant donné que je suis connecté avec mail et mot de passe
    Et que je supprime tous les articles du panier
    Et que j'ai 10 article "Blue Jeans" dans mon panier
    Et que je suis sur la page du panier
    Quand je saisis le code de réduction "PercentageTotal"
    Et je clique sur "Apply coupon"
    Alors le message "The coupon code was applied" est affiché
    Et le montant total du panier après réduction est inférieur au sous-total initial
    Quand je coche l'acceptation des conditions générales
    Et je clique sur "Checkout"
    Et je sélectionne l'adresse de facturation sauvegardée
    Et je choisis la méthode de livraison "Ground"
    Et je choisis le moyen de paiement "Check / Money Order"
    Et je clique sur "Continue"
    Et je clique sur "Confirm"
    Alors le message "Your order has been successfully processed!" est affiché
    Et une référence de commande m'est fournie
    Et le statut de la commande est "Pending"

  Scénario: Commander en étant connecté sans adresse sauvegardée
    Etant donné que je suis connecté sans adresse sauvegardée
    Et que ce compte n'a aucune adresse sauvegardée
    Et que je supprime tous les articles du panier
    Et que j'ai 10 article "Blue Jeans" dans mon panier
    Et que je suis sur la page du panier
    Quand je coche l'acceptation des conditions générales
    Et je clique sur "Checkout"
    Et je renseigne une nouvelle adresse de facturation sans la sauvegarder
    Et je choisis la méthode de livraison "Ground"
    Et je choisis le moyen de paiement "Check / Money Order"
    Et je clique sur "Continue"
    Et je clique sur "Confirm"
    Alors le message "Your order has been successfully processed!" est affiché
    Et une référence de commande m'est fournie
    Et le statut de la commande est "Pending"