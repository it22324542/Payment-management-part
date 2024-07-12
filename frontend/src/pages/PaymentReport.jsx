import React,{useRef} from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import BackButton from '../components/BackButton';

const PaymentReport = () => {

  const contentRef = useRef(null);

  const[loading,setLoading] = useState();
  const[payments,setPayment] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);

useEffect( () => {
  setLoading(true)
  axios
    .get(`http://localhost:5555/payments`)
    .then((res) => {
      setPayment(res.data.data);
      console.log(payments);
      setLoading(false);

      const fetchProfit = async () => {
        const profit = await handleProfit();
        setTotalProfit(profit);
      }
      
      fetchProfit();
      }
    )
    .catch((error) => {
        console.log(error);
        setLoading(false);
    })

},[]);


  useEffect(() => {
    const calculateProfit = async () => {
        let total = 0;
        payments.forEach(payment => {
            total += payment.priceInNumber;
        });
        setTotalProfit(total);
    };

    calculateProfit();
}, [payments]);


  const generateReport = () => {
    const content = contentRef.current;

    html2canvas(content)
    .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p','mm','a4',true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
      pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth *ratio,imgHeight * ratio);
      pdf.save("document.pdf")
   })
  }

  return (
    <div className='p-4 backgroundImageContainerPayReport'>

      <div ref={contentRef}>

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
      <div className='p-4'>
      <div className='flex justify-between items-center'>
      <h1 className='text-3xl my-8 row justify-content-center ' style={{ color: '#6610f2', fontWeight: 'bold' }}>Janatha Papad Store</h1>  
      <h3 className='text-3xl my-8 row justify-content-center text-primary '>Payment Report</h3>
      </div>
    </div>
<table class="table table-light">
  <thead>
    <tr>
      <th className='text-center'>No</th>
      <th className='text-center'>Customer Name</th>
      <th className='text-center'>Customer NIC</th>
      <th className='text-center'>Bank Name</th>
      <th className='text-center'>Branch</th>
      <th className='text-center'>Date</th>
      <th className='text-center'>Price</th>
      <th className='text-center'>Price in letters</th>
      
    </tr>
  </thead>
  <tbody>
    {payments.map((payment,index) => (
        <tr key={payment._id}>
        <td className='text-center'>{index+1}</td>
        <td className='text-center'>{payment.customerName}</td>
        <td className='text-center'>{payment.nic}</td>
        <td className='text-center'>{payment.bankName}</td>
        <td className='text-center'>{payment.branch}</td>
        <td className='text-center'>{payment.date}</td>
        <td className='text-center'>{payment.priceInNumber}</td>
        <td className='text-center'>{payment.priceInWord}</td>
      </tr>
    ))}
    
  </tbody>
</table>  

    <div className='d-flex justify-content-end fs-5'>Total Net Profit = Rs.{totalProfit}</div>
           
      </div>

      <div className='d-flex justify-content-end'>
      <button type="button" class="btn btn-success" onClick={generateReport}><i class="bi bi-file-earmark-arrow-down"></i> Download</button>
      </div>

    </div>
  )
}

export default PaymentReport