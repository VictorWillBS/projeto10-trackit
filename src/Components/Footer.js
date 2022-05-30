import styled from "styled-components"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState,useEffect } from "react";
export default function Footer({navigate}){
    


    return(
        <>
            <FooterStyled>
                <ButtonTextStyled onClick={()=>navigate("/habitos")}>habitos</ButtonTextStyled>
                <ButtonTextStyled>historico</ButtonTextStyled>
            </FooterStyled>
            <ButtonArticle>
                <div style={{ width: 95, height: 95}} onClick={()=>navigate("/hoje")}>
                    <CircularProgressbar 
                    value={90} 
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