 
var H ;
var W ;
var outcont = document.getElementById('output');
var input, output, inputctx, outputctx,
        slicewidth, img, canvax, canvaxctx;
output = document.createElement('canvas');
outputctx = output.getContext('2d');
input = document.createElement('canvas');
inputctx = input.getContext('2d');
canvax = document.createElement('canvas');
canvaxctx = canvax.getContext('2d');
var outputimg = new Image();
var corruptedimg = new Image();

function makesld() {
        var sldbx = document.getElementById('latsld');
        if (document.getElementById('latcheck').checked) {
                var slider = document.createElement('input');
                slider.setAttribute("type", "range");
                slider.setAttribute("id", "latseed");
                slider.setAttribute("min", "0");
                slider.setAttribute("max", H);
                slider.setAttribute("step", "1");
                slider.setAttribute("value", "0");
                sldbx.appendChild(slider);
        } else {
                sldbx.innerHTML = "";
        }
}

function makewavesld() {
        var wavesldbx = document.getElementById('wavesldbx');
        if (document.getElementById('wavecheck').checked) {
                var sliderwave1 = document.createElement('input');
    sliderwave1.setAttribute("id","wlen");            
    sliderwave1.setAttribute("type","range");
    sliderwave1.setAttribute("min","1");
    sliderwave1.setAttribute("max",W*2);
    sliderwave1.setAttribute("step","1");
    sliderwave1.setAttribute("value","1");
    var sliderwave2 = document.createElement('input');
    sliderwave2.setAttribute("id","periods");
    sliderwave2.setAttribute("type","range");
    sliderwave2.setAttribute("min","1");
    sliderwave2.setAttribute("max",W*2);
    sliderwave2.setAttribute("step","1");
    sliderwave2.setAttribute("value","1");
   
    var sliderwave4 = document.createElement('input');
    sliderwave4.setAttribute("id","ampli");
    sliderwave4.setAttribute("type","range");
    sliderwave4.setAttribute("min","1");
    sliderwave4.setAttribute("max",W);
    sliderwave4.setAttribute("step","1");
    sliderwave4.setAttribute("value","1");

                wavesldbx.appendChild(sliderwave1);
                wavesldbx.appendChild(sliderwave2);
             
                wavesldbx.appendChild(sliderwave4);
        } else {
                wavesldbx.innerHTML = "";
        }
}

function makebsld() {
        var bsd1bx = document.getElementById('basesld');
        if (document.getElementById('basecheck').checked) {
                var sliderb1 = document.createElement('input');
                sliderb1.setAttribute("type", "range");
                sliderb1.setAttribute("id", "bsseed");
                sliderb1.setAttribute("min", "0");
                sliderb1.setAttribute("max", "50");
                sliderb1.setAttribute("step", "1");
                sliderb1.setAttribute("value", "0");
                bsd1bx.appendChild(sliderb1);
                var sliderb2 = document.createElement('input');
                sliderb2.setAttribute("type", "range");
                sliderb2.setAttribute("id", "changes");
                sliderb2.setAttribute("min", "0.05");
                sliderb2.setAttribute("max", "1");
                sliderb2.setAttribute("step", "0.05");
                sliderb2.setAttribute("value", "0.55");
                bsd1bx.appendChild(sliderb2);
                var sliderb3 = document.createElement('input');
                sliderb3.setAttribute("type", "range");
                sliderb3.setAttribute("id", "initChange");
                sliderb3.setAttribute("min", "0.1");
                sliderb3.setAttribute("max", "0.8");
                sliderb3.setAttribute("step", "0.1");
                sliderb3.setAttribute("value", "0.2");
                bsd1bx.appendChild(sliderb3);
        } else {
                bsd1bx.innerHTML = "";
        }
}

function init() {

        var unix = +new Date();
        outcont.innerHTML = "RENDERING GLITCH..."
        //var qualityslider = document.getElementById('qualityslider');
        var qualitylooper = document.getElementById('qualityloop');
        var save = document.createElement('button');
        var link = document.createElement('a');
        //var addtoserver = document.createElement('button');  
        var quality = 1;
        var loopnumber = qualitylooper.value;
        var sourceX = 0;
        var sourceY = 0;
        var destX = 0;
        var destY = 0;
        var slicesArray = [];
        var slicesArray2 = [];
        var ctxArray = [];
        var wavecursor1 = document.getElementById('')
   




        var cursor = document.getElementById('slices');
        var numberofslice = cursor.value;
        canvax.height = H;
        canvax.width = W;
        img = null;
        img = new Image();
        img.onload = function() {
            H = img.height;
            W = img.width;
                output.width = input.width = W;
                output.height = input.height = H;
                inputctx.clearRect(0, 0, W, H);
                outputctx.clearRect(0, 0, W, H);
                inputctx.drawImage(img, 0, 0, W, H);
                outputctx.fillStyle = "#000";
                outputctx.fillRect(0, 0, W, H);
                outputctx.drawImage(input, 0, 0, W, H);
                Imgslice();
                drawslices();
                outcont.innerHTML = "";
                canvaxctx.drawImage(img, 0, 0, W, H);
                           if(document.getElementById('wavecheck').checked){
                var wavecursor1 = document.getElementById('wlen');
                var wavecursor2 = document.getElementById('periods');
                
                var wavecursor4 = document.getElementById('ampli');
                var wavelength = wavecursor1.value;
                var period = wavecursor2.value;
              
                var amp = wavecursor4.value;
                


    var   w = W, h = H;
    var shading = 2;
    var  od = outputctx.getImageData(0,0,w,h).data;

    
        var id = outputctx.getImageData(0,0,w,h);
        var  d = id.data;
        var now = (new Date)/period;
        for (var y=0;y < h;++y){
            var amplitude = Math.floor(Math.random()*amp);
            var lastO=0,shade=0;
            for (var x=0;x < w;++x){
                var px  = (y*w + x)*4;
                var o   = Math.sin(x/wavelength-now)*amplitude*x/w;
                var opx = ((y+o << 0)*w + x)*4;
                shade   = (o-lastO)*shading;
                d[px  ] = od[opx  ]+shade;
                d[px+1] = od[opx+1]+shade;
                d[px+2] = od[opx+2]+shade;
                d[px+3] = od[opx+3];
                lastO = o;
            }
        }
        outputctx.putImageData(id,0,0);   




      

                }
                canvaxctx.drawImage(output, 0, 0, W, H);
      
                latglitch();

                


                if (document.getElementById('basecheck').checked) {
                        var data = canvax.toDataURL("image/jpeg", 1);
                        corruptedimg.src = base64destroyer(data);
                        canvaxctx.drawImage(corruptedimg, 0, 0, W, H);
                }
               


                drawscan();
                var dataURL = canvax.toDataURL("image/jpeg", quality);
                var avant = dataURL;
                for (i = 0; i < loopnumber; i++) {
                        var qualshit = new Image();
                        qualshit.onload = function() {
                                console.log('qual +' + i);
                                canvaxctx.drawImage(qualshit, 0, 0, W, H);
                        }
                        qualshit.src = dataURL;
                        dataURL = canvax.toDataURL("image/jpeg", 0);
                        if (avant == dataURL) {
                                console.log("marche po");
                        }
                }
                save.innerHTML = "download";
                //addtoserver.innerHTML = "add to collection";  
              //  alert(dataURL);
              //  console.debug(dataURL);
              //  console.log(dataURL);
               if(dataURL=="data:,"){
                init();

                }
                outputimg.src = dataURL;
               // alert(outputimg.src);
               
                outputimg.setAttribute("class", "img img-responsive");
                link.setAttribute("download", unix+"_glitched.jpg");
                link.setAttribute("href", dataURL);
                save.setAttribute("class","btn");
                //addtoserver.setAttribute("class","btn");
                outcont.appendChild(outputimg);               
                outcont.appendChild(link);
                link.appendChild(save); 
                //outcont.appendChild(addtoserver);
           
           // addtoserver.onclick = function() { 
          //  upload_to_server(dataURL);
           // addtoserver.parentNode.removeChild(addtoserver);
       
       // };      
        }
        img.src = $('#link').html();

        function Imgslice() {
                var maxErrors = 100;
                var margin = 2200;
                slicewidth = parseInt((output.width / numberofslice));
                for (var i = 0; i < numberofslice; i++) {
                        slicesArray[i] = document.createElement('canvas');
                        ctxArray[i] = slicesArray[i].getContext('2d');
                        ctxArray[i].drawImage(input, 0, sourceX, 640, 640, 0, 0, slicewidth, 640);
                        slicesArray2[i] = inputctx.getImageData(sourceX, 0, output.width, output.height);
                        sourceX = sourceX + slicewidth;
                }
        }

        function drawscan() {
                if (document.getElementById('scancheck').checked) {
                        for (i = 0; i < H; i++) {
                                if (i % 2 == 0) {
                                        canvaxctx.fillStyle = '#000';
                                        canvaxctx.fillRect(0, 0 + i, W, 1);
                                }
                        }
                }
        }

        function drawslices() {
                destY = RandomNumber();
                outputctx.drawImage(img, 0, 0, W, H);
                shuffle(slicesArray);
                shuffle(slicesArray2);
                for (var i = 0; i < slicesArray.length; i++) {
                        outputctx.globalCompositeOperation = "lighter";
                        outputctx.drawImage(slicesArray[i], destX, destY);
                        destY = RandomNumber();
                        outputctx.putImageData(slicesArray2[i], destX, destY);
                        outputctx.globalCompositeOperation = "lighter";
                        outputctx.drawImage(slicesArray[i], destY, destX);
                        destX = destX + slicewidth;
                }
        }

        function shuffle(o) {
                for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[
                                j] = x);
                return o;
        }

        function RandomNumber() {
                var random = Math.floor(Math.random() * 199) - 98;
                return random;
        }

        function latglitch() {
                if (document.getElementById('latcheck').checked) {
                        var latslider = document.getElementById('latseed');
                        var latseed = latslider.value;
                        for (var i = 0; i < latseed; i++) {
                                var x = Math.random() * W;
                                var y = Math.random() * H;
                                var spliceWidth = W - x;
                                var spliceHeight = randInt(5, H / 3);
                                canvaxctx.drawImage(canvax, 0, y, spliceWidth, spliceHeight, x, y,
                                        spliceWidth, spliceHeight);
                                canvaxctx.drawImage(canvax, spliceWidth, y, x, spliceHeight, 0, y, x,
                                        spliceHeight);
                        }
                }
        }

        function randInt(a, b) {
                return Math.random() * (b - a) + a;
        }

        function base64destroyer(corrupted) {
                var bsslider = document.getElementById('bsseed');
                var maxErrors = bsslider.value;
                var margin = 2200;
                var errors = Math.round(Math.random() * maxErrors)
                for (var i = 0; i < errors; i++) {
                        var p = margin + Math.round(Math.random() * (corrupted.length - margin - 1));
                        corrupted = corrupted.substr(0, p) + corrupted.charAt(p + 1) + corrupted.charAt(p) +
                                corrupted.substr(p + 2);
                }
                return glitch64(corrupted);
        }

        function glitch64(base64) {
                var changes = document.getElementById("changes").value;
                var initChange = document.getElementById("initChange").value;
                var base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                if (!base64) return null;
                var data = base64.split(',');
                data[1] = data[1].split('');
                var len = data[1].length - 2;
                var tmp;
                var changeCount = ~~((len - (len * initChange)) * changes);
                var change_start = ~~(len * initChange);
                for (var i = change_start; i < len; i += changeCount) {
                        data[1][i] = base64Chars[~~(Math.random() * base64Chars.length)];
                }
                return [data[0], data[1].join('')].join(",");
        }









    function upload_to_server(data) {
            var messagebox = document.getElementById('msgbox');
            messagebox.innerHTML = "Uploading...";
            var http = new XMLHttpRequest();

            var params = "base64jpg=" + data;
            http.open("POST", "http://azopcorp.com/unstaglitch/saveimg", true);

            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.setRequestHeader("Content-length", params.length);
            http.setRequestHeader("Connection", "close");

            http.onreadystatechange = function() {
                    if(http.readyState == 4 && http.status == 200) {
                            // alert(http.responseText);
                            messagebox.innerHTML = "Image uploaded!";
                           
                    } else {
                            messagebox.innerHTML = "Oups error uploading image!";
                    }
            }
            http.send(params);
        } 


}

