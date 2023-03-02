const loadCardAllData=()=>{
     const url='https://openapi.programming-hero.com/api/ai/tools';
     fetch(url)
     .then(res=> res.json())
     .then(data => displayCardData(data.data.tools))
}
const displayCardData=allCardData=>{
     // console.log(allCardData);
     const cardContainer=document.getElementById('card-container');
     allCardData.slice(0,6).forEach(singleCardData => {
          console.log(singleCardData);
          const{image, features, name, published_in}=singleCardData;
          cardContainer.innerHTML+=`
          <div class="col">
          <div class="card h-100">
             <img src="${image}" class="card-img-top p-3 rounded-5" height="200px" width="200px" alt="...">
           <div class="card-body">
             <h5 class="card-title">Features</h5>
             <ol>
             <li>${features[0]}</li>
             <li>${features[1]}</li>
             <li>${features[2]}</li>
             </ol>
             <hr class="container">
           </div>
           <h4 class="ps-3">${name}</h4>
           <div class="d-flex justify-content-between px-3">
           <div class="d-flex gap-1 align-items-center">
           <i class="fa-solid fa-calendar-days mb-3"></i>
           <p>${published_in}</p>
           </div>   
           <i class="fa-solid fa-arrow-right text-danger pe-4"></i>
           </div>
           </div>
          </div>
         </div>
          `
     });
}
loadCardAllData()