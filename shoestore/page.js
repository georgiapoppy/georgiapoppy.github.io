var shoes = [
    {"image": "shoe1.webp", "name": "Dunk Lows", "style": "Casual", "size": 7, "price": 100}, 
    {"image": "shoe2.webp", "name": "Womens Running Shoes", "style": "Athletic", "size": 8, "price": 150}, 
    {"image": "shoe3.webp", "name": "Zoom Superfly", "style": "Football", "size": 9, "price": 200},
    {"image": "shoe4.webp", "name": "Blue Dunks", "style": "Casual", "size": 9, "price": 120},
    {"image": "shoe5.webp", "name": "Airforces", "style": "Casual", "size": 7, "price": 220},
    {"image": "shoe6.webp", "name": "Mens Casual Shoes", "style": "Casual", "size": 8, "price": 185},
    {"image": "shoe7.webp", "name": "Mens Running Shoes", "style": "Athletic", "size": 7, "price": 170},
    {"image": "shoe8.webp", "name": "Pink Casual Shoes", "style": "Casual", "size": 8, "price": 140},
    {"image": "shoe9.webp", "name": "Black Casual Shoes", "style": "Casual", "size": 7, "price": 130},
    {"image": "shoe10.webp", "name": "Green Walking Shoes", "style": "Athletic", "size": 9, "price": 195},
]

function displayShoes() {
    for(let i = 0; i<shoes.length; i++) {
        shoe = shoes[i]
        let shoeDiv = document.createElement("div");
        shoeDiv.innerHTML = `<img src="shoes/${shoe.image}" alt="shoe image">
                            <h3>${shoe.name}</h3>
                            <ul>
                                <li><p class="item">Style: ${shoe.style}</p></li>
                                <li><p class="item">Size: ${shoe.size}</p></li>
                                <li><p class="item">Price: $${shoe.price}</p></li>
                            </ul>
                            <br>`;
        document.getElementById("search").appendChild(shoeDiv);
    };
};


function displayShoesFilter() {
    
    let name = document.getElementById("name").value.toLowerCase();
    let priceLess = parseFloat(document.getElementById("less").value) || Infinity;
    let priceGreater = parseFloat(document.getElementById("greater").value) || 0;
    let size = parseInt(document.getElementById("size").value) || null;
    let style = null;

    if (document.getElementById('Casual').checked) {
        style = "Casual";
    } else if (document.getElementById('Athletic').checked) {
        style = "Athletic";
    } else if (document.getElementById('Football').checked) {
        style = "Football";
    }
    
    document.getElementById('search').innerHTML = '';

    let filteredShoes = shoes.filter(shoe => {
        return (
            (name === "" || shoe.name.toLowerCase().includes(name)) &&
            (shoe.price >= priceGreater && shoe.price <= priceLess) &&
            (size === null || shoe.size === size) &&
            (style === null || shoe.style === style)
        );
    });

    for(let i = 0; i<filteredShoes.length; i++) {
        shoe = filteredShoes[i]
        let shoeDiv = document.createElement("div");
        shoeDiv.innerHTML = `<img src="shoes/${shoe.image}" alt="shoe image">
                            <h3>${shoe.name}</h3>
                            <ul>
                                <li><p class="item">Style: ${shoe.style}</p></li>
                                <li><p class="item">Size: ${shoe.size}</p></li>
                                <li><p class="item">Price: $${shoe.price}</p></li>
                            </ul>`;
        document.getElementById("search").appendChild(shoeDiv);
    };

    if (filteredShoes.length == 0) {
        let shoeDiv = document.createElement("div");
        shoeDiv.innerHTML = `<br><p>No shoes found :(</p><br>`;
        document.getElementById("search").appendChild(shoeDiv);
    }
};
