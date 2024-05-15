

import { useTranslation } from '@/app/i18n/client';
import React from 'react'
import { HiOutlineRefresh } from "react-icons/hi";

const Buttons = ({getRandomRecord,shuffleWord,handleDelete,handleCheck,isDisabled,  lng }) => {

  const { t } = useTranslation(lng)
  return (
    <div className='flex flex-col justify-center items-center gap-5'>
       <div className='flex w-full justify-center gap-5'>
        <div className='border rounded-full w-32 h-12 flex items-center justify-center text-lg font-semibold bg-yellow-300 hover:bg-white hover:border-yellow-400 cursor-pointer uppercase' onClick={handleDelete}>{t('delete')}</div>
        <div className='w-12 h-12 border rounded-full flex items-center justify-center border-yellow-400 cursor-pointer' onClick={shuffleWord}><HiOutlineRefresh size={30} /></div>
        
        <button className='border rounded-full w-32 h-12 flex items-center justify-center text-lg font-semibold bg-yellow-300 hover:bg-white hover:border-yellow-400 cursor-pointer uppercase disabled:bg-gray-200 disabled:border-gray-300' onClick={handleCheck} disabled={isDisabled}>{t('enter')}</button>
    </div>

<div className='border rounded-full w-52 h-12 flex items-center justify-center text-lg font-semibold bg-yellow-300 hover:bg-white hover:border-yellow-400 cursor-pointer uppercase' onClick={getRandomRecord}>{t('newGame')}</div>
    </div>
   
  )
}

export default Buttons