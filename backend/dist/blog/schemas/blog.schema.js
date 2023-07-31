"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogSchema = void 0;
const mongoose = require("mongoose");
exports.BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    body: String,
    author: String,
    date_posted: String
});
//# sourceMappingURL=blog.schema.js.map