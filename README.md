# Uniquement sur cette branche 

Sur cette branche se trouve les premiers tests de nodeJS que je push afin que tout le monde puisse voir un peu comment ça marche. Actuellement c'est simplement un chat entre deux sessions mais c'est voué à être améliorer, il s'agit la des premiers test. Pour lancer le server : allez dans le répertoire /server et faire la commande

`npm run dev`

ensuite allez sur

`localhost:8080`

## Dernière amélioration : 

désormais on peut créer des rooms qui permettent de créer une session entre seulement deux utilisateurs comme le jeu devrait fonctionner.

**Pour créer une room** : saisir un nom d'utilisateur puis créer la session => vous êtes dans une page d'attente avec un lien personnaliser pour inviter des gens.

**Pour rejoindre une room** : deux solution
- Utiliser le lien personnaliser d'une session privé -> rentrer son pseudo -> cliquer sur rejoindre
- Une fois sur le lien la liste des rooms ouvertes est affiché -> entrer son pseudo -> rejoindre une des rooms


## En cours de dev :

- Je travail donc sur le fait de créer pour chaque nouvel utilisateur un carré rouge correspondant à son personnage et de lui permettre de le déplacer et de rendre visible le déplacement pour tout les joueurs connecté au server.
- permettre de créer des sessions complètements privé ou le lien personnaliser sera obligatoire pour rejoindre la sessions
- améliorer l'ui quand on est sur un lien personnaliser (pas prioritaire)

Si vous voulez taffer dessus hésitez pas à tirer une branche. Si vous avez des questions ou des suggestions je prend par ce que je pense que il y a des trucs qui vont pas dans ce que j'ai fais.

Cette branche est voué à être supprimé à l'avenir ou merge dans le master si les tests sont concluents.

# Student bros JS

Le but de cette SAE sera de développer un jeu full javascript inspiré du jeu "Mario Bros". Un "étudiant" devra se déplacer, en scrolling horizontal, dans un monde rempli de distractions, et accumuler de la connaissance et du savoir pour vaincre le boss de l'ignorance.

## Contraintes
- Présence de deux modes de jeu : simple ou multijoueur en réseau.
- Respect d'une qualité de conception et de codage.
- Couverture de test maximale




## Liens utiles

- [nodejs + conteneur](https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/)

