import React, { useState } from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreatePayments = () => {
  const [bankName, setBankName] = useState('');
  const [branch, setBranch] = useState('');
  const [date, setDate] = useState('');
  const [priceInNumber, setPriceInNumber] = useState('');
  const [priceInWord, setPriceInWord] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const handleSavePayment = () => {
    const data = {
      bankName,
      branch,
      date,
      priceInNumber,
      priceInWord,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/payments', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Payment Created Successfully', { variant: 'success' });
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
    <div className='p-4'>
      <BackButton />
      <div className='p-4'>
        <h2>Payment <span className="badge text-bg-primary">Create</span></h2>
      </div>
      {loading ? <Spinner /> : ''}

      <div className='row justify-content-center my-5 '>

        <div className='col-lg-6 '>

          <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">Bank Name</label>
            <input type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="form-control" id="formGroupExampleInput" placeholder="Example: BOC" />
          </div>

          <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">Branch</label>
            <input type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="form-control" id="formGroupExampleInput" placeholder="Example: Homagama" />
          </div>

          <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">Date</label>
            <input type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-control" id="formGroupExampleInput" />
          </div>

          <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">Price</label>
            <input type="number"
              value={priceInNumber}
              onChange={(e) => setPriceInNumber(e.target.value)}
              className="form-control" id="formGroupExampleInput" />
          </div>

          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">Price In Letters</label>
            <textarea type="text" 
            value={priceInWord} 
            onChange={(e) => setPriceInWord(e.target.value)}
            className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

          <button type="button" className="btn btn-primary" onClick={handleSavePayment}>Save</button>

        </div>
      </div>

    </div>
  );
}

export default CreatePayments