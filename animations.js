/**
 * File animations.js.
 *
 * Handles GSAP and ScrollTrigger animations on the site.
 */
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger,ScrollToPlugin,Draggable);

document.addEventListener("DOMContentLoaded", function(event){

    console.log("DOM loaded");
    
    window.addEventListener("load", function(e){

/***************************************************
GSAP Animations
***************************************************/
    
    //custom GSAP code goes here
    gsap.to("section.hero h1.flip-text", {
        y: 0,
        duration: 1.1,
        opacity: 1,
        ease: "power1.inOut",
        stagger: 0
    })

    gsap.to("section.skills .container .skill",{
        y: 0,
        duration: 0.4,
        delay: 0,
        opacity: 1,
        ease: "power1.inOut",
        stagger: 0.2,
        scrollTrigger: {
            trigger: "section.skills",
            preventOverlaps:true,
            start: "top 90%", 
        }
    })

    console.log("window loaded");
}, false);

});
