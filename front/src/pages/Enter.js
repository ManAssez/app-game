import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ENDPOINT from "../socket";
import { useNavigate } from "react-router-dom";

const socket = socketIOClient(ENDPOINT);
function Enter() {
    const [name, setName]= useState("")
    const [exist, setExist] = useState(false)
    const navigate = useNavigate()
    useEffect(()=> {
        socket.on("exist", (data) => {
          console.log("data");
          setExist(true)
        });

        socket.on("joined", (data) => {
            console.log(data);
            localStorage.setItem('name', data)
            navigate('/answer')
          });
    }, [])
    return (
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" onSubmit={(e)=> {
        e.preventDefault()
        console.log(name);
        socket.emit('join', {name})
    }}>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Nom</label>
        <div class="mt-2">
          <input onChange={(e)=> setName(e.target.value)} id="email" name="text" type="text" placeholder="Entrez votre nom" required class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
        {exist ? <p className="truncate text-xs m-0 text-red-500">leslie.alexander@example.com</p> : ""}
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Jouer</button>
      </div>
    </form>
  </div>
</div>
    );
  }
  
  export default Enter;
  