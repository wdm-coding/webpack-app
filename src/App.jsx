import React from 'react'
import axios from 'axios';
function App(){
    axios.get('/api/mock').then(res=>{
        console.log(res)
    })
    return <h1>Hello, React</h1>
}
export default App