import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ENDPOINT from "../socket";
import { useNavigate } from "react-router-dom";
const socket = socketIOClient(ENDPOINT);

function Game() {

    const [users, setUsers]= useState([])
    const [current, setCurrent]= useState("")
    useEffect(()=> {
        console.log('rerer');
socket.emit('data',{}, (data)=> {
    console.log(data);
    setUsers(data)
})

socket.on('answered', (data)=> {
    console.log("data");
    setCurrent(data)
})
    }, [])
  return (
    <div className="m-14">
        <header className="relative bg-white">
            <p className="flex h-20 items-center rounded justify-center bg-indigo-600 px-4 text-2xl font-medium text-white sm:px-6 lg:px-8">APP GAME</p>
        </header>

        <div className="h-96 flex flex-col justify-center items-center">
       
        <CountdownCircleTimer
            isPlaying
            duration={60}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[60, 40, 20, 0]}
            size={300}
            strokeWidth={20}
            >
                {({ remainingTime }) => (<div className='flex flex-col items-center'>
                    <span class="text-4xl text-indigo-600 font-bold tracking-tight text-gray-900 ">{remainingTime}</span>
                <span class="text-3xl text-indigo-600 font-bold tracking-tight text-gray-900 ">{current}</span>
                </div>)}
            </CountdownCircleTimer>
        </div>

        <div className="flex mt-4 justify-center gap-4">
        {
            users.map((u)=><span class="inline-flex items-center rounded-md bg-purple-50 px-4 py-2 text-xl font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">{u.name} {u.score}</span>)
        }
        </div>
        <div className="flex gap-28">
        <button type="submit" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-lime-600 px-8 py-3 text-base font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2">Vrai</button>
        <button type="submit" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Faux</button>
        <button type="submit" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Terminer</button>
        </div>
    </div>
  );
}

export default Game;
