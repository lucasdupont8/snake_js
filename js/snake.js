
let taille_ligne = 10
let taille_colonne = 10
let div=document.getElementById("jeu");
for (let i = 0; i < taille_ligne; i++){
    let ligne=document.createElement("div");
    ligne.className="ligne";
    div.appendChild(ligne);
    for (let i = 0; i < taille_colonne; i++){
        let colonne=document.createElement("div");
        colonne.className="case";
        ligne.appendChild(colonne);
    }
}

let tab=document.getElementsByClassName("case");
let gameStar = false;
let dir;

document.addEventListener("keydown",(e)=>{
    if(e.key == "ArrowUp" || e.key == "z" && dir != "bas"){
        dir = "haut";
        gameStar = true;
    }
    else if(e.key == "ArrowDown" || e.key == "s" && dir != "haut"){
        dir = "bas";
        gameStar = true;
    }
    else if(e.key == "ArrowLeft" || e.key == "q" && dir != "droite"){
        dir = "gauche";
        gameStar = true;
    }
    else if(e.key == "ArrowRight" || e.key == "d" && dir != "gauche"){
        dir = "droite";
        gameStar = true;
    }
    //console.log(e.key);
});

let backgroundColor = "green"
let snakeColor = "purple"
let pommeColor = "red"

let vars = initGame();
function initGame(){
    for (let i = 0; i < taille_colonne * taille_ligne; i++){
        tab[i].style.backgroundColor = backgroundColor;
    }
    
    let varables = {};
    varables.snake = [];
    varables.taille_snake = 5;
    varables.vitesse_snake = 500;
    varables.colonne = getRandomInt(taille_colonne);//spawn aleatoire
    varables.ligne = getRandomInt(taille_ligne);
    varables.index =  varables.colonne * taille_colonne + varables.ligne;
    affSnake(varables.snake,varables.taille_snake,varables.index);
    spawnPomme();
    return varables;
}
/*
let snake = vars.snake;
let taille_snake = vars.taille_snake;
let vitesse_snake = vars.vitesse_snake;
let colonne = vars.colonne;
let ligne = vars.ligne;
let index = vars.index;
*/
setInterval(moveSnake, vars.vitesse_snake);

function moveSnake() {
    if (!gameStar){
        return;
    }
    if(dir == "haut"){
        vars.colonne -= 1;
        if (vars.colonne < 0){
            vars.colonne = taille_colonne - 1;
        }
    }
    else if(dir == "bas"){
        vars.colonne += 1;
        if (vars.colonne >= taille_colonne){
            vars.colonne = 0;
        }
    }
    else if(dir == "gauche"){
        vars.ligne -= 1;
        if(vars.ligne < 0){
            vars.ligne = taille_ligne - 1;
        }
    }
    else if(dir == "droite"){
        vars.ligne += 1;
        if(vars.ligne >= taille_ligne){
            vars.ligne = 0;
        }
    }
    vars.index = vars.colonne * taille_colonne + vars.ligne;

    if (tab[vars.index].style.backgroundColor == snakeColor){
        alert("Game Over");
        vars = initGame();
        gameStar = false;
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
    let co = getRandomInt(taille_colonne * taille_ligne);
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