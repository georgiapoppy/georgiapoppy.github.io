var list = [];

function updateList() {
    document.getElementById('search').innerHTML = '';

    for(let i = 0; i<list.length; i++){
        let shoe = list[i];
        let shoeDiv = document.createElement("div");

        shoeDiv.innerHTML = `<img src="${shoe.image}" alt="shoe image">
                            <h3>${shoe.name}</h3>
                            <ul>
                                <li><p class="item">Brand: ${shoe.brand}</p></li>
                                <li><p class="item">Style: ${shoe.style}</p></li>
                                <li><p class="item">Size: ${shoe.size}</p></li>
                                <li><p class="item">Price: $${shoe.price}</p></li>
                            </ul>
                            <br>`;

        document.getElementById("search").appendChild(shoeDiv);
    }
}

function displayShoes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            list = JSON.parse(this.responseText);
            updateList();
        }
    };
    xhttp.open("GET", "/shoes", true);
    xhttp.send();
}

function displayShoesFilter() {
    var name = document.getElementById("name").value;
    var priceLess = document.getElementById("less").value;
    var priceGreater = document.getElementById("greater").value;
    var size = document.getElementById("size").value;
    var style, brand = null;
    if (document.getElementById('Casual').checked) {
        style = document.getElementById("Casual").value;
    } else if (document.getElementById('Athletic').checked) {
        style = document.getElementById("Athletic").value;
    } else if (document.getElementById('Football').checked) {
        style = document.getElementById("Football").value;
    }
    if (document.getElementById('Nike1').checked) {
        brand = document.getElementById("Nike1").value;
    } else if (document.getElementById('Nike2').checked) {
        brand = document.getElementById("Nike2").value;
    } else if (document.getElementById('Nike3').checked) {
        brand = document.getElementById("Nike3").value;
    }
    fetch('/shoesFilter', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, priceLess, priceGreater, size, style, brand })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('search').innerHTML = '';
        data.rows.forEach(shoe => {
            let shoeDiv = document.createElement("div");
            shoeDiv.innerHTML = `<img src="${shoe.image}" alt="shoe image">
                                <h3>${shoe.name}</h3>
                                <ul>
                                    <li><p class="item">Brand: ${shoe.brand}</p></li>
                                    <li><p class="item">Style: ${shoe.style}</p></li>
                                    <li><p class="item">Size: ${shoe.size}</p></li>
                                    <li><p class="item">Price: $${shoe.price}</p></li>
                                </ul>
                                <br>`;
            document.getElementById("search").appendChild(shoeDiv);
        });
    })
    .catch(error => console.error('Error:', error));
}