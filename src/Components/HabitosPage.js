import axios from "axios";
import Headers from "./Header";
import styled from "styled-components";
import MeusHabitos from "./MeusHabitos";
import mostrarHabito from "./MostrarHabito";
import UserContext from "../Context/userContext/UserContext";
import { useState, useEffect,useContext} from "react";
import tokenContext from "../Context/TokenContext/TokenContext";
import HabitosRecemCriados from "./HabitosRecemCriados";
import UltimoHabitoCriado from "../Context/UltimoHabitoCriadoContext/UltimoHabitoCriadoContext";
import butaoClicadoContext from "../Context/butaoClicadoContext/butaoClicadoContext";
import foiDeletadoContext from "../Context/FoiDeletadoContext/FoiDeletadoContext";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function HabitosPage(){
    let listaDias=[];
    const {token}= useContext(tokenContext);
    const {userData}= useContext(UserContext);
    const [habitos, setHabitos]= useState(null);
    const [insideButton,setInsideButton]= useState(true)
    const {foiDeletado,setFoiDeletado}= useContext(foiDeletadoContext)
    const {botaoClicado, setBotaoClicado} = useContext(butaoClicadoContext);
    const {ultimoHabitoCriado, setUltimoHabitoCriado}= useContext(UltimoHabitoCriado);
    const navigate = useNavigate()

    const weekDay= [
        {dia:"D",numero: 0 },{dia:"S",numero: 1},{dia:"T",numero: 2},{dia:"Q",numero: 3},{dia:"Q",numero: 4},{dia:"S",numero: 5},{dia:"S",numero: 6}
    ];
   
    const config ={
        headers:{
            "Authorization":`Bearer ${token}`
        }
    };

    useEffect(()=> {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config)
        promise
            .then((res)=>{setHabitos(res.data)})
            .catch((err)=>{
                alert('deu ruim fml')
                console.log(err)
            })

    },[]);


    function criarArrayDias(dia){
        if((listaDias.includes(dia))){
             listaDias=listaDias.filter((item)=> item!==dia)
           
        }else{
            listaDias.push(dia)
        }
        
    }

    function WeekButton({dia, numero}){
        const [color, setColor]= useState(undefined)
        function  mudarCor(){
            console.log("mudei de cor")
            if(color){
                setColor(false)
            }else{
                setColor(true)
            }
        }
        return(<DayButton 
            type="button" 
            fontColor={color? "":"#CFCFCF"} 
            bgcolor={color? "#CFCFCF":""} 
            onClick={()=> {
            criarArrayDias(numero )
            mudarCor()
        }}> {dia}</DayButton>)
    }


    function enviarHabito(name,days,insideButton,setInsideButton){
        setInsideButton(false)
        const body={
            name,
            days
        }
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",body,config);
        promise
            .then((res)=>{
                setUltimoHabitoCriado([...ultimoHabitoCriado,res.data])
                setTimeout(temHabitoNovo,4000)
                setInsideButton(true)
                setBotaoClicado(false)
            })
            .catch((err)=> {
                setInsideButton(true)
                console.log(err)
                alert("nao foi possivel enviar o habito")
            })
        
    }

    function CriarHabito({insideButton,setInsideButton}){
        const [nomeHabito,setNomeHabito] = useState("")
        if(botaoClicado){
            return(
                <FormsStyled>
                    <InputSection onSubmit={(e)=>e.preventDefault}>
                        <input placeholder="nome do hábito" value={nomeHabito} onChange={(e)=> setNomeHabito(e.target.value) }></input>
                        <section>
                        {weekDay.map((weekDay)=> <WeekButton key={weekDay.numero} dia={weekDay.dia} numero={weekDay.numero}/>)}
                           
                        </section>
                    </InputSection>
                    <ButtonSection>
                        <button className="btnCancelar" onClick={()=> setBotaoClicado(false)}>cancelar</button>
                        <button className="btnSalvar" type="button" onClick={()=> {
                            enviarHabito(nomeHabito,listaDias,insideButton,setInsideButton)
                            
                            }}>{insideButton?"salvar":"salvando"}</button>
                    </ButtonSection>
                </FormsStyled>
            )
        } else{
            return( <></>)
        }
    }
    

    function temHabitoNovo(){
        
        if(ultimoHabitoCriado.length){
            return(
                <>
                    {ultimoHabitoCriado.map((habito)=> <HabitosRecemCriados habito={habito}/>)}
                </>
            )
        }else{
            return
        }

    }

    function quandoResponder(){
        if (habitos){
        return(<>
            <Headers name={userData.name} image={userData.image} /> 
            <Content>
                <MeusHabitos botaoClicado={botaoClicado} setBotaoClicado={setBotaoClicado}></MeusHabitos>
                <CriarHabito insideButton={insideButton} setInsideButton={setInsideButton}/>
                <Habitos_Conteiner>
                    {temHabitoNovo()}
                    {mostrarHabito(habitos,setHabitos,token,setFoiDeletado)}
                </Habitos_Conteiner>
                <Footer navigate={navigate}></Footer>
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


//CSS
export const Content =styled.section`
    width:100%;
    height: 100%;
    display: flex;
    background-color:#F2F2F2;
    flex-direction: column;
    justify-content: flex-start;
    align-items:center;
    padding-top: 70px;
    padding: 70px 18px 0 18px;;
`

const Habitos_Conteiner =styled.section`
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-bottom:30px;
    margin-bottom:70px;
    padding-top: 10px;
    overflow-y: scroll;
`

const FormsStyled = styled.form`
    width:100%;
    height:250px;
    background-color:white;
    border-radius:5px; 
    padding: 18px;
    margin-top:20px;
    margin-bottom:10px;
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
        font-size:20px;
    }

    input::placeholder{
        font-size: 20px;
        color:#D4D4D4;
    }
    section{
        margin-top:10px;
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

const DayButton =styled.button`
    width:30px;
    height:30px;
    margin-right:5px;
    color:${props=> props.fontColor || "#FFFFFF"};
        
    border: 1px solid #DBDBDB;
    border-radius: 5px;
    text-align:center;
    font-size:16px;
    background-color: ${props=> props.bgcolor || "#FFFFFF"}
`