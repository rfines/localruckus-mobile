exports.definition = {
    config: {
        adapter: {
            type: "sql",
            collection_name: "event"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            fetch: function() {
                alert("forget you");
                this.models = [];
            }
        });
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("event", exports.definition, []);

collection = Alloy.C("event", exports.definition, model);

exports.Model = model;

exports.Collection = collection;