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
        img: ""
    }, //instance variables
    methods: {
        getRandImg: function() {
            this.imgIndx = Math.floor(Math.random() * 6);
            this.img = imageArr[this.imgIndx];
       }
    }, 

    computed: {
    }
});