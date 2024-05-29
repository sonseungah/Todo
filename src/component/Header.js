import React from "react";
const Header = () => {
    return (
    <div>
        <h3 className="font-extrabold text-xl pb-4">오늘은 📆</h3>
        <div className="mb-0 text-cyan-400 text-3xl font-semibold">{new Date().toDateString()}</div>
    </div>
)
}
export default React.memo(Header);