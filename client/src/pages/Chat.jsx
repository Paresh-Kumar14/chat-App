import React from "react";
import { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import { ChatContext } from "../context/ChatContext";
import UserChat from "../component/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../component/chat/PotentialChats";

const Chat = () => {
    const user = useContext(AuthContext);
    const { userChats, isUserChatsLoading, userChatsError } = useContext(ChatContext);
    console.log("UserChats", userChats);
    return (
        <Container>
        <PotentialChats/>
            {userChats?.length < 1 ? null : (
                <Stack direction="horizontal" gap={4} className="align-items-start">
                    <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                        {isUserChatsLoading && <p>Loading Chats</p>}
                        {userChats?.map((chat,index)=>{
                            return (
                                <div key = {index} >
                                <UserChat 
// @ts-ignore
                                // eslint-disable-next-line no-undef
                                chat={chat} user = {user}/>
                                </div>
                            )
                        })}
                    </Stack>
                    <p>ChatBox</p>
                </Stack>
            )}
        </Container>
    );
}

export default Chat;