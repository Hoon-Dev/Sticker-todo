(function(window){
    function StickyTodo(){
        this.model = new window.app.Model();
        this.view = new window.app.View();
        this.controller = new window.app.Controller(this.model, this.view);
    }

    var stickyTodo = new StickyTodo();
})(window);