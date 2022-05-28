

export default function mostrarHabito(habitos,setHabitos){
  
    function Habitos({id}){
        return(
            <h4>{id}</h4>
        )
     
    }

    if (!(habitos.length ===0)){
        return(habitos.map((habito)=><Habitos id={habito.id}/>))
    }
    else{
        return(
        <>
            <h4> Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h4>
            
        </>
        )
    }
}