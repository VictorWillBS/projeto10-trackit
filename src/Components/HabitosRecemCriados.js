import styled from "styled-components"
import trash from "./../assets/images/trash-outline.svg"
import deletarHabito from "../Functions/DeletarHabito";
export default function HabitosRecemCriados({habito}){
    console.log("entrei HRC")
    const weekDay= [
        {dia:"D",numero: 0 },{dia:"S",numero: 1},{dia:"T",numero: 2},{dia:"Q",numero: 3},{dia:"Q",numero: 4},{dia:"S",numero: 5},{dia:"S",numero: 6}
    ];
        const {id,name,days} = habito
        function WeekButton({dia, numero}){
            let color;
                       
            if(days.includes(numero)){
                color=true;
            }else{
                color=false;
            }
            return(<DayButton 
                type="button" 
                fontColor={color? "":"#CFCFCF"} 
                bgcolor={color? "#CFCFCF":""} 
               > {dia}</DayButton>)
        }

        return(
            <Card_Habito>
                <h6>{name}</h6> 
                <DayButtonSection>
                    {weekDay.map((weekDay)=> <WeekButton key={weekDay.numero} dia={weekDay.dia} numero={weekDay.numero}/>)}
                </DayButtonSection>
                <FiguraDelete onClick={()=>deletarHabito(id)}>
                    <img src={trash}/>
                </FiguraDelete>
            </Card_Habito>
            
        )
     
    }





//CSS
const Card_Habito = styled.article`
    width:100%;
    height:91px;
    margin-bottom:10px;
    background-color:white;
    padding:15px;
    position:relative;
    border-radius:5px;
    h6{
        font-size:20px;
        color:#666666;
    }
    p{
        font-size:18px;
        color:#666666;
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
    background-color: ${props=> props.bgcolor || "#FFFFFF"};
`

const DayButtonSection = styled.section`
    margin-top:8px;
`
const FiguraDelete= styled.button`
    top:10px;
    right:10px;
    border:none;
    cursor: pointer;
    position:absolute;
    background-color:white;
    
    img{
        color:#666666;
        height: 15px;
        width: 15px
    }
`