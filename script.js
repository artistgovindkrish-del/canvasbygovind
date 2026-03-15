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
