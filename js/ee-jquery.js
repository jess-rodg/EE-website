$(function () {
  $("#welcomeSection").hide();
  $("#stageOneSection").hide();
  $("#stageTwoSection").hide();
  $("#timedQuestionaireSection").hide();
  $("#untimedQuestionaireSection").hide();
  $("#thankYouSection").hide();

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

  $("#passwordContinueButton").on("click", function () {
    $("#passwordSection").hide();
    $("#welcomeVideo").attr("src", "https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=0");
    $("#welcomeSection").show();
  });

  $("#welcomeContinueButton").on("click", function () {    
    if ($("#over18").prop("checked") && $("#readInfo").prop("checked") && $("#consent").prop("checked")) {
      $("#welcomeVideo").attr("src", "");
      $("#welcomeSection").hide();
      $("#stageOneSection").show();
    }
  });

  $("#stageOneContinueButton").on("click", function () {
    $("#stageOneSection").hide();
    $("#stageTwoSection").show();
  });

  $("#stageTwoContinueButton").on("click", function () {
    $("#stageTwoSection").hide();
    $("#timedQuestionaireSection").show();
  });

  $("#timedQuestionaireContinueButton").on("click", function () {
    $("#timedQuestionaireSection").hide();
    $("#untimedQuestionaireSection").show();
  });

  $("#untimedQuestionaireContinueButton").on("click", function () {
    $("#untimedQuestionaireSection").hide();
    $("#thankYouSection").show();
  });
});
