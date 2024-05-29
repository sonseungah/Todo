const TodoItem = ({id,content,isDone,createdDate, onUpdate, onDelete}) => {
    const onChangeCheckbox = () => {
        onUpdate(id);
    }
    
    const onClickDelete = () => {
        onDelete(id);
    }
    return (
        <div className="flex items-center gap-[20px] pb-[20px] boder-b-[1px] border-solid border-gray-300">
            <div>
                <input checked={isDone} onChange={onChangeCheckbox} type="checkbox" className="w-[20px]"/>
            </div>
            <div className="flex-1">{content}</div>
            <div className="text-sm text-gray-400">{new Date(createdDate).toLocaleDateString()}</div>
            <div className="cursor-pointer bg-gray-300 outline-none rounded-[5px] p-[5px]">
                <button className="text-sm" onClick={onClickDelete}>삭제</button>
            </div>
        </div>
    )
}

export default TodoItem;