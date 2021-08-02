import React, {createRef, useEffect, useRef, useState} from 'react';
import {Box, Button, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import { addImage, postCompany } from "../../redux/features/company";
import { MdCloudUpload } from "react-icons/md";
import axios from "axios"


function AddInput(props) {

    const [image, setImage] = useState("")
    const [name, setText] = useState("")
    const [file, setFile] = useState("")
    const [fileName, setFilename] = useState("Choose File")
    const [uploadedFile, setUploadedFile] = useState({})
    const dispatch = useDispatch()

    const handleImage = (e) => {
        setImage(e.target.value)
    }
    const handleText = (e) => {
        setText(e.target.value)
    }
    const handleFile = (e) => {
        const file = e.target.files[0]
        dispatch(addImage(file))
    }
    const addCompany = async (e) => {
        dispatch(postCompany({ name, file }))
        console.log(file)
    }



    const input = useRef(null)

    const onFileClick = () => {
        input.current.click()
    }



    return (
        <Box>
            <form>
        <Box display={"flex"}>
                <Button onClick={onFileClick} type={"submit"}>
                <input id="file-input" ref={input} type="file" style={{display: "none"}} onChange={handleFile}/>
                <label htmlFor="customFile">{fileName}</label>
                </Button>
            <TextField
                id="outlined-basic"
                label="Название"
                variant="outlined"
                multiline
                value={name}
                onChange={handleText}
                fullWidth
            />
        </Box>
            <Box textAlign={"center"}>
                <Button type={"submit"} color={"secondary"} onClick={addCompany}>Принять</Button>
            </Box>
            </form>
        </Box>
    );
}

export default AddInput;
