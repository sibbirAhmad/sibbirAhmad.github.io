'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }




// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

getProjects();
function getProjects() {
  fetch("https://fcm-demo-18523-default-rtdb.firebaseio.com/data.json")
      .then(response => {
          return response.json();
      })
      .then(jsondata => showProjects(jsondata));
//   fetch("https://fcm-demo-18523-default-rtdb.firebaseio.com/projects.json")
// .then(function(response) {
//   return response.json();
// }).then(jsondata =>  showProjects(jsondata)
// ).catch(function() {
//   console.log("Can't get data from firebase");
// });

}
function showProjects(data){
  var projects = data.projects;
  
for(var key in projects){
  var project = projects[key];

  //Todo : Creating dynamic element
  var projejctItem = document.createElement("li");
 
    projejctItem.className = "project-item active"
  
  projejctItem.setAttribute('data-filter-item', '')
  projejctItem.setAttribute('data-category', project.category.toLowerCase())
  //Creating href Link 
  var a = document.createElement("a");
  a.href = project.url;
 
  //Creating feagure
  var figure = document.createElement("figure");
  figure.className = "project-img";
  //Creatong Div
  var iconDiv = document.createElement("div");
  iconDiv.className = "project-item-icon-box";
  var ionicon = document.createElement("ion-icon");
  ionicon.setAttribute("name","eye-outline");
  iconDiv.appendChild(ionicon);
  //Creating image for
  var img = document.createElement("img");
  img.src = project.featureImage;
  img.alt = project.title; //Have to add App Name here
  img.loading = "lazy";
  figure.appendChild(img);
  a.append(figure);
  //project-title
  var projectTitle = document.createElement("h3");
  projectTitle.className = "project-title";
  projectTitle.setAttribute("page",project.folder);//Add project folder here
  projectTitle.innerHTML = project.title;//Add Project Name here
  a.appendChild(projectTitle);
  //Project Category
  var categoryP = document.createElement("p");
  categoryP.className = "project-category";
  categoryP.innerHTML = project.category +" ("+project.language+")";
  a.appendChild(categoryP);
  //And Then Add the a to the list
  projejctItem.appendChild(a);

  document.getElementsByClassName("project-list")[0].appendChild(projejctItem);
 projejctItem.addEventListener('click', showProject, false);

}
filterEvent();
}


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
function filterEvent(){
  var selectItems = document.querySelectorAll("[data-select-item]");
  console.log("Data Select Item : "+selectItems.length);
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
  
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
  
    });
  }
}

var showProject = function() {
  var page = this.getElementsByClassName("project-title")[0].getAttribute("page");
  if(page!=null && page!=""){
    if(page.startsWith("http")){
     page = page;
    }else{
      page = "./data/project/"+page+"/index.html";
    }
    showD(page);
  }else{
  }
  //var html ="./assets/data/project/finger_door_lock/index.html"; 
  return false;
};
function getFile(U) {
  var X = new XMLHttpRequest();
  X.open('GET', U, false);
  X.send();
return X.responseText;
}

// var elements = document.getElementsByClassName("project-item");
// console.log(elements.length);
// for (var i = 0; i < elements.length; i++) {
//   elements[i].addEventListener('click', showProject, false);
  
// }


function MyFunction(){
 alert("Hi");
}
// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  var filterItems = document.querySelectorAll("[data-filter-item]");
  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
