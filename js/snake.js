
let nb_ligne = 15
let nb_colonne = 20
let div=document.getElementById("jeu");
for (let i = 0; i < nb_ligne; i++){
    let ligne=document.createElement("div");
    ligne.className="ligne";
    div.appendChild(ligne);
    for (let i = 0; i < nb_colonne; i++){
        let colonne=document.createElement("div");
        colonne.className="case";
        ligne.appendChild(colonne);
    }
}

let tab=document.getElementsByClassName("case");
let gameStart = false;
let dir;

document.addEventListener("keydown",(e)=>{
    if(e.key == "ArrowUp" || e.key == "z" && dir != "bas"){
        dir = "haut";
        gameStart = true;
    }
    else if(e.key == "ArrowDown" || e.key == "s" && dir != "haut"){
        dir = "bas";
        gameStart = true;
    }
    else if(e.key == "ArrowLeft" || e.key == "q" && dir != "droite"){
        dir = "gauche";
        gameStart = true;
    }
    else if(e.key == "ArrowRight" || e.key == "d" && dir != "gauche"){
        dir = "droite";
        gameStart = true;
    }
    //console.log(e.key);
});

let backgroundColor = "green"
let snakeColor = "purple"
let pommeColor = "red"

let vars = initGame();
function initGame(){
    for (let i = 0; i < nb_colonne * nb_ligne; i++){
        tab[i].style.backgroundColor = backgroundColor;
    }
    
    let variables = {};
    variables.snake = [];
    variables.taille_snake = 5;
    variables.vitesse_snake = 100;
    variables.colonne = getRandomInt(nb_colonne);//spawn aleatoire
    variables.ligne = getRandomInt(nb_ligne);
    variables.index =  variables.ligne * nb_colonne + variables.colonne;
    affSnake(variables.snake,variables.taille_snake,variables.index);
    spawnPomme();
    return variables;
}

setInterval(moveSnake, vars.vitesse_snake);

function moveSnake() {
    if (!gameStart){
        return;
    }
    if(dir == "haut"){
        vars.ligne -= 1;
        if (vars.ligne < 0){
            vars.ligne = nb_ligne - 1;
        }
    }
    else if(dir == "bas"){
        vars.ligne += 1;
        if (vars.ligne >= nb_ligne){
            vars.ligne = 0;
        }
    }
    else if(dir == "gauche"){
        vars.colonne -= 1;
        if(vars.colonne < 0){
            vars.colonne = nb_colonne - 1;
        }
    }
    else if(dir == "droite"){
        vars.colonne += 1;
        if(vars.colonne >= nb_colonne){
            vars.colonne = 0;
        }
    }
    vars.index = vars.ligne * nb_colonne + vars.colonne;
    console.log(vars.ligne,vars.colonne);

    if (tab[vars.index].style.backgroundColor == snakeColor){
        alert("Game Over");
        vars = initGame();
        gameStart = false;
        return;
    }
    else if(tab[vars.index].style.backgroundColor == pommeColor){
        vars.taille_snake += 1;
        vars.vitesse_snake -= 100;
        spawnPomme();
    }
    affSnake(vars.snake,vars.taille_snake,vars.index);
    //console.log(vars.index);
}

function affSnake(snake,taille_snake,index){
    if (snake.length >= taille_snake){
        let queue = snake.shift();
        tab[queue].style.backgroundColor = backgroundColor;
    }
    snake.push(index);
    tab[index].style.backgroundColor = snakeColor;
    console.log(snake);
}

function spawnPomme(){
    let co = getRandomInt(nb_colonne * nb_ligne);
    if (tab[co].style.backgroundColor == snakeColor){
        spawnPomme();
        return;
    }
    tab[co].style.backgroundColor = pommeColor;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function sleep(millis){
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

function botton_parametre(){
    let div = document.getElementById("jeu");
    if (div.style.display == "none"){
        div.style.display = "block";
        vars = initGame();
        gameStart = false;
    }
    else{
        div.style.display = "none";
    }
}