<?php

defined('SITE_LOADED') or die("You don't have access to this file.");

?>

<!DOCTYPE html>
<html lang="fr">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="<?php defined(SITE_ICON); ?>" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap" rel="stylesheet">
   <title><?php echo get_page_head_title(); ?></title>
   <?php css_files(); ?>
  </head>

<!DOCTYPE html>

<body>
    <?php import_template('menu'); ?>
    <main>