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
    style={{ backgroundColor: backgroundColor }}
    className={`flex py-[18px] px-[34px] gap-1.5`}>
      <img src={imageSrc} alt={title} className="w-6 h-6" /> 
      <p className={`md:text-sm xl:text-md  ">
          {title} text-${textColor}`}>{title}</p>
    </div>
  )
}

export default IconWithTitle;
