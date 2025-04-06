const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
    },
    notifier: {
        type: Number,
    },
    IsDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
});
module.exports = mongoose.model("inventory", inventorySchema);
