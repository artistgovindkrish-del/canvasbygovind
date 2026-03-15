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
