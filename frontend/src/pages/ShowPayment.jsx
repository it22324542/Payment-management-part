import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowPayment = () => {
  const [payment, setPayment] = useState({});

  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/payments/${id}`)
      .then((response) => {
        setPayment(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [])

  return (
    <div className='p-4 backgroundImageContainerPayInfo'>
      {/* <BackButton /> */}
      <div className='p-4'>
        <h2>Payment <span className="badge text-bg-primary">Info</span></h2>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='container-lg col-md-5 border border-5 rounded-5 blue-border'>
          <div className='my-5'>

            <div style={{width:'38vw'}}>
                <img src={`http://localhost:5555/paymentSlips/${payment.paymentSlip}`} className = "img-fluid rounded d-block mx-auto" alt="" />
            </div>


            <div className='col-lg-8'>
              <div className='my-4'>
                <span className='text-purple'>ID </span>
                <span className='text-black'>{payment._id}</span>
              </div>
              <div className='my-4'>
                <span className='text-purple'>Customer Name </span>
                <span className='text-black'>{payment.customerName}</span>
              </div>
              <div className='my-4'>
                <span className='text-purple'>NIC </span>
                <span className='text-black'>{payment.nic}</span>
              </div>
              <div className='my-4'>
                <span className='text-purple'>Bank Name </span>
                <span className='text-black'>{payment.bankName}</span>
              </div>
              <div className='my-4'>
                <span className='text-purple'>Branch </span>
                <span className='text-black'>{payment.branch}</span>
              </div>
              <div className='my-4'>
                <span className='text-purple'>Date </span>
                <span className='text-black'>{payment.date}</span>
              </div>
              <div className='my-4'>
                <span className='text-purple'>Price </span>
                <span className='text-black'>{payment.priceInNumber}</span>
              </div>
              <div className='my-4'>
                <span className='text-purple'>Price In Word </span>
                <span className='text-black'>{payment.priceInWord}</span>
              </div>
              <div className='my-4'>
                <span className='text-purple'>Created Time </span>
                <span className='text-black'>{new Date(payment.createdAt).toString()}</span>
              </div>
              <div className='my-4'>
                <span className='text-purple'>Last Update Time </span>
                <span className='text-black'>{new Date(payment.updatedAt).toString()}</span>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default ShowPayment