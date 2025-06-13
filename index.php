<?php

require_once 'site-load.php';

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

<!-- Page Content -->
 <br><br><br><br>
<!-- News -->
<?php
$maxNews = 3;
$newsLimited = array_slice($news, 0, $maxNews);
?>

<section class="blog-posts grid-system">
  <div class="container">
    <div class="all-blog-posts">
      <h2 class="text-center">Dernières nouveautés :</h2>
      <br><br><br><br>
      <div class="row">
        <?php foreach ($newsLimited as $new): ?>
          <div class="col-md-4 col-sm-6">
            <div class="blog-post">
              <div class="blog-thumb">
                <img src="<?= htmlspecialchars($new['image']) ?>" alt="<?= htmlspecialchars($new['title']) ?>">
              </div>
              <div class="down-content">
                <a href="<?= htmlspecialchars($new['url']) ?>">
                  <h4><?= htmlspecialchars($new['title']) ?></h4>
                </a>
                <p><?= htmlspecialchars($new['description']) ?></p>
                <ul class="post-info">
                  <li><a href="#"><?= htmlspecialchars($new['author'] ?? 'Auteur inconnu') ?></a></li>
                  <li><a href="#"><?= htmlspecialchars($new['time']) ?></a></li>
                </ul>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>

<div class="main-banner header-text">
  <div class="container-fluid">
    <h2 class="text-center">Gameplay :</h2>
    <div class="owl-banner owl-carousel">
      <div class="item">
        <img src="assets/img/IEGOGalaxySupernova-1.png" alt="">
      </div>
      <div class="item">
        <img src="assets/img/IEGOGalaxySupernova-2.png" alt="">
      </div>
      <div class="item">
        <img src="assets/img/IEGOGalaxySupernova-3.png" alt="">
      </div>
      <div class="item">
        <img src="assets/img/IEGOGalaxySupernova-4.png" alt="">
      </div>
      <div class="item">
        <img src="assets/img/IEGOGalaxySupernova-5.png" alt="">
      </div>
      <div class="item">
        <img src="assets/img/IEGOGalaxySupernova-6.png" alt="">
      </div>
    </div>
  </div>
</div>

<?php import_footer(); ?>