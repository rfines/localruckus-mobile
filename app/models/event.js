exports.definition = {
	config: {

		adapter: {
			type: "sql",
			collection_name: "event"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			fetch: function(options) {
				alert('forget you');
				this.models = []
			}
		});

		return Collection;
	}
};