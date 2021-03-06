const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));

mongoose.connect(process.env.DB_URL || 'mongodb://localhost/queries');

const querySchema = new mongoose.Schema({
	query: String,
	when: { type: Date, default: Date.now }
});

const Query = mongoose.model('Query', querySchema);

module.exports.addQuery = query => {
	let instance = new Query({ query });

	instance.save();
};

module.exports.recentSearches = () => Query.find({}).sort('-when').limit(10);
