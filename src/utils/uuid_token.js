import { v4 as uuidv4 } from "uuid";
// 隨機生成一個字符串，且每次執行不能發生變化，遊客身分持久存儲
export const getUUID = () => {
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    if (!uuid_token) {
        uuid_token = uuidv4();
        localStorage.setItem("UUIDTOKEN", uuid_token);
    }
    return uuid_token;
}