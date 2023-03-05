
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";


/*-------- Create Category Controller --------- */
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: "Category Name is required" })
        }
        const exisitingCategory = await categoryModel.findOne({ name })
        if (exisitingCategory) {
            return res.status(200).send({
                success: false,
                message: "Category already exists"
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) })
        category.save()
        res.status(201).send({
            success: true,
            message: "Category created successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error Createing Category"
        })
    }
}

/*-------- Update Category Controller --------- */
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        if (!name) {
            return res.status(401).send({ message: "Category Name is required" })
        }
        const exisitingCategory = await categoryModel.findOne({ name })
        if (exisitingCategory) {
            return res.status(200).send({
                success: false,
                message: "Cannot Update Category since category with same name already exists"
            })
        }
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            messsage: "Category Updated Successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category",
        });
    }
}

/*-------- Get all Categories Controller --------- */
export const categoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All category lists",
            categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error Getting Categories",
        });
    }
}

/*-------- Get single Category Controller --------- */
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "Single Category Fetch Successful",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error Getting Single Category",
        });
    }
}


/*-------- Delete single Category Controller --------- */
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "category deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error Deleting Category",
        });
    }
}