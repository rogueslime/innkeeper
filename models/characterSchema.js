const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
    title: String,
    body: String
});

const AScoreSchema = new mongoose.Schema({
    title: String,
    score: Number
});

const SpellSchema = new mongoose.Schema({
    title: String,
    level: Number,
    body: String
});

const BackpackSchema = new mongoose.Schema({
    title: String,
    weight: Number,
    worth: String,
    body: String
});


const CharacterSchema = new mongoose.Schema({
    name: String,
    race: String,
    class: String,
    level: Number,
    HP_max: Number,
    ascores: [AScoreSchema],
    features: [FeatureSchema],
    spells: [SpellSchema],
    backpack: [BackpackSchema],
    lorewriteup: String /* allows users to tell their characters story longform */
});

// Convert schema into a model
const Character = mongoose.model('Character', CharacterSchema);

// Export the model
module.exports = Character;