function setup() {
    canvas = createCanvas(350, 350);
    canvas.position(620, 200);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects: ";



}
img = "";
function preload() {
    img = loadImage("dog_cat.jpg");

}

function draw() {
    image(img, 0, 0, 350, 350);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected!";
            fill("red");
            strokeWeight(3);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);

        }
    }
}
function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results)
        objects = results;
    }

}

var objects = [];