const state ={
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    actions:{
        button:document.getElementById("next-duel"),
    },
};

const playersSides = {
    player1: "player-cards",
    computer: "computer-cards",

};

const pathImages = "./src/assets/icons";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: '${pathImages}/dragon.png',
        WinOf: [1],
        LoseOf: [2],
    }
]

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(randomIdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", randomIdCard);
    cardImage.classList.add("card");


    if(fieldSide === playersSides.player1){
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(randomIdCard);
        });
        
        cardImage.addEventListener("click", ()=>{
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }

    cardImage.addEventListener("mouseover", ()=>{
        drawSelectCard(randomIdCard);
    });

    return cardImage;
}

async function setCardsField(cardId) {
    
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId, computerCardId);


    await updateScore();
    await drawButton(duelResults);
}

async function drawSelectCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute : " + cardData
    [index].type;
}

async function drawCards(cardNumbers, fieldSide) {
    for(let i = 0; i < cardNumbers; i++ ) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);


        document.getElementById(fieldSide).appendChild(cardImage);
    }
}


function init(){
    drawCards(5, playersSides.player1);
    drawCards(5, playersSides.computer);
}

init();