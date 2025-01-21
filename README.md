# Machine de Turing

### Yassine Benkirane

TP1 de Maths pour l'info

Simulateur d'une Machine de Turing basé sur un fichier .mt

L'exécution se fait pas à pas ou automatiquement jusqu'à la fin pour avoir le résultat.



## Accès

### En ligne

[machinedeturing.vercel.app](https://machinedeturing.vercel.app)

### En local

Il faut nodeJS et npm

#### Dans le dossier, lancer les commandes :
`npm install`

`npm run build`


## Infos

app React via Vite
Écrit en TypeScript


Le fichier représentant la Machine de Turing doit finir par .mt et être de cette forme :

```
/** States **/
q0
q1
q2

/** Input symbols **/
a
b
c

/** Tape alphabet **/
a
b

/** Blank symbol **/
#

/** Initial state **/
q0

/** Final states **/
q2
q3

/** Transitions **/
q0,a->q2,A,R
q1,a->q3,A,R
```