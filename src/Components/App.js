import { BrowserRouter,Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import atualizarDataContext from "../Context/AtualizarDataContext/atualizarDataContext";
import tokenContext from "../Context/TokenContext/TokenContext";
import UserContext from "../Context/userContext/UserContext";
import foiDeletadoContext from "../Context/FoiDeletadoContext/FoiDeletadoContext";
import butaoClicadoContext from "../Context/butaoClicadoContext/butaoClicadoContext";
import UltimoHabitoCriado from "../Context/UltimoHabitoCriadoContext/UltimoHabitoCriadoContext";
import HojePage from "./HojePage"
import CadastroPage from "./CadastroPage";
import LoginPage from "./LoginPage";
import HabitosPage from "./HabitosPage";
import "./../assets/css-reset.css";
import "./../assets/Estilo.css"


export default function App(){
    const [token, setToken]=useState(undefined)
    const [userData, setUserData] = useState({img:"",progresso:0})
    const [botaoClicado, setBotaoClicado] = useState(false)
    const [ultimoHabitoCriado, setUltimoHabitoCriado]=useState([])
    const [foiDeletado, setFoiDeletado] = useState(false)
    const [atualizarData, setAtualizarData] = useState(true)
   return(
    <Conteiner>
        <tokenContext.Provider value={{token, setToken}} >
            <UserContext.Provider value={{userData, setUserData}}>
                <butaoClicadoContext.Provider value={{botaoClicado, setBotaoClicado}} >
                    <UltimoHabitoCriado.Provider value={{ultimoHabitoCriado, setUltimoHabitoCriado}}>
                        <foiDeletadoContext.Provider value={{foiDeletado, setFoiDeletado}}>
                            <atualizarDataContext.Provider value={{atualizarData, setAtualizarData}}>
                                <BrowserRouter>
                                    <Routes>
                                        <Route path="/" element={<LoginPage/>}/>
                                        <Route path="/cadastro" element={<CadastroPage/>}/>
                                        <Route path="/habitos" element={<HabitosPage/>}/>
                                        <Route path="/hoje" element={<HojePage/>}/>
                                    </Routes>
                                </BrowserRouter>
                            </atualizarDataContext.Provider>
                        </foiDeletadoContext.Provider>
                    </UltimoHabitoCriado.Provider>
                </butaoClicadoContext.Provider>
            </UserContext.Provider>
        </tokenContext.Provider>
    </Conteiner>
   )
}
const Conteiner = styled.section`  
    background-color:#ffffff;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`