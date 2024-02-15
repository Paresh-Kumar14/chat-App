import { createContext,useState,useEffect } from "react";
import { baseUrl,getRequest,postRequest} from "../utils/Services"

export const ChatContext = createContext();

export const ChatContextProvider = ({children ,user})=>{
    const [userChats,setuserChats] = useState(null);
    const [isUserChatLoading , setIsUserChatLoading] = useState(false);
    const [userChatsError,setuserChatsError] = useState(null);
    const [potentialChats,setpotentialChats] = useState([]);

    useEffect(()=>{
        const getUsers = async()=>{
            const response = await getRequest(`${baseUrl}/users`);
            if(response.error){
                return console.log("Error fetching users",response)
            }
            const pChats = response.filter((u)=>{
                let isChatCreated = false;
                if(user?._id === u._id) return false; 

                if(userChats){
                    isChatCreated = userChats?.some((chat)=>{
                        return chat.members[0] === u._id || chat.members[1] ==u._id
                    })
                }
                return !isChatCreated
            });
            setpotentialChats(pChats)
        };
        getUsers();
    },[userChats]);

    useEffect(()=>{
        const getUserChats = async()=>{
            if(user?._id){
                setIsUserChatLoading(true)
                setuserChatsError(null); //
                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
                setIsUserChtsLoading(false)
                if(response.error){
                    return setUserChatsError(response)
                }
                setUserChats(response)
            }
        }
        getUserChats();
    },[user]);
    const createChat = useCallback(async (firstId,secondId)=>{
        const response = await postRequest(`${baseUrl}/chats`,
        JSON.stringify({
            firstId,secondId
        })
        );
        if(response.error){
            return console.log("Error creating chat",response)
        }
        setUserChats((prev)=>[...prev,response]);
    },[])
    return (
        <ChatContext.Provider
        value={{
            userChats,
            isUserChatLoading,
            userChatsError,
            potentialChats,
            createChat,
        }}
        >
        {children}
        </ChatContext.Provider>
    )
}