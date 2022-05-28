
import styled from "styled-components"




   
export default function MeusHabitos({botaoClicado, setBotaoClicado}){
     function fazerNovoHabito(){
       console.log("cliquei")
        if(!botaoClicado){
            setBotaoClicado(true)
        }else{
            setBotaoClicado(false)
        }
        
    }

    return (
        <Container_top>
            <h5> Meus Hábitos</h5>
            <button onClick={fazerNovoHabito}>+</button>
        </Container_top>
    )

}

const Container_top = styled.section`
    width:100%;
    background-color:lightpink;
    display:flex;
    justify-content: space-between;
    align-items: center;

    h5{
        color:#126BA5;
        font-size:23px;
    }

    button{
        width:40px;
        height:35px;
        border: none;
        color:white;
        font-size:26px;
        border-radius: 5px;
        background-color:#52B6FF;
    }
`