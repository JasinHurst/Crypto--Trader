const button = document.querySelector("#getPriceBtn");
const input = document.querySelector("#symbolInput");
const result = document.querySelector("#result");


button.addEventListener("click", async () => {
   let text = input.value.trim().toLowerCase();
   if (text === "") {
    result.textContent = "Please enter a symbol";
   } else {
    result.textContent = "Loading...";
   
      const url = `https://api.coingecko.com/api/v3/search?query=${text}`; 
      const response = await fetch(url);
      const data = await response.json();
      let coins = data.coins;
      let match = coins.find(coin => coin.symbol.toLowerCase() === text);
      if (!match) {
         result.textContent = "Invalid symbol. Try BTC, ETH, etc.";
         console.log(match);
         return;
      }
         const marketURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${match.id}`;
         const marketResponse = await fetch(marketURL);
         const marketData = await marketResponse.json();
         let coinInfo = marketData[0];
         result.innerHTML = `
         <p>Coin name: ${coinInfo.name}</p>
         <p>Symbol: ${coinInfo.symbol.toUpperCase()}</p>
         <p>Price: $${coinInfo.current_price.toLocaleString()}</p>
         <p>24h Change: ${coinInfo.price_change_percentage_24h.toFixed(2)}%</p>
         <p>Market Cap: $${coinInfo.market_cap.toLocaleString()}</p>
         `;
                           
   }
});