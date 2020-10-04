(function(window){
    function View(){
        this.$text = document.querySelector("#input input[type=text]");
        this.$list = document.getElementById("list");
    }

    View.prototype.bind = function(event, callBack){
        callBack = (callBack || function(){});

        var self = this;
        switch(event.Type){
            case "Load":
                // {Type}
                // [callBack, callBack]

                document.getElementById("close-button")
                    .addEventListener("click", callBack[0]);

                document.querySelector("#input input[type=submit]")
                    .addEventListener("click", function(e){
                        e.preventDefault(); // submit 의 새로고침 이벤트를 억제
                        callBack[1]((self.$text.value || "없음"));
                        self.$text.value = "";
                    });
                break;
            case "Delete":
                // {Type, Button}
                // [callBack]

                event.Button.addEventListener("click", function(e){
                    callBack(event.Button.parentNode.id);
                });
                break;
            case "Editing":
                // {Type, Button}
                // [callBack]

                event.Button.addEventListener("dblclick", function(e){
                    self.render({Type:"Editing", Button: event.Button}, callBack);
                });
                break;
            case "Editing:Focusout":
                // {Type, Button}
                // [callBack]

                event.Button.addEventListener("focusout", function(e){
                    callBack(event.Button.parentNode.parentNode.id, event.Button.value);
                });
                break;
            case "Editing:Keydown":
                // {Type, Button}
                // [callBack]

                event.Button.addEventListener("keydown", function(e){
                    if(e.key === "Enter")
                        callBack(event.Button.parentNode.parentNode.id, event.Button.value);
                });
                break;
        }
    }

    View.prototype.render = function(event, callBack){
        callBack = (callBack || function(){});

        var self = this;
        switch(event.Type){
            case "Add":
                // {Type, Id, Data}
                // [callBack, callBack]

                var $li = document.createElement("li");
                $li.id = event.Id;
        
                var $spanText = document.createElement("span");
                $spanText.textContent = event.Data;
                this.bind({Type: "Editing", Button: $spanText}, callBack[1]);
        
                var $spanButton = document.createElement("span");
                $spanButton.textContent = "삭제";
                this.bind({Type: "Delete", Button: $spanButton}, callBack[0]);
        
                $li.appendChild($spanText);
                $li.appendChild($spanButton);
                self.$list.appendChild($li);
                self.$list.scrollTop = self.$list.scrollHeight;
                self.$text.select();
                break;
            case "Delete":
                // {Type, Id}
                // []

                this.$list.removeChild(document.getElementById(event.Id));
                break;
            case "Editing":
                // {Type, Button}
                // [callBack]

                var text = event.Button.textContent;
                event.Button.textContent = "";
        
                var $input = document.createElement("input");
                $input.setAttribute("type", "text");
                $input.setAttribute("spellcheck", "false");
                this.bind({Type:"Editing:Focusout", Button: $input}, callBack);
                this.bind({Type:"Editing:Keydown", Button: $input}, callBack);
        
                $input.value = text;
        
                event.Button.appendChild($input);
                $input.select();
                break;
            case "Edit":
                // {Type, Id, Data}
                // []

                var $li = document.getElementById(event.Id);
                $li.firstChild.textContent = event.Data;

                $li.removeChild(document.querySelector(`#${event.Id} input`));
                break;
        }
    }

    window.app = (window.app || {});
    window.app.View = View;
})(window);