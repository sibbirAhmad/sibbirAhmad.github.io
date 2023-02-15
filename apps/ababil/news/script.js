let tabs = document.querySelectorAll(".tabs h3");
let tabContents = document.querySelectorAll(".tab-content div");


const continant =["Popular","Asia","Africa","North America",
"South America","Antarctica","Europe","Australia"];
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabContents.forEach((content) => {
      content.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    console.log("Clicked : "+continant[index]);
    document.getElementById("title").innerHTML = continant[index]
    if(index==0){ //Load All Country [Just for popular News paper]
      getCountryJson("All");
    }else{ //Loa
      
      getCountryJson(continant[index]);
    }
    
    tabContents[0].classList.add("active");
    tabs[index].classList.add("active");

  });
  function processData(index){
   // document.getElementById("title").innerHTML = papers[index];
  }
});
getLocalJson("papers.json","popular",null);
function getLocalJson(url,continant,country) {
  // fetch("https://fcm-demo-18523-default-rtdb.firebaseio.com/data.json")
  fetch(url)
      .then(response => {
          return response.json();
      })
      .then(jsondata => processLocalJson(jsondata,continant,country));
}

var myc;
function processLocalJson(data,continant,country) {
  var d = JSON.stringify(data);
  const obj = JSON.parse(d);
  clearActivePapers(); //First clear all shown papers
  myc = document.getElementById("myc");
  for(let i = 0; i<obj.length;i++){
    var paper = obj[i];
    if(continant!=null){
      if(continant=="All" && paper.popular==1){
         createPaper(paper);
      }else if(paper.continent==continant){
        createPaper(paper);
      }
      
    }else if(country!=null && paper.country==country){
      createPaper(paper);
    }

  }
}

function createPaper(paper){
  var name = paper.name;
  var icon = paper.icon;
  var url = paper.url;
  var rootSection = document.createElement("section");
  rootSection.className = "column";
  var cardSection = document.createElement("section");
      var anchorTag = document.createElement("a");
      anchorTag.href = url;
      cardSection.className = "card"
     var logoImg = document.createElement("img");
        logoImg.src = icon;
     var titlePara = document.createElement("p");
        titlePara.innerHTML = name;
      cardSection.appendChild(logoImg);
      cardSection.appendChild(titlePara);
      anchorTag.appendChild(cardSection)
  rootSection.appendChild(anchorTag); 
  myc.appendChild(rootSection);
}

// #REGION : COUNTRY querySelectorAll

//Process country data
function getCountryJson(continant) {
  // fetch("https://fcm-demo-18523-default-rtdb.firebaseio.com/data.json")
  fetch("country.json")
      .then(response => {
          return response.json();
      })
      .then(jsondata => processCountry(jsondata,continant));
}
let c = [];
let count = 0;
function processCountry(json,continant){
  countries = [];
  for (var i in json) {
    if(continant=="All"){
      countries[count] = json[i].country;
      count++;
    }else{
      if(json[i].continent==continant){
        countries[count] = json[i].country;
        count++;
      }
    }
  }
  addCountry();
  getLocalJson("papers.json",continant,null);
  console.log("Length : Loading all "+continant);
}
getCountryJson("All");

const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
options = wrapper.querySelector(".options");

// let countries = ["Afghanistan", "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium", "Bhutan",
//                  "Brazil", "Canada", "China", "Denmark", "Ethiopia", "Finland", "France", "Germany",
//                  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Italy", "Japan", "Malaysia",
//                  "Maldives", "Mexico", "Morocco", "Nepal", "Netherlands", "Nigeria", "Norway", "Pakistan",
//                  "Peru", "Russia", "Romania", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland",
//                  "Thailand", "Turkey", "Uganda", "Ukraine", "United States", "United Kingdom", "Vietnam"];
let countries = [];
function addCountry(selectedCountry) {
    options.innerHTML = "";
    countries.forEach(country => {
        let isSelected = country == selectedCountry ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}


function updateName(selectedLi) {
    searchInp.value = "";
    addCountry(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
    console.log("Selected Value : "+selectedLi.innerText);
    getLocalJson("/../../papers.json",null,selectedLi.innerText);
}
function clearActivePapers(){
  var myc = document.getElementById("myc");
    //myc.remove(); //Have to remove all previous data
    let papers = myc.querySelectorAll(".column section");
    for(let i =0; i<papers.length;i++){
        papers[i].remove();
    }
}
var con = []
searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = countries.filter(data => {
        return data.toLowerCase().startsWith(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
});

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));
//  #ENDREGION : COUNTRY