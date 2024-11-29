let cardImages = [
    "https://mystickermania.com/cdn/stickers/one-piece/one-piece-gomu-gomu-no-mi-fruit-512x512.png", 
    "https://mystickermania.com/cdn/stickers/anime/one-piece-mera-mera-no-mi-512x512.png", 
    "https://mystickermania.com/cdn/stickers/one-piece/one-piece-nami-loves-money-512x512.png", 
    "https://mystickermania.com/cdn/stickers/cartoons/sticker_5064-512x512.png", 
    "https://mystickermania.com/cdn/stickers/anime/one-piece-portgaz-d-ace-512x512.png", 
    "https://mystickermania.com/cdn/stickers/one-piece/one-piece-straw-pirates-flag-512x512.png", 
    "https://mystickermania.com/cdn/stickers/one-piece/one-piece-usopp-frog-512x512.png", 
    "https://mystickermania.com/cdn/stickers/anime/one-brook-heart-512x512.png"  
  ];

  let gameBoard = document.getElementById("game-board");
  let matchedPairs = 0;
  let flippedCards = [];
  let cardElements = [];
  
  function initializeGame() {
    matchedPairs = 0;
    document.getElementById("matched-pairs").textContent = matchedPairs;
    document.getElementById("remaining-pairs").textContent = cardImages.length;
  
    gameBoard.innerHTML = "";
  
    let images = [...cardImages, ...cardImages];
    images = images.sort(() => Math.random() - 0.5);
  
    images.forEach((image, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.index = index;
  
      const img = document.createElement("img");
      img.src = image;
  
      card.appendChild(img);
      card.addEventListener("click", handleCardClick);
      gameBoard.appendChild(card);
      cardElements.push(card);
    });
  }
  
  function handleCardClick(e) {
    const card = e.currentTarget;
  
    if (flippedCards.length >= 2 || card.classList.contains("flipped")) return;
  
    card.classList.add("flipped");
    flippedCards.push(card);
  
    if (flippedCards.length === 2) checkMatch();
  }
  
  function checkMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector("img").src;
    const img2 = card2.querySelector("img").src;
  
    if (img1 === img2) {
      matchedPairs++;
      document.getElementById("matched-pairs").textContent = matchedPairs;
      document.getElementById("remaining-pairs").textContent = cardImages.length - matchedPairs;
      flippedCards = [];
      if (matchedPairs === cardImages.length) alert("¡Felicidades! Has encontrado todas las parejas.");
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }
  
  document.getElementById("start-button").addEventListener("click", initializeGame);
  