import TodoItem from "./TodoItem";
import { useContext,useMemo,useState } from "react";
import { TodoContext } from "../App";

const TodoList = () => {
    const {todo, onUpdate, onDelete} = useContext(TodoContext);
    const storeData = useContext(TodoContext);
    // console.log(storeData);
    const [search,setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    TodoList.defaultProps = {
        todo: [],
    };

    /**
     * 검색해서 나오는 것만 보여주는 이벤트핸들러
     * 대문자 소문자 관계없이 검색 -> toLowerCase()
     */
    const getSearchResult = () => {
        return search === "" ? todo : todo.filter((item) => item.content.toLowerCase().includes(search.toLowerCase()));
    }

    const analyzeTodo = useMemo(()=>{
        const totalCount = todo.length;
        const doneCount = todo.filter((item) => item.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount
        }
    },[todo]);
    const {totalCount, doneCount, notDoneCount} = analyzeTodo;

    return(
        <div className="w-full flex flex-col gap-[10px]">
            <h4 className="text-l font-semibold">Todo List 📌</h4>
            <div>
                <div>총개수 : {totalCount}</div>
                <div>완료된 할일 : {doneCount}</div>
                <div>아직 완료하지 못한 할 일: {notDoneCount}</div>
            </div>
            <input
            value={search}
            onChange={onChangeSearch}
            className="mb-[20px] w-full border-b-[1px] border-solid border-gray-300 box-border py-[15px] focus:outline-none focus:border-cyan-400" placeholder="검색어를 입력하세요"/>
            <div className="flex flex-col gap-[20px]">
            {getSearchResult().map((item)=>(
                <TodoItem key={item.id} {...item}
                onUpdate={onUpdate}
                onDelete={onDelete}/>
            ))}
            </div>
        </div>
    )
}

export default TodoList;