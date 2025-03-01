import CoLevel from "@/components/co2Level";
import Footer from "@/components/footer";
import Historico from "@/components/historico";
import Ppm from "@/components/ppm";

const Dash = () => {
    return ( 
        <div className="min-h-screen ">
            <div className="flex justify-between p-16">
                <div className="flex flex-col gap-2">
                    <CoLevel/>
                    <Ppm/>
                </div>
                <div>  
                    <Historico/>
                </div>
                
            </div>
            <div className="translate-y-32">
            <Footer/>
            </div>
        </div>
     );
}
 
export default Dash;