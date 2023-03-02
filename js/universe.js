const loadCardAllData=()=>{
     const url='https://openapi.programming-hero.com/api/ai/tools';
     fetch(url)
     .then(res=> res.json())
     .then(data => displayCardData(data.data.tools))
}
const displayCardData=allCardData=>{
     // console.log(allCardData);
     const cardContainer=document.getElementById('card-container');
     allCardData.forEach(singleCardData => {
          console.log(singleCardData);
          cardContainer.innerHTML+=`
          <div class="col">
          <div class="card h-100">
             <img src="..." class="card-img-top" alt="...">
           <div class="card-body">
             <h5 class="card-title">Card title</h5>
             <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
           </div>
             <div class="card-footer">
             <small class="text-muted">Last updated 3 mins ago</small>
             </div>
          </div>
         </div>
          `
     });
}
loadCardAllData()