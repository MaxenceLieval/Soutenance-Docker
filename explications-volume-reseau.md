1. Le Réseau Docker (Isolation et Sécurité)
  Dans Docker, un réseau ne sert pas seulement à faire communiquer les services, il sert aussi à isoler ceux qui ne devraient pas se parler.

  Dans votre projet, j'ai créé deux réseaux distincts :
   * Réseau A (frontend-backend) : Le Frontend et le Backend peuvent se parler.
   * Réseau B (backend-db) : Le Backend et MongoDB peuvent se parler.

  Pourquoi c'est important pour votre examen ?
  Si un pirate arrive à prendre le contrôle de votre conteneur Frontend (celui qui est exposé sur internet via le port 8080), il ne pourra même pas voir que la base de données existe. MongoDB est sur
  un réseau totalement invisible pour lui. C'est le principe du "moindre privilège".

  ---

  2. Le Volume (Où sont les données ?)
  Quand vous écrivez ceci dans votre docker-compose.yml :

   1 volumes:
   2   mongodb_data:
  Docker crée un dossier géré par le système sur votre machine hôte (votre ordinateur).

   * Sur Linux (votre cas), Docker stocke physiquement ces fichiers dans :
      /var/lib/docker/volumes/soutenance_mongodb_data/_data
   * Comment ça marche ? Docker "monte" (branche) ce dossier de votre ordinateur directement à l'intérieur du conteneur MongoDB dans le dossier /data/db.

  L'analogie simple :
  Le conteneur est comme un lecteur DVD (il peut être remplacé), et le volume est comme le DVD lui-même (vos données). Si vous changez de lecteur DVD, vos films sont toujours là sur le disque !

  Comment le prouver oralement ?
  Vous pouvez dire : "Nous avons utilisé un volume nommé (named volume) pour détacher le cycle de vie des données de celui du conteneur. Même si nous supprimons le conteneur MongoDB, les fichiers
  stockés dans /var/lib/docker/volumes/ de l'hôte persistent."