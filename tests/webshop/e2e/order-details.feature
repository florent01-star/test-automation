# language: fr
Fonctionnalité: Détail d'une commande

  Contexte:
    Etant donné que je suis sur la page d'accueil
    Et que je suis connecté avec l'email "testflorent2@gmail.com" et le mot de passe "Tosca1234!"
    Et que je suis sur la page du panier
    Et que je supprime tous les articles du panier

  Scénario: Consulter le détail de la dernière commande
    Etant donné que j'ai passé une commande avec un article "Blue Jeans"
    Et que je sauvegarde la référence de cette commande
    Et que je navigue vers l'historique de mes commandes
    Quand j'ouvre le détail de la commande sauvegardée
    Alors la page de détail affiche la référence de la commande
    Et la page de détail affiche le statut "Pending"
    Et la page de détail contient l'article "Blue Jeans"
    Et la page de détail affiche le montant total de la commande

  Scénario: Vérifier le moyen de paiement dans le détail
    Etant donné que j'ai passé une commande avec un article "Blue Jeans"
    Et que je sauvegarde la référence de cette commande
    Et que je navigue vers l'historique de mes commandes
    Quand j'ouvre le détail de la commande sauvegardée
    Alors la page de détail mentionne le moyen de paiement utilisé
    Et la page de détail mentionne la méthode de livraison "Ground"

  Scénario: Vérifier qu'une réduction est appliquée
    Etant donné que j'ai passé une commande avec le code de réduction "PercentageTotal"
    Et que je sauvegarde la référence de cette commande
    Et que je navigue vers l'historique de mes commandes
    Quand j'ouvre le détail de la commande sauvegardée
    Alors la page de détail mentionne la réduction appliquée
    Et le montant total de la commande est inférieur au sous-total des articles