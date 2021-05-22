import React from 'react'
import    SideBar   from './SideBar'
import Chat      from './Chat'
import './app.css'
export default function App() {
    return (
        <div  className="app">
         <div className="app__body" >   
           <SideBar/>
           <Chat/>
         </div>
        </div>
    )
}
