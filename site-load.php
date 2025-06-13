<?php

if( !defined( 'SITE_LOADED' ) ) define( 'SITE_LOADED', true );

require_once 'config.php';
require_once 'includes/templates.php';
require_once 'includes/url.php';
require_once 'includes/errors.php';
require_once 'includes/news.php';


// Build page.
global $page, $pages;
if( !$page || $page == [] || $page == "" ){

    $page = &$pages[ basename( $_SERVER['PHP_SELF'] ) ] ?? false;
    if( !$page ) site_error( 'Page doesn\'t exist.', 404 );

}

?>
