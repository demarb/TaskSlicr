import React from 'react'
import { Alert} from '@rewind-ui/core';

export default function CustomAlert({message, type}) {
  
    if (type==="error"){
        return(
            <Alert color="red" iconType="error" shadowColor="red" title="Error:" tone="solid">
                {message}
            </Alert>
        )
    }else if (type==="success"){
        return (
            <Alert color="green" iconType="success" shadowColor="green" title="Success:" tone="solid">
                {message}    
            </Alert>
        )
        
    }

}
