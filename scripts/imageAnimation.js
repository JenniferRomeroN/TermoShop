const scrollY = window.scrollY;

const vasobottle = document.querySelector(".vasobottle");
const menubottle = document.querySelector(".menubottle");

window.addEventListener("scroll", () => {
    if (scrollY >= 10) {
        vasobottle.classList.add("hidden");
        menubottle.classList.add("hidden");
        
    } else {
    vasobottle.classList.remove("hidden");
    menubottle.classList.remove("hidden");
}
});


function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}


const linksContainer = document.querySelector(".links");
let currentScroll = 0;
let targetScroll = 0;
const ease = 0.1;

document.addEventListener("mousemove", (e) => {
    const extraHeight = linksContainer.offsetHeight - window.innerHeight;
     targetScroll = (e.clientY / window.innerHeight) * -extraHeight;
});

function animate() {
    currentScroll = lerp(currentScroll, targetScroll, ease);
    linksContainer.style.transform = `translateY(${currentScroll}px)`;
    requestAnimationFrame(animate);
}


animate();

let currentImageIdd = 1;

document.querySelectorAll(".link > a").forEach((link) => {
    link.addEventListener('mouseenter', function() {
    const targetImageId = parseInt(this.getAttribute("data-image"));      
    let rotationValue = targetImageId > currentImageIdd ? 300 : -300;

    const vaso = document.querySelector(".vasobottle");
    const images = document.querySelectorAll(".vasobottle img");

    gsap.to(vaso, {
        rotation: rotationValue,
        duration: 0.4,
        onComplete: function (){
        gsap.set(vaso,{
        rotation:0,
        });
    },
})


gsap.set(images,{
    zIndex: 0,
    pacity: 0,
    delay: 0.25,
});
gsap.set(`.vasobottle img[data-id='${targetImageId}']`,{
    zIndex: 5,
    opacity: 1,
    delay: 0.25,
});

currentImageIdd = targetImageId;
});
});

const btn = document.querySelector(".mi-boton");

img.addEventListener("load", () => {
    btn.style.opacity = 1;
});

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
  triggerElement: ".mi-imagen",
  triggerHook: "onEnter",
})
.addIndicators()
.addTo(controller);

scene.on("enter", () => {
    btn.style.opacity = 1;
  });