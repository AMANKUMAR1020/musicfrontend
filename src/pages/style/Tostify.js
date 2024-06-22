// import { useEffect, useState } from "react";

// const Toast = ({ msg }) => {
//   const [show, setShow] = useState('flex');

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setShow('none');
//     }, 2000);

//     return () => {
//       clearTimeout(timeout);
//     };
//   }, []);

//   if(!msg){
//     return ;
//   }

//   return (
//     <div style={{ display: show, justifyContent: 'center' }}>
//       <p>{msg}</p>
//       <button onClick={() => setShow('none')}>X</button>
//     </div>
//   );
// };

// export default Toast;
