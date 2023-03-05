import productModel from "../models/productModel.js";
import fs from 'fs';
import slugify from "slugify";

/*-------- Create Product Controller --------- */
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, stocks, shipping } = req.fields
        const { image } = req.files

        //validations
        switch (true) {
            case !name:
                return res.status(500).send({ message: 'name is required' });

            case !description:
                return res.status(500).send({ message: 'description is required' });

            case !price:
                return res.status(500).send({ message: 'price is required' });

            case !category:
                return res.status(500).send({ message: 'category is required' });

            case !stocks:
                return res.status(500).send({ message: 'stocks is required' });

            case image && image.size > 1000000:
                return res.status(500).send({ messsage: 'image is requried and should be less than 1mb' })
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) })
        if (image) {
            product.image.data = fs.readFileSync(image.path);
            product.image.contentType = image.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: "Product creation successful",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error creating product",
        });
    }
}

/*-------- Update Product Controller --------- */
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, stocks, shipping } = req.fields
        const { image } = req.files

        //validations
        switch (true) {
            case !name:
                return res.status(500).send({ message: 'name is required' });

            case !description:
                return res.status(500).send({ message: 'description is required' });

            case !price:
                return res.status(500).send({ message: 'price is required' });

            case !category:
                return res.status(500).send({ message: 'category is required' });

            case !stocks:
                return res.status(500).send({ message: 'stocks is required' });

            case image && image.size > 1000000:
                return res.status(500).send({ messsage: 'image is requried and should be less than 1mb' })
        }
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (image) {
            product.image.data = fs.readFileSync(image.path);
            product.image.contentType = image.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error updating product",
        });
    }
}


/*-------- All Products Controller --------- */
export const productsController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate('category')
            .select("-image")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalProducts: products.length,
            message: "All Products Fetched Successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error getting all products",
        });
    }
}

/*-------- Filtered (Price and category) Product Controller --------- */

export const filteredProductsController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        const range = radio.split(",");
        if (range.length) args.price = { $gte: range[0], $lte: range[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error getting filtered products",
        });
    }
}

/*-------- Total Products Count Controller --------- */
export const productsCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in product count",
            error,
            success: false,
        });
    }
};

/*-------- Products based on page --------- */
export const productsListController = async (req, res) => {
    try {
        const perPage = 4;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-image")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};

/*-------- Single Product Controller --------- */
export const singleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-image")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error getting product",
        });
    }
}


/*-------- Get Image controller --------- */
export const productImageController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id).select("image");
        if (product.image.data) {
            res.set("Content-type", product.image.contentType);
            return res.status(200).send(product.image.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr getting product image",
            error,
        });
    }
};

/*-------- Delete Product Controller --------- */
export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        await productModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "product deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error deleting prodcut",
        });
    }
}