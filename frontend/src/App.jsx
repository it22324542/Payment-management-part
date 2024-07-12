
import {Routes, Route} from 'react-router-dom';
import PaymentTable from './pages/PaymentTable';
import CreatePayments from './pages/CreatePayments';
import ShowPayment from './pages/ShowPayment';
import EditPayment from './pages/EditPayment';
import DeletePayment from './pages/DeletePayment'; 
import PendingOrder from './pages/orderPayment/PendingOrder';
import CustomerPay from './pages/CustomerPay';
import PaymentReport from './pages/PaymentReport';

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<PaymentTable/>}/>
        <Route path='/payments/create' element={<CreatePayments/>}/>
        <Route path='/payments/details/:id' element={<ShowPayment/>}/>
        <Route path='/payments/edit/:id' element={<EditPayment/>}/>
        <Route path='/payments/delete/:id' element={<DeletePayment/>}/>
        <Route path='/payments/pending' element={<PendingOrder/>}/>
        <Route path='/payments/customerpay' element={<CustomerPay/>}/>
        <Route path='/payments/PaymentReport' element={<PaymentReport/>}/>
      </Routes> 
  );
};

export default App

