import PopUp from "../PopUp";
import Input from "../InputBox";
import { useReducer, useRef, useState ,useEffect, useContext} from "react";
import Styles from './index.module.css'
import Button from "../Button";
import { validEmail, validUserName } from "../../Adapters/rejexFunciton";
import {checkIfUserExists,generateAToken,checkCode, createAccount} from "../../Adapters/signinApi";
import { validPassword } from "../../Adapters/rejexFunciton";
import AuthContext from '../../Context/AuthContext';
import TwitterIcon from '../../assets/twitterIcon'
import defaultPicture from '/twitterPicture.jpg';
import { changeProfile, checkIfUsernameAvailable, getListOfUser, updateUsername } from "../../Adapters/UserApi";
import SmallProfile from "../SmallFollowProfile";

export default function SignupPopUp(props){
    const [err,setError] = useState('');
    const [step,changeStep] = useState(1);
    const [btnState,changeBtnState] = useState(false);
    const [state,dispach] = useReducer(reducer,{name:'',email:'',code:'',password:''});
    const {user,setUser} = useContext(AuthContext);
    
    
    const [img,setImage] = useState('');
    const imgRef = useRef(null);
    const [username,setusername] = useState((user.username));
    const [listOfSuggestedUser, setSeggestedUser] = useState([]);

    

    useEffect(()=>{
        if(state.email.trim()!= '' && state.name.trim()!= '' && err===''){
            changeBtnState(true);
        }else{
            changeBtnState(false);
        }
    },[state.email,state.name,err])

    useEffect(()=>{
        if(step === 8){
            console.log("Working");
            getListOfUser()
            .then((data)=>{
                setSeggestedUser([ ...data.result]);
            })
        }
    },[step]);

    let functionToCall;
    switch(step){
        case 1:
        case 2:{
            functionToCall = (()=>changeStep(step+1));
            break;
        }
        case 3:{
            functionToCall = (()=>{
                changeBtnState(false);
                generateAToken(state.email)
                .then((result)=>{
                    console.log(result);
                    if(result){
                        changeStep(step+1);
                    }else{
                        //TODO: remove alert;
                        alert("Some Error Occure");
                        changeStep(1);
                    }
                    changeBtnState(false);
                })
            })
            break;
        }
        case 4:{
            functionToCall = (()=>{
                changeBtnState(false);
                checkCode(state.code)
                .then((result)=>{
                    console.log(result);
                    if(result){
                        changeStep(step+1);
                    }else{
                        setError("Code is not valid");
                        changeBtnState(true);
                    }
                })
            })
            break;
        }
        case 5:{
            functionToCall = (()=>{
                changeBtnState(false);
                let obj = {name:state.name,email:state.email,password:state.password};
                createAccount(obj)
                .then((data)=>{
                    console.log(data);
                    setUser(data);
                    setusername(data.username);
                    changeStep(step+1);
                    changeBtnState(true);
                })
                .catch((err)=>{
                    //TODO: remove alert from here
                    alert("Some error occure");
                })
            })
            break;
        }
        case 6:{
            functionToCall = ()=>{
                console.log("Test");
                if(!img){
                    changeStep(step+1);
                }
                let data = new FormData();
                changeBtnState(false);
                console.log(img);
                data.append('profile',img);
                changeProfile(data,user.token)
                .then((data)=>{
                    changeStep(step+1);
                    console.log(data);
                    let newUser = user;
                    newUser.profilepicture = data.url;
                    setUser(newUser);
                    
                    changeBtnState(true);
                })
                .catch((err)=>{
                    console.log(err);
                    changeBtnState(true)
                })
            }
            break;
        }
        case 7:{
            functionToCall = ()=>{
                changeBtnState(false);
                updateUsername(username,user.token)
                .then((res)=>{
                    if(res){
                        let newUser = user;
                        newUser.username = username;
                        setUser(newUser);
                        changeStep(step+1);
                    }else{
                        //TODO: remove alert
                        alert("Some error occure");
                    }
                })
            }
            break;
        }
        case 8:{
            if(!btnState){
                changeBtnState(true);
            }
            functionToCall = ()=>{
                handleClose();
            }
            break;
        }
    }
    
    function reducer(state,action){
        switch(action.type){
            case 'change name':{
                return {
                    name: action.name,
                    email: state.email,
                    code: '',
                    password: ''
                }
            }
            case'change email':{
                const obj =  {
                    name: state.name,
                    email: action.email,
                    code: '',
                    password: ''
                }
                if(validEmail(action.email)){
                    checkIfUserExists(action.email)
                    .then((value)=>{
                        if(value){
                            setError('User Alread Exists');
                        }else{
                            setError('');
                        }
                    })

                }else{
                    setError('Email is Invalid');
                }
                return obj;
            }
            case 'change code':{
                const obj =  {
                    name: state.name,
                    email: state.email,
                    code: action.code
                }
                setError('');
                if(obj.code.trim()!=='' && obj.code.length === 6){
                    changeBtnState(true);
                }else{
                    changeBtnState(false);
                }

                return obj;
            }
            case 'change password':{
                const obj =  {
                    name: state.name,
                    email: state.email,
                    code : state.code,
                    password: action.password
                }  
                console.log(obj.password);
                console.log(validPassword(obj.password));
                if(validPassword(obj.password)){
                    setError("");
                    changeBtnState(true);
                }else{
                    setError("Password is not valid");
                    changeBtnState(false);
                }

                return obj;
            }
            case 'remove all':{
                return {
                    name : '',
                    email: '',
                    code: '',
                    password:''
                }
            }
        }
    }
    
    function checkUserName(username){
        console.log(user.username);
        if(username === user.username){
            setusername(username);
            setError("");
            changeBtnState(true);
            return;
        }else{
            changeBtnState(false);
            setusername(username);
            if(validUserName(username)){
                setError("Loading...");
                checkIfUsernameAvailable(username)
                .then((result)=>{
                    if(result){
                        setError("");
                        changeBtnState(true);
                        console.log(btnState);
                    }else{
                        setError("Username already taken");
                    }
                })
            }else{
                setError("UserName is not valid");
            }
        }
    }

    function handleClose(){
        setError('');
        dispach({type:'remove all'});
        changeStep(1);
        setImage('');
        props.handleClose();
    }


    //nextbutton functions

    

    return (
        <PopUp
            isOpen={props.isOpen}
            handleClose={handleClose}
            footer={
                    <>
                        <Button disabled={!btnState} onClick={functionToCall} className={Styles.nextButton}>Next</Button>
                    </>
                }
            header={
                    (step < 6)?
                        <div className={Styles.headerContent}>
                            {`Step ${step} of 5 `}
                        </div>
                        :<div className={Styles.iconHolder}>
                            <TwitterIcon className={Styles.icon}/>
                        </div>
                    
                }
        >
            {step === 1 &&             
                <div className={Styles.firstStep}>
                    <h1>Create Accout</h1>
                    <Input label={'Name'} value={state.name} onChange={(value)=>{dispach({type:'change name',name:value})}}></Input>
                    <Input err={err} label={'Enter Email'} value={state.email} onChange={(value)=>{dispach({type:'change email',email:value})}}></Input>
                    <div></div>
                    <div className={Styles.condition}>
                        <h4>Date of birth</h4>
                        <p >This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                        {/* <div>
                            <input type="month"/>
                        </div> */}
                    </div>
                </div>
            }
            {step === 2 &&
                <div className={Styles.secondStep}>
                    <h1>Customize your experience</h1>
                    <div className={Styles.container}>
                        <h2>Track where you see Twitter content across the web</h2>
                        <p>Twitter uses this data to personalize your experience. This web browsing history will never be stored with your name, email, or phone number.</p>
                    </div>
                    <p>By signing up, you agree to our Terms, Privacy Policy, and Cookie Use. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy. Learn more.</p>
                </div>
                
            }
            {step === 3 &&
                <>
                    <div className={Styles.thirdStep}>
                        <h1>Create Accout</h1>
                        <Input onClick={()=>changeStep(1)} label={'Name'} value={state.name} onChange={(value)=>{dispach({type:'change name',name:value})}}></Input>
                        <Input onClick={()=>changeStep(1)} err={err} label={'Email'} value={state.email} onChange={(value)=>{dispach({type:'change email',email:value})}}></Input>
                    </div>
                    <p className={Styles.conditions}>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalizing our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.</p>
                </>
            }

            {step === 4  &&
                <>
                    <div className={Styles.fourthStep}>
                        <div>
                            <h1>We sent you a code</h1>
                            <p className={Styles.grayPara}>Enter it below to verify {state.email}</p>
                        </div>
                        <Input type='number' err={err} label={'Varification Code'} value={state.code} onChange={(value)=>{dispach({type:'change code',code:value})}} ></Input>
                    </div>
                </>
            }

            {step === 5 &&
                <>
                    <div className={Styles.fifthStep}>
                        <div>
                            <h1>You'll need a password</h1>
                            <p className={Styles.grayPara}>Make sure it's 8 character or more</p>
                        </div>
                        <Input err={err} label={'Password'} onChange={(value)=>dispach({type:'change password',password:value})} value={state.password} />
                    </div>
                </>
            }
            {step === 6 &&
                <>
                    <div className={Styles.sixthStep}>
                        <div>
                            <h1>Pick a profile picture</h1>
                            <p className={Styles.grayPara}>Have a favorite selfie? Upload it now.</p>
                        </div>
                        <div className={Styles.pictureHolder}>
                            <input style={{display:'none'}} type="file" ref={imgRef} onChange={(ev)=>{setImage(ev.target.files[0])}}/>
                            <div className={Styles.profile} onClick={()=>(imgRef.current.click())} style={{background:`url(${(img)?URL.createObjectURL(img):defaultPicture})`}}/>
                        </div>
                    </div>
                </>
            }
            {step === 7 &&
                <>
                    <div className={Styles.seventStep}>
                        <div>
                            <h1>What should we call you?</h1>
                            <p className={Styles.grayPara}>Your @username is unique.You can always change it later.</p>
                        </div>
                        <div>
                            <Input err={err} label={'UserName'} onChange={(value)=>{checkUserName(value)}}  value={username} />
                        </div>
                    </div>
                </>

            }
            {step === 8 &&
                <>
                    <div className={Styles.eightStep}>
                        <div>
                            <h1>Don't miss out</h1>
                            <p className={Styles.grayPara}>When you follow someone, you'll see their tweet in your Timeline. You'll also get more relevent recommendation.</p>
                        </div>
                        <div className={Styles.followList}>
                            <h2>Follow</h2>
                            <div className={Styles.followList}>
                                {
                                    listOfSuggestedUser.map((element)=>{
                                        return <SmallProfile {...element}/>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </>
            
            }
        </PopUp>
    )
}


