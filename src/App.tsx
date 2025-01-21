import React from "react";

import { useEffect, useState } from 'react'
import './App.css'



const App = () => {



// ------------------------------------------------------- ETATS -------------------------------------------------------


  // actuel
  const [ruban, setRuban] = useState(['0','0','0','0','0','0','0','0','0','0','0','0','0']);
  const [tete, setTete] = useState(6);
  const [etat, setEtat] = useState('0');

 

  // fichier
  const [fichier, setFichier] = useState('');
  // données fichier
  const [tableAlphabet, setTableAlphabet] = useState(['']);

  const [blank, setBlank] = useState('');

  const [etatInitial, setEtatInitial] = useState('');
  const [etatsFinaux, setEtatsFinaux] = useState(['']);

  const [transitions, setTransitions] = useState<{ etat: string; symbole: string; etatSuivant: string; ecrire: string; deplacement: string; }[]>([]);
















// ------------------------------------------------------- RUBAN EDITABLE -------------------------------------------------------
  

  // État pour gérer la visibilité du composant RubanEditable
  const [isAvancerPossible, setIsAvancerPossible] = useState(true);

  // État pour gérer la visibilité du composant sauvegarder
  const [isSauvegarderPossible, setIsSauvegarderPossible] = useState(true);




  // état visibilité RubanEditable
  const [isRubanVisible, setIsRubanVisible] = useState(false);

  const [motChoisi, setMotChoisi] = useState('');

  // visibilité RubanEditable
  const afficherRuban = () => {
    setIsRubanVisible(!isRubanVisible);
  };

  // Fonction pour basculer la visibilité du composant RubanEditable
  const avancerPossible = () => {
    setIsAvancerPossible(!isAvancerPossible);  // Bascule la visibilité
  };



  // editer ruban
  const RubanEditable = () => {

    // État initial pour le ruban sous forme de tableau
    const [rubanModif, setRubanModif] = useState(ruban);

    const [teteModif, setTeteModif] = useState(tete);

    // Fonction pour convertir le tableau en une chaîne de texte séparée par des espaces
    const rubanAsString = ruban.join(' ');

    // État pour suivre la modification du texte
    const [modifiedText, setModifiedText] = useState(rubanAsString);

    // Fonction pour gérer la modification du texte
    // const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //   setModifiedText(event.target.value);
    // }; 
    // Fonction pour sauvegarder les modifications et mettre à jour le ruban
    const handleSave = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = event.target.value;
      setModifiedText(newText);
      // Divise le texte en un tableau avec les éléments séparés par des espaces
      const updatedRuban = newText.split(' ').filter(Boolean);  // filter(Boolean) pour enlever les éléments vides
      setRubanModif(updatedRuban);  // Mets à jour l'état ruban avec les nouvelles valeurs
    };

    return (
      <div className="modif">
        
        {/* Champ texte pour entrer des éléments séparés par des espaces */}
        <textarea
          value={modifiedText}
          onChange={handleSave}
          rows={4}
          cols={50}
          style={{ fontSize: "16px", padding: "8px", borderRadius: "16px", border: "1px solid black", resize: "none", width: "80%" }}
        />

        <h4 className="rien">L'alphabet</h4>
        <div className="alphabet">
          <table>
            <tbody>
                <tr >
                  {tableAlphabet.map((el, index) => (
                    <td key={index}>{el}</td>
                  ))}
                </tr>
            </tbody>
          </table>
        </div>
  
        <hr className="separation"></hr>

        <h3>Choisir la tête</h3>
        <select
          style={{
            fontSize: "16px",
            padding: "8px",
            borderRadius: "16px",
            border: "1px solid black",
            width: "100px",
            margin: "8px 0"
          }}
          value={teteModif}  // Valeur par défaut pour correspondre à la sélection de la tête
          onChange={(e) => {
            const index = e.target.selectedIndex;
            setTeteModif(index);
          }}
        >
          {rubanModif.map((element, index) => (
            <option key={index} value={index}>
              {element}
            </option>
          ))}
        </select>
  
        <div>
            <button 
            onClick={() => ModifierRubanEtTete(rubanModif, teteModif)}
            style={{ backgroundColor: "#1b26ffaa" }}
            
            >
            Sauvegarder les modifications
            </button>
            {!isSauvegarderPossible && (
            <div style={{ marginTop: "10px", color: "#FF8C42" }}>
              Votre ruban contient des caractères qui ne sont pas présents dans l'alphabet
            </div>
          )}
        </div>
      </div>
    );
  };
  function ModifierRubanEtTete(rubanModif: string[], teteModif: number): void {
    
    setEtatFinalAtteint(false);

    // Vérifier que tous les caractères de rubanModif sont dans tableAlphabet
    const isValidRuban = rubanModif.every((char) => tableAlphabet.includes(char));

    if (!isValidRuban) {
      setIsSauvegarderPossible(false);
      return;
    }


    setMotChoisi(rubanModif.join(''));

    setRuban(rubanModif);
  
    setTete(teteModif);
    setIsAvancerPossible(true);

    if (teteModif < 6) {
      setRuban((precedentRuban) => [blank, blank, blank, blank, blank, blank, ...precedentRuban]);
      setTete(teteModif + 6);
    }

    if (rubanModif.length - teteModif < 6) {
      setRuban((precedentRuban) => [...precedentRuban, blank, blank, blank, blank, blank, blank]);
    }

    if (rubanModif.length < 13) {
      setRuban((precedentRuban) => [blank, blank, blank, blank, blank, blank, ...precedentRuban, blank, blank, blank, blank, blank, blank]);
    }

    afficherRuban();
  }
















// ------------------------------------------------------- RUBAN -------------------------------------------------------


  // element
  const Ruban = () => {
    const range = 6; // Nombre d'éléments avant et après la tête
    return (
      <div className="container">
        <table className="contouretcentre">
          <tbody>
            <tr>
              {ruban.map((element, index) => {
                if (index >= tete - range && index <= tete + range) {

                  // tete
                  if (index === tete) {
                    return (
                      <td
                        className="case"
                        key={index}
                        style={{ backgroundColor: "#947759" }}
                        >
                          {element}
                        </td>
                    );
                  }

                  return (
                    <td
                    className="case"
                    key={index}
                    >
                      {element}
                    </td>
                  );
                }
                return null;
              })}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  // +
  function Avancer(): void {
    setTete (tete + 1);
    if (tete+7 >= ruban.length) {
      setRuban([...ruban, blank]);
    }
  }
  // -
  function Reculer(): void {
    if (tete-7 == -1) {
      setRuban([blank, ...ruban]);
    } else {
      setTete (tete - 1);
    }
  }
  // avancer
  function AvancerRuban() {

    setEtat(etatInitial);
    
    // Récupérer la transition correspondant à l'état actuel et au symbole sous la tête
    const transition = transitions.find((el) => el.etat === etat && el.symbole === ruban[tete]);

    console.log("transition : ", transition);


    //Si la transition n'existe pas, on arrête la machine
    if (!transition) {
      console.log("plus de transition possible");
      avancerPossible();
      return;
    }

    // Modifier le symbole sous la tête
    ruban[tete] = transition.ecrire;

    // Déplacer la tête
    if (transition.deplacement === "D" || transition.deplacement === "R") {
      Avancer();
    } else if (transition.deplacement === "G" || transition.deplacement === "L") {
      Reculer();
    }

    // Changer l'état
    setEtat(transition.etatSuivant);

    console.log("etat : ", etat);


    etatsFinaux.forEach(etatF => {
      if (transition.etatSuivant === etatF) {
        console.log("equivalent");
        <div style={{ marginTop: "10px", color: "#00CC00" }}>
          Etat final atteint, le mot est reconnu
        </div>
      }

    })
  }







  useEffect(() => {
    if (fichier) {
      setEtat(etatInitial);
    }
  }, [fichier, etatInitial]);









// ------------------------------------------------------- FICHIER -------------------------------------------------------


  // upload fichier
  function UploadFichier(): JSX.Element {
      const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
          const file = e.target.files ? e.target.files[0] : null;

          if (!file?.name.endsWith('.mt')) {
            console.log("Fichier non .mt");
          } else {

            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                  if (typeof reader.result === 'string') {
                    setFichier(reader.result);
                  }
              };
              reader.onerror = () => {
                  console.error("Erreur lors de la lecture du fichier :", reader.error);
              };
              reader.readAsText(file);
              }
          }          
      };
  
      return (
        <div>
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileSelected}
            className="logo2"
            style={{
            fontSize: "16px",
            padding: "8px",
            borderRadius: "16px",
            border: "1px solid black",
            cursor: "pointer",
            //boxShadow: "0 4px 60px rgba(255, 214, 100, 0.61)"
            }}
          />
        </div>
      );
  }
  useEffect(() => {
    if (fichier) {
      TraitementFichier();
    }
  }, [fichier]);
  // traitement fichier
  function TraitementFichier(): void {

    console.log("traitement");

      var champ = 1;

      var Tetats = [];
      var Tsymboles = [];
      var Talphabet = [];
      var Tblank = '';
      var Tetatinitial = '';
      var Tetatsfinaux = [];
      var Ttransitions = [];


      const lignes = fichier.split('\n');


      for (const ligne of lignes) {
        
        if(ligne == "") {
          champ++;
        }

        if(!ligne.startsWith("/**") && !(ligne == "")) {

        if (champ == 1) {
          Tetats.push(ligne);
        } else if (champ == 2) {
          Tsymboles.push(ligne);
        } else if (champ == 3) {
          Talphabet.push(ligne);
        } else if (champ == 4) {
          Tblank = ligne;
        } else if (champ == 5) {
          Tetatinitial = ligne;
        } else if (champ == 6) {
          Tetatsfinaux.push(ligne);
        } else if (champ == 7) {
          Ttransitions.push(ligne);
        }

          //console.log(ligne)



          // table.push({
          //   etat: ligne,
          //   symbole: "",
          //   nouveauSymbole: "",
          //   deplacement: "",
          //   nouvelEtat: ""
          // });
        }

      }



      setTableAlphabet(Talphabet);
      setBlank(Tblank);
      setEtatInitial(Tetatinitial);
      setEtatsFinaux(Tetatsfinaux);
      //setTransitions(Ttransitions);


  
      // setTable(table);

      //console.log(table[0].etat);
  }



  function AvancerAutomatiquement(): void {
    let etatActuel = etat;
    let teteActuelle = tete;
    let rubanActuel = [...ruban];

    while (true) {
      const transition = transitions.find((el) => el.etat === etatActuel && el.symbole === rubanActuel[teteActuelle]);

      if (!transition) {
        console.log("plus de transition possible");
        setIsAvancerPossible(false);
        break;
      }

      rubanActuel[teteActuelle] = transition.ecrire;

      if (transition.deplacement === "D" || transition.deplacement === "R") {
        teteActuelle++;
        if (teteActuelle >= rubanActuel.length) {
          rubanActuel.push(blank);
        }
      } else if (transition.deplacement === "G" || transition.deplacement === "L") {
        teteActuelle--;
        if (teteActuelle < 0) {
          rubanActuel.unshift(blank);
          teteActuelle = 0;
        }
      }

      etatActuel = transition.etatSuivant;

      if (etatsFinaux.includes(etatActuel)) {
        setEtatFinalAtteint(true);
        break;
      }
    }

    setRuban(rubanActuel);
    setTete(teteActuelle);
    setEtat(etatActuel);
  }






// ------------------------------------------------------- TRANSITIONS -------------------------------------------------------


  // traitement transitions
  const traiterTransitions = (tTransitions: string) => {
    
    const transitions = [];
    
    const lines = tTransitions.split('\n');
    
    for (const line of lines) {
      if (line.trim() === '') continue;
      const [left, right] = line.split('->');
      if (!right) continue;
      const [etat, symbole] = left.split(',');
      const [etatSuivant, ecrire, deplacement] = right.split(',');
      
      transitions.push({
        etat: etat.trim(),
        symbole: symbole.trim(),
        etatSuivant: etatSuivant.trim(),
        ecrire: ecrire.trim(),
        deplacement: deplacement.trim()
      });
    }
    
    return transitions;
  };
  useEffect(() => {
    const transitionsTraitees = traiterTransitions(fichier);
    setTransitions(transitionsTraitees);
  }, [fichier]);




  // element
  const TransitionsTable = () => {
    return (
      <div>
        <h2>Tableau des transitions</h2>
        <div className="alphabet">
        <table border={1}>
          <thead>
            <tr>
              <th>État</th>
              <th>Symbole</th>
              <th>État suivant</th>
              <th>Écrire</th>
              <th>Déplacement</th>
            </tr>
          </thead>
          <tbody>
            {transitions.map((transition, index) => (
              <tr key={index}>
                <td>{transition.etat}</td>
                <td>{transition.symbole}</td>
                <td>{transition.etatSuivant}</td>
                <td>{transition.ecrire}</td>
                <td>{transition.deplacement}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  };









  useEffect(() => {
    if (etatsFinaux.includes(etat)) {
      setEtatFinalAtteint(true);
    }
  }, [etat, etatsFinaux]);














  // état visibilité RubanEditable
  const [etatFinalAtteint, setEtatFinalAtteint] = useState(false);




  // ------------------------------------------------------- AFFICHAGE -------------------------------------------------------


  return (
    <div className="App">




      <div className="logo">
        <img alt="icone Machine de Turing" src="turing.png" className="icone" />
        <h1>Machine de Turing</h1>
      </div>









      {!fichier && <h2 className="soustitre">➤ Envoyez un fichier représentant une Machine de Turing pour commencer</h2>}



      {fichier && (
        <div className="contour">
          <h2>Ruban</h2>

          <div>
            <button onClick={afficherRuban}>Modifier le ruban</button>
            {isRubanVisible && <RubanEditable />}
          </div>

          <Ruban />

          <button onClick={AvancerRuban} disabled={!isAvancerPossible} style={{ margin: "5px" }}>Avancer</button>

          <button onClick={AvancerAutomatiquement} disabled={!isAvancerPossible} style={{ margin: "5px" }}>Avancer automatiquement</button>

          {etatFinalAtteint && (
            <div style={{ marginTop: "10px", color: "#00CC00" }}>
              Votre mot de départ "{motChoisi}" est reconnu
            </div>
          )}

          {!isAvancerPossible && (
            <div style={{ marginTop: "10px", color: "#CC0000" }}>
              Plus de transitions possible, votre mot de départ "{motChoisi}" n'est pas reconnu.
              <br></br>Vous pouvez modifiez le ruban pour continuer
            </div>
          )}

          

        </div>
      )}




      {fichier && (
        <div className="contour">

          <div className="alphabet">
          <table>
            <thead>
              <tr>
                <th>etat actuel</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>{etat}</td>
                </tr>
            </tbody>
          </table>


          <table>
            <thead>
              <tr>
                <th>etats finaux</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  {etatsFinaux.map((el, index) => (
                    <td key={index}>{el}</td>
                  ))}
                </tr>
            </tbody>
          </table>
          </div>




          <hr></hr>



          <TransitionsTable />


      </div>



      )}


      <div className="contour">
        {fichier && (
          <div>
            <h2>Changer de fichier representant la Machine de Turing</h2>
          </div>
        )}
        <UploadFichier />
      </div>
        

    </div>
  )
}



export default App;