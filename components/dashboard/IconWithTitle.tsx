import React from 'react'

interface IconWithTitleProps {
  imageSrc: string; 
  title: string;   
  backgroundColor: string; 
  textColor: string;      
}

function IconWithTitle({ imageSrc, title, backgroundColor, textColor  }: IconWithTitleProps) {
  return (
    <div
    style={{ backgroundColor: backgroundColor , borderTopLeftRadius:10, borderTopRightRadius:10}}
    className={`flex items-center py-[18px] px-[34px] gap-[6px]`}>
      <img src={imageSrc} alt={title} className="w-6 h-6" /> 
      <p className={`md:text-sm xl:text-md  ">
          {title} text-${textColor}`}>{title}</p>
    </div>
  )
}

export default IconWithTitle;
