var shoes = [
    {"image": "shoe1.png", "name": "Dunk Lows", "brand": "Nike", "style": "Casual", "size": 7, "price": 100}, 
    {"image": "shoe2.png", "name": "Running Shoes", "brand": "Nike", "style": "Athletic", "size": 8, "price": 150}, 
    {"image": "shoe3.png", "name": "Zoom Superfly", "brand": "Nike", "style": "Football", "size": 9, "price": 200}
]

var list = [];


function displayShoes() {
    for(let i = 0; i<shoes.length; i++) {
        let shoeDiv = document.createElement("div");
        shoeDiv.innerHTML = `<img src="${shoes.image}" alt="shoe image">
                            <h3>${shoes.name}</h3>
                            <ul>
                                <li><p class="item">Brand: ${shoes.brand}</p></li>
                                <li><p class="item">Style: ${shoes.style}</p></li>
                                <li><p class="item">Size: ${shoes.size}</p></li>
                                <li><p class="item">Price: $${shoes.price}</p></li>
                            </ul>
                            <br>`;
        document.getElementById("search").appendChild(shoeDiv);
    };
};


function displayShoesFilter() {
    var name = document.getElementById("name").value;
    var priceLess = document.getElementById("less").value;
    var priceGreater = document.getElementById("greater").value;
    var size = document.getElementById("size").value;
    var brand = document.getElementById("Nike").value;
    var style = null;
    if (document.getElementById('Casual').checked) {
        style = document.getElementById("Casual").value;
    } else if (document.getElementById('Athletic').checked) {
        style = document.getElementById("Athletic").value;
    } else if (document.getElementById('Football').checked) {
        style = document.getElementById("Football").value;
    }
    document.getElementById('search').innerHTML = '';

    for(let i = 0; i<shoes.length; i++) {
        if (shoes[i].name == name) {
            if ((shoes[i].price <= priceLess) && (shoes[i].price >= priceGreater)) {
                if ((shoes[i].size == size) && (shoes[i].brand == brand)) {
                    if (shoes[i].style == style) {
                        list.push(shoes[i])
                    }
                }
            }
        }
    }
    for(let i = 0; i<list.length; i++) {
        let shoeDiv = document.createElement("div");
        shoeDiv.innerHTML = `<img src="${list.image}" alt="shoe image">
                            <h3>${list.name}</h3>
                            <ul>
                                <li><p class="item">Brand: ${list.brand}</p></li>
                                <li><p class="item">Style: ${list.style}</p></li>
                                <li><p class="item">Size: ${list.size}</p></li>
                                <li><p class="item">Price: $${list.price}</p></li>
                            </ul>
                            <br>`;
        document.getElementById("search").appendChild(shoeDiv);
    };
};
