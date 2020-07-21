document.addEventListener('DOMContentLoaded',()=>{


const result=document.querySelector('.result');
const temp=document.querySelectorAll('h1');


let type='fah';





skycons= new Skycons({"color": "black","resizeClear": true});

navigator.geolocation.getCurrentPosition(getpost,showError);

function getpost(position){
   
Latitude=position.coords.latitude; 
Longitude=position.coords.longitude;
  
startapp(Latitude,Longitude);
}

function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
  }

function startapp(x,y){

const token='fe50a1e0f804e8b614cd77177c54746f';
const proxy ="https://cors-anywhere.herokuapp.com/";
let url =`${proxy}https://api.darksky.net/forecast/${token}/${x},${y}`;


let xhr =new XMLHttpRequest();

xhr.open('GET',url,true);

xhr.onload=function(){
    if(this.status==200&&this.readyState==4){

data=JSON.parse(this.responseText);


daily=data.daily;


daily.data.forEach((element,index,array) => {
  if(index>array.length-4){
  return;
}else{

  let day=document.createElement('div');
  let canvas=document.createElement('canvas');
  canvas.setAttribute('width',128);
  canvas.setAttribute('height',128);
  canvas.setAttribute('id',`${element.icon}`);

  day.innerHTML=`
        <div class="date">${timeConverter(element.time,true)}</div>
        <div class="summary">${element.summary}</div>`

       day.appendChild(canvas);
       day.innerHTML+=`
        <div class="temp"><span>Temperature: </span><div class='fval'>${element.temperatureHigh}</div><div class='funit'> °F</div></div>
        <div class="humidity"><span>Humidity: </span>${element.humidity} %</div>
        <div class="pressure"><span>Pressure: </span>${element.pressure} mbar</div>
        <div class="windspeed"><span>Wind Speed: </span>${element.windSpeed} km/h</div>

        <div class="sunrise"><span>Sunrise: </span>${timeConverter(element.sunriseTime,false)}am</div>
        <div class="sunset"><span>Sunset: </span>${timeConverter(element.sunsetTime,false)}pm</div>
   `;

//skycons.add(canvas,element.icon);

   day.classList='day';
   result.appendChild(day);
}
});// close foreach
addanimation().then(()=>{
  
skycons.play();
});
    }//if for readstate and status
}//on load function

xhr.send({mode: 'no-cors'});

}//end of startapp


//tempdiv.addEventListener('click',convert);

function addanimation(){
return new Promise((resolve,reject)=>{

  
  let all=document.querySelectorAll('canvas');
  all.forEach(element=>{

    skycons.add(element,element.id);

  });
  resolve('Success');
})
}
document.body.addEventListener('click',check);

function check(e){
if(e.target.className=='temp' || e.target.parentElement.className=='temp'){
  convert();
}
  
}
function convert(){

  let fval=document.querySelectorAll('.fval');
  let funit=document.querySelectorAll('.funit');

if(type=='fah'){
 

for(let i=0;i<5;i++){

  const fahvalue=fval[i].innerHTML;
celvalue=(fahvalue - 32) * 5/9;
celvalue=(Math.round(celvalue * 100) / 100).toFixed(2);
fval[i].innerHTML=celvalue;
funit[i].innerHTML='  °C';
type='cel';

}

}
else if(type=='cel'){



  for(let i=0;i<5;i++){
  const celvalue=fval[i].innerHTML;
  fahvalue=(celvalue *9/5) +32;
  fahvalue=(Math.round(fahvalue * 100) / 100).toFixed(2);
  fval[i].innerHTML=fahvalue;
  funit[i].innerHTML='  °F';
  type='fah';
  }
}

}//fah to cel and vice-versa



function timeConverter(UNIX_timestamp,bool){
  
  var a = new Date(UNIX_timestamp * 1000);

  //for month

  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  // for days of the week

  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
 

  var year = a.getFullYear();
  var day = days[a.getDay()]
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time;
  if(bool){
    time= day+' '+date + ' ' + month;
  return time;
}
else{
time=hour + ':' + min + ' ';
return time;
}
}// time converter




});//end of DOMContentLoaded