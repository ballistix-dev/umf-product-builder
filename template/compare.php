<div id="comparable"></div>
<div id="result">
  <div class="data" style="display: none;"></div>
  <div class="image" style="display: none;"></div>
  <div class="augmented-reality" style="display: none; width: 100%">

  <!-- BitreelModelViewer -->
  <script type="module" src="https://bitreel-script.s3.amazonaws.com/bitreelModelViewer-0.0.2.min.js"></script>
    <div id="UMF/UMFSlider" style="width: 100%; height: 550px;">

    <bitreel-model-viewer style="width: 100%; height: 100%;" storename="UMF" modelname="FUSION_Blue_Skies" gaid="G-GCELF6MSL9" showmodel="" showexpandbutton="" showqrcode="" model-viewer-camera-orbit="0deg 75deg 140%" class="hide">

      <!-- Put CAROUSEL INSIDE IN ORDER TO SHOW ON TOP OF THE MODEL-->
      <div class="model-viewer-slots">
        <!-- Bottom CAROUSEL -->
        <link rel="stylesheet" href="https://bitreel-script-beta.s3.amazonaws.com/bitreel-model-viewer-carousel.css">
        <div class="slider">
          <div class="slides">
          <!-- Replace with your own carousel button and preview picture -->
          </div>

        </div>
      </div>

      <style>
      #qr-link {
        color: #FFFFFF;
        border-radius: 8px;
        background: #1595fe;
        padding: .975rem;
        opacity: 0.9;
      }
      </style>
      <!-- don't forget to include "slot="qr-button-slot"" -->
      <button slot="qr-button-slot" id="qr-link" class="qrButton">View in Augmented Reality</button>
    </bitreel-model-viewer>

    <script type="module">
      const modelViewer = document.querySelector("bitreel-model-viewer");

      window.switchSrc = (element, name) => {
      //change top thumbnails when switching carousel models
      const defaultMaterial = modelViewer.shadowRoot.getElementById("material" + name);
      switchMaterialSrc(defaultMaterial, name);
      modelViewer.shadowRoot.querySelector(".slider").addEventListener('beforexrselect', (ev) => {
      // Keep slider interactions from affecting the XR scene.
      ev.preventDefault();
      });
      //change carousel model selected
      const slides = modelViewer.shadowRoot.querySelectorAll(".slide");
      slides.forEach((element) => {
      element.classList.remove("selected");
      });
      element.classList.add("selected");

      }
      window.switchMaterialSrc = (element, name) => {
      //notify bitree-model-viewer to load new model
      modelViewer.setAttribute("modelname", name)

      //change top thumbnails material
      const thumbnail = modelViewer.shadowRoot.querySelectorAll(".thumbnail");
      thumbnail.forEach((element) => {
      element.classList.remove("selected");
      element.classList.remove("show");
      if (element.id.split("_")[0] === "material" + name.split("_")[0]) {
      element.classList.add("show")
      }

      if (element.id === "material" + name) {
      element.classList.add("selected");
      }
      });

      modelViewer.shadowRoot.querySelector(".thumbnail").addEventListener('beforexrselect', (ev) => {
      // Keep slider interactions from affecting the XR scene.
      ev.preventDefault();
      });
      };
    </script>
    <link rel="stylesheet" href="https://bitreel-script-beta.s3.amazonaws.com/bitreel-model-viewer.css">
    <div id="ar-modal" class="ar-modal">
      <div class="ar-modal-content">
        <span id="ar-modal-close" class="ar-modal-close">×</span>
        <h3 id="ar-modal-title">AR Core not Installed</h3>
        <p class="ar-modal-p">Augmented reality experience currently requires ARCore 1.9 support</p>
        <img id="ar-modal-img" class="ar-modal-img" src="https://bitreel-script-beta.s3.amazonaws.com/ARCore.png" alt="" title="ARCore" width="300" height="300">
        <p class="ar-modal-p">Please install AR core to view this model in AR. You can downlaod it from the play store here:</p>
        <a class="ar-modal-button" href="https://play.google.com/store/apps/details?id=com.google.ar.core"><img src="https://bitreel-script-beta.s3.amazonaws.com/GooglePlayButton.png" width="400" height="100"></a>
      </div>
    </div>
    <div id="qr-modal" class="qr-modal">
      <div class="qr-modal-content">
        <span id="qr-modal-close" class="qr-modal-close">×</span>
        <h3 id="qr-modal-title">Scan QR Code</h3>
        <p class="qr-modal-p">Open your mobile device's camera and point it at the QR code below to see this product come to life in augmented reality!</p>
        <img id="qr-modal-barcode" class="qr-modal-barcode" src="#" alt="" title="HELLO" width="300" height="200">
        <p class="qr-modal-p">Augmented reality experience is currently supported on the following device:<br>iPhone on iOS 12+<br>Android 8.0+ with ARCore 1.9 support</p>
      </div>
    </div>
  </div>
</div>
</div>
