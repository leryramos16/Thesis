const router = require("express").Router();
const bcrypt = require("bcryptjs");
const verify = require("../utils/verifyToken");
const inventoryModel = require("../models/inventory");
const { inventoryValidation } = require("../utils/validation");

//Insert new stock to the database
router.post("/", async (request, response) => {
    //Validate before creating
    const { error } = inventoryValidation(request.body);
    if (error) return response.status(400).send(error.details[0].message);

    //Check if name exist
    const nameExist = await inventoryModel.findOne({
        name: request.body.name,
    });
    if (nameExist)
        return response.status(400).json({ message: "Stock already added!" });

    //Create new user
    const newStock = new inventoryModel({
        name: request.body.name,
        quantity: request.body.quantity,
        category: request.body.category,
        notifier: request.body.notifier,
    });
    try {
        const stock = await newStock.save();
        response.status(200).json({ stock: stock.name });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (request, response) => {
    try {
        const stock = await inventoryModel.findById(request.params.id);
        const updates = request.body;
        const options = { new: true };
        const updatedStock = await inventoryModel.findByIdAndUpdate(
            stock,
            updates,
            options
        );
        response.status(200).json({ stock: updatedStock.name });
    } catch (error) {
        response.status(500).json({ error: "Error" });
    }
});

//List of Stocks
router.post("/list", async (request, response) => {
    try {
        var page = request.body.page !== "" ? request.body.page : 0;
        var perPage = 20;
        if (Object.keys(request.body.selectedStock).length > 0) {
            var id = [];
            var data = request.body.selectedStock;
            for (const i in data) {
                // console.log(`_id: ${request.body[i].value}`);
                id.push({ _id: request.body.selectedStock[i].value });
            }

            var stocks = [];

            if (Object.keys(request.body.selectedCategory).length > 0) {
                var category = request.body.selectedCategory[0].value
                stocks = await inventoryModel.find({
                    '$or': id,
                    category: category,
                    IsDeleted: false
                }).sort('name');
            } else {
                stocks = await inventoryModel.find({
                    '$or': id,
                    IsDeleted: false
                }).sort('name');
            }

            var data = [];
            for (const i in stocks) {
                var stk = {
                    "_id": stocks[i]._id,
                    "name": stocks[i].name,
                    "quantity": stocks[i].quantity,
                    "category": stocks[i].category,
                    "notifier": stocks[i].notifier,
                }
                data.push(stk);
            }
            response.status(200).json(data);
        } else {
            var id = [];

            if (Object.keys(request.body.selectedCategory).length > 0) {
                var category = request.body.selectedCategory[0].value
                stocks = await inventoryModel.find({
                    category: category,
                    IsDeleted: false
                }).sort('name');
            } else {
                stocks = await inventoryModel.find({
                    IsDeleted: false
                }).skip((page) * perPage).limit(perPage).sort('name');
            }
            

            var data = [];
            for (const i in stocks) {
                var stk = {
                    "_id": stocks[i]._id,
                    "name": stocks[i].name,
                    "quantity": stocks[i].quantity,
                    "category": stocks[i].category,
                    "notifier": stocks[i].notifier,
                }
                data.push(stk);
            }

            response.status(200).json(data);
        };

    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// list total stocks
router.post("/total-stocks", async (request, response) => {
    try {
        var data = [];

        data = await inventoryModel.find({ IsDeleted: false });

        response.status(200).json(data.length);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//For search options get method
router.get("/options", async (request, response) => {
    try {
        const stocks = await inventoryModel.find({ IsDeleted: false }).sort('name');
        response.status(200).json(stocks);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//For search options
router.post("/stock-options", async (request, response) => {
    try {
        var id = [];
        var stocks = [];

        stocks = await inventoryModel.find({
            IsDeleted: false
        }).sort('name');

        response.status(200).json(stocks);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//Delete user from the database based on id
router.delete("/:id", async (request, response) => {
    try {
        const stock = await inventoryModel.findById(request.params.id);
        const updates = { IsDeleted: true };
        const options = { new: true };
        const deletedStock = await inventoryModel.findByIdAndUpdate(
            stock,
            updates,
            options
        );
        response.status(200).json(deletedStock);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

module.exports = router;
