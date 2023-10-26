const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^#[0-9A-Fa-f]{6}$/i.test(v);
            },
            message: props => `${props.value} is not a valid hexadecimal color code!`
        }
    }
});

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;