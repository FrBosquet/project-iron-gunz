function createSceneryViewContainer(stage) {
  var sceneryViewContainer = createView("relative", "sceneryViewContainer");

  var allScenery = [];
  //stage = board._stage
  stage.forEach(function(arr) {
    allScenery = allScenery.concat(arr.filter(function(val) {
      return val !== null;
    }))
  });

  allScenery.forEach(function(val) {
    var sceneryItem = createView("posicionable " + ((val instanceof Column) ? "columnn" : "box"));
    translateView(sceneryItem, val._posX, val._posY);
    sceneryViewContainer.appendChild(sceneryItem);
  })

  return sceneryViewContainer;
}
