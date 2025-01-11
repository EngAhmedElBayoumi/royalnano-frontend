import Image from 'next/image'
import React from 'react'

function EmptyMessage() {
  return (
    <div className="bg-[#F8F7F7] px-4 pt-4 pb-1 rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] card gap-[80px]">
<Image alt='img' src='/assets/icons/noCustomers.svg'/>
<p className='text-[30px] text-[#7F7F7F] font-[500]'>You dont have any clients.</p>
      
    </div>
  )
}

export default EmptyMessage
