import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import ENDPOINT from "../socket";
const socket = socketIOClient(ENDPOINT);
function Answer() {
    const navigate = useNavigate()
    useEffect(()=> {

        if(!localStorage.getItem('name')){
            navigate('/enter')
        }
    }, [])
    return (
<div class="h-screen  flex justify-center items-center">
        <button onClick={()=> socket.emit('answer', localStorage.getItem('name'))} type="button" class="inline-flex items-center rounded-md bg-orange-600 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Répondre
        </button>
      </div>
    );
  }
  
  export default Answer;
  