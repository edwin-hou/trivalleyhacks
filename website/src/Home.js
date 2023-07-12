import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer'
import { useState } from 'react';
import io from 'socket.io-client';
import Upload from './upload';
import { useParams } from 'react-router-dom'

import "./home.css"
// let Buffer = require('buffer')
const Home = () => {
    let all_article = []
    let navigate = useNavigate()

    const socket = io("localhost:5000")
    socket.on('connect', () => {
        socket.emit('article')
    })
    socket.on('article_response', (data) => {
        console.log(data)
        all_article = JSON.parse(data)
        document.querySelector('div.large-card').style.backgroundImage = `url(data:${"image/png"};base64,${Buffer.from(all_article[Object.keys(all_article)[0]].thumbnail.data).toString('base64')})`
        document.querySelector('div.medium-card').style.backgroundImage = `url(data:${"image/png"};base64,${Buffer.from(all_article[Object.keys(all_article)[1]].thumbnail.data).toString('base64')})`
        document.querySelector('div.small-card').style.backgroundImage = `url(data:${"image/png"};base64,${Buffer.from(all_article[Object.keys(all_article)[2]].thumbnail.data).toString('base64')})`
        document.querySelector('div.square-card').style.backgroundImage = `url(data:${"image/png"};base64,${Buffer.from(all_article[Object.keys(all_article)[3]].thumbnail.data).toString('base64')})`
        document.querySelectorAll('div.card-right')[0].style.backgroundImage = `url(data:${"image/png"};base64,${Buffer.from(all_article[Object.keys(all_article)[4]].thumbnail.data).toString('base64')})`
        document.querySelectorAll('div.card-right')[1].style.backgroundImage = `url(data:${"image/png"};base64,${Buffer.from(all_article[Object.keys(all_article)[5]].thumbnail.data).toString('base64')})`
        document.querySelector('div.large-card').childNodes[1].querySelector("span").innerHTML = all_article[Object.keys(all_article)[0]].title.slice(0, 20) + "..."
        document.querySelector('div.medium-card').childNodes[1].querySelector("span").innerHTML = all_article[Object.keys(all_article)[1]].title.slice(0, 30) + "..."
        document.querySelector('div.small-card').childNodes[1].querySelector("span").innerHTML = all_article[Object.keys(all_article)[2]].title.slice(0, 30) + "..."
        document.querySelector('div.square-card').childNodes[1].querySelector("span").innerHTML = all_article[Object.keys(all_article)[3]].title.slice(0, 30) + "..."
        document.querySelectorAll('div.card-right')[0].childNodes[1].querySelector("span").innerHTML = all_article[Object.keys(all_article)[4]].title.slice(0, 30) + "..."
        document.querySelectorAll('div.card-right')[1].childNodes[1].querySelector("span").innerHTML = all_article[Object.keys(all_article)[5]].title.slice(0, 30) + "..."

        document.querySelector('div.large-card').childNodes[2].querySelector("span").innerHTML = all_article[Object.keys(all_article)[0]].content.slice(0, 250) + "..."
        document.querySelector('div.square-card').childNodes[2].querySelector("span").innerHTML = all_article[Object.keys(all_article)[3]].content.slice(0, 250) + "..."

        document.querySelector('div.large-card').addEventListener('click', ()=>{navigate('/article/'+ Object.keys(all_article)[0])})
        document.querySelector('div.medium-card').addEventListener('click', ()=>{navigate('/article/'+ Object.keys(all_article)[1])})
        document.querySelector('div.small-card').addEventListener('click', ()=>{navigate('/article/'+ Object.keys(all_article)[2])})
        document.querySelector('div.square-card').addEventListener('click', ()=>{navigate('/article/'+ Object.keys(all_article)[3])})
        document.querySelectorAll('div.card-right')[0].addEventListener('click', ()=>{navigate('/article/'+ Object.keys(all_article)[4])})
        document.querySelectorAll('div.card-right')[1].addEventListener('click', ()=>{navigate('/article/'+ Object.keys(all_article)[5])})


        document.querySelector('div.card-container-1').innerHTML = ""
        let d = document.createElement('div')
        d.className = 'card card-1'
        d.innerHTML = `<div class="card-topic"><a class="navigation-items-2" href="/#">Health |</a><a class="navigation-items-2" href="/#">Food</a></div><div class="card-header"><span>London's Michelin doing takeaway</span></div><div class="card-caption"><span>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum...</span></div>`
        d.style.backgroundImage = `url(data:${"image/png"};base64,${Buffer.from(all_article[Object.keys(all_article)[6]].thumbnail.data).toString('base64')})`
        console.log(d)
        d.childNodes[1].querySelector("span").innerHTML = all_article[Object.keys(all_article)[6]].title.slice(0, 30) + "..."
        d.childNodes[2].querySelector("span").innerHTML = all_article[Object.keys(all_article)[6]].content.slice(0, 150) + "..."
        d.addEventListener('click', ()=>{navigate('/article/'+ Object.keys(all_article)[6])})
        document.querySelector('div.card-container-1').appendChild(d)
        for (let i = 0; i < Object.keys(all_article).length - 7; i++) {
            let d = document.createElement('div')
            d.className = 'card'
            d.innerHTML = `<div class="card-topic"><a class="navigation-items-2" href="/#">Health |</a><a class="navigation-items-2" href="/#">Food</a></div><div class="card-header"><span>London's Michelin doing takeaway</span></div><div class="card-caption"><span>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum...</span></div>`
            d.style.backgroundImage = `url(data:${"image/png"};base64,${Buffer.from(all_article[Object.keys(all_article)[7 + i]].thumbnail.data).toString('base64')})`
            d.childNodes[1].querySelector("span").innerHTML = all_article[Object.keys(all_article)[7 + i]].title.slice(0, 30) + "..."
            d.childNodes[2].querySelector("span").innerHTML = all_article[Object.keys(all_article)[7 + i]].content.slice(0, 150) + "..."
            d.addEventListener('click', ()=>{navigate('/article/'+ Object.keys(all_article)[7+i])})
            document.querySelector('div.card-container-1').appendChild(d)
        }
        console.log(document.querySelectorAll('div.card').length)
        // for (let i = 0; i < document.querySelectorAll('div.card').length; i++) {
        //     console.log(i)
        //     document.querySelectorAll('div.card')[i].style.backgroundImage = `url(data:${"image/png"};base64,${Buffer.from(all_article[Object.keys(all_article)[i+6]].thumbnail.data).toString('base64')})`
        // }

    })

    useEffect(() => {
        document.querySelector('.container ul.toggle').addEventListener("click", function () {
            document.querySelector(".container ul.toggle").classList.toggle('active');
            document.querySelector('.container .sidebar').classList.toggle('active');
        })


        // document.querySelector("label.num0").click()
        document.querySelector('.menu a').addEventListener("click", function () {
            document.querySelector('.container ul.toggle').classList.toggle('active');
            document.querySelector('.container .sidebar').classList.toggle('active');
        })
    })


    return (
        <div>

            <div className="header">
                <div className="top-header">
                    <div className="left-header">
                        <div className="container">
                            <ul className="toggle">
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                            <div className="sidebar">
                                <ul className="menu">
                                    <div className="menu-text">
                                        <p>Menu</p>
                                    </div>
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/upload">Upload</a></li>
                                    <li><a href="/topics">Topics</a></li>
                                    {/* <li><a href="/">About Us</a></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="middle-header">
                        <div className="logo-top">
                            <a href="/"><span>Storify</span></a>
                            <div className="caption-logo">
                                <span>Voice of the Unheard</span>
                            </div>
                        </div>
                    </div>
                    <div className="right-header">
                        <input class="search"></input>
                        <a href="/#">
                            <img className="search-icon" src={require("./search-icon.png")}></img>
                        </a>
                        <div className="upload-btn">
                            <a href="/upload">Upload + </a>
                        </div>
                    </div>
                </div>
                <div className="bottom-header">
                    <div className="header-navigation">
                        <a className="navigation-items" href="/#">The Latest |</a>
                        <a className="navigation-items" href="/topics"> Under-Represented |</a>
                        <a className="navigation-items" href="/#"> Top Stories |</a>
                        <a className="navigation-items" href="/#"> Success Stories</a>
                    </div>
                </div>
            </div>
            <div className="body-container">
                <div className="large-card" >

                    <div className="large-card-topic">
                        <a className="navigation-items-2" href="/#">Health |</a>
                        <a className="navigation-items-2" href="/#">Food</a>
                    </div>
                    <div className="large-card-header">
                        <span>London's Michelin doing takeaway</span>
                    </div>
                    <div className="large-card-caption">
                        <span>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum...</span>
                    </div>

                </div>
                <div className="card-container">
                    <div className="medium-card">
                        <div className="large-card-topic">
                            <a className="navigation-items-2" href="/#">Health |</a>
                            <a className="navigation-items-2" href="/#">Food</a>
                        </div>
                        <div className="medium-card-header">
                            <span>London's Michelin doing takeaway</span>
                        </div>
                    </div>
                    <div className="small-card">
                        <div className="large-card-topic">
                            <a className="navigation-items-2" href="/#">Health |</a>
                            <a className="navigation-items-2" href="/#">Food</a>
                        </div>
                        <div className="medium-card-header">
                            <span>London's Michelin doing takeaway</span>
                        </div>
                    </div>
                </div>

                <div className="latest-card">
                    <div className="main-card-heading">
                        <span>The Latest</span>
                    </div>
                    <div className="latest-container">
                        <div className="square-card">
                            <div className="large-card-topic">
                                <a className="navigation-items-2" href="/#">Health |</a>
                                <a className="navigation-items-2" href="/#">Food</a>
                            </div>
                            <div className="square-card-header">
                                <span>London's Michelin doing takeaway</span>
                            </div>
                            <div className="square-card-caption">
                                <span>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum...</span>
                            </div>

                        </div>
                        <div className="latest-container-right">
                            <div className="card-right">
                                <div className="large-card-topic">
                                    <a className="navigation-items-2" href="/#">Health |</a>
                                    <a className="navigation-items-2" href="/#">Food</a>
                                </div>
                                <div className="card-right-header">
                                    <span>London's Michelin doing takeaway</span>
                                </div>
                            </div>
                            <div className="card-right">
                                <div className="large-card-topic">
                                    <a className="navigation-items-2" href="/#">Health |</a>
                                    <a className="navigation-items-2" href="/#">Food</a>
                                </div>
                                <div className="card-right-header">
                                    <span>London's Michelin doing takeaway</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="card-container-1">
                        <div className="card card-1">
                            <div className="card-topic">
                                <a className="navigation-items-2" href="/#">Health |</a>
                                <a className="navigation-items-2" href="/#">Food</a>
                            </div>
                            <div className="card-header">
                                <span>London's Michelin doing takeaway</span>
                            </div>
                            <div className="card-caption">
                                <span>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum...</span>
                            </div>

                        </div>
                        <div className="card">
                            <div className="card-topic">
                                <a className="navigation-items-2" href="/#">Health |</a>
                                <a className="navigation-items-2" href="/#">Food</a>
                            </div>
                            <div className="card-header">
                                <span>London's Michelin doing takeaway</span>
                            </div>
                            <div className="card-caption">
                                <span>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Home;