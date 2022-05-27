import { useContext} from "react"
import Headers from "./Header"
import tokenContext from "../TokenContext/TokenContext"
import UserContext from "../userContext/UserContext"
export default function HabitosPage(){
    const {token}= useContext(tokenContext)
    const {userData}= useContext(UserContext)
    return(
        <>
            <Headers name={userData.name} image={userData.image} /> 
            <h4></h4>
        </>)
}