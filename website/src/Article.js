import { useEffect } from 'react';
import io from 'socket.io-client';
import { Buffer } from 'buffer'
import "./article.css"
const Article = (inp) => {
    // console.log(inp)
    let all_article = []
    
    const socket = io("localhost:5000")
    socket.on('connect', () => {
        socket.emit('article')
    })
    socket.on('article_response', (data) => {
        all_article = JSON.parse(data)
        let thumbnail = `data:${"image/png"};base64,${Buffer.from(all_article[Object.keys(all_article)[7]].thumbnail.data).toString('base64')}`
        let title = all_article[Object.keys(all_article)[7]].title
        let content = all_article[Object.keys(all_article)[7]].content
        document.querySelector('div.main-heading').querySelector('span').innerHTML = title
        document.querySelector('div.main-paragraph').querySelector('span').innerHTML = content
        document.querySelector('div.main-img').querySelector('img').src = thumbnail
        

    }
    )
    return (
        <div>
            <div>
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
            <div class="body-container">
                <div class="main-heading">
                    <span></span>
                </div>
                <div class="main-img">
                    <img src="./large-card-image.png"></img>
                </div>

                <div class="down-arrow">
                    <a>-></a>
                </div>
                <div class="main-paragraph" id="main-paragraph">
                    <span>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</span>
                </div>
            </div>
        </div>

    )
}
export default Article;