import axios from "axios"

export default  function deletarHabito(id, token,setFoiDeletado){
   
    const config ={
        headers:{
            "Authorization":`Bearer ${token}`
        }
    };
    const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,config)
    promise
        .then(()=> {
            alert(" habito delatado")
            setFoiDeletado(true)
        })
        .catch((err)=>{
             alert("não foi possível deletar o hábito. Tente de novo mais tarde")
            console.log(err)
            })
}