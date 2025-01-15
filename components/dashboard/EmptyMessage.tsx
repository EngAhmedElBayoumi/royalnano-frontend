import Image from 'next/image'
import React from 'react'

function EmptyMessage() {
  return (
    <div className="bg-dashboardBg px-4 pt-4 pb-1 rounded-tr-[20px] rounded-bl-[20px] flex-col rounded-br-[20px] flex justify-center    card gap-[80px]">
<Image height={400} width={400} alt='img' src='/assets/icons/noCustomers.svg'/>
<p className='text-[30px] text-[#7F7F7F] font-[500]'>You dont have any clients.</p>
      
    </div>
  )
}

export default EmptyMessage
