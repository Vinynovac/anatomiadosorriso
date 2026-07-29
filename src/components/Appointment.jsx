import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  CalendarDays,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];


const weekDays = [
  "D",
  "S",
  "T",
  "Q",
  "Q",
  "S",
  "S",
];


const availableTimes = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];


export default function Appointment() {

  const sectionRef = useRef();

  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedTime, setSelectedTime] = useState(null);



  useEffect(() => {

    const ctx = gsap.context(() => {

      gsap.from(".appointment-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });


      gsap.from(".calendar-box", {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });


    }, sectionRef);


    return () => ctx.revert();


  }, []);



  function getCalendarDays() {

    const year = currentDate.getFullYear();

    const month = currentDate.getMonth();


    const firstDay = new Date(
      year,
      month,
      1
    ).getDay();


    const lastDay = new Date(
      year,
      month + 1,
      0
    ).getDate();



    const days = [];


    for(let i = 0; i < firstDay; i++) {

      days.push(null);

    }



    for(let i = 1; i <= lastDay; i++) {

      const date = new Date(
        year,
        month,
        i
      );


      const dayOfWeek = date.getDay();


      days.push({

        number: i,

        date,

        disabled:
          dayOfWeek === 0 ||
          dayOfWeek === 6

      });

    }


    return days;

  }



  function changeMonth(value){

    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + value,
        1
      )
    );


    setSelectedDate(null);
    setSelectedTime(null);

  }



  function sendWhatsApp(){


    if(!selectedDate || !selectedTime){

      return;

    }



    const formattedDate =
    `${selectedDate.number.toString().padStart(2,"0")}/${(currentDate.getMonth()+1)
    .toString()
    .padStart(2,"0")}/${currentDate.getFullYear()}`;



    const message = `

Olá! Gostaria de solicitar uma avaliação na Anatomia do Sorriso.

Minha preferência de atendimento:

📅 Data: ${formattedDate}

🕒 Horário: ${selectedTime}

Gostaria de confirmar a disponibilidade deste horário.

Obrigado!

`;



    window.open(

      `https://wa.me/5538988456205?text=${encodeURIComponent(message)}`,

      "_blank"

    );


  }



  return (

<section
ref={sectionRef}
id="pre-agendamento"
className="
relative
py-28
bg-[#0B2A4A]
overflow-hidden
"
>


<div
className="
absolute
w-[500px]
h-[500px]
bg-[#164A73]
opacity-30
blur-[120px]
rounded-full
right-[-150px]
top-[-100px]
"
/>



<div
className="
max-w-6xl
mx-auto
px-6
lg:px-8
relative
z-10
"
>


<div
className="
grid
lg:grid-cols-2
gap-14
items-center
"
>



<div className="appointment-content">


<p
className="
text-blue-200
uppercase
tracking-[0.35em]
text-xs
font-bold
"
>
Pré-agendamento
</p>



<h2
className="
mt-5
text-4xl
lg:text-5xl
font-bold
text-white
leading-tight
"
>
Escolha o melhor momento
para cuidar do seu sorriso.
</h2>



<p
className="
mt-6
text-blue-100
text-lg
leading-relaxed
"
>

Selecione uma data e um horário
de preferência. Nossa equipe entrará
em contato para confirmar sua consulta.

</p>


</div>




<div
className="
calendar-box
bg-white
rounded-[32px]
p-8
shadow-2xl
"
>



<div
className="
flex
items-center
gap-3
mb-6
"
>

<CalendarDays
className="text-[#164A73]"
/>


<h3
className="
font-bold
text-[#0B2A4A]
"
>
Escolha uma data
</h3>

</div>




<div
className="
flex
justify-between
items-center
mb-5
"
>


<button

onClick={()=>changeMonth(-1)}

className="
w-9
h-9
rounded-full
bg-slate-100
flex
items-center
justify-center
text-[#0B2A4A]
"

>

<ChevronLeft size={18}/>

</button>



<h4
className="
font-bold
text-[#0B2A4A]
"
>

{months[currentDate.getMonth()]}
{" "}
{currentDate.getFullYear()}

</h4>




<button

onClick={()=>changeMonth(1)}

className="
w-9
h-9
rounded-full
bg-slate-100
flex
items-center
justify-center
text-[#0B2A4A]
"

>

<ChevronRight size={18}/>

</button>


</div>




<div
className="
grid
grid-cols-7
gap-2
mb-3
"
>

{
weekDays.map((day,index)=>(

<span

key={index}

className="
text-center
text-xs
font-bold
text-slate-400
"

>

{day}

</span>

))

}

</div>




<div
className="
grid
grid-cols-7
gap-2
"
>

{

getCalendarDays().map((day,index)=>(


<button

key={index}

disabled={!day || day.disabled}

onClick={()=>setSelectedDate(day)}

className={`
aspect-square
rounded-xl
text-sm
font-semibold
transition-all

${
!day

?
""

:

day.disabled

?

"text-slate-300 cursor-not-allowed"

:

selectedDate?.number === day.number

?

"bg-[#0B2A4A] text-white"

:

"bg-slate-100 text-[#0B2A4A] hover:bg-[#164A73]/10"

}

`}

>

{day?.number}

</button>


))

}

</div>




<div
className="
mt-8
flex
items-center
gap-3
"
>

<Clock
className="text-[#164A73]"
size={20}
/>


<h3
className="
font-bold
text-[#0B2A4A]
"
>
Horário de preferência
</h3>


</div>




<div
className="
grid
grid-cols-4
gap-3
mt-5
"
>

{

availableTimes.map(time=>(


<button

key={time}

onClick={()=>setSelectedTime(time)}

className={`

py-3
rounded-xl
text-sm
font-semibold
transition-all

${
selectedTime === time

?

"bg-[#164A73] text-white"

:

"bg-slate-100 text-[#0B2A4A] hover:bg-[#164A73]/10"

}

`}

>

{time}

</button>


))

}

</div>




<button

onClick={sendWhatsApp}

disabled={!selectedDate || !selectedTime}

className="
mt-8
w-full
bg-[#0B2A4A]
text-white
py-4
rounded-full
font-bold
uppercase
tracking-wider
text-sm
flex
items-center
justify-center
gap-3
disabled:opacity-40
hover:bg-[#164A73]
transition
"

>

Solicitar confirmação

<ArrowRight size={18}/>

</button>



</div>


</div>


</div>


</section>

  );

}