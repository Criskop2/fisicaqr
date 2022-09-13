const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
name: { type: String },
category: {type: String},
description: {type: String},
cod: {type: Number},
img: {type: String},
});

module.exports = mongoose.model('inventarios', LevelSchema);
