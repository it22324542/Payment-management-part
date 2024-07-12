import React, { useState } from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeletePayment = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeletePayment = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/payments/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Payment Deleted Successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happened. Please check console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  return (
    <div className='p-4 backgroundImageContainerPayDelete'>
      {/* <BackButton /> */}
      <div className='p-4'>
        <h2 className='text-white'>Payment <span className="badge text-bg-danger">Delete</span></h2>
      </div>
      {loading ? <Spinner /> : ''}

      <div className="my-5">
        <div className='container-lg col-md-6 border border-5 rounded-5 red-border'>

          <div className='row justify-content-center my-4'>

            <div className="mb-3 text-center">
              <h3 className="text-danger highlight-text">Are you sure you want to delete this payment?</h3>
            </div>

            <div className="mb-4 text-center">
              <button type="button" className="btn btn-danger" onClick={handleDeletePayment}>Yes, Delete it</button>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default DeletePayment