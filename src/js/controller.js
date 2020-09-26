(function(window){
    var electron = require("electron");
    var {ipcRenderer} = electron;

    function Controller(model, view){
        this.model = model;
        this.view = view;

        var self = this;
        view.bind({Type:"Load"}, [
            function(e){
                self.closeWindow();
            }, 
            function(data){
                self.addItem(data);
            }]);
        
        this.model.init(function(data){
            self.addItem(data);
        });
    }

    Controller.prototype.closeWindow = function(){
        ipcRenderer.send("window:close");
    }

    Controller.prototype.addItem = function(data){
        var id = Date.now();
        
        var self = this;
        this.model.addItem(id, data, function(){
            self.view.render({Type: "Add", Id: id, Data: data},[
                function(id){
                    self.deleteItem(id);
                },
                function(id, data){
                    self.changeItem(id, data);
                }]);
        });
    }

    Controller.prototype.deleteItem = function(id){
        var self = this;
        this.model.deleteItem(id, function(){
            self.view.render({Type: "Delete", Id: id});
        });
    }

    Controller.prototype.changeItem = function(id, data){
        var self = this;
        this.model.changeItem(id, data, function(){
            self.view.render({Type: "Edit", Id: id, Data: data});
        });
    }

    window.app = (window.app || {});
    window.app.Controller = Controller;
})(window);