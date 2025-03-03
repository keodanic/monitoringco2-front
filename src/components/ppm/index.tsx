"use client"
import { useState } from "react";




const Ppm = () => {
   
    const [quality,setQuality]=useState(1)

    return ( 
        <div className=" flex  justify-center items-center gap-2 ">
            <h1>Qualidade do Ar: </h1>
            <h1 className={`pr-4 pl-4 rounded-2xl ${quality>=0 ? 'bg-green-500 text-white ':'bg-red-500'}  `}>{quality}</h1>
            
        </div>
     );
}
 
export default Ppm;