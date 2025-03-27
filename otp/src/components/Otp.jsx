import {useState, useRef, useEffect} from 'react';

function Otp(){
    const ref = useRef([]);
    const otpLength = 6;
    const [otpValue, setOtpValue] = useState(new Array(otpLength).fill(''));
    useEffect(()=>{
        ref.current[0].focus()
    }
    ,[])
    const handleInputChange = (e, index)=>{
        const otp = e.target.value;
        const newOtp = otp.slice(-1)
        if(isNaN(otp))return
        const arr = [...otpValue];
        arr[index] = newOtp;
        setOtpValue(arr);
        newOtp&&ref.current[index+1].focus()
    }
    const handleChangeOnKeyDown = (e, index)=>{
        if(!e.target.value&&e.key==='Backspace'){
            if(index>0){
                ref.current[index-1].focus()
            }
        }
    }
    return(
        <div>
            <h1>OTP Generation</h1>
            {
                otpValue.map((opt, index)=>{
                    return(
                        <input key={index} ref={(element)=>(ref.current[index]=element)} onKeyDown={e=>handleChangeOnKeyDown(e, index)} type="text" value={opt} className='otp' onChange={e=>handleInputChange(e, index)}/>
                    )
                })
            }
        </div>
    )
}

export default Otp;