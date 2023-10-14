import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import axios from 'axios';
import MainContent from './Components/MainContent';

function App() {
  const [currentImageUrl,setCurrentImageUrl] = useState('')
  const [banlist,setBanlist] = useState([])
  const [history, setHistory] = useState([]);

  const [dogData,setDogData] = useState({
    name:'',
    height:'',
    weight:'',
    temperament:'',
    breedGroup:''
  })
  const apiCall = async() => {
    try{
    let response 
    let newdata
    do {
      response = await axios.get(`https://api.thedogapi.com/v1/images/search?&api_key=${import.meta.env.DOG_API_KEY}`)
      newdata = await axios.get(`https://api.thedogapi.com/v1/images/${response.data[0].id}`)
    } while (!newdata.data.breeds)
    setCurrentImageUrl(response.data[0].url)
    setDogData({
      name:newdata.data.breeds[0].name,
      height:newdata.data.breeds[0].height.imperial,
      weight:newdata.data.breeds[0].weight.imperial,
      temperament:newdata.data.breeds[0].temperament,
      breedGroup:newdata.data.breeds[0].breed_group
    })
  }catch(error){
    console.log(error);
  }
  }
  const handleAPICall = () => {
    apiCall()
    handleSetHistory()
  }
  const handleUnBan = (itemToBeRemove) => {
    setBanlist(banlist.filter(item => item !==  itemToBeRemove))
  }
  const handleSetHistory = () => {
    if (history.length === 0) {
      setHistory([[dogData.name, currentImageUrl]]);
    } else {
      setHistory(preHistory => [...preHistory, [dogData.name, currentImageUrl]]);
    }
}
useEffect(() => {
    console.log(history); 
}, [history]);
  
  return (
    <>
      <div className='container'>
        <div className="history-sidebar">
          <h2>Who have we see so far?</h2>
          { history.length>1 &&history.slice(1).map((item,index) => (
            <div className='historyItem' key={index}>
            <p>{item[0]}</p>
            <img  src={item[1]} />
            </div>
          ))
          }
        </div>

        <div className="main-content">
        <MainContent setBanlist={setBanlist} banlist={banlist} dogData={dogData} handleAPICall={handleAPICall} currentImageUrl={currentImageUrl}/>
        </div>

        <div className="ban-sidebar">
          <h2>Ban List</h2>
          { banlist.map((item,index) => (
            <ul>
            <li key={index}>
              <button onClick={() => handleUnBan(item)}>{item}</button>
            </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
