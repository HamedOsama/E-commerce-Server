const Product = require("../models/Product");
// const {
//   verifyToken,
//   verifyTokenAndAuthorization,
//   verifyTokenAndAdmin,
// } = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  console.log(req.body)
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        ok: false,
      });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      ok: false,
      err
    });
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 });
    } else if (qCategory) {
      products = await Product.find({ category: qCategory });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/top', async (req, res) => {
  try {
    const products = await Product.find().limit(10);
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({
      ok: false,
      e
    });
  }

})
module.exports = router;


//localhost:1921/api/v1/products