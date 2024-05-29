import {useState, useRef} from "react";

const TodoEditor = ({onCreate}) => { /** Props 객체를 구조 분해 할당 */
    /**
     * 사용자가 입력한 데이터를 저장할 State 변수 만들기
     * onChange 이벤트 핸들러 onChangeContent 만들기
     * 입력 폼의 value 속성으로 content값 설정, 이벤트 핸들러로 onChangeContent 설정
     */
    const [content,setContent] = useState("");
    const inputRef = useRef();
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }
    /**
     * 추가 버튼에 대한 이벤트 핸들러 생성
     * onSubmit -> onCreate 함수 호출 -> content로 값 전달
     * 만약 현재 값이 빈 문자열이면, current로 저장한 요소에 포커스 상태로 멈춰있게 함
     */
    const onSubmit = () =>{
        if(!content){
            inputRef.current.focus();
            return;
        }
        onCreate(content);
        setContent(""); // 새 아이템 추가 후 content 초기화
    };
    /**
     * Enter 키를 눌렀을 때도 추가 될 수 있게 하는 이벤트 핸들러 생성
     */
    const onKeyDown = (e) => {
        if(e.key === "Enter"){
            onSubmit();
        }
    }
    return(
        <div className="w-full flex flex-col gap-[10px]">
            <h4 className="text-l font-semibold">새로운 Todo 작성하기 🖋</h4>
            <div className="w-full flex gap-[10px]">
                <input 
                ref={inputRef}
                value={content}
                onChange={onChangeContent}
                onKeyDown={onKeyDown}
                placeholder="새로운 Todo..."
                className="flex-1 border box-border border-solid border-gray-300 rounded-[5px] p-[15px] focus:outline-none focus:border-cyan-500"/>
                <button onClick={onSubmit} className="cursor-pointer w-1/5 border-none bg-cyan-400 text-white rounded-[5px]">
                    추가
                    </button>
            </div>
        </div>
    )
}
export default TodoEditor;