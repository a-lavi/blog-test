import React, { useEffect, useState} from 'react';
import moment from 'moment'
import { IdleTimeOutModal } from './LogoutModal'
import useAuth from "../hooks/useAuth";
import useLogout from '../hooks/useLogout';
const SessionTimeout = (props)=>{
    const[showModal,setShowModal]=useState(false)
    const {auth} = useAuth()
    console.log(auth)
    const logout = useLogout();
    let timer=undefined;
    const events= ['click','load','keydown']
    const eventHandler =(eventType)=>{
        
        console.log(eventType)
        if(auth.isAuthenticated){
            localStorage.setItem('lastInteractionTime',moment() )
            console.log('newtime')
            if(timer){
              
              startTimer();
          }
            
        }
        
    };
    
    useEffect(()=>{
        addEvents();
        
        return (()=>{
            
            removeEvents();
            clearTimeout(timer);
        })
    },[])
    
    const startTimer=()=>{
        
        if(timer){
            clearTimeout(timer)
        }
        timer=setTimeout(()=>{
            
            let lastInteractionTime=localStorage.getItem('lastInteractionTime')
            
            const diff = moment.duration(moment().diff(moment(lastInteractionTime)));
            let timeOutInterval=props.timeOutInterval?props.timeOutInterval:6000;
            if(!auth.isAuthenticated){
                clearTimeout(timer)
            }else{
                if(diff._milliseconds<timeOutInterval){
                    startTimer();
                    
                }else{
                    
                    setShowModal(true)
                }
            }
            
        },props.timeOutInterval?props.timeOutInterval:6000)
        
        
        
        
        
    }
    const addEvents=()=>{
        
        events.forEach(eventName=>{
            window.addEventListener(eventName,eventHandler)
        })
        
        startTimer();
    }
    
    const removeEvents=()=>{
        events.forEach(eventName=>{
            window.removeEventListener(eventName,eventHandler)
        })
    };
    
    const handleContinueSession = ()=>{
        setShowModal(false)
        
    }
    const handleLogout = ()=>{
        removeEvents();
        clearTimeout(timer);
        logout()
      
        setShowModal(false)
        
    }
    
    return(
        <div>
        
        <IdleTimeOutModal 
        showModal={showModal} 
        handleContinue={handleContinueSession}
        handleLogout={handleLogout}
        />
        
        </div>
        )
        
    }
  
  export default SessionTimeout;