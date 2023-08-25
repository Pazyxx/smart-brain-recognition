import React from "react";


const Rank = ({userName, userEntries}) => {
    return (
        <div>
            <div style={{marginLeft: "10px", marginRight: "10px"}} className="white f3">
                {`${userName}, your current entry count is ...`}
            </div>
            <div>
                {`${userEntries}`}
            </div>
        </div>
    )
}

export default Rank