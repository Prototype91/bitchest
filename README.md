# BitChest - 13/09/2021

`Lecomte Dylan / Herillard Kenny`

## Description

BitChest est une application web vous permettant, une fois connecté à votre session, d'acheter et vendre des cryptomonnaies ainsi que d'y consulter les cours associés. 

En tant qu'Admin, vous pourrez également ajouter, modifier ou supprimer un utilisateur du site BitChest.

### Cryptomonnaies disponibles sur BitChest :
- Bitcoin
- Ethereum
- Ripple
- Bitcoin-Cash
- Cardano
- Litecoin
- Nem
- Stellar
- Iota
- Dash

## Avant-propos

### bitchest_back :

Créer une base de donnée sur `phpMyAdmin`

`composer install` puis `npm install` pour installer toutes les dépendances

Créer un fichier `.env` à la racine, copier-coller le contenu du fichier `.env.example`

Configurer le fichier `.env` avec `DB_DATABASE={{DATABASE_NAME}}`

Générer une clé avec `php artisan key:generate`

`php artisan migrate:refresh --seed` pour générer vos users, .

`php artisan serve` pour se mettre en écoute 

### bitchest_client :

`npm install` pour installer toutes les dépendances nécessaires

`npm run start` pour se lancer dans le monde de la cryptomonnaie

## Utilisateurs :

- Utilisateurs Standards : </br>

`mail` : kenny@kenny.fr </br>
`password` : kenny

`mail` : jean@dupont.fr </br>
`password` : jean

- Utilisateurs Admin : </br>

`mail` : dylan@dylan.fr </br>
`password` : dylan

`mail` : sandrine@oyarsabal.fr </br>
`password` : sandrine
