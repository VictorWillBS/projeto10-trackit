import styled from "styled-components"
import UserContext from "../Context/userContext/UserContext";
import { useContext } from "react";
import logoName from "./../assets/images/logoName.png"
export default function Headers(){
    const {userData} = useContext(UserContext)
    return(
    <Header>
        <LogoName src={logoName}/>
        <UserPhoto src={userData.image} alt="Foto do usuário"/>
    </Header>)
}

const Header = styled.header`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:70px;
    padding:0 18px;
    background-color:#126BA5;
    display:flex;
    justify-content: space-between;
    align-items:center;
    z-index:1;
`

const LogoName = styled.img`
    width:97px;
    
`

const UserPhoto = styled.img`
    width:51px;
    height:51px;
    border-radius:100%;
`