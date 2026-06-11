# Étapes de Conteneurisation du Projet de Soutenance

Ce document détaille la réalisation technique du projet "Task Manager" conformément au sujet de soutenance Docker.

## 1. Conception de l'Application
L'application est composée de trois couches (Full Stack) :
- **Frontend** : Interface utilisateur en HTML/JS.
- **Backend** : API REST Node.js/Express.
- **Database** : MongoDB pour le stockage.

## 2. Stratégie de Conteneurisation

### Dockerfile Backend
- Image de base : `node:18-alpine` (légère et sécurisée).
- Gestion des dépendances via `npm install`.
- Gestion des erreurs et logs de connexion améliorés pour la stabilité.

### Dockerfile Frontend
- Image de base : `nginx:alpine`.
- Utilisation de `nginx.conf` comme **Reverse Proxy** : les appels vers `/api` sont redirigés de manière transparente vers le conteneur backend. Cela évite les problèmes de CORS et simplifie l'architecture.

## 3. Orchestration Docker Compose
Le fichier `docker-compose.yml` est le cerveau du projet.

### Réseaux (Networking)
Nous avons mis en place une segmentation réseau pour la sécurité :
- `frontend-backend` : Pour le trafic web.
- `backend-db` : Pour l'accès aux données (totalement isolé de l'extérieur).

### Persistance (Volumes)
Le volume nommé `mongodb_data` est attaché au conteneur MongoDB. Il stocke physiquement les données sur l'hôte, permettant une persistance totale même après un `docker compose down`.

### Fiabilité (Healthchecks)
Le service `backend` possède une dépendance `service_healthy` sur `mongodb`. Le backend ne démarre que lorsque MongoDB répond avec succès à un "ping" interne.

## 4. Guide de Test pour la Soutenance

### Test de Communication
1. Lancer les conteneurs : `docker compose up -d`.
2. Accéder à `localhost:8080`.
3. Ajouter une tâche. Si elle s'affiche, la chaîne de communication (Web -> Nginx -> Node.js -> MongoDB) est validée.

### Test de Persistance
1. Ajouter plusieurs tâches.
2. Supprimer les conteneurs : `docker compose down`.
3. Relancer : `docker compose up -d`.
4. Vérifier que les tâches sont conservées.

## 5. Livraison Docker Hub
Conformément aux exigences, les images peuvent être publiées ainsi :
```bash
# Tagging
docker tag soutenance-backend <votre_username>/soutenance-backend:1.0
docker tag soutenance-frontend <votre_username>/soutenance-frontend:1.0

# Push
docker push <votre_username>/soutenance-backend:1.0
docker push <votre_username>/soutenance-frontend:1.0
```
