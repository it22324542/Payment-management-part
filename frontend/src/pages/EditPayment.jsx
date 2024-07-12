import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditPayment = () => {
  const [customerName, setcustomerName] = useState('');
  const [nic, setnic] = useState('');
  const [bankName, setBankName] = useState('');
  const [branch, setBranch] = useState('');
  const [date, setDate] = useState('');
  const [priceInNumber, setPriceInNumber] = useState('');
  const [priceInWord, setPriceInWord] = useState('');
  const [paymentSlip, setPaymentSlip] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/payments/${id}`)
      .then((response) => {
        setcustomerName(response.data.customerName);
        setnic(response.data.nic);
        setBankName(response.data.bankName);
        setBranch(response.data.branch);
        setDate(response.data.date);
        setPriceInNumber(response.data.priceInNumber);
        setPriceInWord(response.data.priceInWord);
        setPaymentSlip(response.data.paymentSlip);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  }, [])


  const handleEditPayment = async () => {


    const formData = new FormData();
    formData.append('customerName', customerName);
    formData.append('nic', nic);
    formData.append('bankName', bankName);
    formData.append('branch', branch);
    formData.append('date', date);
    formData.append('priceInNumber', priceInNumber);
    formData.append('priceInWord', priceInWord);
    formData.append('paymentSlip', paymentSlip);

    console.log(paymentSlip);

    await axios.put(`http://localhost:5555/payments/edit/${id}`, formData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Payment Edited Successfully', { variant: 'success' });
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
    <div className='p-4 backgroundImageContainerPayEdit'>
      <div className='p-4'>
        <h2>Payment <span className="badge text-bg-success">Edit</span></h2>
      </div>
      {loading ? <Spinner /> : ''}

      <div className="my-5">
        <div className="container-lg col-md-6 border border-5 rounded-5">
          <div className='row justify-content-center my-5'>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
            <div className="text-center text-white">
              <h3>Janatha Papad Store</h3>
            </div>
            <div className="row justify-content-center my-5">

              <div className="col-lg-10">

                <div className="row">
                  <div className="col-md-6">
                    <label for="formGroupExampleInput" className="form-label">Customer Name:</label>
                    <div className="mb-4 input-group">
                      <span className="input-group-text">
                        <i class="bi bi-person-circle"></i>
                      </span>
                      <input type="text"
                        value={customerName}
                        onChange={(e) => setcustomerName(e.target.value)}
                        className="form-control" id="formGroupExampleInput" />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label for="formGroupExampleInput" className="form-label">NIC:</label>
                    <div className="mb-4 input-group">
                      <span className="input-group-text">
                        <i class="bi bi-person-vcard-fill"></i>
                      </span>
                      <input type="text"
                        value={nic}
                        onChange={(e) => setnic(e.target.value)}
                        className="form-control" id="formGroupExampleInput" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label for="formGroupExampleInput" className="form-label">Bank Name:</label>
                    <div className="mb-4 input-group">
                      <span className="input-group-text">
                        <i class="bi bi-bank2"></i>
                      </span>
                      <input type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="form-control" id="formGroupExampleInput" />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label for="formGroupExampleInput" className="form-label">Bank Branch:</label>
                    <div className="mb-4 input-group">
                      <span className="input-group-text">
                        <i class="bi bi-bank"></i>
                      </span>
                      <input type="text"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="form-control" id="formGroupExampleInput" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label for="formGroupExampleInput" className="form-label">Price:</label>
                    <div className="mb-4 input-group">
                      <span className="input-group-text">
                        <i class="bi bi-cash-coin"></i>
                      </span>
                      <input type="number"
                        value={priceInNumber}
                        onChange={(e) => setPriceInNumber(e.target.value)}
                        className="form-control" id="formGroupExampleInput" />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label for="formGroupExampleInput" className="form-label">Date:</label>
                    <input type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="form-control" id="formGroupExampleInput" />
                  </div>
                </div>

                <label for="exampleFormControlTextarea1" className="form-label">Price In Letters:</label>
                <textarea type="text"
                  value={priceInWord}
                  onChange={(e) => {

                    const inputValue = e.target.value;
                    // Regular expression to match only letters
                    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
                    // Check if the input contains only letters
                    if (onlyLettersRegex.test(inputValue)) {
                      // Update state only if input contains only letters
                      setPriceInWord(e.target.value);
                    } else {
                      alert("Please enter only letters!!");
                    }
                  }}
                  className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

                <div style={{ margin: '10px 0px', display: 'flex', justifyContent: 'center' }}>
                  <img style={{ width: '15vw', borderRadius: '10px' }} src={`http://localhost:5555/paymentSlips/${paymentSlip}`} alt="" />
                </div>

                <div className="mb-3">
                  <label for="formGroupExampleInput" className="form-label">Payment Slip:</label>
                  <input type="file"
                    onChange={(e) => setPaymentSlip(e.target.files[0])}
                    className="form-control" id="formGroupExampleInput" />
                </div>
              </div>

              <div className="my-4 mb-4 text-center">
                <button type="button" className="btn btn-green2 btn-lg" style={{ width: "200px" }} onClick={handleEditPayment}>Save</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default EditPayment