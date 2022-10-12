const calculateRemainingTime= (expirationTime)=>{
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime()
    const remainingDuration =adjExpirationTime- currentTime
    return remainingDuration
}
// inside login handler

const remainingTime = calculateRemainingTime(expirationTime)
setTimeout(logoutHandler, remainingTime);




//inside fetch
const expirationTime =  new Date(new Date().getTime()+ (expireTime.expiresIn * 1000)) //done