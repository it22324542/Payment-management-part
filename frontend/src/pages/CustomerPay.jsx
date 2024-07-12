import React, { useState } from 'react'
import axios from 'axios';
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'


const CustomerPay = () => {

  const [customerName, setcustomerName] = useState('');
  const [nic, setnic] = useState('');
  const [bankName, setBankName] = useState('');
  const [branch, setBranch] = useState('');
  const [date, setDate] = useState(new Date());
  const [priceInNumber, setPriceInNumber] = useState(0);
  const [priceInWord, setPriceInWord] = useState('');
  const [paymentSlip, setPaymentSlip] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleAddPayment = () => {

    const formData = new FormData();
    formData.append('customerName', customerName);
    formData.append('nic', nic);
    formData.append('bankName', bankName);
    formData.append('branch', branch);
    formData.append('date', date);
    formData.append('priceInNumber', priceInNumber);
    formData.append('priceInWord', priceInWord);
    formData.append('paymentSlip', paymentSlip);

    axios
      .post('http://localhost:5555/payments/addPay', formData)
      .then(() => {

        enqueueSnackbar('Your payment is pending', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {

        console.log(error);
        enqueueSnackbar('Error', { variant: 'error' });
      });

  };

  //for the payment slip
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPaymentSlip(file);
  }

  //for nic validation
  const handlenicChange = (e) => {
    const nic = e.target.value;
    setnic(nic);
  };

  const handlenicBlur = () => {
    if (nic.length < 8 || nic.length > 12) {
      alert('Please enter a valid NIC number!!');
    } else {
      setErrorMessage('');
    }
  };

  return (

    <form className='row g-3 backgroundImageContainer'>

      <div className="my-5">
        <div className="container-lg col-md-6 border border-5 rounded-5">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
          <div className="text-center text-white">
            <h2>Pay Here!</h2>
            <p className="lead">Janatha Papad Store</p>
          </div>

          <div className="row justify-content-center my-5">

            <div className="col-lg-10">

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="inputText" className="form-label text-white">Customer Name:</label>
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="bi bi-person-circle"></i>
                    </span>
                    <input type="text" className="form-control" id="customerName" placeholder="Yasas Rajika" onChange={(e) => {
                      setcustomerName(e.target.value)
                    }}></input>
                  </div>
                </div>

               {/* <div className="col-md-6">
  <label htmlFor="inputFullName" className="form-label">Full Name (First Last):</label>
  <div className="input-group mb-3">
    <span className="input-group-text"><i className="bi bi-person-circle"></i></span>
    <input type="text" className="form-control" id="customerName" placeholder="John Doe" onChange={(e) => {
      
      const customerName = e.target.value.split(' ');
      const firstName = customerName[0];
      const lastName = customerName.slice(1).join(' ');
      console.log(firstName, lastName);
      // Use firstName and lastName as needed, for example, console.log(firstName, lastName);
    }}></input>
  </div>
</div> */}



                <div className="col-md-6">
                  <label htmlFor="inputPassword" className="form-label text-white">NIC No:</label>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-person-vcard-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="nic"
                      value={nic}
                      onChange={handlenicChange}
                      onBlur={handlenicBlur} // Trigger validation when input loses focus
                      maxLength={12} // Set maximum length to 12 characters
                    />
                  </div>
                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label for="bankName" className="form-label text-white">Bank Name:</label>
                  <div className="mb-4 input-group">
                    <span className="input-group-text">
                      <i class="bi bi-bank2"></i>
                    </span>
                    <input type="text" className="form-control" id="bankName" placeholder="BOC" onChange={(e) => {
                      const inputValue = e.target.value;
                      // Regular expression to match only letters
                      const onlyLettersRegex = /^[a-zA-Z\s]*$/;
                      // Check if the input contains only letters
                      if (onlyLettersRegex.test(inputValue)) {
                        // Update state only if input contains only letters
                        setBankName(inputValue);
                      } else {
                        alert("Please enter only letters!!");
                      }
                    }}></input>
                  </div>
                </div>

                <div className="col-md-6">
                  <label for="branch" className="form-label text-white">Bank Branch:</label>
                  <div className="mb-4 input-group">
                    <span className="input-group-text">
                      <i class="bi bi-bank"></i>
                    </span>
                    <input type="text" className="form-control" id="branch" placeholder="Homagama" onChange={(e) => {
                      const inputValue = e.target.value;
                      // Regular expression to match only letters
                      const onlyLettersRegex = /^[a-zA-Z\s]*$/;
                      // Check if the input contains only letters
                      if (onlyLettersRegex.test(inputValue)) {
                        // Update state only if input contains only letters
                        setBranch(inputValue);
                      } else {
                        alert("Please enter only letters!!");
                      }
                    }}></input>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label for="priceInNumber" className="form-label text-white">Price:</label>
                  <div className="mb-4 input-group">
                    <span className="input-group-text">
                      <i class="bi bi-cash-coin"></i>
                    </span>
                    <input type="number" className="form-control" id="priceInNumber" onChange={(e) => {
                      setPriceInNumber(e.target.value)
                    }}></input>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-4">
                    <label for="date" className="form-label text-white">Date:</label>
                    <input type="date" className="form-control" id="date" onChange={(e) => {
                      setDate(e.target.value)
                    }}></input>
                  </div>
                </div>
              </div>

              <label for="priceInWord" className="form-label text-white">Price in letters:</label>
              <textarea className="form-control" aria-label="With textarea" id="priceInWord" onChange={(e) => {
                const inputValue = e.target.value;
                // Regular expression to match only letters
                const onlyLettersRegex = /^[a-zA-Z\s]*$/;
                // Check if the input contains only letters
                if (onlyLettersRegex.test(inputValue)) {
                  // Update state only if input contains only letters
                  setPriceInWord(inputValue);
                } else {
                  alert("Please enter only letters!!");
                }
              }}></textarea>

              <label for="date" className="form-label text-white">Payment Slip:</label>
              <input type="file" className="form-control" id="date" onChange={handleImageChange}></input>
            </div>

            <div className="my-4 text-center">
              <button type="submit" className="btn btn-primary" onClick={handleAddPayment}>Confirm</button>
            </div>


          </div>


        </div>


      </div>
    </form>
  )
}

export default CustomerPay