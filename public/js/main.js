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
        const offersData = await offersRes.json();

        offersContainer.innerHTML = '';
        for (let offer of offersData.offers) {
            console.log(offer.imageId)
            const offerDiv = document.createElement('div');
            offerDiv.classList.add("offerDiv")
            offerDiv.innerHTML = `
            <p>${offer.title}</p>
            <p>${offer.price}</p>
            <p>${offer.description}</p>
            <img src="${offer.imageId}" alt="offer image" width="200">
            `;
            offersContainer.appendChild(offerDiv);
        }

    }catch(err){
        console.log(err);
    }
}
