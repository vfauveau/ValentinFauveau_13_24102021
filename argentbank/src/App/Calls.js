import { useDispatch, useSelector } from "react-redux";

const dispatch = useDispatch()
const message = useSelector(state => state.message)

function getUserInfo(token) {
    // get user Data using token
    fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(credentials),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            dispatch({type:"PROFILE_INFO", payload:data.body, message:data.body.message})
            
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

export {getUserInfo}