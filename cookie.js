class Cookie {
    constructor() {
        this.value = 0;
        this.cooker = [];
    }

    getValue() {
        return this.value;
    }

    earnCookie() {
        return this.value++;
    }

    calculateCookieShop() {
        // Find cookie shop count
        let cookieShop = 0;
        cookie.cooker.forEach(e => {
            if (e.name === "Cookie Shop") {
                cookieShop += 1;
            }
        });
        return cookieShop;
    }

    calculateCookerMan() {
        // Find cookieman count
        let cookerMan = 0;
        cookie.cooker.forEach(e => {
            if (e.name === "Cooker Man") {
                cookerMan += 1;
            }
        });
        return cookerMan;
    }

    startGame() {
        UI.printCookie();
        UI.cookButton();
        UI.buyCooker();
    }
}

class Cooker {
    constructor(name, price, addCookie) {
        this.name = name;
        this.price = price;
        this.addCookie = addCookie;
    }

    cook() {
        setInterval(() => {
            cookie.value += this.addCookie;
            //console.log(cookie.value);
        }, 1000);
    }
}

class UI {
    // Print cookie
    static printCookie() {
        // DOM
        const cookies = document.getElementById("cookies");
        const cookermanPrice = document.getElementById("cookermanPrice");
        const cookerCount = document.getElementById("cookerCount");
        const cookieShopPrice = document.getElementById("cookieShopPrice");
        const cookieShopCount = document.getElementById("cookieShopCount");

        // Cookie
        setInterval(() => {
            cookies.innerHTML = `Cookie: ${cookie.getValue()}`;
        }, 100);
        // Cookerman price
        setInterval(() => {
            cookermanPrice.innerHTML = `Price: ${cookerMan.price}`;
            cookieShopPrice.innerHTML = `Price: ${cookieShop.price}`;
        }, 100);
        // Cookerman counter
        setInterval(() => {
            cookerCount.innerHTML = `You have ${cookie.calculateCookerMan()} cookerman`;
            cookieShopCount.innerHTML = `You have ${cookie.calculateCookieShop()} cookie shop`;
        }, 100);
    }

    // Click button and cook cookie
    static cookButton() {
        const cook = document.getElementById("cook");
        cook.addEventListener("click", e => {
            e.preventDefault();
            cookie.earnCookie();
        });
    }

    // Buy cooker button
    static buyCooker() {
        // DOM
        const buyCooker = document.getElementById("buyCooker");
        const buyCookieShop = document.getElementById("buyCookieShop");
        const error = document.getElementById("error");

        // Buy Cookerman
        buyCooker.addEventListener("click", e => {
            e.preventDefault();
            if (cookie.value >= cookerMan.price) {
                cookie.cooker.push({
                    name: cookerMan.name,
                    price: cookerMan.price,
                    addCookie: cookerMan.addCookie,
                });
                cookie.value -= cookerMan.price;
                cookerMan.price *= 2;
                cookerMan.cook();
            } else {
                // If don't have enough cookie
                error.style.display = "block";
                error.innerHTML = "You don't have enough cookies!";
                setTimeout(() => {
                    error.style.display = "none";
                }, 3000);
            }
        });
        // Buy Cookie Shop
        buyCookieShop.addEventListener("click", e => {
            e.preventDefault();
            if (cookie.value >= cookieShop.price) {
                cookie.cooker.push({
                    name: cookieShop.name,
                    price: cookieShop.price,
                    addCookie: cookieShop.addCookie,
                });
                cookie.value -= cookieShop.price;
                cookieShop.price *= 2;
                cookieShop.cook();
            } else {
                // If don't have enough cookie
                error.style.display = "block";
                error.innerHTML = "You don't have enough cookies!";
                setTimeout(() => {
                    error.style.display = "none";
                }, 3000);
            }
        });
    }
}

// Cookie
let cookie = new Cookie();
// Cookers
let cookerMan = new Cooker("Cooker Man", 10, 1);
let cookieShop = new Cooker("Cookie Shop", 1000, 50);

// Start game
cookie.startGame();
