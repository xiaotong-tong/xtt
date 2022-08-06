const loadModel = (resourcePath, modelNames) => {
	live2dLoader.resourcesConfig.setResourcesPath(resourcePath)
	live2dLoader.resourcesConfig.setModelNames(modelNames)
	live2dLoader.start();
	window.msg.showMsg("【当前时间】");
}

window.onload = () => {
	loadModel("common/live2d/models/", ["nami"]);
}
