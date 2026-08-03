const menuContainer = document.getElementById("menu");
const campaignText = document.getElementById("campaignText");
const searchInput = document.getElementById("searchInput");
const buttons = document.querySelectorAll("nav button");

let menuData = null;
let currentCategory = "all";

fetch("data/menu.json")
.then(res => res.json())
.then(data => {

    menuData = data;

    campaignText.innerHTML =
        `<strong>${data.campaign.title}</strong><br>${data.campaign.description}`;

    renderMenu();

});

function renderMenu(){

    menuContainer.innerHTML = "";

    if(!menuData) return;

    const keyword = searchInput.value.toLowerCase();

    menuData.categories.forEach(category=>{

        if(currentCategory!="all" && category.id!=currentCategory){
            return;
        }

        let products = category.items.filter(item=>{

            return item.name.toLowerCase().includes(keyword);

        });

        if(products.length===0){
            return;
        }

        const title=document.createElement("h2");
        title.innerHTML=category.name;
        title.style.margin="25px 0 10px";
        title.style.gridColumn="1/-1";

        menuContainer.appendChild(title);

        products.forEach(item=>{

            const card=document.createElement("div");

            card.className="card";

            card.innerHTML=`

<img src="${item.image}" onerror="this.src='https://placehold.co/600x400?text=Nişlen+Cafe'">

<div class="card-body">

<div class="category">

${category.name}

</div>

<h3>

${item.name}

</h3>

<p class="description">

${item.description=="" ? "Açıklama yakında eklenecek." : item.description}

</p>

<div class="price">

${item.price==0 ? "" : item.price+" ₺"}

</div>

</div>

`;

            menuContainer.appendChild(card);

        });

    });

}

searchInput.addEventListener("keyup",()=>{

    renderMenu();

});

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        buttons.forEach(b=>b.classList.remove("active"));

        button.classList.add("active");

        currentCategory=button.dataset.category;

        renderMenu();

    });

});
