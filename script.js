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
const itemsPerPage = 12;
const galleryItems = document.querySelectorAll(".gallery .art");
const pagination = document.getElementById("pagination");

function showPage(page){
  const start = (page-1)*itemsPerPage;
  const end = start + itemsPerPage;

  galleryItems.forEach((item,index)=>{
	item.style.display = (index>=start && index<end) ? "block":"none";
  });

  document.querySelectorAll("#pagination button").forEach(btn=>{
	btn.classList.remove("active");
  });

  document.querySelector(`#pagination button[data-page="${page}"]`).classList.add("active");
}

function setupPagination(){
  const pageCount = Math.ceil(galleryItems.length/itemsPerPage);

  for(let i=1;i<=pageCount;i++){
	const btn = document.createElement("button");

	btn.innerText = i;
	btn.setAttribute("data-page",i);

	btn.addEventListener("click",()=>showPage(i));

	pagination.appendChild(btn);
  }
  showPage(1);
}
setupPagination();
/*End Pagination*/

/*Start Inquiry*/
function inquireArt(title){

  const message=`Hello, I am interested in the artwork: ${title}`;
  const whatsapp=`https://wa.me/917827662454?text=${encodeURIComponent(message)}`;

  window.open(whatsapp,"_blank");
}
/*End Inquiry*/
