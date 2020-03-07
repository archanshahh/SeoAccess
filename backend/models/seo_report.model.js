const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeoSchema = new Schema({
    url: {type: String, required: [true, 'Url is required']},
    summary : {
        errors : {type: Number , required: true},
        total_rules : {type : Number, required: true}
    },
    seo_results: [String],
    performance_results: {
        FCP : {type: Number ,required: true},
        FCI : {type: Number ,required: true},
        FMP : {type: Number ,required: true},
        SI : {type: Number ,required: true},
        TTI : {type: Number ,required: true}
    },
    score : {type: Number ,required: true}
},
{
    timestamps: true
});

const Seo_report = mongoose.model('Seo_report', SeoSchema);
module.exports = Seo_report;
