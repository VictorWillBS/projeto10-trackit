import { BrowserRouter,Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import tokenContext from "../TokenContext/TokenContext";
import UserContext from "../userContext/UserContext";
import butaoClicadoContext from "../NovoHabitoContext/NovoHabitoContext";
import CadastroPage from "./CadastroPage";
import LoginPage from "./LoginPage";
import HabitosPage from "./HabitosPage";
import "./../assets/css-reset.css";


export default function App(){
    const [token, setToken]=useState(undefined)
    const [userData, setUserData] = useState(undefined)
    const [botaoClicado, setBotaoClicado] = useState(false)
   return(
    <Conteiner>
        <tokenContext.Provider value={{token, setToken}} >
            <UserContext.Provider value={{userData, setUserData}}>
                <butaoClicadoContext.Provider value={{botaoClicado, setBotaoClicado}} >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/cadastro" element={<CadastroPage/>}/>
                        <Route path="/habitos" element={<HabitosPage/>}/>
                    </Routes>
                </BrowserRouter>
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