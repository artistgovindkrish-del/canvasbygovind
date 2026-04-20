const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".art").forEach(el=>{
  observer.observe(el);
});

<!--fetch header & footer html file-->
fetch("header.html")
.then(response => response.text())
.then(data => {
  document.getElementById("header").innerHTML = data;
});
fetch("footer.html")
.then(response => response.text())
.then(data => {
  document.getElementById("footer").innerHTML = data;
});

<!--Open viewer to enlage images-->
function openViewer(img){
  document.getElementById("viewer").style.display="flex";
  document.getElementById("viewer-img").src=img.src;
}
function closeViewer(){
  document.getElementById("viewer").style.display="none";
}

/*Start filter by category*/
function filterArt(category){
  const items=document.querySelectorAll(".art");

  items.forEach(item=>{

	if(category==="all"){
	  item.style.display="block";
	}else if(item.classList.contains(category)){
	  item.style.display="block";
	}else{
	  item.style.display="none";
	}
  });
}
/*End filter*/

/*Start search box*/
function searchArtworks(){
  const input=document.getElementById("searchArt").value.toLowerCase();
  const artworks=document.querySelectorAll(".art");

  artworks.forEach(item=>{
	const title=item.querySelector("h3").innerText.toLowerCase();

	if(title.includes(input)){
	  item.style.display="block";
	}else{
	  item.style.display="none";
	}
  });
}
/*End search box*/

/*Start Pagination*/
let itemsPerPage = 6;
let allItems = document.querySelectorAll(".gallery .art");
let filteredItems = [...allItems];
let currentPage = 1;

const pagination = document.getElementById("pagination");

function showPage(page){
  currentPage = page;

  const start = (page-1)*itemsPerPage;
  const end = start + itemsPerPage;

  filteredItems.forEach((item,index)=>{
	item.style.display = (index>=start && index<end) ? "block":"none";
  });
}

function setupPagination(){
  pagination.innerHTML = ""; // clear old buttons

  const pageCount = Math.ceil(filteredItems.length/itemsPerPage);

  for(let i=1;i<=pageCount;i++){

	const btn = document.createElement("button");
	btn.innerText = i;

	btn.addEventListener("click",()=>{
	  showPage(i);
	});
	pagination.appendChild(btn);
  }
  showPage(1);
}
/*End Pagination*/

/*Start Inquiry*/
function inquireArt(title){

  const message="Hello, I am interested in the artwork: ${title}";
  const whatsapp="https://wa.me/917827662454?text=${encodeURIComponent(message)}";

  window.open(whatsapp,"_blank");
}
/*End Inquiry*/
