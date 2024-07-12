import express, { request, response } from 'express';
import { Payment } from '../models/paymentModal.js';


import upload from '../multerConfig.js'

const router = express.Router();

//testing : take the pending orders
// router.get('/orderPending',async(request,response) => {
//     try {
        
//         const orders = await Order.find().populate({path:'products.product'});

//         response.status(200).json({data:orders});
        

//     } catch (error) {
//         console.log(error);
//     }
// })

//customer new payment
router.post('/addPay',upload.single('paymentSlip'),async(request,response) => {
    try {
        
        const newPayment = {
            customerName: request.body.customerName,
            nic: request.body.nic,
            bankName: request.body.bankName,
            branch: request.body.branch,
            date: request.body.date,
            priceInNumber: request.body.priceInNumber,
            priceInWord: request.body.priceInWord,
            paymentSlip: request.file.filename
        };
        
        const payment = await Payment.create(newPayment);

        return response.status(201).send(payment);


    } catch (error) {
        console.log(error)
        return response.status(500).send({message:error.message});
    }
})

// Route for Save a new payment
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.customerName ||
            !request.body.nic ||
            !request.body.bankName ||
            !request.body.branch ||
            !request.body.date ||
            !request.body.priceInNumber ||
            !request.body.priceInWord
        ) {
            return response.status(400).send({
                message: 'Send all required fields: customerName, nic, bankName, branch, date, priceInNumber, priceInWord',
            });
        }
        const newPayment = {
            customerName: request.body.customerName,
            nic: request.body.nic,
            bankName: request.body.bankName,
            branch: request.body.branch,
            date: request.body.date,
            priceInNumber: request.body.priceInNumber,
            priceInWord: request.body.priceInWord,
        };

        const payment = await Payment.create(newPayment);

        return response.status(201).send(payment);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for get all payments from database
router.get('/', async (request, response) => {
    try {
        const payments = await Payment.find({});

        return response.status(200).json({
            count: payments.length,
            data: payments
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for get one payment from database by id
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const payment = await Payment.findById(id);

        return response.status(200).json(payment);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a payment
router.put('/edit/:id', upload.single('paymentSlip'), async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedPayment = {
        customerName: req.body.customerName,
        nic: req.body.nic,
        bankName : req.body.bankName,
        branch : req.body.branch,
        date : req.body.date,
        priceInNumber : req.body.priceInNumber,
        priceInWord : req.body.priceInWord,
      };
  
      if (req.file) { 
        updatedPayment.paymentSlip = req.file.filename;
        
      }
      
      const result = await Payment.findByIdAndUpdate(id, updatedPayment);
  
      if (!result) {
    
        return res.status(404).json({ message: 'Payment not found' });
      }
  
      // If the payment was successfully updated
      return res.status(200).json({ message: 'Payment updated successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.massge });
    }
  });

//Route for Delete a payment
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Payment.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Payment not found' });
        }

        return response.status(200).send({ message: 'Payment deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;