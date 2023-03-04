// global variable
let dataArray=[];
const loadCardAllData=(noLimit)=>{
  // loader start 
  toggleLoader(true);
     const url='https://openapi.programming-hero.com/api/ai/tools';
     fetch(url)
     .then(res=> res.json())
     .then(data => {
      limitData(data.data.tools,noLimit)
     })
}
// see all condition function
const limitData=(limitCardData,noLimit)=>{
    // console.log(allCardData);
  if(noLimit!=true){
     limitCardData=limitCardData.slice(0,6);
    return displayCardData(limitCardData);
  }
  else{
    return displayCardData(limitCardData);
  }
};
const displayCardData=(allCardData)=>{
    dataArray=allCardData;
    // console.log(allCardData);
    const cardContainer=document.getElementById('card-container');
    cardContainer.textContent='';
     allCardData.forEach(singleCardData => {
          // console.log(singleCardData);
          const{image, features, name, published_in,id}=singleCardData;
          cardContainer.innerHTML+=`
          <div class="col">
          <div class="card h-100">
             <img src="${image}" class=" img-fluid card-img-top p-3 rounded-5" height="200px" width="200px" alt="...">
           <div class="card-body">
             <h5 class="card-title">Features</h5>
             <ol>
             ${features.map(a=>(`<li>${a}</;>`)).join('')}
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
          // stop loader
          toggleLoader(false);
     });
}
// sort data by date
customSort=(a,b)=>{
  const dateA=new Date(a.published_in);
  const dateB=new Date(b.published_in);
  if(dateA>dateB){
    return 1;
  }
  else if(dateA<dateB){
    return -1;
  }
  else{
    return 0;
  }
};
// sort date button handler
document.getElementById('sort-date').addEventListener('click',function(){
  const sortedData=dataArray.sort(customSort);
  displayCardData(sortedData);
})
// show all card button
    document.getElementById('btn-showAll').addEventListener('click',function(){
      loadCardAllData(true);
    })
// Modal section
     const loadSingleModalData=(cardId)=>{
          const url=`https://openapi.programming-hero.com/api/ai/tool/${cardId}`
          fetch(url)
          .then(res => res.json())
          .then(data =>showSingleModalData(data.data))
     }
     const showSingleModalData=data=>{
          console.log(data);
          const{description, pricing,features,integrations, image_link,input_output_examples,accuracy}=data;
          const{feature_name}=data;
          console.log(feature_name)
          document.getElementById('modal-container').innerHTML=`

          <div class="col p-2">
          <div class="card h-100 text-bg-danger bg-opacity-10">
            <div class="card-body">
              <h5 class="card-title text-black">${description?description:'No description' }</h5>

              <div class="row d-flex justify-content-center text-center flex-wrap flex-md-nowrap gap-3">

              <div class="py-3 col text-bg-danger rounded-3 text-success">
              <p>${pricing ? pricing[0].price : "Free of cost"}<br>
              ${pricing ? pricing[0].plan :"Basic"}</p>
              </div>

              <div class="py-3 col text-bg-danger rounded-3 text-warning">
              <p>${pricing ? pricing[1].price : "Free of cost"}<br>
              ${pricing ? pricing[1].plan :"Pro"}</p>
              </div>
              <div class="py-2 col text-bg-danger rounded-3 text-danger">
              <p>${pricing ? pricing[2].price : "Free of cost"}<br>
                 ${pricing ? pricing[2].plan :"Enterprise"}</p>
              </div>
              </div>

              <div class="row row-cols-1 row-cols-md-2 text-black mt-3 ">
              <div class="col">
              <h5>Features</h5>
              <ul class="text-dark">
              <li>${features[1].feature_name}</li>
              <li>${features[2].feature_name}</li>
              <li>${features[3].feature_name}</li>
              </ul>
              </div>

              <div class="col">
              <h5>Integrations</h5>
              <ul class="text-dark">
              ${integrations? integrations.map(a=>(`<li>${a}</li>`)).join(''):"No Data Found"}
              </ul>
            </div>
            </div>
            </div>
          </div>
        </div>

        <div class="col text-center">
          <div class="card h-100">
          <img src="${image_link[0]? data.image_link[0]:image_link[1]}" class=" img-fluid card-img-top p-2 rounded-4" height="200px" width="200px" alt="...">
          <div class="card-body">
          <h5 class="card-title">${input_output_examples===null ? "Can you give any example?":
          input_output_examples[0].input}</h5>
          <p>${input_output_examples===null ? "No! Not Yet! Take a break!!!":
           input_output_examples[0].output}</p>
          </div>
          </div>
          <button class="btn btn-danger position-absolute top-0 end-0 ${accuracy.score?'d-block':'d-none'}">${accuracy.score*100}% accuracy</button>
        </div>
          `
     }
    //  loader section
    const toggleLoader=isLoading=>{
      const loaderSection=document.getElementById('loader-section');
      if(isLoading){
        loaderSection.classList.remove('d-none');
      }
      else{
        loaderSection.classList.add('d-none');
      }
    }
loadCardAllData()