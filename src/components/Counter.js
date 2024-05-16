import { useTranslation } from '@/app/i18n/client';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const CountdownTimer = ({count,setCount,setIsDisabled,isDisabled,lng}) => {
 const {t}=useTranslation(lng)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount=== 0) {
            toast.error(t('errors.timeIsUp'))
            setIsDisabled(true)  
            clearInterval(interval);
                 
           return 0;
          } else {
            return prevCount - 1; 
    }});
    }, 1000);
   
    return () => clearInterval(interval);
  }, [count]); 

  return <div>{count}</div>;
};

export default CountdownTimer;