import logo from "../../assets/img/CapivaraLab-SF.png"

const Nav = () => {
    return ( 
        <div className="bg-white h-16  border-black flex justify-center items-center">
            
           <img src={logo.src} alt="Logo Capivaras Lab" className="h-[60px]"/>

            
        </div>
     );
}
 
export default Nav;