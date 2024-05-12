import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notify = ({}) => {
  const notify = () => toast("Wow so easy!");
  
  return (
    <div>
      <ToastContainer />
      <div style={{ background: '', height: '' }}>
      </div>
    </div>
  );
};

export default Notify;
