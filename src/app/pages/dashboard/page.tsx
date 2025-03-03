import logo from "../../../assets/img/CapivaraLab-SF.png"

const Dash = () => {
    return (
        <div>
            <div className="bg-white h-16  border-black flex justify-center items-center">
                <img src={logo.src} alt="Logo Capivaras Lab" className="h-[60px]" />
            </div>
            <div className="flex items-center justify-between p-10">
                <div className="w-[500px] h-[400px] shadow-2xl rounded-3xl flex flex-col items-center justify-center text-3xl">
                    <div>
                        <h1>Nivel de CO2:</h1>
                    </div>
                    <div>
                        <h1>Qualidade do Ar: </h1>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <h1 className="text-3xl">Historico</h1>
                    <div className="shadow-2xl w-[500px] h-[600px] rounded-2xl"></div>
                </div>

            </div>
            <div className="border-t-2 mt-14">
                <div className="flex justify-center items-center p-1">
                    <h1 className="text-center text-black">
                        <span className="font-bold italic">
                            © Capivara Solutions
                        </span><br />Todos os direitos reservados.
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Dash;