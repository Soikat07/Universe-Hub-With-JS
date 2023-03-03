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
          // console.log(singleCardData);
          const{image, features, name, published_in,id}=singleCardData;
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
           <i onclick="loadSingleModalData('${id}')" class="fa-solid fa-arrow-right text-danger pe-4 "data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
           </div>
           </div>
          </div>
         </div>
          `
     });
}
// Modal section
     const loadSingleModalData=(cardId)=>{
          const url=`https://openapi.programming-hero.com/api/ai/tool/${cardId}`
          fetch(url)
          .then(res => res.json())
          .then(data =>showSingleModalData(data.data))
     }
     const showSingleModalData=data=>{
          console.log(data);
          document.getElementById('modal-container').innerHTML=`
          <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${data.description}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
        <div class="col text-center">
          <div class="card h-100">
            <img src="${data.image_link[0]}" class="card-img-top p-2 rounded-5" alt="...">
            <div class="card-body">
               <h5 class="card-title">${data.input_output_examples[0].input}</h5>
              <p>${data.input_output_examples[0].output}</p>
            </div>
          </div>
        </div>
          `
     }
loadCardAllData()