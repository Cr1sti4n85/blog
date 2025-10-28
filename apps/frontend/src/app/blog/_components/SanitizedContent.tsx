"use client";
import DOMPurify from "dompurify";

//DOMPurify only works on client side. This component will
//be imported on the server side

type Props = {
  content: string;
  className?: string;
};

const SanitizedContent = (props: Props) => {
  const cleanHTML = DOMPurify.sanitize(props.content);
  return (
    <div
      className={props.className}
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
};

export default SanitizedContent;
