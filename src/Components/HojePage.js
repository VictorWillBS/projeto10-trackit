import Footer from "./Footer"
import Headers from "./Header";
import { useNavigate } from "react-router-dom"
import { Content } from "./HabitosPage"
import { useState,useEffect,useContext } from "react";
import atualizarDataContext from "../Context/AtualizarDataContext/atualizarDataContext";
import tokenContext from "../Context/TokenContext/TokenContext";
import UserContext from "../Context/userContext/UserContext";
import Check from "./Check";
import styled from "styled-components";
import axios from "axios";



function DiaSemana(){
    const dayjs = require('dayjs')
    const semana = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"]
    const diaSemana = semana[dayjs().$W]
    const mes = ()=> {
                if((dayjs().$M +1)<10) 
                    { return '0' + (dayjs().$M +1)}
                return (dayjs().$M +1)
                }
    const data = `${dayjs().$D}/${mes()}`
    
    return(
        <h3> {`${diaSemana}, ${data}`}</h3>
    )
}



function CheckButton({id,config,done}){
    const {atualizarData, setAtualizarData} = useContext(atualizarDataContext)
   
    const [color, setColor]= useState(done)
    let isDone;

    function  darCheck(){
    
        if(color){
            setColor(false)
            isDone=false
        }else{
            setColor(true)
            isDone=true
        }
        
        enviarCheck(config,id,isDone)
    }

    function enviarCheck(config,id, isDone){
        if(isDone){
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,null,config)
            promise.then((res)=>{
                setAtualizarData(!atualizarData)
            })
        }else{
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,null,config)
            promise.then((res)=>{
                setAtualizarData(!atualizarData)
            })
        }
    }
    return(
        <ButtonSection>
            <ButtonStyled 
                type="button" 
                bgcolor={color? "#8FC549":""} 
                onClick={()=> {darCheck()}}> 
               {Check}
            </ButtonStyled>
        </ButtonSection>
    )
}

function HabitoCard({habito,config,}){
    let feitos=0;
   
 
      
    return(
        <Card_Habito>
            <div>
                <h6>{habito.name}</h6>
                <Card_HabitoSection>
                    <p>Sequencia atual: {habito.currentSequence}</p>
                    <p>Sequencia recorde: {habito.highestSequence}</p>
                </Card_HabitoSection>
            </div>
            <CheckButton 
            config={config} 
            id={habito.id} 
            done={habito.done}
             />
        </Card_Habito>
    )
}

export default function HojePage(){
    const {token} = useContext(tokenContext);
    const navigate =useNavigate();
    const [habitosHoje, setHabitosHoje]=useState([]);
    const {atualizarData, setAtualizarData} = useContext(atualizarDataContext)
    const{userData,setUserData}=useContext(UserContext)
    const config ={
        headers:{
            "Authorization":`Bearer ${token}`
        }
    };
    
    useEffect(()=>{
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
        promise
            .then((res)=> {
                setHabitosHoje(res.data)
            })
    },[atualizarData])

    useEffect(()=>{

            let arrfeitos = habitosHoje.filter((habito)=> habito.done===true)
            let porcentagem =  (arrfeitos.length/habitosHoje.length)*100
            setUserData({...userData,progress:porcentagem})
            habitosFeitos()
    },[habitosHoje])
   
    function habitosFeitos(){
        if(!userData.progress){
            return (<H4_Styled>Nenhum hábito concluído ainda</H4_Styled>)
        }else{
            return(<H4_Styled color="#8FC549" >{parseInt(userData.progress)}% dos hábitos concluídos</H4_Styled>)
        }
    }


    function quandoResponder(){
        if(habitosHoje.length){
            return(
                <>
            <Headers></Headers>
            <Content>
                <Cabecalho>
                    {DiaSemana()}
                    {habitosFeitos()}
                </Cabecalho>
                <HabitosLista>
                    {habitosHoje.map((habito,index)=>
                    <HabitoCard key={index} 
                    config={config} habito={habito} 
                  
                    /> )}
                </HabitosLista>
            </Content>
            <Footer navigate={navigate} 
            value={userData.progress} ></Footer>
        </>
            )
        }else{
            return(
                <h4> ESPERANDO </h4>
            )
        }
    }

    return(
        quandoResponder()
    )
    
}

const Cabecalho =styled.section`
    width:100%;
    margin-top: 20px;
    h3{
        font-size: 22.98px;
        color:#126BA5;
    }

`
const H4_Styled = styled.h4`
  
        margin-top:6px;
        font-size:17.98px;
        color:${props=> props.color ||" #BABABA"};
    
`

const Card_Habito = styled.article`
    width:100%;
    height:91px;
    margin-bottom:10px;
    background-color:white;
    padding:15px;
    position:relative;
    border-radius:5px;
    display:flex;
    justify-content:space-between;
    h6{
        font-size:20px;
        color:#666666;
    }
    p{
        font-size:15px;
    color:#666666;
    }
`

const Card_HabitoSection = styled.section`
    margin-top:7px;
`

const ButtonSection = styled.section`
    width:max-content;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:lightcoral;
`
const ButtonStyled = styled.button`
    background-color:${props=> props.bgcolor|| "#EBEBEB"};
    border-radius:5px;
    border: 1px solid #E7E7E7;
    cursor: pointer;
    width:69px;
    height:69px;
   
`
const HabitosLista = styled.section`
    width:100%;
    margin-top:10px;
`
