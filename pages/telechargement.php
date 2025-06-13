<?php

require_once(__DIR__ . '/../site-load.php');

import_header();

?>

<!-- ***** Preloader Start ***** -->
<div id="preloader">
  <div class="jumper">
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
<!-- ***** Preloader End ***** -->

<br><br><br><br>
<div class="patch-selection-container">
  <h1>Choisissez votre patch</h1>
  <p>Veuillez sélectionner la version du patch que vous souhaitez installer :</p>

  <div class="patch-options">
    <a href="<?php echo build_url('pages/telechargement_patch_supernova.php'); ?>" class="patch-card supernova">
      <img src="/assets/img/supernova-logo.png" alt="Supernova" class="patch-logo">
    </a>

    <a href="<?php echo build_url('pages/telechargement_patch_bigbang.php'); ?>" class="patch-card bigbang">
      <img src="/assets/img/bigbang-logo.png" alt="Big Bang" class="patch-logo">
    </a>
  </div>

</div>

<?php

import_footer();
