const Category = require("../model/category");
const SubCategory = require("../model/subCategory");

class LopkupController {
  async createCategory(req, res) {
    try {
      const data = await Category.create(req.body);
      return res.status(200).json({
        message: "Category created successfully",
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getCategory(req, res) {
    try {
      const data = await Category.find();
      return res.status(200).json({
        message: "Category fetched successfully",
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createsubCategory(req, res) {
    try {
      const { subCategoryNam, categoryId } = req.body;
      const data = new SubCategory({
        subCategoryNam,
        categoryId,
      });
      await data.save();
      return res.status(200).json({
        message: "subCategory created successfully",
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getsubCategory(req, res) {
    //lookup
    const data = await SubCategory.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $project: {
          subCategoryNam: 1,
          category:{    
                categoryName:1,
            },
        },
      },
      //group category
      {
        $group: {
          _id: "$category.categoryName",
          subCategories: {
            $push: {
              subCategoryNam: "$subCategoryNam",
            },
          },
        },
      },
    ]);
    return res.status(200).json({
      message: "subCategory fetched successfully",
      data: data,
    });
  }
}

module.exports = new LopkupController();
