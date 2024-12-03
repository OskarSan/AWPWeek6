const offerForm = document.getElementById('offerForm');
const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const textArea = document.getElementById('description');   
const imageInput = document.getElementById('image');
const submitBtn = document.getElementById('submit');
const offersContainer = document.getElementById('offersContainer');
updateOffers();
offerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('submit');
    const formData = new FormData(offerForm);    
    
    formData.append('title', titleInput.value);
    formData.append('price', priceInput.value);
    formData.append('image', imageInput.files[0]);

    if(titleInput.value){
        console.log('title is not empty');
        try{
            console.log(...formData.entries());
            const res = await fetch('/upload', {
                method: 'POST',
                body: formData 
            });
            const data = await res.json();
            console.log(data);
        }catch(err){
            console.log(err);
        }
        
        offerForm.reset();
    }
    
    updateOffers();
});

async function updateOffers(){
    try{
        const offersRes = await fetch('/offers', {
            method: 'GET'
        });
        const offers = await offersRes.json();
        console.log(offers.length, "offers");
        offersContainer.innerHTML = '';
        for (let offer of offers) {
            console.log(offer.imageId);
            const offerDiv = document.createElement('div');
            offerDiv.classList.add("col", "s12", "m6", "l4");

            const cardDiv = document.createElement('div');
            cardDiv.classList.add("card", "hoverable");

            const cardImageDiv = document.createElement('div');
            cardImageDiv.classList.add("card-image");

            const img = document.createElement('img');
            img.classList.add("responsive-img");
            img.src = offer.imagePath || '';

            const cardTitle = document.createElement('span');
            cardTitle.classList.add("card-title");
            cardTitle.textContent = offer.title;

            cardImageDiv.appendChild(img);
            cardImageDiv.appendChild(cardTitle);
            cardDiv.appendChild(cardImageDiv);

            const cardContent = document.createElement('div');
            cardContent.classList.add("card-content");
            cardContent.innerHTML = `
                <p>${offer.description}</p>
                <p>${offer.price}</p>
            `;

            cardDiv.appendChild(cardContent);
            offerDiv.appendChild(cardDiv);
            offersContainer.appendChild(offerDiv);
        }
    }catch(err){
        console.log(err);
    }
}