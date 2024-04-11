const header = document.querySelector(".header");
const letters = document.querySelectorAll(".letter");
const logo = document.querySelector(".logo a");
const websiteContent = document.querySelector(".website-content");

let lastScroll = 0;
const sectionHeight = 150;

window.addEventListener("scroll", () =>{
    const scrollY = window.scrollY;

    if(scrollY < 900){
        websiteContent.style.position = "fixed";
        websiteContent.style.pop = "0px";
}else{
    websiteContent.style.position = "absolute";
    websiteContent.style.top = "900px";
}

const orderPairs = [
    [4, 5],
    [3, 6],
    [2, 7],
    [1, 8],
    [0, 9],
];

orderPairs.forEach((pair, orderIndex) => {
    const startScroll = sectionHeight * orderIndex;

    if(scrollY >= startScroll){
        const moveFactor = Math.min(
            1,
            (scrollY - startScroll) / sectionHeight
        );
        const translateY = -moveFactor * header.offsetHeight;

        pair.forEach((idx) =>{
            const letter = letters[idx];
            gsap.to(letter, {
                y: translateY,
                zIndex: 1 - moveFactor,
            });
        })
    } else{
        pair.forEach((idx) => {
            const letter = letters[idx];
            gsap.to(letter, {
                y: 0,
                zIndex: 1,
            });
        });
    }
});

const buffer = 50;

if(
    scrollY >= orderPairs.length * sectionHeight + buffer &&
    !gsap.isTweening(logo)
){
    gsap.to(logo, {
        top: "0px",
        ease: "power1.out",
        overwrite: true,
    });

    gsap.to(".logo-revealer", {
        scaleY: 0,
        overwrite: true,
    });
}else if(
    scrollY <= (orderPairs.length - 1) * sectionHeight && !gsap.isTweening(logo)
){
    gsap.to(logo, {
        top: "20px",
        ease: "power1.out",
        overwrite: true,
    });
    gsap.to(".logo-revealer", {
        scaleY: 1,
        overwrite: true,
    });
}
lastScroll = scrollY;
});