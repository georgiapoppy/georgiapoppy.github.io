var shoes = [
    {"image": "shoe1.png", "name": "Dunk Lows", "style": "Casual", "size": 7, "price": 100}, 
    {"image": "shoe2.png", "name": "Running Shoes", "style": "Athletic", "size": 8, "price": 150}, 
    {"image": "shoe3.png", "name": "Zoom Superfly", "style": "Football", "size": 9, "price": 200}
]

var list = [];


function displayShoes() {
    for(let i = 0; i<shoes.length; i++) {
        shoe = shoes[i]
        let shoeDiv = document.createElement("div");
        shoeDiv.innerHTML = `<img src="${shoe.image}" alt="shoe image">
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
    var name = document.getElementById("name").value;
    var priceLess = document.getElementById("less").value;
    var priceGreater = document.getElementById("greater").value;
    var size = document.getElementById("size").value;
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
        if ((name.length == 0) || (shoes[i].name == name)) {
            if ((isNaN(priceLess)) || (shoes[i].price <= priceLess)) {
                if ((isNaN(priceGreater)) || (shoes[i].price >= priceGreater)) {
                    if ((isNaN(size)) || (shoes[i].size == size)) {
                        if ((style < 1) || (shoes[i].style == style)) {
                            list.push(shoes[i])
                        }
                    }
                }
            }
        }
    }

    for(let i = 0; i<list.length; i++) {
        shoe = list[i]
        let shoeDiv = document.createElement("div");
        shoeDiv.innerHTML = `<img src="${shoe.image}" alt="shoe image">
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
