import React, { useCallback, useReducer, useRef} from "react";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "리액트 공부",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "청소하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "책 읽기",
    createdDate: new Date().getTime(),
  },
]
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":{
      return [action.newItem,...state];
    }
    case "UPDATE": {
      return state.map((item)=>
        item.id === action.targetId? {...item, isDone:!item.isDone} :item);
    }
    case "DELETE": {
      return state.filter((item) => item.id!== action.targetId);
    }
    default:
  return state;
  }
}

export const TodoContext = React.createContext();

function App() {
  const idRef = useRef(3);
  const [todo,dispatch] = useReducer(reducer,mockTodo);

  /**
   * TodoEditor에서 추가 버튼을 눌렀을 대 호출되는 함수.
   * 사용자가 TodoEditor에서 작성한 내용을 받아 content에 저장
   * 데이터를 바탕으로 새 아이템 객체를 만들어 newItem에 저장
   */
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      }
    })
      idRef.current+=1
  }

  /**
   * todo 값 업데이트를 위해 setTodo 호출
   * map 메서드를 활용, id가 targetId와 일치하는 요소 찾기
   * isDone 값을 토글한 새 배열을 만들어 인수로 전달
   * TodoList 컴포넌트에 onUpdate 를 Props로 전달
   */
  const onUpdate = useCallback((targetId) =>{
    dispatch({
      type: "UPDATE",
      targetId
    })
  },[])

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId
    })
  },[])
  return (
    <div className="max-w-[500px] w-full mx-auto my-0 p-[20px] flex flex-col gap-[30px]">
      <Header />
      <TodoContext.Provider value={{todo, onCreate, onUpdate, onDelete}}>
      <TodoEditor/>
      <TodoList/>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
