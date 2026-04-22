document.addEventListener("DOMContentLoaded", function(){

/* ===============================
   GLOBAL VARIABLES
================================= */
const itemsPerPage = 6;
let allItems = document.querySelectorAll(".gallery .art");
let filteredItems = [...allItems];
let currentPage = 1;
const pagination = document.getElementById("pagination");

/* ===============================
   SCROLL ANIMATION
================================= */
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".art").forEach(el=>{
  observer.observe(el);
});

/* ===============================
   FULLSCREEN IMAGE VIEWER
================================= */
window.openViewer = function(img){
  document.getElementById("viewer").style.display="flex";
  document.getElementById("viewer-img").src=img.src;
}

window.closeViewer = function(){
  document.getElementById("viewer").style.display="none";
}

/* ===============================
   PAGINATION
================================= */
function showPage(page){
  currentPage = page;

  const start = (page-1)*itemsPerPage;
  const end = start + itemsPerPage;

  filteredItems.forEach((item,index)=>{
    item.style.display = (index>=start && index<end) ? "block":"none";
  });

  // active button highlight
  document.querySelectorAll("#pagination button").forEach(btn=>{
    btn.classList.remove("active");
  });

  if(document.querySelector(`#pagination button:nth-child(${page})`)){
    document.querySelector(`#pagination button:nth-child(${page})`).classList.add("active");
  }
}

function setupPagination(){

  if(!pagination) return;

  pagination.innerHTML = "";

  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  if(pageCount <= 1){
    pagination.style.display = "none";
    return;
  } else {
    pagination.style.display = "block";
  }

  for(let i=1; i<=pageCount; i++){
    const btn = document.createElement("button");
    btn.innerText = i;

    btn.addEventListener("click", ()=>{
      showPage(i);
    });

    pagination.appendChild(btn);
  }

  showPage(1);
}

/* ===============================
   FILTER
================================= */
document.querySelectorAll(".filters button").forEach(btn=>{
  btn.addEventListener("click", function(){

    const category = this.getAttribute("data-filter");

    filteredItems = [];

    allItems.forEach(item=>{
      if(category === "all" || item.classList.contains(category)){
        filteredItems.push(item);
      }
    });

    // active button UI
    document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));
    this.classList.add("active");

    setupPagination();
  });
});

/* ===============================
   SEARCH
================================= */
window.searchArtworks = function(){

  const input = document.getElementById("searchArt").value.toLowerCase();

  filteredItems = [];

  allItems.forEach(item=>{
    const title = item.querySelector("h3").innerText.toLowerCase();

    if(title.includes(input)){
      filteredItems.push(item);
    }
  });

  setupPagination();
}

/* ===============================
   INQUIRY (WHATSAPP)
================================= */
window.inquireArt = function(title){

  const message = `Hello, I am interested in the artwork: ${title}`;
  const whatsapp = `https://wa.me/917827662454?text=${encodeURIComponent(message)}`;

  window.open(whatsapp, "_blank");
}

/* ===============================
   HEADER / FOOTER LOAD
================================= */
fetch("header.html")
.then(res => res.text())
.then(data => {
  const header = document.getElementById("header");
  if(header) header.innerHTML = data;
});

fetch("footer.html")
.then(res => res.text())
.then(data => {
  const footer = document.getElementById("footer");
  if(footer) footer.innerHTML = data;
});

/* ===============================
   INITIAL LOAD
================================= */
setupPagination();

  function toggleMenu() {
     document.getElementById("navMenu").classList.toggle("show");
  }
});
