import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './upload.css'
import { useState } from 'react';
import io from 'socket.io-client';
const Upload = () => {
    const socket = io("localhost:5000")

    const [state, setState] = useState({
        // Initially, no file is selected
        selectedFile: null
    })

    // On file select (from the pop up)
    let onFileChange = event => {
        setState({ selectedFile: event.target.files[0] });
    };

    // On file upload (click the upload button)
    let onFileUpload = () => {
        // Create an object of formData

        // Details of the uploaded file


        // Request made to the backend api
        // Send formData object
        // console.log(state.selectedFile.width)
        
        socket.emit("add", { title: document.querySelector('input.title').value, content: document.querySelector('textarea.story').value, thumbnail: state.selectedFile })
        // axios.post("api/uploadfile", formData);
    };
    socket.on("image_result", (data) => {
        console.log('aaaa')
        document.querySelector('img#file').src = data
    })

    let fileData = () => {

        if (state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {state.selectedFile.name}</p>

                    <p>File Type: {state.selectedFile.type}</p>

                    <p>
                        Last Modified:{" "}
                        {state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                    <img id="file"></img>
                </div>
            );
        } else {
            return (
                <div style={{ position: "relative", textAlign: "center" }}>
                    <p>Choose an image for your story!</p>
                </div>
            );
        }
    };
    return (
        <div>
            <div style={{ textAlign: "center" }}>


                <div>
                    <div class="header">
                        <div class="top-header">
                            <div class="left-header">
                                <div class="container">
                                    <ul class="toggle">
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>
                                    <div class="sidebar">
                                        <ul class="menu">
                                            <div class="menu-text">
                                                <p>Menu</p>
                                            </div>
                                            <li><a href="/">Home</a></li>
                                            <li><a href="/upload.html">Upload</a></li>
                                            <li><a href="/">Topics</a></li>
                                            <li><a href="/">About Us</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="middle-header">
                                <div class="logo-top">
                                    <a href="/"><span>Storify</span></a>
                                    <div class="caption-logo">
                                        <span>Voice of the Unheard</span>
                                    </div>
                                </div>
                            </div>
                            <div class="right-header">
                                <a href="/#">
                                    <img class="search-icon" src="./search-icon.png"></img>
                                </a>
                            </div>
                        </div>
                        <div class="bottom-header">
                            <div class="header-navigation">
                                <a class="navigation-items" href="/#">The Latest |</a>
                                <a class="navigation-items" href="/#"> Under-Represented |</a>
                                <a class="navigation-items" href="/#"> Top Stories |</a>
                                <a class="navigation-items" href="/#"> Success Stories</a>
                            </div>
                        </div>
                    </div>
                    <div class="main-body">
                        <div class="upload-container">
                            <div class="upload-heading">
                                <span>Upload Your Story</span>
                            </div>
                            <form action="/">
                                <div class="name-input">
                                    <label>
                                        Name:<br></br>
                                    </label>
                                    <input class="name" placeholder="Name" required></input>
                                </div>
                                <div class="title-input">
                                    <label>
                                        Title:<br></br>
                                    </label>
                                    <input class="title" placeholder="Title" required></input>
                                </div>
                                <div class="story-input">
                                    <label>
                                        Your Story:<br></br>
                                    </label>
                                    <textarea class="story" placeholder="Story" required></textarea>

                                </div>
                                {fileData()}
                                <input type="file" onChange={onFileChange} style={{ width: "200px" }} />
                                    <br></br>
                                <input type="submit" value="Submit" class="submit" onClick={onFileUpload}></input>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Upload