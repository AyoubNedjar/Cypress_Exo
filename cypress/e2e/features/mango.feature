Feature: Recherche et navigation sur le site Mango
  Afin de vérifier les fonctionnalités principales du site Mango
  En tant qu'utilisateur
  Je veux pouvoir rechercher un produit et accéder à un produit via le menu

  Background:
    Given je suis sur la page d'accueil Mango
    And j'accepte les cookies

  Scenario: TC1 - Recherche de "robe maille"
    When j'ouvre la barre de recherche
    And je saisis "robe maille" dans la barre de recherche
    And je lance la recherche
    Then au moins un produit de la liste des résultats contient le texte "robe maille"

  Scenario: TC2 - Navigation jusqu'à un produit via le menu et clic sur Ajouter
    When j'ouvre le menu principal
    And je navigue vers "Nouvelle Collection" puis "Accessoires en cuir"
    And j'ouvre la fiche produit "Bottes suède talon"
    And je clique sur le bouton "Ajouter" sur la fiche produit
    Then l'action Ajouter est effectuée sans erreur
