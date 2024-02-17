import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import { getAllPostAction } from "../../Redux/Post/post.action";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];
const posts = [1, 1, 1, 1, 1];
const reels = [1, 1, 1, 1, 1];
const savedPost = [1, 1, 1, 1];
const Profile = () => {
  const { id } = useParams();
  const [value, setValue] = React.useState("post");
  const {post,auth}=useSelector(store=>store);

  const dispatch=useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(()=>{
    dispatch(getAllPostAction())
  },[])
  // console.log("auth.user -------", auth.user);
  // console.log("post --- pro", post)
  return (
    <Card className="my-10 w-[70%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md"
            src="https://cdn8.openculture.com/2020/12/30205923/umi013.jpg"
            alt=""
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src="https://i.ytimg.com/vi/HeOoOWP08Zo/mqdefault.jpg"
          />
          {true ? (
            <Button onClick={handleOpenProfileModal} sx={{ borderRadius: "20px" }} variant="outlined">
              Edit Profile
            </Button>
          ) : (
            <Button sx={{ borderRadius: "20px" }} variant="outlined">
              Follow
            </Button>
          )}
        </div>
        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-xl">
              {auth.user?.firstName + " " + auth.user?.lastName}
            </h1>
            <p>
              @
              {auth.user?.firstName.toLowerCase() +
                " " +
                auth.user?.lastName.toLowerCase()}
            </p>
          </div>
          <div className="flex gap-5 items-center py-3">
            <span>41 post</span>
            <span>35 followers</span>
            <span>5 followings</span>
          </div>
          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. A
              aliquid id error ipsum voluptatum et repudiandae quibusdam
              nostrum. Est exercitationem necessitatibus autem omnis tempore
              rerum, officia doloremque fugiat itaque consequuntur.e
            </p>
          </div>
        </div>
        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item) => (
                <Tab value={item.value} label={item.name} />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.posts.map((item) => (
                  <div className="border border-slate-100 rounded-md">
                    <PostCard item={item}/>
                  </div>
                ))}
              </div>
            ) : value === "reels" ? (
              <div className="flex justify-center flex-wrap gap-2 my-10">
                {reels.map((item) => (
                  <UserReelCard />
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.posts.map((item) => (
                  <div className="border border-slate-100 rounded-md">
                    {/* {post.posts?.map((item)=><PostCard item={post}/>)} */}
                    <PostCard item={item}/>
                  </div>
                ))}
              </div>
            ) : (
              <div>Repost</div>
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModal open={open} handleOpenProfileModal={handleOpenProfileModal} handleClose={handleClose} />
      </section>
    </Card>
  );
};

export default Profile;
