import React from 'react'
export interface InfoCardInterface{
  title:string,
   num:number
}
function InfoCardsComponent({data}:{data:InfoCardInterface[]}) {
  return (
    <div className='mb-10 grid grid-cols-2 gap-4 md:grid-cols-6 '>
{data && data.map((item, index)=>
  {return <div className='bg-white pl-6 pr-16  rounded-[10px]   py-4'  key={index}>
   <p className='md:text-sm text-[14px] text-[#7F7F7F]'>{item.title}</p>
   <p className='text-primary md:text-[35px] text-[20px] font-[500]'>{item.num}</p>
  </div>}
)}

       
   </div>
  )
}

export default InfoCardsComponent
