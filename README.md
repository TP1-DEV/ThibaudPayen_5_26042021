# ORINOCO

Projet 5 du parcours développeur web Openclassrooms : "Construisez un site e-commerce"

## Prérequis

- [NodeJs](https://nodejs.org/en/)

## Installation

- Cloner le repo.
- Depuis le répertoire /backend, exécuter `npm install` puis exécuter `node server`. Le serveur doit démarrer sur http://localhost:3000 par défaut. Si le serveur doit démarrer sur un autre port pour n'importe quelle raison, le port sera mentionné dans la console.
- Depuis le répertoire /frontend, exécuter `npm install` puis exécuter `npm run build` pour générer les fichiers nécessaires.
- Enfin, le serveur web doit être lancé depuis la racine du repo et vous devrez atteindre le chemin <http://localhost:votre_port/frontend/src/html/index.html>.

## Tests unitaires

- Des tests unitaires réalisés avec Jest ont été mis en place
- Exécuter `npx jest` depuis le répertoire /frontend.

## Scénario

Félicitations ! Vous avez été recruté en tant que développeur front-end par Orinoco, une entreprise de commerce en ligne. 

Son credo ? Se démarquer des grands site e-commerce comme Amazon en créant des applications thématiques ne vendant qu’un seul groupe de produits. Il y a par exemple Oribook pour les livres ou Oritextil pour les vêtements.

Vos compétences en développement web et votre personnalité ont plu à Paul, le fondateur de l’entreprise.

Dans un premier temps, Paul souhaite créer un premier MVP pour démontrer le fonctionnement de ses applications à ses investisseurs.

L’équipe est constituée de Jeanne, développeuse back-end travaillant sur les API et vous, pour la partie front-end.

## L’application web sera composée de 4 pages :

- une page de vue sous forme de liste, montrant tous les articles disponibles
à la vente.
- une page “produit”, qui affiche de manière dynamique l'élément
sélectionné par l'utilisateur et lui permet de personnaliser le produit et de
l'ajouter à son panier.
- une page “panier” contenant un résumé des produits dans le panier, le prix
total et un formulaire permettant de passer une commande. Les données
du formulaire doivent être correctes et bien formatées avant d'être
renvoyées au back-end. Par exemple, pas de texte dans les champs date.
- une page de confirmation de commande, remerciant l'utilisateur pour sa
commande, et indiquant le prix total et l'identifiant de commande envoyé
par le serveur.

## Compétences évaluées

- Interagir avec un web service avec JavaScript
- Valider des données issues de sources externes
- Créer un plan de test pour une application
- Gérer des événements JavaScript