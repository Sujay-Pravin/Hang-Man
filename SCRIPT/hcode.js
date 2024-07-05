const easybtn = document.getElementById("easy")
const modbtn = document.getElementById("mod")
const hrdbtn = document.getElementById("hrd")
const newbtn = document.getElementById("new")
const home = document.getElementById("home")
const herr = document.getElementById("herr")


var easymode = false
var modmode = false
var hrdmode = false


function clr(any){
    if(any.textContent == "EASY"){
        any.style.backgroundColor = "#3e8e41"
        any.style.boxShadow = "-3px 9px #666"
        
        modbtn.style.backgroundColor = "white"
        modbtn.style.boxShadow = "-3px 9px #292828"

        hrdbtn.style.backgroundColor = "white"
        hrdbtn.style.boxShadow = "-3px 9px #292828"

        easymode = true
        modmode = false
        hrdmode = false


    }
    else if(any.textContent == "MODERATE"){
        any.style.backgroundColor = "#e1f015"
        any.style.boxShadow = "-3px 9px #666"

        easybtn.style.backgroundColor = "white"
        easybtn.style.boxShadow = "-3px 9px #292828"

        hrdbtn.style.backgroundColor = "white"
        hrdbtn.style.boxShadow = "-3px 9px #292828"

        easymode = false
        modmode = true
        hrdmode = false
    }
    else if(any.textContent == "HARD"){
        any.style.backgroundColor = "#f45709"
        any.style.boxShadow = "-3px 9px #666"

        modbtn.style.backgroundColor = "white"
        modbtn.style.boxShadow = "-3px 9px #292828"

        easybtn.style.backgroundColor = "white"
        easybtn.style.boxShadow = "-3px 9px #292828"

        easymode = false
        modmode = false
        hrdmode = true
    }
}


easybtn.addEventListener("click",function(){    
    clr(easybtn)
})
modbtn.addEventListener("click",function(){    
    clr(modbtn)
})
hrdbtn.addEventListener("click",function(){    
    clr(hrdbtn)
})

newbtn.addEventListener("click",function(){
    if(easymode || modmode || hrdmode){
        home.style.display="none"
        game.style.display="flex"

        if(easymode){wordgen(easyList,evwords)}
        else if (modmode){wordgen(modList,mvwords)}
        else{wordgen(hrdList,hvwords)}
        

        document.querySelector("#r2").style.display="flex"
        document.querySelector("#r3").style.display="flex"


    }
    else{
        herr.textContent = "*Select DIFFICULTY"
    }

})


// ------------------------------------------------------------------------------------------------


const game = document.getElementById("gameon")
const endbtn = document.getElementById("END")
const hint1 = document.getElementById("hint")
const blank1 = document.getElementById("blank")
const cluebtn = document.getElementById("CLUE")
const nextbtn = document.getElementById("NEXT")


cluebtn.addEventListener("click",function(){
    givechance()
})

nextbtn.addEventListener("dblclick",function(){
    if(easymode){wordgen(easyList,evwords)}
    else if (modmode){wordgen(modList,mvwords)}
    else{wordgen(hrdList,hvwords)}

    document.querySelector("#r2").style.display="flex"
    document.querySelector("#r3").style.display="flex"
})



endbtn.addEventListener("click",function(){ 
        home.style.display="block"
        game.style.display="none"
        easymode=false
        modmode=false
        hrdmode=false

        easybtn.style.backgroundColor = "white"
        easybtn.style.boxShadow = "-3px 9px #292828"

        modbtn.style.backgroundColor = "white"
        modbtn.style.boxShadow = "-3px 9px #292828"

        hrdbtn.style.backgroundColor = "white"
        hrdbtn.style.boxShadow = "-3px 9px #292828"

        

})


let evwords = []
let mvwords = []
let hvwords = []




function wordgen(easList,vwords){

// ----------------------------------------------------------

    const diatmpt = 1
    const dchance = 3
    const dvidx = []

    vidx = dvidx
    iatmpt = diatmpt
    chance = dchance

    btncreation()

    
// ---------------------------------------------------------

    var{word,hint} = easList[Math.floor(Math.random()*easList.length)]
    if(vwords.length!=easList.length){
        if(vwords.includes(word)){
    
            wordgen(easList,vwords)
        }
        else{
            document.querySelector("#lvl").textContent=`${vwords.length} / ${easList.length}`
            document.querySelector("#CLUE").style.display="block"
            cluebtn.textContent = `CLUE = 3`
            document.getElementById("hangman").setAttribute("src",`img/1.jpg`)
            document.querySelector("#NEXT").style.display="block"
            hint1.textContent = hint
            blank1.innerHTML = word.split("").map(() => `<li class = 'letter'></li>`).join("")
            ans = word
        }
    }

    else{
        document.querySelector("#r2").innerHTML=""
        document.querySelector("#r3").innerHTML=""
        document.querySelector("#CLUE").style.display="none"
        document.querySelector("#NEXT").style.display="none"
        document.querySelector("#hint").textContent="YOU FOUND ALL WORDS IN THIS DIFFICULTY LEVEL"
    }
    
    

// -------------------------------------------------------------

}

function btncreation(){
    
    document.querySelector("#CLUE").style.display="block"
    document.querySelector("#r2").innerHTML = ""
    document.querySelector("#r3").innerHTML = ""
    for (let i=97;i<=122;i++){

            const kbtn = document.createElement("button")
            kbtn.innerText = String.fromCharCode(i);
            kbtn.setAttribute("class" , "alphkey")
            kbtn.setAttribute("id",String.fromCharCode(i))
            
            if(i<113){
                document.querySelector("#r2").appendChild(kbtn)
            }
            else{
                document.querySelector("#r3").appendChild(kbtn)
            }
            
            kbtn.addEventListener("click", function(){
                if(kbtn.style.color != "red"){
                    pressed = String.fromCharCode(i)
                    inword()
                }            
            })
    }
}




let pressed = ""
let ans = ""
let vidx = []
let iatmpt = 1
let chance = 3

function inword(){
    if(ans.includes(pressed)){
        let index = 0
        for(let i=0;i<ans.length;i++){
            if(ans[i]==pressed && !vidx.includes(i)){
                index = i
                vidx.push(i)
                document.querySelectorAll(".letter")[index].textContent = pressed.toUpperCase()
                document.querySelectorAll(".letter")[index].setAttribute("class","letter found")
                break
            }            
        }        

        
        if(vidx.length===ans.length){
            document.getElementById("hangman").setAttribute("src",`img/celeb.gif`)
            document.querySelector("#hint").textContent="YOU FOUND IT"
            blank1.innerHTML =  `<li id="gameover">${ans.toUpperCase()}</li>`
            document.getElementById("gameover").style.color="white"
            document.getElementById("gameover").style.fontSize="30px"
            document.getElementById("gameover").style.textShadow="3px -2px 3px blue"
            document.querySelector("#r2").style.display="none"
            document.querySelector("#r3").style.display="none"
            document.querySelector("#CLUE").style.display="none"
            if(easymode){evwords.push(ans)}
            else if (modmode){mvwords.push(ans)}
            else{hvwords.push(ans)}

            if(easymode){document.querySelector("#lvl").textContent=`${evwords.length} / ${easyList.length}`}
            else if (modmode){document.querySelector("#lvl").textContent=`${mvwords.length} / ${modList.length}`}
            else{document.querySelector("#lvl").textContent=`${hvwords.length} / ${hrdList.length}`}
        }
    }
    else{
        iatmpt++
        if(iatmpt<7){document.getElementById("hangman").setAttribute("src",`img/${iatmpt}.jpg`)}
        else{
            document.getElementById("hangman").setAttribute("src",`img/hangman.gif`)
            document.querySelector("#r2").style.display="none"
            document.querySelector("#r3").style.display="none"

            blank1.innerHTML =  `<li id="gameover">GAME OVER</li>`
            document.querySelector("#CLUE").style.display="none"
            document.querySelector("#hint").textContent="YOU DIED"
        }

        
        document.getElementById(pressed).style.color="red"
        document.getElementById(pressed).style.backgroundColor="black"
        document.getElementById(pressed).style.boxShadow="none"
    }
}

function givechance(){
    if(chance>0){
        chance--
        cluebtn.textContent = `CLUE = ${chance}`
        let index = Math.floor(Math.random()*ans.length)
        if(vidx.includes(index)){
            chance++
            givechance()
            return 0 
        }
        else{
            pressed = ans[index]
            inword()
            return 0
        }
        

    }
}






