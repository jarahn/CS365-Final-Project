var imageArr = [
    "IMG_0335.JPG",
    "IMG_0340.JPG",
    "IMG_0347.JPG"
];

var vm = new Vue({
    el: "#app", //Element in the HTML we are hooking up with
    data: {
        imgIndx: 0,
        img: ""
    }, //instance variables
    methods: {
        getRandImg: function() {
            this.imgIndx = Math.round(Math.random() * 4);
            this.img = imgArr[this.imgIndx];
       }
    }, 

    computed: {
    }
});