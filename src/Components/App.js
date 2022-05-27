import { BrowserRouter,Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import tokenContext from "../TokenContext/TokenContext";
import UserContext from "../userContext/UserContext";
import CadastroPage from "./CadastroPage";
import LoginPage from "./LoginPage";
import HabitosPage from "./HabitosPage";
import "./../assets/css-reset.css";


export default function App(){
    const [token, setToken]=useState(undefined)
    const [userData, setUserData] = useState(undefined)
   return(
    <Conteiner>
        <tokenContext.Provider value={{token, setToken}} >
            <UserContext.Provider value={{userData, setUserData}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/cadastro" element={<CadastroPage/>}/>
                        <Route path="/habitos" element={<HabitosPage/>}/>
                    </Routes>
                </BrowserRouter>
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