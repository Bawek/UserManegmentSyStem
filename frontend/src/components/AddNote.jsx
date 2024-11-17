import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import AddItem from "./addItem";

const AddNote = () => {
  const { token, navigate} = useContext(ShopContext);
 
  if (!token) {
    navigate("/login");
  }


  return (
    <div>
   <AddItem/>
    </div>
  );
};

export default AddNote;
