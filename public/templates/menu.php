<?php

defined('SITE_LOADED') or die("You don't have access to this file.");

?>

    <!-- Header -->
    <header class="">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" href="<?php echo home_url(); ?>"><h2>Stellar Project</h2></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="<?php echo home_url(); ?>">Accueil
                  <span class="sr-only">(current)</span>
                </a>
              </li> 
              
              <li class="nav-item">
                <a class="nav-link" href="<?php echo build_url('pages/wiki.php'); ?>">Wiki</a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="<?php echo build_url('pages/patchnotes.php'); ?>">Patch notes</a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="<?php echo build_url('pages/telechargement.php'); ?>">Télécharger</a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="<?php echo build_url('pages/apropos.php'); ?>">A propos</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>