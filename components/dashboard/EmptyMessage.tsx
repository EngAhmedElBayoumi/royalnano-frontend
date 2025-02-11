import Image from 'next/image'
import React from 'react'

function EmptyMessage({emptyMessage}:{emptyMessage:string}) {
  return (
    <div className="bg-dashboardBg pt-20 px-4 pt-4 pb-1 rounded-tr-[20px] rounded-bl-[20px] flex-col rounded-br-[20px] flex justify-center items-center w-full    card gap-15">
<Image height={100} width={400} alt='img' src='/assets/icons/noCustomers.svg'/>
<p className='text-[30px] text-[#7F7F7F] font-[500]'>{emptyMessage}</p>
      
    </div>
  )
}

export default EmptyMessage
