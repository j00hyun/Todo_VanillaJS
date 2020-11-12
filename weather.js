const weather = document.querySelector(".js-weather"); //<span class="js-weather"></span>

//local storage
const API_KEY = "d1dbc8b02612c643a4b84bce687c3413"; //날씨 API
const COORDS = "coords"; //위치

function getWeather(lat, lng) { //날씨 화면에 출력
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric` //날씨 API 링크
    ).then(function(response) { //링크 내부의 body 스트림을 볼 수 있게 해줌
        return response.json();
    }).then(function(json) { //데이터 출력
        const temperature = json.main.temp; //온도
        const place = json.name; //현재 지역
        weather.innerText = `${temperature} @ ${place}`; //화면에 온도와 지역 출력
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj)); //local storage에 위치 저장
}

function handleGeoSuccess(position) { //위치 찾기 성공
    const latitude = position.coords.latitude; 
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj); //위치 저장하기
    getWeather(latitude, longitude); //위치에 따른 날씨 가져오기
}

function handleGeoError() {
    console.log('Cant access geo location'); //위치 찾기 실패
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError); //위치 찾기
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS); //저장된 위치 불러오기
    if(loadedCoords === null) { //저장된 위치가 없을때
        askForCoords(); //위치 요청하기
    } else { //저장된 위치가 있을때
        const parseCoords = JSON.parse(loadedCoords); //저장된 위치를 string -> object 로 변경하여 parseCoods에 저장
        getWeather(parseCoords.latitude, parseCoords.longitude); //날씨 가져오기
    }
}

function init() {
    loadCoords(); //위치
}

init();