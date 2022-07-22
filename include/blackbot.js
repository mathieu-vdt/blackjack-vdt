const CouleurCarte = ["Pique", "Coeur", "Trefle", "Carreau"]
const NomCarte     = [ "As", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sept", "Huit", "Neuf", "Dix", "Valet", "Dame", "Roi" ]
const ValCarte     = [ 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10 ] // AS = 1 ou 11 mais 0 dans le tableau

class Carte {
    /**
     * Constructeur
     * 
     * Paramètres :
     * @param {number} : couleur de la carte (de 0 à 3)
     * @param {number} : hauteur de la carte  (de 0 à 12)
     * 
     * Attributs utilisable sur un objet Carte :
     *  couleur : {number} la couleur de la carte encodée dans un nombre [0...3]
     *  hauteur : {number} hauteur de la carte [as..roi] encodée dans une nombre [0..12]
     */
    constructor(couleur,hauteur) {
        if (couleur<0||couleur>3||hauteur<0||hauteur>12) {
            throw `Creation de carte impossible : [${couleur}/${hauteur}]`
        }
        this.couleur = couleur
        this.hauteur  = hauteur
    }
    /**
     * Nom de la carte (d'après le tableau "NomCarte")
     * @returns {string} le nom de la carte (As, Deux, ..., Roi)
     */
    getNom() {
        return NomCarte[this.hauteur]
    }
    /**
     * Valeur de la carte de 2 à 10 ou "0" si c'est un As
     * @returns {number} valeur de la carte [0,2,3..10]
     */
    getValeur() {
        return ValCarte[this.hauteur]
    }
    /**
     * Nom de la couleur de la carte (d'après le tableau "Couleur")
     * @returns {string} "Pique", "Coeur", "Carreau" ou "Trefle"
     */
    getNomCouleur() {
        return CouleurCarte[this.couleur]
    }
    /**
     * Nom complet de la carte (ex: "Dame de Pique")
     * @returns {string} le nom complet en français
     */
    getNomComplet() {
        return NomCarte[this.hauteur]+' de '+CouleurCarte[this.couleur]
    }
}
/**
 * Un sabot contient des jeux de 52 cartes mélangés
 * Il peut les tirer une par une et se réinitialise automatiquement si il est vite
 */
class Sabot {
    /**
     * Création d'un sabot de "nbJeux" jeux de 52 cartes mélangées
     * @param {number} nbJeux nombre de jeux complets dans le sabot
     */
    constructor(nbJeux=6) {
        this.cartesSabot  = []
        this.cartesTirees = []
        // creation d'un sabot contenant nbJeux complets
        for (let iJeux = 0; iJeux < nbJeux; iJeux++) {
            for (let iCoul = 0; iCoul < 4; iCoul++) {
                for (let iVal = 0; iVal < 13; iVal++) {
                    this.cartesSabot.push( new Carte(iCoul,iVal) )
                }
            }
        }
        this.raz()
    }
    /**
     * Remettre toutes les cartes tirées dans le sabot et mélanger le Sabot
     */
    raz() {
        this.cartesTirees.forEach( carte => this.cartesSabot.push(carte) )
        this.cartesTirees.length = 0
        this.cartesSabot.sort( (a, b) => 0.5 - Math.random() )
    }
    /**
     *  Tirage d'une carte (elle passe du sabot à l'historique des cartes tirée)
     *  @returns {Carte} la carte que l'on vient de retirer du sabot
     */
    tirage () {
        if (this.cartesSabot.length==0) {
            this.raz()
        }
        let carte = this.cartesSabot.pop()
        this.cartesTirees.push(carte)
        return carte

    }
    /**
     * redonne la dernière carte tirée
     * @returns {Carte} la carte
     */
    dernierTirage() {
        return this.cartesTirees[this.cartesTirees.length-1]
    }
    /**
     * Nombre de cartes restant a tirer dans le sabot
     * @returns {number} le nombre de carte dans le sabot
     */
    nbCartesRestantes() {
        return this.cartesSabot.length
    }

}
/**
 * Une main de black-jack prend des cartes une par une
 * Elle indique en continu :
 *  - getNbCartes() : combien elle a de cartes
 *  - getValeur()   : la valeur totale de la main
 *  - isBlackJack() : si elle contient un blackJack (oui ssi il y a 1 carte valant 10 et un AS)
 *  - isPerdante()  : si elle est perdante (oui ssi le total est supérieur à 21)
 * NB: une main peut toujours prendre des cartes même si elle est perdante
 *     mais ça n'a pas de sens dans une partie de blackjack
 */
class MainBlackJack {
    /**
     * Attributs utilisables sur un objet Main :
     * 
     * cartes : {Carte[]} tableau des cartes contenues dans la main
     * score  : {number}  valeur de toutes les cartes (peut aussi être obtenu par .getValeur() )
     */
    constructor() {
        this.cartes = []
        this.score  = 0
    }
    /**
     * Action sur la main : Ajouter une carte
     * @param {Carte} carte la carte à ajouter dans la main
     * @returns {void}
     */
    prendreCarte(carte) {
        this.cartes.push(carte)
        this.score = this.calculerValeur()
    }
    /**
     * Action sur la main : Jeter toutes les cartes (réinitialiser la main)
     * @returns {void}
     */
    viderMain() {
        this.cartes.length = 0
        this.score         = 0
    }
    /**
     * Nombre de cartes contenues dans la main
     * @returns {number} nombre de cartes
     */
    getNbCartes() {
        return this.cartes.length
    }
    /**
     * Obtenir le "score" de la main (somme des valeurs des cartes avec un comptage optimisé des as)
     * @returns {number} la valeur de la main complète
     */
    getScore() {
        return this.score
    }
    /**
     * Indique si la main contient (ou non) un BlackJack (21 points avec 2 cartes seulement)
     * @returns {boolean} vrai si la main représente un "BlackJack"
     */
    isBlackJack() {
        return this.cartes.length==2 && this.getScore()==21
    }
    /**
     * Indique si la main est perdante (score de plus de 21 points)
     * @returns {boolean} vrai si la main représente un "BlackJack"
     */
    isPerdante() {
        return this.getScore()>21
    }
    /**
     * Méthode interne utilisée pour actialiser le "score" de la main
     * @returns {number} le score actuel (somme des valeurs des cartes)
     */
    calculerValeur() {
        let total = 0
        let nbAs  = 0 
        this.cartes.forEach((carte)=>{
            if (carte.getValeur()!=0) {
                total += carte.getValeur()
            } else {
                nbAs ++
            }
        })
        //console.log("main : ",total,nbAs)
        while (nbAs) {
            if ( total+nbAs-1 <=10 ) {
                total += 11
            } else {
                total +=1
            }
            nbAs--
        }
        return total
    }
    toString(br='\n') {
        let descr = 'cartes :'+br
        this.cartes.forEach((carte)=>{
            descr += carte.getValeur()+ " : " +carte.getNomComplet()+br
        })
        descr += this.getNbCartes()+' cartes'+br
        descr += this.getScore()   +' points'+br
        if (this.isBlackJack()) {
            descr += 'xxxx BLACK-JACK xxxx'+br
        } else if ( this.isPerdante() ) {
            descr += '####   PERDU    ####'+br
        }
        return descr
    }
} 

// ===========================================================================
// BlackBot & EtatBlackBot
// ===========================================================================

const EtatBlackBot = {
    MISE  : "Init : mises en cours",
    JEU   : "Jeu  : chaque joueur tire ou Passe",
    GAIN  : "Le croupier a tiré, les gains sont calculés"
}
class BlackBot {

    /**
     * Construction d'une table de blackJack pour nbJoueurs participants.
     * 
     * Déroulement d'une partie :
     *  - en etat "MISE"
     *    -- chaque "joueur" peut déposer sa mise
     *    -- un joueur sans mise ne participera pas à la prochaine partie
     *    -- il faut au moins une mise pour pouvoir lancer la partie
     *    -- la méthode "distribuer()" termine la phase "MISE" et passe en etat "JEU"
     *  - en etat "JEU"
     *    -- chaque joueur peut "tirer(j)" ou "terminer(j)" tant qu'il n'a pas perdu ou déjà terminé
     *    -- tirer(j) ajoute une carte dans la main d'un joueur (et peut éventuellement le faire perdre)
     *    -- terminer(j) indique qu'il ne prendra plus de carte
     *    -- quand tous les joueurs on perdu ou terminé :
     *         --- le croupier tire ses cartes et calcul les gains de chacun
     *         --- les gains sont placés dans miseJoueurs[j] (à la place des mises)
     *         --- le jeu passe alors en état "GAIN"
     * - en etat "GAIN"
     *    -- on peut encore consulter les mains et les gains
     *    -- la seule action disponible est "relancerPartie()"
     *    -- relancerPartie() va vider les mains et les gains et basculer dans l'état "MISE"
     * 
     * 
     * Attributs utilisables sur un objet BlackBot :
     * 
     * sabot       : {Sabot}           le sabot des cartes (mais dans une partie normale on n'a pas à y toucher)
     * etat        : {EtatBlackBot}    l'état de la partie MISE, JEU ou GAIN
     * mainBanque  : {MainBlackJack}   la main du croupier
     * mainJoueurs : {MainBlackJack[]} tableau des mains des joueurs (même ceux qui ne participent pas à un tour)
     * miseJoueurs : {number[]}        la mise initiale (en etat MISE et JEU) / le gain (en etat GAIN)
     * finJoueurs  : {boolean[]}       indique si un joueur peut encore tirer ou non (false si il a terminé, perdu ou n'a pas joué)
     */
     constructor(nbJoueurs=1) {
        this.sabot = new Sabot(6)
        this.etat  = EtatBlackBot.MISE
        this.mainBanque  = new MainBlackJack()
        this.mainJoueurs = []
        this.miseJoueurs = []
        this.finJoueurs  = []
        for (let i = 0; i < nbJoueurs; i++) {
            this.mainJoueurs[i] = new MainBlackJack()
            this.miseJoueurs[i] = 0
            this.finJoueurs[i]  = false
        }
    }
    /**
     * Relancer une partie
     * Utilisable uniquement en etat GAIN
     * 
     * @returns {void}
     */
    relancerPartie() {
        if (this.etat==EtatBlackBot.GAIN) {
            this.etat = EtatBlackBot.MISE
            this.mainBanque.viderMain()
            this.miseJoueurs.forEach((montant,index)=>{
                this.mainJoueurs[index].viderMain()
                this.miseJoueurs[index] = 0
                this.finJoueurs[index]  = false
            })
        } else {
            throw "[BlackBot] : Impossible d'encaisser et de relancer une partie en dehors de l'état GAIN"
        }
    }
    /**
     * Enregistrer la mise d'un joueur
     * Utilisable uniquement en etat MISE
     * 
     * @param   {number} joueur   numéro du joueur [0..nbJoueur-1]
     * @param   {number} montant  mise totale pour ce joueur
     * @returns {void}
     */
    miser(joueur,montant) {
        if ( this.etat==EtatBlackBot.MISE ) {
            this.miseJoueurs[joueur] = montant
        } else {
            throw "[BlackBot] : Mise impossible en dehors de l'état MISE"
        }
    }
    /**
     * Tirer une nouvelle carte pour un joueur
     * Utilisable uniquement en etat MISE si le joueur n'a pas déjà "perdu" ou "terminé"
     * 
     * @param   {number} joueur   numéro du joueur [0..nbJoueur-1]
     * @returns {void}
     */
    tirer(joueur) {
        if (this.etat==EtatBlackBot.JEU) {
            if (this.finJoueurs[joueur]==false) {
                this.mainJoueurs[joueur].prendreCarte( this.sabot.tirage() )
                if (this.mainJoueurs[joueur].isPerdante()) {
                    // si un joueur perd en tirant on évalue la fin de partie
                    this.finJoueurs[joueur] = true
                    this.checkFinPartie()
                }
            } else {
                throw "[BlackBot] : Tirage impossible quand le joueur a terminé de jouer"
            }
        } else {
            throw "[BlackBot] : Tirage impossible en dehors de l'état JEU"
        }
    }
    /**
     * Terminer le tour d'un joueur
     * Utilisable uniquement en etat MISE si le joueur n'a pas déjà "perdu" ou "terminé"
     * 
     * @param   {number} joueur   numéro du joueur [0..nbJoueur-1]
     * @returns {void}
     */
     terminer(joueur) {
        if ( this.etat==EtatBlackBot.JEU ) {
            if (this.finJoueurs[joueur]==false) {
                // quand un joueur termine de jouer on évalue la fin de partie
                this.finJoueurs[joueur] = true
                this.checkFinPartie()
            } else {
                throw "[BlackBot] : Impossible de terminer sa main quand elle est déjà terminée"
            }
        } else {
            throw "[BlackBot] : Impossible de terminer sa main en dehors de l'état JEU"
        }
    }
    /**
     * Lancer une nouvelle partie et distribuer les premières cartes
     * Utilisable uniquement en etat MISE si au moins un joueur a misé
     * 
     * @returns {void}
     */
    distribuer() {
        // Il faut etre en etat MISE
        if (this.etat!=EtatBlackBot.MISE) {
            throw "[BlackBot] : Distribution impossible en dehors de l'état MISE"
        }
        // On distribue :
        //  - Une carte à chaque joueur ayant misé (Exception si aucune mise)
        //  - Puis une carte au croupier
        //  - Puis une seconde carte à chaque joueur
        this.mainBanque.viderMain()
        let nbMises = 0
        this.miseJoueurs.forEach((montant,index)=>{
            if (montant>0) {
                nbMises++
                this.finJoueurs[index] = false
                this.mainJoueurs[index].viderMain()
                this.mainJoueurs[index].prendreCarte( this.sabot.tirage() )
            } else {
                this.finJoueurs[index] = true
            }
        })
        if (nbMises==0) {
            throw "[BlackBot] : Distribution impossible si aucun joueur n'a misé"
        }
        this.mainBanque.prendreCarte( this.sabot.tirage() )
        this.miseJoueurs.forEach((montant,index)=>{
            if (montant>0) {
                this.mainJoueurs[index].prendreCarte( this.sabot.tirage() )
            }
        })
        // Le bot passe alors en etat  JEU
        this.etat = EtatBlackBot.JEU
    }
    /**
     * Méthode interne (lancée automatiquement après chaque tirage ou demande de fin de tour)
     * Elle verifie si il reste des joueurs "actifs" (ni perdu ni terminé)
     * Si il n'y a plus de joueurs actifs :
     *   -- le croupier tire ses cartes
     *   -- il calcul les gains (en prend les mises perdues)
     *   -- le jeu bascule en etat "GAIN"
     */
    checkFinPartie() {
        // la fin de partie est lancée ssi :
        // tous les joueurs ayant une mise ont perdu ou sont en mode "fin"
        let nbJoueursActifs = 0
        this.miseJoueurs.forEach((montant,index)=>{
            if (montant>0) {
                if ( ! this.finJoueurs[index] ) {
                    if (this.mainJoueurs[index].isPerdante()) {
                        this.finJoueurs[index] = true
                    } else {
                        nbJoueursActifs++
                    }
                }
            }
        })
        if (nbJoueursActifs==0) {
            // fin de partie : le croupier fait son tirage et calcule les gains.
            this.etat = EtatBlackBot.GAIN
            // on tire à 16 passe à 17
            while (this.mainBanque.getScore()<=16) {
                this.mainBanque.prendreCarte(this.sabot.tirage())
            }            
            // on calcul les gains... et on les place dans les mises
            this.miseJoueurs.forEach((montant,index)=>{
                if (montant>0) {
                    if (this.mainJoueurs[index].isPerdante()) {
                        // main perdante : on perd la mise
                        this.miseJoueurs[index] = 0
                    } else if (this.mainJoueurs[index].isBlackJack()) {
                        if ( ! this.mainBanque.isBlackJack() ) {
                            // gain par BlackJack : payement 3 pour 2
                            this.miseJoueurs[index] *= 2.5
                        } else {
                            // egalité de blackJack :-(  : pas de gain / pas de perte
                        }
                    } else if (this.mainBanque.isPerdante()) {
                        // main croupier perdante : on double la mise
                        this.miseJoueurs[index] *= 2
                    } else if ( this.mainJoueurs[index].getScore() > this.mainBanque.getScore() ) {
                        // main superieure : on double la mise
                        this.miseJoueurs[index] *= 2
                    } else if ( this.mainJoueurs[index].getScore() < this.mainBanque.getScore() ) {
                        // main inferieure : on perd la mise
                        this.miseJoueurs[index] = 0
                    } else {
                        // main égale : pas de gain / pas de perte
                    }
                }
            })
        }
    }


}