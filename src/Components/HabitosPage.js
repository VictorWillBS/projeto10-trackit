import { useState, useEffect,useContext} from "react"
import axios from "axios"
import styled from "styled-components"
import tokenContext from "../TokenContext/TokenContext"
import UserContext from "../userContext/UserContext"
import butaoClicadoContext from "../NovoHabitoContext/NovoHabitoContext"
import Headers from "./Header"
import MeusHabitos from "./MeusHabitos"
import mostrarHabito from "./MostrarHabito"


export default function HabitosPage(){
    const {token}= useContext(tokenContext)
    const {userData}= useContext(UserContext)
    const {botaoClicado, setBotaoClicado} = useContext(butaoClicadoContext)
    const [habitos, setHabitos]= useState(null)
    const [dias, setDias]= useState([])
    
    const config ={
        headers:{
            "Authorization":`Bearer ${token}`
        }
    }

    useEffect(()=> {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config)
        promise
            .then((res)=>{setHabitos(res.data)})
            .catch((err)=>{
                alert('deu ruim fml')
                console.log(err)
            })

    },[])


    function criarArrayDias(dia){
        if(dias.includes(dia)){
            const novoArrayDias = dias.filter((item)=> item!==dia)
            setDias(novoArrayDias)
        }else{
            setDias([...dias,dia])
        }
        

    }

    function CriarHabito(){
        console.log("entreo")
        if(botaoClicado){
            return(
                <FormsStyled>
                    <InputSection onSubmit={(e)=>e.preventDefault}>
                        <input placeholder="nome do hábito" ></input>
                        <section>
                            <button 
                            type="button" 
                            onClick={()=> {
                                criarArrayDias(1)}}
                            >D</button>
                            <button type="button" onClick={()=> criarArrayDias(2)}>S</button>
                            <button type="button" onClick={()=> criarArrayDias(3)}>T</button>
                            <button type="button" onClick={()=> criarArrayDias(4)}>Q</button>
                            <button type="button" onClick={()=> criarArrayDias(5)}>Q</button>
                            <button type="button" onClick={()=> criarArrayDias(6)}>S</button>
                            <button type="button" onClick={()=> criarArrayDias(7)}>S</button>
                        </section>
                    </InputSection>
                    <ButtonSection>
                        <button className="btnCancelar">cancelar</button>
                        <button className="btnSalvar" type="button" onClick={()=> console.log(dias)}>salvar</button>
                    </ButtonSection>
                </FormsStyled>
            )
        } else{
            return( <></>)
        }
    }
    CriarHabito()

    function quandoResponder(){
        if (habitos){
        return(<>
            <Headers name={userData.name} image={userData.image} /> 
            <Content>
                <MeusHabitos botaoClicado={botaoClicado} setBotaoClicado={setBotaoClicado}></MeusHabitos>
                <CriarHabito></CriarHabito>
                <Habitos_Conteiner>
                    {mostrarHabito(habitos,setHabitos)}
                </Habitos_Conteiner>
            </Content>
        </>)
        }
        else{
            return (
            <h4>esperando</h4>
            )
        }
    
    }

    return(
        quandoResponder()
        )
}

const Content =styled.section`
    width:100%;
    height: 100%;
    display: flex;
    background-color:#F2F2F2;
    flex-direction: column;
    justify-content: flex-start;
    align-items:center;
    padding: 0 20px;
    margin-top: 70px;
`

const Habitos_Conteiner =styled.section`
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin-top:20px;
`

const FormsStyled = styled.form`
    width:100%;
    height:250px;
    background-color:white;
    border-radius:5px; 
    padding: 18px;
    margin-top:20px;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
`
const InputSection =styled.section`
    
    display:flex;
    flex-direction: column;
    justify-content:flex-start;
    
    input{
        height:45px;
        border-radius:5px;
        border: 1px solid #D4D4D4;
        padding-left: 10px;
        
    }

    input::placeholder{
        font-size: 20px;
        color:#D4D4D4;
    }
    section{
        margin-top:10px;
    }
    section button{
        width:30px;
        height:30px;
        margin-right:5px;
        color:#DBDBDB;
        background-color:white;
        border: 1px solid #DBDBDB;
        border-radius: 5px;
        text-align:center;
        font-size:16px;
    }
    
    
`

const ButtonSection =styled.section`
   
    display:flex;
    justify-content:flex-end;
    
    button{
        width:84px;
        height:35px;
        font-size:16px;
    }
    .btnCancelar{
        background-color: white ;
        color: #52B6FF;
        border: none
    }
    .btnSalvar{
        background-color:#52B6FF;
        color: white;
        border: none;
        border-radius: 5px;
    }
`