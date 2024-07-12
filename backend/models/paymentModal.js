import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({

    customerName: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    priceInNumber: {
        type: Number,
        required: true,
    },
    priceInWord: {
        type: String,
        required: true,
    },
    paymentSlip: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

export const Payment = mongoose.model('Payment', paymentSchema);
