const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sub = new Schema(
    {
        type : {type: String},
        impact: {type: String},
        description : {type : String},
        helpURL : {type : String}
    }
);

const TallySchema = new Schema({
    url : {type: String, required: true},
    summary:{
        errors: {type: String},
        warnings: {type: String},
        total_tags: {type: String}
    },
    serious_impact_result: [sub],
    moderate_impact_result: [sub],
    critical_impact_result: [sub],
    minor_impact_result: [sub],
    others_impact_result: [sub],
    
    score: {type: Number, required: true}
},
{
    timestamps: true
});

const Tally_report = mongoose.model('Tally_report', TallySchema);
module.exports = Tally_report;