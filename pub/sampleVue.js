var vm = new Vue({
    el: "#app", //Element in the HTML we are hooking up with
    data: {
        message: "Hello World."
    }, //instance variables
    methods: {
        print: function() {
            console.log(this.message);
        }
    }, 
    computed: {
        isEmpty: function() {
            if (this.message === "")
                return true;
            else
                return false;
        }
    } //computed properties (methods that compute stuff based on "data")
});