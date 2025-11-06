import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

export default function ReactOtpInput({}) {
  const [otp, setOtp] = useState('');

  const containerStyle = {
    display: 'flex',
    color:"#191A1E",
    justifyContent: 'center',
    alignItems: 'center',
    gap:"8px"
  };

  const inputStyle = {
    fontSize: '16px',
    height:"40px",
    borderRadius: '4px',
    flex: 1,
    border: '1px solid #E1E2E5',
  };



  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
    //   renderSeparator={<span>-</span>}
    //   focusStyle={focusStyle}
      renderInput={(props) => <input {...props} />}
      numInputs={6}
      inputStyle={inputStyle}
      containerStyle={containerStyle}
      shouldAutoFocus
    />
  );
}