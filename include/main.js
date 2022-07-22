let Partie = new BlackBot(1);

//On récupère la mise
function getMise(x){
  let mise = parseInt(document.getElementById('valMise'+x+'').value);
  return mise;
}

/*$( document ).ready( function() {
  $('.Game').hide();
} )*/


//refresh les cartes du Croupier
function refreshCarteC(){
  document.getElementById('cartesC').innerHTML = "";
  for(var i = 0; i < Partie.mainBanque.getNbCartes();i++){
    let carteImg = "";
      let ValeurCarte = Partie.mainBanque.cartes[i].getValeur();
      let CouleurCarte = Partie.mainBanque.cartes[i].getNomCouleur();
      let NomCarte = Partie.mainBanque.cartes[i].getNom();

      if(ValeurCarte == 0){
        carteImg = "A";
        if (CouleurCarte == "Pique"){
          carteImg += "s.gif";
        }else if(CouleurCarte == "Coeur"){
          carteImg += "h.gif";
        }else if(CouleurCarte == "Trefle"){
          carteImg += "c.gif";
        }else if(CouleurCarte == "Carreau"){
          carteImg += "d.gif";
        }
      }else if(ValeurCarte >= 2 && ValeurCarte <= 9 ){
        carteImg = ""+ValeurCarte;
        if (CouleurCarte == "Pique"){
          carteImg += "s.gif";
        }else if(CouleurCarte == "Coeur"){
          carteImg += "h.gif";
        }else if(CouleurCarte == "Trefle"){
          carteImg += "c.gif";
        }else if(CouleurCarte == "Carreau"){
          carteImg += "d.gif";
        }
      }else if (ValeurCarte == 10){
        if (NomCarte == "Dix"){
          carteImg = ""+ValeurCarte;
        }else if (NomCarte == "Valet"){
          carteImg = "J";
        }else if (NomCarte == "Roi"){
          carteImg = "K";
        }else if (NomCarte == "Dame"){
          carteImg = "Q";
        }

        if (CouleurCarte == "Pique"){
          carteImg += "s.gif";
        }else if(CouleurCarte == "Coeur"){
          carteImg += "h.gif";
        }else if(CouleurCarte == "Trefle"){
          carteImg += "c.gif";
        }else if(CouleurCarte == "Carreau"){
          carteImg += "d.gif";
        }
      }
      document.getElementById('cartesC').innerHTML += "<img src =\"./include/images/cartes-gif/"+ carteImg +"\">" ;
}
}

//refresh les cartes du Joueur
function refreshCarteJ(x){
  
  //Effacer les cartes déjà placé
  document.getElementById('cartesJ'+x+'').innerHTML = "";
  for(var i = 0; i < Partie.mainJoueurs[x].getNbCartes();i++){
    let carteImg = "";
    let ValeurCarte = Partie.mainJoueurs[x].cartes[i].getValeur();
    let CouleurCarte = Partie.mainJoueurs[x].cartes[i].getNomCouleur();
    let NomCarte = Partie.mainJoueurs[x].cartes[i].getNom();

    if(ValeurCarte == 0){
      carteImg = "A";
      if (CouleurCarte == "Pique"){
        carteImg += "s.gif";
      }else if(CouleurCarte == "Coeur"){
        carteImg += "h.gif";
      }else if(CouleurCarte == "Trefle"){
        carteImg += "c.gif";
      }else if(CouleurCarte == "Carreau"){
        carteImg += "d.gif";
      }
    }else if(ValeurCarte >= 2 && ValeurCarte <= 9 ){
      carteImg = ""+ValeurCarte;
      if (CouleurCarte == "Pique"){
        carteImg += "s.gif";
      }else if(CouleurCarte == "Coeur"){
        carteImg += "h.gif";
      }else if(CouleurCarte == "Trefle"){
        carteImg += "c.gif";
      }else if(CouleurCarte == "Carreau"){
        carteImg += "d.gif";
      }
    }else if (ValeurCarte == 10){
      if (NomCarte == "Dix"){
        carteImg = ""+ValeurCarte;
      }else if (NomCarte == "Valet"){
        carteImg = "J";
      }else if (NomCarte == "Roi"){
        carteImg = "K";
      }else if (NomCarte == "Dame"){
        carteImg = "Q";
      }

      if (CouleurCarte == "Pique"){
        carteImg += "s.gif";
      }else if(CouleurCarte == "Coeur"){
        carteImg += "h.gif";
      }else if(CouleurCarte == "Trefle"){
        carteImg += "c.gif";
      }else if(CouleurCarte == "Carreau"){
        carteImg += "d.gif";
      }
    }
    document.getElementById('cartesJ'+x+'').innerHTML += "<img src =\"./include/images/cartes-gif/"+ carteImg +"\">" ;
  }
}

//refresh le score du croupier
function refreshScoreC(){
  document.getElementById('scoreCroupier').innerHTML = "";
  document.getElementById('scoreCroupier').innerHTML = Partie.mainBanque.getScore();
}

//refresh le score du Joueur
function refreshScoreJ(x){
  document.getElementById('scoreJoueur'+x+'').innerHTML ="";
  document.getElementById('scoreJoueur'+x+'').innerHTML = Partie.mainJoueurs[x].getScore();
}

//Nouvelle partie
function NewGame(){
  //cacher la div start
  $('.start').hide();

  //faire apparaitre le bouton Commencer
  $('#Commencer').css('display','block');

  let nbJoueurs = parseInt(document.getElementById("nbJoueur").value);
  Partie = new BlackBot(nbJoueurs);
  $('.Joueurs').empty();

  //Création de la division de chaque joueur
  for(let i = 0;i < nbJoueurs;i++){
    let nb = i + 1;
    $(".Joueurs").append('<div id="joueur" class="joueur">' +
                         '<h2><center>Joueur '+nb+' - <span id="scoreJoueur'+i+'"></span></center></h2>' +
                          '<center><p>Cartes :</p>'+
                              '<p id="cartesJ'+i+'"></p>'+
                          '</center>'+
                            '<p>Portefeuille : <span id="BanqueJ'+i+'">100</span> €</p>'+
                          '<form>'+
                              'Mise : <input id="valMise'+i+'" type="text" value=0 size = "3px">'+
                          '</form>'+

                          '<div class="buttons">'+
                              '<button id="miser" onclick="Miser('+i+')">Miser</button>'+
                              '<button id="Tirer" onclick="Tirer('+i+')">Tirer</button>'+
                              '<button id="Stop" onclick="Stop('+i+')">Stop</button>'+
                          '</div>'+
                          '<p id="GP'+i+'"></p>'+
                      '</div>')
    
  }


}

//Bouton Stop
function Stop(x){
  let nbJoueurs = parseInt(document.getElementById("nbJoueur").value);
  Partie.terminer(x);
  let scJoueur = 0;
  let scCroupier = Partie.mainBanque.getScore();

  refreshResult();

}

//Bouton Miser
function Miser(x){
    let mise = parseInt(document.getElementById('valMise'+x+'').value);
    if(Partie.etat != EtatBlackBot.JEU){
        mise = mise + 10;
        document.getElementById('valMise'+x+'').value = mise;
    }else{
      swal({
        title : "Vous ne pouvez pas miser en cours de partie",
  
        className: "swal-modal"
  
    });
    }
}

//let banqueJ = parseInt(document.getElementById('BanqueJ'+x).textContent);
//console.log("BanqueJ ----" + banqueJ)
//document.getElementById('BanqueJ'+x).textContent = banqueJ - mise;

//Bouton Tirer
function Tirer(x){
  let nbJoueurs = parseInt(document.getElementById("nbJoueur").value);
  let banqueJ = parseInt(document.getElementById('BanqueJ'+x).textContent);
  let booleanStop = true;

  for(let i = 0;i < nbJoueurs;i++){
    if(Partie.finJoueurs[i] === false){
      booleanStop = false;
    }
  }

  //recuperer le score actuel du joueur
  let score = Partie.mainJoueurs[x].getScore();
  if(score > 21){
    swal({
      title : "Vous ne pouvez plus tirer de carte",

      className: "swal-modal"

  });
    Partie.checkFinPartie();
    Partie.finJoueurs[x]= true;
    refreshCarteC();
    refreshScoreC();
  }else if(Partie.mainJoueurs[x].isBlackJack()){
    Partie.checkFinPartie();
    document.getElementById("GP"+x).innerHTML = "";
    document.getElementById("GP"+x).innerHTML = "Blackjack !";
    Partie.finJoueurs[x]= true;
  }else{
    Partie.tirer(x);
    score = Partie.mainJoueurs[x].getScore();
    if (score > 21){
      Partie.checkFinPartie();
      document.getElementById("GP"+x).innerHTML = "";
      document.getElementById("GP"+x).innerHTML = "Perdu !";
      document.getElementById('BanqueJ'+x).textContent = banqueJ;
      Partie.finJoueurs[x] = true;
      refreshCarteJ(x);
      refreshScoreJ(x);
    }else if(score == 21){
        Partie.checkFinPartie();
        document.getElementById("GP"+x).innerHTML = "";
        document.getElementById("GP"+x).innerHTML = "Gagné !";
        document.getElementById('BanqueJ'+x).textContent = banqueJ + getMise(x)*2;
        Partie.finJoueurs[x]= true;
        refreshCarteJ(x);
        refreshScoreJ(x);
        refreshCarteC();
        refreshScoreC();
    }else {
      refreshCarteJ(x);
      refreshScoreJ(x);
      refreshCarteC();
      refreshScoreC();
    }
    
  }
  refreshResult();
  
}


//Commencer
function Commencer(){

  //Récupérer le nombre de Joueurs
  let nbJoueurs = document.getElementById("nbJoueur").value;

  

  let booleanNull = true;

  //Je vérifie si les mises de chaque joueur ont été faîtes
  for(let i = 0;i < nbJoueurs;i++){
    let banqueJ = parseInt(document.getElementById('BanqueJ'+i).textContent);
    let nb = i + 1;
    if(getMise(i) > banqueJ){
      swal({
        title : "Un joueur a misé plus de " + banqueJ + " €",
  
        className: "swal-modal"
  
    });
      booleanNull = false;;
    }else if(getMise(i) ==  0){
        booleanNull = false;
        swal({
          title : "Un joueur n'a pas misé",
    
          className: "swal-modal"
    
      });
      }
    }
    

  if(booleanNull == true){

    //faire apparaitre le bouton Commencer
    $('#Relancer').css('display','block');

    $('#Commencer').css('display','none');

    //Cacher la div du croupier
    $('.croupier-cadre').css('display','block');

    //faire la mise de chaque joueur
    for(let i = 0;i < nbJoueurs;i++){
      let banqueJ = parseInt(document.getElementById('BanqueJ'+i).textContent);
      if(Partie.etat == EtatBlackBot.MISE){
        document.getElementById('BanqueJ'+i).textContent = banqueJ - getMise(i);
        Partie.miser(i,getMise(i));
        

      }
    }
    
    //Si la partie est fini on en relance une autre
    if(Partie.etat == EtatBlackBot.GAIN){
      Partie.relancerPartie();
      if(Partie.etat == EtatBlackBot.MISE){
        Partie.distribuer();
        for(let i = 0;i < nbJoueurs;i++){
          if(Partie.mainJoueurs[i].isBlackJack()){
            let banqueJ = parseInt(document.getElementById('BanqueJ'+i).textContent);
            Partie.checkFinPartie();
            Partie.finJoueurs[i]= true;
            document.getElementById("GP"+i).innerHTML = "";
            document.getElementById("GP"+i).innerHTML = "Blackjack !";
            document.getElementById('BanqueJ'+i).textContent = banqueJ + getMise(i)*2;
          }
        }

        refreshScoreC();
        refreshCarteC();
        
        for(let i = 0;i < nbJoueurs;i++){
          refreshScoreJ(i);
          refreshCarteJ(i);
        }
      }
    }else if(Partie.etat == EtatBlackBot.MISE){
      Partie.distribuer();
      for(let i = 0;i < nbJoueurs;i++){
        let banqueJ = parseInt(document.getElementById('BanqueJ'+i).textContent);
        if(Partie.mainJoueurs[i].isBlackJack()){
          Partie.checkFinPartie();
          document.getElementById("GP"+i).innerHTML = "";
          document.getElementById("GP"+i).innerHTML = "Blackjack !";
          document.getElementById('BanqueJ'+i).textContent = banqueJ + getMise(i)*2;
          Partie.finJoueurs[i] = true;
        }
      }
        
      refreshScoreC();
      refreshCarteC();
        
      for(let i = 0;i < nbJoueurs;i++){
        refreshScoreJ(i);
        refreshCarteJ(i);
      }
      
    }
  }
}

//Relancer
function Relancer(){

  let nbJoueurs = parseInt(document.getElementById("nbJoueur").value);

  if(Partie.etat == EtatBlackBot.GAIN){
    //faire apparaitre le bouton Commencer
    $('#Commencer').css('display','block');

    $('#Relancer').css('display','none');

    Partie.relancerPartie();
    refreshCarteC();
    refreshScoreC();
    refreshResult();

    for(let x = 0; x < nbJoueurs;x++){
      let banqueJ = parseInt(document.getElementById('BanqueJ'+x).textContent);
      let mise = parseInt(document.getElementById('valMise'+x+'').value);
      mise = 0;
      document.getElementById('valMise'+x).value = mise;
      document.getElementById("GP"+x).innerHTML = "";
      banqueJ = banqueJ - parseInt(document.getElementById('valMise'+x+'').value);
      document.getElementById('BanqueJ'+x).textContent = banqueJ;
      refreshCarteJ(x);
      refreshScoreJ(x);
      
    }
  }else{
    swal({
      title : "Il faut terminer la partie",

      className: "swal-modal"

  });
  }

  
  
}

//Rafraichir l'affichage des résultats
function refreshResult(){
  let scCroupier = Partie.mainBanque.getScore();
  let nbJoueurs = parseInt(document.getElementById("nbJoueur").value);
  let booleanStop = true;
  let tab =  Partie.finJoueurs;
  console.log(tab)

  for(let i = 0;i < nbJoueurs;i++){
    if(Partie.finJoueurs[i] === false){
      booleanStop = false;
    }
  }

  if(booleanStop == true){
    for(let i = 0;i < nbJoueurs;i++){
      let banqueJ = parseInt(document.getElementById('BanqueJ'+i).textContent);
      let scJoueur = Partie.mainJoueurs[i].getScore();
      if(Partie.mainJoueurs[i].isPerdante()){
        if(Partie.mainJoueurs[i].isBlackJack()){
          document.getElementById("GP"+i).innerHTML = "";
          document.getElementById("GP"+i).innerHTML = "Blackjack !";
          document.getElementById('BanqueJ'+i).textContent = banqueJ + getMise(i)*2;
        }
      }else if((scJoueur > scCroupier && scJoueur <= 21) || (scCroupier > 21 && scJoueur < scCroupier && scJoueur <= 21)){
        document.getElementById("GP"+i).innerHTML = "";
        document.getElementById("GP"+i).innerHTML = "Vous avez gagné !";
        document.getElementById('BanqueJ'+i).textContent = banqueJ + getMise(i)*2;
    
      }else if(scJoueur == scCroupier && scJoueur <= 21 && scCroupier <= 21){
          document.getElementById("GP"+i).innerHTML = "";
          document.getElementById("GP"+i).innerHTML = "Égalité !";
          document.getElementById('BanqueJ'+i).textContent = banqueJ + getMise(i);
      }else{
        document.getElementById("GP"+i).innerHTML = "";
        document.getElementById("GP"+i).innerHTML = "Perdu !";
        document.getElementById('BanqueJ'+i).textContent = banqueJ;
      }
      for(let i = 0;i < nbJoueurs;i++){
        refreshCarteJ(i);
        refreshScoreJ(i);
      }
      refreshCarteC();
      refreshScoreC();
    }
  }
}


//RAZ
function raz(){
  Partie = new BlackBot(1);
  location.reload();
}


//Ajouter un sound effect sur le bouton Tirer

/* var button = document.getElementById("Tirer"),
audio = null;

button.addEventListener('click', handler, false);

function handler() {
  audio = new Audio('./include/sound/sound.mp3');
  audio.play();
} */