import React from 'react'

function InfoCard({title,num}:{title:string, num:number}) {
  return (
    <div className='bg-white rounded-10px w-[193px] gap-4 h-[96px]'>
        <p className='text-sm text-[#7F7F7F]'>{title}</p>
        <p className='text-primary text-[35px] font-[500]'>{num}</p>
      
    </div>
  )
}

export default InfoCard
