import React, { useEffect, useState } from "react";

const openedD =
  "M3.81 45.43H0v-9.61l4.88-8.53c2.74-3.05 5.94-5.64 8.84-8.54l.61-.46 11.28-4.57.91-.15h10.37l.91.15 10.52 4.57c3 2.59 5.8 5.34 8.69 7.93 1.83 2.9 3.36 6.4 5 9.45l.31 1.07v8.84h-3.78v-8.69l-4-7.77-7.74-7.32-10.21-4.42H27L15.85 22l-7.92 7.42-4.12 7.78zm48.19 41l-13.74-6.09-.61-.46-10.52-9.76-.45-.61-6.1-11.43v-12.5h3.81v11.28l5.49 10.67 9.91 9.15 13.41 5.94H66l14.32-5.79 10.38-9.91 5.49-10.36V45.73H100v11l-.31 1.06L93.9 68.9l-.46.61-11 10.37-.61.46-14.6 6.09z";
const closedD =
  "M3.81,94.43H0v-9.6l4.88-8.54c2.74-3.05,5.94-5.64,8.84-8.54l.61-.45,11.28-4.58.91-.15H36.89l.91.15L48.32,67.3c3,2.59,5.8,5.33,8.69,7.92,1.83,2.9,3.36,6.4,5,9.45l.31,1.07v8.84H58.54V85.89l-4-7.77L46.8,70.8,36.59,66.38H27L15.85,71,7.93,78.42,3.81,86.2Zm48.17-8L38.26,80.34l-.61-.46L27.13,70.12l-.45-.61-6.1-11.43V45.58h3.81V56.86l5.49,10.67,9.91,9.15L53.2,82.62H66l14.32-5.79L90.7,66.92l5.49-10.36V45.73H100v11l-.31,1.06L93.9,68.9l-.46.61-11,10.37-.61.46L67.23,86.43Z";

export default function SiteMapIcons(props) {
  const [title, setTitle] = useState("closed");
  const [iconToPaint, setIconToPaint] = useState(closedD);

  useEffect(() => {
    setTitle(!props.closed ? "opened" : "closed");
    !props.closed ? setIconToPaint(closedD) : setIconToPaint(openedD);
  }, [props.closed]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" id={`${title}-icon`} viewBox="0 0 100 100">
      <path id={title} d={iconToPaint} />
    </svg>
  );
}
