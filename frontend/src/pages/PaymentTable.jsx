import axios from 'axios'
import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { MdOutlineSearch } from 'react-icons/md';

const PaymentTable = () => {
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/payments`)
      .then((res) => {
        setPayments(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPayments = payments.filter((payment) =>
    payment.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tableClass = 'table table-secondary';

  return (
    <div className="p-4 backgroundImageContainerPayTable">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
          
          <h1 className="text-3xl my-8 row justify-content-center" style={{ color: '#6610f2', fontWeight: 'bold' }}>Janatha Papad Store</h1>
          <h3 className='text-3xl my-8 row justify-content-center text-primary '>Payments List</h3>

          <div className="d-flex justify-content-end">
            <div className="input-group w-25">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <span className="input-group-text"><MdOutlineSearch /></span>
            </div>
          </div>
        </div>
      </div>
      <table class="table table-info">
        <thead>
          <tr>
            <th className='text-center'>No</th>
            <th className='text-center'>Customer NIC</th>
            <th className='text-center'>Bank Name</th>
            <th className='text-center'>Branch</th>
            <th className='text-center'>Date</th>
            <th className='text-center'>Price</th>
            <th className='text-center'> Action </th>
          </tr>
        </thead>
        <tbody>

          {filteredPayments.map((payment, index) => (
            <tr key={payment._id}>
              <td className='text-center'>{index + 1}</td>
              <td className='text-center'>{payment.nic}</td>
              <td className='text-center'>{payment.bankName}</td>
              <td className='text-center'>{payment.branch}</td>
              <td className='text-center'>{payment.date}</td>
              <td className='text-center'>{payment.priceInNumber}</td>
              <td>
                <div className='d-flex flex-row gap-3 justify-content-center'>
                  <Link to={`/payments/details/${payment._id}`}>
                    <button type="button" className="btn btn-purple"><i className="bi bi-info-circle"></i> Info</button>
                  </Link>
                  <Link to={`/payments/edit/${payment._id}`}>
                    <button type="button" className="btn btn-green"><i class="bi bi-pencil-square"></i> Edit</button>
                  </Link>
                  <Link to={`/payments/delete/${payment._id}`}>
                    <button type="button" className="btn btn-red"><i class="bi bi-trash3"></i> Delete</button>
                  </Link>

                </div>
              </td>
            </tr>
          ))}

        </tbody>
      </table>

      <div className='d-flex justify-content-end'>

        <Link to={`/payments/paymentReport`}>
          <button type="button" className="btn btn-orange"><i class="bi bi-file-earmark-text-fill"></i> Payment Report</button>
        </Link>

      </div>

    </div>

  )
}

export default PaymentTable
