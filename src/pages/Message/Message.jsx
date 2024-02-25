import { Avatar, Backdrop, CircularProgress, Grid, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUser from "../../components/SearchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Redux/Message/message.action";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudinary } from "../../utils/uploadToCloudniry";
import SockJS from "sockjs-client";
import Stom from "stompjs"


const Message = () => {
  const dispatch = useDispatch();
  const { message, auth } = useSelector(store => store);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading]=useState(false);
  const chatContainerRef=useRef(null);

  console.log("messages ------", messages)
  useEffect(() => {
    dispatch(getAllChats());
  }, []);

  console.log("chats -------", message.chats);

  const handleSelectImage = async(e) => {
    setLoading(true)
    console.log("handle Select Image.");
    const imgUrl=await uploadToCloudinary(e.target.files[0], "image")
    setSelectedImage(imgUrl)
    setLoading(false)
  };

  const handleCreateMessage = (value) => {
    const message = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage
    };
    dispatch(createMessage({message,sendMessageToServer}))
  };

  useEffect(()=>{
    setMessages([...messages,message.message])
  },[message.message])

  const [stompClient, setStomClient]=useState(null);

  useEffect(()=>{
    const sock=new SockJS("https://socialmedia-server-production.up.railway.app/ws")
    const stomp = Stom.over(sock);
    setStomClient(stomp);

    stomp.connect({}, onConnect, onErr)
  },[])

  const onConnect=()=>{
    console.log("websocket connected");
  }

  const onErr=(error)=>{
    console.log("Errr", error);
  }

  const sendMessageToServer=(newMessage)=>{
    console.log("atleast")
    if(stompClient && newMessage){
      stompClient.send(`/app/chat/${currentChat?.id.toString()}`,{},JSON.stringify(newMessage))
    }
  }

  const onMessageReice=(payload)=>{
    const recivedMessage=JSON.parse(payload.body)
    console.log("message revice from websocket", recivedMessage)
    setMessages([...messages, recivedMessage])
  }

  useEffect(()=>{
    if(stompClient && auth.user && currentChat){
      console.log("lastUseEffect");
      const subscription=stompClient.subscribe(`/user/${currentChat.id}/private`, onMessageReice)
    }
  })

  useEffect(()=>{
    if(chatContainerRef.current){
      chatContainerRef.current.srollTop=chatContainerRef.current.scrollHeight;
    }
  },[messages])

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <WestIcon />
                <h1 className="text-xl font-bold">Home</h1>
              </div>
              <div className="h-[83vh]">
                <div className="">
                  <SearchUser />
                </div>
                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar">
                  {message.chats.map((item) => {
                    return <div
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(item.message);
                      }}
                    >
                      <UserChatCard chat={item} />
                    </div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="h-full" item xs={9}>
        { currentChat ? <div>
            <div className="flex justify-between items-center border-l p-5">
              <div className="flex items-center space-x-3">
                <Avatar src="https://i0.wp.com/www.memelate.com/wp-content/uploads/2021/09/happy-kazi-maruf.png?fit=1046%2C775&ssl=1" />
                <p>{auth.user?.id===currentChat.users[0]?.id?currentChat.users[1].firstName+" "+currentChat.users[1].lastName:currentChat.users[0].firstName+" "+currentChat.users[0].lastName}</p>
              </div>
              <div className="flex space-x-3">
                <IconButton>
                  <AddIcCallIcon />
                </IconButton>
                <IconButton>
                  <VideoCallIcon />
                </IconButton>
              </div>
            </div>
            <div ref={chatContainerRef} className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5">
              { messages.map((item)=><ChatMessage item={item}/>)}
            </div>
            <div className="sticky bottom-0 border-l">
            {selectedImage && <img className="w-[5rem] h-[5rem] object-cover px-2" src={selectedImage} alt="" />}
            <div className="py-5 flex items-center justify-center space-x-5">
              <input
              onKeyPress={(e)=>{
                if(e.key==="Enter" && e.target.value){
                  handleCreateMessage(e.target.value)
                  setSelectedImage("")
                }
              }}
                className="bg-transparentborder border-[#3b40544] rounded-full w-[90%] py-3 px-5"
                placeholder="Type message..."
                type="text"
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSelectImage}
                  className="hidden"
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <AddPhotoAlternateIcon />
                </label>
              </div>
            </div>
          </div>
          </div>:<div className="h-full  space-y-5 flex flex-col justify-center items-center">
            <ChatBubbleOutlineIcon sx={{fontSize:"15rem"}}/>
              <p className="text-xl font-semibold">No Chats Selected</p>
            </div>}
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
