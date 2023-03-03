const loadCardAllData=()=>{
     const url='https://openapi.programming-hero.com/api/ai/tools';
     fetch(url)
     .then(res=> res.json())
     .then(data => displayCardData(data.data.tools))
}
const displayCardData=allCardData=>{
     // console.log(allCardData);
     const cardContainer=document.getElementById('card-container');
     allCardData.slice().forEach(singleCardData => {
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

          <div class="col p-2">
          <div class="card h-100 text-bg-danger bg-opacity-10">
            <div class="card-body">
              <h5 class="card-title text-black">${data.description}</h5>
              <div class="d-flex justify-content-center mt-4 gap-2">

              <div class="p-2 text-bg-danger rounded-3 text-success">
              <p>${data.pricing[0].price}<br>${data.pricing[0].plan}</p>
              </div>

              <div class="p-2 text-bg-danger rounded-3 text-warning">
              <p>${data.pricing[1].price}<br>${data.pricing[1].plan}</p>
              </div
              >
              <div class="p-2 text-bg-danger rounded-3 text-danger">
              <p>${data.pricing[2].price}<br>${data.pricing[2].plan}</p>
              </div>
              </div>

              <div class="text-black d-flex justify-content-between mt-3">
              <div>
              <h5>Features</h5>
              <ul class="text-dark">
              <li>${data.features[1].feature_name}</li>
              <li>${data.features[2].feature_name}</li>
              <li>${data.features[3].feature_name}</li>
              </ul>
              </div>

              <div>
              <h5>Integrations</h5>
              <ul class="text-dark">
                <li>${data.integrations[0]}</li>
                <li>${data.integrations[1]}</li>
                <li>${data.integrations[2]}</li>
              </ul>
            </div>
            </div>
            </div>
          </div>
        </div>

        <div class="col text-center">
          <div class="card h-100">
          <img src="${data.image_link[0]}" class="card-img-top p-2 rounded-4" height="200px" width="200px" alt="...">
          <div class="card-body">
          <h5 class="card-title">${data.input_output_examples[0].input}</h5>
          <p>${data.input_output_examples[0].output}</p>
          </div>
          </div>
          <button class="btn btn-danger position-relative position-absolute top-0 end-0" >${data.accuracy.score} accuracy</button>
        </div>
          `
     }
loadCardAllData()