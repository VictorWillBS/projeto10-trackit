import styled from "styled-components"
import logoName from "./../assets/images/logoName.png"
export default function Headers({image, name}){
    return(
    <Header>
        <LogoName src={logoName}/>
        <UserPhoto src={image} alt="Foto do usuário"/>
    </Header>)
}

const Header = styled.header`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:70px;
    background-color:#126BA5;
    display:flex;
    justify-content: space-between;
    align-items:center;
`

const LogoName = styled.img`
    height: 45px;
`

const UserPhoto = styled.img`
    width:51px;
    height:51px;
    border-radius:100%;
`