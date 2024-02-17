import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Avatar, IconButton, TextField } from "@mui/material";
import { updateProfileAction } from "../../Redux/Auth/auth.action";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  //   border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  outline: "none",
  overFlow: "scroll-y",
  borderRadius: 3,
};

export default function ProfileModal({ open, handleClose }) {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("values", values);
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(updateProfileAction(values));
    },
  });
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p>Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div>
              <div className="h-[15rem]">
                <img className="w-full h-full rounded-t-md" src="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg" alt="" />
              </div>
              <div className="pl-5">
                <Avatar
                    className="transform -translate-y-24"
                    sx={{width:"10rem",height:"10rem"}}
                    src="https://i.ytimg.com/vi/HeOoOWP08Zo/mqdefault.jpg"
                />
              </div>
            </div>
            <div className="space-y-3">
                <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                />
                <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
