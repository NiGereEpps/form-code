var firebaseConfig = {
    apiKey: "AIzaSyB-kEXwQ8Qtr-NCZ7sqaAtc29iXqdzAvzs",
    authDomain: "algo-comp-upload.firebaseapp.com",
    databaseURL: "https://algo-comp-upload.firebaseio.com",
    projectId: "algo-comp-upload",
    storageBucket: "algo-comp-upload.appspot.com",
    messagingSenderId: "648632527428",
    appId: "1:648632527428:web:17964740aed1552e346a11"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function saveImage() {
    var b64 = canvas.toDataURL()
    var d = new Date();
    var str = d.toUTCString();
    sessionStorage.setItem('str', str);

    var storage = firebase.storage().ref(str);
    storage.putString(b64, 'data_url').then(function(snapshot) {
        console.log('Uploaded to server!');
        window.location.href = "gallery.html"
    });
}

if (document.URL.includes("gallery.html")) { //Gallery functions
    var storageRef = firebase.storage().ref();

    let i = 0

    storageRef.listAll().then(function(result) {
        result.items.forEach(function(imageRef) {
            displayImage(imageRef);
        });
    }).catch(function(error) {
        // Handle any errors
    });

    function displayImage(imageRef) {
        imageRef.getDownloadURL().then(function(url) {
            var img = document.createElement("img");
            img.src = url;

            img.onclick = function(evt) {
                document.querySelector('#myModal > img').src = url
                document.querySelector('#myModal').style.display = 'flex'
            }

            let idx = i % 2
            var src = document.getElementById("photos");
            src.appendChild(img);
            i++;
        }).catch(function(error) {
            // Handle any errors
        });
    }
}

document.querySelector('.close').onclick = function(evt) {
    document.querySelector('#myModal').style.display = 'none'
}

function view() {
    mySTR = sessionStorage.getItem('str');

    if (!mySTR)
        alert("You have not submitted a piece. Try creating a new piece first!") //Just went straight to gallery
    else {
        firebase.storage().ref(mySTR).getDownloadURL().then(function(url) {
            document.querySelector('#myModal > img').src = url
        });

        document.querySelector('#myModal').style.display = 'flex'
    }
}

function newArt() {
    window.location.href = "index.html"
}

function options() {
    alertify.confirm("Congratulations on the composition! Click below to upload your image and check out the gallery of user submitted images! You can click the X to view your piece (and the New/Gallery button to come back to this prompt), or make a new piece!",
        function() { //Upload
            saveImage()
        },
        function() { //New image
            window.location.reload()
        }
    ).set('labels', { ok: 'Upload Image and View Gallery', cancel: 'Make New Piece' }).set({ 'invokeOnCloseOff': true })
}