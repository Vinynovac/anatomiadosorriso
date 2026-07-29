import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";


export default function FinalCTA(){

const sectionRef = useRef();


useEffect(()=>{

const ctx = gsap.context(()=>{


gsap.from(".cta-content",{

y:60,
opacity:0,
duration:1,

scrollTrigger:{
trigger:sectionRef.current,
start:"top 75%"
},

ease:"power3.out"

});


gsap.from(".cta-button",{

scale:.8,
opacity:0,
duration:.8,
delay:.3,

scrollTrigger:{
trigger:sectionRef.current,
start:"top 70%"
},

ease:"back.out"

});


},sectionRef);


return ()=>ctx.revert();


},[]);



return (

<section
ref={sectionRef}
id="contato"
className="
relative
overflow-hidden
py-28
bg-[#0B2A4A]
"
>


<div className="
absolute
inset-0
bg-gradient-to-br
from-[#164A73]
to-[#0B2A4A]
"
/>


<div className="
absolute
w-[500px]
h-[500px]
rounded-full
bg-white/10
blur-[140px]
top-[-200px]
right-[-100px]
"
/>



<div className="
cta-content
relative
z-10
max-w-4xl
mx-auto
px-6
text-center
">


<p className="
text-blue-200
text-xs
uppercase
tracking-[0.35em]
font-bold
">

Agende sua avaliação

</p>



<h2 className="
mt-6
text-4xl
lg:text-6xl
font-bold
text-white
leading-tight
">

O próximo sorriso
pode começar hoje.

</h2>



<p className="
mt-6
text-lg
text-blue-100
max-w-2xl
mx-auto
leading-relaxed
">

Há mais de 40 anos cuidando de histórias,
com uma equipe especializada e atendimento
humanizado em Montes Claros.

</p>



<a
href="https://wa.me/5538988456205"
target="_blank"
rel="noreferrer"
className="
cta-button
mt-10
inline-flex
items-center
gap-3
bg-white
text-[#0B2A4A]
px-9
py-4
rounded-full
font-bold
uppercase
text-sm
tracking-wider
hover:scale-105
transition
"
>

Agendar pelo WhatsApp

<ArrowUpRight size={18}/>

</a>








</div>


</section>

)

}