
document.addEventListener('DOMContentLoaded', function (){
            let request = new XMLHttpRequest();
            console.log(request)
            //先 open 再 set request header
            request.open('GET', 'https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends' ,true); //打開資源 true 非同步 , false 同步
            request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json'); // 怎麼知道要用 setRequestHeader?
            request.setRequestHeader('Client-ID', 'bg95w14qdbr4q8kr8x41fc392ximf4'); 
            console.log(request)
                request.onload = () => { // callback function
                    let stream = document.querySelector('.stream')
                    let response = JSON.parse(request.response) //將 json 格式處理成 JS 物件
                    console.log(response) //我需要哪些資料?
                    if (request.status >= 200 && request.status < 400) { //代表成功 HTTP Status Code
                            
                        loadStreams(0)
                    
                        for (let i=1; i<20; i++) {
                            let copy = stream.cloneNode(true)
                            
                            loadStreams(i)

                            document.querySelector('main').appendChild(copy)
                        }
                                
                    } else {
                        alert('error')
                    }
                    
                    function loadStreams(i) {
                        stream.querySelector('.stream__img').firstChild.setAttribute('src', response.streams[i].preview.medium)
                        stream.querySelector('.stream__info--logo').firstChild.setAttribute('src', response.streams[i].channel.logo)
                        stream.querySelector('.stream__info--title').firstElementChild.innerText = response.streams[i].channel.status
                        stream.querySelector('.stream__info--title').lastElementChild.innerText = response.streams[i].channel.display_name
                    }
                };
                request.send();    
            
        })
        