var imageArr = [
    "img/IMG_0326.JPG",
    "img/IMG_0330.JPG",
    "img/IMG_0332.JPG",
    "img/IMG_0333.JPG",
    "img/IMG_0335.JPG",
    "img/IMG_0340.JPG"
];


var vm = new Vue({
    el: "#app", //Element in the HTML we are hooking up with
    data: {
        imgIndx: 0,
        img: "",
        tempC: 0,
        tempF: 0,
        tempStr: ""
    }, //instance variables
    methods: {
        getRandImg: function() {
            this.imgIndx = Math.floor(Math.random() * 6);
            this.img = imageArr[this.imgIndx];
       },

        convertF: function() {
            this.tempC = $("#cel").val();
            var temp = (this.tempC * 9/5) + 32;
            this.tempStr = temp;
        },

        convertC: function() {
            this.tempF = $("#fah").val();
            var temp = (this.tempF - 32) * 5/9;
            this.tempStr = temp;
        }
    }, 

    computed: {
    }
});