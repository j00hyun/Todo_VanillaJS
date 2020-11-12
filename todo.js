const toDoForm = document.querySelector(".js-toDoForm"), //<form class="js-toDoForm">
                                                         //<input type="text" placeholder="Write a to do" />
                                                         //</form>
    toDoInput = toDoForm.querySelector("input"), //<input type="text" placeholder="Write a to do" />
    toDoList = document.querySelector(".js-toDoList"); //<ul class="js-toDoList"></ul>

const TODOS_LS = 'toDos'; //local storage 할일 key

let toDos = []; //할일 array

function deleteToDo(event) {
    const btn = event.target; //btn = x버튼 텍스트
    const li = btn.parentNode; //li = 누른 x버튼의 id의 li태그
    toDoList.removeChild(li); //x버튼 누른 li태그 html파일에서 삭제
    const cleanToDos = toDos.filter(function(toDo) { 
        return toDo.id !== parseInt(li.id); //html의 toDos id와 x버튼을 누른 곳의 id끼리 각각 비교 -> id가 다른 array 출력
    });
    toDos = cleanToDos; //toDos = x버튼을 누르고 남은 것들
    saveToDos(); //페이지를 새로고침(init함수 재실행)하면 toDos를 local storage에 새로 저장 (id 재정렬)
}

function saveToDos() { //할일 local storage에 저장
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //array 내용 문자열로 바꿔 local storage에 저장
}

function paintToDo(text) { //할일목록에 추가
    const li = document.createElement("li"); //li태그 추가
    const delBtn = document.createElement("button"); //button태그 추가
    const span = document.createElement("span"); //span태그 추가
    const newId = toDos.length + 1;//Id 생성
    delBtn.innerText = "❌"; //버튼 텍스트: ❌
    delBtn.addEventListener("click", deleteToDo); //x버튼 클릭하면 deleteToDo 이벤트 발생
    span.innerText = text; //span내부 텍스트: 할일 입력값
    li.appendChild(delBtn); //li태그 내부에 button
    li.appendChild(span); //li태그 내부에 span
    li.id = newId; //li태그에 Id 삽입
    toDoList.appendChild(li); //li태그를 toDoList 내부에 추가
    const toDoObj = { //할일, id를 가진 문자열 toDoObj생성
        text: text,
        id: newId
    };
    toDos.push(toDoObj); //toDoObj을 toDos에 넣기
    saveToDos(); //toDos내용 local storage에 저장
}

function handleSubmit(event) { //enter누르면 입력값 목록에 저장 후 입력값 삭제
    event.preventDefault(); //enter눌렀을때 기본이벤트 제거
    const currentValue = toDoInput.value; //할일 입력값
    paintToDo(currentValue); //할일 입력값 목록에 저장
    toDoInput.value = ""; //입력값 삭제
}

function loadToDos() { //이전에 입력했던 할일 불러오기
    const loadedToDos = localStorage.getItem(TODOS_LS); //local storage의 할일 가져오기
    if(loadedToDos !== null) { //할일이 있었다면
        const parsedToDos = JSON.parse(loadedToDos); //parsedToDos에 이전에 저장했던 할일 가져오기 (string->object)
        parsedToDos.forEach(function(toDo) { //parsedToDos array의 각각 text값을 가져와 화면에 표시
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit) //입력값 넣고 enter눌렀을때 이벤트 실행
}

init();