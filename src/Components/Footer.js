import styled from "styled-components"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios";
import tokenContext from "../Context/TokenContext/TokenContext";
import UserContext from "../Context/userContext/UserContext";
import { useContext,useState,useEffect } from "react";
export default function Footer({navigate}){
    const {token} = useContext(tokenContext);
    const config ={
        headers:{
            "Authorization":`Bearer ${token}`
        }
    };
    const{userData,setUserData}=useContext(UserContext)
    const [habitosHoje, setHabitosHoje]=useState([]);
    useEffect(()=>{
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
        promise
            .then((res)=> {
                setHabitosHoje(res.data)
            })
    },[])
    useEffect(()=>{

        let arrfeitos = habitosHoje.filter((habito)=> habito.done===true)
        let porcentagem =  (arrfeitos.length/habitosHoje.length)*100
        setUserData({...userData,progress:porcentagem})

},[habitosHoje])
    return(
        <>
            <FooterStyled>
                <ButtonTextStyled onClick={()=>navigate("/habitos")}>habitos</ButtonTextStyled>
                <ButtonTextStyled>historico</ButtonTextStyled>
            </FooterStyled>
            <ButtonArticle>
                <div style={{ width: 95, height: 95}} onClick={()=>navigate("/hoje")}>
                    <CircularProgressbar 
                    value={userData.progress} 
                    text={"Hoje"}
                    background 
                    backgroundPadding={6} 
                    styles={buildStyles({
                        textColor:"#FFFFFF",
                        backgroundColor:"#52B6FF",
                        pathColor: "#FFFFFF", 
                        trailColor:"transparent"})}/>
                </div>
            </ButtonArticle>
        </>
    )
}

const FooterStyled = styled.footer`
    position:absolute;
    bottom: 0;
    left:0;
    width:100%;
    height:70px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    background-color:white;
    padding: 0 20px;


`   

const ButtonArticle = styled.article`
    position:absolute;
    bottom:20px;
    
`

const ButtonTextStyled = styled.button`
    font-family: 'Lexend Deca';
    cursor: pointer;
    background-color: white;
    font-size: 18px;
    color: #52B6FF;
    border:none;
`
const ButtonProgressStyled = styled.button`
    font-family: 'Lexend Deca';
    width:91px;
    height:91px;
    cursor: pointer;
    border-radius: 100%;
    background-color: #52B6FF;
    border:none;
    font-size:18px;
    color:white;
`