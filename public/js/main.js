const offerForm = document.getElementById('offerForm');
const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const textArea = document.getElementById('description');   
const imageInput = document.getElementById('image');
const submitBtn = document.getElementById('submit');

offerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(offerForm);    
    
    formData.append('title', titleInput.value);
    formData.append('price', priceInput.value);
    formData.append('image', imageInput.files[0]);


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
});