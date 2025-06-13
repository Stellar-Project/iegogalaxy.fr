<?php

defined( 'SITE_LOADED' ) or die( "You don't have access to this file." );

define( 'SITE_URL', 'http://localhost/' );
define ( 'SITE_ICON', 'assets/img/logo.png');
define( 'SITE_PATH', __DIR__ . "/" );

define( 'SITE_NAME', 'IEGGSNBBFR' );
define( 'SITE_TITLE_SEP', ' | ' );
define( 'SITE_DEFAULT_IMAGE', "" );


$pages = [
    'index.php' => [
        'name' => 'Page d\'accueil'
    ],
    'wiki.php' => [
        'name' => 'Wiki'
    ],
    'patchnotes.php' => [
        'name' => 'Notes'
    ],
    'telechargement.php' => [
        'name' => 'Téléchargement'
    ],
    'apropos.php' => [
        'name' => 'A Propos'
    ],
    'telechargement_patch_bigbang.php' => [
        'name' => 'Patch Big Bang'
    ],
    'telechargement_patch_supernova.php' => [
        'name' => 'Patch Supernova'
    ]
];

$css = [
    SITE_URL . 'assets/css/fontawesome.css',
    SITE_URL . 'assets/css/style.css',
    SITE_URL . 'assets/css/owl.css',
    SITE_URL . 'vendor/bootstrap/css/bootstrap.min.css'
];

$js = [
    SITE_URL . 'vendor/jquery/jquery.min.js',
    SITE_URL . 'vendor/bootstrap/js/bootstrap.bundle.min.js',
    SITE_URL . 'assets/js/custom.js',
    SITE_URL . 'assets/js/owl.js',
    SITE_URL . 'assets/js/slick.js',
    SITE_URL . 'assets/js/isotope.js',
    SITE_URL . 'assets/js/accordions.js'
];

