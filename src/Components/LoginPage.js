import { useState, useEffect,useContext} from "react";
import tokenContext from "../Context/TokenContext/TokenContext";
import UserContext from "../Context/userContext/UserContext";
import logo from "./../assets/images/logo.png";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


export default function LoginPage(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {token,setToken} = useContext(tokenContext);
    const {setUserData} = useContext(UserContext);
    const navigate = useNavigate();
    
    function enviarLogin(e){
        e.preventDefault();
        const body ={
            email,
            password,
        };
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",body);
        

        //VAI FICAR REQUISITANDO INFINITAMENTE!!!!!!!!!!!!!!!!!!!!!
        // CONSERTAR ISSO!!!!!!!!!!!!11

        promise
        .then((res)=> {
            setToken(res.data.token);
            setUserData(res.data);
            navigate("/habitos")})
        .catch((err)=> alert("Usuário nâo encontrado. Por favor verifique email e senha!"));

    }

    return(
    <Conteiner_tela>
        <LogoStyled>
            <img src={logo} />
        </LogoStyled>
        <FormStyled onSubmit={enviarLogin}>
            <input 
            type="email"
            placeholder="email" 
            onChange={(e)=> setEmail(e.target.value)} 
            value={email}>
            </input>
            <input 
            type="password"
            placeholder="senha"
            onChange={(e)=> setPassword(e.target.value)} 
            value={password}>
            </input>
            <button type="submit">Entrar</button>
        </FormStyled>
        <LinkStyled to={"/cadastro"}>
            <p>Não tem uma conta? Cadastre-se!</p>
        </LinkStyled>
    </Conteiner_tela>)
}

export const Conteiner_tela = styled.section`
    width:100%;
    height: 100%;
    display:flex;
    align-items:center;
    flex-direction: column;
    justify-content:center;
`

export const FormStyled= styled.form`
    height: max-content;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;    
    
    input{
        height: 45px;
        width: 300px;
        font-size: 20px;
        padding-left: 10px;
        border-radius: 5px;
        margin-bottom: 5px;
        border: 1px solid #D4D4D4;     
    }
    
    input::placeholder{
        color: #DBDBDB;
        font-size: 20px;
    }

    button{
        
        width: 303px;
        height: 45px;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 20px;
        border-radius: 5px;
        background-color: #52B6FF;
    }
`

export const LogoStyled = styled.figure`
  
`

export const LinkStyled = styled(Link) `
    color:#52B6FF;
    cursor: pointer;
    margin-top:30px;
`