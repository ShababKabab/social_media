import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";

const UserChatCard = ({ chat }) => {
  const {message,auth} = useSelector(store=>store);
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rgb(88,199,250",
            }}
            src="https://i.ytimg.com/vi/M3fawI961pk/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AHwBIAC6AKKAgwIABABGF0gXShdMA8=&rs=AOn4CLAmGD8Q_wspmC2DGxyA_GC9srT5qg"
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={auth.user?.id===chat.users[0]?.id?chat.users[1].firstName+" "+chat.users[1].lastName:chat.users[0].firstName+" "+chat.users[0].lastName}
        subheader={"new Message"}
      ></CardHeader>
    </Card>
  );
};

export default UserChatCard;
