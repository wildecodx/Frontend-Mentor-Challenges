import {useState, useEffect} from 'react';


const Card = () => {

const [advice, setAdvice] = useState(null);


const fetchAdvice = async function (){
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();

    setTimeout(() => {
      setAdvice(data.slip);
    }, 100)

}

useEffect(() => {
  fetchAdvice(advice);
}, [])


return (
  <div className="font-sans shadow-lg relative gap-8 rounded-lg px-2 pb-[3.5rem] py-8 md:px-[2.2rem] mx-auto grid bg-cardBg w-full max-w-[500px] text-center"> {
   advice ?     <span className="tracking-[4px] md:text-sm text-[.65rem] font-medium text-highlight">ADVICE 
   #{advice.id}
    </span> : <span>Loading advice ...</span>
  }

  {

advice ? 
<h2 className="text-title font-medium md:text-[1.7rem] text-[1.2rem] leading-[1.3]">
"{advice.advice}"
</h2> : 
<h2 className="text-title font-medium text-[1.7rem] leading-[1.3]">Loading ...</h2>
}

    <div className="flex items-center gap-2 text-title text-2xl font-bold
     before:content-[''] 
     before:w-full
    before:h-[.4px]
    before:block
    before:bg-title
    after:content-['']
    after:w-full
    after:h-[.4px]
    after:block
    after:bg-title">||</div>
    <button onClick={ fetchAdvice}  className="bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] absolute w-[3rem] aspect-square rounded-full flex items-center justify-center bg-highlight hover:bg-highlightGlow hover:shadow-lg " ><img className="w-[1.25rem]" src="/public/icon-dice.svg" alt="icon" draggable="false"/></button>
  </div>
)
}

export default Card;