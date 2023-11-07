var videosMap = new Map(
  Object.entries({
    intro: "b5KeINX86yM",
    code1: {
      stageOneId: "GM_3IlttE-I",
      stageTwoId: "tCDvOQI3pco",
    },
    code2: {
      stageOneId: "tCDvOQI3pco",
      stageTwoId: "GM_3IlttE-I",
    },
  })
);

var welcomeEnded = false;
var welcomeAllConfirmed = false;
var player;
var playerReady = false;

/**
 * YouTube
 */

var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    playerVars: {
      playsinline: 1,
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      rel: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  //event.target.playVideo();
  playerReady = true;
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    welcomeEnded = true;
    if (welcomeAllConfirmed && welcomeEnded) {
      $("#welcomeContinueButton").prop("disabled", false);
    } else {
      $("#welcomeContinueButton").prop("disabled", true);
    }
    $("#stageOneContinueButton").prop("disabled", false);
    $("#stageTwoContinueButton").prop("disabled", false);
  } else {
    if (event.data === YT.PlayerState.PLAYING) {
      $("#stageOneStartButton").prop("disabled", true);
      $("#stageTwoStartButton").prop("disabled", true);
    }
  }
}

$(function () {
  setupPasswordPage();

  /**
   * Password Page
   */

  function setupPasswordPage() {
    $("#header").text("Please enter the password you were given to enter the study");
    $("#playerSection").hide();
    $("#passwordSection").show();
  }

  $("#password").on("keyup", function () {
    if ($("#password").val() === "") {
      $("#passwordContinueButton").prop("disabled", true);
    } else {
      $("#passwordContinueButton").prop("disabled", false);
    }
  });

  $("#passwordContinueButton").on("click", function () {
    if (playerReady) {
      if (videosMap.has($("#password").val())) {
        $("#passwordSection").hide();
        setupWelcomePage();
      } else {
        alert("invalid password");
      }
    } else {
      alert("Sorry something went wrong please try again");
      location.reload();
    }
  });

  /**
   * Welcome Page
   */

  function setupWelcomePage() {
    $("#header").text("Hello and welcome to the study");
    player.loadVideoById(videosMap.get("intro"));
    player.playVideo();
    $("#playerSection").show();
    $("#welcomeSection").show();
  }

  $("#over18").on("change", function () {
    enableContinueIfAllCheckedAndWelcomeEnded();
  });

  $("#readInfo").on("change", function () {
    enableContinueIfAllCheckedAndWelcomeEnded();
  });

  $("#consent").on("change", function () {
    enableContinueIfAllCheckedAndWelcomeEnded();
  });

  function enableContinueIfAllCheckedAndWelcomeEnded() {
    welcomeAllConfirmed = $("#over18").is(":checked") && $("#readInfo").is(":checked") && $("#consent").is(":checked");
    if (welcomeAllConfirmed && welcomeEnded) {
      $("#welcomeContinueButton").prop("disabled", false);
    } else {
      $("#welcomeContinueButton").prop("disabled", true);
    }
  }

  $("#welcomeContinueButton").on("click", function () {
    if ($("#over18").prop("checked") && $("#readInfo").prop("checked") && $("#consent").prop("checked")) {
      $("#welcomeSection").hide();
      setupStageOnePage();
    }
  });

  /**
   * Stage One Page
   */

  function setupStageOnePage() {
    $("#header").text("Stage One");
    $("#stageOneContinueButton").prop("disabled", true);
    $("#stageOneStartButton").prop("disabled", false);
    player.loadVideoById(videosMap.get($("#password").val())["stageOneId"]);
    player.stopVideo();
    $("#playerSection").show();
    $("#stageOneSection").show();
  }

  $("#stageOneStartButton").on("click", function () {
    player.playVideo();
    $("#stageOneStartButton").prop("disabled", true);
  });

  $("#stageOneContinueButton").on("click", function () {
    $("#stageOneSection").hide();
    setupStageTwoPage();
  });

  /**
   * Stage Two Page
   */

  function setupStageTwoPage() {
    $("#header").text("Stage Two");
    $("#stageTwoContinueButton").prop("disabled", true);
    $("#stageTwoStartButton").prop("disabled", false);
    player.loadVideoById(videosMap.get($("#password").val())["stageTwoId"]);
    player.stopVideo();
    $("#playerSection").show();
    $("#stageTwoSection").show();
  }

  $("#stageTwoStartButton").on("click", function () {
    player.playVideo();
    $("#stageTwoStartButton").prop("disabled", true);
  });

  $("#stageTwoContinueButton").on("click", function () {
    $("#stageTwoSection").hide();
    setupTimedQuestionairePage();
  });

  /**
   * Timed Questionaire Page
   */

  function setupTimedQuestionairePage() {
    $("#header").text("Timed Questionaire");
    $("#timedQuestionaireContinueButton").prop("disabled", false);
    $("#playerSection").hide();
    $("#timedQuestionaireSection").show();
  }

  $("#timedQuestionaireContinueButton").on("click", function () {
    $("#timedQuestionaireSection").hide();
    setupUntimedQuestionairePage();
  });

  /**
   * Untimed Questionaire Page
   */

  $("#untimedQuestionaireContinueButton").on("click", function () {
    $("#untimedQuestionaireSection").hide();
    setupThankYouPage();
  });

  function setupUntimedQuestionairePage() {
    $("#header").text("Untimed Questionaire");
    $("#untimedQuestionaireContinueButton").prop("disabled", false);
    $("#playerSection").hide();
    $("#untimedQuestionaireSection").show();
  }

  /**
   * Thank You Page
   */

  function setupThankYouPage() {
    $("#header").text("Thank You");
    $("#playerSection").hide();
    $("#thankYouSection").show();
  }

  /**
   * JQuery forms don't use submit
   */

  $("#passwordForm").on("submit", function (e) {
    return false;
  });
  $("#welcomeForm").on("submit", function (e) {
    return false;
  });
  $("#stageOneForm").on("submit", function (e) {
    return false;
  });
  $("#stageTwoForm").on("submit", function (e) {
    return false;
  });
  $("#timedQuestionaireForm").on("submit", function (e) {
    return false;
  });
  $("#untimedQuestionaireForm").on("submit", function (e) {
    return false;
  });
});
