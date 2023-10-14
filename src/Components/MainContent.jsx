import { useEffect } from "react";
const MainContent = ({dogData,handleAPICall,currentImageUrl,banlist,setBanlist}) => {

    const handleBan = (item) => {
        if(!banlist.includes(item)){
            setBanlist(prevBanlist => [...prevBanlist, item])
        }
    }

    return(
        <>
            <h1>Dog Discoveries!</h1>
            <h3>Discover dogs from your wildest dreams! </h3>
            <p> 🐶  🐕  🦮  🐩  🐕‍🦺   🐾  </p>
            <div className="discover-container">
            <div className="listing-container">
                <div className="name-container">{dogData.name}</div>
                <div className="temperament">{dogData.temperament}</div>
                {currentImageUrl && <img src={currentImageUrl} alt="" />}
                { dogData.name && <div className="buttonGroup">
                <button onClick={() => handleBan(dogData.breedGroup)}>Breed Group:{dogData.breedGroup}</button>
                <button onClick={() => handleBan(dogData.height)}>Height:{dogData.height}</button>
                <button onClick={() => handleBan(dogData.weight)}>Weight:{dogData.weight}</button>
                </div>}
                
            </div>
                <button onClick={handleAPICall}>Discover</button>
            </div>
    </>
    )
}
export default MainContent;