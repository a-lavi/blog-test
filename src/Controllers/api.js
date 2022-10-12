const apiUrl = "https://boardgame-backend-mongodb.herokuapp.com"
//testt


//LOGIN>>>>>>>>>>>>>>>>>>>>>>

async function loginControl( {username, password} ) {
    
    const response = await fetch( apiUrl + '/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            username,
            password
        })
    })
    if (response.ok) {
        const tok= await response.json()
        console.log(response)
        localStorage.setItem('token', tok.data)
        
        return getBoardGames()
    }else{
        console.log('Error: ',await response.json())
        throw Error('Login Failed')
    }
    
}

//REGISTER>>>>>>>>>>>>>>>>>>>>

async function registerControl( {username, password} ) {
    
    const response = await fetch( apiUrl + '/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    if (response.ok) {
        console.log(response)
        return getBoardGames()
    }else{
     const err=  await response.json()
     console.log(err.error)
     console.log(response)
    }
   return getBoardGames()
}


//CHANGE PASSWORD>>>>>>>>>>>>>>>>>>
async function changePassControl({password,accessToken,roles}){

    const response = await fetch( apiUrl + '/api/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            newPassword: password,
            token: localStorage.getItem('token')
        })
    })
    if (response.ok) {
        console.log(response)
        return getBoardGames()
    }else{
     const err=  await response.json()
     console.log(err.error)
     console.log('errorrr')
    }
}




async function getBoardGames(){
    const response =await fetch (apiUrl + '/api/boardgames') 
    const result =await response.json()
    return result
}

async function getSingleBoardGame(slug){
    //console.log(SingleGameTitle)
    //const slug = SingleGameTitle.replaceAll(" ", "_").toLowerCase()
    console.log(slug)
    const response =await fetch (apiUrl + '/api/boardgames/byslug/' + slug) 
    const result =await response.json()
    return result
}



async function gameEdit({id,title,
    author,
    imgUrl,
    richText,
    publisher,accessToken,roles}){
        
    const response = await fetch (apiUrl + `/api/boardgames/${id}`,{
        
        method: 'Put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({title,
            author,
            imgUrl,
            richText,
            publisher})
    })
    if (response.ok) {
        return getBoardGames()
    }

    throw Error('Edit Game failed')
    
}


async function addBoardGames( {title,
    author,
    imgUrl,
    richText,
    publisher,accessToken,roles} ) {
        
    const response = await fetch( apiUrl + '/api/boardgames', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({title,
            author,
            imgUrl,
            richText,
            publisher})
    })
    if (response.ok) {
        return getBoardGames()
    }

    throw Error('Adding author failed')
    
}



async function deleteBoardGames(id){
    const response =await fetch (apiUrl + `/api/boardgames/${id.id}`,{
        
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + id.accessToken
        },
        body: JSON.stringify({id})
    })
    if (response.ok) {
        
        return getBoardGames()
    }

    throw Error('Edit Game failed')
}




export  {
    getBoardGames,
    addBoardGames,
    gameEdit,
    deleteBoardGames,
    /* registerControl,
    loginControl, */
    getSingleBoardGame,
    changePassControl
}