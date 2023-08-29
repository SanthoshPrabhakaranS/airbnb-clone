import React from "react";

interface HeadingProps {
  title: string;
  desc: string;
}

const Heading: React.FC<HeadingProps> = ({ desc, title }) => {
  return <div>
    <h1 className="text-lg font-bold">{title}</h1>
    <p className="font-medium text-neutral-500">{desc}</p>
  </div>;
};

export default Heading;
