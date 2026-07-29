import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const images = [
  {
    src: "/images/clinica01.webp",
    title: "Recepção",
  },
  {
    src: "/images/clinica02.webp",
    title: "Consultórios",
  },
  {
    src: "/images/clinica03.jpg",
    title: "Tecnologia",
  },
];


export default function Clinic(){

const sectionRef = useRef();


useEffect(()=>{

const ctx = gsap.context(()=>{

gsap.from(".clinic-image",{
y:50,
opacity:0,
duration:1,
stagger:.15,
scrollTrigger:{
trigger:sectionRef.current,
start:"top 75%"
}
})


},sectionRef)


return ()=>ctx.revert();


},[])


return(

<section
ref={sectionRef}
className="
py-24
bg-[#F8FAFC]
overflow-hidden
"
>

<div className="
max-w-7xl
mx-auto
px-6
lg:px-8
">


<div className="
max-w-3xl
mb-14
">

<span className="
text-xs
tracking-[0.3em]
font-bold
uppercase
text-[#164A73]
">

Nossa Clínica

</span>


<h2 className="
mt-4
text-4xl
lg:text-5xl
font-bold
text-[#0B2A4A]
leading-tight
">

Um ambiente preparado
para cuidar do seu sorriso.

</h2>


<p className="
mt-5
text-lg
text-slate-600
">

Tecnologia, conforto e acolhimento
em um espaço pensado para oferecer
uma experiência tranquila em cada visita.

</p>


</div>



<div className="
grid
lg:grid-cols-12
gap-6
">


<div className="
lg:col-span-7
clinic-image
h-[550px]
rounded-3xl
overflow-hidden
">

<img
src={images[0].src}
className="
w-full
h-full
object-cover
hover:scale-105
transition
duration-700
"
/>

</div>



<div className="
lg:col-span-5
grid
gap-6
">


{
images.slice(1).map((image,index)=>(

<div
key={index}
className="
clinic-image
h-[260px]
rounded-3xl
overflow-hidden
relative
"
>

<img
src={image.src}
className="
w-full
h-full
object-cover
hover:scale-105
transition
duration-700
"
/>


<div className="
absolute
bottom-5
left-5
bg-white/90
backdrop-blur
px-4
py-2
rounded-full
text-xs
font-semibold
text-[#0B2A4A]
">

{image.title}

</div>


</div>

))

}


</div>


</div>


</div>

</section>

)

}