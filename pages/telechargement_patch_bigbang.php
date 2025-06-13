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

<br><br><br><br><br>
<div class="container-download">
    <h2>Installation – Tutoriel interactif</h2>

    <label for="console">Choisissez où vous voulez installer le patch :</label>
    <select id="console" onchange="onConsoleSelect()" class="form-select">
        <option value="">-- Sélectionnez --</option>
        <option value="3ds">Nintendo 3DS</option>
        <option value="emulateur">Emulateur</option>
    </select>

    <div id="jailbreak-step" style="display: none; margin-top: 20px;">
        <label for="jailbreak">Votre console est-elle déjà jailbreakée ?</label>
        <select id="jailbreak" onchange="onJailbreakSelect()" class="form-select">
            <option value="">-- Sélectionnez --</option>
            <option value="yes">Oui</option>
            <option value="no">Non</option>
        </select>
    </div>

    <div id="device-step" style="display: none; margin-top: 20px;">
        <label for="device">Où souhaitez vous installer le patch ?</label>
        <select id="device" onchange="onDeviceSelect()" class="form-select">
            <option value="">-- Sélectionnez --</option>
            <option value="pc">PC</option>
            <option value="mobile">Mobile</option>
        </select>
    </div>

    <div id="tutorial-content" style="margin-top: 30px;"></div>
</div>

<script>
    function onConsoleSelect() {
        const console = document.getElementById("console").value;
        const jailbreakStep = document.getElementById("jailbreak-step");
        const deviceStep = document.getElementById("device-step");
        const content = document.getElementById("tutorial-content");

        jailbreakStep.style.display = "none";
        deviceStep.style.display = "none";
        content.innerHTML = "";

        if (console === "3ds") {
            jailbreakStep.style.display = "block";
        } else if (console === "emulateur") {
            deviceStep.style.display = "block";
        }
    }

    function onJailbreakSelect() {
        const jailbreak = document.getElementById("jailbreak").value;
        const content = document.getElementById("tutorial-content");

        content.innerHTML = "";

        if (jailbreak === "no") {
            content.innerHTML = `
      <h3>Tutoriel – Jailbreak 3DS</h3>
      <ol>
        <li>Assurez-vous que votre console est à jour (11.17 recommandé).</li>
        <li>Rendez-vous sur <a href="https://3ds.hacks.guide/" target="_blank">3ds.hacks.guide</a>.</li>
        <li>Suivez le guide</li>
        <li>Redémarrez et vérifiez que Luma3ds est présent.</li>
        <li>Ensuite allez à la section "Oui" ci-dessus</li>
      </ol>
    `;
        } else if (jailbreak === "yes") {
            content.innerHTML = `
      <h3>Préparation avant l'installation du patch</h3>
      <p>Si vous n'avez jamais installé de patch de traduction pour le jeu, veuillez passer directement à la section <strong>Instructions et installation</strong>.</p>
      <p>Afin d'éviter tout conflit entre différentes versions de patchs, nous vous recommandons de désinstaller le patch et de supprimer la ROM actuellement installée.</p>
      
      <h4>Si vous aviez le patch :</h4>
      <ol>
        <li>Supprimez le patch de votre carte SD en accédant au dossier <code>luma/titles</code>, puis supprimez les dossiers <code>000400000010BB00</code> et/ou <code>000400000010BA00</code>.</li>
        <li>Replacez la carte SD dans votre console et allumez-la.</li>
      </ol>

      <h4>Si vous aviez la rom :</h4>
      <ol>
        <li>Faites d'abord une backup de votre sauvegarde avec <strong>FBI</strong> pour éviter de la perdre.</li>
        <li>Ensuite puvrez <strong>FBI</strong>, accédez à <strong>Titles</strong> et cherchez les jeux (en vert).</li>
        <li>Sélectionnez le jeu, puis choisissez <strong>Delete Title And Ticket</strong>.</li>
      </ol>
      
      <h3>Instructions et installation sur 3DS via le CFW Luma3DS :</h3>

      <h4>Si vous avez pris le patch (.zip) :</h4>
      <ol>
        <li>Dézippez le pack [PATCH FR] Inazuma Eleven GO Galaxy Supernova (V1) ou Big Bang (V1).</li>
        <li>Copiez le dossier <code>luma</code> à la racine de la carte SD.</li>
        <li>Remplacez les fichiers si demandé.</li>
        <li>Vérifiez que <strong>Enable game patching</strong> est activé dans le menu de configuration de Luma3DS.</li>
        <li>Testez les jeux sur votre console.</li>
      </ol>

      <h4>Si vous avez pris la rom (.cia) :</h4>
      <ol>
        <li>Placez le fichier .cia dans le dossier <code>cias</code> de votre carte SD.</li>
        <li>Insérez la carte dans la 3DS et ouvrez FBI.</li>
        <li>Installez le fichier depuis le dossier <code>cias</code> avec <strong>Install and delete CIAs</strong>.</li>
      </ol>
    `;
        }
    }

    function onDeviceSelect() {
        const device = document.getElementById("device").value;
        const content = document.getElementById("tutorial-content");

        content.innerHTML = "";

        if (device === "pc" || device === "mobile") {
            content.innerHTML = `
      <h3>Préparation avant l'installation du patch</h3>
      <p>Afin d'éviter tout conflit entre différentes versions de patchs, nous vous recommandons de désinstaller le patch et de supprimer la ROM actuellement installée.</p>

      <h4>Pour les utilisateurs de l'émulateur Citra :</h4>
      <ul>
        <li>Faites clic droit sur votre jeu dans Citra.</li>
        <li>Sélectionnez <strong>Ouvrir l'emplacement des mods</strong>.</li>
        <li>Supprimez le dossier <code>RomFS</code> (qui contient le patch).</li>
        <li>Supprimez la ROM de votre dossier de jeux ou conservez-la si besoin.</li>
      </ul>

      <h3>Instructions et installation sur l’émulateur Citra</h3>
      <p>Si vous n'avez pas encore installé Citra, téléchargez-le via leur <a href="https://citra-emu.org/download/" target="_blank">page officielle</a>.</p>
      <p><strong>Instructions pour l'installation de la rom (.3ds) à venir.</strong></p>
    `;
        }
    }
</script>

<br><br><br><br><br>

<?php

import_footer();
