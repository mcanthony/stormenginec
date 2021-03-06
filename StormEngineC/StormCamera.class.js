/**
* @class
* @constructor
* @augments StormNode

* @property {String} objectType
* @property {StomrNode} nodePivot
* @property {StomrNode} nodeGoal
* @property {StormControllerTargetCam|StormControllerPlayer|StormControllerPlayerCar|StormControllerFollow} controller Camera controller
*/
StormCamera = function(sec) { StormNode.call(this);
	this._sec = sec;
	
	this.objectType = 'camera';
	
	this.controller; // camera controller
	this.nodeGoal;
	this.nodePivot;
	
	this.usedByGLContext = false;
	this.enableAnimFrames = false;
	this.lockRotX = false;
	this.lockRotY = false;
	
	this.posCamera;
	this.posCameraPivot;
	this.vecView; 
	this.vecXPlanoProyeccion;//◄
	this.vecYPlanoProyeccion;//▲
	this.distanciaAlPlano = 1.0;
	this.centroPlanoProyeccion;
	
	// lens 
	this.autofocus = true;
	this.focusExtern = 20.0;
	this.fNumber = 90.0/128.0; // solo profCampo
	this.DOFenable = false; 
	
	this.widthLens = 0.5;
	this.refIndex = 1.46;
	this.focusIntern = 2.135105374746873;// EMR RENDER
};
StormCamera.prototype = Object.create(StormNode.prototype);



/**
* Remove this object
* @type Void
*/
StormCamera.prototype.remove = function() {
	var idToRemove = undefined;
	for(var n = 0, f = this._sec.nodesCam.length; n < f; n++) {
		if(this._sec.nodesCam[n].idNum == this.idNum) idToRemove = n;
	}
	this._sec.nodesCam.splice(idToRemove,1);
};
/**
* Look rotation x
* @type Void
 */
StormCamera.prototype.lockRotationX = function() {
	this.lockRotX = true;
};
/**
* Look rotation y
* @type Void
 */
StormCamera.prototype.lockRotationY = function() {
	this.lockRotY = true;
};
/**
* UnLook rotation x
* @type Void
 */
StormCamera.prototype.unlockRotationX = function() {
	this.lockRotX = false;
};
/**
* UnLook rotation y
* @type Void
 */
StormCamera.prototype.unlockRotationY = function() {
	this.lockRotY = false;
};

/**
* Set side view. This change the projection to orthographic.
* @type Void
* @param {String} view 'LEFT','RIGHT','FRONT','BACK','TOP','BOTTOM'
 */
StormCamera.prototype.setView = function(view) {
	this.setProjectionType('o');
	this.nodePivot.resetAxis();
	this.resetAxis();
	switch(view) {
		case 'LEFT':
			this.nodePivot.setRotation(this._sec.utils.degToRad(-90),false,$V3([0.0,1.0,0.0]));
			break;
		case 'RIGHT':			
			this.nodePivot.setRotation(this._sec.utils.degToRad(-90-180),false,$V3([0.0,1.0,0.0]));
			break;
		case 'FRONT':
			this.nodePivot.setRotation(this._sec.utils.degToRad(0),false,$V3([0.0,1.0,0.0]));
			break;
		case 'BACK':			
			this.nodePivot.setRotation(this._sec.utils.degToRad(180),false,$V3([0.0,1.0,0.0]));
			break;
		case 'TOP':
			this.nodePivot.setRotation(this._sec.utils.degToRad(-90),false,$V3([1.0,0.0,0.0]));
			break;
		case 'BOTTOM':			
			this.nodePivot.setRotation(this._sec.utils.degToRad(90),false,$V3([1.0,0.0,0.0]));
			break;
	}
};

/**
* Switch cam controller
* @type Void
* @param {Object} jsonIn
* 	@param {String} jsonIn.mode 'targetcam'|'follow'|'player'|'nodeCar'.
* 	@param {Float} [jsonIn.distance] Distance to camera target.
* 	@param {StormNode} [jsonIn.node] For attach a node to the camera target. Only type 'targetcam'|'follow'|'player'.
* 	@param {StormNode} [jsonIn.nodeCar] If mode is 'nodeCar'.
* 	@param {String} [jsonIn.view='node'] 'camera' | 'node'.
 */
StormCamera.prototype.setController = function(jsonIn) {
	var view =(jsonIn.view != undefined) ? jsonIn.view : 'node';
	
	if(jsonIn.mode == 'targetcam') {
		this.controller = new StormControllerTargetCam(this._sec, jsonIn.distance);
		
		if(jsonIn.node != undefined) {
			if(view == 'node') this.nodePivot.setPosition(jsonIn.node.getPosition());
			if(view == 'camera') jsonIn.node.setPosition(this.nodePivot.getPosition());
		}

		this.controller.cameraSetupFC(this, jsonIn.node); // cameraNode, meshNode
	}
	if(jsonIn.mode == 'player') {
		this.controller = new StormControllerPlayer(this._sec, jsonIn.distance);
		
		if(jsonIn.node != undefined) {
			if(view == 'node') this.nodePivot.setPosition(jsonIn.node.getPosition());
			if(view == 'camera') jsonIn.node.setPosition(this.nodePivot.getPosition());
		}

		this.controller.cameraSetupFC(this, jsonIn.node); // cameraNode, meshNode
	}
	if(jsonIn.mode == 'nodeCar') {
		this.controller = new StormControllerPlayerCar(this._sec, jsonIn.distance);
		
		if(jsonIn.node != undefined) {
			if(view == 'node') this.nodePivot.setPosition(jsonIn.node.getPosition());
			if(view == 'camera') jsonIn.node.setPosition(this.nodePivot.getPosition());
		}
		
		this.controller.cameraSetupFC(this, jsonIn.node, jsonIn.nodeCar); // cameraNode, meshNode, nodeCar
	}
	if(jsonIn.mode == 'follow') {
		this.controller = new StormControllerFollow(this._sec, jsonIn.distance); 
		
		if(jsonIn.node != undefined) {
			if(view == 'node') this.nodePivot.setPosition(jsonIn.node.getPosition());
			if(view == 'camera') jsonIn.node.setPosition(this.nodePivot.getPosition());
		}

		this.controller.cameraSetupFC(this, jsonIn.node); // cameraNode, meshNode
		this.enableAnimFrames = false;
	}
};

/**
 * @private 
 */
StormCamera.prototype.setFocusIntern = function() {
	var etaAir = 1.00029;
			
	var lineOrigin = this.posCameraPivot.add(this.vecView.x(this.focusExtern));
	var lineEnd = this.posCameraPivot.add(this.vecYPlanoProyeccion.x(this.widthLens));
	
	var rayLens = new StormRayLens(this._sec); 
	var rl = rayLens.setRayLens(lineOrigin, lineEnd, etaAir, this.refIndex); 
	if(rl[0] != -1.0) {
		var outRay = $V3([rl[4], rl[5], rl[6]]);
		
		var angle = 1.0-(outRay.dot(this.vecYPlanoProyeccion.x(-1.0)));  
		angle *= 90.0;
		var distFocus = Math.tan(this._sec.utils.degToRad(angle));
		this.focusIntern = distFocus*0.786;
		
		
	}
};
/**
* Enable depth of field.
* @type Void
* @param {Object} jsonIn
* 	@param {Bool} [jsonIn.autofocus=true] Use auto focus.
 */
StormCamera.prototype.enableDOF = function(jsonIn) {
	this.DOFenable = true;
	if(jsonIn != undefined && jsonIn.autofocus != undefined) this.autofocus = jsonIn.autofocus;
};
/**
* Disable depth of field.
* @type Void
 */
StormCamera.prototype.disableDOF = function() {
	this.DOFenable = false;
};

/**
* Enable auto focus if DOF is enabled.
* @type Void
 */
StormCamera.prototype.enableAutofocus = function() {
	this.autofocus = true;
};
/**
* Disable auto focus if DOF is enabled.
* @type Void
 */
StormCamera.prototype.disableAutofocus = function() {
	this.autofocus = false;
};

/**
* Set the focus distance and F-Stop.
* @type Void
* @param	{Object} jsonIn
* 	@param {Float} [jsonIn.distance=20.0] Focus distance.
* 	@param {Float} [jsonIn.fStop=90.0] Aperture (0.3 - 128.0).
 */
StormCamera.prototype.focus = function(jsonIn) {
	this.focusExtern = parseFloat(jsonIn.distance);
	if(this.focusExtern < 0.1) this.focusExtern = 0.1; 
	
	if(jsonIn.fStop != undefined) {
		if(jsonIn.fStop > 128.0) jsonIn.fStop = 128.0; if(jsonIn.fStop <= 0.0) jsonIn.fStop = 0.3;
		this.fNumber = (128.0-jsonIn.fStop)/128.0;
	}
};

