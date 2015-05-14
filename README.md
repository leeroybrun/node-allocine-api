# node-allocine-api

[![NPM](https://nodei.co/npm/allocine-api.png)](https://nodei.co/npm/allocine-api/)

Module Node.js permettant d'accéder à l'API d'Allociné.

Aucune dépendance nécessaire ! Il utilise uniquement des modules du core.

Il s'agit de l'un de mes premiers modules Node.js, donc soyez indulgents et n'hésitez pas à me suggerer des améliorations !

## Installation

Pour l'installer, ajoutez-le aux dépendances de votre fichier package.json :

```json
"dependencies" : {
	...
    "allocine-api": "*"
}
```

Appelez ensuite simplement `npm install`, et npm installera le module pour vous.

Vous pouvez aussi simplement appeler `npm install allocine-api`.

## Utilisation

Pour l'utiliser, incluez-le simplement dans les fichiers de votre application :

```javascript
var allocine = require('allocine-api');
```

### API

Pour l'instant ce module ne comprend qu'une seule méthode pour accéder à l'API. Celle-ci est plus que suffisante puisqu'elle vous permet d'appeler l'API comme bon vous semble. D'autres méthodes feront peut-être leur apparition plus tard afin de faciliter l'accès à l'API.

Pour plus d'informations sur l'API Allociné, je vous invite à vous rendre sur le wiki de Gromez : http://wiki.gromez.fr/dev/api/allocine_v3

#### allocine.api(method, options, callback)

Cette fonction va appeler l'API définie (`method`) en lui fournissant les `options` (objet) passées en paramètre, puis appelera la fonction de `callback`. Le callback reçoit deux paramètres, le premier est un objet d'erreur (null si aucune erreur), et le deuxième est le résultat retourné par l'API sous forme d'objet.

Exemples :
```javascript
// Recherche de tous les films "spiderman"
allocine.api('search', {q: 'spiderman', filter: 'movie'}, function(error, results) {
	if(error) { console.log('Error : '+ error); return; }
	
	console.log('Voici les données retournées par l\'API Allociné:');
	console.log(results);
});

// Informations sur un film particulier
allocine.api('movie', {code: '143067'}, function(error, result) {
	if(error) { console.log('Error : '+ error); return; }

	console.log('Voici les données retournées par l\'API Allociné:');
	console.log(result);
});
```

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/leeroybrun/node-allocine-api/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
