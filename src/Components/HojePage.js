import Footer from "./Footer"
import Headers from "./Header";
import { useNavigate } from "react-router-dom"
import { Content } from "./HabitosPage"
import { useState,useEffect,useContext } from "react";
import tokenContext from "../Context/TokenContext/TokenContext";
import styled from "styled-components";
import axios from "axios";
import {ReactComponent as Check} from "./../assets/images/checkmark-outline.svg"


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

function enviarCheck(config,id, isDone){
    if(isDone){
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,null,config)
        promise.then()
    }else{
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,null,config)
        promise.then()
    }
}

function CheckButton({id,config,done,qntFeitos,setQntFeitos}){
    
    const [color, setColor]= useState(undefined)
    let isDone;
    
    useEffect(() => {
        setColor(done)
        console.log("entrei")
        if(done){
           
            setQntFeitos(qntFeitos+1)
            
          }
    },[])
    
    
    setTimeout(()=> {console.log(qntFeitos)},3000)
    function  darCheck(){
       
        console.log("mudei de cor")
        if(color){
            setColor(false)
            isDone=false
        }else{
            setColor(true)
            isDone=true
        }
        
        enviarCheck(config,id,isDone)
    }
    
    return(
        <ButtonSection>
            <ButtonStyled 
                type="button" 
                bgcolor={color? "#8FC549":""} 
                onClick={()=> {darCheck()}}> 
                <Check fill="white"/>
            </ButtonStyled>
        </ButtonSection>
    )
}

function HabitoCard({habito,config,qntFeitos,setQntFeitos,}){
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
            setQntFeitos={setQntFeitos}
            qntFeitos={qntFeitos}
             />
        </Card_Habito>
    )
}

export default function HojePage(){
    const {token} = useContext(tokenContext);
    const navigate =useNavigate();
    const [habitosHoje, setHabitosHoje]=useState([])
    let [qntFeitos,setQntFeitos]=useState(0);
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
    },[])
    
    function quandoResponder(){
        if(habitosHoje.length){
            return(
                <>
            <Headers></Headers>
            <Content>
                <Cabecalho>
                    {DiaSemana()}
                </Cabecalho>
                <HabitosLista>
                    {habitosHoje.map((habito,index)=>
                    <HabitoCard key={index} 
                    config={config} habito={habito} 
                    qntFeitos={qntFeitos}
                    setQntFeitos={setQntFeitos}
                    /> )}
                </HabitosLista>
            </Content>
            <Footer navigate={navigate} ></Footer>
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
    
`
const H5_Styled = styled.h5`
    font-size:15px;
    color:#666666;
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