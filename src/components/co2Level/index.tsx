"use client"
import { useState } from "react";

const CoLevel = () => {
const [karla,setKarla]=useState("Bom")

    return ( 
        <div className=" flex justify-center items-center">
            <p>´Nivel de CO2: {karla}´</p>
        </div>
     );
}
 
export default CoLevel;