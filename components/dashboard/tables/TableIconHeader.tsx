"use client";
import React from "react";
import IconWithTitle from "@/components/dashboard/IconWithTitle";

interface Props {
  headerIcon?: string;
  headerTitle?: string;
  headerBG?: string;
  headerTextColor?: string;
  secondHeaderIcon?: string;
  secondHeaderTitle?: string;
  secondHeaderBG?: string;
  secondHeaderTextColor?: string;
}

const TableIconHeader = ({
  headerIcon,
  headerTitle,
  headerBG,
  headerTextColor,
  secondHeaderIcon,
  secondHeaderTitle,
  secondHeaderBG,
  secondHeaderTextColor,
}: Props) => {
  if (
    !(headerIcon && headerTitle && headerBG && headerTextColor) &&
    !(
      secondHeaderIcon &&
      secondHeaderTitle &&
      secondHeaderBG &&
      secondHeaderTextColor
    )
  )
    return null;

  return (
    <div className="flex">
      {headerIcon && headerTitle && headerBG && headerTextColor && (
        <IconWithTitle
          imageSrc={headerIcon}
          title={headerTitle}
          backgroundColor={headerBG}
          textColor={headerTextColor}
        />
      )}
      {secondHeaderIcon &&
        secondHeaderTitle &&
        secondHeaderBG &&
        secondHeaderTextColor && (
          <IconWithTitle
            imageSrc={secondHeaderIcon}
            title={secondHeaderTitle}
            backgroundColor={secondHeaderBG}
            textColor={secondHeaderTextColor}
          />
        )}
    </div>
  );
};

export default TableIconHeader;
