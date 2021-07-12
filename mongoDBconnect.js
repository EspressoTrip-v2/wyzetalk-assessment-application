const mongoose = require('mongoose');

// Update  Date
const updateDateSchema = new mongoose.Schema(
  {
    _id: String,
    date: Date,
  },
  { _id: false, versionKey: false }
);
const updateDateModel = mongoose.model('UpdateDate', updateDateSchema);

// Results Object
const resultsSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
});
const resultsModel = mongoose.model('Results', resultsSchema);

// Search Results
const searchValuesSchema = new mongoose.Schema(
  {
    _id: String,
    search: {
      type: mongoose.Schema.ObjectId,
      ref: 'Results',
    },
  },
  { _id: false, versionKey: false }
);
const searchValuesModel = mongoose.model('Search_Values', searchValuesSchema);

// Mongoose Methods
exports.queryAllSearchKeys = async function () {
  try {
    let response = await searchValuesModel.find().distinct('_id').exec();
    return response;
  } catch (err) {
    console.error(err);
  }
};

exports.queryKeyExists = async function (searchValue) {
  try {
    let response = await searchValuesModel.findById(searchValue).exec();
    return response;
  } catch (err) {
    console.error(err);
  }
};

exports.createNewSearchTerm = async function (searchTerm, resultsData) {
  try {
    let response = await resultsModel.create({ data: resultsData });
    if (response !== null) searchValuesModel.create({ _id: searchTerm, search: response._id });
  } catch (err) {
    console.error(err);
  }
};

exports.querySearchTerm = async function (searchTerm) {
  try {
    let resultA = await searchValuesModel.findById(searchTerm).lean().exec();
    if (resultA !== null) {
      let resultB = await resultsModel.findById(resultA.search).lean().exec();
      if (resultB !== null) return resultB;
    } else {
      return { data: 'error' };
    }
  } catch (err) {
    console.error(err);
  }
};

exports.deleteSearch = async function (searchTerm) {
  try {
    let response = await searchValuesModel.findByIdAndRemove(searchTerm).exec();
    if (response !== null) {
      resultsModel.findByIdAndDelete(response.search).exec();
    }
  } catch (err) {
    console.error(err);
  }
};

exports.updateSearch = async function (searchTerm, responseData) {
  try {
    let resultA = await searchValuesModel.findById(searchTerm).lean().exec();
    if (resultA !== null) {
      resultsModel.findByIdAndUpdate(resultA.search, responseData).lean().exec();
    }
  } catch (err) {
    console.error(err);
  }
};

exports.updateDate = async function () {
  let date = new Date(),
    asDate = new Date(date.getFullYear(), date.getMonth(), date.getDay());
  try {
    let res = await updateDateModel.findByIdAndUpdate('date', {
      date: asDate,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getDate = async function () {
  try {
    let response = await updateDateModel.findById('date').lean().exec();
    return response;
  } catch (err) {
    console.error(err);
  }
};
