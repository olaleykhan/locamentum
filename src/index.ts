import "./main.scss";
import axios from 'axios'
// const GOOGLE_API_KEY:string = "AIzaSyBWuzNAI1cpHosvRZHl97EJMIk9YgzHcDc";
const MAP_BASE_URL = `https://maps.googleapis.com/maps/api/geocode/json?address={address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

// https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJeRpOeF67j4AR9ydy_PIzPuM&key=YOUR_API_KEY

function main(owner:string):void{
    console.log(`Hello World from ${owner}`);
};



async function handleSubmitAddress(e:Event):Promise<void>{
    e.preventDefault();
    const addressNode = document.getElementById("address") as HTMLInputElement;
const addressValue = addressNode.value;
if(addressValue.trim().length<2){
    alert("location too short")
}
    console.log(addressValue);
   
 try {
    
    const res = await axios.get(MAP_BASE_URL.replace("{address}", addressValue));
    const location = res.data.results[0]?.geometry.location;
    if(!location){
        // alert("Address not found, please enter a more accurate location");
        document.getElementById("map")!.innerHTML = "Address not found, please enter a more accurate location";
        return;
    }
    const map:google.maps.Map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
     center: location,
     zoom: 16,
   });
   new google.maps.Marker({
    position: location,
    map,
    title:addressValue,
  });
     
 } catch (error) {  
   alert("Address not found, please enter a more accurate location");
     
 }
}

// let map: google.maps.Map;

// function initMap(): void {
 
// }

const addressForm = document.getElementById("address-form")! as HTMLFormElement;

addressForm.addEventListener("submit", handleSubmitAddress);

// eslint-disable-next-line no-unused-vars


main("Alaf guy");

