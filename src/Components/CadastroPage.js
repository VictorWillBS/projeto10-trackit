import { Conteiner_tela, FormStyled, LinkStyled,LogoStyled } from "./LoginPage"
import { useState, useEffect,useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import logo from "./../assets/images/logo.png"
export default function CadastroPage(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const [image,setImage] = useState("");
    const navigate = useNavigate();

    function fazerCadastro(e){
        e.preventDefault();
        const body = {
            email,
            name,
            image,
            password
        };
        const promise= axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",body);
        promise
            .then((res)=>{
                console.log(res.data)
                VoltarLogin()
            })
            .catch((err)=> {
                alert("deu erro")
                console.log(err)
            });
    }

    function VoltarLogin(){
        navigate("/");
    }
    return(
        <Conteiner_tela>
            <LogoStyled>
                <img src={logo}/>
            </LogoStyled>
            <FormStyled onSubmit={fazerCadastro}>
                <input type="email" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}  ></input>
                <input type="password" placeholder="senha" value={password} onChange={(e)=> setPassword(e.target.value)} ></input>
                <input type="text" placeholder="nome"  value={name} onChange={(e)=> setName(e.target.value)} ></input>
                <input type="url" placeholder="foto"  value={image} onChange={(e)=> setImage(e.target.value)} ></input>
                <button> Cadastrar </button>
            </FormStyled>
            <LinkStyled to={"/"}>
                <p> Já tem uma conta? Faça login! </p>
            </LinkStyled>
        </Conteiner_tela>
    )

}
