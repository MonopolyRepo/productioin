(function (console, $hx_exports) { "use strict";
$hx_exports.openfl = $hx_exports.openfl || {};
$hx_exports.lime = $hx_exports.lime || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { };
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = true;
ApplicationMain.config = null;
ApplicationMain.preloader = null;
ApplicationMain.create = function() {
	var app = new lime_app_Application();
	app.create(ApplicationMain.config);
	openfl_Lib.application = app;
	var stage = new openfl_display_Stage(app.windows[0].__width,app.windows[0].__height,ApplicationMain.config.background);
	stage.addChild(openfl_Lib.current);
	app.addModule(stage);
	var display = new Preloader();
	ApplicationMain.preloader = new openfl_display_Preloader(display);
	ApplicationMain.preloader.onComplete = ApplicationMain.init;
	ApplicationMain.preloader.create(ApplicationMain.config);
	var urls = [];
	var types = [];
	urls.push("characters/death/config.cfg");
	types.push("TEXT");
	urls.push("characters/death/texture.png");
	types.push("IMAGE");
	urls.push("characters/mage/config.cfg");
	types.push("TEXT");
	urls.push("characters/mage/texture.png");
	types.push("IMAGE");
	urls.push("characters/superdeath/config.cfg");
	types.push("TEXT");
	urls.push("characters/superdeath/texture.png");
	types.push("IMAGE");
	urls.push("tiles/JapaneseVillage.png");
	types.push("IMAGE");
	urls.push("tiles/map.txt");
	types.push("TEXT");
	if(ApplicationMain.config.assetsPrefix != null) {
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(types[i] != "FONT") urls[i] = ApplicationMain.config.assetsPrefix + urls[i];
		}
	}
	ApplicationMain.preloader.load(urls,types);
	var result = app.exec();
};
ApplicationMain.init = function() {
	var loaded = 0;
	var total = 0;
	var library_onLoad = function(__) {
		loaded++;
		if(loaded == total) ApplicationMain.start();
	};
	ApplicationMain.preloader = null;
	if(loaded == total) ApplicationMain.start();
};
ApplicationMain.main = function() {
	ApplicationMain.config = { antialiasing : 0, background : 0, borderless : false, company : "Asfel", depthBuffer : false, file : "Runner", fps : 0, fullscreen : false, hardware : true, height : 0, orientation : "portrait", packageName : "RunnerOpenFL", resizable : true, stencilBuffer : true, title : "RunnerOpenFL", version : "1.0.0", vsync : false, width : 0};
};
ApplicationMain.start = function() {
	var hasMain = false;
	var entryPoint = Type.resolveClass("Main");
	var _g = 0;
	var _g1 = Type.getClassFields(entryPoint);
	while(_g < _g1.length) {
		var methodName = _g1[_g];
		++_g;
		if(methodName == "main") {
			hasMain = true;
			break;
		}
	}
	lime_Assets.initialize();
	if(hasMain) Reflect.callMethod(entryPoint,Reflect.field(entryPoint,"main"),[]); else {
		var instance = Type.createInstance(DocumentClass,[]);
	}
	openfl_Lib.current.stage.dispatchEvent(new openfl_events_Event(openfl_events_Event.RESIZE,false,false));
};
var openfl_events_IEventDispatcher = function() { };
$hxClasses["openfl.events.IEventDispatcher"] = openfl_events_IEventDispatcher;
openfl_events_IEventDispatcher.__name__ = true;
var openfl_events_EventDispatcher = function(target) {
	if(target != null) this.__targetDispatcher = target;
};
$hxClasses["openfl.events.EventDispatcher"] = openfl_events_EventDispatcher;
openfl_events_EventDispatcher.__name__ = true;
openfl_events_EventDispatcher.__interfaces__ = [openfl_events_IEventDispatcher];
openfl_events_EventDispatcher.__sortByPriority = function(l1,l2) {
	if(l1.priority == l2.priority) return 0; else if(l1.priority > l2.priority) return -1; else return 1;
};
openfl_events_EventDispatcher.prototype = {
	addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		if(this.__eventMap == null) this.__eventMap = new haxe_ds_StringMap();
		if(!this.__eventMap.exists(type)) {
			var list = [];
			list.push(new openfl_events__$EventDispatcher_Listener(listener,useCapture,priority));
			this.__eventMap.set(type,list);
		} else {
			var list1 = this.__eventMap.get(type);
			var _g1 = 0;
			var _g = list1.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(Reflect.compareMethods(list1[i].callback,listener)) return;
			}
			list1.push(new openfl_events__$EventDispatcher_Listener(listener,useCapture,priority));
			list1.sort(openfl_events_EventDispatcher.__sortByPriority);
		}
	}
	,dispatchEvent: function(event) {
		if(this.__eventMap == null || event == null) return false;
		var list = this.__eventMap.get(event.type);
		if(list == null) return false;
		if(event.target == null) {
			if(this.__targetDispatcher != null) event.target = this.__targetDispatcher; else event.target = this;
		}
		event.currentTarget = this;
		var capture = event.eventPhase == openfl_events_EventPhase.CAPTURING_PHASE;
		var index = 0;
		var listener;
		while(index < list.length) {
			listener = list[index];
			if(listener.useCapture == capture) {
				listener.callback(event);
				if(event.__isCancelledNow) return true;
			}
			if(listener == list[index]) index++;
		}
		return true;
	}
	,hasEventListener: function(type) {
		if(this.__eventMap == null) return false;
		return this.__eventMap.exists(type);
	}
	,removeEventListener: function(type,listener,capture) {
		if(capture == null) capture = false;
		if(this.__eventMap == null) return;
		var list = this.__eventMap.get(type);
		if(list == null) return;
		var _g1 = 0;
		var _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].match(listener,capture)) {
				list.splice(i,1);
				break;
			}
		}
		if(list.length == 0) this.__eventMap.remove(type);
		if(!this.__eventMap.iterator().hasNext()) this.__eventMap = null;
	}
	,__class__: openfl_events_EventDispatcher
};
var openfl_display_IBitmapDrawable = function() { };
$hxClasses["openfl.display.IBitmapDrawable"] = openfl_display_IBitmapDrawable;
openfl_display_IBitmapDrawable.__name__ = true;
openfl_display_IBitmapDrawable.prototype = {
	__class__: openfl_display_IBitmapDrawable
};
var openfl_display_DisplayObject = function() {
	this.__cacheAsBitmap = false;
	this.__maskCached = false;
	openfl_events_EventDispatcher.call(this);
	this.__alpha = 1;
	this.__rotation = 0;
	this.__scaleX = 1;
	this.__scaleY = 1;
	this.__visible = true;
	this.__x = 0;
	this.__y = 0;
	this.__worldAlpha = 1;
	this.__worldTransform = new openfl_geom_Matrix();
	this.__rotationCache = 0;
	this.__rotationSine = 0;
	this.__rotationCosine = 1;
	this.__worldColorTransform = new openfl_geom_ColorTransform();
	this.set_name("instance" + ++openfl_display_DisplayObject.__instanceCount);
};
$hxClasses["openfl.display.DisplayObject"] = openfl_display_DisplayObject;
openfl_display_DisplayObject.__name__ = true;
openfl_display_DisplayObject.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_DisplayObject.__super__ = openfl_events_EventDispatcher;
openfl_display_DisplayObject.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	dispatchEvent: function(event) {
		var result = openfl_events_EventDispatcher.prototype.dispatchEvent.call(this,event);
		if(event.__isCancelled) return true;
		if(event.bubbles && this.parent != null && this.parent != this) {
			event.eventPhase = openfl_events_EventPhase.BUBBLING_PHASE;
			this.parent.dispatchEvent(event);
		}
		return result;
	}
	,globalToLocal: function(pos) {
		return this.__getTransform().clone().invert().transformPoint(pos);
	}
	,__broadcast: function(event,notifyChilden) {
		if(this.__eventMap != null && this.hasEventListener(event.type)) {
			var result = openfl_events_EventDispatcher.prototype.dispatchEvent.call(this,event);
			if(event.__isCancelled) return true;
			return result;
		}
		return false;
	}
	,__getBounds: function(rect,matrix) {
		if(this.__graphics != null) this.__graphics.__getBounds(rect,matrix);
	}
	,__getCursor: function() {
		return null;
	}
	,__getInteractive: function(stack) {
		return false;
	}
	,__getTransform: function() {
		if(this.__transformDirty || openfl_display_DisplayObject.__worldTransformDirty > 0) {
			var list = [];
			var current = this;
			var transformDirty = this.__transformDirty;
			if(this.parent == null) {
				if(transformDirty) this.__update(true,false);
			} else while(current.parent != null) {
				list.push(current);
				current = current.parent;
				if(current.__transformDirty) transformDirty = true;
			}
			if(transformDirty) {
				var i = list.length;
				while(--i >= 0) list[i].__update(true,false);
			}
		}
		return this.__worldTransform;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(this.__graphics != null) {
			if(this.get_visible() && this.__graphics.__hitTest(x,y,shapeFlag,this.__getTransform())) {
				if(!interactiveOnly) stack.push(this);
				return true;
			}
		}
		return false;
	}
	,__renderCairo: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_cairo_CairoShape.render(this,renderSession);
	}
	,__renderCairoMask: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_cairo_CairoGraphics.renderMask(this.__graphics,renderSession);
	}
	,__renderCanvas: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_canvas_CanvasShape.render(this,renderSession);
	}
	,__renderCanvasMask: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_canvas_CanvasGraphics.renderMask(this.__graphics,renderSession);
	}
	,__renderDOM: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_dom_DOMShape.render(this,renderSession);
	}
	,__renderGL: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		if(this.__graphics != null) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.render(this,renderSession);
	}
	,__setStageReference: function(stage) {
		if(this.stage != stage) {
			if(this.stage != null) this.dispatchEvent(new openfl_events_Event(openfl_events_Event.REMOVED_FROM_STAGE,false,false));
			this.stage = stage;
			if(stage != null) this.dispatchEvent(new openfl_events_Event(openfl_events_Event.ADDED_TO_STAGE,false,false));
		}
	}
	,__setRenderDirty: function() {
		if(!this.__renderDirty) {
			this.__renderDirty = true;
			openfl_display_DisplayObject.__worldRenderDirty++;
		}
	}
	,__update: function(transformOnly,updateChildren,maskGraphics) {
		this.__renderable = this.get_visible() && this.get_scaleX() != 0 && this.get_scaleY() != 0 && !this.__isMask;
		if(this.get_rotation() != this.__rotationCache) {
			this.__rotationCache = this.get_rotation();
			var radians = this.get_rotation() * (Math.PI / 180);
			this.__rotationSine = Math.sin(radians);
			this.__rotationCosine = Math.cos(radians);
		}
		if(this.parent != null) {
			var parentTransform = this.parent.__worldTransform;
			var a00 = this.__rotationCosine * this.get_scaleX();
			var a01 = this.__rotationSine * this.get_scaleX();
			var a10 = -this.__rotationSine * this.get_scaleY();
			var a11 = this.__rotationCosine * this.get_scaleY();
			var b00 = parentTransform.a;
			var b01 = parentTransform.b;
			var b10 = parentTransform.c;
			var b11 = parentTransform.d;
			if(this.__worldTransform == null) this.__worldTransform = new openfl_geom_Matrix();
			this.__worldTransform.a = a00 * b00 + a01 * b10;
			this.__worldTransform.b = a00 * b01 + a01 * b11;
			this.__worldTransform.c = a10 * b00 + a11 * b10;
			this.__worldTransform.d = a10 * b01 + a11 * b11;
			if(this.get_scrollRect() == null) {
				this.__worldTransform.tx = this.get_x() * b00 + this.get_y() * b10 + parentTransform.tx;
				this.__worldTransform.ty = this.get_x() * b01 + this.get_y() * b11 + parentTransform.ty;
			} else {
				this.__worldTransform.tx = (this.get_x() - this.get_scrollRect().x) * b00 + (this.get_y() - this.get_scrollRect().y) * b10 + parentTransform.tx;
				this.__worldTransform.ty = (this.get_x() - this.get_scrollRect().x) * b01 + (this.get_y() - this.get_scrollRect().y) * b11 + parentTransform.ty;
			}
			if(this.__isMask) this.__maskCached = false;
		} else {
			this.__worldTransform.a = this.__rotationCosine * this.get_scaleX();
			this.__worldTransform.c = -this.__rotationSine * this.get_scaleY();
			this.__worldTransform.b = this.__rotationSine * this.get_scaleX();
			this.__worldTransform.d = this.__rotationCosine * this.get_scaleY();
			if(this.get_scrollRect() == null) {
				this.__worldTransform.tx = this.get_x();
				this.__worldTransform.ty = this.get_y();
			} else {
				this.__worldTransform.tx = this.get_y() - this.get_scrollRect().x;
				this.__worldTransform.ty = this.get_y() - this.get_scrollRect().y;
			}
		}
		if(updateChildren && this.__transformDirty) {
			this.__transformDirty = false;
			openfl_display_DisplayObject.__worldTransformDirty--;
		}
		if(!transformOnly && this.__mask != null && !this.__mask.__maskCached) {
			if(this.__maskGraphics == null) this.__maskGraphics = new openfl_display_Graphics();
			this.__maskGraphics.clear();
			this.__mask.__update(true,true,this.__maskGraphics);
			this.__mask.__maskCached = true;
		}
		if(maskGraphics != null) this.__updateMask(maskGraphics);
		if(!transformOnly) {
			if(!this.__worldColorTransform.__equals(this.get_transform().get_colorTransform())) this.__worldColorTransform = this.get_transform().get_colorTransform().__clone();
			if(this.parent != null) {
				this.__worldAlpha = this.get_alpha() * this.parent.__worldAlpha;
				this.__worldColorTransform.__combine(this.parent.__worldColorTransform);
			} else this.__worldAlpha = this.get_alpha();
			if(updateChildren && this.__renderDirty) this.__renderDirty = false;
		}
	}
	,__updateChildren: function(transformOnly) {
		this.__renderable = this.get_visible() && this.get_scaleX() != 0 && this.get_scaleY() != 0 && !this.__isMask;
		if(!this.__renderable && !this.__isMask) return;
		this.__worldAlpha = this.get_alpha();
		if(this.__transformDirty) {
			this.__transformDirty = false;
			openfl_display_DisplayObject.__worldTransformDirty--;
		}
	}
	,__updateMask: function(maskGraphics) {
		if(this.__graphics != null) {
			maskGraphics.__commands.push(openfl_display_DrawCommand.OverrideMatrix(this.__worldTransform));
			maskGraphics.__commands = maskGraphics.__commands.concat(this.__graphics.__commands);
			maskGraphics.set___dirty(true);
			maskGraphics.__visible = true;
			if(maskGraphics.__bounds == null) maskGraphics.__bounds = new openfl_geom_Rectangle();
			this.__graphics.__getBounds(maskGraphics.__bounds,openfl_geom_Matrix.__identity);
		}
	}
	,get_alpha: function() {
		return this.__alpha;
	}
	,set_alpha: function(value) {
		if(value != this.__alpha) {
			if(!this.__renderDirty) {
				this.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
		}
		return this.__alpha = value;
	}
	,get_filters: function() {
		if(this.__filters == null) return []; else return this.__filters.slice();
	}
	,set_filters: function(value) {
		return value;
	}
	,get_height: function() {
		var bounds = new openfl_geom_Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl_geom_Matrix());
		return bounds.height * this.get_scaleY();
	}
	,get_mouseX: function() {
		if(this.stage != null) return this.globalToLocal(new openfl_geom_Point(this.stage.__mouseX,0)).x;
		return 0;
	}
	,get_mouseY: function() {
		if(this.stage != null) return this.globalToLocal(new openfl_geom_Point(0,this.stage.__mouseY)).y;
		return 0;
	}
	,set_name: function(value) {
		return this.__name = value;
	}
	,get_rotation: function() {
		return this.__rotation;
	}
	,get_scaleX: function() {
		return this.__scaleX;
	}
	,set_scaleX: function(value) {
		if(value != this.__scaleX) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__scaleX = value;
	}
	,get_scaleY: function() {
		return this.__scaleY;
	}
	,set_scaleY: function(value) {
		if(this.__scaleY != value) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__scaleY = value;
	}
	,get_scrollRect: function() {
		return this.__scrollRect;
	}
	,set_scrollRect: function(value) {
		if(value != this.__scrollRect) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__scrollRect = value;
	}
	,get_transform: function() {
		if(this.__transform == null) this.__transform = new openfl_geom_Transform(this);
		return this.__transform;
	}
	,get_visible: function() {
		return this.__visible;
	}
	,set_visible: function(value) {
		if(value != this.__visible) {
			if(!this.__renderDirty) {
				this.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
		}
		return this.__visible = value;
	}
	,get_width: function() {
		var bounds = new openfl_geom_Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl_geom_Matrix());
		return bounds.width * this.get_scaleX();
	}
	,get_x: function() {
		return this.__x;
	}
	,set_x: function(value) {
		if(value != this.__x) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__x = value;
	}
	,get_y: function() {
		return this.__y;
	}
	,set_y: function(value) {
		if(value != this.__y) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__y = value;
	}
	,__class__: openfl_display_DisplayObject
	,__properties__: {get_mouseY:"get_mouseY",get_mouseX:"get_mouseX",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",get_width:"get_width",set_visible:"set_visible",get_visible:"get_visible",get_transform:"get_transform",set_scrollRect:"set_scrollRect",get_scrollRect:"get_scrollRect",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",get_rotation:"get_rotation",set_name:"set_name",get_height:"get_height",set_filters:"set_filters",get_filters:"get_filters",set_alpha:"set_alpha",get_alpha:"get_alpha"}
});
var openfl_display_InteractiveObject = function() {
	openfl_display_DisplayObject.call(this);
	this.doubleClickEnabled = false;
	this.mouseEnabled = true;
	this.needsSoftKeyboard = false;
	this.tabEnabled = true;
	this.tabIndex = -1;
};
$hxClasses["openfl.display.InteractiveObject"] = openfl_display_InteractiveObject;
openfl_display_InteractiveObject.__name__ = true;
openfl_display_InteractiveObject.__super__ = openfl_display_DisplayObject;
openfl_display_InteractiveObject.prototype = $extend(openfl_display_DisplayObject.prototype,{
	__getInteractive: function(stack) {
		if(stack != null) {
			stack.push(this);
			if(this.parent != null) this.parent.__getInteractive(stack);
		}
		return true;
	}
	,__class__: openfl_display_InteractiveObject
});
var openfl_display_DisplayObjectContainer = function() {
	openfl_display_InteractiveObject.call(this);
	this.mouseChildren = true;
	this.__children = [];
	this.__removedChildren = [];
};
$hxClasses["openfl.display.DisplayObjectContainer"] = openfl_display_DisplayObjectContainer;
openfl_display_DisplayObjectContainer.__name__ = true;
openfl_display_DisplayObjectContainer.__super__ = openfl_display_InteractiveObject;
openfl_display_DisplayObjectContainer.prototype = $extend(openfl_display_InteractiveObject.prototype,{
	addChild: function(child) {
		if(child != null) {
			if(child.parent != null) child.parent.removeChild(child);
			this.__children.push(child);
			child.parent = this;
			if(this.stage != null) child.__setStageReference(this.stage);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
			var event = new openfl_events_Event(openfl_events_Event.ADDED,true);
			event.target = child;
			child.dispatchEvent(event);
		}
		return child;
	}
	,getChildAt: function(index) {
		if(index >= 0 && index < this.__children.length) return this.__children[index];
		return null;
	}
	,removeChild: function(child) {
		if(child != null && child.parent == this) {
			if(this.stage != null) child.__setStageReference(null);
			child.parent = null;
			HxOverrides.remove(this.__children,child);
			this.__removedChildren.push(child);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
			child.dispatchEvent(new openfl_events_Event(openfl_events_Event.REMOVED,true));
		}
		return child;
	}
	,setChildIndex: function(child,index) {
		if(index >= 0 && index <= this.__children.length && child.parent == this) {
			HxOverrides.remove(this.__children,child);
			this.__children.splice(index,0,child);
		}
	}
	,__broadcast: function(event,notifyChilden) {
		if(event.target == null) event.target = this;
		var result = openfl_display_InteractiveObject.prototype.__broadcast.call(this,event,notifyChilden);
		if(!event.__isCancelled && notifyChilden) {
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__broadcast(event,true);
				if(event.__isCancelled) return true;
			}
		}
		return result;
	}
	,__getBounds: function(rect,matrix) {
		openfl_display_InteractiveObject.prototype.__getBounds.call(this,rect,matrix);
		if(this.__children.length == 0) return;
		var matrixCache = null;
		if(matrix != null) {
			matrixCache = this.__worldTransform;
			this.__worldTransform = matrix;
			this.__updateChildren(true);
		}
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(!child.__renderable) continue;
			child.__getBounds(rect,child.__worldTransform);
		}
		if(matrix != null) {
			this.__worldTransform = matrixCache;
			this.__updateChildren(true);
		}
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || interactiveOnly && !this.mouseEnabled) return false;
		var i = this.__children.length;
		if(interactiveOnly) {
			if(stack == null || !this.mouseChildren) {
				while(--i >= 0) if(this.__children[i].__hitTest(x,y,shapeFlag,null,true)) {
					if(stack != null) stack.push(this);
					return true;
				}
			} else if(stack != null) {
				var length = stack.length;
				var interactive = false;
				var hitTest = false;
				while(--i >= 0) {
					interactive = this.__children[i].__getInteractive(null);
					if(interactive || !hitTest) {
						if(this.__children[i].__hitTest(x,y,shapeFlag,stack,true)) {
							hitTest = true;
							if(interactive) break;
						}
					}
				}
				if(hitTest) {
					stack.splice(length,0,this);
					return true;
				}
			}
		} else while(--i >= 0) this.__children[i].__hitTest(x,y,shapeFlag,stack,false);
		return false;
	}
	,__renderCairo: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		openfl_display_InteractiveObject.prototype.__renderCairo.call(this,renderSession);
		if(this.__mask != null) renderSession.maskManager.pushMask(this.__mask);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderCairo(renderSession);
		}
		this.__removedChildren = [];
		if(this.__mask != null) renderSession.maskManager.popMask();
	}
	,__renderCairoMask: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_cairo_CairoGraphics.renderMask(this.__graphics,renderSession);
		var bounds = new openfl_geom_Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl_geom_Matrix());
		renderSession.cairo.rectangle(0,0,bounds.width,bounds.height);
	}
	,__renderCanvas: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		openfl_display_InteractiveObject.prototype.__renderCanvas.call(this,renderSession);
		if(this.get_scrollRect() != null) renderSession.maskManager.pushRect(this.get_scrollRect(),this.__worldTransform);
		if(this.__mask != null) renderSession.maskManager.pushMask(this.__mask);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderCanvas(renderSession);
		}
		this.__removedChildren = [];
		if(this.__mask != null) renderSession.maskManager.popMask();
		if(this.get_scrollRect() != null) renderSession.maskManager.popMask();
	}
	,__renderCanvasMask: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_canvas_CanvasGraphics.renderMask(this.__graphics,renderSession);
		var bounds = new openfl_geom_Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl_geom_Matrix());
		renderSession.context.rect(0,0,bounds.width,bounds.height);
	}
	,__renderDOM: function(renderSession) {
		openfl_display_InteractiveObject.prototype.__renderDOM.call(this,renderSession);
		if(this.__mask != null) renderSession.maskManager.pushMask(this.__mask);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderDOM(renderSession);
		}
		var _g2 = 0;
		var _g11 = this.__removedChildren;
		while(_g2 < _g11.length) {
			var orphan = _g11[_g2];
			++_g2;
			if(orphan.stage == null) orphan.__renderDOM(renderSession);
		}
		this.__removedChildren = [];
		if(this.__mask != null) renderSession.maskManager.popMask();
	}
	,__renderGL: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		var masked = this.__mask != null && this.__maskGraphics != null && this.__maskGraphics.__commands.length > 0;
		if(masked) {
			renderSession.spriteBatch.stop();
			renderSession.maskManager.pushMask(this);
			renderSession.spriteBatch.start();
		}
		openfl_display_InteractiveObject.prototype.__renderGL.call(this,renderSession);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderGL(renderSession);
		}
		if(masked) {
			renderSession.spriteBatch.stop();
			renderSession.maskManager.popMask();
			renderSession.spriteBatch.start();
		}
		this.__removedChildren = [];
	}
	,__setStageReference: function(stage) {
		if(this.stage != stage) {
			if(this.stage != null) this.dispatchEvent(new openfl_events_Event(openfl_events_Event.REMOVED_FROM_STAGE,false,false));
			this.stage = stage;
			if(stage != null) this.dispatchEvent(new openfl_events_Event(openfl_events_Event.ADDED_TO_STAGE,false,false));
			if(this.__children != null) {
				var _g = 0;
				var _g1 = this.__children;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					child.__setStageReference(stage);
				}
			}
		}
	}
	,__update: function(transformOnly,updateChildren,maskGraphics) {
		openfl_display_InteractiveObject.prototype.__update.call(this,transformOnly,updateChildren,maskGraphics);
		if(!this.__renderable && !this.__isMask) return;
		if(updateChildren) {
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__update(transformOnly,true,maskGraphics);
			}
		}
	}
	,__updateChildren: function(transformOnly) {
		openfl_display_InteractiveObject.prototype.__updateChildren.call(this,transformOnly);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__update(transformOnly,true);
		}
	}
	,get_numChildren: function() {
		return this.__children.length;
	}
	,__class__: openfl_display_DisplayObjectContainer
	,__properties__: $extend(openfl_display_InteractiveObject.prototype.__properties__,{get_numChildren:"get_numChildren"})
});
var openfl_display_Sprite = function() {
	openfl_display_DisplayObjectContainer.call(this);
	this.buttonMode = false;
	this.useHandCursor = true;
	this.loaderInfo = openfl_display_LoaderInfo.create(null);
};
$hxClasses["openfl.display.Sprite"] = openfl_display_Sprite;
openfl_display_Sprite.__name__ = true;
openfl_display_Sprite.__super__ = openfl_display_DisplayObjectContainer;
openfl_display_Sprite.prototype = $extend(openfl_display_DisplayObjectContainer.prototype,{
	__getCursor: function() {
		if(this.buttonMode && this.useHandCursor) return lime_ui_MouseCursor.POINTER; else return null;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || interactiveOnly && !this.mouseEnabled) return false;
		var length = 0;
		if(stack != null) length = stack.length;
		if(openfl_display_DisplayObjectContainer.prototype.__hitTest.call(this,x,y,shapeFlag,stack,interactiveOnly)) return interactiveOnly; else if(this.__graphics != null && this.__graphics.__hitTest(x,y,shapeFlag,this.__getTransform())) {
			if(stack != null) stack.push(this);
			return true;
		}
		return false;
	}
	,get_graphics: function() {
		if(this.__graphics == null) {
			this.__graphics = new openfl_display_Graphics();
			this.__graphics.__owner = this;
		}
		return this.__graphics;
	}
	,__class__: openfl_display_Sprite
	,__properties__: $extend(openfl_display_DisplayObjectContainer.prototype.__properties__,{get_graphics:"get_graphics"})
});
var Main = function() {
	openfl_display_Sprite.call(this);
	this.stage.align = openfl_display_StageAlign.TOP_LEFT;
	this.stage.scaleMode = openfl_display_StageScaleMode.NO_SCALE;
	this.gameLayer = new game_GameLayer();
	this.addChild(this.gameLayer);
	this.fps = new openfl_display_FPS(10,10,16777215);
	this.fps.set_scaleX(this.fps.set_scaleY(2));
	this.addChild(this.fps);
	openfl_Lib.current.stage.addEventListener(openfl_events_Event.RESIZE,$bind(this,this.stage_onResize));
};
$hxClasses["Main"] = Main;
Main.__name__ = true;
Main.__super__ = openfl_display_Sprite;
Main.prototype = $extend(openfl_display_Sprite.prototype,{
	stage_onResize: function(e) {
		this.resize(openfl_Lib.current.stage.stageWidth,openfl_Lib.current.stage.stageHeight);
	}
	,resize: function(stageWidth,stageHeight) {
		this.gameLayer.set_x((stageWidth - 480) / 2);
		this.gameLayer.set_y((stageHeight - 640) / 2);
		this.fps.set_x(this.gameLayer.get_x() + 10);
		this.fps.set_y(this.gameLayer.get_y() + 10);
	}
	,__class__: Main
});
var DocumentClass = function() {
	openfl_Lib.current.addChild(this);
	Main.call(this);
	this.dispatchEvent(new openfl_events_Event(openfl_events_Event.ADDED_TO_STAGE,false,false));
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = true;
DocumentClass.__super__ = Main;
DocumentClass.prototype = $extend(Main.prototype,{
	__class__: DocumentClass
});
var CFGFile = function(soruce) {
	if(soruce == null) soruce = "";
	this.map = new haxe_ds_StringMap();
	this.parse(soruce);
};
$hxClasses["CFGFile"] = CFGFile;
CFGFile.__name__ = true;
CFGFile.prototype = {
	getText: function(key) {
		return this.map.get(key);
	}
	,parse: function(_source) {
		this.soruce = _source;
		var parts = this.soruce.split("\r\n");
		var _g1 = 0;
		var _g = parts.length;
		while(_g1 < _g) {
			var i = _g1++;
			var valuePair = parts[i];
			if(valuePair.length < 3) continue;
			var separatorIndex = valuePair.indexOf("=");
			var key = HxOverrides.substr(valuePair,0,separatorIndex);
			var value = HxOverrides.substr(valuePair,separatorIndex + 1,null).split("|").join("\r").split("//")[0];
			this.map.set(key,value);
		}
	}
	,__class__: CFGFile
};
var lime_AssetLibrary = function() {
};
$hxClasses["lime.AssetLibrary"] = lime_AssetLibrary;
lime_AssetLibrary.__name__ = true;
lime_AssetLibrary.prototype = {
	exists: function(id,type) {
		return false;
	}
	,getBytes: function(id) {
		return null;
	}
	,getImage: function(id) {
		return null;
	}
	,getText: function(id) {
		var bytes = this.getBytes(id);
		if(bytes == null) return null; else return bytes.readUTFBytes(bytes.length);
	}
	,isLocal: function(id,type) {
		return true;
	}
	,__class__: lime_AssetLibrary
};
var DefaultAssetLibrary = function() {
	this.type = new haxe_ds_StringMap();
	this.path = new haxe_ds_StringMap();
	lime_AssetLibrary.call(this);
	var id;
	id = "characters/death/config.cfg";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "characters/death/texture.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "characters/mage/config.cfg";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "characters/mage/texture.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "characters/superdeath/config.cfg";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "characters/superdeath/texture.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "tiles/JapaneseVillage.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "tiles/map.txt";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	var assetsPrefix = ApplicationMain.config.assetsPrefix;
	if(assetsPrefix != null) {
		var $it0 = this.path.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			var value = assetsPrefix + this.path.get(k);
			this.path.set(k,value);
		}
	}
};
$hxClasses["DefaultAssetLibrary"] = DefaultAssetLibrary;
DefaultAssetLibrary.__name__ = true;
DefaultAssetLibrary.__super__ = lime_AssetLibrary;
DefaultAssetLibrary.prototype = $extend(lime_AssetLibrary.prototype,{
	exists: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js_Boot.__cast(type , String); else requestedType = null;
		var assetType = this.type.get(id);
		if(assetType != null) {
			if(assetType == requestedType || (requestedType == "SOUND" || requestedType == "MUSIC") && (assetType == "MUSIC" || assetType == "SOUND")) return true;
			if(requestedType == "BINARY" || requestedType == null || assetType == "BINARY" && requestedType == "TEXT") return true;
		}
		return false;
	}
	,getBytes: function(id) {
		var bytes = null;
		var data;
		data = ((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = lime_app_Preloader.loaders.get(key);
			return $r;
		}(this))).data;
		if(typeof(data) == "string") {
			bytes = new lime_utils_ByteArray();
			bytes.writeUTFBytes(data);
		} else if(js_Boot.__instanceof(data,lime_utils_ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes;
		} else return null;
	}
	,getImage: function(id) {
		return lime_graphics_Image.fromImageElement((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = lime_app_Preloader.images.get(key);
			return $r;
		}(this)));
	}
	,getText: function(id) {
		var bytes = null;
		var data;
		data = ((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = lime_app_Preloader.loaders.get(key);
			return $r;
		}(this))).data;
		if(typeof(data) == "string") return data; else if(js_Boot.__instanceof(data,lime_utils_ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes.readUTFBytes(bytes.length);
		} else return null;
	}
	,isLocal: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js_Boot.__cast(type , String); else requestedType = null;
		return true;
	}
	,__class__: DefaultAssetLibrary
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
Math.__name__ = true;
var NMEPreloader = function() {
	openfl_display_Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 7;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 2;
	this.outline = new openfl_display_Sprite();
	this.outline.get_graphics().beginFill(color,0.07);
	this.outline.get_graphics().drawRect(0,0,width,height);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new openfl_display_Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = true;
NMEPreloader.__super__ = openfl_display_Sprite;
NMEPreloader.prototype = $extend(openfl_display_Sprite.prototype,{
	getBackgroundColor: function() {
		return 0;
	}
	,getHeight: function() {
		var height = 0;
		if(height > 0) return height; else return openfl_Lib.current.stage.stageHeight;
	}
	,getWidth: function() {
		var width = 0;
		if(width > 0) return width; else return openfl_Lib.current.stage.stageWidth;
	}
	,onInit: function() {
	}
	,onLoaded: function() {
		this.dispatchEvent(new openfl_events_Event(openfl_events_Event.COMPLETE));
	}
	,onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded = 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,__class__: NMEPreloader
});
var lime_text_Font = function() { };
$hxClasses["lime.text.Font"] = lime_text_Font;
lime_text_Font.__name__ = true;
lime_text_Font.prototype = {
	getGlyphs: function(characters) {
		if(characters == null) characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^`'\"/\\&*()[]{}<>|:;_-+=?,. ";
		return null;
	}
	,renderGlyphs: function(glyphs,fontSize) {
		return null;
	}
	,get_ascender: function() {
		return 0;
	}
	,get_descender: function() {
		return 0;
	}
	,get_unitsPerEM: function() {
		return 0;
	}
	,__class__: lime_text_Font
	,__properties__: {get_unitsPerEM:"get_unitsPerEM",get_descender:"get_descender",get_ascender:"get_ascender"}
};
var openfl_text_Font = function() { };
$hxClasses["openfl.text.Font"] = openfl_text_Font;
openfl_text_Font.__name__ = true;
openfl_text_Font.registerFont = function(font) {
	var instance;
	instance = js_Boot.__cast(Type.createInstance(font,[]) , openfl_text_Font);
	if(instance != null) openfl_text_Font.__registeredFonts.push(instance);
};
openfl_text_Font.__super__ = lime_text_Font;
openfl_text_Font.prototype = $extend(lime_text_Font.prototype,{
	__class__: openfl_text_Font
});
var DefaultFont = function() { };
$hxClasses["DefaultFont"] = DefaultFont;
DefaultFont.__name__ = true;
DefaultFont.__super__ = openfl_text_Font;
DefaultFont.prototype = $extend(openfl_text_Font.prototype,{
	__class__: DefaultFont
});
var openfl_display_BitmapData = function(width,height,transparent,fillColor) {
	if(fillColor == null) fillColor = -1;
	if(transparent == null) transparent = true;
	this.__usingFramebuffer = false;
	this.transparent = transparent;
	if(width == null) width = 0; else width = width;
	if(height == null) height = 0; else height = height;
	if(width < 0) width = 0; else width = width;
	if(height < 0) height = 0; else height = height;
	this.width = width;
	this.height = height;
	this.rect = new openfl_geom_Rectangle(0,0,width,height);
	if(width > 0 && height > 0) {
		if(transparent) {
			if((fillColor & -16777216) == 0) fillColor = 0;
		} else fillColor = -16777216 | fillColor & 16777215;
		fillColor = fillColor << 8 | fillColor >> 24 & 255;
		this.__image = new lime_graphics_Image(null,0,0,width,height,fillColor);
		this.__image.set_transparent(transparent);
		this.__isValid = true;
	}
	this.__createUVs();
	this.__worldTransform = new openfl_geom_Matrix();
	this.__worldColorTransform = new openfl_geom_ColorTransform();
};
$hxClasses["openfl.display.BitmapData"] = openfl_display_BitmapData;
openfl_display_BitmapData.__name__ = true;
openfl_display_BitmapData.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_BitmapData.fromImage = function(image,transparent) {
	if(transparent == null) transparent = true;
	var bitmapData = new openfl_display_BitmapData(0,0,transparent);
	bitmapData.__fromImage(image);
	bitmapData.__image.set_transparent(transparent);
	return bitmapData;
};
openfl_display_BitmapData.prototype = {
	copyChannel: function(sourceBitmapData,sourceRect,destPoint,sourceChannel,destChannel) {
		if(!this.__isValid) return;
		var sourceChannel1;
		switch(sourceChannel) {
		case 1:
			sourceChannel1 = lime_graphics_ImageChannel.RED;
			break;
		case 2:
			sourceChannel1 = lime_graphics_ImageChannel.GREEN;
			break;
		case 4:
			sourceChannel1 = lime_graphics_ImageChannel.BLUE;
			break;
		case 8:
			sourceChannel1 = lime_graphics_ImageChannel.ALPHA;
			break;
		default:
			return;
		}
		var destChannel1;
		switch(destChannel) {
		case 1:
			destChannel1 = lime_graphics_ImageChannel.RED;
			break;
		case 2:
			destChannel1 = lime_graphics_ImageChannel.GREEN;
			break;
		case 4:
			destChannel1 = lime_graphics_ImageChannel.BLUE;
			break;
		case 8:
			destChannel1 = lime_graphics_ImageChannel.ALPHA;
			break;
		default:
			return;
		}
		this.__image.copyChannel(sourceBitmapData.__image,sourceRect.__toLimeRectangle(),destPoint.__toLimeVector2(),sourceChannel1,destChannel1);
		this.__usingFramebuffer = false;
	}
	,copyPixels: function(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		if(!this.__isValid || sourceBitmapData == null) return;
		this.__image.copyPixels(sourceBitmapData.__image,sourceRect.__toLimeRectangle(),destPoint.__toLimeVector2(),alphaBitmapData != null?alphaBitmapData.__image:null,alphaPoint != null?alphaPoint.__toLimeVector2():null,mergeAlpha);
		this.__usingFramebuffer = false;
	}
	,draw: function(source,matrix,colorTransform,blendMode,clipRect,smoothing) {
		if(smoothing == null) smoothing = false;
		if(!this.__isValid) return;
		var _g = this.__image.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this.__image);
			lime_graphics_utils_ImageCanvasUtil.sync(this.__image);
			var buffer = this.__image.buffer;
			var renderSession = new openfl__$internal_renderer_RenderSession();
			renderSession.context = buffer.__srcContext;
			renderSession.roundPixels = true;
			if(!smoothing) {
				buffer.__srcContext.mozImageSmoothingEnabled = false;
				buffer.__srcContext.imageSmoothingEnabled = false;
				buffer.__srcContext.imageSmoothingEnabled = false;
			}
			var matrixCache = source.__worldTransform;
			if(matrix != null) source.__worldTransform = matrix; else source.__worldTransform = new openfl_geom_Matrix();
			source.__updateChildren(false);
			source.__renderCanvas(renderSession);
			source.__worldTransform = matrixCache;
			source.__updateChildren(true);
			if(!smoothing) {
				buffer.__srcContext.mozImageSmoothingEnabled = true;
				buffer.__srcContext.imageSmoothingEnabled = true;
				buffer.__srcContext.imageSmoothingEnabled = true;
			}
			buffer.__srcContext.setTransform(1,0,0,1,0,0);
			break;
		case 1:
			var renderSession1 = openfl_Lib.current.stage.__renderer.renderSession;
			this.__drawGL(renderSession1,this.width,this.height,source,matrix,colorTransform,blendMode,clipRect,smoothing,!this.__usingFramebuffer,false,true);
			break;
		default:
		}
	}
	,getSurface: function() {
		if(!this.__isValid) return null;
		if(this.__surface == null) this.__image.dirty = true;
		if(this.__image != null && this.__image.dirty) {
			if(this.__surface != null) lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.destroy(this.__surface);
			this.__surfaceImage = this.__image.clone();
			this.__surfaceImage.set_format(2);
			this.__surfaceImage.set_premultiplied(true);
			this.__surface = lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.fromImage(this.__surfaceImage);
			this.__image.dirty = false;
		}
		return this.__surface;
	}
	,getTexture: function(gl) {
		if(!this.__isValid) return null;
		if(this.__usingFramebuffer && this.__framebuffer != null) return this.__framebuffer.texture;
		if(this.__texture == null) {
			this.__texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D,this.__texture);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
			this.__image.dirty = true;
		}
		if(this.__image != null && this.__image.dirty) {
			var format;
			if(this.__image.buffer.bitsPerPixel == 1) format = gl.ALPHA; else format = gl.RGBA;
			gl.bindTexture(gl.TEXTURE_2D,this.__texture);
			var textureImage = this.__image.clone();
			textureImage.set_premultiplied(true);
			gl.texImage2D(gl.TEXTURE_2D,0,format,this.width,this.height,0,format,gl.UNSIGNED_BYTE,textureImage.get_data());
			gl.bindTexture(gl.TEXTURE_2D,null);
			this.__image.dirty = false;
		}
		return this.__texture;
	}
	,setPixel32: function(x,y,color) {
		if(!this.__isValid) return;
		this.__image.setPixel32(x,y,color,1);
		this.__usingFramebuffer = false;
	}
	,__createUVs: function() {
		if(this.__uvData == null) this.__uvData = new openfl_display_TextureUvs();
		this.__uvData.x0 = 0;
		this.__uvData.y0 = 0;
		this.__uvData.x1 = 1;
		this.__uvData.y1 = 0;
		this.__uvData.x2 = 1;
		this.__uvData.y2 = 1;
		this.__uvData.x3 = 0;
		this.__uvData.y3 = 1;
	}
	,__drawGL: function(renderSession,width,height,source,matrix,colorTransform,blendMode,clipRect,smoothing,drawSelf,clearBuffer,readPixels) {
		if(readPixels == null) readPixels = false;
		if(clearBuffer == null) clearBuffer = false;
		if(drawSelf == null) drawSelf = false;
		if(smoothing == null) smoothing = false;
		var renderer = openfl_Lib.current.stage.__renderer;
		if(renderer == null) return;
		var renderSession1 = renderer.renderSession;
		var gl = renderSession1.gl;
		if(gl == null) return;
		var spritebatch = renderSession1.spriteBatch;
		var renderTransparent = renderSession1.renderer.transparent;
		var tmpRect;
		if(clipRect == null) tmpRect = new openfl_geom_Rectangle(0,0,width,height); else tmpRect = clipRect.clone();
		renderSession1.renderer.transparent = this.transparent;
		if(this.__framebuffer == null) this.__framebuffer = new openfl__$internal_renderer_opengl_utils_FilterTexture(gl,width,height,smoothing);
		this.__framebuffer.resize(width,height);
		gl.bindFramebuffer(gl.FRAMEBUFFER,this.__framebuffer.frameBuffer);
		renderer.setViewport(0,0,width,height);
		spritebatch.begin(renderSession1,drawSelf?null:tmpRect);
		gl.colorMask(true,true,true,true);
		renderSession1.blendModeManager.setBlendMode(openfl_display_BlendMode.NORMAL);
		renderSession1.shaderManager.setShader(renderSession1.shaderManager.defaultShader,true);
		if(clearBuffer || drawSelf) this.__framebuffer.clear();
		if(drawSelf) {
			this.__worldTransform.identity();
			this.__flipMatrix(this.__worldTransform);
			this.__renderGL(renderSession1);
			spritebatch.stop();
			gl.deleteTexture(this.__texture);
			spritebatch.start(tmpRect);
		}
		var ctCache = source.__worldColorTransform;
		var matrixCache = source.__worldTransform;
		var blendModeCache = source.blendMode;
		var cached = source.__cacheAsBitmap;
		var m;
		if(matrix != null) m = new openfl_geom_Matrix(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty); else m = new openfl_geom_Matrix();
		this.__flipMatrix(m);
		source.__worldTransform = m;
		if(colorTransform != null) source.__worldColorTransform = colorTransform; else source.__worldColorTransform = new openfl_geom_ColorTransform();
		source.blendMode = blendMode;
		source.__cacheAsBitmap = false;
		source.__updateChildren(false);
		source.__renderGL(renderSession1);
		source.__worldColorTransform = ctCache;
		source.__worldTransform = matrixCache;
		source.blendMode = blendModeCache;
		source.__cacheAsBitmap = cached;
		source.__updateChildren(true);
		spritebatch.finish();
		if(readPixels) {
			if(this.__image.width != width || this.__image.height != height) this.__image.resize(width,height);
			gl.readPixels(0,0,width,height,gl.RGBA,gl.UNSIGNED_BYTE,this.__image.buffer.data);
		}
		gl.bindFramebuffer(gl.FRAMEBUFFER,renderSession1.defaultFramebuffer);
		renderer.setViewport(0,0,renderSession1.renderer.width,renderSession1.renderer.height);
		renderSession1.renderer.transparent = renderTransparent;
		gl.colorMask(true,true,true,renderSession1.renderer.transparent);
		this.__usingFramebuffer = true;
		if(this.__image != null) {
			this.__image.dirty = false;
			this.__image.set_premultiplied(true);
		}
		this.__createUVs();
		this.__isValid = true;
	}
	,__flipMatrix: function(m) {
		var tx = m.tx;
		var ty = m.ty;
		m.tx = 0;
		m.ty = 0;
		m.scale(1,-1);
		m.translate(0,this.height);
		m.tx += tx;
		m.ty -= ty;
	}
	,__fromBase64: function(base64,type,onload) {
		var _g = this;
		lime_graphics_Image.fromBase64(base64,type,function(image) {
			_g.__fromImage(image);
			if(onload != null) onload(_g);
		});
	}
	,__fromImage: function(image) {
		this.__image = image;
		this.width = image.width;
		this.height = image.height;
		this.rect = new openfl_geom_Rectangle(0,0,image.width,image.height);
		this.__isValid = true;
	}
	,__renderCanvas: function(renderSession) {
		if(!this.__isValid) return;
		lime_graphics_utils_ImageCanvasUtil.sync(this.__image);
		var context = renderSession.context;
		if(this.__worldTransform == null) this.__worldTransform = new openfl_geom_Matrix();
		context.globalAlpha = 1;
		var transform = this.__worldTransform;
		if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
		context.drawImage(this.__image.buffer.get_src(),0,0);
	}
	,__renderGL: function(renderSession) {
		renderSession.spriteBatch.renderBitmapData(this,false,this.__worldTransform,this.__worldColorTransform,this.__worldColorTransform.alphaMultiplier,this.blendMode);
	}
	,__sync: function() {
		lime_graphics_utils_ImageCanvasUtil.sync(this.__image);
	}
	,__updateChildren: function(transformOnly) {
	}
	,__class__: openfl_display_BitmapData
};
var Splash = function(width,height,transparent,fillRGBA,onload) {
	if(fillRGBA == null) fillRGBA = -1;
	if(transparent == null) transparent = true;
	openfl_display_BitmapData.call(this,0,0,transparent,fillRGBA);
	if(Splash.preload != null) {
		this.__image = Splash.preload;
		width = this.__image.width;
		height = this.__image.height;
	} else this.__fromBase64(haxe_Resource.getString(Splash.resourceName),Splash.resourceType,function(b) {
		if(Splash.preload == null) Splash.preload = b.__image;
		if(onload != null) onload(b);
	});
};
$hxClasses["Splash"] = Splash;
Splash.__name__ = true;
Splash.preload = null;
Splash.__super__ = openfl_display_BitmapData;
Splash.prototype = $extend(openfl_display_BitmapData.prototype,{
	__class__: Splash
});
var Preloader = function() {
	this._skipped_frames = 1;
	this.oscillatorDirection = -1;
	this.oscillator = 1.0;
	NMEPreloader.call(this);
	this.init();
	this.stage_onResize(null);
	openfl_Lib.current.stage.addEventListener(openfl_events_Event.RESIZE,$bind(this,this.stage_onResize));
	openfl_Lib.current.stage.addEventListener(openfl_events_Event.ENTER_FRAME,$bind(this,this.onFrame));
	openfl_Lib.current.stage.addEventListener(openfl_events_MouseEvent.CLICK,$bind(this,this.onCompleteClick),false,0,true);
	this.addEventListener(openfl_events_Event.COMPLETE,$bind(this,this.onComplete));
};
$hxClasses["Preloader"] = Preloader;
Preloader.__name__ = true;
Preloader.__super__ = NMEPreloader;
Preloader.prototype = $extend(NMEPreloader.prototype,{
	onCompleteClick: function(e) {
		NMEPreloader.prototype.onLoaded.call(this);
	}
	,onLoaded: function() {
		this.textLoading.set_text(Preloader.stringComplete);
		this.resize(this.ww,this.hh);
	}
	,onComplete: function(event) {
		openfl_Lib.current.stage.set_color(this.originalBackgroundColor);
		openfl_Lib.current.stage.removeEventListener(openfl_events_Event.RESIZE,$bind(this,this.stage_onResize));
		openfl_Lib.current.stage.removeEventListener(openfl_events_Event.ENTER_FRAME,$bind(this,this.onFrame));
		openfl_Lib.current.stage.removeEventListener(openfl_events_MouseEvent.CLICK,$bind(this,this.onCompleteClick));
	}
	,init: function() {
		openfl_text_Font.registerFont(DefaultFont);
		this.originalBackgroundColor = openfl_Lib.current.stage.get_color();
		openfl_Lib.current.stage.set_color(Preloader.backgroundColor);
		this.splash = new openfl_display_Bitmap(new Splash(0,0));
		this.splash.smoothing = true;
		this.addChild(this.splash);
		this.splashHeight = 500;
		this.textPercent = new openfl_text_TextField();
		this.textPercent.embedFonts = true;
		this.textPercent.set_selectable(false);
		this.textPercent.set_text("0%");
		this.addChild(this.textPercent);
		this.textLoading = new openfl_text_TextField();
		this.textLoading.embedFonts = true;
		this.textLoading.set_selectable(false);
		this.textLoading.set_text(Preloader.stringLoading);
		this.addChild(this.textLoading);
	}
	,stage_onResize: function(event) {
		this.resize(openfl_Lib.current.stage.stageWidth,openfl_Lib.current.stage.stageHeight);
	}
	,resize: function(newWidth,newHeight) {
		this.ww = newWidth;
		this.hh = newHeight;
		this.h = 0.05 * this.hh;
		this.w = 0.9 * this.ww;
		this.p = this.hh / 100;
		this.r = this.hh / 50;
		this.t = this.hh / 250;
		var x = (this.ww - this.w) / 2;
		var y = this.hh * 0.8;
		var scale = this.hh / 2 / this.splashHeight;
		var splashSize = this.splashHeight * scale;
		this.splash.set_scaleX(scale);
		this.splash.set_scaleY(scale);
		this.splash.set_x(this.ww / 2 - splashSize / 2);
		this.splash.set_y(this.hh / 3 - splashSize / 2);
		this.outline.set_x(x - this.p);
		this.outline.set_y(y - this.p);
		this.outline.get_graphics().clear();
		this.outline.get_graphics().lineStyle(this.t,Preloader.color,1,true);
		this.outline.get_graphics().drawRoundRect(0,0,this.w + 2 * this.p,this.h + 2 * this.p,this.r * 2,this.r * 2);
		this.progress.set_x(x);
		this.progress.set_y(y);
		this.progress.set_scaleX(1);
		this.progress.get_graphics().clear();
		this.progress.get_graphics().beginFill(Preloader.color,0.5);
		this.progress.get_graphics().drawRoundRect(0,0,this.w,this.h,this.r,this.r);
		this.progress.get_graphics().endFill();
		var formatLoading = new openfl_text_TextFormat("SquareFont",this.hh / 20,Preloader.color);
		this.textLoading.set_defaultTextFormat(formatLoading);
		this.textLoading.setTextFormat(formatLoading);
		this.textLoading.set_autoSize(openfl_text_TextFieldAutoSize.LEFT);
		this.textLoading.set_x(this.ww / 2 - this.textLoading.get_textWidth() / 2);
		this.textLoading.set_y(y - this.textLoading.get_textHeight() - 0.5 * this.h);
		var formatPercent = new openfl_text_TextFormat("SquareFont",this.hh / 20,Preloader.color);
		this.textPercent.set_defaultTextFormat(formatPercent);
		this.textPercent.setTextFormat(formatPercent);
		this.textPercent.set_autoSize(openfl_text_TextFieldAutoSize.RIGHT);
		this.textPercent.set_x(this.ww - (this.ww - this.w) / 2 - this.textPercent.get_textWidth());
		this.textPercent.set_y(y + 1.5 * this.h);
	}
	,onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded = 1;
		this.textPercent.set_text((percentLoaded * 100 | 0) + "%");
		this.textPercent.set_x(this.ww - (this.ww - this.w) / 2 - this.textPercent.get_textWidth());
		this.progress.get_graphics().clear();
		this.progress.get_graphics().beginFill(Preloader.color,0.8);
		this.progress.get_graphics().drawRoundRect(0,0,percentLoaded * this.w,this.h,this.r,this.r);
		this.progress.get_graphics().endFill();
	}
	,onFrame: function(event) {
		if(this._skipped_frames == 5) {
			this.oscillator += this.oscillatorDirection * 0.06;
			if(this.oscillator > 1) {
				this.oscillatorDirection = -1;
				this.oscillator = 1.0;
			}
			if(this.oscillator < 0.3) {
				this.oscillatorDirection = 1;
				this.oscillator = 0.3;
			}
			this.textLoading.set_alpha(this.oscillator);
			this.outline.set_alpha(this.oscillator);
			this._skipped_frames = 0;
		}
		this._skipped_frames++;
	}
	,__class__: Preloader
});
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
var Scene = function() {
	this.paused = false;
	this.lastTime = 0;
	this.animatedSprites = [];
	openfl_display_Sprite.call(this);
	openfl_Lib.current.stage.addEventListener(openfl_events_Event.DEACTIVATE,$bind(this,this.onMouseOut));
	openfl_Lib.current.stage.addEventListener(openfl_events_MouseEvent.MOUSE_DOWN,$bind(this,this.onMouseDown));
	this.addEventListener(openfl_events_Event.ENTER_FRAME,$bind(this,this.onUpdate));
};
$hxClasses["Scene"] = Scene;
Scene.__name__ = true;
Scene.__super__ = openfl_display_Sprite;
Scene.prototype = $extend(openfl_display_Sprite.prototype,{
	onMouseDown: function(e) {
		this.paused = false;
		motion_Actuate.resumeAll();
	}
	,onMouseOut: function(e) {
		this.paused = true;
		motion_Actuate.pauseAll();
	}
	,onUpdate: function(e) {
		if(this.paused) return;
		var time = openfl_Lib.getTimer();
		if(this.lastTime == 0) this.lastTime = time;
		this.delta = time - this.lastTime;
		this.lastTime = time;
		var _g = 0;
		var _g1 = this.animatedSprites;
		while(_g < _g1.length) {
			var sprite = _g1[_g];
			++_g;
			sprite.update(this.delta);
		}
	}
	,__class__: Scene
});
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"__meta__");
	HxOverrides.remove(a,"prototype");
	return a;
};
var game_Background = function(__width,__height) {
	openfl_display_Sprite.call(this);
	this.__width = __width;
	this.__height = __height;
	this.initialize();
};
$hxClasses["game.Background"] = game_Background;
game_Background.__name__ = true;
game_Background.__super__ = openfl_display_Sprite;
game_Background.prototype = $extend(openfl_display_Sprite.prototype,{
	udpate: function() {
		var _g = this.container;
		var _g1 = _g.get_y();
		_g.set_y(_g1 + 1);
		_g1;
		if(this.container.get_y() > -32) this.container.set_y(-64);
	}
	,initialize: function() {
		this.container = new openfl_display_Sprite();
		this.addChild(this.container);
		var tile = new openfl_display_Tilesheet(openfl_Assets.getBitmapData("tiles/JapaneseVillage.png"));
		tile.addTileRect(new openfl_geom_Rectangle(0,0,32,32));
		tile.addTileRect(new openfl_geom_Rectangle(0,64,32,32));
		var wSize;
		wSize = js_Boot.__cast(this.__width / 32 , Int);
		var hSize;
		hSize = js_Boot.__cast(this.__height / 32 , Int) + 2;
		var x = 0;
		var y = 0;
		var _g = 0;
		while(_g < hSize) {
			var j = _g++;
			var _g1 = 0;
			while(_g1 < wSize) {
				var i = _g1++;
				if(i == 7) tile.drawTiles(this.container.get_graphics(),[x,y,0],false); else tile.drawTiles(this.container.get_graphics(),[x,y,1],false);
				x += 32;
			}
			y += 32;
			x = 0;
		}
		this.set_scrollRect(new openfl_geom_Rectangle(0,0,this.__width,this.__height));
		this.container.set_y(-64);
	}
	,__class__: game_Background
});
var game_EnemiesController = function(convas,__width,__heigt) {
	this.side = true;
	this.spawnCount = 0;
	this.rate = 96;
	this.yStep = 0;
	this.canBeHitted = true;
	this.mouseDownState = false;
	this.enemies = [];
	this.convas = convas;
	this.character = convas.character;
	this.__width = __width;
	this.__heigt = __heigt;
	convas.addEventListener(openfl_events_MouseEvent.MOUSE_DOWN,$bind(this,this.onMouseDown));
	convas.addEventListener(openfl_events_MouseEvent.MOUSE_UP,$bind(this,this.onMouseUp));
	convas.addEventListener(openfl_events_MouseEvent.MOUSE_OUT,$bind(this,this.onMouseOut));
};
$hxClasses["game.EnemiesController"] = game_EnemiesController;
game_EnemiesController.__name__ = true;
game_EnemiesController.prototype = {
	onMouseOut: function(e) {
		if(e.currentTarget == this.convas) this.onMouseUp(e);
	}
	,onMouseUp: function(e) {
		this.mouseDownState = false;
		var _g = 0;
		var _g1 = this.enemies;
		while(_g < _g1.length) {
			var enemy = _g1[_g];
			++_g;
			if(enemy.bindToMouse == false) continue;
			enemy.bindToMouse = false;
			enemy.start(enemy.content.get_x(),enemy.content.get_y());
		}
	}
	,onMouseDown: function(e) {
		this.mouseDownState = true;
	}
	,start: function() {
		var _g = 0;
		while(_g < 6) {
			var i = _g++;
			this.addSimpleEnemy(0,96 * i);
		}
		this.spawnCount = 0;
	}
	,update: function() {
		if(this.yStep == this.rate) {
			this.yStep = 0;
			if(this.spawnCount == 10) this.addStrongEnemy(); else if(this.spawnCount > 10) {
				this.rate = 48;
				if(Math.random() > 0.85) this.addStrongEnemy(); else this.addSimpleEnemy();
			} else this.addSimpleEnemy();
		}
		this.convas.overlay.get_graphics().clear();
		var _g = 0;
		var _g1 = this.enemies;
		while(_g < _g1.length) {
			var enemy = _g1[_g];
			++_g;
			var _g2 = enemy.content;
			var _g3 = _g2.get_y();
			_g2.set_y(_g3 + 1);
			_g3;
			if(enemy.content.get_y() > this.__heigt + enemy.content.get_height()) {
				HxOverrides.remove(this.enemies,enemy);
				this.convas.removeAnimation(enemy.content);
				enemy.destroy();
				continue;
			}
			if(enemy.bindToMouse) {
				var xVal = (this.convas.get_mouseX() - enemy.content.get_x()) / 10;
				var _g21 = enemy.content;
				_g21.set_x(_g21.get_x() + xVal);
				if(xVal > 0) {
					if(enemy.content.currentBehavior != null && enemy.content.currentBehavior.name != "r") enemy.content.showBehavior("r");
				} else if(enemy.content.currentBehavior != null && enemy.content.currentBehavior.name != "l") enemy.content.showBehavior("l");
				this.convas.overlay.get_graphics().lineStyle(1,0);
				this.convas.overlay.get_graphics().moveTo(enemy.content.get_x() + enemy.content.get_width() / 2,enemy.content.get_y() + enemy.content.get_height() / 2);
				this.convas.overlay.get_graphics().lineTo(this.convas.get_mouseX(),this.convas.get_mouseY());
			} else if(this.mouseDownState == true && this.isInside(this.convas.get_mouseX(),this.convas.get_mouseY(),enemy.content)) {
				enemy.bindToMouse = true;
				enemy.stop();
			}
			if(this.canBeHitted && (this.isInside(this.character.get_x(),this.character.get_y(),enemy.content) || this.isInside(this.character.get_x() + this.character.get_width(),this.character.get_y() + this.character.get_height(),enemy.content))) this.onHit();
		}
		this.yStep++;
	}
	,onHit: function() {
		var _g = this.convas.gameModel;
		var _g1 = _g.get_liveCount();
		_g.set_liveCount(_g1 - 1);
		_g1;
		this.canBeHitted = false;
		this.character.set_alpha(1);
		this.character.set_visible(true);
		var repeat = 10;
		motion_Actuate.tween(this.character,1.5 / repeat,{ alpha : 0.7}).repeat(repeat).onComplete($bind(this,this.onAfterHit));
	}
	,onAfterHit: function() {
		motion_Actuate.tween(this.character,0.1,{ alpha : 1});
		this.canBeHitted = true;
	}
	,isInside: function(x,y,object) {
		return x > object.get_x() && x < object.get_x() + object.get_width() && y > object.get_y() && y < object.get_y() + object.get_height();
	}
	,addStrongEnemy: function() {
		return this.addEnemy("superdeath",120 + Math.random() * 60);
	}
	,addSimpleEnemy: function(x,y) {
		if(y == null) y = 0;
		if(x == null) x = 0;
		return this.addEnemy("death",60 + Math.random() * 20,x,y);
	}
	,addEnemy: function(path,speed,x,y) {
		if(y == null) y = 0;
		if(x == null) x = 0;
		this.spawnCount++;
		var __x = 32;
		if(!this.side) __x = this.__width - 32;
		this.side = !this.side;
		var content = game_SpriteBuilder.build(path);
		var enemyController = new game_EnemyController(content,this.__width,this.__heigt,speed);
		enemyController.start(x != 0?x:__x,y != 0?y - content.get_height():-content.get_height());
		this.enemies.push(enemyController);
		this.convas.addAnimation(content);
		return enemyController;
	}
	,__class__: game_EnemiesController
};
var game_EnemyController = function(content,__width,__height,speed) {
	this.bindToMouse = false;
	this.distance = 0;
	this.speed = speed;
	this.__width = __width;
	this.__height = __height;
	this.distance = __width - content.get_width() * 2;
	this.content = content;
};
$hxClasses["game.EnemyController"] = game_EnemyController;
game_EnemyController.__name__ = true;
game_EnemyController.prototype = {
	destroy: function() {
		motion_Actuate.stop(this.content,null,false,false);
		this.content = null;
	}
	,stop: function() {
		motion_Actuate.pause(this.content);
	}
	,start: function(x,y) {
		this.startX = this.content.get_width();
		this.content.set_x(x - this.content.get_width() / 2);
		this.content.set_y(y);
		if(x > this.__width / 2) this.moveLeft(); else this.moveRight();
	}
	,moveRight: function() {
		this.content.showBehavior("r");
		motion_Actuate.tween(this.content,this.distance / this.speed,{ x : this.startX + this.distance - this.content.get_width() / 2}).ease(motion_easing_Linear.get_easeNone()).onComplete($bind(this,this.onMoveRightEnd));
	}
	,onMoveRightEnd: function() {
		this.moveLeft();
	}
	,moveLeft: function() {
		this.content.showBehavior("l");
		motion_Actuate.tween(this.content,this.distance / this.speed,{ x : this.startX - this.content.get_width() / 2}).ease(motion_easing_Linear.get_easeNone()).onComplete($bind(this,this.onMoveLeftEnd));
	}
	,onMoveLeftEnd: function() {
		this.moveRight();
	}
	,__class__: game_EnemyController
};
var game_GameLayer = function() {
	this.allSprites = [];
	this.gameModel = new game_GameModel();
	this.charactersLayer = new openfl_display_Sprite();
	this.overlay = new openfl_display_Sprite();
	this.__height = 640;
	this.__width = 480;
	Scene.call(this);
	this.background = new game_Background(this.__width,this.__height);
	this.character = game_SpriteBuilder.build("mage");
	this.character.showBehavior("u");
	this.addAnimation(this.character);
	this.enemyController = new game_EnemiesController(this,this.__width,this.__height);
	openfl_Lib.current.stage.addEventListener(openfl_events_Event.RESIZE,$bind(this,this.stage_onResize));
	this.enemyController.start();
	this.overlay.mouseChildren = this.overlay.mouseEnabled = false;
	this.playBytton = new game_PlayButton(this.__width,this.__height);
	this.playBytton.mouseChildren = this.playBytton.mouseEnabled = false;
	this.charactersLayer.mouseChildren = this.charactersLayer.mouseEnabled = false;
	this.treesLayer = new game_TreeLayer(this.__width,this.__height,this.charactersLayer);
	this.background.cacheAsBitmap = true;
	this.playBytton.cacheAsBitmap = true;
	this.addChild(this.background);
	this.addChild(this.charactersLayer);
	this.addChild(this.treesLayer);
	this.addChild(this.overlay);
	this.addChild(this.playBytton);
	this.addChild(new game_UILayer(this.gameModel,this.__width,this.__height));
	this.set_scrollRect(new openfl_geom_Rectangle(0,0,this.__width,this.__height));
};
$hxClasses["game.GameLayer"] = game_GameLayer;
game_GameLayer.__name__ = true;
game_GameLayer.__super__ = Scene;
game_GameLayer.prototype = $extend(Scene.prototype,{
	removeAnimation: function(animatedSprite) {
		this.charactersLayer.removeChild(animatedSprite);
		HxOverrides.remove(this.animatedSprites,animatedSprite);
	}
	,addAnimation: function(animatedSprite) {
		this.charactersLayer.addChild(animatedSprite);
		this.animatedSprites.push(animatedSprite);
	}
	,stage_onResize: function(e) {
		this.resize(openfl_Lib.current.stage.stageWidth,openfl_Lib.current.stage.stageHeight);
	}
	,resize: function(stageWidth,stageHeight) {
		this.character.set_x((this.__width - this.character.get_width()) / 2);
		this.character.set_y(this.__height - 50 - this.character.get_height());
	}
	,onUpdate: function(e) {
		Scene.prototype.onUpdate.call(this,e);
		if(this.paused) {
			this.playBytton.set_visible(true);
			return;
		} else this.playBytton.set_visible(false);
		this.treesLayer.update();
		var _g = this.gameModel;
		_g.set_timeElapsed(_g.get_timeElapsed() + this.delta);
		this.enemyController.update();
		this.background.udpate();
		this.allSprites = [];
		var _g1 = 0;
		var _g2 = this.charactersLayer.get_numChildren();
		while(_g1 < _g2) {
			var index = _g1++;
			this.allSprites.push(js_Boot.__cast(this.charactersLayer.getChildAt(index) , openfl_display_Sprite));
		}
		haxe_ds_ArraySort.sort(this.allSprites,$bind(this,this.sortFunc));
		var _g11 = 0;
		var _g3 = this.allSprites.length;
		while(_g11 < _g3) {
			var i = _g11++;
			this.charactersLayer.setChildIndex(this.allSprites[i],i);
		}
	}
	,sortFunc: function(sprite1,sprite2) {
		if(js_Boot.__instanceof(sprite1,spritesheet_AnimatedSprite) && js_Boot.__instanceof(sprite2,spritesheet_AnimatedSprite)) {
			if(sprite1.get_y() > sprite2.get_y()) return 1; else return -1;
		}
		if(js_Boot.__instanceof(sprite1,game_TreeTiled) && js_Boot.__instanceof(sprite2,game_TreeTiled)) {
			if(sprite1.get_y() > sprite2.get_y()) return 1; else return -1;
		}
		var y1 = sprite1.get_y() + sprite1.get_height();
		var y2 = sprite2.get_y() + sprite2.get_height();
		if(js_Boot.__instanceof(sprite1,game_TreeTiled)) y1 = sprite1.get_y() + sprite1.get_height() - 28;
		if(js_Boot.__instanceof(sprite2,game_TreeTiled)) y2 = sprite2.get_y() + sprite2.get_height() - 28;
		if(y1 > y2) return 1; else if(y1 < y2) return -1; else return 0;
	}
	,__class__: game_GameLayer
});
var game_GameModel = function() {
	this.liveCount = 100;
	this.scores = 0;
	this.timeElapsed = 0;
};
$hxClasses["game.GameModel"] = game_GameModel;
game_GameModel.__name__ = true;
game_GameModel.prototype = {
	get_timeElapsed: function() {
		return this.timeElapsed;
	}
	,set_timeElapsed: function(value) {
		return this.timeElapsed = value;
	}
	,get_scores: function() {
		return this.scores;
	}
	,get_liveCount: function() {
		return this.liveCount;
	}
	,set_liveCount: function(value) {
		return this.liveCount = value;
	}
	,__class__: game_GameModel
	,__properties__: {set_liveCount:"set_liveCount",get_liveCount:"get_liveCount",get_scores:"get_scores",set_timeElapsed:"set_timeElapsed",get_timeElapsed:"get_timeElapsed"}
};
var game_PlayButton = function(__width,__height) {
	openfl_display_Sprite.call(this);
	this.__width = __width;
	this.__height = __height;
	var triWidth = 150;
	this.get_graphics().beginFill(0,0.5);
	this.get_graphics().drawRect(0,0,__width,__height);
	this.get_graphics().beginFill(0,0.8);
	var offsetX = 50;
	var offsetY = 50;
	var x = __width / 2 - triWidth + 1.5 + offsetX;
	var y = __height / 2 - triWidth + 3 + offsetY;
	this.get_graphics().moveTo(x,y);
	x += triWidth * 1.5 + 1.5;
	y += triWidth / 1.5;
	this.get_graphics().lineTo(x,y);
	y += triWidth / 1.5;
	x = __width / 2 - triWidth + 1.5 + offsetX;
	this.get_graphics().lineTo(x,y);
	x = __width / 2 - triWidth + 1.5 + offsetX;
	y = __height / 2 - triWidth + 3 + offsetY;
	this.get_graphics().lineTo(x,y);
	this.get_graphics().beginFill(13421772,0.8);
	x = __width / 2 - triWidth + offsetX;
	y = __height / 2 - triWidth + offsetY;
	this.get_graphics().moveTo(x,y);
	x += triWidth * 1.5;
	y += triWidth / 1.5;
	this.get_graphics().lineTo(x,y);
	y += triWidth / 1.5;
	x = __width / 2 - triWidth + offsetX;
	this.get_graphics().lineTo(x,y);
	x = __width / 2 - triWidth + offsetX;
	y = __height / 2 - triWidth + offsetY;
	this.get_graphics().lineTo(x,y);
};
$hxClasses["game.PlayButton"] = game_PlayButton;
game_PlayButton.__name__ = true;
game_PlayButton.__super__ = openfl_display_Sprite;
game_PlayButton.prototype = $extend(openfl_display_Sprite.prototype,{
	__class__: game_PlayButton
});
var game_SpriteBuilder = function() { };
$hxClasses["game.SpriteBuilder"] = game_SpriteBuilder;
game_SpriteBuilder.__name__ = true;
game_SpriteBuilder.build = function(path) {
	var rawContent = openfl_Assets.getText("characters/" + path + "/config.cfg");
	var cfg = new CFGFile(rawContent);
	var framesW = Std.parseInt(cfg.getText("framesW"));
	var framesH = Std.parseInt(cfg.getText("framesH"));
	var frameRate = Std.parseInt(cfg.getText("framerate"));
	var bmp = openfl_Assets.getBitmapData("characters/" + path + "/texture.png");
	var spritesheet1 = game_SpriteBuilder.spirtesheetCashe.get(path);
	if(spritesheet1 == null) {
		spritesheet1 = spritesheet_importers_BitmapImporter.create(bmp,framesW,framesH,js_Boot.__cast(bmp.width / framesW , Int),js_Boot.__cast(bmp.height / framesH , Int));
		spritesheet1.addBehavior(new spritesheet_data_BehaviorData("d",[0,1,2,3],true,frameRate));
		spritesheet1.addBehavior(new spritesheet_data_BehaviorData("l",[4,5,6,7],true,frameRate));
		spritesheet1.addBehavior(new spritesheet_data_BehaviorData("r",[8,9,10,11],true,frameRate));
		spritesheet1.addBehavior(new spritesheet_data_BehaviorData("u",[12,13,14,15],true,frameRate));
		game_SpriteBuilder.spirtesheetCashe.set(path,spritesheet1);
	}
	var sprite = new spritesheet_AnimatedSprite(spritesheet1,false);
	sprite.mouseChildren = sprite.mouseEnabled = false;
	sprite.showBehavior("d");
	sprite.cacheAsBitmap = true;
	return sprite;
};
var game_TreeLayer = function(__width,__height,convas) {
	this.__yOffset = 0;
	this.cashedTrees3 = [];
	this.cashedTrees2 = [];
	this.cashedTrees1 = [];
	this.trees = [];
	openfl_display_Sprite.call(this);
	this.convas = convas;
	this.__width = __width;
	this.__height = __height;
	this.mouseChildren = this.mouseEnabled = false;
	var _g = 0;
	while(_g < 10) {
		var i = _g++;
		this.cashedTrees1.push(new game_TreeTiled(0,15,4,5));
	}
	var _g1 = 0;
	while(_g1 < 10) {
		var i1 = _g1++;
		this.cashedTrees2.push(new game_TreeTiled(4,15,4,5));
	}
	var _g2 = 0;
	while(_g2 < 10) {
		var i2 = _g2++;
		this.cashedTrees3.push(new game_TreeTiled(4,9,4,4));
	}
	var _g3 = 0;
	while(_g3 < 5) {
		var i3 = _g3++;
		this.spawnTree(false,192 * i3);
		this.spawnTree(true,192 * i3);
	}
};
$hxClasses["game.TreeLayer"] = game_TreeLayer;
game_TreeLayer.__name__ = true;
game_TreeLayer.__super__ = openfl_display_Sprite;
game_TreeLayer.prototype = $extend(openfl_display_Sprite.prototype,{
	update: function() {
		if(this.__yOffset > 160) {
			if(Math.random() > 0.4) {
				if(Math.random() > 0.2) this.spawnTree(false);
				if(Math.random() > 0.2) this.spawnTree(true);
				this.__yOffset = 0;
			}
		}
		this.__yOffset += 1;
		var _g = 0;
		var _g1 = this.trees;
		while(_g < _g1.length) {
			var tree = _g1[_g];
			++_g;
			var _g2 = tree;
			var _g3 = _g2.get_y();
			_g2.set_y(_g3 + 1);
			_g3;
			if(tree.get_y() > this.__height) {
				this.convas.removeChild(tree);
				HxOverrides.remove(this.trees,tree);
				if(tree.type == 1) this.cashedTrees1.push(tree); else if(tree.type == 2) this.cashedTrees2.push(tree); else this.cashedTrees3.push(tree);
			}
		}
	}
	,spawnTree: function(right,y) {
		if(y == null) y = 0;
		var tree;
		var treeType = Math.random() * 100;
		if(treeType > 30 && treeType < 60) {
			tree = this.cashedTrees1.shift();
			tree.type = 1;
		} else if(treeType > 60) {
			tree = this.cashedTrees2.shift();
			tree.type = 2;
		} else {
			tree = this.cashedTrees3.shift();
			tree.type = 3;
		}
		tree.set_y(0);
		var _g = tree;
		_g.set_y(_g.get_y() - tree.get_height());
		var _g1 = tree;
		_g1.set_y(_g1.get_y() + y);
		if(right) {
			tree.set_scaleX(1);
			tree.set_x(this.__width - tree.get_width() / 1.6);
		} else {
			if(tree.get_scaleX() != -1) tree.set_scaleX(-1);
			tree.set_x(tree.get_width() / 1.6);
		}
		tree.set_alpha(0.85);
		this.convas.addChild(tree);
		this.trees.push(tree);
	}
	,__class__: game_TreeLayer
});
var game_TreeTiled = function(offsetX,offsetY,wSize,hSize) {
	this.type = 0;
	openfl_display_Sprite.call(this);
	this.hSize = hSize;
	this.wSize = wSize;
	this.cacheAsBitmap = true;
	this.container = new openfl_display_Sprite();
	this.addChild(this.container);
	this.set_scrollRect(new openfl_geom_Rectangle(0,0,wSize * 32,hSize * 32));
	var tile = new openfl_display_Tilesheet(openfl_Assets.getBitmapData("tiles/JapaneseVillage.png"));
	var x = offsetX * 32;
	var y = offsetY * 32;
	var _g = 0;
	while(_g < hSize) {
		var j = _g++;
		var _g1 = 0;
		while(_g1 < wSize) {
			var i = _g1++;
			tile.addTileRect(new openfl_geom_Rectangle(x,y,32,32));
			x += 32;
		}
		y += 32;
		x = offsetX * 32;
	}
	x = 0;
	y = 0;
	var c = 0;
	var _g2 = 0;
	while(_g2 < hSize) {
		var j1 = _g2++;
		var _g11 = 0;
		while(_g11 < wSize) {
			var i1 = _g11++;
			tile.drawTiles(this.container.get_graphics(),[x,y,c],false);
			c++;
			x += 32;
		}
		y += 32;
		x = 0;
	}
};
$hxClasses["game.TreeTiled"] = game_TreeTiled;
game_TreeTiled.__name__ = true;
game_TreeTiled.__super__ = openfl_display_Sprite;
game_TreeTiled.prototype = $extend(openfl_display_Sprite.prototype,{
	get_height: function() {
		return this.hSize * 32;
	}
	,get_width: function() {
		return this.wSize * 32;
	}
	,__class__: game_TreeTiled
});
var game_UILayer = function(model,__width,__height) {
	openfl_display_Sprite.call(this);
	this.__width = __width;
	this.__height = __height;
	this.model = model;
	this.createChildren();
	openfl_Lib.current.stage.addEventListener(openfl_events_Event.ENTER_FRAME,$bind(this,this.onUpdate));
	this.mouseChildren = this.mouseEnabled = false;
};
$hxClasses["game.UILayer"] = game_UILayer;
game_UILayer.__name__ = true;
game_UILayer.__super__ = openfl_display_Sprite;
game_UILayer.prototype = $extend(openfl_display_Sprite.prototype,{
	onUpdate: function(e) {
		this.scores.set_text("Score: " + this.model.get_scores());
		this.lives.set_text("Lives: " + this.model.get_liveCount());
		this.time.set_text("Time: " + Math.floor(this.model.get_timeElapsed() / 1000));
		this.layout();
	}
	,layout: function() {
		if(openfl_Lib.current.stage == null) return;
		var ww = this.__width;
		var hh = this.__height;
		this.scores.set_x(ww - this.scores.get_textWidth() - 10);
		this.lives.set_x(ww - this.lives.get_textWidth() - 10);
		this.time.set_x(ww - this.time.get_textWidth() - 10);
		this.scores.set_y(5);
		this.lives.set_y(this.scores.get_y() + this.scores.get_textHeight() + 5);
		this.time.set_y(this.lives.get_y() + this.lives.get_textHeight() + 5);
	}
	,createChildren: function() {
		this.scores = new openfl_text_TextField();
		this.lives = new openfl_text_TextField();
		this.time = new openfl_text_TextField();
		var format = new openfl_text_TextFormat("SquareFont",16,16777215,true);
		this.scores.set_defaultTextFormat(format);
		this.lives.set_defaultTextFormat(format);
		this.time.set_defaultTextFormat(format);
		this.scores.embedFonts = true;
		this.lives.embedFonts = true;
		this.time.embedFonts = true;
		this.scores.set_autoSize(openfl_text_TextFieldAutoSize.LEFT);
		this.lives.set_autoSize(openfl_text_TextFieldAutoSize.LEFT);
		this.time.set_autoSize(openfl_text_TextFieldAutoSize.LEFT);
		this.addChild(this.scores);
		this.addChild(this.lives);
		this.addChild(this.time);
	}
	,__class__: game_UILayer
});
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = true;
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Resource = function() { };
$hxClasses["haxe.Resource"] = haxe_Resource;
haxe_Resource.__name__ = true;
haxe_Resource.content = null;
haxe_Resource.getString = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe_crypto_Base64.decode(x.data);
			return b.toString();
		}
	}
	return null;
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_Utf8 = function() { };
$hxClasses["haxe.Utf8"] = haxe_Utf8;
haxe_Utf8.__name__ = true;
haxe_Utf8.charCodeAt = function(s,index) {
	return HxOverrides.cca(s,index);
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_crypto_Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe_crypto_Base64;
haxe_crypto_Base64.__name__ = true;
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) complement = true;
	if(complement) while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw new js__$Boot_HaxeError("BaseCode : base length must be a power of two.");
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = true;
haxe_crypto_BaseCode.prototype = {
	initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) this.initTable();
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = haxe_io_Bytes.alloc(size);
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.get(pin++)];
				if(i == -1) throw new js__$Boot_HaxeError("BaseCode : invalid encoded char");
				buf |= i;
			}
			curbits -= 8;
			out.set(pout++,buf >> curbits & 255);
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_ds_ArraySort = function() { };
$hxClasses["haxe.ds.ArraySort"] = haxe_ds_ArraySort;
haxe_ds_ArraySort.__name__ = true;
haxe_ds_ArraySort.sort = function(a,cmp) {
	haxe_ds_ArraySort.rec(a,cmp,0,a.length);
};
haxe_ds_ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) return;
		var _g = from + 1;
		while(_g < to) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) haxe_ds_ArraySort.swap(a,j - 1,j); else break;
				j--;
			}
		}
		return;
	}
	haxe_ds_ArraySort.rec(a,cmp,from,middle);
	haxe_ds_ArraySort.rec(a,cmp,middle,to);
	haxe_ds_ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe_ds_ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	var new_mid;
	if(len1 == 0 || len2 == 0) return;
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) haxe_ds_ArraySort.swap(a,pivot,from);
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe_ds_ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe_ds_ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe_ds_ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	new_mid = first_cut + len22;
	haxe_ds_ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe_ds_ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe_ds_ArraySort.rotate = function(a,cmp,from,mid,to) {
	var n;
	if(from == mid || mid == to) return;
	n = haxe_ds_ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) p2 += shift; else p2 = from + (shift - (to - p2));
		}
		a[p1] = val;
	}
};
haxe_ds_ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe_ds_ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) len = half; else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe_ds_ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else len = half;
	}
	return from;
};
haxe_ds_ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
var haxe_ds_BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = true;
haxe_ds_BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe_ds_TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r)); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe_ds_TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = true;
haxe_ds_TreeNode.prototype = {
	__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = true;
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if((v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = true;
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var haxe_ds__$Vector_Vector_$Impl_$ = {};
$hxClasses["haxe.ds._Vector.Vector_Impl_"] = haxe_ds__$Vector_Vector_$Impl_$;
haxe_ds__$Vector_Vector_$Impl_$.__name__ = true;
haxe_ds__$Vector_Vector_$Impl_$.blit = function(src,srcPos,dest,destPos,len) {
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		dest[destPos + i] = src[srcPos + i];
	}
};
var haxe_io_Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else this.dir = null;
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe_io_Path;
haxe_io_Path.__name__ = true;
haxe_io_Path.withoutExtension = function(path) {
	var s = new haxe_io_Path(path);
	s.ext = null;
	return s.toString();
};
haxe_io_Path.prototype = {
	toString: function() {
		return (this.dir == null?"":this.dir + (this.backslash?"\\":"/")) + this.file + (this.ext == null?"":"." + this.ext);
	}
	,__class__: haxe_io_Path
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Object.prototype.hasOwnProperty.call(val,"name")) this.name = Reflect.field(val,"name"); else this.name = "Error";
	if(Object.prototype.hasOwnProperty.call(val,"message")) this.message = Reflect.field(val,"message"); else this.message = Std.string(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var lime_AssetCache = function() {
	this.enabled = true;
	this.audio = new haxe_ds_StringMap();
	this.font = new haxe_ds_StringMap();
	this.image = new haxe_ds_StringMap();
};
$hxClasses["lime.AssetCache"] = lime_AssetCache;
lime_AssetCache.__name__ = true;
lime_AssetCache.prototype = {
	clear: function(prefix) {
		if(prefix == null) {
			this.audio = new haxe_ds_StringMap();
			this.font = new haxe_ds_StringMap();
			this.image = new haxe_ds_StringMap();
		} else {
			var keys = this.audio.keys();
			while( keys.hasNext() ) {
				var key = keys.next();
				if(StringTools.startsWith(key,prefix)) this.audio.remove(key);
			}
			var keys1 = this.font.keys();
			while( keys1.hasNext() ) {
				var key1 = keys1.next();
				if(StringTools.startsWith(key1,prefix)) this.font.remove(key1);
			}
			var keys2 = this.image.keys();
			while( keys2.hasNext() ) {
				var key2 = keys2.next();
				if(StringTools.startsWith(key2,prefix)) this.image.remove(key2);
			}
		}
	}
	,__class__: lime_AssetCache
};
var lime_Assets = function() { };
$hxClasses["lime.Assets"] = lime_Assets;
lime_Assets.__name__ = true;
lime_Assets.getImage = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime_Assets.initialize();
	if(useCache && lime_Assets.cache.enabled && lime_Assets.cache.image.exists(id)) {
		var image = lime_Assets.cache.image.get(id);
		if(lime_Assets.isValidImage(image)) return image;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"IMAGE")) {
			if(library.isLocal(symbolName,"IMAGE")) {
				var image1 = library.getImage(symbolName);
				if(useCache && lime_Assets.cache.enabled) lime_Assets.cache.image.set(id,image1);
				return image1;
			} else console.log("[Assets] Image asset \"" + id + "\" exists, but only asynchronously");
		} else console.log("[Assets] There is no Image asset with an ID of \"" + id + "\"");
	} else console.log("[Assets] There is no asset library named \"" + libraryName + "\"");
	return null;
};
lime_Assets.getLibrary = function(name) {
	if(name == null || name == "") name = "default";
	return lime_Assets.libraries.get(name);
};
lime_Assets.getText = function(id) {
	lime_Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"TEXT")) {
			if(library.isLocal(symbolName,"TEXT")) return library.getText(symbolName); else console.log("[Assets] String asset \"" + id + "\" exists, but only asynchronously");
		} else console.log("[Assets] There is no String asset with an ID of \"" + id + "\"");
	} else console.log("[Assets] There is no asset library named \"" + libraryName + "\"");
	return null;
};
lime_Assets.initialize = function() {
	if(!lime_Assets.initialized) {
		lime_Assets.registerLibrary("default",new DefaultAssetLibrary());
		lime_Assets.initialized = true;
	}
};
lime_Assets.isValidImage = function(buffer) {
	return true;
};
lime_Assets.registerLibrary = function(name,library) {
	if(lime_Assets.libraries.exists(name)) lime_Assets.unloadLibrary(name);
	if(library != null) library.eventCallback = lime_Assets.library_onEvent;
	lime_Assets.libraries.set(name,library);
};
lime_Assets.unloadLibrary = function(name) {
	lime_Assets.initialize();
	var library = lime_Assets.libraries.get(name);
	if(library != null) {
		lime_Assets.cache.clear(name + ":");
		library.eventCallback = null;
	}
	lime_Assets.libraries.remove(name);
};
lime_Assets.library_onEvent = function(library,type) {
	if(type == "change") lime_Assets.cache.clear();
};
var lime__$backend_html5_HTML5Application = function(parent) {
	this.parent = parent;
	lime_audio_AudioManager.init();
};
$hxClasses["lime._backend.html5.HTML5Application"] = lime__$backend_html5_HTML5Application;
lime__$backend_html5_HTML5Application.__name__ = true;
lime__$backend_html5_HTML5Application.prototype = {
	convertKeyCode: function(keyCode) {
		if(keyCode >= 65 && keyCode <= 90) return keyCode + 32;
		switch(keyCode) {
		case 16:
			return 1073742049;
		case 17:
			return 1073742048;
		case 18:
			return 1073742050;
		case 20:
			return 1073741881;
		case 144:
			return 1073741907;
		case 37:
			return 1073741904;
		case 38:
			return 1073741906;
		case 39:
			return 1073741903;
		case 40:
			return 1073741905;
		case 45:
			return 1073741897;
		case 46:
			return 127;
		case 36:
			return 1073741898;
		case 35:
			return 1073741901;
		case 33:
			return 1073741899;
		case 34:
			return 1073741902;
		case 112:
			return 1073741882;
		case 113:
			return 1073741883;
		case 114:
			return 1073741884;
		case 115:
			return 1073741885;
		case 116:
			return 1073741886;
		case 117:
			return 1073741887;
		case 118:
			return 1073741888;
		case 119:
			return 1073741889;
		case 120:
			return 1073741890;
		case 121:
			return 1073741891;
		case 122:
			return 1073741892;
		case 123:
			return 1073741893;
		}
		return keyCode;
	}
	,create: function(config) {
		this.parent.config = config;
		if(config != null) {
			var $window = new lime_ui_Window(config);
			var renderer = new lime_graphics_Renderer($window);
			this.parent.addWindow($window);
			this.parent.addRenderer(renderer);
			this.parent.init(renderer.context);
		}
	}
	,exec: function() {
		window.addEventListener("keydown",$bind(this,this.handleKeyEvent),false);
		window.addEventListener("keyup",$bind(this,this.handleKeyEvent),false);
		window.addEventListener("focus",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("blur",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("resize",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("beforeunload",$bind(this,this.handleWindowEvent),false);
		
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
										   || window[vendors[x]+'CancelRequestAnimationFrame'];
			}
			
			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
					  timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
			
			window.requestAnimFrame = window.requestAnimationFrame;
		;
		this.cacheTime = new Date().getTime();
		this.handleUpdateEvent();
		return 0;
	}
	,handleKeyEvent: function(event) {
		if(this.parent.windows[0] != null) {
			var keyCode = this.convertKeyCode(event.keyCode != null?event.keyCode:event.which);
			var modifier;
			modifier = (event.shiftKey?3:0) | (event.ctrlKey?192:0) | (event.altKey?768:0) | (event.metaKey?3072:0);
			if(event.type == "keydown") {
				var listeners = this.parent.windows[0].onKeyDown.listeners;
				var repeat = this.parent.windows[0].onKeyDown.repeat;
				var length = listeners.length;
				var i = 0;
				while(i < length) {
					listeners[i](keyCode,modifier);
					if(!repeat[i]) {
						this.parent.windows[0].onKeyDown.remove(listeners[i]);
						length--;
					} else i++;
				}
				if(this.parent.windows[0].backend.getEnableTextEvents()) {
					var listeners1 = this.parent.windows[0].onTextInput.listeners;
					var repeat1 = this.parent.windows[0].onTextInput.repeat;
					var length1 = listeners1.length;
					var i1 = 0;
					while(i1 < length1) {
						listeners1[i1](String.fromCharCode(event.keyCode));
						if(!repeat1[i1]) {
							this.parent.windows[0].onTextInput.remove(listeners1[i1]);
							length1--;
						} else i1++;
					}
				}
			} else {
				var listeners2 = this.parent.windows[0].onKeyUp.listeners;
				var repeat2 = this.parent.windows[0].onKeyUp.repeat;
				var length2 = listeners2.length;
				var i2 = 0;
				while(i2 < length2) {
					listeners2[i2](keyCode,modifier);
					if(!repeat2[i2]) {
						this.parent.windows[0].onKeyUp.remove(listeners2[i2]);
						length2--;
					} else i2++;
				}
			}
		}
	}
	,handleUpdateEvent: function(__) {
		var currentTime = new Date().getTime();
		var deltaTime = currentTime - this.cacheTime;
		this.cacheTime = currentTime;
		var listeners = this.parent.onUpdate.listeners;
		var repeat = this.parent.onUpdate.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](deltaTime | 0);
			if(!repeat[i]) {
				this.parent.onUpdate.remove(listeners[i]);
				length--;
			} else i++;
		}
		if(this.parent.renderers[0] != null) {
			var listeners1 = this.parent.renderers[0].onRender.listeners;
			var repeat1 = this.parent.renderers[0].onRender.repeat;
			var length1 = listeners1.length;
			var i1 = 0;
			while(i1 < length1) {
				listeners1[i1](this.parent.renderers[0].context);
				if(!repeat1[i1]) {
					this.parent.renderers[0].onRender.remove(listeners1[i1]);
					length1--;
				} else i1++;
			}
			this.parent.renderers[0].flip();
		}
		window.requestAnimationFrame($bind(this,this.handleUpdateEvent));
	}
	,handleWindowEvent: function(event) {
		if(this.parent.windows[0] != null) {
			var _g = event.type;
			switch(_g) {
			case "focus":
				var listeners = this.parent.windows[0].onWindowFocusIn.listeners;
				var repeat = this.parent.windows[0].onWindowFocusIn.repeat;
				var length = listeners.length;
				var i = 0;
				while(i < length) {
					listeners[i]();
					if(!repeat[i]) {
						this.parent.windows[0].onWindowFocusIn.remove(listeners[i]);
						length--;
					} else i++;
				}
				var listeners1 = this.parent.windows[0].onWindowActivate.listeners;
				var repeat1 = this.parent.windows[0].onWindowActivate.repeat;
				var length1 = listeners1.length;
				var i1 = 0;
				while(i1 < length1) {
					listeners1[i1]();
					if(!repeat1[i1]) {
						this.parent.windows[0].onWindowActivate.remove(listeners1[i1]);
						length1--;
					} else i1++;
				}
				break;
			case "blur":
				var listeners2 = this.parent.windows[0].onWindowFocusOut.listeners;
				var repeat2 = this.parent.windows[0].onWindowFocusOut.repeat;
				var length2 = listeners2.length;
				var i2 = 0;
				while(i2 < length2) {
					listeners2[i2]();
					if(!repeat2[i2]) {
						this.parent.windows[0].onWindowFocusOut.remove(listeners2[i2]);
						length2--;
					} else i2++;
				}
				var listeners3 = this.parent.windows[0].onWindowDeactivate.listeners;
				var repeat3 = this.parent.windows[0].onWindowDeactivate.repeat;
				var length3 = listeners3.length;
				var i3 = 0;
				while(i3 < length3) {
					listeners3[i3]();
					if(!repeat3[i3]) {
						this.parent.windows[0].onWindowDeactivate.remove(listeners3[i3]);
						length3--;
					} else i3++;
				}
				break;
			case "resize":
				var cacheWidth = this.parent.windows[0].__width;
				var cacheHeight = this.parent.windows[0].__height;
				this.parent.windows[0].backend.handleResize();
				if(this.parent.windows[0].__width != cacheWidth || this.parent.windows[0].__height != cacheHeight) {
					var listeners4 = this.parent.windows[0].onWindowResize.listeners;
					var repeat4 = this.parent.windows[0].onWindowResize.repeat;
					var length4 = listeners4.length;
					var i4 = 0;
					while(i4 < length4) {
						listeners4[i4](this.parent.windows[0].__width,this.parent.windows[0].__height);
						if(!repeat4[i4]) {
							this.parent.windows[0].onWindowResize.remove(listeners4[i4]);
							length4--;
						} else i4++;
					}
				}
				break;
			case "beforeunload":
				var listeners5 = this.parent.windows[0].onWindowClose.listeners;
				var repeat5 = this.parent.windows[0].onWindowClose.repeat;
				var length5 = listeners5.length;
				var i5 = 0;
				while(i5 < length5) {
					listeners5[i5]();
					if(!repeat5[i5]) {
						this.parent.windows[0].onWindowClose.remove(listeners5[i5]);
						length5--;
					} else i5++;
				}
				break;
			}
		}
	}
	,__class__: lime__$backend_html5_HTML5Application
};
var lime__$backend_html5_HTML5Mouse = function() { };
$hxClasses["lime._backend.html5.HTML5Mouse"] = lime__$backend_html5_HTML5Mouse;
lime__$backend_html5_HTML5Mouse.__name__ = true;
lime__$backend_html5_HTML5Mouse.__cursor = null;
lime__$backend_html5_HTML5Mouse.__hidden = null;
lime__$backend_html5_HTML5Mouse.set_cursor = function(value) {
	if(lime__$backend_html5_HTML5Mouse.__cursor != value) {
		if(!lime__$backend_html5_HTML5Mouse.__hidden) {
			var _g = 0;
			var _g1 = lime_app_Application.current.windows;
			while(_g < _g1.length) {
				var $window = _g1[_g];
				++_g;
				switch(value[1]) {
				case 0:
					$window.backend.element.style.cursor = "default";
					break;
				case 1:
					$window.backend.element.style.cursor = "crosshair";
					break;
				case 3:
					$window.backend.element.style.cursor = "move";
					break;
				case 4:
					$window.backend.element.style.cursor = "pointer";
					break;
				case 5:
					$window.backend.element.style.cursor = "nesw-resize";
					break;
				case 6:
					$window.backend.element.style.cursor = "ns-resize";
					break;
				case 7:
					$window.backend.element.style.cursor = "nwse-resize";
					break;
				case 8:
					$window.backend.element.style.cursor = "ew-resize";
					break;
				case 9:
					$window.backend.element.style.cursor = "text";
					break;
				case 10:
					$window.backend.element.style.cursor = "wait";
					break;
				case 11:
					$window.backend.element.style.cursor = "wait";
					break;
				default:
					$window.backend.element.style.cursor = "auto";
				}
			}
		}
		lime__$backend_html5_HTML5Mouse.__cursor = value;
	}
	return lime__$backend_html5_HTML5Mouse.__cursor;
};
var lime__$backend_html5_HTML5Renderer = function(parent) {
	this.parent = parent;
};
$hxClasses["lime._backend.html5.HTML5Renderer"] = lime__$backend_html5_HTML5Renderer;
lime__$backend_html5_HTML5Renderer.__name__ = true;
lime__$backend_html5_HTML5Renderer.prototype = {
	create: function() {
		this.createContext();
		{
			var _g = this.parent.context;
			switch(_g[1]) {
			case 0:
				this.parent.window.backend.canvas.addEventListener("webglcontextlost",$bind(this,this.handleEvent),false);
				this.parent.window.backend.canvas.addEventListener("webglcontextrestored",$bind(this,this.handleEvent),false);
				break;
			default:
			}
		}
	}
	,createContext: function() {
		if(this.parent.window.backend.div != null) this.parent.context = lime_graphics_RenderContext.DOM(this.parent.window.backend.div); else if(this.parent.window.backend.canvas != null) {
			var webgl = null;
			if(webgl == null) this.parent.context = lime_graphics_RenderContext.CANVAS(this.parent.window.backend.canvas.getContext("2d")); else {
				lime_graphics_opengl_GL.context = webgl;
				this.parent.context = lime_graphics_RenderContext.OPENGL(lime_graphics_opengl_GL.context);
			}
		}
	}
	,flip: function() {
	}
	,handleEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "webglcontextlost":
			event.preventDefault();
			this.parent.context = null;
			var listeners = this.parent.onRenderContextLost.listeners;
			var repeat = this.parent.onRenderContextLost.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i]();
				if(!repeat[i]) {
					this.parent.onRenderContextLost.remove(listeners[i]);
					length--;
				} else i++;
			}
			break;
		case "webglcontextrestored":
			this.createContext();
			var listeners1 = this.parent.onRenderContextRestored.listeners;
			var repeat1 = this.parent.onRenderContextRestored.repeat;
			var length1 = listeners1.length;
			var i1 = 0;
			while(i1 < length1) {
				listeners1[i1](this.parent.context);
				if(!repeat1[i1]) {
					this.parent.onRenderContextRestored.remove(listeners1[i1]);
					length1--;
				} else i1++;
			}
			break;
		default:
		}
	}
	,__class__: lime__$backend_html5_HTML5Renderer
};
var lime__$backend_html5_HTML5Window = function(parent) {
	this.parent = parent;
	if(parent.config != null && Object.prototype.hasOwnProperty.call(parent.config,"element")) this.element = parent.config.element;
};
$hxClasses["lime._backend.html5.HTML5Window"] = lime__$backend_html5_HTML5Window;
lime__$backend_html5_HTML5Window.__name__ = true;
lime__$backend_html5_HTML5Window.prototype = {
	create: function(application) {
		this.setWidth = this.parent.__width;
		this.setHeight = this.parent.__height;
		if(js_Boot.__instanceof(this.element,HTMLCanvasElement)) this.canvas = this.element; else this.canvas = window.document.createElement("canvas");
		if(this.canvas != null) {
			var style = this.canvas.style;
			style.setProperty("-webkit-transform","translateZ(0)",null);
			style.setProperty("transform","translateZ(0)",null);
		} else if(this.div != null) {
			var style1 = this.div.style;
			style1.setProperty("-webkit-transform","translate3D(0,0,0)",null);
			style1.setProperty("transform","translate3D(0,0,0)",null);
			style1.position = "relative";
			style1.overflow = "hidden";
			style1.setProperty("-webkit-user-select","none",null);
			style1.setProperty("-moz-user-select","none",null);
			style1.setProperty("-ms-user-select","none",null);
			style1.setProperty("-o-user-select","none",null);
		}
		if(this.parent.__width == 0 && this.parent.__height == 0) {
			if(this.element != null) {
				this.parent.set_width(this.element.clientWidth);
				this.parent.set_height(this.element.clientHeight);
			} else {
				this.parent.set_width(window.innerWidth);
				this.parent.set_height(window.innerHeight);
			}
			this.parent.set_fullscreen(true);
		}
		if(this.canvas != null) {
			this.canvas.width = this.parent.__width;
			this.canvas.height = this.parent.__height;
		} else {
			this.div.style.width = this.parent.__width + "px";
			this.div.style.height = this.parent.__height + "px";
		}
		this.handleResize();
		if(this.element != null) {
			if(this.canvas != null) {
				if(this.element != this.canvas) this.element.appendChild(this.canvas);
			} else this.element.appendChild(this.div);
			var events = ["mousedown","mouseenter","mouseleave","mousemove","mouseup","wheel"];
			var _g = 0;
			while(_g < events.length) {
				var event = events[_g];
				++_g;
				this.element.addEventListener(event,$bind(this,this.handleMouseEvent),true);
			}
			window.document.addEventListener("dragstart",function(e) {
				if(e.target.nodeName.toLowerCase() == "img") {
					e.preventDefault();
					return false;
				}
				return true;
			},false);
			this.element.addEventListener("touchstart",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("touchmove",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("touchend",$bind(this,this.handleTouchEvent),true);
		}
	}
	,getEnableTextEvents: function() {
		return this.enableTextEvents;
	}
	,handleMouseEvent: function(event) {
		var x = 0.0;
		var y = 0.0;
		if(event.type != "wheel") {
			if(this.element != null) {
				if(this.canvas != null) {
					var rect = this.canvas.getBoundingClientRect();
					x = (event.clientX - rect.left) * (this.parent.__width / rect.width);
					y = (event.clientY - rect.top) * (this.parent.__height / rect.height);
				} else if(this.div != null) {
					var rect1 = this.div.getBoundingClientRect();
					x = event.clientX - rect1.left;
					y = event.clientY - rect1.top;
				} else {
					var rect2 = this.element.getBoundingClientRect();
					x = (event.clientX - rect2.left) * (this.parent.__width / rect2.width);
					y = (event.clientY - rect2.top) * (this.parent.__height / rect2.height);
				}
			} else {
				x = event.clientX;
				y = event.clientY;
			}
			var _g = event.type;
			switch(_g) {
			case "mousedown":
				var listeners = this.parent.onMouseDown.listeners;
				var repeat = this.parent.onMouseDown.repeat;
				var length = listeners.length;
				var i = 0;
				while(i < length) {
					listeners[i](x,y,event.button);
					if(!repeat[i]) {
						this.parent.onMouseDown.remove(listeners[i]);
						length--;
					} else i++;
				}
				break;
			case "mouseenter":
				var listeners1 = this.parent.onWindowEnter.listeners;
				var repeat1 = this.parent.onWindowEnter.repeat;
				var length1 = listeners1.length;
				var i1 = 0;
				while(i1 < length1) {
					listeners1[i1]();
					if(!repeat1[i1]) {
						this.parent.onWindowEnter.remove(listeners1[i1]);
						length1--;
					} else i1++;
				}
				break;
			case "mouseleave":
				var listeners2 = this.parent.onWindowLeave.listeners;
				var repeat2 = this.parent.onWindowLeave.repeat;
				var length2 = listeners2.length;
				var i2 = 0;
				while(i2 < length2) {
					listeners2[i2]();
					if(!repeat2[i2]) {
						this.parent.onWindowLeave.remove(listeners2[i2]);
						length2--;
					} else i2++;
				}
				break;
			case "mouseup":
				var listeners3 = this.parent.onMouseUp.listeners;
				var repeat3 = this.parent.onMouseUp.repeat;
				var length3 = listeners3.length;
				var i3 = 0;
				while(i3 < length3) {
					listeners3[i3](x,y,event.button);
					if(!repeat3[i3]) {
						this.parent.onMouseUp.remove(listeners3[i3]);
						length3--;
					} else i3++;
				}
				break;
			case "mousemove":
				var listeners4 = this.parent.onMouseMove.listeners;
				var repeat4 = this.parent.onMouseMove.repeat;
				var length4 = listeners4.length;
				var i4 = 0;
				while(i4 < length4) {
					listeners4[i4](x,y);
					if(!repeat4[i4]) {
						this.parent.onMouseMove.remove(listeners4[i4]);
						length4--;
					} else i4++;
				}
				break;
			default:
			}
		} else {
			var listeners5 = this.parent.onMouseWheel.listeners;
			var repeat5 = this.parent.onMouseWheel.repeat;
			var length5 = listeners5.length;
			var i5 = 0;
			while(i5 < length5) {
				listeners5[i5](event.deltaX,-event.deltaY);
				if(!repeat5[i5]) {
					this.parent.onMouseWheel.remove(listeners5[i5]);
					length5--;
				} else i5++;
			}
		}
	}
	,handleResize: function() {
		var stretch = this.parent.__fullscreen || this.setWidth == 0 && this.setHeight == 0;
		if(this.element != null && (this.div == null || this.div != null && stretch)) {
			if(stretch) {
				if(this.parent.__width != this.element.clientWidth || this.parent.__height != this.element.clientHeight) {
					this.parent.set_width(this.element.clientWidth);
					this.parent.set_height(this.element.clientHeight);
					if(this.canvas != null) {
						if(this.element != this.canvas) {
							this.canvas.width = this.element.clientWidth;
							this.canvas.height = this.element.clientHeight;
						}
					} else {
						this.div.style.width = this.element.clientWidth + "px";
						this.div.style.height = this.element.clientHeight + "px";
					}
				}
			} else {
				var scaleX = this.element.clientWidth / this.setWidth;
				var scaleY = this.element.clientHeight / this.setHeight;
				var currentRatio = scaleX / scaleY;
				var targetRatio = Math.min(scaleX,scaleY);
				if(this.canvas != null) {
					if(this.element != this.canvas) {
						this.canvas.style.width = this.setWidth * targetRatio + "px";
						this.canvas.style.height = this.setHeight * targetRatio + "px";
						this.canvas.style.marginLeft = (this.element.clientWidth - this.setWidth * targetRatio) / 2 + "px";
						this.canvas.style.marginTop = (this.element.clientHeight - this.setHeight * targetRatio) / 2 + "px";
					}
				} else {
					this.div.style.width = this.setWidth * targetRatio + "px";
					this.div.style.height = this.setHeight * targetRatio + "px";
					this.div.style.marginLeft = (this.element.clientWidth - this.setWidth * targetRatio) / 2 + "px";
					this.div.style.marginTop = (this.element.clientHeight - this.setHeight * targetRatio) / 2 + "px";
				}
			}
		}
	}
	,handleTouchEvent: function(event) {
		event.preventDefault();
		var touch = event.changedTouches[0];
		var id = touch.identifier;
		var x = 0.0;
		var y = 0.0;
		if(this.element != null) {
			if(this.canvas != null) {
				var rect = this.canvas.getBoundingClientRect();
				x = (touch.clientX - rect.left) * (this.parent.__width / rect.width);
				y = (touch.clientY - rect.top) * (this.parent.__height / rect.height);
			} else if(this.div != null) {
				var rect1 = this.div.getBoundingClientRect();
				x = touch.clientX - rect1.left;
				y = touch.clientY - rect1.top;
			} else {
				var rect2 = this.element.getBoundingClientRect();
				x = (touch.clientX - rect2.left) * (this.parent.__width / rect2.width);
				y = (touch.clientY - rect2.top) * (this.parent.__height / rect2.height);
			}
		} else {
			x = touch.clientX;
			y = touch.clientY;
		}
		var _g = event.type;
		switch(_g) {
		case "touchstart":
			var listeners = this.parent.onTouchStart.listeners;
			var repeat = this.parent.onTouchStart.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i](x,y,id);
				if(!repeat[i]) {
					this.parent.onTouchStart.remove(listeners[i]);
					length--;
				} else i++;
			}
			break;
		case "touchmove":
			var listeners1 = this.parent.onTouchMove.listeners;
			var repeat1 = this.parent.onTouchMove.repeat;
			var length1 = listeners1.length;
			var i1 = 0;
			while(i1 < length1) {
				listeners1[i1](x,y,id);
				if(!repeat1[i1]) {
					this.parent.onTouchMove.remove(listeners1[i1]);
					length1--;
				} else i1++;
			}
			break;
		case "touchend":
			var listeners2 = this.parent.onTouchEnd.listeners;
			var repeat2 = this.parent.onTouchEnd.repeat;
			var length2 = listeners2.length;
			var i2 = 0;
			while(i2 < length2) {
				listeners2[i2](x,y,id);
				if(!repeat2[i2]) {
					this.parent.onTouchEnd.remove(listeners2[i2]);
					length2--;
				} else i2++;
			}
			break;
		default:
		}
	}
	,resize: function(width,height) {
	}
	,setFullscreen: function(value) {
		return false;
	}
	,__class__: lime__$backend_html5_HTML5Window
};
var lime_app_IModule = function() { };
$hxClasses["lime.app.IModule"] = lime_app_IModule;
lime_app_IModule.__name__ = true;
lime_app_IModule.prototype = {
	__class__: lime_app_IModule
};
var lime_app_Module = function() {
};
$hxClasses["lime.app.Module"] = lime_app_Module;
lime_app_Module.__name__ = true;
lime_app_Module.__interfaces__ = [lime_app_IModule];
lime_app_Module.prototype = {
	init: function(context) {
	}
	,onGamepadAxisMove: function(gamepad,axis,value) {
	}
	,onGamepadButtonDown: function(gamepad,button) {
	}
	,onGamepadButtonUp: function(gamepad,button) {
	}
	,onGamepadConnect: function(gamepad) {
	}
	,onGamepadDisconnect: function(gamepad) {
	}
	,onKeyDown: function(keyCode,modifier) {
	}
	,onKeyUp: function(keyCode,modifier) {
	}
	,onMouseDown: function(x,y,button) {
	}
	,onMouseMove: function(x,y) {
	}
	,onMouseMoveRelative: function(x,y) {
	}
	,onMouseUp: function(x,y,button) {
	}
	,onMouseWheel: function(deltaX,deltaY) {
	}
	,onRenderContextLost: function() {
	}
	,onRenderContextRestored: function(context) {
	}
	,onTextEdit: function(text,start,length) {
	}
	,onTextInput: function(text) {
	}
	,onTouchEnd: function(x,y,id) {
	}
	,onTouchMove: function(x,y,id) {
	}
	,onTouchStart: function(x,y,id) {
	}
	,onWindowActivate: function() {
	}
	,onWindowClose: function() {
	}
	,onWindowDeactivate: function() {
	}
	,onWindowEnter: function() {
	}
	,onWindowFocusIn: function() {
	}
	,onWindowFocusOut: function() {
	}
	,onWindowFullscreen: function() {
	}
	,onWindowLeave: function() {
	}
	,onWindowMinimize: function() {
	}
	,onWindowMove: function(x,y) {
	}
	,onWindowResize: function(width,height) {
	}
	,onWindowRestore: function() {
	}
	,render: function(context) {
	}
	,update: function(deltaTime) {
	}
	,__class__: lime_app_Module
};
var lime_app_Application = function() {
	this.onUpdate = new lime_app_Event();
	lime_app_Module.call(this);
	if(lime_app_Application.current == null) lime_app_Application.current = this;
	this.modules = [];
	this.renderers = [];
	this.windows = [];
	this.backend = new lime__$backend_html5_HTML5Application(this);
	this.onUpdate.add($bind(this,this.update));
};
$hxClasses["lime.app.Application"] = lime_app_Application;
lime_app_Application.__name__ = true;
lime_app_Application.current = null;
lime_app_Application.__super__ = lime_app_Module;
lime_app_Application.prototype = $extend(lime_app_Module.prototype,{
	addModule: function(module) {
		this.modules.push(module);
		if(this.initialized && this.renderers[0] != null) module.init(this.renderers[0].context);
	}
	,addRenderer: function(renderer) {
		renderer.onRender.add($bind(this,this.render));
		renderer.onRenderContextLost.add($bind(this,this.onRenderContextLost));
		renderer.onRenderContextRestored.add($bind(this,this.onRenderContextRestored));
		this.renderers.push(renderer);
	}
	,addWindow: function(window) {
		this.windows.push(window);
		window.onGamepadAxisMove.add($bind(this,this.onGamepadAxisMove));
		window.onGamepadButtonDown.add($bind(this,this.onGamepadButtonDown));
		window.onGamepadButtonUp.add($bind(this,this.onGamepadButtonUp));
		window.onGamepadConnect.add($bind(this,this.onGamepadConnect));
		window.onGamepadDisconnect.add($bind(this,this.onGamepadDisconnect));
		window.onKeyDown.add($bind(this,this.onKeyDown));
		window.onKeyUp.add($bind(this,this.onKeyUp));
		window.onMouseDown.add($bind(this,this.onMouseDown));
		window.onMouseMove.add($bind(this,this.onMouseMove));
		window.onMouseMoveRelative.add($bind(this,this.onMouseMoveRelative));
		window.onMouseUp.add($bind(this,this.onMouseUp));
		window.onMouseWheel.add($bind(this,this.onMouseWheel));
		window.onTextEdit.add($bind(this,this.onTextEdit));
		window.onTextInput.add($bind(this,this.onTextInput));
		window.onTouchStart.add($bind(this,this.onTouchStart));
		window.onTouchMove.add($bind(this,this.onTouchMove));
		window.onTouchEnd.add($bind(this,this.onTouchEnd));
		window.onWindowActivate.add($bind(this,this.onWindowActivate));
		window.onWindowClose.add($bind(this,this.onWindowClose));
		window.onWindowDeactivate.add($bind(this,this.onWindowDeactivate));
		window.onWindowEnter.add($bind(this,this.onWindowEnter));
		window.onWindowFocusIn.add($bind(this,this.onWindowFocusIn));
		window.onWindowFocusOut.add($bind(this,this.onWindowFocusOut));
		window.onWindowFullscreen.add($bind(this,this.onWindowFullscreen));
		window.onWindowLeave.add($bind(this,this.onWindowLeave));
		window.onWindowMinimize.add($bind(this,this.onWindowMinimize));
		window.onWindowMove.add($bind(this,this.onWindowMove));
		window.onWindowResize.add($bind(this,this.onWindowResize));
		window.onWindowRestore.add($bind(this,this.onWindowRestore));
		window.create(this);
	}
	,create: function(config) {
		this.backend.create(config);
	}
	,exec: function() {
		lime_app_Application.current = this;
		return this.backend.exec();
	}
	,init: function(context) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.init(context);
		}
		this.initialized = true;
	}
	,onGamepadAxisMove: function(gamepad,axis,value) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadAxisMove(gamepad,axis,value);
		}
	}
	,onGamepadButtonDown: function(gamepad,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadButtonDown(gamepad,button);
		}
	}
	,onGamepadButtonUp: function(gamepad,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadButtonUp(gamepad,button);
		}
	}
	,onGamepadConnect: function(gamepad) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadConnect(gamepad);
		}
	}
	,onGamepadDisconnect: function(gamepad) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadDisconnect(gamepad);
		}
	}
	,onKeyDown: function(keyCode,modifier) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onKeyDown(keyCode,modifier);
		}
	}
	,onKeyUp: function(keyCode,modifier) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onKeyUp(keyCode,modifier);
		}
	}
	,onMouseDown: function(x,y,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseDown(x,y,button);
		}
	}
	,onMouseMove: function(x,y) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseMove(x,y);
		}
	}
	,onMouseMoveRelative: function(x,y) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseMoveRelative(x,y);
		}
	}
	,onMouseUp: function(x,y,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseUp(x,y,button);
		}
	}
	,onMouseWheel: function(deltaX,deltaY) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseWheel(deltaX,deltaY);
		}
	}
	,onRenderContextLost: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onRenderContextLost();
		}
	}
	,onRenderContextRestored: function(context) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onRenderContextRestored(context);
		}
	}
	,onTextEdit: function(text,start,length) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTextEdit(text,start,length);
		}
	}
	,onTextInput: function(text) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTextInput(text);
		}
	}
	,onTouchEnd: function(x,y,id) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTouchEnd(x,y,id);
		}
	}
	,onTouchMove: function(x,y,id) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTouchMove(x,y,id);
		}
	}
	,onTouchStart: function(x,y,id) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTouchStart(x,y,id);
		}
	}
	,onWindowActivate: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowActivate();
		}
	}
	,onWindowClose: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowClose();
		}
	}
	,onWindowDeactivate: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowDeactivate();
		}
	}
	,onWindowEnter: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowEnter();
		}
	}
	,onWindowFocusIn: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowFocusIn();
		}
	}
	,onWindowFocusOut: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowFocusOut();
		}
	}
	,onWindowFullscreen: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowFullscreen();
		}
	}
	,onWindowLeave: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowLeave();
		}
	}
	,onWindowMinimize: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowMinimize();
		}
	}
	,onWindowMove: function(x,y) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowMove(x,y);
		}
	}
	,onWindowResize: function(width,height) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowResize(width,height);
		}
	}
	,onWindowRestore: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowRestore();
		}
	}
	,render: function(context) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.render(context);
		}
	}
	,update: function(deltaTime) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.update(deltaTime);
		}
	}
	,__class__: lime_app_Application
});
var lime_app_Event = function() {
	this.listeners = [];
	this.priorities = [];
	this.repeat = [];
};
$hxClasses["lime.app.Event"] = lime_app_Event;
lime_app_Event.__name__ = true;
lime_app_Event.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.priorities[i]) {
				this.listeners.splice(i,0,listener);
				this.priorities.splice(i,0,priority);
				this.repeat.splice(i,0,!once);
				return;
			}
		}
		this.listeners.push(listener);
		this.priorities.push(priority);
		this.repeat.push(!once);
	}
	,remove: function(listener) {
		var index = HxOverrides.indexOf(this.listeners,listener,0);
		if(index > -1) {
			this.listeners.splice(index,1);
			this.priorities.splice(index,1);
			this.repeat.splice(index,1);
		}
	}
	,__class__: lime_app_Event
};
var lime_app_Preloader = function() {
	this.total = 0;
	this.loaded = 0;
};
$hxClasses["lime.app.Preloader"] = lime_app_Preloader;
lime_app_Preloader.__name__ = true;
lime_app_Preloader.prototype = {
	create: function(config) {
	}
	,load: function(urls,types) {
		var url = null;
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			url = urls[i];
			var _g2 = types[i];
			switch(_g2) {
			case "IMAGE":
				var image = new Image();
				lime_app_Preloader.images.set(url,image);
				image.onload = $bind(this,this.image_onLoad);
				image.src = url;
				this.total++;
				break;
			case "BINARY":
				var loader = new lime_net_URLLoader();
				loader.set_dataFormat(lime_net_URLLoaderDataFormat.BINARY);
				lime_app_Preloader.loaders.set(url,loader);
				this.total++;
				break;
			case "TEXT":
				var loader1 = new lime_net_URLLoader();
				lime_app_Preloader.loaders.set(url,loader1);
				this.total++;
				break;
			case "FONT":
				this.total++;
				this.loadFont(url);
				break;
			default:
			}
		}
		var $it0 = lime_app_Preloader.loaders.keys();
		while( $it0.hasNext() ) {
			var url1 = $it0.next();
			var loader2 = lime_app_Preloader.loaders.get(url1);
			loader2.onComplete.add($bind(this,this.loader_onComplete));
			loader2.load(new lime_net_URLRequest(url1));
		}
		if(this.total == 0) this.start();
	}
	,loadFont: function(font) {
		var _g = this;
		if(window.document.fonts && ($_=window.document.fonts,$bind($_,$_.load))) window.document.fonts.load("1em '" + font + "'").then(function(_) {
			_g.loaded++;
			_g.update(_g.loaded,_g.total);
			if(_g.loaded == _g.total) _g.start();
		}); else {
			var node = window.document.createElement("span");
			node.innerHTML = "giItT1WQy@!-/#";
			var style = node.style;
			style.position = "absolute";
			style.left = "-10000px";
			style.top = "-10000px";
			style.fontSize = "300px";
			style.fontFamily = "sans-serif";
			style.fontVariant = "normal";
			style.fontStyle = "normal";
			style.fontWeight = "normal";
			style.letterSpacing = "0";
			window.document.body.appendChild(node);
			var width = node.offsetWidth;
			style.fontFamily = "'" + font + "', sans-serif";
			var interval = null;
			var found = false;
			var checkFont = function() {
				if(node.offsetWidth != width) {
					if(!found) {
						found = true;
						return false;
					}
					_g.loaded++;
					if(interval != null) window.clearInterval(interval);
					node.parentNode.removeChild(node);
					node = null;
					_g.update(_g.loaded,_g.total);
					if(_g.loaded == _g.total) _g.start();
					return true;
				}
				return false;
			};
			if(!checkFont()) interval = window.setInterval(checkFont,50);
		}
	}
	,start: function() {
		if(this.onComplete != null) this.onComplete();
	}
	,update: function(loaded,total) {
	}
	,image_onLoad: function(_) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,loader_onComplete: function(loader) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,__class__: lime_app_Preloader
};
var lime_audio_ALAudioContext = function() { };
$hxClasses["lime.audio.ALAudioContext"] = lime_audio_ALAudioContext;
lime_audio_ALAudioContext.__name__ = true;
var lime_audio_ALCAudioContext = function() { };
$hxClasses["lime.audio.ALCAudioContext"] = lime_audio_ALCAudioContext;
lime_audio_ALCAudioContext.__name__ = true;
var lime_audio_AudioBuffer = function() { };
$hxClasses["lime.audio.AudioBuffer"] = lime_audio_AudioBuffer;
lime_audio_AudioBuffer.__name__ = true;
var lime_audio_AudioContext = $hxClasses["lime.audio.AudioContext"] = { __ename__ : true, __constructs__ : ["OPENAL","HTML5","WEB","FLASH","CUSTOM"] };
lime_audio_AudioContext.OPENAL = function(alc,al) { var $x = ["OPENAL",0,alc,al]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.HTML5 = function(context) { var $x = ["HTML5",1,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.WEB = function(context) { var $x = ["WEB",2,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.FLASH = function(context) { var $x = ["FLASH",3,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.CUSTOM = function(data) { var $x = ["CUSTOM",4,data]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
var lime_audio_AudioManager = function() { };
$hxClasses["lime.audio.AudioManager"] = lime_audio_AudioManager;
lime_audio_AudioManager.__name__ = true;
lime_audio_AudioManager.context = null;
lime_audio_AudioManager.init = function(context) {
	if(lime_audio_AudioManager.context == null) {
		if(context == null) try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;;
			lime_audio_AudioManager.context = lime_audio_AudioContext.WEB(new AudioContext ());
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			lime_audio_AudioManager.context = lime_audio_AudioContext.HTML5(new lime_audio_HTML5AudioContext());
		} else lime_audio_AudioManager.context = context;
	}
};
var lime_audio_FlashAudioContext = function() { };
$hxClasses["lime.audio.FlashAudioContext"] = lime_audio_FlashAudioContext;
lime_audio_FlashAudioContext.__name__ = true;
var lime_audio_HTML5AudioContext = function() {
};
$hxClasses["lime.audio.HTML5AudioContext"] = lime_audio_HTML5AudioContext;
lime_audio_HTML5AudioContext.__name__ = true;
lime_audio_HTML5AudioContext.prototype = {
	__class__: lime_audio_HTML5AudioContext
};
var lime_graphics_ConsoleRenderContext = function() { };
$hxClasses["lime.graphics.ConsoleRenderContext"] = lime_graphics_ConsoleRenderContext;
lime_graphics_ConsoleRenderContext.__name__ = true;
var lime_graphics_FlashRenderContext = function() { };
$hxClasses["lime.graphics.FlashRenderContext"] = lime_graphics_FlashRenderContext;
lime_graphics_FlashRenderContext.__name__ = true;
var lime_graphics_Image = function(buffer,offsetX,offsetY,width,height,color,type) {
	if(height == null) height = -1;
	if(width == null) width = -1;
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.width = width;
	this.height = height;
	if(type == null) {
		if(lime_app_Application.current != null && lime_app_Application.current.renderers[0] != null) {
			var _g = lime_app_Application.current.renderers[0].context;
			switch(_g[1]) {
			case 2:case 1:
				this.type = lime_graphics_ImageType.CANVAS;
				break;
			case 3:
				this.type = lime_graphics_ImageType.FLASH;
				break;
			default:
				this.type = lime_graphics_ImageType.DATA;
			}
		} else this.type = lime_graphics_ImageType.DATA;
	} else this.type = type;
	if(buffer == null) {
		if(width > 0 && height > 0) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 0:
				this.buffer = new lime_graphics_ImageBuffer(null,width,height);
				lime_graphics_utils_ImageCanvasUtil.createCanvas(this,width,height);
				if(color != null) this.fillRect(new lime_math_Rectangle(0,0,width,height),color);
				break;
			case 1:
				this.buffer = new lime_graphics_ImageBuffer(new Uint8Array(width * height * 4),width,height);
				if(color != null) this.fillRect(new lime_math_Rectangle(0,0,width,height),color);
				break;
			case 2:
				break;
			default:
			}
		}
	} else this.__fromImageBuffer(buffer);
};
$hxClasses["lime.graphics.Image"] = lime_graphics_Image;
lime_graphics_Image.__name__ = true;
lime_graphics_Image.fromBase64 = function(base64,type,onload) {
	if(base64 == null) return null;
	var image = new lime_graphics_Image();
	image.__fromBase64(base64,type,onload);
	return image;
};
lime_graphics_Image.fromImageElement = function(image) {
	if(image == null) return null;
	var buffer = new lime_graphics_ImageBuffer(null,image.width,image.height);
	buffer.set_src(image);
	return new lime_graphics_Image(buffer);
};
lime_graphics_Image.prototype = {
	clone: function() {
		var image = new lime_graphics_Image(this.buffer.clone(),this.offsetX,this.offsetY,this.width,this.height,null,this.type);
		return image;
	}
	,copyChannel: function(sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
		sourceRect = this.__clipRect(sourceRect);
		if(this.buffer == null || sourceRect == null) return;
		if(destChannel == lime_graphics_ImageChannel.ALPHA && !this.get_transparent()) return;
		if(sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceImage.width) sourceRect.width = sourceImage.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceImage.height) sourceRect.height = sourceImage.height - sourceRect.y;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.copyChannel(this,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.copyChannel(this,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
			break;
		case 2:
			var srcChannel;
			switch(sourceChannel[1]) {
			case 0:
				srcChannel = 1;
				break;
			case 1:
				srcChannel = 2;
				break;
			case 2:
				srcChannel = 4;
				break;
			case 3:
				srcChannel = 8;
				break;
			}
			var dstChannel;
			switch(destChannel[1]) {
			case 0:
				dstChannel = 1;
				break;
			case 1:
				dstChannel = 2;
				break;
			case 2:
				dstChannel = 4;
				break;
			case 3:
				dstChannel = 8;
				break;
			}
			sourceRect.offset(sourceImage.offsetX,sourceImage.offsetY);
			destPoint.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.copyChannel(sourceImage.buffer.get_src(),sourceRect.__toFlashRectangle(),destPoint.__toFlashPoint(),srcChannel,dstChannel);
			break;
		default:
		}
	}
	,copyPixels: function(sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		if(this.buffer == null || sourceImage == null) return;
		if(sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(this.width <= 0 || this.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceImage.width) sourceRect.width = sourceImage.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceImage.height) sourceRect.height = sourceImage.height - sourceRect.y;
		if(sourceRect.x < 0) {
			sourceRect.width += sourceRect.x;
			sourceRect.x = 0;
		}
		if(sourceRect.y < 0) {
			sourceRect.height += sourceRect.y;
			sourceRect.y = 0;
		}
		if(destPoint.x + sourceRect.width > this.width) sourceRect.width = this.width - destPoint.x;
		if(destPoint.y + sourceRect.height > this.height) sourceRect.height = this.height - destPoint.y;
		if(destPoint.x < 0) {
			sourceRect.width += destPoint.x;
			sourceRect.x = -destPoint.x;
			destPoint.x = 0;
		}
		if(destPoint.y < 0) {
			sourceRect.height += destPoint.y;
			sourceRect.y = -destPoint.y;
			destPoint.y = 0;
		}
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this);
			lime_graphics_utils_ImageCanvasUtil.copyPixels(this,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageCanvasUtil.convertToData(sourceImage);
			lime_graphics_utils_ImageDataUtil.copyPixels(this,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha);
			break;
		case 2:
			sourceRect.offset(sourceImage.offsetX,sourceImage.offsetY);
			destPoint.offset(this.offsetX,this.offsetY);
			if(alphaImage != null && alphaPoint != null) alphaPoint.offset(alphaImage.offsetX,alphaImage.offsetY);
			this.buffer.__srcBitmapData.copyPixels(sourceImage.buffer.__srcBitmapData,sourceRect.__toFlashRectangle(),destPoint.__toFlashPoint(),alphaImage != null?alphaImage.buffer.get_src():null,alphaPoint != null?alphaPoint.__toFlashPoint():null,mergeAlpha);
			break;
		default:
		}
	}
	,fillRect: function(rect,color,format) {
		rect = this.__clipRect(rect);
		if(this.buffer == null || rect == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.fillRect(this,rect,color,format);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.fillRect(this,rect,color,format);
			break;
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			if(format == null || format == 0) color = (color & 255) << 24 | color >> 8;
			this.buffer.__srcBitmapData.fillRect(rect.__toFlashRectangle(),color);
			break;
		default:
		}
	}
	,resize: function(newWidth,newHeight) {
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.resize(this,newWidth,newHeight);
			break;
		case 1:
			lime_graphics_utils_ImageDataUtil.resize(this,newWidth,newHeight);
			break;
		case 2:
			break;
		default:
		}
		this.buffer.width = newWidth;
		this.buffer.height = newHeight;
		this.offsetX = 0;
		this.offsetY = 0;
		this.width = newWidth;
		this.height = newHeight;
	}
	,setPixel32: function(x,y,color,format) {
		if(this.buffer == null || x < 0 || y < 0 || x >= this.width || y >= this.height) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.setPixel32(this,x,y,color,format);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.setPixel32(this,x,y,color,format);
			break;
		case 2:
			if(format == null || format == 0) color = (color & 255) << 24 | color >> 8;
			this.buffer.__srcBitmapData.setPixel32(x + this.offsetX,y + this.offsetY,color);
			break;
		default:
		}
	}
	,__clipRect: function(r) {
		if(r == null) return null;
		if(r.x < 0) {
			r.width -= -r.x;
			r.x = 0;
			if(r.x + r.width <= 0) return null;
		}
		if(r.y < 0) {
			r.height -= -r.y;
			r.y = 0;
			if(r.y + r.height <= 0) return null;
		}
		if(r.x + r.width >= this.width) {
			r.width -= r.x + r.width - this.width;
			if(r.width <= 0) return null;
		}
		if(r.y + r.height >= this.height) {
			r.height -= r.y + r.height - this.height;
			if(r.height <= 0) return null;
		}
		return r;
	}
	,__fromBase64: function(base64,type,onload) {
		var _g = this;
		var image = new Image();
		var image_onLoaded = function(event) {
			_g.buffer = new lime_graphics_ImageBuffer(null,image.width,image.height);
			_g.buffer.__srcImage = image;
			_g.offsetX = 0;
			_g.offsetY = 0;
			_g.width = _g.buffer.width;
			_g.height = _g.buffer.height;
			if(onload != null) onload(_g);
		};
		image.addEventListener("load",image_onLoaded,false);
		image.src = "data:" + type + ";base64," + base64;
	}
	,__fromImageBuffer: function(buffer) {
		this.buffer = buffer;
		if(buffer != null) {
			if(this.width == -1) this.width = buffer.width;
			if(this.height == -1) this.height = buffer.height;
		}
	}
	,get_data: function() {
		if(this.buffer.data == null && this.buffer.width > 0 && this.buffer.height > 0) {
			lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this);
			lime_graphics_utils_ImageCanvasUtil.sync(this);
			lime_graphics_utils_ImageCanvasUtil.createImageData(this);
		}
		return this.buffer.data;
	}
	,get_format: function() {
		return this.buffer.format;
	}
	,set_format: function(value) {
		if(this.buffer.format != value) {
			var _g = this.type;
			switch(_g[1]) {
			case 1:
				lime_graphics_utils_ImageDataUtil.setFormat(this,value);
				break;
			default:
			}
		}
		return this.buffer.format = value;
	}
	,get_powerOfTwo: function() {
		return this.buffer.width != 0 && (this.buffer.width & ~this.buffer.width + 1) == this.buffer.width && (this.buffer.height != 0 && (this.buffer.height & ~this.buffer.height + 1) == this.buffer.height);
	}
	,get_premultiplied: function() {
		return this.buffer.premultiplied;
	}
	,set_premultiplied: function(value) {
		if(value && !this.buffer.premultiplied) {
			var _g = this.type;
			switch(_g[1]) {
			case 1:
				lime_graphics_utils_ImageCanvasUtil.convertToData(this);
				lime_graphics_utils_ImageDataUtil.multiplyAlpha(this);
				break;
			default:
			}
		} else if(!value && this.buffer.premultiplied) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 1:
				lime_graphics_utils_ImageCanvasUtil.convertToData(this);
				lime_graphics_utils_ImageDataUtil.unmultiplyAlpha(this);
				break;
			default:
			}
		}
		return value;
	}
	,get_src: function() {
		return this.buffer.get_src();
	}
	,get_transparent: function() {
		if(this.buffer == null) return false;
		return this.buffer.transparent;
	}
	,set_transparent: function(value) {
		if(this.buffer == null) return false;
		return this.buffer.transparent = value;
	}
	,__class__: lime_graphics_Image
	,__properties__: {set_transparent:"set_transparent",get_transparent:"get_transparent",get_src:"get_src",set_premultiplied:"set_premultiplied",get_premultiplied:"get_premultiplied",get_powerOfTwo:"get_powerOfTwo",set_format:"set_format",get_format:"get_format",get_data:"get_data"}
};
var lime_graphics_ImageBuffer = function(data,width,height,bitsPerPixel,format) {
	if(bitsPerPixel == null) bitsPerPixel = 4;
	if(height == null) height = 0;
	if(width == null) width = 0;
	this.data = data;
	this.width = width;
	this.height = height;
	this.bitsPerPixel = bitsPerPixel;
	if(format == null) this.format = 0; else this.format = format;
	this.transparent = true;
};
$hxClasses["lime.graphics.ImageBuffer"] = lime_graphics_ImageBuffer;
lime_graphics_ImageBuffer.__name__ = true;
lime_graphics_ImageBuffer.prototype = {
	clone: function() {
		var buffer = new lime_graphics_ImageBuffer(this.data,this.width,this.height,this.bitsPerPixel);
		if(this.data != null) {
			buffer.data = new Uint8Array(this.data.byteLength);
			var copy = new Uint8Array(this.data);
			buffer.data.set(copy);
		} else if(this.__srcImageData != null) {
			buffer.__srcCanvas = window.document.createElement("canvas");
			buffer.__srcContext = buffer.__srcCanvas.getContext("2d");
			buffer.__srcCanvas.width = this.__srcImageData.width;
			buffer.__srcCanvas.height = this.__srcImageData.height;
			buffer.__srcImageData = buffer.__srcContext.createImageData(this.__srcImageData.width,this.__srcImageData.height);
			var copy1 = new Uint8ClampedArray(this.__srcImageData.data);
			buffer.__srcImageData.data.set(copy1);
		} else if(this.__srcCanvas != null) {
			buffer.__srcCanvas = window.document.createElement("canvas");
			buffer.__srcContext = buffer.__srcCanvas.getContext("2d");
			buffer.__srcCanvas.width = this.__srcCanvas.width;
			buffer.__srcCanvas.height = this.__srcCanvas.height;
			buffer.__srcContext.drawImage(this.__srcCanvas,0,0);
		} else buffer.__srcImage = this.__srcImage;
		buffer.premultiplied = this.premultiplied;
		buffer.transparent = this.transparent;
		return buffer;
	}
	,get_src: function() {
		if(this.__srcImage != null) return this.__srcImage;
		return this.__srcCanvas;
	}
	,set_src: function(value) {
		if(js_Boot.__instanceof(value,Image)) this.__srcImage = value; else if(js_Boot.__instanceof(value,HTMLCanvasElement)) {
			this.__srcCanvas = value;
			this.__srcContext = this.__srcCanvas.getContext("2d");
		}
		return value;
	}
	,__class__: lime_graphics_ImageBuffer
	,__properties__: {set_src:"set_src",get_src:"get_src"}
};
var lime_graphics_ImageChannel = $hxClasses["lime.graphics.ImageChannel"] = { __ename__ : true, __constructs__ : ["RED","GREEN","BLUE","ALPHA"] };
lime_graphics_ImageChannel.RED = ["RED",0];
lime_graphics_ImageChannel.RED.toString = $estr;
lime_graphics_ImageChannel.RED.__enum__ = lime_graphics_ImageChannel;
lime_graphics_ImageChannel.GREEN = ["GREEN",1];
lime_graphics_ImageChannel.GREEN.toString = $estr;
lime_graphics_ImageChannel.GREEN.__enum__ = lime_graphics_ImageChannel;
lime_graphics_ImageChannel.BLUE = ["BLUE",2];
lime_graphics_ImageChannel.BLUE.toString = $estr;
lime_graphics_ImageChannel.BLUE.__enum__ = lime_graphics_ImageChannel;
lime_graphics_ImageChannel.ALPHA = ["ALPHA",3];
lime_graphics_ImageChannel.ALPHA.toString = $estr;
lime_graphics_ImageChannel.ALPHA.__enum__ = lime_graphics_ImageChannel;
var lime_graphics_ImageType = $hxClasses["lime.graphics.ImageType"] = { __ename__ : true, __constructs__ : ["CANVAS","DATA","FLASH","CUSTOM"] };
lime_graphics_ImageType.CANVAS = ["CANVAS",0];
lime_graphics_ImageType.CANVAS.toString = $estr;
lime_graphics_ImageType.CANVAS.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.DATA = ["DATA",1];
lime_graphics_ImageType.DATA.toString = $estr;
lime_graphics_ImageType.DATA.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.FLASH = ["FLASH",2];
lime_graphics_ImageType.FLASH.toString = $estr;
lime_graphics_ImageType.FLASH.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.CUSTOM = ["CUSTOM",3];
lime_graphics_ImageType.CUSTOM.toString = $estr;
lime_graphics_ImageType.CUSTOM.__enum__ = lime_graphics_ImageType;
var lime_graphics_RenderContext = $hxClasses["lime.graphics.RenderContext"] = { __ename__ : true, __constructs__ : ["OPENGL","CANVAS","DOM","FLASH","CAIRO","CONSOLE","CUSTOM","NONE"] };
lime_graphics_RenderContext.OPENGL = function(gl) { var $x = ["OPENGL",0,gl]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CANVAS = function(context) { var $x = ["CANVAS",1,context]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.DOM = function(element) { var $x = ["DOM",2,element]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.FLASH = function(stage) { var $x = ["FLASH",3,stage]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CAIRO = function(cairo) { var $x = ["CAIRO",4,cairo]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CONSOLE = function(context) { var $x = ["CONSOLE",5,context]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CUSTOM = function(data) { var $x = ["CUSTOM",6,data]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.NONE = ["NONE",7];
lime_graphics_RenderContext.NONE.toString = $estr;
lime_graphics_RenderContext.NONE.__enum__ = lime_graphics_RenderContext;
var lime_graphics_Renderer = function(window) {
	this.onRender = new lime_app_Event();
	this.onRenderContextRestored = new lime_app_Event();
	this.onRenderContextLost = new lime_app_Event();
	this.window = window;
	this.backend = new lime__$backend_html5_HTML5Renderer(this);
	this.window.currentRenderer = this;
};
$hxClasses["lime.graphics.Renderer"] = lime_graphics_Renderer;
lime_graphics_Renderer.__name__ = true;
lime_graphics_Renderer.prototype = {
	create: function() {
		this.backend.create();
	}
	,flip: function() {
		this.backend.flip();
	}
	,__class__: lime_graphics_Renderer
};
var lime_graphics_cairo_Cairo = function(surface) {
	if(surface != null) {
	}
};
$hxClasses["lime.graphics.cairo.Cairo"] = lime_graphics_cairo_Cairo;
lime_graphics_cairo_Cairo.__name__ = true;
lime_graphics_cairo_Cairo.prototype = {
	arc: function(xc,yc,radius,angle1,angle2) {
	}
	,clip: function() {
	}
	,clipPreserve: function() {
	}
	,closePath: function() {
	}
	,curveTo: function(x1,y1,x2,y2,x3,y3) {
	}
	,destroy: function() {
	}
	,fill: function() {
	}
	,fillPreserve: function() {
	}
	,identityMatrix: function() {
	}
	,lineTo: function(x,y) {
	}
	,moveTo: function(x,y) {
	}
	,newPath: function() {
	}
	,paint: function() {
	}
	,paintWithAlpha: function(alpha) {
	}
	,rectangle: function(x,y,width,height) {
	}
	,restore: function() {
	}
	,save: function() {
	}
	,setSourceRGB: function(r,g,b) {
	}
	,setSourceSurface: function(surface,x,y) {
	}
	,strokePreserve: function() {
	}
	,transform: function(matrix) {
	}
	,translate: function(x,y) {
	}
	,get_currentPoint: function() {
		return null;
	}
	,get_hasCurrentPoint: function() {
		return false;
	}
	,set_lineCap: function(value) {
		return value;
	}
	,set_lineJoin: function(value) {
		return value;
	}
	,set_lineWidth: function(value) {
		return value;
	}
	,set_matrix: function(value) {
		return value;
	}
	,set_miterLimit: function(value) {
		return value;
	}
	,set_operator: function(value) {
		return value;
	}
	,set_source: function(value) {
		return value;
	}
	,get_target: function() {
		return 0;
	}
	,__class__: lime_graphics_cairo_Cairo
	,__properties__: {get_target:"get_target",set_source:"set_source",set_operator:"set_operator",set_miterLimit:"set_miterLimit",set_matrix:"set_matrix",set_lineWidth:"set_lineWidth",set_lineJoin:"set_lineJoin",set_lineCap:"set_lineCap",get_hasCurrentPoint:"get_hasCurrentPoint",get_currentPoint:"get_currentPoint"}
};
var lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$ = {};
$hxClasses["lime.graphics.cairo._CairoPattern.CairoPattern_Impl_"] = lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$;
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.__name__ = true;
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.__properties__ = {set_matrix:"set_matrix",get_matrix:"get_matrix",set_extend:"set_extend"}
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.addColorStopRGBA = function(this1,offset,r,g,b,a) {
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createForSurface = function(surface) {
	return 0;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createLinear = function(x0,y0,x1,y1) {
	return 0;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createRadial = function(cx0,cy0,radius0,cx1,cy1,radius1) {
	return 0;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createRGB = function(r,g,b) {
	return 0;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createRGBA = function(r,g,b,a) {
	return 0;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.destroy = function(this1) {
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.set_extend = function(this1,value) {
	return value;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.get_matrix = function(this1) {
	return null;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.set_matrix = function(this1,value) {
	return value;
};
var lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$ = {};
$hxClasses["lime.graphics.cairo._CairoSurface.CairoSurface_Impl_"] = lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$;
lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.__name__ = true;
lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.__properties__ = {get_width:"get_width",get_height:"get_height"}
lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$._new = function(format,width,height) {
	return 0;
};
lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.destroy = function(this1) {
};
lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.fromImage = function(image) {
	return null;
};
lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.get_height = function(this1) {
	return 0;
};
lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.get_width = function(this1) {
	return 0;
};
var lime_graphics_opengl_GL = function() { };
$hxClasses["lime.graphics.opengl.GL"] = lime_graphics_opengl_GL;
lime_graphics_opengl_GL.__name__ = true;
lime_graphics_opengl_GL.context = null;
var lime_graphics_utils_ImageCanvasUtil = function() { };
$hxClasses["lime.graphics.utils.ImageCanvasUtil"] = lime_graphics_utils_ImageCanvasUtil;
lime_graphics_utils_ImageCanvasUtil.__name__ = true;
lime_graphics_utils_ImageCanvasUtil.convertToCanvas = function(image) {
	var buffer = image.buffer;
	if(buffer.__srcImage != null) {
		if(buffer.__srcCanvas == null) {
			lime_graphics_utils_ImageCanvasUtil.createCanvas(image,buffer.__srcImage.width,buffer.__srcImage.height);
			buffer.__srcContext.drawImage(buffer.__srcImage,0,0);
		}
		buffer.__srcImage = null;
	}
};
lime_graphics_utils_ImageCanvasUtil.convertToData = function(image) {
	if(image.buffer.data == null) {
		lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
		lime_graphics_utils_ImageCanvasUtil.sync(image);
		lime_graphics_utils_ImageCanvasUtil.createImageData(image);
		image.buffer.__srcCanvas = null;
		image.buffer.__srcContext = null;
	}
};
lime_graphics_utils_ImageCanvasUtil.copyChannel = function(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(sourceImage);
	lime_graphics_utils_ImageCanvasUtil.createImageData(sourceImage);
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.copyChannel(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
};
lime_graphics_utils_ImageCanvasUtil.copyPixels = function(image,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha) {
	if(mergeAlpha == null) mergeAlpha = false;
	if(alphaImage != null && alphaImage.get_transparent()) {
		if(alphaPoint == null) alphaPoint = new lime_math_Vector2();
		var tempData = image.clone();
		tempData.copyChannel(alphaImage,new lime_math_Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new lime_math_Vector2(sourceRect.x,sourceRect.y),lime_graphics_ImageChannel.ALPHA,lime_graphics_ImageChannel.ALPHA);
		sourceImage = tempData;
	}
	lime_graphics_utils_ImageCanvasUtil.sync(image);
	if(!mergeAlpha) {
		if(image.get_transparent() && sourceImage.get_transparent()) image.buffer.__srcContext.clearRect(destPoint.x + image.offsetX,destPoint.y + image.offsetY,sourceRect.width + image.offsetX,sourceRect.height + image.offsetY);
	}
	lime_graphics_utils_ImageCanvasUtil.sync(sourceImage);
	if(sourceImage.buffer.get_src() != null) image.buffer.__srcContext.drawImage(sourceImage.buffer.get_src(),sourceRect.x + sourceImage.offsetX | 0,sourceRect.y + sourceImage.offsetY | 0,sourceRect.width | 0,sourceRect.height | 0,destPoint.x + image.offsetX | 0,destPoint.y + image.offsetY | 0,sourceRect.width | 0,sourceRect.height | 0);
};
lime_graphics_utils_ImageCanvasUtil.createCanvas = function(image,width,height) {
	var buffer = image.buffer;
	if(buffer.__srcCanvas == null) {
		buffer.__srcCanvas = window.document.createElement("canvas");
		buffer.__srcCanvas.width = width;
		buffer.__srcCanvas.height = height;
		if(!image.get_transparent()) {
			if(!image.get_transparent()) buffer.__srcCanvas.setAttribute("moz-opaque","true");
			buffer.__srcContext = buffer.__srcCanvas.getContext ("2d", { alpha: false });
		} else buffer.__srcContext = buffer.__srcCanvas.getContext("2d");
		buffer.__srcContext.mozImageSmoothingEnabled = false;
		buffer.__srcContext.imageSmoothingEnabled = false;
		buffer.__srcContext.imageSmoothingEnabled = false;
	}
};
lime_graphics_utils_ImageCanvasUtil.createImageData = function(image) {
	var buffer = image.buffer;
	if(buffer.data == null) {
		buffer.__srcImageData = buffer.__srcContext.getImageData(0,0,buffer.width,buffer.height);
		buffer.data = new Uint8Array(buffer.__srcImageData.data.buffer);
	}
};
lime_graphics_utils_ImageCanvasUtil.fillRect = function(image,rect,color,format) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.sync(image);
	if(rect.x == 0 && rect.y == 0 && rect.width == image.width && rect.height == image.height) {
		if(image.get_transparent() && (color & 255) == 0) {
			image.buffer.__srcCanvas.width = image.buffer.width;
			return;
		}
	}
	var r;
	var g;
	var b;
	var a;
	if(format == 1) {
		r = color >> 16 & 255;
		g = color >> 8 & 255;
		b = color & 255;
		if(image.get_transparent()) a = color >> 24 & 255; else a = 255;
	} else {
		r = color >> 24 & 255;
		g = color >> 16 & 255;
		b = color >> 8 & 255;
		if(image.get_transparent()) a = color & 255; else a = 255;
	}
	image.buffer.__srcContext.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
	image.buffer.__srcContext.fillRect(rect.x + image.offsetX,rect.y + image.offsetY,rect.width + image.offsetX,rect.height + image.offsetY);
};
lime_graphics_utils_ImageCanvasUtil.resize = function(image,newWidth,newHeight) {
	var buffer = image.buffer;
	if(buffer.__srcCanvas == null) {
		lime_graphics_utils_ImageCanvasUtil.createCanvas(image,newWidth,newHeight);
		buffer.__srcContext.drawImage(buffer.get_src(),0,0,newWidth,newHeight);
	} else {
		lime_graphics_utils_ImageCanvasUtil.sync(image);
		var sourceCanvas = buffer.__srcCanvas;
		buffer.__srcCanvas = null;
		lime_graphics_utils_ImageCanvasUtil.createCanvas(image,newWidth,newHeight);
		buffer.__srcContext.drawImage(sourceCanvas,0,0,newWidth,newHeight);
	}
};
lime_graphics_utils_ImageCanvasUtil.setPixel32 = function(image,x,y,color,format) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.setPixel32(image,x,y,color,format);
};
lime_graphics_utils_ImageCanvasUtil.sync = function(image) {
	if(image.dirty && image.type != lime_graphics_ImageType.DATA) {
		image.buffer.__srcContext.putImageData(image.buffer.__srcImageData,0,0);
		image.buffer.data = null;
		image.dirty = false;
	}
};
var lime_graphics_utils_ImageDataUtil = function() { };
$hxClasses["lime.graphics.utils.ImageDataUtil"] = lime_graphics_utils_ImageDataUtil;
lime_graphics_utils_ImageDataUtil.__name__ = true;
lime_graphics_utils_ImageDataUtil.__alpha16 = null;
lime_graphics_utils_ImageDataUtil.__clamp = null;
lime_graphics_utils_ImageDataUtil.copyChannel = function(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
	var destIdx;
	switch(destChannel[1]) {
	case 0:
		destIdx = 0;
		break;
	case 1:
		destIdx = 1;
		break;
	case 2:
		destIdx = 2;
		break;
	case 3:
		destIdx = 3;
		break;
	}
	var srcIdx;
	switch(sourceChannel[1]) {
	case 0:
		srcIdx = 0;
		break;
	case 1:
		srcIdx = 1;
		break;
	case 2:
		srcIdx = 2;
		break;
	case 3:
		srcIdx = 3;
		break;
	}
	var srcData = sourceImage.buffer.data;
	var destData = image.buffer.data;
	if(srcData == null || destData == null) return;
	var srcStride = sourceImage.buffer.width * 4 | 0;
	var srcPosition = (sourceRect.x + sourceImage.offsetX) * 4 + srcStride * (sourceRect.y + sourceImage.offsetY) + srcIdx | 0;
	var srcRowOffset = srcStride - (4 * (sourceRect.width + sourceImage.offsetX) | 0);
	var srcRowEnd = 4 * (sourceRect.x + sourceImage.offsetX + sourceRect.width) | 0;
	var srcData1 = sourceImage.buffer.data;
	var destStride = image.buffer.width * 4 | 0;
	var destPosition = (destPoint.x + image.offsetX) * 4 + destStride * (destPoint.y + image.offsetY) + destIdx | 0;
	var destRowOffset = destStride - (4 * (sourceRect.width + image.offsetX) | 0);
	var destRowEnd = 4 * (destPoint.x + image.offsetX + sourceRect.width) | 0;
	var destData1 = image.buffer.data;
	var length = sourceRect.width * sourceRect.height | 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		destData1[destPosition] = srcData1[srcPosition];
		srcPosition += 4;
		destPosition += 4;
		if(srcPosition % srcStride > srcRowEnd) srcPosition += srcRowOffset;
		if(destPosition % destStride > destRowEnd) destPosition += destRowOffset;
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.copyPixels = function(image,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha) {
	if(mergeAlpha == null) mergeAlpha = false;
	if(alphaImage != null && alphaImage.get_transparent()) {
		if(alphaPoint == null) alphaPoint = new lime_math_Vector2();
		var tempData = image.clone();
		tempData.copyChannel(alphaImage,new lime_math_Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new lime_math_Vector2(sourceRect.x,sourceRect.y),lime_graphics_ImageChannel.ALPHA,lime_graphics_ImageChannel.ALPHA);
		sourceImage = tempData;
	}
	var rowOffset = destPoint.y + image.offsetY - sourceRect.y - sourceImage.offsetY | 0;
	var columnOffset = destPoint.x + image.offsetX - sourceRect.x - sourceImage.offsetY | 0;
	var sourceData = sourceImage.buffer.data;
	var sourceStride = sourceImage.buffer.width * 4;
	var sourceOffset = 0;
	var data = image.buffer.data;
	var stride = image.buffer.width * 4;
	var offset = 0;
	if(!mergeAlpha || !sourceImage.get_transparent()) {
		var _g1 = Std["int"](sourceRect.get_top() + sourceImage.offsetY);
		var _g = Std["int"](sourceRect.get_bottom() + sourceImage.offsetY);
		while(_g1 < _g) {
			var row = _g1++;
			var _g3 = Std["int"](sourceRect.get_left() + sourceImage.offsetX);
			var _g2 = Std["int"](sourceRect.get_right() + sourceImage.offsetX);
			while(_g3 < _g2) {
				var column = _g3++;
				sourceOffset = row * sourceStride + column * 4;
				offset = (row + rowOffset) * stride + (column + columnOffset) * 4;
				data[offset] = sourceData[sourceOffset];
				data[offset + 1] = sourceData[sourceOffset + 1];
				data[offset + 2] = sourceData[sourceOffset + 2];
				data[offset + 3] = sourceData[sourceOffset + 3];
			}
		}
	} else {
		var sourceAlpha;
		var destAlpha;
		var outA;
		var oneMinusSourceAlpha;
		var _g11 = Std["int"](sourceRect.get_top() + sourceImage.offsetY);
		var _g4 = Std["int"](sourceRect.get_bottom() + sourceImage.offsetY);
		while(_g11 < _g4) {
			var row1 = _g11++;
			var _g31 = Std["int"](sourceRect.get_left() + sourceImage.offsetX);
			var _g21 = Std["int"](sourceRect.get_right() + sourceImage.offsetX);
			while(_g31 < _g21) {
				var column1 = _g31++;
				sourceOffset = row1 * sourceStride + column1 * 4;
				offset = (row1 + rowOffset) * stride + (column1 + columnOffset) * 4;
				sourceAlpha = sourceData[sourceOffset + 3] / 255.0;
				destAlpha = data[offset + 3] / 255.0;
				oneMinusSourceAlpha = 1 - sourceAlpha;
				outA = sourceAlpha + destAlpha * oneMinusSourceAlpha;
				var index = Math.round((sourceData[sourceOffset] * sourceAlpha + data[offset] * destAlpha * oneMinusSourceAlpha) / outA);
				data[offset] = lime_graphics_utils_ImageDataUtil.__clamp[index];
				var index1 = Math.round((sourceData[sourceOffset + 1] * sourceAlpha + data[offset + 1] * destAlpha * oneMinusSourceAlpha) / outA);
				data[offset + 1] = lime_graphics_utils_ImageDataUtil.__clamp[index1];
				var index2 = Math.round((sourceData[sourceOffset + 2] * sourceAlpha + data[offset + 2] * destAlpha * oneMinusSourceAlpha) / outA);
				data[offset + 2] = lime_graphics_utils_ImageDataUtil.__clamp[index2];
				var index3 = Math.round(outA * 255.0);
				data[offset + 3] = lime_graphics_utils_ImageDataUtil.__clamp[index3];
			}
		}
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.fillRect = function(image,rect,color,format) {
	var r;
	var g;
	var b;
	var a;
	if(format == 1) {
		if(image.get_transparent()) a = color >> 24 & 255; else a = 255;
		r = color >> 16 & 255;
		g = color >> 8 & 255;
		b = color & 255;
	} else {
		r = color >> 24 & 255;
		g = color >> 16 & 255;
		b = color >> 8 & 255;
		if(image.get_transparent()) a = color & 255; else a = 255;
	}
	var rgba = r | g << 8 | b << 16 | a << 24;
	var data = image.buffer.data;
	if(data == null) return;
	if(rect.width == image.buffer.width && rect.height == image.buffer.height && rect.x == 0 && rect.y == 0 && image.offsetX == 0 && image.offsetY == 0) {
		var length = image.buffer.width * image.buffer.height;
		var j = 0;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			j = i * 4;
			data[j] = r;
			data[j + 1] = g;
			data[j + 2] = b;
			data[j + 3] = a;
		}
	} else {
		var stride = image.buffer.width * 4;
		var offset;
		var rowStart = rect.y + image.offsetY | 0;
		var rowEnd = Std["int"](rect.get_bottom() + image.offsetY);
		var columnStart = rect.x + image.offsetX | 0;
		var columnEnd = Std["int"](rect.get_right() + image.offsetX);
		var _g1 = rowStart;
		while(_g1 < rowEnd) {
			var row = _g1++;
			var _g11 = columnStart;
			while(_g11 < columnEnd) {
				var column = _g11++;
				offset = row * stride + column * 4;
				data[offset] = r;
				data[offset + 1] = g;
				data[offset + 2] = b;
				data[offset + 3] = a;
			}
		}
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.multiplyAlpha = function(image) {
	var data = image.buffer.data;
	if(data == null) return;
	var index;
	var a16;
	var length = data.length / 4 | 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		index = i * 4;
		a16 = lime_graphics_utils_ImageDataUtil.__alpha16[data[index + 3]];
		data[index] = data[index] * a16 >> 16;
		data[index + 1] = data[index + 1] * a16 >> 16;
		data[index + 2] = data[index + 2] * a16 >> 16;
	}
	image.buffer.premultiplied = true;
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.resize = function(image,newWidth,newHeight) {
	var buffer = image.buffer;
	if(buffer.width == newWidth && buffer.height == newHeight) return;
	var newBuffer = new lime_graphics_ImageBuffer(new Uint8Array(newWidth * newHeight * 4),newWidth,newHeight);
	var imageWidth = image.width;
	var imageHeight = image.height;
	var data = image.get_data();
	var newData = newBuffer.data;
	var sourceIndex;
	var sourceIndexX;
	var sourceIndexY;
	var sourceIndexXY;
	var index;
	var sourceX;
	var sourceY;
	var u;
	var v;
	var uRatio;
	var vRatio;
	var uOpposite;
	var vOpposite;
	var _g = 0;
	while(_g < newHeight) {
		var y = _g++;
		var _g1 = 0;
		while(_g1 < newWidth) {
			var x = _g1++;
			u = (x + 0.5) / newWidth * imageWidth - 0.5;
			v = (y + 0.5) / newHeight * imageHeight - 0.5;
			sourceX = u | 0;
			sourceY = v | 0;
			sourceIndex = (sourceY * imageWidth + sourceX) * 4;
			if(sourceX < imageWidth - 1) sourceIndexX = sourceIndex + 4; else sourceIndexX = sourceIndex;
			if(sourceY < imageHeight - 1) sourceIndexY = sourceIndex + imageWidth * 4; else sourceIndexY = sourceIndex;
			if(sourceIndexX != sourceIndex) sourceIndexXY = sourceIndexY + 4; else sourceIndexXY = sourceIndexY;
			index = (y * newWidth + x) * 4;
			uRatio = u - sourceX;
			vRatio = v - sourceY;
			uOpposite = 1 - uRatio;
			vOpposite = 1 - vRatio;
			newData[index] = (data[sourceIndex] * uOpposite + data[sourceIndexX] * uRatio) * vOpposite + (data[sourceIndexY] * uOpposite + data[sourceIndexXY] * uRatio) * vRatio | 0;
			newData[index + 1] = (data[sourceIndex + 1] * uOpposite + data[sourceIndexX + 1] * uRatio) * vOpposite + (data[sourceIndexY + 1] * uOpposite + data[sourceIndexXY + 1] * uRatio) * vRatio | 0;
			newData[index + 2] = (data[sourceIndex + 2] * uOpposite + data[sourceIndexX + 2] * uRatio) * vOpposite + (data[sourceIndexY + 2] * uOpposite + data[sourceIndexXY + 2] * uRatio) * vRatio | 0;
			if(data[sourceIndexX + 3] == 0 || data[sourceIndexY + 3] == 0 || data[sourceIndexXY + 3] == 0) newData[index + 3] = 0; else newData[index + 3] = data[sourceIndex + 3];
		}
	}
	buffer.data = newBuffer.data;
	buffer.width = newWidth;
	buffer.height = newHeight;
};
lime_graphics_utils_ImageDataUtil.setFormat = function(image,format) {
	var data = image.buffer.data;
	if(data == null) return;
	var index;
	var a16;
	var length = data.length / 4 | 0;
	var r1;
	var g1;
	var b1;
	var a1;
	var r2;
	var g2;
	var b2;
	var a2;
	var r;
	var g;
	var b;
	var a;
	var _g = image.get_format();
	switch(_g) {
	case 0:
		r1 = 0;
		g1 = 1;
		b1 = 2;
		a1 = 3;
		break;
	case 1:
		r1 = 1;
		g1 = 2;
		b1 = 3;
		a1 = 0;
		break;
	case 2:
		r1 = 2;
		g1 = 1;
		b1 = 0;
		a1 = 3;
		break;
	}
	switch(format) {
	case 0:
		r2 = 0;
		g2 = 1;
		b2 = 2;
		a2 = 3;
		break;
	case 1:
		r2 = 1;
		g2 = 2;
		b2 = 3;
		a2 = 0;
		break;
	case 2:
		r2 = 2;
		g2 = 1;
		b2 = 0;
		a2 = 3;
		break;
	}
	var _g1 = 0;
	while(_g1 < length) {
		var i = _g1++;
		index = i * 4;
		r = data[index + r1];
		g = data[index + g1];
		b = data[index + b1];
		a = data[index + a1];
		data[index + r2] = r;
		data[index + g2] = g;
		data[index + b2] = b;
		data[index + a2] = a;
	}
	image.buffer.format = format;
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.setPixel32 = function(image,x,y,color,format) {
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	var a;
	var r;
	var g;
	var b;
	if(format == 1) {
		if(image.get_transparent()) a = color >> 24 & 255; else a = 255;
		r = color >> 16 & 255;
		g = color >> 8 & 255;
		b = color & 255;
	} else {
		r = color >> 24 & 255;
		g = color >> 16 & 255;
		b = color >> 8 & 255;
		if(image.get_transparent()) a = color & 255; else a = 255;
	}
	if(image.get_transparent() && image.get_premultiplied()) {
		var a16 = lime_graphics_utils_ImageDataUtil.__alpha16[a];
		data[offset] = r * a16 >> 16;
		data[offset + 1] = g * a16 >> 16;
		data[offset + 2] = b * a16 >> 16;
		data[offset + 3] = a;
	} else {
		data[offset] = r;
		data[offset + 1] = g;
		data[offset + 2] = b;
		data[offset + 3] = a;
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.unmultiplyAlpha = function(image) {
	var data = image.buffer.data;
	if(data == null) return;
	var index;
	var a;
	var unmultiply;
	var length = data.length / 4 | 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		index = i * 4;
		a = data[index + 3];
		if(a != 0) {
			unmultiply = 255.0 / a;
			data[index] = lime_graphics_utils_ImageDataUtil.__clamp[data[index] * unmultiply | 0];
			data[index + 1] = lime_graphics_utils_ImageDataUtil.__clamp[data[index + 1] * unmultiply | 0];
			data[index + 2] = lime_graphics_utils_ImageDataUtil.__clamp[data[index + 2] * unmultiply | 0];
		}
	}
	image.buffer.premultiplied = false;
	image.dirty = true;
};
var lime_math_Matrix3 = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
};
$hxClasses["lime.math.Matrix3"] = lime_math_Matrix3;
lime_math_Matrix3.__name__ = true;
lime_math_Matrix3.prototype = {
	__class__: lime_math_Matrix3
};
var lime_math_Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["lime.math.Rectangle"] = lime_math_Rectangle;
lime_math_Rectangle.__name__ = true;
lime_math_Rectangle.prototype = {
	offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,__toFlashRectangle: function() {
		return null;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,get_left: function() {
		return this.x;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,get_top: function() {
		return this.y;
	}
	,__class__: lime_math_Rectangle
	,__properties__: {get_top:"get_top",get_right:"get_right",get_left:"get_left",get_bottom:"get_bottom"}
};
var lime_math_Vector2 = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["lime.math.Vector2"] = lime_math_Vector2;
lime_math_Vector2.__name__ = true;
lime_math_Vector2.prototype = {
	offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,__toFlashPoint: function() {
		return null;
	}
	,__class__: lime_math_Vector2
};
var lime_math_Vector4 = function() { };
$hxClasses["lime.math.Vector4"] = lime_math_Vector4;
lime_math_Vector4.__name__ = true;
var lime_net_URLLoader = function(request) {
	this.onSecurityError = new lime_app_Event();
	this.onProgress = new lime_app_Event();
	this.onOpen = new lime_app_Event();
	this.onIOError = new lime_app_Event();
	this.onHTTPStatus = new lime_app_Event();
	this.onComplete = new lime_app_Event();
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.set_dataFormat(lime_net_URLLoaderDataFormat.TEXT);
	if(request != null) this.load(request);
};
$hxClasses["lime.net.URLLoader"] = lime_net_URLLoader;
lime_net_URLLoader.__name__ = true;
lime_net_URLLoader.prototype = {
	getData: function() {
		return null;
	}
	,load: function(request) {
		this.requestUrl(request.url,request.method,request.data,request.formatRequestHeaders());
	}
	,registerEvents: function(subject) {
		var _g = this;
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.__onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s;
			try {
				s = subject.status;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) {
				var listeners = self.onHTTPStatus.listeners;
				var repeat = self.onHTTPStatus.repeat;
				var length = listeners.length;
				var i = 0;
				while(i < length) {
					listeners[i](_g,s);
					if(!repeat[i]) {
						self.onHTTPStatus.remove(listeners[i]);
						length--;
					} else i++;
				}
			}
			if(s != null && s >= 200 && s < 400) self.__onData(subject.response); else if(s == null) {
				var listeners1 = self.onIOError.listeners;
				var repeat1 = self.onIOError.repeat;
				var length1 = listeners1.length;
				var i1 = 0;
				while(i1 < length1) {
					listeners1[i1](_g,"Failed to connect or resolve host");
					if(!repeat1[i1]) {
						self.onIOError.remove(listeners1[i1]);
						length1--;
					} else i1++;
				}
			} else if(s == 12029) {
				var listeners2 = self.onIOError.listeners;
				var repeat2 = self.onIOError.repeat;
				var length2 = listeners2.length;
				var i2 = 0;
				while(i2 < length2) {
					listeners2[i2](_g,"Failed to connect to host");
					if(!repeat2[i2]) {
						self.onIOError.remove(listeners2[i2]);
						length2--;
					} else i2++;
				}
			} else if(s == 12007) {
				var listeners3 = self.onIOError.listeners;
				var repeat3 = self.onIOError.repeat;
				var length3 = listeners3.length;
				var i3 = 0;
				while(i3 < length3) {
					listeners3[i3](_g,"Unknown host");
					if(!repeat3[i3]) {
						self.onIOError.remove(listeners3[i3]);
						length3--;
					} else i3++;
				}
			} else if(s == 0) {
				var listeners4 = self.onIOError.listeners;
				var repeat4 = self.onIOError.repeat;
				var length4 = listeners4.length;
				var i4 = 0;
				while(i4 < length4) {
					listeners4[i4](_g,"Unable to make request (may be blocked due to cross-domain permissions)");
					if(!repeat4[i4]) {
						self.onIOError.remove(listeners4[i4]);
						length4--;
					} else i4++;
				}
				var listeners5 = self.onSecurityError.listeners;
				var repeat5 = self.onSecurityError.repeat;
				var length5 = listeners5.length;
				var i5 = 0;
				while(i5 < length5) {
					listeners5[i5](_g,"Unable to make request (may be blocked due to cross-domain permissions)");
					if(!repeat5[i5]) {
						self.onSecurityError.remove(listeners5[i5]);
						length5--;
					} else i5++;
				}
			} else {
				var listeners6 = self.onIOError.listeners;
				var repeat6 = self.onIOError.repeat;
				var length6 = listeners6.length;
				var i6 = 0;
				while(i6 < length6) {
					listeners6[i6](_g,"Http Error #" + subject.status);
					if(!repeat6[i6]) {
						self.onIOError.remove(listeners6[i6]);
						length6--;
					} else i6++;
				}
			}
		};
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js_Boot.__instanceof(data,lime_utils_ByteArray)) {
			var data1 = data;
			var _g = this.dataFormat;
			switch(_g[1]) {
			case 0:
				uri = data1.data.buffer;
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
		} else if(js_Boot.__instanceof(data,lime_net_URLVariables)) {
			var data2 = data;
			var _g1 = 0;
			var _g11 = Reflect.fields(data2);
			while(_g1 < _g11.length) {
				var p = _g11[_g1];
				++_g1;
				if(uri.length != 0) uri += "&";
				uri += encodeURIComponent(p) + "=" + StringTools.urlEncode(Reflect.field(data2,p));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open("GET",url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(js_Boot.__cast(method , String),url,true);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			var listeners = this.onIOError.listeners;
			var repeat = this.onIOError.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i](this,e.toString());
				if(!repeat[i]) {
					this.onIOError.remove(listeners[i]);
					length--;
				} else i++;
			}
			return;
		}
		var _g2 = this.dataFormat;
		switch(_g2[1]) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g3 = 0;
		while(_g3 < requestHeaders.length) {
			var header = requestHeaders[_g3];
			++_g3;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		var listeners1 = this.onOpen.listeners;
		var repeat1 = this.onOpen.repeat;
		var length1 = listeners1.length;
		var i1 = 0;
		while(i1 < length1) {
			listeners1[i1](this);
			if(!repeat1[i1]) {
				this.onOpen.remove(listeners1[i1]);
				length1--;
			} else i1++;
		}
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
	}
	,__onData: function(_) {
		var content = this.getData();
		var _g = this.dataFormat;
		switch(_g[1]) {
		case 0:
			this.data = lime_utils_ByteArray.__ofBuffer(content);
			break;
		default:
			this.data = Std.string(content);
		}
		var listeners = this.onComplete.listeners;
		var repeat = this.onComplete.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](this);
			if(!repeat[i]) {
				this.onComplete.remove(listeners[i]);
				length--;
			} else i++;
		}
	}
	,__onProgress: function(event) {
		this.bytesLoaded = event.loaded;
		this.bytesTotal = event.total;
		var listeners = this.onProgress.listeners;
		var repeat = this.onProgress.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](this,this.bytesLoaded,this.bytesTotal);
			if(!repeat[i]) {
				this.onProgress.remove(listeners[i]);
				length--;
			} else i++;
		}
	}
	,set_dataFormat: function(inputVal) {
		if(inputVal == lime_net_URLLoaderDataFormat.BINARY && !Reflect.hasField(window,"ArrayBuffer")) this.dataFormat = lime_net_URLLoaderDataFormat.TEXT; else this.dataFormat = inputVal;
		return this.dataFormat;
	}
	,__class__: lime_net_URLLoader
	,__properties__: {set_dataFormat:"set_dataFormat"}
};
var lime_net_URLLoaderDataFormat = $hxClasses["lime.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] };
lime_net_URLLoaderDataFormat.BINARY = ["BINARY",0];
lime_net_URLLoaderDataFormat.BINARY.toString = $estr;
lime_net_URLLoaderDataFormat.BINARY.__enum__ = lime_net_URLLoaderDataFormat;
lime_net_URLLoaderDataFormat.TEXT = ["TEXT",1];
lime_net_URLLoaderDataFormat.TEXT.toString = $estr;
lime_net_URLLoaderDataFormat.TEXT.__enum__ = lime_net_URLLoaderDataFormat;
lime_net_URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
lime_net_URLLoaderDataFormat.VARIABLES.toString = $estr;
lime_net_URLLoaderDataFormat.VARIABLES.__enum__ = lime_net_URLLoaderDataFormat;
var lime_net_URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = "GET";
	this.contentType = null;
};
$hxClasses["lime.net.URLRequest"] = lime_net_URLRequest;
lime_net_URLRequest.__name__ = true;
lime_net_URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == "GET" || this.data == null) return res;
		if(typeof(this.data) == "string" || js_Boot.__instanceof(this.data,lime_utils_ByteArray)) {
			res = res.slice();
			res.push(new lime_net_URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,__class__: lime_net_URLRequest
};
var lime_net_URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["lime.net.URLRequestHeader"] = lime_net_URLRequestHeader;
lime_net_URLRequestHeader.__name__ = true;
lime_net_URLRequestHeader.prototype = {
	__class__: lime_net_URLRequestHeader
};
var lime_net_URLVariables = function() { };
$hxClasses["lime.net.URLVariables"] = lime_net_URLVariables;
lime_net_URLVariables.__name__ = true;
var lime_system_System = function() { };
$hxClasses["lime.system.System"] = lime_system_System;
lime_system_System.__name__ = true;
lime_system_System.embed = $hx_exports.lime.embed = function(element,width,height,background,assetsPrefix) {
	var htmlElement = null;
	if(typeof(element) == "string") htmlElement = window.document.getElementById(js_Boot.__cast(element , String)); else if(element == null) htmlElement = window.document.createElement("div"); else htmlElement = element;
	var color = null;
	if(background != null) {
		background = StringTools.replace(background,"#","");
		if(background.indexOf("0x") > -1) color = Std.parseInt(background); else color = Std.parseInt("0x" + background);
	}
	if(width == null) width = 0;
	if(height == null) height = 0;
	ApplicationMain.config.background = color;
	ApplicationMain.config.element = htmlElement;
	ApplicationMain.config.width = width;
	ApplicationMain.config.height = height;
	ApplicationMain.config.assetsPrefix = assetsPrefix;
	ApplicationMain.create();
};
lime_system_System.getTimer = function() {
	return Std["int"](new Date().getTime());
};
var lime_text_GlyphPosition = function() { };
$hxClasses["lime.text.GlyphPosition"] = lime_text_GlyphPosition;
lime_text_GlyphPosition.__name__ = true;
lime_text_GlyphPosition.prototype = {
	__class__: lime_text_GlyphPosition
};
var lime_text_TextLayout = function(text,font,size,direction,script,language) {
	if(language == null) language = "en";
	if(script == null) script = "Zyyy";
	if(direction == null) direction = 4;
	if(size == null) size = 12;
	if(text == null) text = "";
	this.set_text(text);
	this.set_font(font);
	this.set_size(size);
	this.__direction = direction;
	this.__script = script;
	this.__language = language;
	this.__position();
};
$hxClasses["lime.text.TextLayout"] = lime_text_TextLayout;
lime_text_TextLayout.__name__ = true;
lime_text_TextLayout.prototype = {
	__position: function() {
		this.positions = [];
	}
	,set_font: function(value) {
		if(value == this.font) return value;
		this.font = value;
		this.__position();
		return value;
	}
	,set_size: function(value) {
		if(value == this.size) return value;
		this.size = value;
		this.__position();
		return value;
	}
	,set_text: function(value) {
		if(value == this.text) return value;
		this.text = value;
		this.__position();
		return value;
	}
	,__class__: lime_text_TextLayout
	,__properties__: {set_text:"set_text",set_size:"set_size",set_font:"set_font"}
};
var lime_ui_Gamepad = function() { };
$hxClasses["lime.ui.Gamepad"] = lime_ui_Gamepad;
lime_ui_Gamepad.__name__ = true;
lime_ui_Gamepad.prototype = {
	__class__: lime_ui_Gamepad
};
var lime_ui__$KeyModifier_KeyModifier_$Impl_$ = {};
$hxClasses["lime.ui._KeyModifier.KeyModifier_Impl_"] = lime_ui__$KeyModifier_KeyModifier_$Impl_$;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.__name__ = true;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.__properties__ = {get_shiftKey:"get_shiftKey",get_metaKey:"get_metaKey",get_ctrlKey:"get_ctrlKey",get_altKey:"get_altKey"}
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_altKey = function(this1) {
	return (this1 & 256) > 0 || (this1 & 512) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_ctrlKey = function(this1) {
	return (this1 & 64) > 0 || (this1 & 128) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_metaKey = function(this1) {
	return (this1 & 1024) > 0 || (this1 & 2048) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey = function(this1) {
	return (this1 & 1) > 0 || (this1 & 2) > 0;
};
var lime_ui_Mouse = function() { };
$hxClasses["lime.ui.Mouse"] = lime_ui_Mouse;
lime_ui_Mouse.__name__ = true;
lime_ui_Mouse.__properties__ = {set_cursor:"set_cursor"}
lime_ui_Mouse.set_cursor = function(value) {
	return lime__$backend_html5_HTML5Mouse.set_cursor(value);
};
var lime_ui_MouseCursor = $hxClasses["lime.ui.MouseCursor"] = { __ename__ : true, __constructs__ : ["ARROW","CROSSHAIR","DEFAULT","MOVE","POINTER","RESIZE_NESW","RESIZE_NS","RESIZE_NWSE","RESIZE_WE","TEXT","WAIT","WAIT_ARROW","CUSTOM"] };
lime_ui_MouseCursor.ARROW = ["ARROW",0];
lime_ui_MouseCursor.ARROW.toString = $estr;
lime_ui_MouseCursor.ARROW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.CROSSHAIR = ["CROSSHAIR",1];
lime_ui_MouseCursor.CROSSHAIR.toString = $estr;
lime_ui_MouseCursor.CROSSHAIR.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.DEFAULT = ["DEFAULT",2];
lime_ui_MouseCursor.DEFAULT.toString = $estr;
lime_ui_MouseCursor.DEFAULT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.MOVE = ["MOVE",3];
lime_ui_MouseCursor.MOVE.toString = $estr;
lime_ui_MouseCursor.MOVE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.POINTER = ["POINTER",4];
lime_ui_MouseCursor.POINTER.toString = $estr;
lime_ui_MouseCursor.POINTER.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NESW = ["RESIZE_NESW",5];
lime_ui_MouseCursor.RESIZE_NESW.toString = $estr;
lime_ui_MouseCursor.RESIZE_NESW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NS = ["RESIZE_NS",6];
lime_ui_MouseCursor.RESIZE_NS.toString = $estr;
lime_ui_MouseCursor.RESIZE_NS.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NWSE = ["RESIZE_NWSE",7];
lime_ui_MouseCursor.RESIZE_NWSE.toString = $estr;
lime_ui_MouseCursor.RESIZE_NWSE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_WE = ["RESIZE_WE",8];
lime_ui_MouseCursor.RESIZE_WE.toString = $estr;
lime_ui_MouseCursor.RESIZE_WE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.TEXT = ["TEXT",9];
lime_ui_MouseCursor.TEXT.toString = $estr;
lime_ui_MouseCursor.TEXT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.WAIT = ["WAIT",10];
lime_ui_MouseCursor.WAIT.toString = $estr;
lime_ui_MouseCursor.WAIT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.WAIT_ARROW = ["WAIT_ARROW",11];
lime_ui_MouseCursor.WAIT_ARROW.toString = $estr;
lime_ui_MouseCursor.WAIT_ARROW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.CUSTOM = ["CUSTOM",12];
lime_ui_MouseCursor.CUSTOM.toString = $estr;
lime_ui_MouseCursor.CUSTOM.__enum__ = lime_ui_MouseCursor;
var lime_ui_Window = function(config) {
	this.onWindowRestore = new lime_app_Event();
	this.onWindowResize = new lime_app_Event();
	this.onWindowMove = new lime_app_Event();
	this.onWindowMinimize = new lime_app_Event();
	this.onWindowLeave = new lime_app_Event();
	this.onWindowFullscreen = new lime_app_Event();
	this.onWindowFocusOut = new lime_app_Event();
	this.onWindowFocusIn = new lime_app_Event();
	this.onWindowEnter = new lime_app_Event();
	this.onWindowDeactivate = new lime_app_Event();
	this.onWindowClose = new lime_app_Event();
	this.onWindowActivate = new lime_app_Event();
	this.onTouchStart = new lime_app_Event();
	this.onTouchMove = new lime_app_Event();
	this.onTouchEnd = new lime_app_Event();
	this.onTextInput = new lime_app_Event();
	this.onTextEdit = new lime_app_Event();
	this.onMouseWheel = new lime_app_Event();
	this.onMouseUp = new lime_app_Event();
	this.onMouseMoveRelative = new lime_app_Event();
	this.onMouseMove = new lime_app_Event();
	this.onMouseDown = new lime_app_Event();
	this.onKeyUp = new lime_app_Event();
	this.onKeyDown = new lime_app_Event();
	this.onGamepadDisconnect = new lime_app_Event();
	this.onGamepadConnect = new lime_app_Event();
	this.onGamepadButtonUp = new lime_app_Event();
	this.onGamepadButtonDown = new lime_app_Event();
	this.onGamepadAxisMove = new lime_app_Event();
	this.config = config;
	this.__width = 0;
	this.__height = 0;
	this.__fullscreen = false;
	this.__x = 0;
	this.__y = 0;
	if(config != null) {
		if(Object.prototype.hasOwnProperty.call(config,"width")) this.__width = config.width;
		if(Object.prototype.hasOwnProperty.call(config,"height")) this.__height = config.height;
		if(Object.prototype.hasOwnProperty.call(config,"fullscreen")) this.__fullscreen = config.fullscreen;
	}
	this.backend = new lime__$backend_html5_HTML5Window(this);
};
$hxClasses["lime.ui.Window"] = lime_ui_Window;
lime_ui_Window.__name__ = true;
lime_ui_Window.prototype = {
	create: function(application) {
		this.backend.create(application);
		if(this.currentRenderer != null) this.currentRenderer.create();
	}
	,resize: function(width,height) {
		this.backend.resize(width,height);
		this.__width = width;
		this.__height = height;
	}
	,set_fullscreen: function(value) {
		return this.__fullscreen = this.backend.setFullscreen(value);
	}
	,set_height: function(value) {
		this.resize(this.__width,value);
		return this.__height;
	}
	,set_width: function(value) {
		this.resize(value,this.__height);
		return this.__width;
	}
	,__class__: lime_ui_Window
	,__properties__: {set_width:"set_width",set_height:"set_height",set_fullscreen:"set_fullscreen"}
};
var lime_utils_ByteArray = function(size) {
	if(size == null) size = 0;
	this.allocated = 0;
	this.position = 0;
	this.length = 0;
	if(size > 0) this.allocated = size;
	this.___resizeBuffer(this.allocated);
	this.set_length(this.allocated);
};
$hxClasses["lime.utils.ByteArray"] = lime_utils_ByteArray;
lime_utils_ByteArray.__name__ = true;
lime_utils_ByteArray.__ofBuffer = function(buffer) {
	var bytes = new lime_utils_ByteArray();
	bytes.set_length(bytes.allocated = buffer.byteLength);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
};
lime_utils_ByteArray.prototype = {
	readUTFBytes: function(len) {
		var value = "";
		var max = this.position + len;
		while(this.position < max) {
			var data = this.data;
			var c = data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += String.fromCharCode(c);
			} else if(c < 224) value += String.fromCharCode((c & 63) << 6 | data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | data.getUint8(this.position++) & 127);
			} else {
				var c21 = data.getUint8(this.position++);
				var c3 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 15) << 18 | (c21 & 127) << 12 | c3 << 6 & 127 | data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,writeByte: function(value) {
		var lengthToEnsure = this.position + 1;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure * 2) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		var data = this.data;
		data.setInt8(this.position,value);
		this.position += 1;
	}
	,writeUTFBytes: function(value) {
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) this.writeByte(c); else if(c <= 2047) {
				this.writeByte(192 | c >> 6);
				this.writeByte(128 | c & 63);
			} else if(c <= 65535) {
				this.writeByte(224 | c >> 12);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			} else {
				this.writeByte(240 | c >> 18);
				this.writeByte(128 | c >> 12 & 63);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			}
		}
	}
	,__get: function(pos) {
		return this.data.getInt8(pos);
	}
	,___resizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,__set: function(pos,v) {
		this.data.setUint8(pos,v);
	}
	,set_length: function(value) {
		if(this.allocated < value) this.___resizeBuffer(this.allocated = Std["int"](Math.max(value,this.allocated * 2))); else if(this.allocated > value * 2) this.___resizeBuffer(this.allocated = value);
		this.length = value;
		return value;
	}
	,__class__: lime_utils_ByteArray
	,__properties__: {set_length:"set_length"}
};
var motion_actuators_IGenericActuator = function() { };
$hxClasses["motion.actuators.IGenericActuator"] = motion_actuators_IGenericActuator;
motion_actuators_IGenericActuator.__name__ = true;
motion_actuators_IGenericActuator.prototype = {
	__class__: motion_actuators_IGenericActuator
};
var motion_actuators_GenericActuator = function(target,duration,properties) {
	this._autoVisible = true;
	this._delay = 0;
	this._reflect = false;
	this._repeat = 0;
	this._reverse = false;
	this._smartRotation = false;
	this._snapping = false;
	this.special = false;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	this._ease = motion_Actuate.defaultEase;
};
$hxClasses["motion.actuators.GenericActuator"] = motion_actuators_GenericActuator;
motion_actuators_GenericActuator.__name__ = true;
motion_actuators_GenericActuator.__interfaces__ = [motion_actuators_IGenericActuator];
motion_actuators_GenericActuator.prototype = {
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) Reflect.setField(this.target,i,Reflect.field(this.properties,i)); else Reflect.setProperty(this.target,i,Reflect.field(this.properties,i));
		}
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		return this;
	}
	,callMethod: function(method,params) {
		if(params == null) params = [];
		return Reflect.callMethod(method,method,params);
	}
	,change: function() {
		if(this._onUpdate != null) this.callMethod(this._onUpdate,this._onUpdateParams);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		if(sendEvent) {
			this.change();
			if(this._onComplete != null) this.callMethod(this._onComplete,this._onCompleteParams);
		}
		motion_Actuate.unload(this);
	}
	,delay: function(duration) {
		this._delay = duration;
		return this;
	}
	,ease: function(easing) {
		this._ease = easing;
		return this;
	}
	,move: function() {
	}
	,onComplete: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) this._onCompleteParams = []; else this._onCompleteParams = parameters;
		if(this.duration == 0) this.complete();
		return this;
	}
	,onRepeat: function(handler,parameters) {
		this._onRepeat = handler;
		if(parameters == null) this._onRepeatParams = []; else this._onRepeatParams = parameters;
		return this;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		return this;
	}
	,onPause: function(handler,parameters) {
		this._onPause = handler;
		if(parameters == null) this._onPauseParams = []; else this._onPauseParams = parameters;
		return this;
	}
	,onResume: function(handler,parameters) {
		this._onResume = handler;
		if(parameters == null) this._onResumeParams = []; else this._onResumeParams = parameters;
		return this;
	}
	,pause: function() {
		if(this._onPause != null) this.callMethod(this._onPause,this._onPauseParams);
	}
	,reflect: function(value) {
		if(value == null) value = true;
		this._reflect = value;
		this.special = true;
		return this;
	}
	,repeat: function(times) {
		if(times == null) times = -1;
		this._repeat = times;
		return this;
	}
	,resume: function() {
		if(this._onResume != null) this.callMethod(this._onResume,this._onResumeParams);
	}
	,reverse: function(value) {
		if(value == null) value = true;
		this._reverse = value;
		this.special = true;
		return this;
	}
	,smartRotation: function(value) {
		if(value == null) value = true;
		this._smartRotation = value;
		this.special = true;
		return this;
	}
	,snapping: function(value) {
		if(value == null) value = true;
		this._snapping = value;
		this.special = true;
		return this;
	}
	,stop: function(properties,complete,sendEvent) {
	}
	,__class__: motion_actuators_GenericActuator
};
var motion_actuators_SimpleActuator = function(target,duration,properties) {
	this.active = true;
	this.propertyDetails = [];
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = openfl_Lib.getTimer() / 1000;
	motion_actuators_GenericActuator.call(this,target,duration,properties);
	if(!motion_actuators_SimpleActuator.addedEvent) {
		motion_actuators_SimpleActuator.addedEvent = true;
		openfl_Lib.current.stage.addEventListener(openfl_events_Event.ENTER_FRAME,motion_actuators_SimpleActuator.stage_onEnterFrame);
	}
};
$hxClasses["motion.actuators.SimpleActuator"] = motion_actuators_SimpleActuator;
motion_actuators_SimpleActuator.__name__ = true;
motion_actuators_SimpleActuator.stage_onEnterFrame = function(event) {
	var currentTime = openfl_Lib.getTimer() / 1000;
	var actuator;
	var j = 0;
	var cleanup = false;
	var _g1 = 0;
	var _g = motion_actuators_SimpleActuator.actuatorsLength;
	while(_g1 < _g) {
		var i = _g1++;
		actuator = motion_actuators_SimpleActuator.actuators[j];
		if(actuator != null && actuator.active) {
			if(currentTime >= actuator.timeOffset) actuator.update(currentTime);
			j++;
		} else {
			motion_actuators_SimpleActuator.actuators.splice(j,1);
			--motion_actuators_SimpleActuator.actuatorsLength;
		}
	}
};
motion_actuators_SimpleActuator.__super__ = motion_actuators_GenericActuator;
motion_actuators_SimpleActuator.prototype = $extend(motion_actuators_GenericActuator.prototype,{
	setField_openfl_geom_Transform: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,setField_motion_actuators_TransformActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,setField_motion_actuators_MotionPathActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,setField_openfl_display_DisplayObject: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,setField_motion_actuators_SimpleActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		if(!value) {
			this.toggleVisible = false;
			if(this.setVisible) this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",this.cacheVisible);
		}
		return this;
	}
	,delay: function(duration) {
		this._delay = duration;
		this.timeOffset = this.startTime + duration;
		return this;
	}
	,getField: function(target,propertyName) {
		var value = null;
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) value = Reflect.field(target,propertyName); else value = Reflect.getProperty(target,propertyName);
		return value;
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var isField = true;
			if(Object.prototype.hasOwnProperty.call(this.target,i) && !(this.target.__properties__ && this.target.__properties__["set_" + i])) start = Reflect.field(this.target,i); else {
				isField = false;
				start = Reflect.getProperty(this.target,i);
			}
			if(typeof(start) == "number") {
				var value = this.getField(this.properties,i);
				if(start == null) start = 0;
				if(value == null) value = 0;
				details = new motion_actuators_PropertyDetails(this.target,i,start,value - start,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,move: function() {
		this.toggleVisible = Object.prototype.hasOwnProperty.call(this.properties,"alpha") && js_Boot.__instanceof(this.target,openfl_display_DisplayObject);
		if(this.toggleVisible && this.properties.alpha != 0 && !this.getField(this.target,"visible")) {
			this.setVisible = true;
			this.cacheVisible = this.getField(this.target,"visible");
			this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",true);
		}
		this.timeOffset = this.startTime;
		motion_actuators_SimpleActuator.actuators.push(this);
		++motion_actuators_SimpleActuator.actuatorsLength;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		this.sendChange = true;
		return this;
	}
	,pause: function() {
		if(!this.paused) {
			this.paused = true;
			motion_actuators_GenericActuator.prototype.pause.call(this);
			this.pauseTime = openfl_Lib.getTimer();
		}
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += (openfl_Lib.getTimer() - this.pauseTime) / 1000;
			motion_actuators_GenericActuator.prototype.resume.call(this);
		}
	}
	,setProperty: function(details,value) {
		if(details.isField) details.target[details.propertyName] = value; else Reflect.setProperty(details.target,details.propertyName,value);
	}
	,stop: function(properties,complete,sendEvent) {
		if(this.active) {
			if(properties == null) {
				this.active = false;
				if(complete) this.apply();
				this.complete(sendEvent);
				return;
			}
			var _g = 0;
			var _g1 = Reflect.fields(properties);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(Object.prototype.hasOwnProperty.call(this.properties,i)) {
					this.active = false;
					if(complete) this.apply();
					this.complete(sendEvent);
					return;
				}
			}
		}
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var i;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g1 = 0;
				var _g = this.detailsLength;
				while(_g1 < _g) {
					var i1 = _g1++;
					details = this.propertyDetails[i1];
					this.setProperty(details,details.start + details.change * easing);
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g11 = 0;
				var _g2 = this.detailsLength;
				while(_g11 < _g2) {
					var i2 = _g11++;
					details = this.propertyDetails[i2];
					if(this._smartRotation && (details.propertyName == "rotation" || details.propertyName == "rotationX" || details.propertyName == "rotationY" || details.propertyName == "rotationZ")) {
						var rotation = details.change % 360;
						if(rotation > 180) rotation -= 360; else if(rotation < -180) rotation += 360;
						endValue = details.start + rotation * easing;
					} else endValue = details.start + details.change * easing;
					if(!this._snapping) {
						if(details.isField) details.target[details.propertyName] = endValue; else Reflect.setProperty(details.target,details.propertyName,endValue);
					} else this.setProperty(details,Math.round(endValue));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion_actuators_SimpleActuator
});
var motion_easing_Expo = function() { };
$hxClasses["motion.easing.Expo"] = motion_easing_Expo;
motion_easing_Expo.__name__ = true;
motion_easing_Expo.__properties__ = {get_easeOut:"get_easeOut"}
motion_easing_Expo.get_easeOut = function() {
	return new motion_easing_ExpoEaseOut();
};
var motion_easing_IEasing = function() { };
$hxClasses["motion.easing.IEasing"] = motion_easing_IEasing;
motion_easing_IEasing.__name__ = true;
motion_easing_IEasing.prototype = {
	__class__: motion_easing_IEasing
};
var motion_easing_ExpoEaseOut = function() {
};
$hxClasses["motion.easing.ExpoEaseOut"] = motion_easing_ExpoEaseOut;
motion_easing_ExpoEaseOut.__name__ = true;
motion_easing_ExpoEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseOut.prototype = {
	calculate: function(k) {
		if(k == 1) return 1; else return 1 - Math.pow(2,-10 * k);
	}
	,__class__: motion_easing_ExpoEaseOut
};
var motion_Actuate = function() { };
$hxClasses["motion.Actuate"] = motion_Actuate;
motion_Actuate.__name__ = true;
motion_Actuate.apply = function(target,properties,customActuator) {
	motion_Actuate.stop(target,properties);
	if(customActuator == null) customActuator = motion_Actuate.defaultActuator;
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
};
motion_Actuate.getLibrary = function(target,allowCreation) {
	if(allowCreation == null) allowCreation = true;
	if(!(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) && allowCreation) motion_Actuate.targetLibraries.set(target,[]);
	return motion_Actuate.targetLibraries.h[target.__id__];
};
motion_Actuate.pause = function(target) {
	if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.pause();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator1 = library[_g];
				++_g;
				actuator1.pause();
			}
		}
	}
};
motion_Actuate.pauseAll = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.pause();
		}
	}
};
motion_Actuate.resumeAll = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.resume();
		}
	}
};
motion_Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) sendEvent = true;
	if(complete == null) complete = false;
	if(target != null) {
		if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
			var actuator = target;
			actuator.stop(null,complete,sendEvent);
		} else {
			var library = motion_Actuate.getLibrary(target,false);
			if(library != null) {
				if(typeof(properties) == "string") {
					var temp = { };
					Reflect.setField(temp,properties,null);
					properties = temp;
				} else if((properties instanceof Array) && properties.__enum__ == null) {
					var temp1 = { };
					var _g = 0;
					var _g1;
					_g1 = js_Boot.__cast(properties , Array);
					while(_g < _g1.length) {
						var property = _g1[_g];
						++_g;
						Reflect.setField(temp1,property,null);
					}
					properties = temp1;
				}
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(properties,complete,sendEvent);
					i--;
				}
			}
		}
	}
};
motion_Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) overwrite = true;
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) customActuator = motion_Actuate.defaultActuator;
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = motion_Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					i--;
				}
				library = motion_Actuate.getLibrary(actuator.target);
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else return motion_Actuate.apply(target,properties,customActuator);
	}
	return null;
};
motion_Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) {
		HxOverrides.remove(motion_Actuate.targetLibraries.h[target.__id__],actuator);
		if(motion_Actuate.targetLibraries.h[target.__id__].length == 0) motion_Actuate.targetLibraries.remove(target);
	}
};
var motion_IComponentPath = function() { };
$hxClasses["motion.IComponentPath"] = motion_IComponentPath;
motion_IComponentPath.__name__ = true;
motion_IComponentPath.prototype = {
	__class__: motion_IComponentPath
	,__properties__: {get_end:"get_end"}
};
var motion_actuators_FilterActuator = function(target,duration,properties) {
	this.filterIndex = -1;
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
	if(js_Boot.__instanceof(properties.filter,Class)) {
		this.filterClass = properties.filter;
		if(target.get_filters().length == 0) target.set_filters([Type.createInstance(this.filterClass,[])]);
		var _g = 0;
		var _g1 = target.get_filters();
		while(_g < _g1.length) {
			var filter = _g1[_g];
			++_g;
			if(js_Boot.__instanceof(filter,this.filterClass)) this.filter = filter;
		}
	} else {
		this.filterIndex = properties.filter;
		this.filter = target.get_filters()[this.filterIndex];
	}
};
$hxClasses["motion.actuators.FilterActuator"] = motion_actuators_FilterActuator;
motion_actuators_FilterActuator.__name__ = true;
motion_actuators_FilterActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_FilterActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(propertyName != "filter") Reflect.setField(this.filter,propertyName,Reflect.field(this.properties,propertyName));
		}
		var filters = this.getField(this.target,"filters");
		Reflect.setField(filters,this.properties.filter,this.filter);
		this.setField_openfl_display_DisplayObject(this.target,"filters",filters);
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(propertyName != "filter") {
				start = this.getField(this.filter,propertyName);
				details = new motion_actuators_PropertyDetails(this.filter,propertyName,start,Reflect.field(this.properties,propertyName) - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		motion_actuators_SimpleActuator.prototype.update.call(this,currentTime);
		var filters = this.target.get_filters();
		if(this.filterIndex > -1) Reflect.setField(filters,this.properties.filter,this.filter); else {
			var _g1 = 0;
			var _g = filters.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(js_Boot.__instanceof(filters[i],this.filterClass)) filters[i] = this.filter;
			}
		}
		this.setField_openfl_display_DisplayObject(this.target,"filters",filters);
	}
	,__class__: motion_actuators_FilterActuator
});
var motion_actuators_MethodActuator = function(target,duration,properties) {
	this.currentParameters = [];
	this.tweenProperties = { };
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
	if(!Object.prototype.hasOwnProperty.call(properties,"start")) this.properties.start = [];
	if(!Object.prototype.hasOwnProperty.call(properties,"end")) this.properties.end = this.properties.start;
	var _g1 = 0;
	var _g = this.properties.start.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.currentParameters.push(this.properties.start[i]);
	}
};
$hxClasses["motion.actuators.MethodActuator"] = motion_actuators_MethodActuator;
motion_actuators_MethodActuator.__name__ = true;
motion_actuators_MethodActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MethodActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		this.callMethod(this.target,this.properties.end);
	}
	,initialize: function() {
		var details;
		var propertyName;
		var start;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			propertyName = "param" + i;
			start = this.properties.start[i];
			this.tweenProperties[propertyName] = start;
			if(typeof(start) == "number" || ((start | 0) === start)) {
				details = new motion_actuators_PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		motion_actuators_SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active && !this.paused) {
			var _g1 = 0;
			var _g = this.properties.start.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			this.callMethod(this.target,this.currentParameters);
		}
	}
	,__class__: motion_actuators_MethodActuator
});
var motion_actuators_MotionPathActuator = function(target,duration,properties) {
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
};
$hxClasses["motion.actuators.MotionPathActuator"] = motion_actuators_MotionPathActuator;
motion_actuators_MotionPathActuator.__name__ = true;
motion_actuators_MotionPathActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MotionPathActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) Reflect.setField(this.target,propertyName,(js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end()); else Reflect.setProperty(this.target,propertyName,(js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end());
		}
	}
	,initialize: function() {
		var details;
		var path;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			path = js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath);
			if(path != null) {
				var isField = true;
				if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) path.start = Reflect.field(this.target,propertyName); else {
					isField = false;
					path.start = Reflect.getProperty(this.target,propertyName);
				}
				details = new motion_actuators_PropertyPathDetails(this.target,propertyName,path,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details1 = _g1[_g];
					++_g;
					if(details1.isField) Reflect.setField(details1.target,details1.propertyName,(js_Boot.__cast(details1 , motion_actuators_PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details1.target,details1.propertyName,(js_Boot.__cast(details1 , motion_actuators_PropertyPathDetails)).path.calculate(easing));
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g2 = 0;
				var _g11 = this.propertyDetails;
				while(_g2 < _g11.length) {
					var details2 = _g11[_g2];
					++_g2;
					if(!this._snapping) {
						if(details2.isField) Reflect.setField(details2.target,details2.propertyName,(js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details2.target,details2.propertyName,(js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing));
					} else if(details2.isField) Reflect.setField(details2.target,details2.propertyName,Math.round((js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing))); else Reflect.setProperty(details2.target,details2.propertyName,Math.round((js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing)));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField_motion_actuators_MotionPathActuator_T(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion_actuators_MotionPathActuator
});
var motion_actuators_PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) isField = true;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
$hxClasses["motion.actuators.PropertyDetails"] = motion_actuators_PropertyDetails;
motion_actuators_PropertyDetails.__name__ = true;
motion_actuators_PropertyDetails.prototype = {
	__class__: motion_actuators_PropertyDetails
};
var motion_actuators_PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) isField = true;
	motion_actuators_PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
$hxClasses["motion.actuators.PropertyPathDetails"] = motion_actuators_PropertyPathDetails;
motion_actuators_PropertyPathDetails.__name__ = true;
motion_actuators_PropertyPathDetails.__super__ = motion_actuators_PropertyDetails;
motion_actuators_PropertyPathDetails.prototype = $extend(motion_actuators_PropertyDetails.prototype,{
	__class__: motion_actuators_PropertyPathDetails
});
var motion_actuators_TransformActuator = function(target,duration,properties) {
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
};
$hxClasses["motion.actuators.TransformActuator"] = motion_actuators_TransformActuator;
motion_actuators_TransformActuator.__name__ = true;
motion_actuators_TransformActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_TransformActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		this.initialize();
		if(this.endColorTransform != null) {
			var transform = this.getField(this.target,"transform");
			this.setField_openfl_geom_Transform(transform,"colorTransform",this.endColorTransform);
		}
		if(this.endSoundTransform != null) this.setField_motion_actuators_TransformActuator_T(this.target,"soundTransform",this.endSoundTransform);
	}
	,initialize: function() {
		if(Object.prototype.hasOwnProperty.call(this.properties,"colorValue") && js_Boot.__instanceof(this.target,openfl_display_DisplayObject)) this.initializeColor();
		if(Object.prototype.hasOwnProperty.call(this.properties,"soundVolume") || Object.prototype.hasOwnProperty.call(this.properties,"soundPan")) this.initializeSound();
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,initializeColor: function() {
		this.endColorTransform = new openfl_geom_ColorTransform();
		var color = this.properties.colorValue;
		var strength = this.properties.colorStrength;
		if(strength < 1) {
			var multiplier;
			var offset;
			if(strength < 0.5) {
				multiplier = 1;
				offset = strength * 2;
			} else {
				multiplier = 1 - (strength - 0.5) * 2;
				offset = 1;
			}
			this.endColorTransform.redMultiplier = multiplier;
			this.endColorTransform.greenMultiplier = multiplier;
			this.endColorTransform.blueMultiplier = multiplier;
			this.endColorTransform.redOffset = offset * (color >> 16 & 255);
			this.endColorTransform.greenOffset = offset * (color >> 8 & 255);
			this.endColorTransform.blueOffset = offset * (color & 255);
		} else {
			this.endColorTransform.redMultiplier = 0;
			this.endColorTransform.greenMultiplier = 0;
			this.endColorTransform.blueMultiplier = 0;
			this.endColorTransform.redOffset = color >> 16 & 255;
			this.endColorTransform.greenOffset = color >> 8 & 255;
			this.endColorTransform.blueOffset = color & 255;
		}
		var propertyNames = ["redMultiplier","greenMultiplier","blueMultiplier","redOffset","greenOffset","blueOffset"];
		if(Object.prototype.hasOwnProperty.call(this.properties,"colorAlpha")) {
			this.endColorTransform.alphaMultiplier = this.properties.colorAlpha;
			propertyNames.push("alphaMultiplier");
		} else this.endColorTransform.alphaMultiplier = this.getField(this.target,"alpha");
		var transform = this.getField(this.target,"transform");
		var begin = this.getField(transform,"colorTransform");
		this.tweenColorTransform = new openfl_geom_ColorTransform();
		var details;
		var start;
		var _g = 0;
		while(_g < propertyNames.length) {
			var propertyName = propertyNames[_g];
			++_g;
			start = this.getField(begin,propertyName);
			details = new motion_actuators_PropertyDetails(this.tweenColorTransform,propertyName,start,this.getField(this.endColorTransform,propertyName) - start);
			this.propertyDetails.push(details);
		}
	}
	,initializeSound: function() {
		if(this.getField(this.target,"soundTransform") == null) this.setField_motion_actuators_TransformActuator_T(this.target,"soundTransform",new openfl_media_SoundTransform());
		var start = this.getField(this.target,"soundTransform");
		this.endSoundTransform = this.getField(this.target,"soundTransform");
		this.tweenSoundTransform = new openfl_media_SoundTransform();
		if(Object.prototype.hasOwnProperty.call(this.properties,"soundVolume")) {
			this.endSoundTransform.volume = this.properties.soundVolume;
			this.propertyDetails.push(new motion_actuators_PropertyDetails(this.tweenSoundTransform,"volume",start.volume,this.endSoundTransform.volume - start.volume));
		}
		if(Object.prototype.hasOwnProperty.call(this.properties,"soundPan")) {
			this.endSoundTransform.pan = this.properties.soundPan;
			this.propertyDetails.push(new motion_actuators_PropertyDetails(this.tweenSoundTransform,"pan",start.pan,this.endSoundTransform.pan - start.pan));
		}
	}
	,update: function(currentTime) {
		motion_actuators_SimpleActuator.prototype.update.call(this,currentTime);
		if(this.endColorTransform != null) {
			var transform = this.getField(this.target,"transform");
			this.setField_openfl_geom_Transform(transform,"colorTransform",this.tweenColorTransform);
		}
		if(this.endSoundTransform != null) this.setField_motion_actuators_TransformActuator_T(this.target,"soundTransform",this.tweenSoundTransform);
	}
	,__class__: motion_actuators_TransformActuator
});
var motion_easing_Linear = function() { };
$hxClasses["motion.easing.Linear"] = motion_easing_Linear;
motion_easing_Linear.__name__ = true;
motion_easing_Linear.__properties__ = {get_easeNone:"get_easeNone"}
motion_easing_Linear.get_easeNone = function() {
	return new motion_easing_LinearEaseNone();
};
var motion_easing_LinearEaseNone = function() {
};
$hxClasses["motion.easing.LinearEaseNone"] = motion_easing_LinearEaseNone;
motion_easing_LinearEaseNone.__name__ = true;
motion_easing_LinearEaseNone.__interfaces__ = [motion_easing_IEasing];
motion_easing_LinearEaseNone.prototype = {
	calculate: function(k) {
		return k;
	}
	,__class__: motion_easing_LinearEaseNone
};
var openfl_IAssetCache = function() { };
$hxClasses["openfl.IAssetCache"] = openfl_IAssetCache;
openfl_IAssetCache.__name__ = true;
openfl_IAssetCache.prototype = {
	__class__: openfl_IAssetCache
	,__properties__: {get_enabled:"get_enabled"}
};
var openfl_AssetCache = function() {
	this.__enabled = true;
	this.bitmapData = new haxe_ds_StringMap();
	this.font = new haxe_ds_StringMap();
	this.sound = new haxe_ds_StringMap();
};
$hxClasses["openfl.AssetCache"] = openfl_AssetCache;
openfl_AssetCache.__name__ = true;
openfl_AssetCache.__interfaces__ = [openfl_IAssetCache];
openfl_AssetCache.prototype = {
	getBitmapData: function(id) {
		return this.bitmapData.get(id);
	}
	,hasBitmapData: function(id) {
		return this.bitmapData.exists(id);
	}
	,setBitmapData: function(id,bitmapData) {
		this.bitmapData.set(id,bitmapData);
	}
	,get_enabled: function() {
		return this.__enabled;
	}
	,__class__: openfl_AssetCache
	,__properties__: {get_enabled:"get_enabled"}
};
var openfl_Assets = function() { };
$hxClasses["openfl.Assets"] = openfl_Assets;
openfl_Assets.__name__ = true;
openfl_Assets.getBitmapData = function(id,useCache) {
	if(useCache == null) useCache = true;
	if(useCache && openfl_Assets.cache.get_enabled() && openfl_Assets.cache.hasBitmapData(id)) {
		var bitmapData = openfl_Assets.cache.getBitmapData(id);
		if(openfl_Assets.isValidBitmapData(bitmapData)) return bitmapData;
	}
	var image = lime_Assets.getImage(id,false);
	if(image != null) {
		var bitmapData1 = openfl_display_BitmapData.fromImage(image);
		if(useCache && openfl_Assets.cache.get_enabled()) openfl_Assets.cache.setBitmapData(id,bitmapData1);
		return bitmapData1;
	}
	return null;
};
openfl_Assets.getText = function(id) {
	return lime_Assets.getText(id);
};
openfl_Assets.isValidBitmapData = function(bitmapData) {
	return bitmapData != null && bitmapData.__image != null;
	return true;
};
var openfl_display_MovieClip = function() {
	openfl_display_Sprite.call(this);
	this.__currentFrame = 0;
	this.__currentLabels = [];
	this.__totalFrames = 0;
	this.enabled = true;
};
$hxClasses["openfl.display.MovieClip"] = openfl_display_MovieClip;
openfl_display_MovieClip.__name__ = true;
openfl_display_MovieClip.__super__ = openfl_display_Sprite;
openfl_display_MovieClip.prototype = $extend(openfl_display_Sprite.prototype,{
	__class__: openfl_display_MovieClip
});
var openfl_display_LoaderInfo = function() {
	openfl_events_EventDispatcher.call(this);
	this.applicationDomain = openfl_system_ApplicationDomain.currentDomain;
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["openfl.display.LoaderInfo"] = openfl_display_LoaderInfo;
openfl_display_LoaderInfo.__name__ = true;
openfl_display_LoaderInfo.create = function(loader) {
	var loaderInfo = new openfl_display_LoaderInfo();
	loaderInfo.uncaughtErrorEvents = new openfl_events_UncaughtErrorEvents();
	if(loader != null) loaderInfo.loader = loader; else loaderInfo.url = openfl_display_LoaderInfo.__rootURL;
	return loaderInfo;
};
openfl_display_LoaderInfo.__super__ = openfl_events_EventDispatcher;
openfl_display_LoaderInfo.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_display_LoaderInfo
});
var openfl_system_ApplicationDomain = function(parentDomain) {
	if(parentDomain != null) this.parentDomain = parentDomain; else this.parentDomain = openfl_system_ApplicationDomain.currentDomain;
};
$hxClasses["openfl.system.ApplicationDomain"] = openfl_system_ApplicationDomain;
openfl_system_ApplicationDomain.__name__ = true;
openfl_system_ApplicationDomain.prototype = {
	__class__: openfl_system_ApplicationDomain
};
var openfl_events_UncaughtErrorEvents = function(target) {
	openfl_events_EventDispatcher.call(this,target);
};
$hxClasses["openfl.events.UncaughtErrorEvents"] = openfl_events_UncaughtErrorEvents;
openfl_events_UncaughtErrorEvents.__name__ = true;
openfl_events_UncaughtErrorEvents.__super__ = openfl_events_EventDispatcher;
openfl_events_UncaughtErrorEvents.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_events_UncaughtErrorEvents
});
var openfl_geom_Matrix = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
	this.__array = new Float32Array([a,b,c,d,tx,ty,0,0,1]);
};
$hxClasses["openfl.geom.Matrix"] = openfl_geom_Matrix;
openfl_geom_Matrix.__name__ = true;
openfl_geom_Matrix.prototype = {
	clone: function() {
		return new openfl_geom_Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,mult: function(m) {
		var result = new openfl_geom_Matrix();
		result.a = this.a * m.a + this.b * m.c;
		result.b = this.a * m.b + this.b * m.d;
		result.c = this.c * m.a + this.d * m.c;
		result.d = this.c * m.b + this.d * m.d;
		result.tx = this.tx * m.a + this.ty * m.c + m.tx;
		result.ty = this.tx * m.b + this.ty * m.d + m.ty;
		return result;
	}
	,scale: function(sx,sy) {
		this.a *= sx;
		this.b *= sy;
		this.c *= sx;
		this.d *= sy;
		this.tx *= sx;
		this.ty *= sy;
	}
	,to3DString: function(roundPixels) {
		if(roundPixels == null) roundPixels = false;
		if(roundPixels) return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + (this.tx | 0) + ", " + (this.ty | 0) + ", 0, 1)"; else return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", 0, 1)";
	}
	,transformPoint: function(pos) {
		return new openfl_geom_Point(pos.x * this.a + pos.y * this.c + this.tx,pos.x * this.b + pos.y * this.d + this.ty);
	}
	,translate: function(dx,dy) {
		var m = new openfl_geom_Matrix();
		m.tx = dx;
		m.ty = dy;
		this.concat(m);
	}
	,toArray: function(transpose) {
		if(transpose == null) transpose = false;
		if(transpose) {
			this.__array[0] = this.a;
			this.__array[1] = this.b;
			this.__array[2] = 0;
			this.__array[3] = this.c;
			this.__array[4] = this.d;
			this.__array[5] = 0;
			this.__array[6] = this.tx;
			this.__array[7] = this.ty;
			this.__array[8] = 1;
		} else {
			this.__array[0] = this.a;
			this.__array[1] = this.c;
			this.__array[2] = this.tx;
			this.__array[3] = this.b;
			this.__array[4] = this.d;
			this.__array[5] = this.ty;
			this.__array[6] = 0;
			this.__array[7] = 0;
			this.__array[8] = 1;
		}
		return this.__array;
	}
	,__toMatrix3: function() {
		return new lime_math_Matrix3(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,__class__: openfl_geom_Matrix
};
var openfl_geom_ColorTransform = function(redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier,redOffset,greenOffset,blueOffset,alphaOffset) {
	if(alphaOffset == null) alphaOffset = 0;
	if(blueOffset == null) blueOffset = 0;
	if(greenOffset == null) greenOffset = 0;
	if(redOffset == null) redOffset = 0;
	if(alphaMultiplier == null) alphaMultiplier = 1;
	if(blueMultiplier == null) blueMultiplier = 1;
	if(greenMultiplier == null) greenMultiplier = 1;
	if(redMultiplier == null) redMultiplier = 1;
	this.redMultiplier = redMultiplier;
	this.greenMultiplier = greenMultiplier;
	this.blueMultiplier = blueMultiplier;
	this.alphaMultiplier = alphaMultiplier;
	this.redOffset = redOffset;
	this.greenOffset = greenOffset;
	this.blueOffset = blueOffset;
	this.alphaOffset = alphaOffset;
};
$hxClasses["openfl.geom.ColorTransform"] = openfl_geom_ColorTransform;
openfl_geom_ColorTransform.__name__ = true;
openfl_geom_ColorTransform.prototype = {
	__combine: function(ct) {
		this.redMultiplier *= ct.redMultiplier;
		this.greenMultiplier *= ct.greenMultiplier;
		this.blueMultiplier *= ct.blueMultiplier;
		this.alphaMultiplier *= ct.alphaMultiplier;
		this.redOffset += ct.redOffset;
		this.greenOffset += ct.greenOffset;
		this.blueOffset += ct.blueOffset;
		this.alphaOffset += ct.alphaOffset;
	}
	,__equals: function(ct,skipAlphaMultiplier) {
		if(skipAlphaMultiplier == null) skipAlphaMultiplier = false;
		return ct != null && this.redMultiplier == ct.redMultiplier && this.greenMultiplier == ct.greenMultiplier && this.blueMultiplier == ct.blueMultiplier && (skipAlphaMultiplier || this.alphaMultiplier == ct.alphaMultiplier) && this.redOffset == ct.redOffset && this.greenOffset == ct.greenOffset && this.blueOffset == ct.blueOffset && this.alphaOffset == ct.alphaOffset;
	}
	,__clone: function() {
		return new openfl_geom_ColorTransform(this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier,this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset);
	}
	,__class__: openfl_geom_ColorTransform
};
var openfl_Lib = function() { };
$hxClasses["openfl.Lib"] = openfl_Lib;
openfl_Lib.__name__ = true;
openfl_Lib.application = null;
openfl_Lib.embed = $hx_exports.openfl.embed = function(elementName,width,height,background,assetsPrefix) {
	lime_system_System.embed(elementName,width,height,background,assetsPrefix);
};
openfl_Lib.getTimer = function() {
	return lime_system_System.getTimer();
};
openfl_Lib.notImplemented = function(api) {
	if(!openfl_Lib.__sentWarnings.exists(api)) {
		openfl_Lib.__sentWarnings.set(api,true);
		console.log("Warning: " + api + " is not implemented");
	}
};
var openfl_VectorData = function() {
	this.length = 0;
};
$hxClasses["openfl.VectorData"] = openfl_VectorData;
openfl_VectorData.__name__ = true;
openfl_VectorData.prototype = {
	__class__: openfl_VectorData
};
var openfl__$internal_renderer_AbstractMaskManager = function(renderSession) {
	this.renderSession = renderSession;
};
$hxClasses["openfl._internal.renderer.AbstractMaskManager"] = openfl__$internal_renderer_AbstractMaskManager;
openfl__$internal_renderer_AbstractMaskManager.__name__ = true;
openfl__$internal_renderer_AbstractMaskManager.prototype = {
	pushMask: function(mask) {
	}
	,pushRect: function(rect,transform) {
	}
	,popMask: function() {
	}
	,__class__: openfl__$internal_renderer_AbstractMaskManager
};
var openfl__$internal_renderer_AbstractRenderer = function(width,height) {
	this.width = width;
	this.height = height;
};
$hxClasses["openfl._internal.renderer.AbstractRenderer"] = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_AbstractRenderer.__name__ = true;
openfl__$internal_renderer_AbstractRenderer.prototype = {
	render: function(stage) {
	}
	,setViewport: function(x,y,width,height) {
	}
	,resize: function(width,height) {
	}
	,__class__: openfl__$internal_renderer_AbstractRenderer
};
var openfl__$internal_renderer_RenderSession = function() {
};
$hxClasses["openfl._internal.renderer.RenderSession"] = openfl__$internal_renderer_RenderSession;
openfl__$internal_renderer_RenderSession.__name__ = true;
openfl__$internal_renderer_RenderSession.prototype = {
	__class__: openfl__$internal_renderer_RenderSession
};
var openfl__$internal_renderer_TextFieldGraphics = function() { };
$hxClasses["openfl._internal.renderer.TextFieldGraphics"] = openfl__$internal_renderer_TextFieldGraphics;
openfl__$internal_renderer_TextFieldGraphics.__name__ = true;
openfl__$internal_renderer_TextFieldGraphics.render = function(textField) {
	openfl__$internal_renderer_TextFieldGraphics.update(textField);
	if(textField.__graphics == null) textField.__graphics = new openfl_display_Graphics();
	var graphics = textField.__graphics;
	graphics.clear();
	if(textField.border || textField.background) {
		if(textField.border) graphics.lineStyle(1,textField.borderColor);
		if(textField.background) graphics.beginFill(textField.backgroundColor);
		graphics.drawRect(0.5,0.5,textField.__width - 1,textField.__height - 1);
	}
	if(textField.__tileData != null) {
		var $it0 = textField.__tilesheets.keys();
		while( $it0.hasNext() ) {
			var tilesheet = $it0.next();
			graphics.drawTiles(tilesheet,textField.__tileData.h[tilesheet.__id__],true,4,textField.__tileDataLength.h[tilesheet.__id__]);
		}
	}
};
openfl__$internal_renderer_TextFieldGraphics.renderText = function(textField,text,format,offsetX,textWidth) {
	var font = textField.__getFontInstance(format);
	if(font != null && format.size != null) {
		if(!(openfl__$internal_renderer_TextFieldGraphics.glyphs.h.__keys__[font.__id__] != null)) {
			var value = new haxe_ds_IntMap();
			openfl__$internal_renderer_TextFieldGraphics.glyphs.set(font,value);
		}
		var size = format.size | 0;
		var fontGlyphs = openfl__$internal_renderer_TextFieldGraphics.glyphs.h[font.__id__];
		if(!fontGlyphs.h.hasOwnProperty(size)) {
			var value1 = font.renderGlyphs(font.getGlyphs(),size);
			fontGlyphs.h[size] = value1;
		}
		var images = fontGlyphs.h[size];
		if(!(openfl__$internal_renderer_TextFieldGraphics.bitmapData.h.__keys__[font.__id__] != null)) {
			var value2 = new haxe_ds_IntMap();
			openfl__$internal_renderer_TextFieldGraphics.bitmapData.set(font,value2);
		}
		var fontBitmapData = openfl__$internal_renderer_TextFieldGraphics.bitmapData.h[font.__id__];
		if(!fontBitmapData.h.hasOwnProperty(size)) {
			var width;
			var height;
			var data;
			var $it0 = images.iterator();
			while( $it0.hasNext() ) {
				var image1 = $it0.next();
				width = image1.buffer.width;
				height = image1.buffer.height;
				data = image1.get_data();
				break;
			}
			var bitmapData1 = new openfl_display_BitmapData(width,height);
			var _g = 0;
			while(_g < width) {
				var x1 = _g++;
				var _g1 = 0;
				while(_g1 < height) {
					var y1 = _g1++;
					var alpha = data[y1 * width + x1];
					var color = alpha << 24 | 16711680 | 65280 | 255;
					bitmapData1.setPixel32(x1,y1,color);
				}
			}
			fontBitmapData.h[size] = bitmapData1;
		}
		var bitmapData = fontBitmapData.h[size];
		if(!(openfl__$internal_renderer_TextFieldGraphics.tilesheets.h.__keys__[bitmapData.__id__] != null)) {
			var tilesheet1 = new openfl_display_Tilesheet(bitmapData);
			var tileID1 = new haxe_ds_IntMap();
			var image2;
			var index;
			var $it1 = images.keys();
			while( $it1.hasNext() ) {
				var key = $it1.next();
				image2 = images.h[key];
				index = tilesheet1.addTileRect(new openfl_geom_Rectangle(image2.offsetX,image2.offsetY,image2.width,image2.height));
				tileID1.h[key] = index;
			}
			openfl__$internal_renderer_TextFieldGraphics.tileIDs.set(bitmapData,tileID1);
			openfl__$internal_renderer_TextFieldGraphics.tilesheets.set(bitmapData,tilesheet1);
		}
		var tilesheet = openfl__$internal_renderer_TextFieldGraphics.tilesheets.h[bitmapData.__id__];
		var tileID = openfl__$internal_renderer_TextFieldGraphics.tileIDs.h[bitmapData.__id__];
		var r = (format.color >> 16 & 255) / 255;
		var g = (format.color >> 8 & 255) / 255;
		var b = (format.color & 255) / 255;
		var tlm = textField.getLineMetrics(0);
		var image;
		var x = offsetX;
		var y = 2 + tlm.ascent;
		var tileData;
		textField.__tilesheets.set(tilesheet,true);
		if(!(textField.__tileData.h.__keys__[tilesheet.__id__] != null)) {
			tileData = [];
			textField.__tileData.set(tilesheet,tileData);
			textField.__tileDataLength.set(tilesheet,0);
		}
		tileData = textField.__tileData.h[tilesheet.__id__];
		var offsetY = 0;
		var lines = text.split("\n");
		if(textField.__textLayout == null) textField.__textLayout = new lime_text_TextLayout();
		var textLayout = textField.__textLayout;
		var length = 0;
		var line_i = 0;
		var oldX = x;
		var _g2 = 0;
		while(_g2 < lines.length) {
			var line = lines[_g2];
			++_g2;
			tlm = textField.getLineMetrics(line_i);
			x = oldX;
			var _g11 = format.align;
			switch(_g11[1]) {
			case 0:case 2:
				x += 0;
				break;
			case 3:
				x += (textField.__width - 4 - tlm.width) / 2;
				break;
			case 1:
				x += textField.__width - 4 - tlm.width;
				break;
			}
			textLayout.set_text(null);
			textLayout.set_font(font);
			textLayout.set_size(size);
			textLayout.set_text(line);
			var _g12 = 0;
			var _g21 = textLayout.positions;
			while(_g12 < _g21.length) {
				var position = _g21[_g12];
				++_g12;
				image = images.h[position.glyph];
				if(image != null) {
					if(length >= tileData.length) {
						tileData.push(x + position.offset.x + image.x);
						tileData.push(y + position.offset.y - image.y);
						tileData.push(tileID.h[position.glyph]);
						tileData.push(r);
						tileData.push(g);
						tileData.push(b);
					} else {
						tileData[length] = x + position.offset.x + image.x;
						tileData[length + 1] = y + position.offset.y - image.y;
						tileData[length + 2] = tileID.h[position.glyph];
						tileData[length + 3] = r;
						tileData[length + 4] = g;
						tileData[length + 5] = b;
					}
					length += 6;
				}
				x += position.advance.x;
				y -= position.advance.y;
			}
			y += tlm.height;
			line_i++;
		}
		textField.__tileDataLength.set(tilesheet,length);
	}
};
openfl__$internal_renderer_TextFieldGraphics.update = function(textField) {
	if(textField.__dirty) {
		if((textField.__text == null || textField.__text == "") && !textField.background && !textField.border || (textField.get_width() <= 0 || textField.get_height() <= 0) && textField.autoSize != openfl_text_TextFieldAutoSize.LEFT) {
			textField.__tilesheets = null;
			textField.__tileData = null;
			textField.__tileDataLength = null;
			textField.__dirty = false;
		} else {
			textField.__tilesheets = new haxe_ds_ObjectMap();
			if(textField.__tileData == null) {
				textField.__tileData = new haxe_ds_ObjectMap();
				textField.__tileDataLength = new haxe_ds_ObjectMap();
			}
			if(textField.__text != null && textField.__text != "") {
				var text = textField.get_text();
				if(textField.displayAsPassword) {
					var length = text.length;
					var mask = "";
					var _g = 0;
					while(_g < length) {
						var i = _g++;
						mask += "*";
					}
					text = mask;
				}
				var measurements = textField.__measureText();
				var textWidth = 0.0;
				var _g1 = 0;
				while(_g1 < measurements.length) {
					var measurement = measurements[_g1];
					++_g1;
					textWidth += measurement;
				}
				if(textField.autoSize == openfl_text_TextFieldAutoSize.LEFT) {
					textField.__width = textWidth + 4;
					textField.__height = textField.get_textHeight() + 4;
				}
				if(textField.__ranges == null) openfl__$internal_renderer_TextFieldGraphics.renderText(textField,text,textField.__textFormat,2,textWidth); else {
					var currentIndex = 0;
					var range;
					var offsetX = 2.0;
					var _g11 = 0;
					var _g2 = textField.__ranges.length;
					while(_g11 < _g2) {
						var i1 = _g11++;
						range = textField.__ranges[i1];
						openfl__$internal_renderer_TextFieldGraphics.renderText(textField,text.substring(range.start,range.end),range.format,offsetX,textWidth);
						offsetX += measurements[i1];
					}
				}
			} else if(textField.autoSize == openfl_text_TextFieldAutoSize.LEFT) {
				textField.__width = 4;
				textField.__height = 4;
			}
			var $it0 = textField.__tileData.keys();
			while( $it0.hasNext() ) {
				var key = $it0.next();
				if(!(textField.__tilesheets.h.__keys__[key.__id__] != null)) {
					textField.__tileData.remove(key);
					textField.__tileDataLength.remove(key);
				}
			}
			textField.__dirty = false;
			return true;
		}
	}
	return false;
};
var openfl__$internal_renderer_cairo_CairoBitmap = function() { };
$hxClasses["openfl._internal.renderer.cairo.CairoBitmap"] = openfl__$internal_renderer_cairo_CairoBitmap;
openfl__$internal_renderer_cairo_CairoBitmap.__name__ = true;
openfl__$internal_renderer_cairo_CairoBitmap.render = function(bitmap,renderSession) {
	if(!bitmap.__renderable || bitmap.__worldAlpha <= 0) return;
	var cairo = renderSession.cairo;
	if(bitmap.bitmapData != null && bitmap.bitmapData.__isValid) {
		if(bitmap.__mask != null) renderSession.maskManager.pushMask(bitmap.__mask);
		var transform = bitmap.__worldTransform;
		if(renderSession.roundPixels) {
			var matrix = transform.__toMatrix3();
			matrix.tx = Math.round(matrix.tx);
			matrix.ty = Math.round(matrix.ty);
			cairo.set_matrix(matrix);
		} else cairo.set_matrix(transform.__toMatrix3());
		var surface = bitmap.bitmapData.getSurface();
		if(surface != null) {
			cairo.setSourceSurface(surface,0,0);
			if(bitmap.__worldAlpha == 1) cairo.paint(); else cairo.paintWithAlpha(bitmap.__worldAlpha);
		}
		if(bitmap.__mask != null) renderSession.maskManager.popMask();
	}
};
var openfl__$internal_renderer_cairo_CairoGraphics = function() { };
$hxClasses["openfl._internal.renderer.cairo.CairoGraphics"] = openfl__$internal_renderer_cairo_CairoGraphics;
openfl__$internal_renderer_cairo_CairoGraphics.__name__ = true;
openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill = null;
openfl__$internal_renderer_cairo_CairoGraphics.bitmapRepeat = null;
openfl__$internal_renderer_cairo_CairoGraphics.bounds = null;
openfl__$internal_renderer_cairo_CairoGraphics.cairo = null;
openfl__$internal_renderer_cairo_CairoGraphics.fillCommands = null;
openfl__$internal_renderer_cairo_CairoGraphics.fillPattern = null;
openfl__$internal_renderer_cairo_CairoGraphics.graphics = null;
openfl__$internal_renderer_cairo_CairoGraphics.hasFill = null;
openfl__$internal_renderer_cairo_CairoGraphics.hasStroke = null;
openfl__$internal_renderer_cairo_CairoGraphics.inversePendingMatrix = null;
openfl__$internal_renderer_cairo_CairoGraphics.pendingMatrix = null;
openfl__$internal_renderer_cairo_CairoGraphics.strokeCommands = null;
openfl__$internal_renderer_cairo_CairoGraphics.strokePattern = null;
openfl__$internal_renderer_cairo_CairoGraphics.beginPatternFill = function(bitmapFill,bitmapRepeat) {
	if(openfl__$internal_renderer_cairo_CairoGraphics.hasFill || bitmapFill == null) return;
	if(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern == null) {
		openfl__$internal_renderer_cairo_CairoGraphics.fillPattern = lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createForSurface(bitmapFill.getSurface());
		if(bitmapRepeat) lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.set_extend(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern,1);
	}
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.set_source(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern);
	openfl__$internal_renderer_cairo_CairoGraphics.hasFill = true;
};
openfl__$internal_renderer_cairo_CairoGraphics.createTempPatternCanvas = function(bitmap,repeat,width,height) {
	var surface = lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$._new(0,width,height);
	var pattern = lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createForSurface(surface);
	if(repeat) lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.set_extend(pattern,1);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.set_source(pattern);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.newPath();
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.moveTo(0,0);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(0,height);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(width,height);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(width,0);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(0,0);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.closePath();
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.fill();
	lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.destroy(pattern);
	return surface;
};
openfl__$internal_renderer_cairo_CairoGraphics.endFill = function() {
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.newPath();
	openfl__$internal_renderer_cairo_CairoGraphics.playCommands(openfl__$internal_renderer_cairo_CairoGraphics.fillCommands,false);
	openfl__$internal_renderer_cairo_CairoGraphics.fillCommands = [];
};
openfl__$internal_renderer_cairo_CairoGraphics.endStroke = function() {
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.newPath();
	openfl__$internal_renderer_cairo_CairoGraphics.playCommands(openfl__$internal_renderer_cairo_CairoGraphics.strokeCommands,true);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.closePath();
	openfl__$internal_renderer_cairo_CairoGraphics.strokeCommands = [];
};
openfl__$internal_renderer_cairo_CairoGraphics.drawRoundRect = function(x,y,width,height,rx,ry) {
	if(ry == -1) ry = rx;
	rx *= 0.5;
	ry *= 0.5;
	if(rx > width / 2) rx = width / 2;
	if(ry > height / 2) ry = height / 2;
	var xe = x + width;
	var ye = y + height;
	var cx1 = -rx + rx * openfl__$internal_renderer_cairo_CairoGraphics.SIN45;
	var cx2 = -rx + rx * openfl__$internal_renderer_cairo_CairoGraphics.TAN22;
	var cy1 = -ry + ry * openfl__$internal_renderer_cairo_CairoGraphics.SIN45;
	var cy2 = -ry + ry * openfl__$internal_renderer_cairo_CairoGraphics.TAN22;
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.moveTo(xe,ye - ry);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(xe,ye + cy2,xe + cx1,ye + cy1);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(xe + cx2,ye,xe - rx,ye);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(x + rx,ye);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(x - cx2,ye,x - cx1,ye + cy1);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(x,ye + cy2,x,ye - ry);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(x,y + ry);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(x,y - cy2,x - cx1,y - cy1);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(x - cx2,y,x + rx,y);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(xe - rx,y);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(xe + cx2,y,xe + cx1,y - cy1);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(xe,y - cy2,xe,y + ry);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(xe,ye - ry);
};
openfl__$internal_renderer_cairo_CairoGraphics.normalizeUVT = function(uvt,skipT) {
	if(skipT == null) skipT = false;
	var max = -Infinity;
	var tmp = -Infinity;
	var len = uvt.length;
	var _g1 = 1;
	var _g = len + 1;
	while(_g1 < _g) {
		var t = _g1++;
		if(skipT && t % 3 == 0) continue;
		tmp = uvt.data[t - 1];
		if(max < tmp) max = tmp;
	}
	var result;
	var this1;
	this1 = new openfl_VectorData();
	var this2;
	this2 = new Array(0);
	this1.data = this2;
	this1.length = 0;
	this1.fixed = false;
	result = this1;
	var _g11 = 1;
	var _g2 = len + 1;
	while(_g11 < _g2) {
		var t1 = _g11++;
		if(skipT && t1 % 3 == 0) continue;
		if(!result.fixed) {
			result.length++;
			if(result.data.length < result.length) {
				var data;
				var this3;
				this3 = new Array(result.data.length + 10);
				data = this3;
				haxe_ds__$Vector_Vector_$Impl_$.blit(result.data,0,data,0,result.data.length);
				result.data = data;
			}
			result.data[result.length - 1] = uvt.data[t1 - 1] / max;
		}
		result.length;
	}
	return { max : max, uvt : result};
};
openfl__$internal_renderer_cairo_CairoGraphics.playCommands = function(commands,stroke) {
	if(stroke == null) stroke = false;
	openfl__$internal_renderer_cairo_CairoGraphics.bounds = openfl__$internal_renderer_cairo_CairoGraphics.graphics.__bounds;
	var offsetX = openfl__$internal_renderer_cairo_CairoGraphics.bounds.x;
	var offsetY = openfl__$internal_renderer_cairo_CairoGraphics.bounds.y;
	var positionX = 0.0;
	var positionY = 0.0;
	var closeGap = false;
	var startX = 0.0;
	var startY = 0.0;
	var _g = 0;
	while(_g < commands.length) {
		var command = commands[_g];
		++_g;
		switch(command[1]) {
		case 3:
			var y = command[7];
			var x = command[6];
			var cy2 = command[5];
			var cx2 = command[4];
			var cy1 = command[3];
			var cx1 = command[2];
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.curveTo(cx1 - offsetX,cy1 - offsetY,cx2 - offsetX,cy2 - offsetY,x - offsetX,y - offsetY);
			break;
		case 4:
			var y1 = command[5];
			var x1 = command[4];
			var cy = command[3];
			var cx = command[2];
			openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(cx - offsetX,cy - offsetY,x1 - offsetX,y1 - offsetY);
			break;
		case 5:
			var radius = command[4];
			var y2 = command[3];
			var x2 = command[2];
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.moveTo(x2 - offsetX + radius,y2 - offsetY);
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.arc(x2 - offsetX,y2 - offsetY,radius,0,Math.PI * 2);
			break;
		case 6:
			var height = command[5];
			var width = command[4];
			var y3 = command[3];
			var x3 = command[2];
			x3 -= offsetX;
			y3 -= offsetY;
			var kappa = .5522848;
			var ox = width / 2 * kappa;
			var oy = height / 2 * kappa;
			var xe = x3 + width;
			var ye = y3 + height;
			var xm = x3 + width / 2;
			var ym = y3 + height / 2;
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.moveTo(x3,ym);
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.curveTo(x3,ym - oy,xm - ox,y3,xm,y3);
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.curveTo(xm + ox,y3,xe,ym - oy,xe,ym);
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.curveTo(xe,ym + oy,xm + ox,ye,xm,ye);
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.curveTo(xm - ox,ye,x3,ym + oy,x3,ym);
			break;
		case 8:
			var ry = command[7];
			var rx = command[6];
			var height1 = command[5];
			var width1 = command[4];
			var y4 = command[3];
			var x4 = command[2];
			openfl__$internal_renderer_cairo_CairoGraphics.drawRoundRect(x4 - offsetX,y4 - offsetY,width1,height1,rx,ry);
			break;
		case 13:
			var y5 = command[3];
			var x5 = command[2];
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(x5 - offsetX,y5 - offsetY);
			positionX = x5;
			positionY = y5;
			break;
		case 14:
			var y6 = command[3];
			var x6 = command[2];
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.moveTo(x6 - offsetX,y6 - offsetY);
			positionX = x6;
			positionY = y6;
			closeGap = true;
			startX = x6;
			startY = y6;
			break;
		case 12:
			var miterLimit = command[9];
			var joints = command[8];
			var caps = command[7];
			var scaleMode = command[6];
			var pixelHinting = command[5];
			var alpha = command[4];
			var color = command[3];
			var thickness = command[2];
			if(stroke && openfl__$internal_renderer_cairo_CairoGraphics.hasStroke) {
				openfl__$internal_renderer_cairo_CairoGraphics.cairo.closePath();
				openfl__$internal_renderer_cairo_CairoGraphics.cairo.set_source(openfl__$internal_renderer_cairo_CairoGraphics.strokePattern);
				openfl__$internal_renderer_cairo_CairoGraphics.cairo.strokePreserve();
				openfl__$internal_renderer_cairo_CairoGraphics.cairo.newPath();
			}
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.moveTo(positionX - offsetX,positionY - offsetY);
			if(thickness == null) openfl__$internal_renderer_cairo_CairoGraphics.hasStroke = false; else {
				openfl__$internal_renderer_cairo_CairoGraphics.cairo.set_lineWidth(thickness);
				if(joints == null) openfl__$internal_renderer_cairo_CairoGraphics.cairo.set_lineJoin(1); else openfl__$internal_renderer_cairo_CairoGraphics.cairo.set_lineJoin((function($this) {
					var $r;
					switch(joints[1]) {
					case 0:
						$r = 0;
						break;
					case 2:
						$r = 2;
						break;
					default:
						$r = 1;
					}
					return $r;
				}(this)));
				if(caps == null) openfl__$internal_renderer_cairo_CairoGraphics.cairo.set_lineCap(1); else openfl__$internal_renderer_cairo_CairoGraphics.cairo.set_lineCap((function($this) {
					var $r;
					switch(caps[1]) {
					case 0:
						$r = 0;
						break;
					case 2:
						$r = 2;
						break;
					default:
						$r = 1;
					}
					return $r;
				}(this)));
				openfl__$internal_renderer_cairo_CairoGraphics.cairo.set_miterLimit(miterLimit == null?3:miterLimit);
				if(openfl__$internal_renderer_cairo_CairoGraphics.strokePattern != null) lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.destroy(openfl__$internal_renderer_cairo_CairoGraphics.strokePattern);
				var r = ((color & 16711680) >>> 16) / 255;
				var g = ((color & 65280) >>> 8) / 255;
				var b = (color & 255) / 255;
				if(alpha == 1 || alpha == null) openfl__$internal_renderer_cairo_CairoGraphics.strokePattern = lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createRGB(r,g,b); else openfl__$internal_renderer_cairo_CairoGraphics.strokePattern = lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createRGBA(r,g,b,alpha);
				openfl__$internal_renderer_cairo_CairoGraphics.hasStroke = true;
			}
			break;
		case 0:
			var smooth = command[5];
			var repeat = command[4];
			var matrix = command[3];
			var bitmap = command[2];
			if(bitmap != openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill || repeat != openfl__$internal_renderer_cairo_CairoGraphics.bitmapRepeat) {
				openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill = bitmap;
				openfl__$internal_renderer_cairo_CairoGraphics.bitmapRepeat = repeat;
				if(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern != null) lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.destroy(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern);
				openfl__$internal_renderer_cairo_CairoGraphics.fillPattern = null;
				openfl__$internal_renderer_cairo_CairoGraphics.hasFill = false;
			}
			if(matrix != null) {
				openfl__$internal_renderer_cairo_CairoGraphics.pendingMatrix = matrix;
				openfl__$internal_renderer_cairo_CairoGraphics.inversePendingMatrix = new openfl_geom_Matrix(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
				openfl__$internal_renderer_cairo_CairoGraphics.inversePendingMatrix.invert();
			} else {
				openfl__$internal_renderer_cairo_CairoGraphics.pendingMatrix = null;
				openfl__$internal_renderer_cairo_CairoGraphics.inversePendingMatrix = null;
			}
			break;
		case 1:
			var alpha1 = command[3];
			var rgb = command[2];
			if(alpha1 < 0.005) openfl__$internal_renderer_cairo_CairoGraphics.hasFill = false; else {
				if(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern != null) lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.destroy(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern);
				openfl__$internal_renderer_cairo_CairoGraphics.fillPattern = lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createRGBA(((rgb & 16711680) >>> 16) / 255,((rgb & 65280) >>> 8) / 255,(rgb & 255) / 255,alpha1);
				openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill = null;
				openfl__$internal_renderer_cairo_CairoGraphics.hasFill = true;
			}
			break;
		case 2:
			var focalPointRatio = command[9];
			var interpolationMethod = command[8];
			var spreadMethod = command[7];
			var matrix1 = command[6];
			var ratios = command[5];
			var alphas = command[4];
			var colors = command[3];
			var type = command[2];
			var gradientFill = null;
			switch(type[1]) {
			case 0:
				if(matrix1 == null) matrix1 = new openfl_geom_Matrix();
				var point = matrix1.transformPoint(new openfl_geom_Point(1638.4,0));
				if(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern != null) lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.destroy(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern);
				openfl__$internal_renderer_cairo_CairoGraphics.fillPattern = lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createRadial(matrix1.tx,matrix1.ty,0,matrix1.tx,matrix1.ty,(point.x - matrix1.tx) / 2);
				break;
			case 1:
				var matrix2;
				if(matrix1 != null) matrix2 = new openfl_geom_Matrix(matrix1.a,matrix1.b,matrix1.c,matrix1.d,matrix1.tx,matrix1.ty); else matrix2 = new openfl_geom_Matrix();
				var point1 = matrix2.transformPoint(new openfl_geom_Point(-819.2,0));
				var point2 = matrix2.transformPoint(new openfl_geom_Point(819.2,0));
				if(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern != null) lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.destroy(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern);
				openfl__$internal_renderer_cairo_CairoGraphics.fillPattern = lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createLinear(point1.x,point1.y,point2.x,point2.y);
				break;
			}
			var _g2 = 0;
			var _g1 = colors.length;
			while(_g2 < _g1) {
				var i = _g2++;
				var rgb1 = colors[i];
				var alpha2 = alphas[i];
				var r1 = ((rgb1 & 16711680) >>> 16) / 255;
				var g1 = ((rgb1 & 65280) >>> 8) / 255;
				var b1 = (rgb1 & 255) / 255;
				var ratio = ratios[i] / 255;
				if(ratio < 0) ratio = 0;
				if(ratio > 1) ratio = 1;
				lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.addColorStopRGBA(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern,ratio,r1,g1,b1,alpha2);
			}
			openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill = null;
			openfl__$internal_renderer_cairo_CairoGraphics.hasFill = true;
			break;
		case 7:
			var height2 = command[5];
			var width2 = command[4];
			var y7 = command[3];
			var x7 = command[2];
			if(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern != null) {
				var matrix3 = lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.get_matrix(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern);
				matrix3.tx += x7;
				matrix3.ty += y7;
				lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.set_matrix(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern,matrix3);
			}
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.rectangle(x7 - offsetX,y7 - offsetY,width2,height2);
			break;
		default:
		}
	}
	if(stroke && openfl__$internal_renderer_cairo_CairoGraphics.hasStroke) {
		if(openfl__$internal_renderer_cairo_CairoGraphics.hasFill && closeGap) openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(startX - offsetX,startY - offsetY);
		openfl__$internal_renderer_cairo_CairoGraphics.cairo.set_source(openfl__$internal_renderer_cairo_CairoGraphics.strokePattern);
		openfl__$internal_renderer_cairo_CairoGraphics.cairo.strokePreserve();
	}
	if(!stroke) {
		if(openfl__$internal_renderer_cairo_CairoGraphics.hasFill || openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill != null) {
			if(openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill != null) openfl__$internal_renderer_cairo_CairoGraphics.beginPatternFill(openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill,openfl__$internal_renderer_cairo_CairoGraphics.bitmapRepeat); else openfl__$internal_renderer_cairo_CairoGraphics.cairo.set_source(openfl__$internal_renderer_cairo_CairoGraphics.fillPattern);
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.translate(-openfl__$internal_renderer_cairo_CairoGraphics.bounds.x,-openfl__$internal_renderer_cairo_CairoGraphics.bounds.y);
			if(openfl__$internal_renderer_cairo_CairoGraphics.pendingMatrix != null) {
				openfl__$internal_renderer_cairo_CairoGraphics.cairo.transform(openfl__$internal_renderer_cairo_CairoGraphics.pendingMatrix.__toMatrix3());
				openfl__$internal_renderer_cairo_CairoGraphics.cairo.fillPreserve();
				openfl__$internal_renderer_cairo_CairoGraphics.cairo.transform(openfl__$internal_renderer_cairo_CairoGraphics.inversePendingMatrix.__toMatrix3());
			} else openfl__$internal_renderer_cairo_CairoGraphics.cairo.fillPreserve();
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.translate(openfl__$internal_renderer_cairo_CairoGraphics.bounds.x,openfl__$internal_renderer_cairo_CairoGraphics.bounds.y);
			openfl__$internal_renderer_cairo_CairoGraphics.cairo.closePath();
		}
	}
};
openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo = function(cx,cy,x,y) {
	var current = null;
	if(!openfl__$internal_renderer_cairo_CairoGraphics.cairo.get_hasCurrentPoint()) {
		openfl__$internal_renderer_cairo_CairoGraphics.cairo.moveTo(cx,cy);
		current = new lime_math_Vector2(cx,cy);
	} else current = openfl__$internal_renderer_cairo_CairoGraphics.cairo.get_currentPoint();
	var cx1 = current.x + 0.66666666666666663 * (cx - current.x);
	var cy1 = current.y + 0.66666666666666663 * (cy - current.y);
	var cx2 = x + 0.66666666666666663 * (cx - x);
	var cy2 = y + 0.66666666666666663 * (cy - y);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.curveTo(cx1,cy1,cx2,cy2,x,y);
};
openfl__$internal_renderer_cairo_CairoGraphics.render = function(graphics,renderSession) {
	if(graphics.__dirty) {
		openfl__$internal_renderer_cairo_CairoGraphics.graphics = graphics;
		openfl__$internal_renderer_cairo_CairoGraphics.bounds = graphics.__bounds;
		if(!graphics.__visible || graphics.__commands.length == 0 || openfl__$internal_renderer_cairo_CairoGraphics.bounds == null || openfl__$internal_renderer_cairo_CairoGraphics.bounds.width == 0 || openfl__$internal_renderer_cairo_CairoGraphics.bounds.height == 0) {
			if(graphics.__cairo != null) {
				graphics.__cairo.destroy();
				graphics.__cairo = null;
			}
		} else {
			if(graphics.__cairo != null) {
				var surface = graphics.__cairo.get_target();
				if(openfl__$internal_renderer_cairo_CairoGraphics.bounds.width != lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.get_width(surface) || openfl__$internal_renderer_cairo_CairoGraphics.bounds.height != lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.get_height(surface)) {
					graphics.__cairo.destroy();
					graphics.__cairo = null;
				}
			}
			if(graphics.__cairo == null) {
				var surface1 = lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$._new(0,Math.ceil(openfl__$internal_renderer_cairo_CairoGraphics.bounds.width),Math.ceil(openfl__$internal_renderer_cairo_CairoGraphics.bounds.height));
				graphics.__cairo = new lime_graphics_cairo_Cairo(surface1);
				lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.destroy(surface1);
			}
			openfl__$internal_renderer_cairo_CairoGraphics.cairo = graphics.__cairo;
			var offsetX = openfl__$internal_renderer_cairo_CairoGraphics.bounds.x;
			var offsetY = openfl__$internal_renderer_cairo_CairoGraphics.bounds.y;
			openfl__$internal_renderer_cairo_CairoGraphics.fillCommands = [];
			openfl__$internal_renderer_cairo_CairoGraphics.strokeCommands = [];
			openfl__$internal_renderer_cairo_CairoGraphics.hasFill = false;
			openfl__$internal_renderer_cairo_CairoGraphics.hasStroke = false;
			openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill = null;
			openfl__$internal_renderer_cairo_CairoGraphics.bitmapRepeat = false;
			var _g = 0;
			var _g1 = graphics.__commands;
			try {
				while(_g < _g1.length) {
					var command = _g1[_g];
					++_g;
					switch(command[1]) {
					case 3:case 4:case 13:case 14:
						openfl__$internal_renderer_cairo_CairoGraphics.fillCommands.push(command);
						openfl__$internal_renderer_cairo_CairoGraphics.strokeCommands.push(command);
						break;
					case 11:
						openfl__$internal_renderer_cairo_CairoGraphics.endFill();
						openfl__$internal_renderer_cairo_CairoGraphics.endStroke();
						openfl__$internal_renderer_cairo_CairoGraphics.hasFill = false;
						break;
					case 12:
						openfl__$internal_renderer_cairo_CairoGraphics.strokeCommands.push(command);
						break;
					case 0:case 1:case 2:
						openfl__$internal_renderer_cairo_CairoGraphics.endFill();
						openfl__$internal_renderer_cairo_CairoGraphics.endStroke();
						openfl__$internal_renderer_cairo_CairoGraphics.fillCommands.push(command);
						openfl__$internal_renderer_cairo_CairoGraphics.strokeCommands.push(command);
						break;
					case 5:case 6:case 7:case 8:
						openfl__$internal_renderer_cairo_CairoGraphics.endFill();
						openfl__$internal_renderer_cairo_CairoGraphics.endStroke();
						openfl__$internal_renderer_cairo_CairoGraphics.fillCommands.push(command);
						openfl__$internal_renderer_cairo_CairoGraphics.strokeCommands.push(command);
						break;
					case 10:
						var culling = command[5];
						var uvtData = command[4];
						var indices = command[3];
						var vertices = command[2];
						openfl__$internal_renderer_cairo_CairoGraphics.endFill();
						openfl__$internal_renderer_cairo_CairoGraphics.endStroke();
						var v = vertices;
						var ind = indices;
						var uvt = uvtData;
						var pattern = null;
						var colorFill = openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill == null;
						if(colorFill && uvt != null) throw "__break__";
						if(!colorFill) {
							if(uvtData == null) {
								var this1;
								this1 = new openfl_VectorData();
								var this2;
								this2 = new Array(0);
								this1.data = this2;
								this1.length = 0;
								this1.fixed = false;
								uvtData = this1;
								var _g3 = 0;
								var _g2 = v.length / 2 | 0;
								while(_g3 < _g2) {
									var i1 = _g3++;
									if(!uvtData.fixed) {
										uvtData.length++;
										if(uvtData.data.length < uvtData.length) {
											var data;
											var this3;
											this3 = new Array(uvtData.data.length + 10);
											data = this3;
											haxe_ds__$Vector_Vector_$Impl_$.blit(uvtData.data,0,data,0,uvtData.data.length);
											uvtData.data = data;
										}
										uvtData.data[uvtData.length - 1] = v.data[i1 * 2] / openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill.width;
									}
									uvtData.length;
									if(!uvtData.fixed) {
										uvtData.length++;
										if(uvtData.data.length < uvtData.length) {
											var data1;
											var this4;
											this4 = new Array(uvtData.data.length + 10);
											data1 = this4;
											haxe_ds__$Vector_Vector_$Impl_$.blit(uvtData.data,0,data1,0,uvtData.data.length);
											uvtData.data = data1;
										}
										uvtData.data[uvtData.length - 1] = v.data[i1 * 2 + 1] / openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill.height;
									}
									uvtData.length;
								}
							}
							var skipT = uvtData.length != v.length;
							var normalizedUVT = openfl__$internal_renderer_cairo_CairoGraphics.normalizeUVT(uvtData,skipT);
							var maxUVT = normalizedUVT.max;
							uvt = normalizedUVT.uvt;
							if(maxUVT > 1) pattern = openfl__$internal_renderer_cairo_CairoGraphics.createTempPatternCanvas(openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill,openfl__$internal_renderer_cairo_CairoGraphics.bitmapRepeat,openfl__$internal_renderer_cairo_CairoGraphics.bounds.width | 0,openfl__$internal_renderer_cairo_CairoGraphics.bounds.height | 0); else pattern = openfl__$internal_renderer_cairo_CairoGraphics.createTempPatternCanvas(openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill,openfl__$internal_renderer_cairo_CairoGraphics.bitmapRepeat,openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill.width,openfl__$internal_renderer_cairo_CairoGraphics.bitmapFill.height);
						}
						var i = 0;
						var l = ind.length;
						var a;
						var b;
						var c;
						var iax;
						var iay;
						var ibx;
						var iby;
						var icx;
						var icy;
						var x1;
						var y1;
						var x2;
						var y2;
						var x3;
						var y3;
						var uvx1;
						var uvy1;
						var uvx2;
						var uvy2;
						var uvx3;
						var uvy3;
						var denom;
						var t1;
						var t2;
						var t3;
						var t4;
						var dx;
						var dy;
						while(i < l) {
							a = i;
							b = i + 1;
							c = i + 2;
							iax = ind.data[a] * 2;
							iay = ind.data[a] * 2 + 1;
							ibx = ind.data[b] * 2;
							iby = ind.data[b] * 2 + 1;
							icx = ind.data[c] * 2;
							icy = ind.data[c] * 2 + 1;
							x1 = v.data[iax];
							y1 = v.data[iay];
							x2 = v.data[ibx];
							y2 = v.data[iby];
							x3 = v.data[icx];
							y3 = v.data[icy];
							switch(culling[1]) {
							case 2:
								if(!((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) < 0)) {
									i += 3;
									continue;
								}
								break;
							case 0:
								if((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) < 0) {
									i += 3;
									continue;
								}
								break;
							default:
							}
							if(colorFill) {
								openfl__$internal_renderer_cairo_CairoGraphics.cairo.newPath();
								openfl__$internal_renderer_cairo_CairoGraphics.cairo.moveTo(x1,y1);
								openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(x2,y2);
								openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(x3,y3);
								openfl__$internal_renderer_cairo_CairoGraphics.cairo.closePath();
								openfl__$internal_renderer_cairo_CairoGraphics.cairo.fillPreserve();
								i += 3;
								continue;
							}
							openfl__$internal_renderer_cairo_CairoGraphics.cairo.save();
							openfl__$internal_renderer_cairo_CairoGraphics.cairo.newPath();
							openfl__$internal_renderer_cairo_CairoGraphics.cairo.moveTo(x1,y1);
							openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(x2,y2);
							openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(x3,y3);
							openfl__$internal_renderer_cairo_CairoGraphics.cairo.closePath();
							openfl__$internal_renderer_cairo_CairoGraphics.cairo.clip();
							uvx1 = uvt.data[iax] * lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.get_width(pattern);
							uvx2 = uvt.data[ibx] * lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.get_width(pattern);
							uvx3 = uvt.data[icx] * lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.get_width(pattern);
							uvy1 = uvt.data[iay] * lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.get_height(pattern);
							uvy2 = uvt.data[iby] * lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.get_height(pattern);
							uvy3 = uvt.data[icy] * lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.get_height(pattern);
							denom = uvx1 * (uvy3 - uvy2) - uvx2 * uvy3 + uvx3 * uvy2 + (uvx2 - uvx3) * uvy1;
							if(denom == 0) {
								i += 3;
								continue;
							}
							t1 = -(uvy1 * (x3 - x2) - uvy2 * x3 + uvy3 * x2 + (uvy2 - uvy3) * x1) / denom;
							t2 = (uvy2 * y3 + uvy1 * (y2 - y3) - uvy3 * y2 + (uvy3 - uvy2) * y1) / denom;
							t3 = (uvx1 * (x3 - x2) - uvx2 * x3 + uvx3 * x2 + (uvx2 - uvx3) * x1) / denom;
							t4 = -(uvx2 * y3 + uvx1 * (y2 - y3) - uvx3 * y2 + (uvx3 - uvx2) * y1) / denom;
							dx = (uvx1 * (uvy3 * x2 - uvy2 * x3) + uvy1 * (uvx2 * x3 - uvx3 * x2) + (uvx3 * uvy2 - uvx2 * uvy3) * x1) / denom;
							dy = (uvx1 * (uvy3 * y2 - uvy2 * y3) + uvy1 * (uvx2 * y3 - uvx3 * y2) + (uvx3 * uvy2 - uvx2 * uvy3) * y1) / denom;
							var matrix = new lime_math_Matrix3(t1,t2,t3,t4,dx,dy);
							openfl__$internal_renderer_cairo_CairoGraphics.cairo.transform(matrix);
							openfl__$internal_renderer_cairo_CairoGraphics.cairo.setSourceSurface(pattern,0,0);
							openfl__$internal_renderer_cairo_CairoGraphics.cairo.paint();
							openfl__$internal_renderer_cairo_CairoGraphics.cairo.restore();
							i += 3;
						}
						break;
					case 9:
						var count = command[6];
						var flags = command[5];
						var smooth = command[4];
						var tileData = command[3];
						var sheet = command[2];
						return;
						var useScale = (flags & 1) > 0;
						var useRotation = (flags & 2) > 0;
						var useTransform = (flags & 16) > 0;
						var useRGB = (flags & 4) > 0;
						var useAlpha = (flags & 8) > 0;
						var useRect = (flags & 32) > 0;
						var useOrigin = (flags & 64) > 0;
						var useBlendAdd = (flags & 65536) > 0;
						if(useTransform) {
							useScale = false;
							useRotation = false;
						}
						var scaleIndex = 0;
						var rotationIndex = 0;
						var rgbIndex = 0;
						var alphaIndex = 0;
						var transformIndex = 0;
						var numValues = 3;
						if(useRect) if(useOrigin) numValues = 8; else numValues = 6;
						if(useScale) {
							scaleIndex = numValues;
							numValues++;
						}
						if(useRotation) {
							rotationIndex = numValues;
							numValues++;
						}
						if(useTransform) {
							transformIndex = numValues;
							numValues += 4;
						}
						if(useRGB) {
							rgbIndex = numValues;
							numValues += 3;
						}
						if(useAlpha) {
							alphaIndex = numValues;
							numValues++;
						}
						var totalCount = tileData.length;
						if(count >= 0 && totalCount > count) totalCount = count;
						var itemCount = totalCount / numValues | 0;
						var index = 0;
						var rect = null;
						var center = null;
						var previousTileID = -1;
						var surface2;
						sheet.__bitmap.__sync();
						surface2 = sheet.__bitmap.getSurface();
						openfl__$internal_renderer_cairo_CairoGraphics.cairo.setSourceSurface(surface2,0,0);
						if(useBlendAdd) openfl__$internal_renderer_cairo_CairoGraphics.cairo.set_operator(12);
						while(index < totalCount) {
							var tileID;
							if(!useRect) tileID = tileData[index + 2] | 0; else tileID = -1;
							if(!useRect && tileID != previousTileID) {
								rect = sheet.__tileRects[tileID];
								center = sheet.__centerPoints[tileID];
								previousTileID = tileID;
							} else if(useRect) {
								rect = sheet.__rectTile;
								rect.setTo(tileData[index + 2],tileData[index + 3],tileData[index + 4],tileData[index + 5]);
								center = sheet.__point;
								if(useOrigin) {
									center.x = tileData[index + 6];
									center.y = tileData[index + 7];
								} else {
									center.x = 0;
									center.y = 0;
								}
							}
							if(rect != null && rect.width > 0 && rect.height > 0 && center != null) {
								openfl__$internal_renderer_cairo_CairoGraphics.cairo.save();
								openfl__$internal_renderer_cairo_CairoGraphics.cairo.translate(tileData[index],tileData[index + 1]);
								if(useRotation) {
								}
								var scale = 1.0;
								if(useScale) scale = tileData[index + scaleIndex];
								if(useTransform) {
									var matrix1 = new lime_math_Matrix3(tileData[index + transformIndex],tileData[index + transformIndex + 1],tileData[index + transformIndex + 2],tileData[index + transformIndex + 3],0,0);
									openfl__$internal_renderer_cairo_CairoGraphics.cairo.transform(matrix1);
								}
								if(useAlpha) openfl__$internal_renderer_cairo_CairoGraphics.cairo.paintWithAlpha(tileData[index + alphaIndex]); else openfl__$internal_renderer_cairo_CairoGraphics.cairo.paint();
								openfl__$internal_renderer_cairo_CairoGraphics.cairo.restore();
							}
							index += numValues;
						}
						if(useBlendAdd) openfl__$internal_renderer_cairo_CairoGraphics.cairo.set_operator(2);
						break;
					default:
						openfl_Lib.notImplemented("CairoGraphics");
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
		}
		graphics.set___dirty(false);
		if(openfl__$internal_renderer_cairo_CairoGraphics.fillCommands.length > 0) openfl__$internal_renderer_cairo_CairoGraphics.endFill();
		if(openfl__$internal_renderer_cairo_CairoGraphics.strokeCommands.length > 0) openfl__$internal_renderer_cairo_CairoGraphics.endStroke();
	}
};
openfl__$internal_renderer_cairo_CairoGraphics.renderMask = function(graphics,renderSession) {
	if(graphics.__commands.length != 0) {
		var cairo = renderSession.cairo;
		var positionX = 0.0;
		var positionY = 0.0;
		var offsetX = 0;
		var offsetY = 0;
		var _g = 0;
		var _g1 = graphics.__commands;
		while(_g < _g1.length) {
			var command = _g1[_g];
			++_g;
			switch(command[1]) {
			case 3:
				var y = command[7];
				var x = command[6];
				var cy2 = command[5];
				var cy1 = command[4];
				var cx2 = command[3];
				var cx1 = command[2];
				cairo.curveTo(cx1 - offsetX,cy1 - offsetY,cx2 - offsetX,cy2 - offsetY,x - offsetX,y - offsetY);
				positionX = x;
				positionY = y;
				break;
			case 4:
				var y1 = command[5];
				var x1 = command[4];
				var cy = command[3];
				var cx = command[2];
				openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(cx - offsetX,cy - offsetY,x1 - offsetX,y1 - offsetY);
				positionX = x1;
				positionY = y1;
				break;
			case 5:
				var radius = command[4];
				var y2 = command[3];
				var x2 = command[2];
				cairo.arc(x2 - offsetX,y2 - offsetY,radius,0,Math.PI * 2);
				break;
			case 6:
				var height = command[5];
				var width = command[4];
				var y3 = command[3];
				var x3 = command[2];
				x3 -= offsetX;
				y3 -= offsetY;
				var kappa = .5522848;
				var ox = width / 2 * kappa;
				var oy = height / 2 * kappa;
				var xe = x3 + width;
				var ye = y3 + height;
				var xm = x3 + width / 2;
				var ym = y3 + height / 2;
				cairo.moveTo(x3,ym);
				cairo.curveTo(x3,ym - oy,xm - ox,y3,xm,y3);
				cairo.curveTo(xm + ox,y3,xe,ym - oy,xe,ym);
				cairo.curveTo(xe,ym + oy,xm + ox,ye,xm,ye);
				cairo.curveTo(xm - ox,ye,x3,ym + oy,x3,ym);
				break;
			case 7:
				var height1 = command[5];
				var width1 = command[4];
				var y4 = command[3];
				var x4 = command[2];
				cairo.rectangle(x4 - offsetX,y4 - offsetY,width1,height1);
				break;
			case 8:
				var ry = command[7];
				var rx = command[6];
				var height2 = command[5];
				var width2 = command[4];
				var y5 = command[3];
				var x5 = command[2];
				openfl__$internal_renderer_cairo_CairoGraphics.drawRoundRect(x5 - offsetX,y5 - offsetY,width2,height2,rx,ry);
				break;
			case 13:
				var y6 = command[3];
				var x6 = command[2];
				cairo.lineTo(x6 - offsetX,y6 - offsetY);
				positionX = x6;
				positionY = y6;
				break;
			case 14:
				var y7 = command[3];
				var x7 = command[2];
				cairo.moveTo(x7 - offsetX,y7 - offsetY);
				positionX = x7;
				positionY = y7;
				break;
			default:
			}
		}
	}
};
var openfl__$internal_renderer_cairo_CairoMaskManager = function(renderSession) {
	openfl__$internal_renderer_AbstractMaskManager.call(this,renderSession);
};
$hxClasses["openfl._internal.renderer.cairo.CairoMaskManager"] = openfl__$internal_renderer_cairo_CairoMaskManager;
openfl__$internal_renderer_cairo_CairoMaskManager.__name__ = true;
openfl__$internal_renderer_cairo_CairoMaskManager.__super__ = openfl__$internal_renderer_AbstractMaskManager;
openfl__$internal_renderer_cairo_CairoMaskManager.prototype = $extend(openfl__$internal_renderer_AbstractMaskManager.prototype,{
	pushMask: function(mask) {
		var cairo = this.renderSession.cairo;
		cairo.save();
		var transform = mask.__getTransform();
		cairo.set_matrix(transform.__toMatrix3());
		cairo.newPath();
		mask.__renderCairoMask(this.renderSession);
		cairo.clipPreserve();
	}
	,pushRect: function(rect,transform) {
		var cairo = this.renderSession.cairo;
		cairo.save();
		cairo.set_matrix(new lime_math_Matrix3(transform.a,transform.c,transform.b,transform.d,transform.tx,transform.ty));
		cairo.newPath();
		cairo.rectangle(rect.x,rect.y,rect.width,rect.height);
		cairo.clipPreserve();
	}
	,popMask: function() {
		this.renderSession.cairo.restore();
	}
	,__class__: openfl__$internal_renderer_cairo_CairoMaskManager
});
var openfl__$internal_renderer_cairo_CairoRenderer = function(width,height,cairo) {
	openfl__$internal_renderer_AbstractRenderer.call(this,width,height);
	this.cairo = cairo;
	this.renderSession = new openfl__$internal_renderer_RenderSession();
	this.renderSession.cairo = cairo;
	this.renderSession.roundPixels = true;
	this.renderSession.renderer = this;
	this.renderSession.maskManager = new openfl__$internal_renderer_cairo_CairoMaskManager(this.renderSession);
};
$hxClasses["openfl._internal.renderer.cairo.CairoRenderer"] = openfl__$internal_renderer_cairo_CairoRenderer;
openfl__$internal_renderer_cairo_CairoRenderer.__name__ = true;
openfl__$internal_renderer_cairo_CairoRenderer.__super__ = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_cairo_CairoRenderer.prototype = $extend(openfl__$internal_renderer_AbstractRenderer.prototype,{
	render: function(stage) {
		this.cairo.identityMatrix();
		if(stage.__clearBeforeRender) {
			this.cairo.setSourceRGB(stage.__colorSplit[0],stage.__colorSplit[1],stage.__colorSplit[2]);
			this.cairo.paint();
		}
		stage.__renderCairo(this.renderSession);
	}
	,__class__: openfl__$internal_renderer_cairo_CairoRenderer
});
var openfl__$internal_renderer_cairo_CairoShape = function() { };
$hxClasses["openfl._internal.renderer.cairo.CairoShape"] = openfl__$internal_renderer_cairo_CairoShape;
openfl__$internal_renderer_cairo_CairoShape.__name__ = true;
openfl__$internal_renderer_cairo_CairoShape.render = function(shape,renderSession) {
	if(!shape.__renderable || shape.__worldAlpha <= 0) return;
	var graphics = shape.__graphics;
	if(graphics != null) {
		openfl__$internal_renderer_cairo_CairoGraphics.render(graphics,renderSession);
		if(graphics.__cairo != null) {
			if(shape.__mask != null) renderSession.maskManager.pushMask(shape.__mask);
			var cairo = renderSession.cairo;
			var scrollRect = shape.get_scrollRect();
			var transform = shape.__worldTransform;
			if(renderSession.roundPixels) {
				var matrix = transform.__toMatrix3();
				matrix.tx = Math.round(matrix.tx);
				matrix.ty = Math.round(matrix.ty);
				cairo.set_matrix(matrix);
			} else cairo.set_matrix(transform.__toMatrix3());
			cairo.setSourceSurface(graphics.__cairo.get_target(),graphics.__bounds.x,graphics.__bounds.y);
			cairo.paintWithAlpha(shape.__worldAlpha);
			if(shape.__mask != null) renderSession.maskManager.popMask();
		}
	}
};
var openfl__$internal_renderer_canvas_CanvasBitmap = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasBitmap"] = openfl__$internal_renderer_canvas_CanvasBitmap;
openfl__$internal_renderer_canvas_CanvasBitmap.__name__ = true;
openfl__$internal_renderer_canvas_CanvasBitmap.render = function(bitmap,renderSession) {
	if(!bitmap.__renderable || bitmap.__worldAlpha <= 0) return;
	var context = renderSession.context;
	if(bitmap.bitmapData != null && bitmap.bitmapData.__isValid) {
		if(bitmap.__mask != null) renderSession.maskManager.pushMask(bitmap.__mask);
		bitmap.bitmapData.__sync();
		context.globalAlpha = bitmap.__worldAlpha;
		var transform = bitmap.__worldTransform;
		var scrollRect = bitmap.get_scrollRect();
		if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
		if(!bitmap.smoothing) {
			context.mozImageSmoothingEnabled = false;
			context.imageSmoothingEnabled = false;
			context.imageSmoothingEnabled = false;
		}
		if(scrollRect == null) context.drawImage(bitmap.bitmapData.__image.get_src(),0,0); else context.drawImage(bitmap.bitmapData.__image.get_src(),scrollRect.x,scrollRect.y,scrollRect.width,scrollRect.height,scrollRect.x,scrollRect.y,scrollRect.width,scrollRect.height);
		if(!bitmap.smoothing) {
			context.mozImageSmoothingEnabled = true;
			context.imageSmoothingEnabled = true;
			context.imageSmoothingEnabled = true;
		}
		if(bitmap.__mask != null) renderSession.maskManager.popMask();
	}
};
var openfl__$internal_renderer_canvas_CanvasGraphics = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasGraphics"] = openfl__$internal_renderer_canvas_CanvasGraphics;
openfl__$internal_renderer_canvas_CanvasGraphics.__name__ = true;
openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat = null;
openfl__$internal_renderer_canvas_CanvasGraphics.bounds = null;
openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands = null;
openfl__$internal_renderer_canvas_CanvasGraphics.graphics = null;
openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = null;
openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = null;
openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix = null;
openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix = null;
openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands = null;
openfl__$internal_renderer_canvas_CanvasGraphics.context = null;
openfl__$internal_renderer_canvas_CanvasGraphics.pattern = null;
openfl__$internal_renderer_canvas_CanvasGraphics.beginPatternFill = function(bitmapFill,bitmapRepeat) {
	if(openfl__$internal_renderer_canvas_CanvasGraphics.hasFill || bitmapFill == null) return;
	if(openfl__$internal_renderer_canvas_CanvasGraphics.pattern == null) openfl__$internal_renderer_canvas_CanvasGraphics.pattern = openfl__$internal_renderer_canvas_CanvasGraphics.context.createPattern(bitmapFill.__image.get_src(),bitmapRepeat?"repeat":"no-repeat");
	openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = openfl__$internal_renderer_canvas_CanvasGraphics.pattern;
	openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = true;
};
openfl__$internal_renderer_canvas_CanvasGraphics.createTempPatternCanvas = function(bitmap,repeat,width,height) {
	var canvas = window.document.createElement("canvas");
	var context = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;
	context.fillStyle = context.createPattern(bitmap.__image.get_src(),repeat?"repeat":"no-repeat");
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(0,height);
	context.lineTo(width,height);
	context.lineTo(width,0);
	context.lineTo(0,0);
	context.closePath();
	context.fill();
	return canvas;
};
openfl__$internal_renderer_canvas_CanvasGraphics.endFill = function() {
	openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
	openfl__$internal_renderer_canvas_CanvasGraphics.playCommands(openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands,false);
	openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands = [];
};
openfl__$internal_renderer_canvas_CanvasGraphics.endStroke = function() {
	openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
	openfl__$internal_renderer_canvas_CanvasGraphics.playCommands(openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands,true);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
	openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands = [];
};
openfl__$internal_renderer_canvas_CanvasGraphics.drawRoundRect = function(x,y,width,height,rx,ry) {
	if(ry == -1) ry = rx;
	rx *= 0.5;
	ry *= 0.5;
	if(rx > width / 2) rx = width / 2;
	if(ry > height / 2) ry = height / 2;
	var xe = x + width;
	var ye = y + height;
	var cx1 = -rx + rx * openfl__$internal_renderer_canvas_CanvasGraphics.SIN45;
	var cx2 = -rx + rx * openfl__$internal_renderer_canvas_CanvasGraphics.TAN22;
	var cy1 = -ry + ry * openfl__$internal_renderer_canvas_CanvasGraphics.SIN45;
	var cy2 = -ry + ry * openfl__$internal_renderer_canvas_CanvasGraphics.TAN22;
	openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(xe,ye - ry);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe,ye + cy2,xe + cx1,ye + cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe + cx2,ye,xe - rx,ye);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x + rx,ye);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x - cx2,ye,x - cx1,ye + cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x,ye + cy2,x,ye - ry);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x,y + ry);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x,y - cy2,x - cx1,y - cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x - cx2,y,x + rx,y);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(xe - rx,y);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe + cx2,y,xe + cx1,y - cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe,y - cy2,xe,y + ry);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(xe,ye - ry);
};
openfl__$internal_renderer_canvas_CanvasGraphics.normalizeUVT = function(uvt,skipT) {
	if(skipT == null) skipT = false;
	var max = -Infinity;
	var tmp = -Infinity;
	var len = uvt.length;
	var _g1 = 1;
	var _g = len + 1;
	while(_g1 < _g) {
		var t = _g1++;
		if(skipT && t % 3 == 0) continue;
		tmp = uvt.data[t - 1];
		if(max < tmp) max = tmp;
	}
	var result;
	var this1;
	this1 = new openfl_VectorData();
	var this2;
	this2 = new Array(0);
	this1.data = this2;
	this1.length = 0;
	this1.fixed = false;
	result = this1;
	var _g11 = 1;
	var _g2 = len + 1;
	while(_g11 < _g2) {
		var t1 = _g11++;
		if(skipT && t1 % 3 == 0) continue;
		if(!result.fixed) {
			result.length++;
			if(result.data.length < result.length) {
				var data;
				var this3;
				this3 = new Array(result.data.length + 10);
				data = this3;
				haxe_ds__$Vector_Vector_$Impl_$.blit(result.data,0,data,0,result.data.length);
				result.data = data;
			}
			result.data[result.length - 1] = uvt.data[t1 - 1] / max;
		}
		result.length;
	}
	return { max : max, uvt : result};
};
openfl__$internal_renderer_canvas_CanvasGraphics.playCommands = function(commands,stroke) {
	if(stroke == null) stroke = false;
	openfl__$internal_renderer_canvas_CanvasGraphics.bounds = openfl__$internal_renderer_canvas_CanvasGraphics.graphics.__bounds;
	var offsetX = openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x;
	var offsetY = openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y;
	var positionX = 0.0;
	var positionY = 0.0;
	var closeGap = false;
	var startX = 0.0;
	var startY = 0.0;
	var _g = 0;
	while(_g < commands.length) {
		var command = commands[_g];
		++_g;
		switch(command[1]) {
		case 3:
			var y = command[7];
			var x = command[6];
			var cy2 = command[5];
			var cx2 = command[4];
			var cy1 = command[3];
			var cx1 = command[2];
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(cx1 - offsetX,cy1 - offsetY,cx2 - offsetX,cy2 - offsetY,x - offsetX,y - offsetY);
			break;
		case 4:
			var y1 = command[5];
			var x1 = command[4];
			var cy = command[3];
			var cx = command[2];
			openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(cx - offsetX,cy - offsetY,x1 - offsetX,y1 - offsetY);
			break;
		case 5:
			var radius = command[4];
			var y2 = command[3];
			var x2 = command[2];
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x2 - offsetX + radius,y2 - offsetY);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.arc(x2 - offsetX,y2 - offsetY,radius,0,Math.PI * 2,true);
			break;
		case 6:
			var height = command[5];
			var width = command[4];
			var y3 = command[3];
			var x3 = command[2];
			x3 -= offsetX;
			y3 -= offsetY;
			var kappa = .5522848;
			var ox = width / 2 * kappa;
			var oy = height / 2 * kappa;
			var xe = x3 + width;
			var ye = y3 + height;
			var xm = x3 + width / 2;
			var ym = y3 + height / 2;
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x3,ym);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(x3,ym - oy,xm - ox,y3,xm,y3);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xm + ox,y3,xe,ym - oy,xe,ym);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xe,ym + oy,xm + ox,ye,xm,ye);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xm - ox,ye,x3,ym + oy,x3,ym);
			break;
		case 8:
			var ry = command[7];
			var rx = command[6];
			var height1 = command[5];
			var width1 = command[4];
			var y4 = command[3];
			var x4 = command[2];
			openfl__$internal_renderer_canvas_CanvasGraphics.drawRoundRect(x4 - offsetX,y4 - offsetY,width1,height1,rx,ry);
			break;
		case 13:
			var y5 = command[3];
			var x5 = command[2];
			openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x5 - offsetX,y5 - offsetY);
			positionX = x5;
			positionY = y5;
			break;
		case 14:
			var y6 = command[3];
			var x6 = command[2];
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x6 - offsetX,y6 - offsetY);
			positionX = x6;
			positionY = y6;
			closeGap = true;
			startX = x6;
			startY = y6;
			break;
		case 12:
			var miterLimit = command[9];
			var joints = command[8];
			var caps = command[7];
			var scaleMode = command[6];
			var pixelHinting = command[5];
			var alpha = command[4];
			var color = command[3];
			var thickness = command[2];
			if(stroke && openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke) {
				openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.stroke();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
			}
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(positionX - offsetX,positionY - offsetY);
			if(thickness == null) openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = false; else {
				openfl__$internal_renderer_canvas_CanvasGraphics.context.lineWidth = thickness;
				if(joints == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.lineJoin = "round"; else openfl__$internal_renderer_canvas_CanvasGraphics.context.lineJoin = Std.string(joints).toLowerCase();
				if(caps == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.lineCap = "round"; else switch(caps[1]) {
				case 0:
					openfl__$internal_renderer_canvas_CanvasGraphics.context.lineCap = "butt";
					break;
				default:
					openfl__$internal_renderer_canvas_CanvasGraphics.context.lineCap = Std.string(caps).toLowerCase();
				}
				if(miterLimit == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.miterLimit = 3; else openfl__$internal_renderer_canvas_CanvasGraphics.context.miterLimit = miterLimit;
				if(alpha == 1 || alpha == null) if(color == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = "#000000"; else openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = "#" + StringTools.hex(color & 16777215,6); else {
					var r = (color & 16711680) >>> 16;
					var g = (color & 65280) >>> 8;
					var b = color & 255;
					if(color == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = "#000000"; else openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
				}
				openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = true;
			}
			break;
		case 0:
			var smooth = command[5];
			var repeat = command[4];
			var matrix = command[3];
			var bitmap = command[2];
			if(bitmap != openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill || repeat != openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat) {
				openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = bitmap;
				openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat = repeat;
				openfl__$internal_renderer_canvas_CanvasGraphics.pattern = null;
				openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = false;
				bitmap.__sync();
			}
			if(matrix != null) {
				openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix = matrix;
				openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix = new openfl_geom_Matrix(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
				openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.invert();
			} else {
				openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix = null;
				openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix = null;
			}
			break;
		case 1:
			var alpha1 = command[3];
			var rgb = command[2];
			if(alpha1 < 0.005) openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = false; else {
				if(alpha1 == 1) openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = "#" + StringTools.hex(rgb,6); else {
					var r1 = (rgb & 16711680) >>> 16;
					var g1 = (rgb & 65280) >>> 8;
					var b1 = rgb & 255;
					openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = "rgba(" + r1 + ", " + g1 + ", " + b1 + ", " + alpha1 + ")";
				}
				openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
				openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = true;
			}
			break;
		case 2:
			var focalPointRatio = command[9];
			var interpolationMethod = command[8];
			var spreadMethod = command[7];
			var matrix1 = command[6];
			var ratios = command[5];
			var alphas = command[4];
			var colors = command[3];
			var type = command[2];
			var gradientFill = null;
			switch(type[1]) {
			case 0:
				if(matrix1 == null) matrix1 = new openfl_geom_Matrix();
				var point = matrix1.transformPoint(new openfl_geom_Point(1638.4,0));
				gradientFill = openfl__$internal_renderer_canvas_CanvasGraphics.context.createRadialGradient(matrix1.tx,matrix1.ty,0,matrix1.tx,matrix1.ty,(point.x - matrix1.tx) / 2);
				break;
			case 1:
				var matrix2;
				if(matrix1 != null) matrix2 = new openfl_geom_Matrix(matrix1.a,matrix1.b,matrix1.c,matrix1.d,matrix1.tx,matrix1.ty); else matrix2 = new openfl_geom_Matrix();
				var point1 = matrix2.transformPoint(new openfl_geom_Point(-819.2,0));
				var point2 = matrix2.transformPoint(new openfl_geom_Point(819.2,0));
				gradientFill = openfl__$internal_renderer_canvas_CanvasGraphics.context.createLinearGradient(point1.x,point1.y,point2.x,point2.y);
				break;
			}
			var _g2 = 0;
			var _g1 = colors.length;
			while(_g2 < _g1) {
				var i = _g2++;
				var rgb1 = colors[i];
				var alpha2 = alphas[i];
				var r2 = (rgb1 & 16711680) >>> 16;
				var g2 = (rgb1 & 65280) >>> 8;
				var b2 = rgb1 & 255;
				var ratio = ratios[i] / 255;
				if(ratio < 0) ratio = 0;
				if(ratio > 1) ratio = 1;
				gradientFill.addColorStop(ratio,"rgba(" + r2 + ", " + g2 + ", " + b2 + ", " + alpha2 + ")");
			}
			openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = gradientFill;
			openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
			openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = true;
			break;
		case 7:
			var height2 = command[5];
			var width2 = command[4];
			var y7 = command[3];
			var x7 = command[2];
			var optimizationUsed = false;
			if(openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill != null) {
				var st = 0;
				var sr = 0;
				var sb = 0;
				var sl = 0;
				var canOptimizeMatrix = true;
				if(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix != null) {
					if(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.b != 0 || openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.c != 0) canOptimizeMatrix = false; else {
						var stl = openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.transformPoint(new openfl_geom_Point(x7,y7));
						var sbr = openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.transformPoint(new openfl_geom_Point(x7 + width2,y7 + height2));
						st = stl.y;
						sl = stl.x;
						sb = sbr.y;
						sr = sbr.x;
					}
				} else {
					st = y7;
					sl = x7;
					sb = y7 + height2;
					sr = x7 + width2;
				}
				if(canOptimizeMatrix && st >= 0 && sl >= 0 && sr <= openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.width && sb <= openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.height) {
					optimizationUsed = true;
					openfl__$internal_renderer_canvas_CanvasGraphics.context.drawImage(openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.__image.get_src(),sl,st,sr - sl,sb - st,x7 - offsetX,y7 - offsetY,width2,height2);
				}
			}
			if(!optimizationUsed) openfl__$internal_renderer_canvas_CanvasGraphics.context.rect(x7 - offsetX,y7 - offsetY,width2,height2);
			break;
		default:
		}
	}
	if(stroke && openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke) {
		if(openfl__$internal_renderer_canvas_CanvasGraphics.hasFill && closeGap) openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(startX - offsetX,startY - offsetY);
		openfl__$internal_renderer_canvas_CanvasGraphics.context.stroke();
	}
	if(!stroke) {
		if(openfl__$internal_renderer_canvas_CanvasGraphics.hasFill || openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill != null) {
			if(openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill != null) openfl__$internal_renderer_canvas_CanvasGraphics.beginPatternFill(openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill,openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.translate(-openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x,-openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y);
			if(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix != null) {
				openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.a,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.b,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.c,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.d,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.tx,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.ty);
				openfl__$internal_renderer_canvas_CanvasGraphics.context.fill();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.a,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.b,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.c,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.d,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.tx,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.ty);
			} else openfl__$internal_renderer_canvas_CanvasGraphics.context.fill();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.translate(openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x,openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
		}
	}
};
openfl__$internal_renderer_canvas_CanvasGraphics.render = function(graphics,renderSession) {
	if(graphics.__dirty) {
		openfl__$internal_renderer_canvas_CanvasGraphics.graphics = graphics;
		openfl__$internal_renderer_canvas_CanvasGraphics.bounds = graphics.__bounds;
		if(!graphics.__visible || graphics.__commands.length == 0 || openfl__$internal_renderer_canvas_CanvasGraphics.bounds == null || openfl__$internal_renderer_canvas_CanvasGraphics.bounds.width == 0 || openfl__$internal_renderer_canvas_CanvasGraphics.bounds.height == 0) {
			graphics.__canvas = null;
			graphics.__context = null;
		} else {
			if(graphics.__canvas == null) {
				graphics.__canvas = window.document.createElement("canvas");
				graphics.__context = graphics.__canvas.getContext("2d");
			}
			openfl__$internal_renderer_canvas_CanvasGraphics.context = graphics.__context;
			graphics.__canvas.width = Math.ceil(openfl__$internal_renderer_canvas_CanvasGraphics.bounds.width);
			graphics.__canvas.height = Math.ceil(openfl__$internal_renderer_canvas_CanvasGraphics.bounds.height);
			var offsetX = openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x;
			var offsetY = openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y;
			openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands = [];
			openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands = [];
			openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = false;
			openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = false;
			openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
			openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat = false;
			var _g = 0;
			var _g1 = graphics.__commands;
			try {
				while(_g < _g1.length) {
					var command = _g1[_g];
					++_g;
					switch(command[1]) {
					case 3:case 4:case 13:case 14:
						openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.push(command);
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.push(command);
						break;
					case 11:
						openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
						openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
						openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = false;
						break;
					case 12:
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.push(command);
						break;
					case 0:case 1:case 2:
						openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
						openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
						openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.push(command);
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.push(command);
						break;
					case 5:case 6:case 7:case 8:
						openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
						openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
						openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.push(command);
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.push(command);
						break;
					case 10:
						var culling = command[5];
						var uvtData = command[4];
						var indices = command[3];
						var vertices = command[2];
						openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
						openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
						var v = vertices;
						var ind = indices;
						var uvt = uvtData;
						var pattern = null;
						var colorFill = openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill == null;
						if(colorFill && uvt != null) throw "__break__";
						if(!colorFill) {
							if(uvtData == null) {
								var this1;
								this1 = new openfl_VectorData();
								var this2;
								this2 = new Array(0);
								this1.data = this2;
								this1.length = 0;
								this1.fixed = false;
								uvtData = this1;
								var _g3 = 0;
								var _g2 = v.length / 2 | 0;
								while(_g3 < _g2) {
									var i1 = _g3++;
									if(!uvtData.fixed) {
										uvtData.length++;
										if(uvtData.data.length < uvtData.length) {
											var data;
											var this3;
											this3 = new Array(uvtData.data.length + 10);
											data = this3;
											haxe_ds__$Vector_Vector_$Impl_$.blit(uvtData.data,0,data,0,uvtData.data.length);
											uvtData.data = data;
										}
										uvtData.data[uvtData.length - 1] = v.data[i1 * 2] / openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.width;
									}
									uvtData.length;
									if(!uvtData.fixed) {
										uvtData.length++;
										if(uvtData.data.length < uvtData.length) {
											var data1;
											var this4;
											this4 = new Array(uvtData.data.length + 10);
											data1 = this4;
											haxe_ds__$Vector_Vector_$Impl_$.blit(uvtData.data,0,data1,0,uvtData.data.length);
											uvtData.data = data1;
										}
										uvtData.data[uvtData.length - 1] = v.data[i1 * 2 + 1] / openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.height;
									}
									uvtData.length;
								}
							}
							var skipT = uvtData.length != v.length;
							var normalizedUVT = openfl__$internal_renderer_canvas_CanvasGraphics.normalizeUVT(uvtData,skipT);
							var maxUVT = normalizedUVT.max;
							uvt = normalizedUVT.uvt;
							if(maxUVT > 1) pattern = openfl__$internal_renderer_canvas_CanvasGraphics.createTempPatternCanvas(openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill,openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat,openfl__$internal_renderer_canvas_CanvasGraphics.bounds.width | 0,openfl__$internal_renderer_canvas_CanvasGraphics.bounds.height | 0); else pattern = openfl__$internal_renderer_canvas_CanvasGraphics.createTempPatternCanvas(openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill,openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat,openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.width,openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.height);
						}
						var i = 0;
						var l = ind.length;
						var a;
						var b;
						var c;
						var iax;
						var iay;
						var ibx;
						var iby;
						var icx;
						var icy;
						var x1;
						var y1;
						var x2;
						var y2;
						var x3;
						var y3;
						var uvx1;
						var uvy1;
						var uvx2;
						var uvy2;
						var uvx3;
						var uvy3;
						var denom;
						var t1;
						var t2;
						var t3;
						var t4;
						var dx;
						var dy;
						while(i < l) {
							a = i;
							b = i + 1;
							c = i + 2;
							iax = ind.data[a] * 2;
							iay = ind.data[a] * 2 + 1;
							ibx = ind.data[b] * 2;
							iby = ind.data[b] * 2 + 1;
							icx = ind.data[c] * 2;
							icy = ind.data[c] * 2 + 1;
							x1 = v.data[iax];
							y1 = v.data[iay];
							x2 = v.data[ibx];
							y2 = v.data[iby];
							x3 = v.data[icx];
							y3 = v.data[icy];
							switch(culling[1]) {
							case 2:
								if(!((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) < 0)) {
									i += 3;
									continue;
								}
								break;
							case 0:
								if((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) < 0) {
									i += 3;
									continue;
								}
								break;
							default:
							}
							if(colorFill) {
								openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
								openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x1,y1);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x2,y2);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x3,y3);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
								openfl__$internal_renderer_canvas_CanvasGraphics.context.fill();
								i += 3;
								continue;
							}
							openfl__$internal_renderer_canvas_CanvasGraphics.context.save();
							openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
							openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x1,y1);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x2,y2);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x3,y3);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
							openfl__$internal_renderer_canvas_CanvasGraphics.context.clip();
							uvx1 = uvt.data[iax] * pattern.width;
							uvx2 = uvt.data[ibx] * pattern.width;
							uvx3 = uvt.data[icx] * pattern.width;
							uvy1 = uvt.data[iay] * pattern.height;
							uvy2 = uvt.data[iby] * pattern.height;
							uvy3 = uvt.data[icy] * pattern.height;
							denom = uvx1 * (uvy3 - uvy2) - uvx2 * uvy3 + uvx3 * uvy2 + (uvx2 - uvx3) * uvy1;
							if(denom == 0) {
								i += 3;
								continue;
							}
							t1 = -(uvy1 * (x3 - x2) - uvy2 * x3 + uvy3 * x2 + (uvy2 - uvy3) * x1) / denom;
							t2 = (uvy2 * y3 + uvy1 * (y2 - y3) - uvy3 * y2 + (uvy3 - uvy2) * y1) / denom;
							t3 = (uvx1 * (x3 - x2) - uvx2 * x3 + uvx3 * x2 + (uvx2 - uvx3) * x1) / denom;
							t4 = -(uvx2 * y3 + uvx1 * (y2 - y3) - uvx3 * y2 + (uvx3 - uvx2) * y1) / denom;
							dx = (uvx1 * (uvy3 * x2 - uvy2 * x3) + uvy1 * (uvx2 * x3 - uvx3 * x2) + (uvx3 * uvy2 - uvx2 * uvy3) * x1) / denom;
							dy = (uvx1 * (uvy3 * y2 - uvy2 * y3) + uvy1 * (uvx2 * y3 - uvx3 * y2) + (uvx3 * uvy2 - uvx2 * uvy3) * y1) / denom;
							openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(t1,t2,t3,t4,dx,dy);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.drawImage(pattern,0,0);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.restore();
							i += 3;
						}
						break;
					case 9:
						var count = command[6];
						var flags = command[5];
						var smooth = command[4];
						var tileData = command[3];
						var sheet = command[2];
						var useScale = (flags & 1) > 0;
						var useRotation = (flags & 2) > 0;
						var useTransform = (flags & 16) > 0;
						var useRGB = (flags & 4) > 0;
						var useAlpha = (flags & 8) > 0;
						var useRect = (flags & 32) > 0;
						var useOrigin = (flags & 64) > 0;
						var useBlendAdd = (flags & 65536) > 0;
						if(useTransform) {
							useScale = false;
							useRotation = false;
						}
						var scaleIndex = 0;
						var rotationIndex = 0;
						var rgbIndex = 0;
						var alphaIndex = 0;
						var transformIndex = 0;
						var numValues = 3;
						if(useRect) if(useOrigin) numValues = 8; else numValues = 6;
						if(useScale) {
							scaleIndex = numValues;
							numValues++;
						}
						if(useRotation) {
							rotationIndex = numValues;
							numValues++;
						}
						if(useTransform) {
							transformIndex = numValues;
							numValues += 4;
						}
						if(useRGB) {
							rgbIndex = numValues;
							numValues += 3;
						}
						if(useAlpha) {
							alphaIndex = numValues;
							numValues++;
						}
						var totalCount = tileData.length;
						if(count >= 0 && totalCount > count) totalCount = count;
						var itemCount = totalCount / numValues | 0;
						var index = 0;
						var rect = null;
						var center = null;
						var previousTileID = -1;
						var surface;
						sheet.__bitmap.__sync();
						surface = sheet.__bitmap.__image.get_src();
						if(useBlendAdd) openfl__$internal_renderer_canvas_CanvasGraphics.context.globalCompositeOperation = "lighter";
						while(index < totalCount) {
							var tileID;
							if(!useRect) tileID = tileData[index + 2] | 0; else tileID = -1;
							if(!useRect && tileID != previousTileID) {
								rect = sheet.__tileRects[tileID];
								center = sheet.__centerPoints[tileID];
								previousTileID = tileID;
							} else if(useRect) {
								rect = sheet.__rectTile;
								rect.setTo(tileData[index + 2],tileData[index + 3],tileData[index + 4],tileData[index + 5]);
								center = sheet.__point;
								if(useOrigin) {
									center.x = tileData[index + 6];
									center.y = tileData[index + 7];
								} else {
									center.x = 0;
									center.y = 0;
								}
							}
							if(rect != null && rect.width > 0 && rect.height > 0 && center != null) {
								openfl__$internal_renderer_canvas_CanvasGraphics.context.save();
								openfl__$internal_renderer_canvas_CanvasGraphics.context.translate(tileData[index],tileData[index + 1]);
								if(useRotation) openfl__$internal_renderer_canvas_CanvasGraphics.context.rotate(tileData[index + rotationIndex]);
								var scale = 1.0;
								if(useScale) scale = tileData[index + scaleIndex];
								if(useTransform) openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(tileData[index + transformIndex],tileData[index + transformIndex + 1],tileData[index + transformIndex + 2],tileData[index + transformIndex + 3],0,0);
								if(useAlpha) openfl__$internal_renderer_canvas_CanvasGraphics.context.globalAlpha = tileData[index + alphaIndex];
								openfl__$internal_renderer_canvas_CanvasGraphics.context.drawImage(surface,rect.x,rect.y,rect.width,rect.height,-center.x * scale,-center.y * scale,rect.width * scale,rect.height * scale);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.restore();
							}
							index += numValues;
						}
						if(useBlendAdd) openfl__$internal_renderer_canvas_CanvasGraphics.context.globalCompositeOperation = "source-over";
						break;
					default:
						openfl_Lib.notImplemented("CanvasGraphics");
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
		}
		graphics.set___dirty(false);
		if(openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.length > 0) openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
		if(openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.length > 0) openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
	}
};
openfl__$internal_renderer_canvas_CanvasGraphics.renderMask = function(graphics,renderSession) {
	if(graphics.__commands.length != 0) {
		var context = renderSession.context;
		var positionX = 0.0;
		var positionY = 0.0;
		var offsetX = 0;
		var offsetY = 0;
		var _g = 0;
		var _g1 = graphics.__commands;
		while(_g < _g1.length) {
			var command = _g1[_g];
			++_g;
			switch(command[1]) {
			case 3:
				var y = command[7];
				var x = command[6];
				var cy2 = command[5];
				var cy1 = command[4];
				var cx2 = command[3];
				var cx1 = command[2];
				context.bezierCurveTo(cx1 - offsetX,cy1 - offsetY,cx2 - offsetX,cy2 - offsetY,x - offsetX,y - offsetY);
				positionX = x;
				positionY = y;
				break;
			case 4:
				var y1 = command[5];
				var x1 = command[4];
				var cy = command[3];
				var cx = command[2];
				context.quadraticCurveTo(cx - offsetX,cy - offsetY,x1 - offsetX,y1 - offsetY);
				positionX = x1;
				positionY = y1;
				break;
			case 5:
				var radius = command[4];
				var y2 = command[3];
				var x2 = command[2];
				context.arc(x2 - offsetX,y2 - offsetY,radius,0,Math.PI * 2,true);
				break;
			case 6:
				var height = command[5];
				var width = command[4];
				var y3 = command[3];
				var x3 = command[2];
				x3 -= offsetX;
				y3 -= offsetY;
				var kappa = .5522848;
				var ox = width / 2 * kappa;
				var oy = height / 2 * kappa;
				var xe = x3 + width;
				var ye = y3 + height;
				var xm = x3 + width / 2;
				var ym = y3 + height / 2;
				context.moveTo(x3,ym);
				context.bezierCurveTo(x3,ym - oy,xm - ox,y3,xm,y3);
				context.bezierCurveTo(xm + ox,y3,xe,ym - oy,xe,ym);
				context.bezierCurveTo(xe,ym + oy,xm + ox,ye,xm,ye);
				context.bezierCurveTo(xm - ox,ye,x3,ym + oy,x3,ym);
				break;
			case 7:
				var height1 = command[5];
				var width1 = command[4];
				var y4 = command[3];
				var x4 = command[2];
				context.rect(x4 - offsetX,y4 - offsetY,width1,height1);
				break;
			case 8:
				var ry = command[7];
				var rx = command[6];
				var height2 = command[5];
				var width2 = command[4];
				var y5 = command[3];
				var x5 = command[2];
				openfl__$internal_renderer_canvas_CanvasGraphics.drawRoundRect(x5 - offsetX,y5 - offsetY,width2,height2,rx,ry);
				break;
			case 13:
				var y6 = command[3];
				var x6 = command[2];
				context.lineTo(x6 - offsetX,y6 - offsetY);
				positionX = x6;
				positionY = y6;
				break;
			case 14:
				var y7 = command[3];
				var x7 = command[2];
				context.moveTo(x7 - offsetX,y7 - offsetY);
				positionX = x7;
				positionY = y7;
				break;
			default:
			}
		}
	}
};
var openfl__$internal_renderer_canvas_CanvasMaskManager = function(renderSession) {
	openfl__$internal_renderer_AbstractMaskManager.call(this,renderSession);
};
$hxClasses["openfl._internal.renderer.canvas.CanvasMaskManager"] = openfl__$internal_renderer_canvas_CanvasMaskManager;
openfl__$internal_renderer_canvas_CanvasMaskManager.__name__ = true;
openfl__$internal_renderer_canvas_CanvasMaskManager.__super__ = openfl__$internal_renderer_AbstractMaskManager;
openfl__$internal_renderer_canvas_CanvasMaskManager.prototype = $extend(openfl__$internal_renderer_AbstractMaskManager.prototype,{
	pushMask: function(mask) {
		var context = this.renderSession.context;
		context.save();
		var transform = mask.__getTransform();
		context.setTransform(transform.a,transform.c,transform.b,transform.d,transform.tx,transform.ty);
		context.beginPath();
		mask.__renderCanvasMask(this.renderSession);
		context.clip();
	}
	,pushRect: function(rect,transform) {
		var context = this.renderSession.context;
		context.save();
		context.setTransform(transform.a,transform.c,transform.b,transform.d,transform.tx,transform.ty);
		context.beginPath();
		context.rect(rect.x,rect.y,rect.width,rect.height);
		context.clip();
	}
	,popMask: function() {
		this.renderSession.context.restore();
	}
	,__class__: openfl__$internal_renderer_canvas_CanvasMaskManager
});
var openfl__$internal_renderer_canvas_CanvasRenderer = function(width,height,context) {
	openfl__$internal_renderer_AbstractRenderer.call(this,width,height);
	this.context = context;
	this.renderSession = new openfl__$internal_renderer_RenderSession();
	this.renderSession.context = context;
	this.renderSession.roundPixels = true;
	this.renderSession.renderer = this;
	this.renderSession.maskManager = new openfl__$internal_renderer_canvas_CanvasMaskManager(this.renderSession);
};
$hxClasses["openfl._internal.renderer.canvas.CanvasRenderer"] = openfl__$internal_renderer_canvas_CanvasRenderer;
openfl__$internal_renderer_canvas_CanvasRenderer.__name__ = true;
openfl__$internal_renderer_canvas_CanvasRenderer.__super__ = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_canvas_CanvasRenderer.prototype = $extend(openfl__$internal_renderer_AbstractRenderer.prototype,{
	render: function(stage) {
		this.context.setTransform(1,0,0,1,0,0);
		this.context.globalAlpha = 1;
		if(!stage.__transparent && stage.__clearBeforeRender) {
			this.context.fillStyle = stage.__colorString;
			this.context.fillRect(0,0,stage.stageWidth,stage.stageHeight);
		} else if(stage.__transparent && stage.__clearBeforeRender) this.context.clearRect(0,0,stage.stageWidth,stage.stageHeight);
		stage.__renderCanvas(this.renderSession);
	}
	,__class__: openfl__$internal_renderer_canvas_CanvasRenderer
});
var openfl__$internal_renderer_canvas_CanvasShape = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasShape"] = openfl__$internal_renderer_canvas_CanvasShape;
openfl__$internal_renderer_canvas_CanvasShape.__name__ = true;
openfl__$internal_renderer_canvas_CanvasShape.render = function(shape,renderSession) {
	if(!shape.__renderable || shape.__worldAlpha <= 0) return;
	var graphics = shape.__graphics;
	if(graphics != null) {
		openfl__$internal_renderer_canvas_CanvasGraphics.render(graphics,renderSession);
		if(graphics.__canvas != null) {
			if(shape.__mask != null) renderSession.maskManager.pushMask(shape.__mask);
			var context = renderSession.context;
			var scrollRect = shape.get_scrollRect();
			context.globalAlpha = shape.__worldAlpha;
			var transform = shape.__worldTransform;
			if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
			if(scrollRect == null) context.drawImage(graphics.__canvas,graphics.__bounds.x,graphics.__bounds.y); else context.drawImage(graphics.__canvas,scrollRect.x - graphics.__bounds.x,scrollRect.y - graphics.__bounds.y,scrollRect.width,scrollRect.height,graphics.__bounds.x + scrollRect.x,graphics.__bounds.y + scrollRect.y,scrollRect.width,scrollRect.height);
			if(shape.__mask != null) renderSession.maskManager.popMask();
		}
	}
};
var openfl__$internal_renderer_canvas_CanvasTextField = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasTextField"] = openfl__$internal_renderer_canvas_CanvasTextField;
openfl__$internal_renderer_canvas_CanvasTextField.__name__ = true;
openfl__$internal_renderer_canvas_CanvasTextField.context = null;
openfl__$internal_renderer_canvas_CanvasTextField.render = function(textField,renderSession) {
	if(!textField.__renderable || textField.__worldAlpha <= 0) return;
	openfl__$internal_renderer_canvas_CanvasTextField.update(textField);
	if(textField.__canvas != null) {
		var context = renderSession.context;
		context.globalAlpha = textField.__worldAlpha;
		var transform = textField.__worldTransform;
		var scrollRect = textField.get_scrollRect();
		if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
		if(scrollRect == null) context.drawImage(textField.__canvas,0,0); else context.drawImage(textField.__canvas,scrollRect.x,scrollRect.y,scrollRect.width,scrollRect.height,scrollRect.x,scrollRect.y,scrollRect.width,scrollRect.height);
	}
};
openfl__$internal_renderer_canvas_CanvasTextField.renderText = function(textField,text,format,offsetX) {
	openfl__$internal_renderer_canvas_CanvasTextField.context.font = textField.__getFont(format);
	openfl__$internal_renderer_canvas_CanvasTextField.context.fillStyle = "#" + StringTools.hex(format.color,6);
	openfl__$internal_renderer_canvas_CanvasTextField.context.textBaseline = "top";
	var yOffset = 0.0;
	if(new EReg("(iPad|iPhone|iPod|Firefox)","g").match(window.navigator.userAgent)) yOffset = format.size * 0.185;
	var lines = [];
	if(textField.get_wordWrap()) {
		var words = text.split(" ");
		var line = "";
		var word;
		var newLineIndex;
		var test;
		var _g1 = 0;
		var _g = words.length;
		while(_g1 < _g) {
			var i = _g1++;
			word = words[i];
			newLineIndex = word.indexOf("\n");
			if(newLineIndex > -1) {
				while(newLineIndex > -1) {
					test = line + word.substring(0,newLineIndex) + " ";
					if(openfl__$internal_renderer_canvas_CanvasTextField.context.measureText(test).width > textField.__width - 4 && i > 0) {
						lines.push(line);
						lines.push(word.substring(0,newLineIndex));
					} else lines.push(line + word.substring(0,newLineIndex));
					word = HxOverrides.substr(word,newLineIndex + 1,null);
					newLineIndex = word.indexOf("\n");
					line = "";
				}
				if(word != "") line = word + " ";
			} else {
				test = line + words[i] + " ";
				if(openfl__$internal_renderer_canvas_CanvasTextField.context.measureText(test).width > textField.__width - 4 && i > 0) {
					lines.push(line);
					line = words[i] + " ";
				} else line = test;
			}
		}
		if(line != "") lines.push(line);
	} else lines = text.split("\n");
	var _g2 = 0;
	while(_g2 < lines.length) {
		var line1 = lines[_g2];
		++_g2;
		var _g11 = format.align;
		switch(_g11[1]) {
		case 3:
			openfl__$internal_renderer_canvas_CanvasTextField.context.textAlign = "center";
			openfl__$internal_renderer_canvas_CanvasTextField.context.fillText(line1,textField.__width / 2,2 + yOffset,textField.__width - 4);
			break;
		case 1:
			openfl__$internal_renderer_canvas_CanvasTextField.context.textAlign = "end";
			openfl__$internal_renderer_canvas_CanvasTextField.context.fillText(line1,textField.__width - 2,2 + yOffset,textField.__width - 4);
			break;
		default:
			openfl__$internal_renderer_canvas_CanvasTextField.context.textAlign = "start";
			openfl__$internal_renderer_canvas_CanvasTextField.context.fillText(line1,2 + offsetX,2 + yOffset,textField.__width - 4);
		}
		yOffset += textField.get_textHeight();
	}
};
openfl__$internal_renderer_canvas_CanvasTextField.update = function(textField) {
	if(textField.__dirty) {
		if((textField.__text == null || textField.__text == "") && !textField.background && !textField.border && !textField.__hasFocus || (textField.get_width() <= 0 || textField.get_height() <= 0) && textField.autoSize != openfl_text_TextFieldAutoSize.LEFT) {
			textField.__canvas = null;
			textField.__context = null;
			textField.__dirty = false;
		} else {
			if(textField.__canvas == null) {
				textField.__canvas = window.document.createElement("canvas");
				textField.__context = textField.__canvas.getContext("2d");
			}
			openfl__$internal_renderer_canvas_CanvasTextField.context = textField.__context;
			if(textField.__text != null && textField.__text != "" || textField.__hasFocus) {
				var text = textField.get_text();
				if(textField.displayAsPassword) {
					var length = text.length;
					var mask = "";
					var _g = 0;
					while(_g < length) {
						var i = _g++;
						mask += "*";
					}
					text = mask;
				}
				var measurements = textField.__measureText();
				var textWidth = 0.0;
				var _g1 = 0;
				while(_g1 < measurements.length) {
					var measurement = measurements[_g1];
					++_g1;
					textWidth += measurement;
				}
				if(textField.autoSize == openfl_text_TextFieldAutoSize.LEFT) textField.__width = textWidth + 4;
				textField.__canvas.width = Math.ceil(textField.__width);
				textField.__canvas.height = Math.ceil(textField.__height);
				if(textField.border || textField.background) {
					textField.__context.rect(0.5,0.5,textField.__width - 1,textField.__height - 1);
					if(textField.background) {
						openfl__$internal_renderer_canvas_CanvasTextField.context.fillStyle = "#" + StringTools.hex(textField.backgroundColor,6);
						openfl__$internal_renderer_canvas_CanvasTextField.context.fill();
					}
					if(textField.border) {
						openfl__$internal_renderer_canvas_CanvasTextField.context.lineWidth = 1;
						openfl__$internal_renderer_canvas_CanvasTextField.context.strokeStyle = "#" + StringTools.hex(textField.borderColor,6);
						openfl__$internal_renderer_canvas_CanvasTextField.context.stroke();
					}
				}
				if(textField.__hasFocus && textField.__selectionStart == textField.__cursorPosition && textField.__showCursor) {
					var cursorOffset = textField.__getTextWidth(text.substring(0,textField.__cursorPosition)) + 3;
					openfl__$internal_renderer_canvas_CanvasTextField.context.fillStyle = "#" + StringTools.hex(textField.__textFormat.color,6);
					openfl__$internal_renderer_canvas_CanvasTextField.context.fillRect(cursorOffset,5,1,textField.__textFormat.size * 1.185 - 4);
				} else if(textField.__hasFocus && Math.abs(textField.__selectionStart - textField.__cursorPosition) > 0) {
					var lowPos = Std["int"](Math.min(textField.__selectionStart,textField.__cursorPosition));
					var highPos = Std["int"](Math.max(textField.__selectionStart,textField.__cursorPosition));
					var xPos = textField.__getTextWidth(text.substring(0,lowPos)) + 2;
					var widthPos = textField.__getTextWidth(text.substring(lowPos,highPos));
					openfl__$internal_renderer_canvas_CanvasTextField.context.fillStyle = "#000000";
					openfl__$internal_renderer_canvas_CanvasTextField.context.fillRect(xPos,5,widthPos,textField.__textFormat.size * 1.185 - 4);
				}
				if(textField.__ranges == null) openfl__$internal_renderer_canvas_CanvasTextField.renderText(textField,text,textField.__textFormat,0); else {
					var currentIndex = 0;
					var range;
					var offsetX = 0.0;
					var _g11 = 0;
					var _g2 = textField.__ranges.length;
					while(_g11 < _g2) {
						var i1 = _g11++;
						range = textField.__ranges[i1];
						openfl__$internal_renderer_canvas_CanvasTextField.renderText(textField,text.substring(range.start,range.end),range.format,offsetX);
						offsetX += measurements[i1];
					}
				}
			} else {
				if(textField.autoSize == openfl_text_TextFieldAutoSize.LEFT) textField.__width = 4;
				textField.__canvas.width = Math.ceil(textField.__width);
				textField.__canvas.height = Math.ceil(textField.__height);
				if(textField.border || textField.background) {
					if(textField.border) openfl__$internal_renderer_canvas_CanvasTextField.context.rect(0.5,0.5,textField.__width - 1,textField.__height - 1); else textField.__context.rect(0,0,textField.__width,textField.__height);
					if(textField.background) {
						openfl__$internal_renderer_canvas_CanvasTextField.context.fillStyle = "#" + StringTools.hex(textField.backgroundColor,6);
						openfl__$internal_renderer_canvas_CanvasTextField.context.fill();
					}
					if(textField.border) {
						openfl__$internal_renderer_canvas_CanvasTextField.context.lineWidth = 1;
						openfl__$internal_renderer_canvas_CanvasTextField.context.lineCap = "square";
						openfl__$internal_renderer_canvas_CanvasTextField.context.strokeStyle = "#" + StringTools.hex(textField.borderColor,6);
						openfl__$internal_renderer_canvas_CanvasTextField.context.stroke();
					}
				}
			}
			textField.__dirty = false;
			return true;
		}
	}
	return false;
};
var openfl__$internal_renderer_dom_DOMBitmap = function() { };
$hxClasses["openfl._internal.renderer.dom.DOMBitmap"] = openfl__$internal_renderer_dom_DOMBitmap;
openfl__$internal_renderer_dom_DOMBitmap.__name__ = true;
openfl__$internal_renderer_dom_DOMBitmap.renderCanvas = function(bitmap,renderSession) {
	if(bitmap.__image != null) {
		renderSession.element.removeChild(bitmap.__image);
		bitmap.__image = null;
	}
	if(bitmap.__canvas == null) {
		bitmap.__canvas = window.document.createElement("canvas");
		bitmap.__context = bitmap.__canvas.getContext("2d");
		if(!bitmap.smoothing) {
			bitmap.__context.mozImageSmoothingEnabled = false;
			bitmap.__context.imageSmoothingEnabled = false;
			bitmap.__context.imageSmoothingEnabled = false;
		}
		openfl__$internal_renderer_dom_DOMRenderer.initializeElement(bitmap,bitmap.__canvas,renderSession);
	}
	bitmap.bitmapData.__sync();
	bitmap.__canvas.width = bitmap.bitmapData.width;
	bitmap.__canvas.height = bitmap.bitmapData.height;
	bitmap.__context.globalAlpha = bitmap.__worldAlpha;
	bitmap.__context.drawImage(bitmap.bitmapData.__image.buffer.__srcCanvas,0,0);
	openfl__$internal_renderer_dom_DOMRenderer.applyStyle(bitmap,renderSession,true,false,true);
};
openfl__$internal_renderer_dom_DOMBitmap.renderImage = function(bitmap,renderSession) {
	if(bitmap.__canvas != null) {
		renderSession.element.removeChild(bitmap.__canvas);
		bitmap.__canvas = null;
	}
	if(bitmap.__image == null) {
		bitmap.__image = window.document.createElement("img");
		bitmap.__image.src = bitmap.bitmapData.__image.buffer.__srcImage.src;
		openfl__$internal_renderer_dom_DOMRenderer.initializeElement(bitmap,bitmap.__image,renderSession);
	}
	openfl__$internal_renderer_dom_DOMRenderer.applyStyle(bitmap,renderSession,true,true,true);
};
var openfl__$internal_renderer_dom_DOMRenderer = function(width,height,element) {
	openfl__$internal_renderer_AbstractRenderer.call(this,width,height);
	this.element = element;
	this.renderSession = new openfl__$internal_renderer_RenderSession();
	this.renderSession.element = element;
	this.renderSession.roundPixels = true;
	var prefix = (function () {
		  var styles = window.getComputedStyle(document.documentElement, ''),
			pre = (Array.prototype.slice
			  .call(styles)
			  .join('') 
			  .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
			)[1],
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		  return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		  };
		})();
	this.renderSession.vendorPrefix = prefix.lowercase;
	if(prefix.lowercase == "webkit") this.renderSession.transformProperty = "-webkit-transform"; else this.renderSession.transformProperty = "transform";
	if(prefix.lowercase == "webkit") this.renderSession.transformOriginProperty = "-webkit-transform-origin"; else this.renderSession.transformOriginProperty = "transform-origin";
	this.renderSession.renderer = this;
};
$hxClasses["openfl._internal.renderer.dom.DOMRenderer"] = openfl__$internal_renderer_dom_DOMRenderer;
openfl__$internal_renderer_dom_DOMRenderer.__name__ = true;
openfl__$internal_renderer_dom_DOMRenderer.applyStyle = function(displayObject,renderSession,setTransform,setAlpha,setClip) {
	var style = displayObject.__style;
	if(setTransform && displayObject.__worldTransformChanged) style.setProperty(renderSession.transformProperty,displayObject.__worldTransform.to3DString(renderSession.roundPixels),null);
	if(displayObject.__worldZ != ++renderSession.z) {
		displayObject.__worldZ = renderSession.z;
		style.setProperty("z-index",displayObject.__worldZ == null?"null":"" + displayObject.__worldZ,null);
	}
	if(setAlpha && displayObject.__worldAlphaChanged) {
		if(displayObject.__worldAlpha < 1) style.setProperty("opacity",displayObject.__worldAlpha == null?"null":"" + displayObject.__worldAlpha,null); else style.removeProperty("opacity");
	}
	if(setClip && displayObject.__worldClipChanged) {
		if(displayObject.__worldClip == null) style.removeProperty("clip"); else {
			var clip = displayObject.__worldClip.transform(displayObject.__worldTransform.clone().invert());
			style.setProperty("clip","rect(" + clip.y + "px, " + clip.get_right() + "px, " + clip.get_bottom() + "px, " + clip.x + "px)",null);
		}
	}
};
openfl__$internal_renderer_dom_DOMRenderer.initializeElement = function(displayObject,element,renderSession) {
	var style = displayObject.__style = element.style;
	style.setProperty("position","absolute",null);
	style.setProperty("top","0",null);
	style.setProperty("left","0",null);
	style.setProperty(renderSession.transformOriginProperty,"0 0 0",null);
	renderSession.element.appendChild(element);
	displayObject.__worldAlphaChanged = true;
	displayObject.__worldClipChanged = true;
	displayObject.__worldTransformChanged = true;
	displayObject.__worldVisibleChanged = true;
	displayObject.__worldZ = -1;
};
openfl__$internal_renderer_dom_DOMRenderer.__super__ = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_dom_DOMRenderer.prototype = $extend(openfl__$internal_renderer_AbstractRenderer.prototype,{
	render: function(stage) {
		this.element.style.background = stage.__colorString;
		this.renderSession.z = 1;
		stage.__renderDOM(this.renderSession);
	}
	,__class__: openfl__$internal_renderer_dom_DOMRenderer
});
var openfl__$internal_renderer_dom_DOMShape = function() { };
$hxClasses["openfl._internal.renderer.dom.DOMShape"] = openfl__$internal_renderer_dom_DOMShape;
openfl__$internal_renderer_dom_DOMShape.__name__ = true;
openfl__$internal_renderer_dom_DOMShape.render = function(shape,renderSession) {
	var graphics = shape.__graphics;
	if(shape.stage != null && shape.__worldVisible && shape.__renderable && graphics != null) {
		if(graphics.__dirty || shape.__worldAlphaChanged || shape.__canvas == null && graphics.__canvas != null) {
			openfl__$internal_renderer_canvas_CanvasGraphics.render(graphics,renderSession);
			if(graphics.__canvas != null) {
				if(shape.__canvas == null) {
					shape.__canvas = window.document.createElement("canvas");
					shape.__context = shape.__canvas.getContext("2d");
					openfl__$internal_renderer_dom_DOMRenderer.initializeElement(shape,shape.__canvas,renderSession);
				}
				shape.__canvas.width = graphics.__canvas.width;
				shape.__canvas.height = graphics.__canvas.height;
				shape.__context.globalAlpha = shape.__worldAlpha;
				shape.__context.drawImage(graphics.__canvas,0,0);
			} else if(shape.__canvas != null) {
				renderSession.element.removeChild(shape.__canvas);
				shape.__canvas = null;
				shape.__style = null;
			}
		}
		if(shape.__canvas != null) {
			if(shape.__worldTransformChanged || graphics.__transformDirty) {
				graphics.__transformDirty = false;
				var transform = new openfl_geom_Matrix();
				transform.translate(graphics.__bounds.x,graphics.__bounds.y);
				transform = transform.mult(shape.__worldTransform);
				shape.__style.setProperty(renderSession.transformProperty,renderSession.roundPixels?"matrix3d(" + transform.a + ", " + transform.b + ", " + "0, 0, " + transform.c + ", " + transform.d + ", " + "0, 0, 0, 0, 1, 0, " + (transform.tx | 0) + ", " + (transform.ty | 0) + ", 0, 1)":"matrix3d(" + transform.a + ", " + transform.b + ", " + "0, 0, " + transform.c + ", " + transform.d + ", " + "0, 0, 0, 0, 1, 0, " + transform.tx + ", " + transform.ty + ", 0, 1)",null);
			}
			openfl__$internal_renderer_dom_DOMRenderer.applyStyle(shape,renderSession,false,false,true);
		}
	} else if(shape.__canvas != null) {
		renderSession.element.removeChild(shape.__canvas);
		shape.__canvas = null;
		shape.__style = null;
	}
};
var openfl__$internal_renderer_dom_DOMTextField = function() { };
$hxClasses["openfl._internal.renderer.dom.DOMTextField"] = openfl__$internal_renderer_dom_DOMTextField;
openfl__$internal_renderer_dom_DOMTextField.__name__ = true;
openfl__$internal_renderer_dom_DOMTextField.render = function(textField,renderSession) {
	if(textField.stage != null && textField.__worldVisible && textField.__renderable) {
		if(textField.__dirty || textField.__div == null) {
			if(textField.__text != "" || textField.background || textField.border) {
				if(textField.__div == null) {
					textField.__div = window.document.createElement("div");
					openfl__$internal_renderer_dom_DOMRenderer.initializeElement(textField,textField.__div,renderSession);
					textField.__style.setProperty("cursor","inherit",null);
				}
				var style = textField.__style;
				textField.__div.innerHTML = textField.__text;
				if(textField.background) style.setProperty("background-color","#" + StringTools.hex(textField.backgroundColor,6),null); else style.removeProperty("background-color");
				if(textField.border) style.setProperty("border","solid 1px #" + StringTools.hex(textField.borderColor,6),null); else style.removeProperty("border");
				style.setProperty("font",textField.__getFont(textField.__textFormat),null);
				style.setProperty("color","#" + StringTools.hex(textField.__textFormat.color,6),null);
				if(textField.autoSize != openfl_text_TextFieldAutoSize.NONE) style.setProperty("width","auto",null); else style.setProperty("width",textField.__width + "px",null);
				style.setProperty("height",textField.__height + "px",null);
				var _g = textField.__textFormat.align;
				switch(_g[1]) {
				case 3:
					style.setProperty("text-align","center",null);
					break;
				case 1:
					style.setProperty("text-align","right",null);
					break;
				default:
					style.setProperty("text-align","left",null);
				}
				textField.__dirty = false;
			} else if(textField.__div != null) {
				renderSession.element.removeChild(textField.__div);
				textField.__div = null;
			}
		}
		if(textField.__div != null) openfl__$internal_renderer_dom_DOMRenderer.applyStyle(textField,renderSession,true,true,false);
	} else if(textField.__div != null) {
		renderSession.element.removeChild(textField.__div);
		textField.__div = null;
		textField.__style = null;
	}
};
var openfl__$internal_renderer_opengl_GLRenderer = function(width,height,gl,transparent,antialias,preserveDrawingBuffer) {
	if(preserveDrawingBuffer == null) preserveDrawingBuffer = false;
	if(antialias == null) antialias = false;
	if(transparent == null) transparent = false;
	if(height == null) height = 600;
	if(width == null) width = 800;
	this.vpHeight = 0;
	this.vpWidth = 0;
	this.vpY = 0;
	this.vpX = 0;
	openfl__$internal_renderer_AbstractRenderer.call(this,width,height);
	this.transparent = transparent;
	this.preserveDrawingBuffer = preserveDrawingBuffer;
	this.width = width;
	this.height = height;
	this.options = { alpha : transparent, antialias : antialias, premultipliedAlpha : transparent, stencil : true, preserveDrawingBuffer : preserveDrawingBuffer};
	this._glContextId = openfl__$internal_renderer_opengl_GLRenderer.glContextId++;
	this.gl = gl;
	this.defaultFramebuffer = null;
	openfl__$internal_renderer_opengl_GLRenderer.glContexts[this._glContextId] = gl;
	if(openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL == null) {
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL = new haxe_ds_EnumValueMap();
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.NORMAL,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.ADD,[gl.SRC_ALPHA,gl.DST_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.MULTIPLY,[gl.DST_COLOR,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.SCREEN,[gl.SRC_ALPHA,gl.ONE]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.ALPHA,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.DARKEN,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.DIFFERENCE,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.ERASE,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.HARDLIGHT,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.INVERT,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.LAYER,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.LIGHTEN,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.OVERLAY,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.set(openfl_display_BlendMode.SUBTRACT,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
	}
	this.projectionMatrix = new openfl_geom_Matrix();
	this.projection = new openfl_geom_Point();
	this.projection.x = this.width / 2;
	this.projection.y = -this.height / 2;
	this.offset = new openfl_geom_Point(0,0);
	this.resize(this.width,this.height);
	this.contextLost = false;
	this.shaderManager = new openfl__$internal_renderer_opengl_utils_ShaderManager(gl);
	this.spriteBatch = new openfl__$internal_renderer_opengl_utils_SpriteBatch(gl);
	this.filterManager = new openfl__$internal_renderer_opengl_utils_FilterManager(gl,this.transparent);
	this.stencilManager = new openfl__$internal_renderer_opengl_utils_StencilManager(gl);
	this.blendModeManager = new openfl__$internal_renderer_opengl_utils_BlendModeManager(gl);
	this.renderSession = new openfl__$internal_renderer_RenderSession();
	this.renderSession.gl = this.gl;
	this.renderSession.drawCount = 0;
	this.renderSession.shaderManager = this.shaderManager;
	this.renderSession.maskManager = this.maskManager;
	this.renderSession.filterManager = this.filterManager;
	this.renderSession.blendModeManager = this.blendModeManager;
	this.renderSession.spriteBatch = this.spriteBatch;
	this.renderSession.stencilManager = this.stencilManager;
	this.renderSession.renderer = this;
	this.renderSession.defaultFramebuffer = this.defaultFramebuffer;
	this.renderSession.projectionMatrix = this.projectionMatrix;
	this.maskManager = new openfl__$internal_renderer_opengl_utils_GLMaskManager(this.renderSession);
	this.renderSession.maskManager = this.maskManager;
	this.shaderManager.setShader(this.shaderManager.defaultShader);
	gl.disable(gl.DEPTH_TEST);
	gl.disable(gl.CULL_FACE);
	gl.enable(gl.BLEND);
	gl.colorMask(true,true,true,this.transparent);
};
$hxClasses["openfl._internal.renderer.opengl.GLRenderer"] = openfl__$internal_renderer_opengl_GLRenderer;
openfl__$internal_renderer_opengl_GLRenderer.__name__ = true;
openfl__$internal_renderer_opengl_GLRenderer.__super__ = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_opengl_GLRenderer.prototype = $extend(openfl__$internal_renderer_AbstractRenderer.prototype,{
	setViewport: function(x,y,width,height) {
		if(!(this.vpX == x && this.vpY == y && this.vpWidth == width && this.vpHeight == height)) {
			this.vpX = x;
			this.vpY = y;
			this.vpWidth = width;
			this.vpHeight = height;
			this.gl.viewport(x,y,width,height);
			this.setOrtho(x,y,width,height);
		}
	}
	,setOrtho: function(x,y,width,height) {
		var o = this.projectionMatrix;
		o.identity();
		o.a = 1 / width * 2;
		o.d = -1 / height * 2;
		o.tx = -1 - x * o.a;
		o.ty = 1 - y * o.d;
	}
	,render: function(stage) {
		if(this.contextLost) return;
		var gl = this.gl;
		this.setViewport(0,0,this.width,this.height);
		gl.bindFramebuffer(gl.FRAMEBUFFER,this.defaultFramebuffer);
		if(this.transparent) gl.clearColor(0,0,0,0); else gl.clearColor(stage.__colorSplit[0],stage.__colorSplit[1],stage.__colorSplit[2],1);
		gl.clear(gl.COLOR_BUFFER_BIT);
		this.renderDisplayObject(stage,this.projection);
	}
	,renderDisplayObject: function(displayObject,projection,buffer) {
		this.renderSession.blendModeManager.setBlendMode(openfl_display_BlendMode.NORMAL);
		this.renderSession.drawCount = 0;
		this.renderSession.currentBlendMode = null;
		this.spriteBatch.begin(this.renderSession);
		this.filterManager.begin(this.renderSession,buffer);
		displayObject.__renderGL(this.renderSession);
		this.spriteBatch.finish();
	}
	,resize: function(width,height) {
		this.width = width;
		this.height = height;
		openfl__$internal_renderer_AbstractRenderer.prototype.resize.call(this,width,height);
		this.setViewport(0,0,width,height);
		this.projection.x = width / 2;
		this.projection.y = -height / 2;
	}
	,__class__: openfl__$internal_renderer_opengl_GLRenderer
});
var openfl__$internal_renderer_opengl_GLTextField = function() { };
$hxClasses["openfl._internal.renderer.opengl.GLTextField"] = openfl__$internal_renderer_opengl_GLTextField;
openfl__$internal_renderer_opengl_GLTextField.__name__ = true;
openfl__$internal_renderer_opengl_GLTextField.render = function(textField,renderSession) {
	if(!textField.__renderable || textField.__worldAlpha <= 0) return;
	openfl__$internal_renderer_TextFieldGraphics.render(textField);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.render(textField,renderSession);
};
var openfl__$internal_renderer_opengl_shaders2_Shader = function(gl) {
	this.uniforms = new haxe_ds_StringMap();
	this.attributes = new haxe_ds_StringMap();
	this.ID = openfl__$internal_renderer_opengl_shaders2_Shader.UID++;
	this.gl = gl;
	this.program = null;
};
$hxClasses["openfl._internal.renderer.opengl.shaders2.Shader"] = openfl__$internal_renderer_opengl_shaders2_Shader;
openfl__$internal_renderer_opengl_shaders2_Shader.__name__ = true;
openfl__$internal_renderer_opengl_shaders2_Shader.compileProgram = function(gl,vertexSrc,fragmentSrc) {
	var vertexShader = openfl__$internal_renderer_opengl_shaders2_Shader.compileShader(gl,vertexSrc,gl.VERTEX_SHADER);
	var fragmentShader = openfl__$internal_renderer_opengl_shaders2_Shader.compileShader(gl,fragmentSrc,gl.FRAGMENT_SHADER);
	var program = gl.createProgram();
	if(vertexShader != null && fragmentShader != null) {
		gl.attachShader(program,vertexShader);
		gl.attachShader(program,fragmentShader);
		gl.linkProgram(program);
		if(gl.getProgramParameter(program,gl.LINK_STATUS) == 0) console.log("Could not initialize shaders");
	}
	return program;
};
openfl__$internal_renderer_opengl_shaders2_Shader.compileShader = function(gl,shaderSrc,type) {
	var src = shaderSrc.join("\n");
	var shader = gl.createShader(type);
	gl.shaderSource(shader,src);
	gl.compileShader(shader);
	if(gl.getShaderParameter(shader,gl.COMPILE_STATUS) == 0) {
		console.log(gl.getShaderInfoLog(shader));
		return null;
	}
	return shader;
};
openfl__$internal_renderer_opengl_shaders2_Shader.prototype = {
	init: function() {
		this.program = openfl__$internal_renderer_opengl_shaders2_Shader.compileProgram(this.gl,this.vertexSrc,this.fragmentSrc);
		this.gl.useProgram(this.program);
	}
	,getAttribLocation: function(attribute) {
		if(this.program == null) throw new js__$Boot_HaxeError("Shader isn't initialized");
		if(this.attributes.exists(attribute)) return this.attributes.get(attribute); else {
			var location = this.gl.getAttribLocation(this.program,attribute);
			this.attributes.set(attribute,location);
			return location;
		}
	}
	,getUniformLocation: function(uniform) {
		if(this.program == null) throw new js__$Boot_HaxeError("Shader isn't initialized");
		if(this.uniforms.exists(uniform)) return this.uniforms.get(uniform); else {
			var location = this.gl.getUniformLocation(this.program,uniform);
			this.uniforms.set(uniform,location);
			return location;
		}
	}
	,enableVertexAttribute: function(attribute,stride,offset) {
		var location = this.getAttribLocation(attribute.name);
		this.gl.enableVertexAttribArray(location);
		this.gl.vertexAttribPointer(location,attribute.components,attribute.type,attribute.normalized,stride,offset * 4);
	}
	,disableVertexAttribute: function(attribute,setDefault) {
		if(setDefault == null) setDefault = true;
		var location = this.getAttribLocation(attribute.name);
		this.gl.disableVertexAttribArray(location);
		if(setDefault) {
			var _g = attribute.components;
			switch(_g) {
			case 1:
				this.gl.vertexAttrib1fv(location,attribute.defaultValue.subarray(0,1));
				break;
			case 2:
				this.gl.vertexAttrib2fv(location,attribute.defaultValue.subarray(0,2));
				break;
			case 3:
				this.gl.vertexAttrib3fv(location,attribute.defaultValue.subarray(0,3));
				break;
			default:
				this.gl.vertexAttrib4fv(location,attribute.defaultValue.subarray(0,4));
			}
		}
	}
	,bindVertexArray: function(va) {
		var offset = 0;
		var stride = va.get_stride();
		var _g = 0;
		var _g1 = va.attributes;
		while(_g < _g1.length) {
			var attribute = _g1[_g];
			++_g;
			if(attribute.enabled) {
				this.enableVertexAttribute(attribute,stride,offset);
				offset += Math.floor(attribute.components * attribute.getElementsBytes() / 4);
			} else this.disableVertexAttribute(attribute,true);
		}
	}
	,__class__: openfl__$internal_renderer_opengl_shaders2_Shader
};
var openfl__$internal_renderer_opengl_shaders2_DefaultShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders2_Shader.call(this,gl);
	this.vertexSrc = ["attribute vec2 " + "aPosition" + ";","attribute vec2 " + "aTexCoord0" + ";","attribute vec4 " + "aColor" + ";","uniform mat3 " + "uProjectionMatrix" + ";","varying vec2 vTexCoord;","varying vec4 vColor;","void main(void) {","   gl_Position = vec4((" + "uProjectionMatrix" + " * vec3(" + "aPosition" + ", 1.0)).xy, 0.0, 1.0);","   vTexCoord = " + "aTexCoord0" + ";","   vColor = " + "aColor" + ";","}"];
	this.fragmentSrc = ["#ifdef GL_ES","precision lowp float;","#endif","uniform sampler2D " + "uSampler0" + ";","uniform vec4 " + "uColorMultiplier" + ";","uniform vec4 " + "uColorOffset" + ";","varying vec2 vTexCoord;","varying vec4 vColor;","vec4 colorTransform(const vec4 color, const vec4 tint, const vec4 multiplier, const vec4 offset) {","   vec4 unmultiply = vec4(color.rgb / color.a, color.a);","   vec4 result = unmultiply * tint * multiplier;","   result = result + offset;","   result = clamp(result, 0., 1.);","   result = vec4(result.rgb * result.a, result.a);","   return result;","}","void main(void) {","   vec4 tc = texture2D(" + "uSampler0" + ", vTexCoord);","   gl_FragColor = colorTransform(tc, vColor, " + "uColorMultiplier" + ", " + "uColorOffset" + ");","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders2.DefaultShader"] = openfl__$internal_renderer_opengl_shaders2_DefaultShader;
openfl__$internal_renderer_opengl_shaders2_DefaultShader.__name__ = true;
openfl__$internal_renderer_opengl_shaders2_DefaultShader.__super__ = openfl__$internal_renderer_opengl_shaders2_Shader;
openfl__$internal_renderer_opengl_shaders2_DefaultShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders2_Shader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders2_Shader.prototype.init.call(this);
		this.getAttribLocation("aPosition");
		this.getAttribLocation("aTexCoord0");
		this.getAttribLocation("aColor");
		this.getUniformLocation("uProjectionMatrix");
		this.getUniformLocation("uSampler0");
		this.getUniformLocation("uColorMultiplier");
		this.getUniformLocation("uColorOffset");
	}
	,__class__: openfl__$internal_renderer_opengl_shaders2_DefaultShader
});
var openfl__$internal_renderer_opengl_shaders2_DrawTrianglesShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders2_Shader.call(this,gl);
	this.vertexSrc = ["attribute vec2 " + "aPosition" + ";","attribute vec2 " + "aTexCoord0" + ";","attribute vec4 " + "aColor" + ";","uniform mat3 " + "uProjectionMatrix" + ";","varying vec2 vTexCoord;","varying vec4 vColor;","void main(void) {","   gl_Position = vec4((" + "uProjectionMatrix" + " * vec3(" + "aPosition" + ", 1.0)).xy, 0.0, 1.0);","   vTexCoord = " + "aTexCoord0" + ";","   vColor = " + "aColor" + ".bgra;","}"];
	this.fragmentSrc = ["#ifdef GL_ES","precision lowp float;","#endif","uniform sampler2D " + "uSampler0" + ";","uniform vec3 " + "uColor" + ";","uniform bool " + "uUseTexture" + ";","uniform float " + "uAlpha" + ";","uniform vec4 " + "uColorMultiplier" + ";","uniform vec4 " + "uColorOffset" + ";","varying vec2 vTexCoord;","varying vec4 vColor;","vec4 tmp;","vec4 colorTransform(const vec4 color, const vec4 tint, const vec4 multiplier, const vec4 offset) {","   vec4 unmultiply = vec4(color.rgb / color.a, color.a);","   vec4 result = unmultiply * tint * multiplier;","   result = result + offset;","   result = clamp(result, 0., 1.);","   result = vec4(result.rgb * result.a, result.a);","   return result;","}","void main(void) {","   if(" + "uUseTexture" + ") {","       tmp = texture2D(" + "uSampler0" + ", vTexCoord);","   } else {","       tmp = vec4(" + "uColor" + ", 1.);","   }","   gl_FragColor = colorTransform(tmp, vColor, " + "uColorMultiplier" + ", " + "uColorOffset" + ");","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders2.DrawTrianglesShader"] = openfl__$internal_renderer_opengl_shaders2_DrawTrianglesShader;
openfl__$internal_renderer_opengl_shaders2_DrawTrianglesShader.__name__ = true;
openfl__$internal_renderer_opengl_shaders2_DrawTrianglesShader.__super__ = openfl__$internal_renderer_opengl_shaders2_Shader;
openfl__$internal_renderer_opengl_shaders2_DrawTrianglesShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders2_Shader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders2_Shader.prototype.init.call(this);
		this.getAttribLocation("aPosition");
		this.getAttribLocation("aTexCoord0");
		this.getAttribLocation("aColor");
		this.getUniformLocation("uSampler0");
		this.getUniformLocation("uProjectionMatrix");
		this.getUniformLocation("uColor");
		this.getUniformLocation("uAlpha");
		this.getUniformLocation("uUseTexture");
		this.getUniformLocation("uColorMultiplier");
		this.getUniformLocation("uColorOffset");
	}
	,__class__: openfl__$internal_renderer_opengl_shaders2_DrawTrianglesShader
});
var openfl__$internal_renderer_opengl_shaders2_FillShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders2_Shader.call(this,gl);
	this.vertexSrc = ["attribute vec2 " + "aPosition" + ";","uniform mat3 " + "uTranslationMatrix" + ";","uniform mat3 " + "uProjectionMatrix" + ";","uniform vec4 " + "uColor" + ";","uniform float " + "uAlpha" + ";","uniform vec4 " + "uColorMultiplier" + ";","uniform vec4 " + "uColorOffset" + ";","varying vec4 vColor;","vec4 colorTransform(const vec4 color, const float alpha, const vec4 multiplier, const vec4 offset) {","   vec4 result = color * multiplier;","   result.a *= alpha;","   result = result + offset;","   result = clamp(result, 0., 1.);","   result = vec4(result.rgb * result.a, result.a);","   return result;","}","void main(void) {","   gl_Position = vec4((" + "uProjectionMatrix" + " * " + "uTranslationMatrix" + " * vec3(" + "aPosition" + ", 1.0)).xy, 0.0, 1.0);","   vColor = colorTransform(" + "uColor" + ", " + "uAlpha" + ", " + "uColorMultiplier" + ", " + "uColorOffset" + ");","}"];
	this.fragmentSrc = ["#ifdef GL_ES","precision lowp float;","#endif","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders2.FillShader"] = openfl__$internal_renderer_opengl_shaders2_FillShader;
openfl__$internal_renderer_opengl_shaders2_FillShader.__name__ = true;
openfl__$internal_renderer_opengl_shaders2_FillShader.__super__ = openfl__$internal_renderer_opengl_shaders2_Shader;
openfl__$internal_renderer_opengl_shaders2_FillShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders2_Shader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders2_Shader.prototype.init.call(this);
		this.getAttribLocation("aPosition");
		this.getUniformLocation("uTranslationMatrix");
		this.getUniformLocation("uProjectionMatrix");
		this.getUniformLocation("uColor");
		this.getUniformLocation("uColorMultiplier");
		this.getUniformLocation("uColorOffset");
	}
	,__class__: openfl__$internal_renderer_opengl_shaders2_FillShader
});
var openfl__$internal_renderer_opengl_shaders2_PatternFillShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders2_Shader.call(this,gl);
	this.vertexSrc = ["attribute vec2 " + "aPosition" + ";","uniform mat3 " + "uTranslationMatrix" + ";","uniform mat3 " + "uProjectionMatrix" + ";","uniform mat3 " + "uPatternMatrix" + ";","varying vec2 vPosition;","void main(void) {","   gl_Position = vec4((" + "uProjectionMatrix" + " * " + "uTranslationMatrix" + " * vec3(" + "aPosition" + ", 1.0)).xy, 0.0, 1.0);","   vPosition = (" + "uPatternMatrix" + " * vec3(" + "aPosition" + ", 1)).xy;","}"];
	this.fragmentSrc = ["#ifdef GL_ES","precision lowp float;","#endif","uniform float " + "uAlpha" + ";","uniform vec2 " + "uPatternTL" + ";","uniform vec2 " + "uPatternBR" + ";","uniform sampler2D " + "uSampler0" + ";","uniform vec4 " + "uColorMultiplier" + ";","uniform vec4 " + "uColorOffset" + ";","varying vec2 vPosition;","vec4 colorTransform(const vec4 color, const float alpha, const vec4 multiplier, const vec4 offset) {","   vec4 unmultiply = vec4(color.rgb / color.a, color.a);","   vec4 result = unmultiply * multiplier;","   result.a *= alpha;","   result = result + offset;","   result = clamp(result, 0., 1.);","   result = vec4(result.rgb * result.a, result.a);","   return result;","}","void main(void) {","   vec2 pos = mix(" + "uPatternTL" + ", " + "uPatternBR" + ", vPosition);","   vec4 tcol = texture2D(" + "uSampler0" + ", pos);","   gl_FragColor = colorTransform(tcol, " + "uAlpha" + ", " + "uColorMultiplier" + ", " + "uColorOffset" + ");","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders2.PatternFillShader"] = openfl__$internal_renderer_opengl_shaders2_PatternFillShader;
openfl__$internal_renderer_opengl_shaders2_PatternFillShader.__name__ = true;
openfl__$internal_renderer_opengl_shaders2_PatternFillShader.__super__ = openfl__$internal_renderer_opengl_shaders2_Shader;
openfl__$internal_renderer_opengl_shaders2_PatternFillShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders2_Shader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders2_Shader.prototype.init.call(this);
		this.getAttribLocation("aPosition");
		this.getUniformLocation("uTranslationMatrix");
		this.getUniformLocation("uPatternMatrix");
		this.getUniformLocation("uProjectionMatrix");
		this.getUniformLocation("uSampler0");
		this.getUniformLocation("uPatternTL");
		this.getUniformLocation("uPatternBR");
		this.getUniformLocation("uAlpha");
		this.getUniformLocation("uColorMultiplier");
		this.getUniformLocation("uColorOffset");
	}
	,__class__: openfl__$internal_renderer_opengl_shaders2_PatternFillShader
});
var openfl__$internal_renderer_opengl_shaders2_PrimitiveShader = function(gl) {
	openfl__$internal_renderer_opengl_shaders2_Shader.call(this,gl);
	this.vertexSrc = ["attribute vec2 " + "aPosition" + ";","attribute vec4 " + "aColor" + ";","uniform mat3 " + "uTranslationMatrix" + ";","uniform mat3 " + "uProjectionMatrix" + ";","uniform vec4 " + "uColorMultiplier" + ";","uniform vec4 " + "uColorOffset" + ";","uniform float " + "uAlpha" + ";","varying vec4 vColor;","vec4 colorTransform(const vec4 color, const float alpha, const vec4 multiplier, const vec4 offset) {","   vec4 result = color * multiplier;","   result.a *= alpha;","   result = result + offset;","   result = clamp(result, 0., 1.);","   result = vec4(result.rgb * result.a, result.a);","   return result;","}","void main(void) {","   gl_Position = vec4((" + "uProjectionMatrix" + " * " + "uTranslationMatrix" + " * vec3(" + "aPosition" + ", 1.0)).xy, 0.0, 1.0);","   vColor = colorTransform(" + "aColor" + ", " + "uAlpha" + ", " + "uColorMultiplier" + ", " + "uColorOffset" + ");","}"];
	this.fragmentSrc = ["#ifdef GL_ES","precision lowp float;","#endif","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders2.PrimitiveShader"] = openfl__$internal_renderer_opengl_shaders2_PrimitiveShader;
openfl__$internal_renderer_opengl_shaders2_PrimitiveShader.__name__ = true;
openfl__$internal_renderer_opengl_shaders2_PrimitiveShader.__super__ = openfl__$internal_renderer_opengl_shaders2_Shader;
openfl__$internal_renderer_opengl_shaders2_PrimitiveShader.prototype = $extend(openfl__$internal_renderer_opengl_shaders2_Shader.prototype,{
	init: function() {
		openfl__$internal_renderer_opengl_shaders2_Shader.prototype.init.call(this);
		this.getAttribLocation("aPosition");
		this.getAttribLocation("aColor");
		this.getUniformLocation("uTranslationMatrix");
		this.getUniformLocation("uProjectionMatrix");
		this.getUniformLocation("uAlpha");
		this.getUniformLocation("uColorMultiplier");
		this.getUniformLocation("uColorOffset");
	}
	,__class__: openfl__$internal_renderer_opengl_shaders2_PrimitiveShader
});
var openfl__$internal_renderer_opengl_utils_BlendModeManager = function(gl) {
	this.gl = gl;
	this.currentBlendMode = null;
};
$hxClasses["openfl._internal.renderer.opengl.utils.BlendModeManager"] = openfl__$internal_renderer_opengl_utils_BlendModeManager;
openfl__$internal_renderer_opengl_utils_BlendModeManager.__name__ = true;
openfl__$internal_renderer_opengl_utils_BlendModeManager.prototype = {
	setBlendMode: function(blendMode,force) {
		if(force == null) force = false;
		if(blendMode == null) {
			blendMode = openfl_display_BlendMode.NORMAL;
			force = true;
		}
		if(!force && this.currentBlendMode == blendMode) return false;
		this.currentBlendMode = blendMode;
		var blendModeWebGL = openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL.get(this.currentBlendMode);
		this.gl.blendFunc(blendModeWebGL[0],blendModeWebGL[1]);
		return true;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_BlendModeManager
};
var openfl__$internal_renderer_opengl_utils_DrawPath = function() {
	this.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
	this.points = [];
	this.winding = 0;
	this.isRemovable = true;
	this.fillIndex = 0;
	this.line = new openfl__$internal_renderer_opengl_utils_LineStyle();
	this.fill = openfl__$internal_renderer_opengl_utils_FillType.None;
};
$hxClasses["openfl._internal.renderer.opengl.utils.DrawPath"] = openfl__$internal_renderer_opengl_utils_DrawPath;
openfl__$internal_renderer_opengl_utils_DrawPath.__name__ = true;
openfl__$internal_renderer_opengl_utils_DrawPath.getStack = function(graphics,gl) {
	return openfl__$internal_renderer_opengl_utils_PathBuiler.build(graphics,gl);
};
openfl__$internal_renderer_opengl_utils_DrawPath.prototype = {
	update: function(line,fill,fillIndex,winding) {
		this.updateLine(line);
		this.fill = fill;
		this.fillIndex = fillIndex;
		this.winding = winding;
	}
	,updateLine: function(line) {
		this.line.width = line.width;
		this.line.color = line.color;
		if(line.alpha == null) this.line.alpha = 1; else this.line.alpha = line.alpha;
		if(line.scaleMode == null) this.line.scaleMode = openfl_display_LineScaleMode.NORMAL; else this.line.scaleMode = line.scaleMode;
		if(line.caps == null) this.line.caps = openfl_display_CapsStyle.ROUND; else this.line.caps = line.caps;
		if(line.joints == null) this.line.joints = openfl_display_JointStyle.ROUND; else this.line.joints = line.joints;
		this.line.miterLimit = line.miterLimit;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_DrawPath
};
var openfl__$internal_renderer_opengl_utils_PathBuiler = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.PathBuiler"] = openfl__$internal_renderer_opengl_utils_PathBuiler;
openfl__$internal_renderer_opengl_utils_PathBuiler.__name__ = true;
openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = null;
openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths = null;
openfl__$internal_renderer_opengl_utils_PathBuiler.__line = null;
openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = null;
openfl__$internal_renderer_opengl_utils_PathBuiler.closePath = function() {
	var l = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length;
	if(l <= 0) return;
	if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type == openfl__$internal_renderer_opengl_utils_GraphicType.Polygon && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.fill != openfl__$internal_renderer_opengl_utils_FillType.None) {
		var sx = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points[0];
		var sy = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points[1];
		var ex = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points[l - 2];
		var ey = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points[l - 1];
		if(!(sx == ex && sy == ey)) {
			openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(sx);
			openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(sy);
		}
	}
};
openfl__$internal_renderer_opengl_utils_PathBuiler.endFill = function() {
	openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.None;
	openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex++;
};
openfl__$internal_renderer_opengl_utils_PathBuiler.curveTo = function(cx,cy,x,y) {
	if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) {
		if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(0);
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(0);
		openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
	}
	var xa = 0;
	var ya = 0;
	var n = 20;
	var points = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points;
	var fromX = points[points.length - 2];
	var fromY = points[points.length - 1];
	var px = 0;
	var py = 0;
	var tmp = 0;
	var _g1 = 1;
	var _g = n + 1;
	while(_g1 < _g) {
		var i = _g1++;
		tmp = i / n;
		xa = fromX + (cx - fromX) * tmp;
		ya = fromY + (cy - fromY) * tmp;
		px = xa + (cx + (x - cx) * tmp - xa) * tmp;
		py = ya + (cy + (y - cy) * tmp - ya) * tmp;
		points.push(px);
		points.push(py);
	}
};
openfl__$internal_renderer_opengl_utils_PathBuiler.cubicCurveTo = function(cx,cy,cx2,cy2,x,y) {
	if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) {
		if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(0);
		openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(0);
		openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
	}
	var n = 20;
	var dt = 0;
	var dt2 = 0;
	var dt3 = 0;
	var t2 = 0;
	var t3 = 0;
	var points = openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points;
	var fromX = points[points.length - 2];
	var fromY = points[points.length - 1];
	var px = 0;
	var py = 0;
	var tmp = 0;
	var _g1 = 1;
	var _g = n + 1;
	while(_g1 < _g) {
		var i = _g1++;
		tmp = i / n;
		dt = 1 - tmp;
		dt2 = dt * dt;
		dt3 = dt2 * dt;
		t2 = tmp * tmp;
		t3 = t2 * tmp;
		px = dt3 * fromX + 3 * dt2 * tmp * cx + 3 * dt * t2 * cx2 + t3 * x;
		py = dt3 * fromY + 3 * dt2 * tmp * cy + 3 * dt * t2 * cy2 + t3 * y;
		points.push(px);
		points.push(py);
	}
};
openfl__$internal_renderer_opengl_utils_PathBuiler.build = function(graphics,gl) {
	var glStack = null;
	var bounds = graphics.__bounds;
	openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths = [];
	openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
	openfl__$internal_renderer_opengl_utils_PathBuiler.__line = new openfl__$internal_renderer_opengl_utils_LineStyle();
	openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.None;
	openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex = 0;
	glStack = graphics.__glStack[openfl__$internal_renderer_opengl_GLRenderer.glContextId];
	if(glStack == null) glStack = graphics.__glStack[openfl__$internal_renderer_opengl_GLRenderer.glContextId] = new openfl__$internal_renderer_opengl_utils_GLStack(gl);
	if(!graphics.__visible || graphics.__commands.length == 0 || bounds == null || bounds.width == 0 || bounds.height == 0) {
	} else {
		var _g = 0;
		var _g1 = graphics.__commands;
		while(_g < _g1.length) {
			var command = _g1[_g];
			++_g;
			switch(command[1]) {
			case 0:
				var smooth = command[5];
				var repeat = command[4];
				var matrix = command[3];
				var bitmap = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.endFill();
				if(bitmap != null) openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.Texture(bitmap,matrix,repeat,smooth); else openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.None;
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) {
					if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [];
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
					openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				}
				break;
			case 1:
				var alpha = command[3];
				var rgb = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.endFill();
				if(alpha > 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.Color(rgb & 16777215,alpha); else openfl__$internal_renderer_opengl_utils_PathBuiler.__fill = openfl__$internal_renderer_opengl_utils_FillType.None;
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) {
					if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [];
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
					openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				}
				break;
			case 3:
				var y = command[7];
				var x = command[6];
				var cy2 = command[5];
				var cx2 = command[4];
				var cy = command[3];
				var cx = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.cubicCurveTo(cx,cy,cx2,cy2,x,y);
				break;
			case 4:
				var y1 = command[5];
				var x1 = command[4];
				var cy1 = command[3];
				var cx1 = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.curveTo(cx1,cy1,x1,y1);
				break;
			case 5:
				var radius = command[4];
				var y2 = command[3];
				var x2 = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Circle;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [x2,y2,radius];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 6:
				var height = command[5];
				var width = command[4];
				var y3 = command[3];
				var x3 = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [x3,y3,width,height];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 7:
				var height1 = command[5];
				var width1 = command[4];
				var y4 = command[3];
				var x4 = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Rectangle(false);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [x4,y4,width1,height1];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 8:
				var ry = command[7];
				var rx = command[6];
				var height2 = command[5];
				var width2 = command[4];
				var y5 = command[3];
				var x5 = command[2];
				if(ry == -1) ry = rx;
				rx *= 0.5;
				ry *= 0.5;
				if(rx > width2 / 2) rx = width2 / 2;
				if(ry > height2 / 2) ry = height2 / 2;
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Rectangle(true);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [x5,y5,width2,height2,rx,ry];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 11:
				openfl__$internal_renderer_opengl_utils_PathBuiler.endFill();
				break;
			case 12:
				var miterLimit = command[9];
				var joints = command[8];
				var caps = command[7];
				var scaleMode = command[6];
				var pixelHinting = command[5];
				var alpha1 = command[4];
				var color = command[3];
				var thickness = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line = new openfl__$internal_renderer_opengl_utils_LineStyle();
				if(thickness == null || isNaN(thickness) || thickness < 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__line.width = 0; else if(thickness == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__line.width = 1; else openfl__$internal_renderer_opengl_utils_PathBuiler.__line.width = thickness;
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				if(color == null) openfl__$internal_renderer_opengl_utils_PathBuiler.__line.color = 0; else openfl__$internal_renderer_opengl_utils_PathBuiler.__line.color = color;
				if(alpha1 == null) openfl__$internal_renderer_opengl_utils_PathBuiler.__line.alpha = 1; else openfl__$internal_renderer_opengl_utils_PathBuiler.__line.alpha = alpha1;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line.scaleMode = scaleMode;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line.caps = caps;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line.joints = joints;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__line.miterLimit = miterLimit;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points = [];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 13:
				var y6 = command[3];
				var x6 = command[2];
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(x6);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(y6);
				break;
			case 14:
				var y7 = command[3];
				var x7 = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(x7);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(y7);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 10:
				var blendMode = command[7];
				var colors = command[6];
				var culling = command[5];
				var uvtData = command[4];
				var indices = command[3];
				var vertices = command[2];
				var isColor;
				{
					var _g2 = openfl__$internal_renderer_opengl_utils_PathBuiler.__fill;
					switch(_g2[1]) {
					case 1:
						isColor = true;
						break;
					default:
						isColor = false;
					}
				}
				if(isColor && uvtData != null) continue;
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				if(uvtData == null) {
					var this1;
					this1 = new openfl_VectorData();
					var this2;
					this2 = new Array(0);
					this1.data = this2;
					this1.length = 0;
					this1.fixed = false;
					uvtData = this1;
					{
						var _g21 = openfl__$internal_renderer_opengl_utils_PathBuiler.__fill;
						switch(_g21[1]) {
						case 2:
							var b = _g21[2];
							var _g4 = 0;
							var _g3 = vertices.length / 2 | 0;
							while(_g4 < _g3) {
								var i = _g4++;
								if(!uvtData.fixed) {
									uvtData.length++;
									if(uvtData.data.length < uvtData.length) {
										var data;
										var this3;
										this3 = new Array(uvtData.data.length + 10);
										data = this3;
										haxe_ds__$Vector_Vector_$Impl_$.blit(uvtData.data,0,data,0,uvtData.data.length);
										uvtData.data = data;
									}
									uvtData.data[uvtData.length - 1] = vertices.data[i * 2] / b.width;
								}
								uvtData.length;
								if(!uvtData.fixed) {
									uvtData.length++;
									if(uvtData.data.length < uvtData.length) {
										var data1;
										var this4;
										this4 = new Array(uvtData.data.length + 10);
										data1 = this4;
										haxe_ds__$Vector_Vector_$Impl_$.blit(uvtData.data,0,data1,0,uvtData.data.length);
										uvtData.data = data1;
									}
									uvtData.data[uvtData.length - 1] = vertices.data[i * 2 + 1] / b.height;
								}
								uvtData.length;
							}
							break;
						default:
						}
					}
				}
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.DrawTriangles(vertices,indices,uvtData,culling,colors,blendMode);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable = false;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 9:
				var count = command[6];
				var flags = command[5];
				var smooth1 = command[4];
				var tileData = command[3];
				var sheet = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex++;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.DrawTiles(sheet,tileData,smooth1,flags,count);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable = false;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			case 15:
				var winding = command[4];
				var data2 = command[3];
				var commands = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				switch(winding) {
				case openfl_display_GraphicsPathWinding.EVEN_ODD:
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding = 0;
					break;
				case openfl_display_GraphicsPathWinding.NON_ZERO:
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding = 1;
					break;
				default:
					openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding = 0;
				}
				var command1;
				var cx3;
				var cy3;
				var cx21;
				var cy21;
				var ax;
				var ay;
				var idx = 0;
				var _g31 = 0;
				var _g22 = commands.length;
				while(_g31 < _g22) {
					var i1 = _g31++;
					command1 = commands.data[i1];
					switch(command1) {
					case 1:
						ax = data2.data[idx];
						ay = data2.data[idx + 1];
						idx += 2;
						if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(ax);
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(ay);
						openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
						break;
					case 4:
						ax = data2.data[idx + 2];
						ay = data2.data[idx + 3];
						idx += 4;
						if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(ax);
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(ay);
						openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
						break;
					case 2:
						ax = data2.data[idx];
						ay = data2.data[idx + 1];
						idx += 2;
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(ax);
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(ay);
						break;
					case 5:
						ax = data2.data[idx + 2];
						ay = data2.data[idx + 3];
						idx += 4;
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(ax);
						openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.push(ay);
						break;
					case 3:
						cx3 = data2.data[idx];
						cy3 = data2.data[idx + 1];
						ax = data2.data[idx + 2];
						ay = data2.data[idx + 3];
						idx += 4;
						openfl__$internal_renderer_opengl_utils_PathBuiler.curveTo(cx3,cy3,ax,ay);
						break;
					case 6:
						cx3 = data2.data[idx];
						cy3 = data2.data[idx + 1];
						cx21 = data2.data[idx + 2];
						cy21 = data2.data[idx + 3];
						ax = data2.data[idx + 4];
						ay = data2.data[idx + 5];
						idx += 6;
						openfl__$internal_renderer_opengl_utils_PathBuiler.cubicCurveTo(cx3,cy3,cx21,cy21,ax,ay);
						break;
					default:
					}
				}
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding = 0;
				break;
			case 16:
				var m = command[2];
				if(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable && openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.points.length == 0) openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.pop(); else openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath = new openfl__$internal_renderer_opengl_utils_DrawPath();
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.update(openfl__$internal_renderer_opengl_utils_PathBuiler.__line,openfl__$internal_renderer_opengl_utils_PathBuiler.__fill,openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex,openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.type = openfl__$internal_renderer_opengl_utils_GraphicType.OverrideMatrix(m);
				openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath.isRemovable = false;
				openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths.push(openfl__$internal_renderer_opengl_utils_PathBuiler.__currentPath);
				break;
			default:
			}
		}
		openfl__$internal_renderer_opengl_utils_PathBuiler.closePath();
	}
	graphics.__drawPaths = openfl__$internal_renderer_opengl_utils_PathBuiler.__drawPaths;
	return glStack;
};
var openfl__$internal_renderer_opengl_utils_LineStyle = function() {
	this.width = 0;
	this.color = 0;
	this.alpha = 1;
	this.scaleMode = openfl_display_LineScaleMode.NORMAL;
	this.caps = openfl_display_CapsStyle.ROUND;
	this.joints = openfl_display_JointStyle.ROUND;
	this.miterLimit = 3;
};
$hxClasses["openfl._internal.renderer.opengl.utils.LineStyle"] = openfl__$internal_renderer_opengl_utils_LineStyle;
openfl__$internal_renderer_opengl_utils_LineStyle.__name__ = true;
openfl__$internal_renderer_opengl_utils_LineStyle.prototype = {
	__class__: openfl__$internal_renderer_opengl_utils_LineStyle
};
var openfl__$internal_renderer_opengl_utils_FillType = $hxClasses["openfl._internal.renderer.opengl.utils.FillType"] = { __ename__ : true, __constructs__ : ["None","Color","Texture","Gradient"] };
openfl__$internal_renderer_opengl_utils_FillType.None = ["None",0];
openfl__$internal_renderer_opengl_utils_FillType.None.toString = $estr;
openfl__$internal_renderer_opengl_utils_FillType.None.__enum__ = openfl__$internal_renderer_opengl_utils_FillType;
openfl__$internal_renderer_opengl_utils_FillType.Color = function(color,alpha) { var $x = ["Color",1,color,alpha]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_FillType; $x.toString = $estr; return $x; };
openfl__$internal_renderer_opengl_utils_FillType.Texture = function(bitmap,matrix,repeat,smooth) { var $x = ["Texture",2,bitmap,matrix,repeat,smooth]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_FillType; $x.toString = $estr; return $x; };
openfl__$internal_renderer_opengl_utils_FillType.Gradient = ["Gradient",3];
openfl__$internal_renderer_opengl_utils_FillType.Gradient.toString = $estr;
openfl__$internal_renderer_opengl_utils_FillType.Gradient.__enum__ = openfl__$internal_renderer_opengl_utils_FillType;
var openfl__$internal_renderer_opengl_utils_FilterManager = function(gl,transparent) {
	this.transparent = transparent;
	this.filterStack = [];
	this.offsetX = 0;
	this.offsetY = 0;
	this.setContext(gl);
};
$hxClasses["openfl._internal.renderer.opengl.utils.FilterManager"] = openfl__$internal_renderer_opengl_utils_FilterManager;
openfl__$internal_renderer_opengl_utils_FilterManager.__name__ = true;
openfl__$internal_renderer_opengl_utils_FilterManager.prototype = {
	begin: function(renderSession,buffer) {
		this.renderSession = renderSession;
		this.defaultShader = renderSession.shaderManager.defaultShader;
		this.width = 0;
		this.height = 0;
		this.buffer = buffer;
	}
	,initShaderBuffers: function() {
		var gl = this.gl;
		this.vertexBuffer = gl.createBuffer();
		this.uvBuffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		this.indexBuffer = gl.createBuffer();
		this.vertexArray = new Float32Array([0.0,0.0,1.0,0.0,0.0,1.0,1.0,1.0]);
		gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,this.vertexArray,gl.STATIC_DRAW);
		this.uvArray = new Float32Array([0.0,0.0,1.0,0.0,0.0,1.0,1.0,1.0]);
		gl.bindBuffer(gl.ARRAY_BUFFER,this.uvBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,this.uvArray,gl.STATIC_DRAW);
		this.colorArray = new Float32Array([1.0,16777215,1.0,16777215,1.0,16777215,1.0,16777215]);
		gl.bindBuffer(gl.ARRAY_BUFFER,this.colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,this.colorArray,gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,1,3,2]),gl.STATIC_DRAW);
	}
	,setContext: function(gl) {
		this.gl = gl;
		this.texturePool = [];
		this.initShaderBuffers();
	}
	,__class__: openfl__$internal_renderer_opengl_utils_FilterManager
};
var openfl__$internal_renderer_opengl_utils_FilterTexture = function(gl,width,height,smoothing) {
	if(smoothing == null) smoothing = true;
	this.gl = gl;
	this.frameBuffer = gl.createFramebuffer();
	this.texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D,this.texture);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,smoothing?gl.LINEAR:gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,smoothing?gl.LINEAR:gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
	gl.bindFramebuffer(gl.FRAMEBUFFER,this.frameBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,this.texture,0);
	this.renderBuffer = gl.createRenderbuffer();
	gl.bindRenderbuffer(gl.RENDERBUFFER,this.renderBuffer);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_STENCIL_ATTACHMENT,gl.RENDERBUFFER,this.renderBuffer);
	this.resize(width,height);
};
$hxClasses["openfl._internal.renderer.opengl.utils.FilterTexture"] = openfl__$internal_renderer_opengl_utils_FilterTexture;
openfl__$internal_renderer_opengl_utils_FilterTexture.__name__ = true;
openfl__$internal_renderer_opengl_utils_FilterTexture.prototype = {
	clear: function() {
		this.gl.clearColor(0,0,0,0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}
	,resize: function(width,height) {
		if(this.width == width && this.height == height) return;
		this.width = width;
		this.height = height;
		this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,width,height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,null);
		this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.renderBuffer);
		this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,width,height);
	}
	,__class__: openfl__$internal_renderer_opengl_utils_FilterTexture
};
var openfl__$internal_renderer_opengl_utils_GLMaskManager = function(renderSession) {
	openfl__$internal_renderer_AbstractMaskManager.call(this,renderSession);
	this.setContext(renderSession.gl);
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLMaskManager"] = openfl__$internal_renderer_opengl_utils_GLMaskManager;
openfl__$internal_renderer_opengl_utils_GLMaskManager.__name__ = true;
openfl__$internal_renderer_opengl_utils_GLMaskManager.__super__ = openfl__$internal_renderer_AbstractMaskManager;
openfl__$internal_renderer_opengl_utils_GLMaskManager.prototype = $extend(openfl__$internal_renderer_AbstractMaskManager.prototype,{
	pushMask: function(mask) {
		this.renderSession.stencilManager.pushMask(mask,this.renderSession);
	}
	,popMask: function() {
		this.renderSession.stencilManager.popMask(null,this.renderSession);
	}
	,setContext: function(gl) {
		if(this.renderSession != null) this.renderSession.gl = gl;
		this.gl = gl;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_GLMaskManager
});
var openfl__$internal_renderer_opengl_utils_VertexAttribute = function(components,type,normalized,name,defaultValue) {
	if(normalized == null) normalized = false;
	this.enabled = true;
	this.normalized = false;
	this.components = components;
	this.type = type;
	this.normalized = normalized;
	this.name = name;
	if(defaultValue == null) this.defaultValue = new Float32Array(components); else this.defaultValue = defaultValue;
};
$hxClasses["openfl._internal.renderer.opengl.utils.VertexAttribute"] = openfl__$internal_renderer_opengl_utils_VertexAttribute;
openfl__$internal_renderer_opengl_utils_VertexAttribute.__name__ = true;
openfl__$internal_renderer_opengl_utils_VertexAttribute.prototype = {
	copy: function() {
		return new openfl__$internal_renderer_opengl_utils_VertexAttribute(this.components,this.type,this.normalized,this.name,this.defaultValue);
	}
	,getElementsBytes: function() {
		var _g = this.type;
		switch(_g) {
		case 5120:case 5121:
			return 1;
		case 5122:case 5123:
			return 2;
		default:
			return 4;
		}
	}
	,__class__: openfl__$internal_renderer_opengl_utils_VertexAttribute
};
var openfl_geom_Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["openfl.geom.Rectangle"] = openfl_geom_Rectangle;
openfl_geom_Rectangle.__name__ = true;
openfl_geom_Rectangle.prototype = {
	clone: function() {
		return new openfl_geom_Rectangle(this.x,this.y,this.width,this.height);
	}
	,copyFrom: function(sourceRect) {
		this.x = sourceRect.x;
		this.y = sourceRect.y;
		this.width = sourceRect.width;
		this.height = sourceRect.height;
	}
	,setTo: function(xa,ya,widtha,heighta) {
		this.x = xa;
		this.y = ya;
		this.width = widtha;
		this.height = heighta;
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new openfl_geom_Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,__expand: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			return;
		}
		var cacheRight = this.get_right();
		var cacheBottom = this.get_bottom();
		if(this.x > x) {
			this.x = x;
			this.width = cacheRight - x;
		}
		if(this.y > y) {
			this.y = y;
			this.height = cacheBottom - y;
		}
		if(cacheRight < x + width) this.width = x + width - this.x;
		if(cacheBottom < y + height) this.height = y + height - this.y;
	}
	,__toLimeRectangle: function() {
		return new lime_math_Rectangle(this.x,this.y,this.width,this.height);
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,get_left: function() {
		return this.x;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,get_top: function() {
		return this.y;
	}
	,__class__: openfl_geom_Rectangle
	,__properties__: {get_top:"get_top",get_right:"get_right",get_left:"get_left",get_bottom:"get_bottom"}
};
var openfl_geom_Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["openfl.geom.Point"] = openfl_geom_Point;
openfl_geom_Point.__name__ = true;
openfl_geom_Point.prototype = {
	setTo: function(xa,ya) {
		this.x = xa;
		this.y = ya;
	}
	,__toLimeVector2: function() {
		return new lime_math_Vector2(this.x,this.y);
	}
	,__class__: openfl_geom_Point
};
var openfl__$internal_renderer_opengl_utils_GraphicsRenderer = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.GraphicsRenderer"] = openfl__$internal_renderer_opengl_utils_GraphicsRenderer;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.__name__ = true;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.overrideMatrix = null;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildCircle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var rectData = path.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height;
	if(rectData.length == 3) height = width; else height = rectData[3];
	if(path.type == openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse) {
		width /= 2;
		height /= 2;
		x += width;
		y += height;
	}
	if(localCoords) {
		x -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
		y -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
	}
	var totalSegs = 40;
	var seg = Math.PI * 2 / totalSegs;
	var bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
	var fill = bucket.getData(openfl__$internal_renderer_opengl_utils_BucketDataType.Fill);
	if(fill != null) {
		var verts = fill.verts;
		var indices = fill.indices;
		var vertPos = verts.length / 2 | 0;
		indices.push(vertPos);
		var _g1 = 0;
		var _g = totalSegs + 1;
		while(_g1 < _g) {
			var i = _g1++;
			verts.push(x);
			verts.push(y);
			verts.push(x + Math.sin(seg * i) * width);
			verts.push(y + Math.cos(seg * i) * height);
			indices.push(vertPos++);
			indices.push(vertPos++);
		}
		indices.push(vertPos - 1);
	}
	if(path.line.width > 0) {
		var tempPoints = path.points;
		path.points = [];
		var _g11 = 0;
		var _g2 = totalSegs + 1;
		while(_g11 < _g2) {
			var i1 = _g11++;
			path.points.push(x + Math.sin(seg * i1) * width);
			path.points.push(y + Math.cos(seg * i1) * height);
		}
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine(path,bucket);
		path.points = tempPoints;
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildComplexPoly = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var bucket = null;
	if(path.points.length >= 6) {
		var points = path.points.slice();
		if(localCoords) {
			var _g1 = 0;
			var _g = points.length / 2 | 0;
			while(_g1 < _g) {
				var i = _g1++;
				points[i * 2] -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
				points[i * 2 + 1] -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
			}
		}
		bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
		var fill = bucket.getData(openfl__$internal_renderer_opengl_utils_BucketDataType.Fill);
		fill.drawMode = glStack.gl.TRIANGLE_FAN;
		fill.verts = points;
		var indices = fill.indices;
		var length = points.length / 2 | 0;
		var _g2 = 0;
		while(_g2 < length) {
			var i1 = _g2++;
			indices.push(i1);
		}
	}
	if(path.line.width > 0) {
		if(bucket == null) bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine(path,bucket,localCoords);
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine = function(path,bucket,localCoords) {
	if(localCoords == null) localCoords = false;
	var points = path.points;
	if(points.length == 0) return;
	var line = bucket.getData(openfl__$internal_renderer_opengl_utils_BucketDataType.Line);
	if(localCoords) {
		var _g1 = 0;
		var _g = points.length / 2 | 0;
		while(_g1 < _g) {
			var i = _g1++;
			points[i * 2] -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
			points[i * 2 + 1] -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
		}
	}
	var firstPoint = new openfl_geom_Point(points[0],points[1]);
	var lastPoint = new openfl_geom_Point(points[points.length - 2 | 0],points[points.length - 1 | 0]);
	if(firstPoint.x == lastPoint.x && firstPoint.y == lastPoint.y) {
		points = points.slice();
		points.pop();
		points.pop();
		lastPoint = new openfl_geom_Point(points[points.length - 2 | 0],points[points.length - 1 | 0]);
		var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) * 0.5;
		var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) * 0.5;
		points.unshift(midPointY);
		points.unshift(midPointX);
		points.push(midPointX);
		points.push(midPointY);
	}
	var verts = line.verts;
	var indices = line.indices;
	var length = points.length / 2 | 0;
	var indexCount = points.length;
	var indexStart = verts.length / 6 | 0;
	var width = path.line.width / 2;
	var color = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.hex2rgb(path.line.color);
	var alpha = path.line.alpha;
	var r = color[0] * alpha;
	var g = color[1] * alpha;
	var b = color[2] * alpha;
	var px;
	var py;
	var p1x;
	var p1y;
	var p2x;
	var p2y;
	var p3x;
	var p3y;
	var perpx;
	var perpy;
	var perp2x;
	var perp2y;
	var perp3x;
	var perp3y;
	var a1;
	var b1;
	var c1;
	var a2;
	var b2;
	var c2;
	var denom;
	var pdist;
	var dist;
	p1x = points[0];
	p1y = points[1];
	p2x = points[2];
	p2y = points[3];
	perpx = -(p1y - p2y);
	perpy = p1x - p2x;
	dist = Math.sqrt(Math.abs(perpx * perpx + perpy * perpy));
	perpx = perpx / dist;
	perpy = perpy / dist;
	perpx = perpx * width;
	perpy = perpy * width;
	verts.push(p1x - perpx);
	verts.push(p1y - perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	verts.push(p1x + perpx);
	verts.push(p1y + perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	var _g11 = 1;
	var _g2 = length - 1;
	while(_g11 < _g2) {
		var i1 = _g11++;
		p1x = points[(i1 - 1) * 2];
		p1y = points[(i1 - 1) * 2 + 1];
		p2x = points[i1 * 2];
		p2y = points[i1 * 2 + 1];
		p3x = points[(i1 + 1) * 2];
		p3y = points[(i1 + 1) * 2 + 1];
		perpx = -(p1y - p2y);
		perpy = p1x - p2x;
		dist = Math.sqrt(Math.abs(perpx * perpx + perpy * perpy));
		perpx = perpx / dist;
		perpy = perpy / dist;
		perpx = perpx * width;
		perpy = perpy * width;
		perp2x = -(p2y - p3y);
		perp2y = p2x - p3x;
		dist = Math.sqrt(Math.abs(perp2x * perp2x + perp2y * perp2y));
		perp2x = perp2x / dist;
		perp2y = perp2y / dist;
		perp2x = perp2x * width;
		perp2y = perp2y * width;
		a1 = -perpy + p1y - (-perpy + p2y);
		b1 = -perpx + p2x - (-perpx + p1x);
		c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
		a2 = -perp2y + p3y - (-perp2y + p2y);
		b2 = -perp2x + p2x - (-perp2x + p3x);
		c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
		denom = a1 * b2 - a2 * b1;
		if(Math.abs(denom) < 0.1) {
			denom += 10.1;
			verts.push(p2x - perpx);
			verts.push(p2y - perpy);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x + perpx);
			verts.push(p2y + perpy);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			continue;
		}
		px = (b1 * c2 - b2 * c1) / denom;
		py = (a2 * c1 - a1 * c2) / denom;
		pdist = (px - p2x) * (px - p2x) + (py - p2y) + (py - p2y);
		if(pdist > 19600) {
			perp3x = perpx - perp2x;
			perp3y = perpy - perp2y;
			dist = Math.sqrt(Math.abs(perp3x * perp3x + perp3y * perp3y));
			perp3x = perp3x / dist;
			perp3y = perp3y / dist;
			perp3x = perp3x * width;
			perp3y = perp3y * width;
			verts.push(p2x - perp3x);
			verts.push(p2y - perp3y);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x + perp3x);
			verts.push(p2y + perp3y);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x - perp3x);
			verts.push(p2y - perp3y);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			indexCount++;
		} else {
			verts.push(px);
			verts.push(py);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x - (px - p2x));
			verts.push(p2y - (py - p2y));
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
		}
	}
	p1x = points[(length - 2) * 2];
	p1y = points[(length - 2) * 2 + 1];
	p2x = points[(length - 1) * 2];
	p2y = points[(length - 1) * 2 + 1];
	perpx = -(p1y - p2y);
	perpy = p1x - p2x;
	dist = Math.sqrt(Math.abs(perpx * perpx + perpy * perpy));
	if(!isFinite(dist)) console.log(perpx * perpx + perpy * perpy);
	perpx = perpx / dist;
	perpy = perpy / dist;
	perpx = perpx * width;
	perpy = perpy * width;
	verts.push(p2x - perpx);
	verts.push(p2y - perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	verts.push(p2x + perpx);
	verts.push(p2y + perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	indices.push(indexStart);
	var _g3 = 0;
	while(_g3 < indexCount) {
		var i2 = _g3++;
		indices.push(indexStart++);
	}
	indices.push(indexStart - 1);
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildRectangle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var rectData = path.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height = rectData[3];
	if(localCoords) {
		x -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
		y -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
	}
	var bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
	var fill = bucket.getData(openfl__$internal_renderer_opengl_utils_BucketDataType.Fill);
	if(fill != null) {
		var verts = fill.verts;
		var indices = fill.indices;
		var vertPos = verts.length / 2 | 0;
		verts.push(x);
		verts.push(y);
		verts.push(x + width);
		verts.push(y);
		verts.push(x);
		verts.push(y + height);
		verts.push(x + width);
		verts.push(y + height);
		indices.push(vertPos);
		indices.push(vertPos);
		indices.push(vertPos + 1);
		indices.push(vertPos + 2);
		indices.push(vertPos + 3);
		indices.push(vertPos + 3);
	}
	if(path.line.width > 0) {
		var tempPoints = path.points;
		path.points = [x,y,x + width,y,x + width,y + height,x,y + height,x,y];
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine(path,bucket);
		path.points = tempPoints;
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildRoundedRectangle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var points = path.points.slice();
	var x = points[0];
	var y = points[1];
	var width = points[2];
	var height = points[3];
	var rx = points[4];
	var ry = points[5];
	if(localCoords) {
		x -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
		y -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
	}
	var xe = x + width;
	var ye = y + height;
	var cx1 = -rx + rx * openfl__$internal_renderer_opengl_utils_GraphicsRenderer.SIN45;
	var cx2 = -rx + rx * openfl__$internal_renderer_opengl_utils_GraphicsRenderer.TAN22;
	var cy1 = -ry + ry * openfl__$internal_renderer_opengl_utils_GraphicsRenderer.SIN45;
	var cy2 = -ry + ry * openfl__$internal_renderer_opengl_utils_GraphicsRenderer.TAN22;
	var recPoints = [];
	recPoints.push(xe);
	recPoints.push(ye - ry);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,xe,ye + cy2,xe + cx1,ye + cy1);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,xe + cx2,ye,xe - rx,ye);
	recPoints.push(x + rx);
	recPoints.push(ye);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,x - cx2,ye,x - cx1,ye + cy1);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,x,ye + cy2,x,ye - ry);
	recPoints.push(x);
	recPoints.push(y + ry);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,x,y - cy2,x - cx1,y - cy1);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,x - cx2,y,x + rx,y);
	recPoints.push(xe - rx);
	recPoints.push(y);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,xe + cx2,y,xe + cx1,y - cy1);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo(recPoints,xe,y - cy2,xe,y + ry);
	recPoints.push(xe);
	recPoints.push(ye - ry);
	var bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
	var fill = bucket.getData(openfl__$internal_renderer_opengl_utils_BucketDataType.Fill);
	if(fill != null) {
		var verts = fill.verts;
		var indices = fill.indices;
		var vecPos = verts.length / 2;
		var triangles = openfl__$internal_renderer_opengl_utils_PolyK.triangulate(recPoints);
		var i = 0;
		while(i < triangles.length) {
			indices.push(triangles[i] + vecPos | 0);
			indices.push(triangles[i] + vecPos | 0);
			indices.push(triangles[i + 1] + vecPos | 0);
			indices.push(triangles[i + 2] + vecPos | 0);
			indices.push(triangles[i + 2] + vecPos | 0);
			i += 3;
		}
		i = 0;
		while(i < recPoints.length) {
			verts.push(recPoints[i]);
			verts.push(recPoints[++i]);
			i++;
		}
	}
	if(path.line.width > 0) {
		var tempPoints = path.points;
		path.points = recPoints;
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildLine(path,bucket);
		path.points = tempPoints;
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildDrawTriangles = function(path,object,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var args = path.type.slice(2);
	var vertices = args[0];
	var indices = args[1];
	var uvtData = args[2];
	var culling = args[3];
	var colors = args[4];
	var blendMode = args[5];
	var a;
	var b;
	var c;
	var d;
	var tx;
	var ty;
	if(localCoords) {
		a = 1.0;
		b = 0.0;
		c = 0.0;
		d = 1.0;
		tx = 0.0;
		ty = 0.0;
	} else {
		a = object.__worldTransform.a;
		b = object.__worldTransform.b;
		c = object.__worldTransform.c;
		d = object.__worldTransform.d;
		tx = object.__worldTransform.tx;
		ty = object.__worldTransform.ty;
	}
	var hasColors = colors != null && colors.length > 0;
	var bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
	var fill = bucket.getData(openfl__$internal_renderer_opengl_utils_BucketDataType.Fill);
	var colorAttrib = fill.vertexArray.attributes[2];
	colorAttrib.enabled = hasColors;
	colorAttrib.defaultValue = new Float32Array([1,1,1,1]);
	fill.rawVerts = true;
	fill.glLength = indices.length;
	fill.stride = Std["int"](fill.vertexArray.get_stride() / 4);
	var vertsLength = fill.glLength * fill.stride;
	var verts;
	if(fill.glVerts == null || fill.glVerts.length < vertsLength) {
		verts = new Float32Array(vertsLength);
		fill.glVerts = verts;
	} else verts = fill.glVerts;
	var glColors = new Uint32Array(verts.buffer);
	var v0 = 0;
	var v1 = 0;
	var v2 = 0;
	var i0 = 0;
	var i1 = 0;
	var i2 = 0;
	var x0 = 0.0;
	var y0 = 0.0;
	var x1 = 0.0;
	var y1 = 0.0;
	var x2 = 0.0;
	var y2 = 0.0;
	var idx = 0;
	var _g1 = 0;
	var _g = indices.length / 3 | 0;
	while(_g1 < _g) {
		var i = _g1++;
		i0 = indices.data[i * 3];
		i1 = indices.data[i * 3 + 1];
		i2 = indices.data[i * 3 + 2];
		v0 = i0 * 2;
		v1 = i1 * 2;
		v2 = i2 * 2;
		x0 = vertices.data[v0];
		y0 = vertices.data[v0 + 1];
		x1 = vertices.data[v1];
		y1 = vertices.data[v1 + 1];
		x2 = vertices.data[v2];
		y2 = vertices.data[v2 + 1];
		if(localCoords) {
			x0 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
			y0 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
			x1 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
			y1 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
			x2 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.x;
			y2 -= openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.y;
		}
		switch(culling[1]) {
		case 2:
			if(!((x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0) < 0)) continue;
			break;
		case 0:
			if((x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0) < 0) continue;
			break;
		default:
		}
		verts[idx++] = a * x0 + c * y0 + tx;
		verts[idx++] = b * x0 + d * y0 + ty;
		verts[idx++] = uvtData.data[v0];
		verts[idx++] = uvtData.data[v0 + 1];
		if(hasColors) glColors[idx++] = colors.data[i0];
		verts[idx++] = a * x1 + c * y1 + tx;
		verts[idx++] = b * x1 + d * y1 + ty;
		verts[idx++] = uvtData.data[v1];
		verts[idx++] = uvtData.data[v1 + 1];
		if(hasColors) glColors[idx++] = colors.data[i1];
		verts[idx++] = a * x2 + c * y2 + tx;
		verts[idx++] = b * x2 + d * y2 + ty;
		verts[idx++] = uvtData.data[v2];
		verts[idx++] = uvtData.data[v2 + 1];
		if(hasColors) glColors[idx++] = colors.data[i2];
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.curveTo = function(points,cx,cy,x,y) {
	var xa = 0;
	var ya = 0;
	var n = 20;
	var fromX = points[points.length - 2];
	var fromY = points[points.length - 1];
	var px = 0;
	var py = 0;
	var tmp = 0;
	var _g1 = 1;
	var _g = n + 1;
	while(_g1 < _g) {
		var i = _g1++;
		tmp = i / n;
		xa = fromX + (cx - fromX) * tmp;
		ya = fromY + (cy - fromY) * tmp;
		px = xa + (cx + (x - cx) * tmp - xa) * tmp;
		py = ya + (cy + (y - cy) * tmp - ya) * tmp;
		points.push(px);
		points.push(py);
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.render = function(object,renderSession) {
	var graphics = object.__graphics;
	var spritebatch = renderSession.spriteBatch;
	var dirty = graphics.__dirty;
	if(graphics.__commands.length <= 0) return;
	if(dirty) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.updateGraphics(object,object.__graphics,renderSession.gl,object.cacheAsBitmap);
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderGraphics(object,renderSession,false);
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderGraphics = function(object,renderSession,localCoords) {
	if(localCoords == null) localCoords = false;
	var graphics = object.__graphics;
	var gl = renderSession.gl;
	var glStack = graphics.__glStack[openfl__$internal_renderer_opengl_GLRenderer.glContextId];
	var bucket;
	var translationMatrix;
	if(localCoords) translationMatrix = openfl_geom_Matrix.__identity; else translationMatrix = object.__worldTransform;
	renderSession.blendModeManager.setBlendMode(object.blendMode);
	var batchDrawing = renderSession.spriteBatch.drawing;
	var _g1 = 0;
	var _g = glStack.buckets.length;
	while(_g1 < _g) {
		var i = _g1++;
		batchDrawing = renderSession.spriteBatch.drawing;
		bucket = glStack.buckets[i];
		var _g2 = bucket.mode;
		switch(_g2[1]) {
		case 1:case 2:
			if(batchDrawing && !localCoords) renderSession.spriteBatch.finish();
			renderSession.stencilManager.pushBucket(bucket,renderSession,translationMatrix.toArray(true));
			var shader = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareShader(bucket,renderSession,object,translationMatrix.toArray(true));
			openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderFill(bucket,shader,renderSession);
			renderSession.stencilManager.popBucket(object,bucket,renderSession);
			break;
		case 5:
			if(batchDrawing && !localCoords) renderSession.spriteBatch.finish();
			var shader1 = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareShader(bucket,renderSession,object,null);
			openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderDrawTriangles(bucket,shader1,renderSession);
			break;
		case 6:
			if(!batchDrawing) renderSession.spriteBatch.begin(renderSession);
			var args = bucket.graphicType.slice(2);
			renderSession.spriteBatch.renderTiles(object,args[0],args[1],args[2],args[3],args[4]);
			break;
		default:
		}
		var ct = object.__worldColorTransform;
		var _g21 = 0;
		var _g3 = bucket.lines;
		while(_g21 < _g3.length) {
			var line = _g3[_g21];
			++_g21;
			if(line != null && line.verts.length > 0) {
				batchDrawing = renderSession.spriteBatch.drawing;
				if(batchDrawing && !localCoords) renderSession.spriteBatch.finish();
				var shader2 = renderSession.shaderManager.primitiveShader;
				renderSession.shaderManager.setShader(shader2);
				gl.uniformMatrix3fv(shader2.getUniformLocation("uTranslationMatrix"),false,translationMatrix.toArray(true));
				gl.uniformMatrix3fv(shader2.getUniformLocation("uProjectionMatrix"),false,renderSession.projectionMatrix.toArray(true));
				gl.uniform1f(shader2.getUniformLocation("uAlpha"),1);
				gl.uniform4f(shader2.getUniformLocation("uColorMultiplier"),ct.redMultiplier,ct.greenMultiplier,ct.blueMultiplier,ct.alphaMultiplier);
				gl.uniform4f(shader2.getUniformLocation("uColorOffset"),ct.redOffset / 255,ct.greenOffset / 255,ct.blueOffset / 255,ct.alphaOffset / 255);
				line.vertexArray.bind();
				shader2.bindVertexArray(line.vertexArray);
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,line.indexBuffer);
				gl.drawElements(gl.TRIANGLE_STRIP,line.indices.length,gl.UNSIGNED_SHORT,0);
			}
		}
		batchDrawing = renderSession.spriteBatch.drawing;
		if(!batchDrawing && !localCoords) renderSession.spriteBatch.begin(renderSession);
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.updateGraphics = function(object,graphics,gl,localCoords) {
	if(localCoords == null) localCoords = false;
	openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectPosition.setTo(object.get_x(),object.get_y());
	if(graphics.__bounds == null) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds = new openfl_geom_Rectangle(); else openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.copyFrom(graphics.__bounds);
	var glStack = null;
	if(graphics.__dirty) glStack = openfl__$internal_renderer_opengl_utils_DrawPath.getStack(graphics,gl);
	graphics.set___dirty(false);
	var _g = 0;
	var _g1 = glStack.buckets;
	while(_g < _g1.length) {
		var data = _g1[_g];
		++_g;
		data.reset();
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bucketPool.push(data);
	}
	glStack.reset();
	var _g11 = glStack.lastIndex;
	var _g2 = graphics.__drawPaths.length;
	while(_g11 < _g2) {
		var i = _g11++;
		var path = graphics.__drawPaths[i];
		{
			var _g21 = path.type;
			switch(_g21[1]) {
			case 0:
				openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildComplexPoly(path,glStack,localCoords);
				break;
			case 1:
				var rounded = _g21[2];
				if(rounded) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildRoundedRectangle(path,glStack,localCoords); else openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildRectangle(path,glStack,localCoords);
				break;
			case 2:case 3:
				openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildCircle(path,glStack,localCoords);
				break;
			case 4:
				openfl__$internal_renderer_opengl_utils_GraphicsRenderer.buildDrawTriangles(path,object,glStack,localCoords);
				break;
			case 5:
				openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket(path,glStack);
				break;
			case 6:
				var m = _g21[2];
				openfl__$internal_renderer_opengl_utils_GraphicsRenderer.overrideMatrix = m;
				break;
			}
		}
		glStack.lastIndex++;
	}
	var _g3 = 0;
	var _g12 = glStack.buckets;
	while(_g3 < _g12.length) {
		var bucket = _g12[_g3];
		++_g3;
		if(bucket.uploadTileBuffer) bucket.uploadTile(Math.ceil(openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.get_left()),Math.ceil(openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.get_top()),Math.floor(openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.get_right()),Math.floor(openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds.get_bottom()));
		bucket.optimize();
	}
	glStack.upload();
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareBucket = function(path,glStack) {
	var bucket = null;
	{
		var _g = path.fill;
		switch(_g[1]) {
		case 1:
			var a = _g[3];
			var c = _g[2];
			bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl__$internal_renderer_opengl_utils_BucketMode.Fill);
			if(c == null) bucket.color = [1,1,1]; else bucket.color = [(c >> 16 & 255) / 255,(c >> 8 & 255) / 255,(c & 255) / 255];
			bucket.color[3] = a;
			bucket.uploadTileBuffer = true;
			break;
		case 2:
			var s = _g[5];
			var r = _g[4];
			var m = _g[3];
			var b = _g[2];
			bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill);
			bucket.bitmap = b;
			bucket.textureRepeat = r;
			bucket.textureSmooth = s;
			bucket.texture = b.getTexture(glStack.gl);
			bucket.uploadTileBuffer = true;
			var pMatrix;
			if(m == null) pMatrix = new openfl_geom_Matrix(); else pMatrix = new openfl_geom_Matrix(m.a,m.b,m.c,m.d,m.tx,m.ty);
			pMatrix.invert();
			pMatrix.scale(1 / b.width,1 / b.height);
			var tx = pMatrix.tx;
			var ty = pMatrix.ty;
			pMatrix.tx = 0;
			pMatrix.ty = 0;
			bucket.textureTL.x = tx;
			bucket.textureTL.y = ty;
			bucket.textureBR.x = tx + 1;
			bucket.textureBR.y = ty + 1;
			bucket.textureMatrix = pMatrix;
			break;
		default:
			bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl__$internal_renderer_opengl_utils_BucketMode.Line);
			bucket.uploadTileBuffer = false;
		}
	}
	{
		var _g1 = path.type;
		switch(_g1[1]) {
		case 4:
			bucket.mode = openfl__$internal_renderer_opengl_utils_BucketMode.DrawTriangles;
			bucket.uploadTileBuffer = false;
			break;
		case 5:
			bucket.mode = openfl__$internal_renderer_opengl_utils_BucketMode.DrawTiles;
			bucket.uploadTileBuffer = false;
			break;
		default:
		}
	}
	bucket.graphicType = path.type;
	bucket.overrideMatrix = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.overrideMatrix;
	return bucket;
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.getBucket = function(glStack,mode) {
	var b = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bucketPool.pop();
	if(b == null) b = new openfl__$internal_renderer_opengl_utils_GLBucket(glStack.gl);
	b.mode = mode;
	glStack.buckets.push(b);
	return b;
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.switchBucket = function(fillIndex,glStack,mode) {
	var bucket = null;
	var _g = 0;
	var _g1 = glStack.buckets;
	while(_g < _g1.length) {
		var b = _g1[_g];
		++_g;
		if(b.fillIndex == fillIndex) {
			bucket = b;
			break;
		}
	}
	if(bucket == null) bucket = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.getBucket(glStack,mode);
	bucket.dirty = true;
	bucket.fillIndex = fillIndex;
	return bucket;
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.prepareShader = function(bucket,renderSession,object,translationMatrix) {
	var gl = renderSession.gl;
	var shader = null;
	var _g = bucket.mode;
	switch(_g[1]) {
	case 1:
		shader = renderSession.shaderManager.fillShader;
		break;
	case 2:
		shader = renderSession.shaderManager.patternFillShader;
		break;
	case 5:
		shader = renderSession.shaderManager.drawTrianglesShader;
		break;
	default:
		shader = null;
	}
	if(shader == null) return null;
	var newShader = renderSession.shaderManager.setShader(shader);
	gl.uniform1f(shader.getUniformLocation("uAlpha"),object.__worldAlpha);
	gl.uniformMatrix3fv(shader.getUniformLocation("uProjectionMatrix"),false,renderSession.projectionMatrix.toArray(true));
	var ct = object.__worldColorTransform;
	gl.uniform4f(shader.getUniformLocation("uColorMultiplier"),ct.redMultiplier,ct.greenMultiplier,ct.blueMultiplier,ct.alphaMultiplier);
	gl.uniform4f(shader.getUniformLocation("uColorOffset"),ct.redOffset / 255,ct.greenOffset / 255,ct.blueOffset / 255,ct.alphaOffset / 255);
	var _g1 = bucket.mode;
	switch(_g1[1]) {
	case 1:
		gl.uniformMatrix3fv(shader.getUniformLocation("uTranslationMatrix"),false,translationMatrix);
		gl.uniform4fv(shader.getUniformLocation("uColor"),new Float32Array(bucket.color));
		break;
	case 2:
		gl.uniformMatrix3fv(shader.getUniformLocation("uTranslationMatrix"),false,translationMatrix);
		gl.uniform2f(shader.getUniformLocation("uPatternTL"),bucket.textureTL.x,bucket.textureTL.y);
		gl.uniform2f(shader.getUniformLocation("uPatternBR"),bucket.textureBR.x,bucket.textureBR.y);
		gl.uniformMatrix3fv(shader.getUniformLocation("uPatternMatrix"),false,bucket.textureMatrix.toArray(true));
		break;
	case 5:
		if(bucket.texture != null) gl.uniform1i(shader.getUniformLocation("uUseTexture"),1); else {
			gl.uniform1i(shader.getUniformLocation("uUseTexture"),0);
			gl.uniform4fv(shader.getUniformLocation("uColor"),new Float32Array(bucket.color));
		}
		break;
	default:
	}
	return shader;
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderFill = function(bucket,shader,renderSession) {
	var gl = renderSession.gl;
	if(bucket.mode == openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill && bucket.texture != null) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bindTexture(gl,bucket);
	gl.bindBuffer(gl.ARRAY_BUFFER,bucket.tileBuffer);
	gl.vertexAttribPointer(shader.getAttribLocation("aPosition"),4,gl.SHORT,false,0,0);
	gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.renderDrawTriangles = function(bucket,shader,renderSession) {
	var gl = renderSession.gl;
	var _g = 0;
	var _g1 = bucket.fills;
	while(_g < _g1.length) {
		var fill = _g1[_g];
		++_g;
		if(fill.available) continue;
		openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bindTexture(gl,bucket);
		fill.vertexArray.bind();
		shader.bindVertexArray(fill.vertexArray);
		gl.drawArrays(gl.TRIANGLES,fill.glStart,fill.glLength);
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bindTexture = function(gl,bucket) {
	gl.bindTexture(gl.TEXTURE_2D,bucket.texture);
	if(bucket.textureRepeat && bucket.bitmap.__image.get_powerOfTwo()) {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);
	} else {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
	}
	if(bucket.textureSmooth) {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
	} else {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
	}
};
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.hex2rgb = function(hex) {
	if(hex == null) return [1,1,1]; else return [(hex >> 16 & 255) / 255,(hex >> 8 & 255) / 255,(hex & 255) / 255];
};
var openfl__$internal_renderer_opengl_utils_GLStack = function(gl) {
	this.lastIndex = 0;
	this.gl = gl;
	this.buckets = [];
	this.lastIndex = 0;
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLStack"] = openfl__$internal_renderer_opengl_utils_GLStack;
openfl__$internal_renderer_opengl_utils_GLStack.__name__ = true;
openfl__$internal_renderer_opengl_utils_GLStack.prototype = {
	reset: function() {
		this.buckets = [];
		this.lastIndex = 0;
	}
	,upload: function() {
		var _g = 0;
		var _g1 = this.buckets;
		while(_g < _g1.length) {
			var bucket = _g1[_g];
			++_g;
			if(bucket.dirty) bucket.upload();
		}
	}
	,__class__: openfl__$internal_renderer_opengl_utils_GLStack
};
var openfl__$internal_renderer_opengl_utils_GLBucket = function(gl) {
	this.uploadTileBuffer = true;
	this.textureSmooth = true;
	this.textureRepeat = false;
	this.lines = [];
	this.fills = [];
	this.fillIndex = -1;
	this.gl = gl;
	this.color = [0,0,0];
	this.lastIndex = 0;
	this.alpha = 1;
	this.dirty = true;
	this.mode = openfl__$internal_renderer_opengl_utils_BucketMode.Fill;
	this.textureMatrix = new openfl_geom_Matrix();
	this.textureTL = new openfl_geom_Point();
	this.textureBR = new openfl_geom_Point(1,1);
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLBucket"] = openfl__$internal_renderer_opengl_utils_GLBucket;
openfl__$internal_renderer_opengl_utils_GLBucket.__name__ = true;
openfl__$internal_renderer_opengl_utils_GLBucket.prototype = {
	getData: function(type) {
		var data;
		switch(type[1]) {
		case 1:
			data = this.fills;
			break;
		default:
			data = this.lines;
		}
		var result = null;
		var remove = false;
		var _g = 0;
		while(_g < data.length) {
			var d = data[_g];
			++_g;
			if(d.available) {
				result = d;
				remove = true;
				break;
			}
		}
		if(result == null) result = new openfl__$internal_renderer_opengl_utils_GLBucketData(this.gl);
		result.available = false;
		result.parent = this;
		result.type = type;
		if(remove) HxOverrides.remove(data,result);
		data.push(result);
		switch(type[1]) {
		case 1:
			var _g1 = this.mode;
			switch(_g1[1]) {
			case 1:case 2:
				result.vertexArray.attributes = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.fillVertexAttributes;
				break;
			case 5:
				result.vertexArray.attributes = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.drawTrianglesVertexAttributes.slice();
				result.vertexArray.attributes[2] = result.vertexArray.attributes[2].copy();
				break;
			default:
			}
			break;
		case 0:
			result.vertexArray.attributes = openfl__$internal_renderer_opengl_utils_GraphicsRenderer.primitiveVertexAttributes;
			break;
		}
		return result;
	}
	,optimize: function() {
		var _g = this;
		var data = this.lines;
		if(data.length > 1) {
			var result = [];
			var tmp = null;
			var last = null;
			var idx = 0;
			var vi = 0;
			var ii = 0;
			var before = data.length;
			var _g1 = 0;
			while(_g1 < data.length) {
				var d = data[_g1];
				++_g1;
				if(d.available || d.rawVerts || d.rawIndices) {
					if(tmp != null) {
						result.push(tmp);
						tmp = null;
					}
					result.push(d);
					last = d;
					continue;
				}
				if(last == null || last.drawMode == d.drawMode) {
					if(tmp == null) tmp = d; else {
						vi = tmp.verts.length;
						ii = tmp.indices.length;
						var _g2 = 0;
						var _g11 = d.verts.length;
						while(_g2 < _g11) {
							var j = _g2++;
							tmp.verts[j + vi] = d.verts[j];
						}
						var _g21 = 0;
						var _g12 = d.indices.length;
						while(_g21 < _g12) {
							var j1 = _g21++;
							tmp.indices[j1 + ii] = d.indices[j1] + idx;
						}
					}
					idx = tmp.indices[tmp.indices.length - 1] + 1;
					last = d;
				} else {
					if(tmp != null) {
						result.push(tmp);
						tmp = null;
					}
					result.push(d);
					last = d;
					continue;
				}
			}
			if(result.length == 0 && tmp != null) result.push(tmp);
			if(result.length > 0) switch(openfl__$internal_renderer_opengl_utils_BucketDataType.Line[1]) {
			case 1:
				_g.fills = result;
				break;
			default:
				_g.lines = result;
			}
		}
	}
	,reset: function() {
		var _g = 0;
		var _g1 = this.fills;
		while(_g < _g1.length) {
			var fill = _g1[_g];
			++_g;
			fill.reset();
		}
		var _g2 = 0;
		var _g11 = this.lines;
		while(_g2 < _g11.length) {
			var line = _g11[_g2];
			++_g2;
			line.reset();
		}
		this.fillIndex = -1;
		this.uploadTileBuffer = true;
		this.graphicType = openfl__$internal_renderer_opengl_utils_GraphicType.Polygon;
	}
	,uploadTile: function(x,y,w,h) {
		if(this.tileBuffer == null) this.tileBuffer = this.gl.createBuffer();
		this.tile = [x,y,0,0,w,y,1,0,x,h,0,1,w,h,1,1];
		this.glTile = new Int16Array(this.tile);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.tileBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER,this.glTile,this.gl.STATIC_DRAW);
	}
	,upload: function() {
		if(this.mode != openfl__$internal_renderer_opengl_utils_BucketMode.Line) {
			var _g = 0;
			var _g1 = this.fills;
			while(_g < _g1.length) {
				var fill = _g1[_g];
				++_g;
				if(!fill.available) fill.upload();
			}
		}
		var _g2 = 0;
		var _g11 = this.lines;
		while(_g2 < _g11.length) {
			var line = _g11[_g2];
			++_g2;
			if(!line.available) line.upload();
		}
		this.dirty = false;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_GLBucket
};
var openfl__$internal_renderer_opengl_utils_GLBucketData = function(gl) {
	this.available = false;
	this.rawIndices = false;
	this.stride = 0;
	this.rawVerts = false;
	this.lastVertsSize = 0;
	this.glStart = 0;
	this.glLength = 0;
	this.gl = gl;
	this.drawMode = gl.TRIANGLE_STRIP;
	this.verts = [];
	this.indices = [];
	this.vertexArray = new openfl__$internal_renderer_opengl_utils_VertexArray([]);
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLBucketData"] = openfl__$internal_renderer_opengl_utils_GLBucketData;
openfl__$internal_renderer_opengl_utils_GLBucketData.__name__ = true;
openfl__$internal_renderer_opengl_utils_GLBucketData.prototype = {
	reset: function() {
		this.available = true;
		this.verts = [];
		this.indices = [];
		this.glLength = 0;
		this.glStart = 0;
		this.stride = 0;
		this.rawVerts = false;
		this.rawIndices = false;
	}
	,upload: function() {
		if(this.rawVerts && this.glVerts != null && this.glVerts.length > 0 || this.verts.length > 0) {
			if(!this.rawVerts) this.glVerts = new Float32Array(this.verts);
			this.vertexArray.buffer = this.glVerts.buffer;
			if(this.glVerts.length <= this.lastVertsSize) {
				this.vertexArray.bind();
				var end = this.glLength * 4 * this.stride;
				if(this.glLength > 0 && this.lastVertsSize > end) {
					var view = this.glVerts.subarray(0,end);
					this.vertexArray.upload(view);
				} else this.vertexArray.upload(this.glVerts);
			} else {
				this.vertexArray.setContext(this.gl,this.glVerts);
				this.lastVertsSize = this.glVerts.length;
			}
		}
		if(this.glLength == 0 && (this.rawIndices && this.glIndices != null && this.glIndices.length > 0 || this.indices.length > 0)) {
			if(this.indexBuffer == null) this.indexBuffer = this.gl.createBuffer();
			if(!this.rawIndices) this.glIndices = new Uint16Array(this.indices);
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
			this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,this.glIndices,this.gl.STREAM_DRAW);
		}
	}
	,__class__: openfl__$internal_renderer_opengl_utils_GLBucketData
};
var openfl__$internal_renderer_opengl_utils_BucketMode = $hxClasses["openfl._internal.renderer.opengl.utils.BucketMode"] = { __ename__ : true, __constructs__ : ["None","Fill","PatternFill","Line","PatternLine","DrawTriangles","DrawTiles"] };
openfl__$internal_renderer_opengl_utils_BucketMode.None = ["None",0];
openfl__$internal_renderer_opengl_utils_BucketMode.None.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.None.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.Fill = ["Fill",1];
openfl__$internal_renderer_opengl_utils_BucketMode.Fill.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.Fill.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill = ["PatternFill",2];
openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.PatternFill.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.Line = ["Line",3];
openfl__$internal_renderer_opengl_utils_BucketMode.Line.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.Line.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.PatternLine = ["PatternLine",4];
openfl__$internal_renderer_opengl_utils_BucketMode.PatternLine.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.PatternLine.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTriangles = ["DrawTriangles",5];
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTriangles.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTriangles.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTiles = ["DrawTiles",6];
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTiles.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketMode.DrawTiles.__enum__ = openfl__$internal_renderer_opengl_utils_BucketMode;
var openfl__$internal_renderer_opengl_utils_BucketDataType = $hxClasses["openfl._internal.renderer.opengl.utils.BucketDataType"] = { __ename__ : true, __constructs__ : ["Line","Fill"] };
openfl__$internal_renderer_opengl_utils_BucketDataType.Line = ["Line",0];
openfl__$internal_renderer_opengl_utils_BucketDataType.Line.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketDataType.Line.__enum__ = openfl__$internal_renderer_opengl_utils_BucketDataType;
openfl__$internal_renderer_opengl_utils_BucketDataType.Fill = ["Fill",1];
openfl__$internal_renderer_opengl_utils_BucketDataType.Fill.toString = $estr;
openfl__$internal_renderer_opengl_utils_BucketDataType.Fill.__enum__ = openfl__$internal_renderer_opengl_utils_BucketDataType;
var openfl__$internal_renderer_opengl_utils_GLGraphicsData = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.GLGraphicsData"] = openfl__$internal_renderer_opengl_utils_GLGraphicsData;
openfl__$internal_renderer_opengl_utils_GLGraphicsData.__name__ = true;
var openfl__$internal_renderer_opengl_utils_PolyK = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.PolyK"] = openfl__$internal_renderer_opengl_utils_PolyK;
openfl__$internal_renderer_opengl_utils_PolyK.__name__ = true;
openfl__$internal_renderer_opengl_utils_PolyK.triangulate = function(p) {
	var sign = true;
	var n = p.length >> 1;
	if(n < 3) return [];
	var tgs = [];
	var avl;
	var _g = [];
	var _g1 = 0;
	while(_g1 < n) {
		var i1 = _g1++;
		_g.push(i1);
	}
	avl = _g;
	var i = 0;
	var al = n;
	var earFound = false;
	while(al > 3) {
		var i0 = avl[i % al];
		var i11 = avl[(i + 1) % al];
		var i2 = avl[(i + 2) % al];
		var ax = p[2 * i0];
		var ay = p[2 * i0 + 1];
		var bx = p[2 * i11];
		var by = p[2 * i11 + 1];
		var cx = p[2 * i2];
		var cy = p[2 * i2 + 1];
		earFound = false;
		if(openfl__$internal_renderer_opengl_utils_PolyK._convex(ax,ay,bx,by,cx,cy,sign)) {
			earFound = true;
			var _g11 = 0;
			while(_g11 < al) {
				var j = _g11++;
				var vi = avl[j];
				if(vi == i0 || vi == i11 || vi == i2) continue;
				if(openfl__$internal_renderer_opengl_utils_PolyK._PointInTriangle(p[2 * vi],p[2 * vi + 1],ax,ay,bx,by,cx,cy)) {
					earFound = false;
					break;
				}
			}
		}
		if(earFound) {
			tgs.push(i0);
			tgs.push(i11);
			tgs.push(i2);
			avl.splice((i + 1) % al,1);
			al--;
			i = 0;
		} else if(i++ > 3 * al) {
			if(sign) {
				tgs = [];
				var _g12 = [];
				var _g2 = 0;
				while(_g2 < n) {
					var k = _g2++;
					_g12.push(k);
				}
				avl = _g12;
				i = 0;
				al = n;
				sign = false;
			} else {
				console.log("Warning: shape too complex to fill");
				return [];
			}
		}
	}
	tgs.push(avl[0]);
	tgs.push(avl[1]);
	tgs.push(avl[2]);
	return tgs;
};
openfl__$internal_renderer_opengl_utils_PolyK._PointInTriangle = function(px,py,ax,ay,bx,by,cx,cy) {
	var v0x = cx - ax | 0;
	var v0y = cy - ay | 0;
	var v1x = bx - ax | 0;
	var v1y = by - ay | 0;
	var v2x = px - ax | 0;
	var v2y = py - ay | 0;
	var dot00 = v0x * v0x + v0y * v0y;
	var dot01 = v0x * v1x + v0y * v1y;
	var dot02 = v0x * v2x + v0y * v2y;
	var dot11 = v1x * v1x + v1y * v1y;
	var dot12 = v1x * v2x + v1y * v2y;
	var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
	var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
	var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
	return u >= 0 && v >= 0 && u + v < 1;
};
openfl__$internal_renderer_opengl_utils_PolyK._convex = function(ax,ay,bx,by,cx,cy,sign) {
	return (ay - by) * (cx - bx) + (bx - ax) * (cy - by) >= 0 == sign;
};
var openfl__$internal_renderer_opengl_utils_GraphicType = $hxClasses["openfl._internal.renderer.opengl.utils.GraphicType"] = { __ename__ : true, __constructs__ : ["Polygon","Rectangle","Circle","Ellipse","DrawTriangles","DrawTiles","OverrideMatrix"] };
openfl__$internal_renderer_opengl_utils_GraphicType.Polygon = ["Polygon",0];
openfl__$internal_renderer_opengl_utils_GraphicType.Polygon.toString = $estr;
openfl__$internal_renderer_opengl_utils_GraphicType.Polygon.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType;
openfl__$internal_renderer_opengl_utils_GraphicType.Rectangle = function(rounded) { var $x = ["Rectangle",1,rounded]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType; $x.toString = $estr; return $x; };
openfl__$internal_renderer_opengl_utils_GraphicType.Circle = ["Circle",2];
openfl__$internal_renderer_opengl_utils_GraphicType.Circle.toString = $estr;
openfl__$internal_renderer_opengl_utils_GraphicType.Circle.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType;
openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse = ["Ellipse",3];
openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse.toString = $estr;
openfl__$internal_renderer_opengl_utils_GraphicType.Ellipse.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType;
openfl__$internal_renderer_opengl_utils_GraphicType.DrawTriangles = function(vertices,indices,uvtData,culling,colors,blendMode) { var $x = ["DrawTriangles",4,vertices,indices,uvtData,culling,colors,blendMode]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType; $x.toString = $estr; return $x; };
openfl__$internal_renderer_opengl_utils_GraphicType.DrawTiles = function(sheet,tileData,smooth,flags,count) { var $x = ["DrawTiles",5,sheet,tileData,smooth,flags,count]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType; $x.toString = $estr; return $x; };
openfl__$internal_renderer_opengl_utils_GraphicType.OverrideMatrix = function(matrix) { var $x = ["OverrideMatrix",6,matrix]; $x.__enum__ = openfl__$internal_renderer_opengl_utils_GraphicType; $x.toString = $estr; return $x; };
var openfl__$internal_renderer_opengl_utils_ShaderManager = function(gl) {
	this.setContext(gl);
};
$hxClasses["openfl._internal.renderer.opengl.utils.ShaderManager"] = openfl__$internal_renderer_opengl_utils_ShaderManager;
openfl__$internal_renderer_opengl_utils_ShaderManager.__name__ = true;
openfl__$internal_renderer_opengl_utils_ShaderManager.prototype = {
	setContext: function(gl) {
		this.gl = gl;
		this.defaultShader = new openfl__$internal_renderer_opengl_shaders2_DefaultShader(gl);
		this.fillShader = new openfl__$internal_renderer_opengl_shaders2_FillShader(gl);
		this.patternFillShader = new openfl__$internal_renderer_opengl_shaders2_PatternFillShader(gl);
		this.drawTrianglesShader = new openfl__$internal_renderer_opengl_shaders2_DrawTrianglesShader(gl);
		this.primitiveShader = new openfl__$internal_renderer_opengl_shaders2_PrimitiveShader(gl);
		this.setShader(this.defaultShader,true);
	}
	,setShader: function(shader,force) {
		if(force == null) force = false;
		if(shader == null) {
			this.currentShader = null;
			this.gl.useProgram(null);
			return true;
		}
		if(this.currentShader != null && !force && this.currentShader.ID == shader.ID) return false;
		this.currentShader = shader;
		this.gl.useProgram(shader.program);
		return true;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_ShaderManager
};
var openfl__$internal_renderer_opengl_utils_SpriteBatch = function(gl,maxSprites) {
	if(maxSprites == null) maxSprites = 2000;
	this.lastEnableColor = true;
	this.enableColor = true;
	this.attributes = [];
	this.writtenVertexBytes = 0;
	this.drawing = false;
	this.dirty = true;
	this.states = [];
	this.maxSprites = maxSprites;
	this.attributes.push(new openfl__$internal_renderer_opengl_utils_VertexAttribute(2,5126,false,"aPosition"));
	this.attributes.push(new openfl__$internal_renderer_opengl_utils_VertexAttribute(2,5126,false,"aTexCoord0"));
	this.attributes.push(new openfl__$internal_renderer_opengl_utils_VertexAttribute(4,5121,true,"aColor"));
	this.attributes[2].defaultValue = new Float32Array([1,1,1,1]);
	this.maxElementsPerVertex = 0;
	var _g = 0;
	var _g1 = this.attributes;
	while(_g < _g1.length) {
		var a = _g1[_g];
		++_g;
		this.maxElementsPerVertex += Math.floor(a.components * a.getElementsBytes() / 4);
	}
	this.vertexArraySize = maxSprites * this.maxElementsPerVertex * 4 * 4;
	this.indexArraySize = maxSprites * 6;
	this.vertexArray = new openfl__$internal_renderer_opengl_utils_VertexArray(this.attributes,this.vertexArraySize,false);
	this.positions = new Float32Array(this.vertexArray.buffer);
	this.colors = new Uint32Array(this.vertexArray.buffer);
	this.indices = new Uint16Array(this.indexArraySize);
	var i = 0;
	var j = 0;
	while(i < this.indexArraySize) {
		this.indices[i] = j;
		this.indices[i + 1] = j + 1;
		this.indices[i + 2] = j + 2;
		this.indices[i + 3] = j;
		this.indices[i + 4] = j + 2;
		this.indices[i + 5] = j + 3;
		i += 6;
		j += 4;
	}
	this.currentState = new openfl__$internal_renderer_opengl_utils__$SpriteBatch_State();
	this.dirty = true;
	this.drawing = false;
	this.batchedSprites = 0;
	this.setContext(gl);
};
$hxClasses["openfl._internal.renderer.opengl.utils.SpriteBatch"] = openfl__$internal_renderer_opengl_utils_SpriteBatch;
openfl__$internal_renderer_opengl_utils_SpriteBatch.__name__ = true;
openfl__$internal_renderer_opengl_utils_SpriteBatch.prototype = {
	begin: function(renderSession,clipRect) {
		this.renderSession = renderSession;
		this.shader = renderSession.shaderManager.defaultShader;
		this.drawing = true;
		this.start(clipRect);
	}
	,finish: function() {
		this.flush();
		this.clipRect = null;
		this.drawing = false;
	}
	,start: function(clipRect) {
		if(!this.drawing) throw new js__$Boot_HaxeError("Call Spritebatch.begin() before start()");
		this.dirty = true;
		this.clipRect = clipRect;
	}
	,stop: function() {
		this.flush();
	}
	,renderBitmapData: function(bitmapData,smoothing,matrix,ct,alpha,blendMode,pixelSnapping) {
		if(alpha == null) alpha = 1;
		if(bitmapData == null) return;
		var texture = bitmapData.getTexture(this.gl);
		if(this.batchedSprites >= this.maxSprites) this.flush();
		var uvs = bitmapData.__uvData;
		if(uvs == null) return;
		var color = ((alpha * 255 | 0) & 255) << 24 | 16777215;
		this.enableColor = true;
		if(this.enableColor != this.lastEnableColor) {
			this.flush();
			this.lastEnableColor = this.enableColor;
		}
		this.attributes[2].enabled = this.lastEnableColor;
		this.elementsPerVertex = this.getElementsPerVertex();
		var index = this.batchedSprites * 4 * this.elementsPerVertex;
		this.fillVertices(index,bitmapData.width,bitmapData.height,matrix,uvs,null,color,pixelSnapping);
		this.setState(this.batchedSprites,texture,smoothing,blendMode,ct,true);
		this.batchedSprites++;
	}
	,renderTiles: function(object,sheet,tileData,smooth,flags,count) {
		if(count == null) count = -1;
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		var texture = sheet.__bitmap.getTexture(this.gl);
		if(texture == null) return;
		var useScale = (flags & 1) > 0;
		var useRotation = (flags & 2) > 0;
		var useTransform = (flags & 16) > 0;
		var useRGB = (flags & 4) > 0;
		var useAlpha = (flags & 8) > 0;
		var useRect = (flags & 32) > 0;
		var useOrigin = (flags & 64) > 0;
		var blendMode;
		var _g = flags & 983040;
		switch(_g) {
		case 65536:
			blendMode = openfl_display_BlendMode.ADD;
			break;
		case 131072:
			blendMode = openfl_display_BlendMode.MULTIPLY;
			break;
		case 262144:
			blendMode = openfl_display_BlendMode.SCREEN;
			break;
		default:
			blendMode = openfl_display_BlendMode.NORMAL;
		}
		if(useTransform) {
			useScale = false;
			useRotation = false;
		}
		var scaleIndex = 0;
		var rotationIndex = 0;
		var rgbIndex = 0;
		var alphaIndex = 0;
		var transformIndex = 0;
		var numValues = 3;
		if(useRect) if(useOrigin) numValues = 8; else numValues = 6;
		if(useScale) {
			scaleIndex = numValues;
			numValues++;
		}
		if(useRotation) {
			rotationIndex = numValues;
			numValues++;
		}
		if(useTransform) {
			transformIndex = numValues;
			numValues += 4;
		}
		if(useRGB) {
			rgbIndex = numValues;
			numValues += 3;
		}
		if(useAlpha) {
			alphaIndex = numValues;
			numValues++;
		}
		var totalCount = tileData.length;
		if(count >= 0 && totalCount > count) totalCount = count;
		var itemCount = totalCount / numValues | 0;
		var iIndex = 0;
		var tileID = -1;
		var rect = sheet.__rectTile;
		var tileUV = sheet.__rectUV;
		var center = sheet.__point;
		var x = 0.0;
		var y = 0.0;
		var alpha = 1.0;
		var tint = 16777215;
		var color = -1;
		var scale = 1.0;
		var rotation = 0.0;
		var cosTheta = 1.0;
		var sinTheta = 0.0;
		var a = 0.0;
		var b = 0.0;
		var c = 0.0;
		var d = 0.0;
		var tx = 0.0;
		var ty = 0.0;
		var ox = 0.0;
		var oy = 0.0;
		var matrix = new openfl_geom_Matrix();
		var oMatrix = object.__worldTransform;
		var uvs = new openfl_display_TextureUvs();
		var bIndex = 0;
		this.enableColor = true;
		if(this.enableColor != this.lastEnableColor) {
			this.flush();
			this.lastEnableColor = this.enableColor;
		}
		this.attributes[2].enabled = this.lastEnableColor;
		this.elementsPerVertex = this.getElementsPerVertex();
		while(iIndex < totalCount) {
			if(this.batchedSprites >= this.maxSprites) this.flush();
			x = tileData[iIndex];
			y = tileData[iIndex + 1];
			if(useRect) {
				tileID = -1;
				rect.x = tileData[iIndex + 2];
				rect.y = tileData[iIndex + 3];
				rect.width = tileData[iIndex + 4];
				rect.height = tileData[iIndex + 5];
				if(useOrigin) {
					center.x = tileData[iIndex + 6];
					center.y = tileData[iIndex + 7];
				} else {
					center.x = 0;
					center.y = 0;
				}
				tileUV.setTo(rect.get_left() / sheet.__bitmap.width,rect.get_top() / sheet.__bitmap.height,rect.get_right() / sheet.__bitmap.width,rect.get_bottom() / sheet.__bitmap.height);
			} else {
				tileID = (tileData[iIndex + 2] == null?0:tileData[iIndex + 2]) | 0;
				rect = sheet.__tileRects[tileID];
				center = sheet.__centerPoints[tileID];
				tileUV = sheet.__tileUVs[tileID];
			}
			if(rect != null && rect.width > 0 && rect.height > 0 && center != null) {
				alpha = 1;
				tint = 16777215;
				a = 1;
				b = 0;
				c = 0;
				d = 1;
				tx = 0;
				ty = 0;
				scale = 1.0;
				rotation = 0.0;
				cosTheta = 1.0;
				sinTheta = 0.0;
				matrix.identity();
				if(useAlpha) alpha = tileData[iIndex + alphaIndex] * object.__worldAlpha; else alpha = object.__worldAlpha;
				if(useRGB) tint = (tileData[iIndex + rgbIndex] * 255 | 0) << 16 | (tileData[iIndex + rgbIndex + 1] * 255 | 0) << 8 | (tileData[iIndex + rgbIndex + 2] * 255 | 0);
				if(useScale) scale = tileData[iIndex + scaleIndex];
				if(useRotation) {
					rotation = tileData[iIndex + rotationIndex];
					cosTheta = Math.cos(rotation);
					sinTheta = Math.sin(rotation);
				}
				if(useTransform) {
					a = tileData[iIndex + transformIndex];
					b = tileData[iIndex + transformIndex + 1];
					c = tileData[iIndex + transformIndex + 2];
					d = tileData[iIndex + transformIndex + 3];
				} else {
					a = scale * cosTheta;
					b = scale * sinTheta;
					c = -b;
					d = a;
				}
				ox = center.x * a + center.y * c;
				oy = center.x * b + center.y * d;
				tx = x - ox;
				ty = y - oy;
				matrix.a = a * oMatrix.a + b * oMatrix.c;
				matrix.b = a * oMatrix.b + b * oMatrix.d;
				matrix.c = c * oMatrix.a + d * oMatrix.c;
				matrix.d = c * oMatrix.b + d * oMatrix.d;
				matrix.tx = tx * oMatrix.a + ty * oMatrix.c + oMatrix.tx;
				matrix.ty = tx * oMatrix.b + ty * oMatrix.d + oMatrix.ty;
				uvs.x0 = tileUV.x;
				uvs.y0 = tileUV.y;
				uvs.x1 = tileUV.width;
				uvs.y1 = tileUV.y;
				uvs.x2 = tileUV.width;
				uvs.y2 = tileUV.height;
				uvs.x3 = tileUV.x;
				uvs.y3 = tileUV.height;
				bIndex = this.batchedSprites * 4 * this.elementsPerVertex;
				color = ((alpha * 255 | 0) & 255) << 24 | (tint & 255) << 16 | (tint >> 8 & 255) << 8 | tint >> 16 & 255;
				this.fillVertices(bIndex,rect.width,rect.height,matrix,uvs,null,color,openfl_display_PixelSnapping.NEVER);
				this.setState(this.batchedSprites,texture,smooth,blendMode,object.__worldColorTransform,false);
				this.batchedSprites++;
			}
			iIndex += numValues;
		}
	}
	,fillVertices: function(index,width,height,matrix,uvs,pivot,color,pixelSnapping) {
		if(color == null) color = -1;
		var w0;
		var w1;
		var h0;
		var h1;
		if(pivot == null) {
			w0 = width;
			w1 = 0;
			h0 = height;
			h1 = 0;
		} else {
			w0 = width * (1 - pivot.x);
			w1 = width * -pivot.x;
			h0 = height * (1 - pivot.y);
			h1 = height * -pivot.y;
		}
		if(pixelSnapping == null) pixelSnapping = openfl_display_PixelSnapping.NEVER;
		var snap = pixelSnapping != openfl_display_PixelSnapping.NEVER;
		var a = matrix.a;
		var b = matrix.b;
		var c = matrix.c;
		var d = matrix.d;
		var tx = matrix.tx;
		var ty = matrix.ty;
		var cOffsetIndex = 0;
		if(!snap) {
			this.positions[index++] = a * w1 + c * h1 + tx;
			this.positions[index++] = d * h1 + b * w1 + ty;
		} else {
			this.positions[index++] = Math.round(a * w1 + c * h1 + tx);
			this.positions[index++] = Math.round(d * h1 + b * w1 + ty);
		}
		this.positions[index++] = uvs.x0;
		this.positions[index++] = uvs.y0;
		if(this.enableColor) this.colors[index++] = color;
		if(!snap) {
			this.positions[index++] = a * w0 + c * h1 + tx;
			this.positions[index++] = d * h1 + b * w0 + ty;
		} else {
			this.positions[index++] = Math.round(a * w0 + c * h1 + tx);
			this.positions[index++] = Math.round(d * h1 + b * w0 + ty);
		}
		this.positions[index++] = uvs.x1;
		this.positions[index++] = uvs.y1;
		if(this.enableColor) this.colors[index++] = color;
		if(!snap) {
			this.positions[index++] = a * w0 + c * h0 + tx;
			this.positions[index++] = d * h0 + b * w0 + ty;
		} else {
			this.positions[index++] = Math.round(a * w0 + c * h0 + tx);
			this.positions[index++] = Math.round(d * h0 + b * w0 + ty);
		}
		this.positions[index++] = uvs.x2;
		this.positions[index++] = uvs.y2;
		if(this.enableColor) this.colors[index++] = color;
		if(!snap) {
			this.positions[index++] = a * w1 + c * h0 + tx;
			this.positions[index++] = d * h0 + b * w1 + ty;
		} else {
			this.positions[index++] = Math.round(a * w1 + c * h0 + tx);
			this.positions[index++] = Math.round(d * h0 + b * w1 + ty);
		}
		this.positions[index++] = uvs.x3;
		this.positions[index++] = uvs.y3;
		if(this.enableColor) this.colors[index++] = color;
		this.writtenVertexBytes = index;
	}
	,flush: function() {
		if(this.batchedSprites == 0) return;
		if(this.clipRect == null) this.gl.disable(this.gl.SCISSOR_TEST); else {
			this.gl.enable(this.gl.SCISSOR_TEST);
			this.gl.scissor(Math.floor(this.clipRect.x),Math.floor(this.clipRect.y),Math.floor(this.clipRect.width),Math.floor(this.clipRect.height));
		}
		if(this.dirty) {
			this.dirty = false;
			this.gl.activeTexture(this.gl.TEXTURE0);
			this.vertexArray.bind();
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
		}
		if(this.writtenVertexBytes > this.vertexArraySize * 0.5) this.vertexArray.upload(this.positions); else {
			var view = this.positions.subarray(0,this.writtenVertexBytes);
			this.vertexArray.upload(view);
		}
		var nextState;
		var batchSize = 0;
		var start = 0;
		this.currentState.shader = this.renderSession.shaderManager.defaultShader;
		this.currentState.texture = null;
		this.currentState.textureSmooth = false;
		this.currentState.blendMode = this.renderSession.blendModeManager.currentBlendMode;
		this.currentState.colorTransform = null;
		this.currentState.skipColorTransformAlpha = false;
		var _g1 = 0;
		var _g = this.batchedSprites;
		while(_g1 < _g) {
			var i = _g1++;
			nextState = this.states[i];
			this.currentState.skipColorTransformAlpha = nextState.skipColorTransformAlpha;
			if(!nextState.equals(this.currentState)) {
				this.renderBatch(this.currentState,batchSize,start);
				start = i;
				batchSize = 0;
				this.currentState.shader = nextState.shader;
				this.currentState.texture = nextState.texture;
				this.currentState.textureSmooth = nextState.textureSmooth;
				this.currentState.blendMode = nextState.blendMode;
				this.currentState.colorTransform = nextState.colorTransform;
			}
			batchSize++;
		}
		this.renderBatch(this.currentState,batchSize,start);
		this.batchedSprites = 0;
		this.writtenVertexBytes = 0;
		if(this.clipRect != null) this.gl.disable(this.gl.SCISSOR_TEST);
	}
	,renderBatch: function(state,size,start) {
		if(size == 0 || state.texture == null) return;
		var shader;
		if(state.shader == null) shader = this.renderSession.shaderManager.defaultShader; else shader = state.shader;
		this.renderSession.shaderManager.setShader(shader);
		shader.bindVertexArray(this.vertexArray);
		this.gl.uniformMatrix3fv(shader.getUniformLocation("uProjectionMatrix"),false,this.renderSession.projectionMatrix.toArray(true));
		if(state.colorTransform != null) {
			var ct = state.colorTransform;
			this.gl.uniform4f(shader.getUniformLocation("uColorMultiplier"),ct.redMultiplier,ct.greenMultiplier,ct.blueMultiplier,state.skipColorTransformAlpha?1:ct.alphaMultiplier);
			this.gl.uniform4f(shader.getUniformLocation("uColorOffset"),ct.redOffset / 255.,ct.greenOffset / 255.,ct.blueOffset / 255.,ct.alphaOffset / 255.);
		} else {
			this.gl.uniform4f(shader.getUniformLocation("uColorMultiplier"),1,1,1,1);
			this.gl.uniform4f(shader.getUniformLocation("uColorOffset"),0,0,0,0);
		}
		this.renderSession.blendModeManager.setBlendMode(state.blendMode);
		this.gl.bindTexture(this.gl.TEXTURE_2D,state.texture);
		if(state.textureSmooth) {
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR);
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR);
		} else {
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST);
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST);
		}
		this.gl.drawElements(this.gl.TRIANGLES,size * 6,this.gl.UNSIGNED_SHORT,start * 6 * 2);
		this.renderSession.drawCount++;
	}
	,setState: function(index,texture,smooth,blendMode,colorTransform,skipAlpha) {
		if(skipAlpha == null) skipAlpha = false;
		if(smooth == null) smooth = false;
		var state = this.states[index];
		if(state == null) state = this.states[index] = new openfl__$internal_renderer_opengl_utils__$SpriteBatch_State();
		state.texture = texture;
		state.textureSmooth = smooth;
		state.blendMode = blendMode;
		state.colorTransform = colorTransform;
		state.skipColorTransformAlpha = skipAlpha;
	}
	,setContext: function(gl) {
		this.gl = gl;
		this.vertexArray.setContext(gl,this.positions);
		this.indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.indices,gl.STATIC_DRAW);
	}
	,getElementsPerVertex: function() {
		var r = 0;
		var _g = 0;
		var _g1 = this.attributes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(a.enabled) r += Math.floor(a.components * a.getElementsBytes() / 4);
		}
		return r;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_SpriteBatch
};
var openfl__$internal_renderer_opengl_utils__$SpriteBatch_State = function() {
	this.skipColorTransformAlpha = false;
	this.textureSmooth = true;
};
$hxClasses["openfl._internal.renderer.opengl.utils._SpriteBatch.State"] = openfl__$internal_renderer_opengl_utils__$SpriteBatch_State;
openfl__$internal_renderer_opengl_utils__$SpriteBatch_State.__name__ = true;
openfl__$internal_renderer_opengl_utils__$SpriteBatch_State.prototype = {
	equals: function(other) {
		return (this.shader == null || other.shader == null || this.shader.ID == other.shader.ID) && this.texture == other.texture && this.textureSmooth == other.textureSmooth && this.blendMode == other.blendMode && (this.colorTransform != null && this.colorTransform.__equals(other.colorTransform,this.skipColorTransformAlpha));
	}
	,__class__: openfl__$internal_renderer_opengl_utils__$SpriteBatch_State
};
var openfl__$internal_renderer_opengl_utils_StencilManager = function(gl) {
	this.stencilMask = 0;
	this.stencilStack = [];
	this.setContext(gl);
	this.reverse = true;
	this.count = 0;
};
$hxClasses["openfl._internal.renderer.opengl.utils.StencilManager"] = openfl__$internal_renderer_opengl_utils_StencilManager;
openfl__$internal_renderer_opengl_utils_StencilManager.__name__ = true;
openfl__$internal_renderer_opengl_utils_StencilManager.prototype = {
	prepareGraphics: function(fill,renderSession,translationMatrix) {
		var shader = renderSession.shaderManager.fillShader;
		renderSession.shaderManager.setShader(shader);
		this.gl.uniformMatrix3fv(shader.getUniformLocation("uTranslationMatrix"),false,translationMatrix);
		this.gl.uniformMatrix3fv(shader.getUniformLocation("uProjectionMatrix"),false,renderSession.projectionMatrix.toArray(true));
		fill.vertexArray.bind();
		shader.bindVertexArray(fill.vertexArray);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,fill.indexBuffer);
	}
	,pushBucket: function(bucket,renderSession,translationMatrix,isMask) {
		if(isMask == null) isMask = false;
		if(!isMask) {
			this.gl.enable(this.gl.STENCIL_TEST);
			this.gl.clear(this.gl.STENCIL_BUFFER_BIT);
			this.gl.stencilMask(255);
			this.gl.colorMask(false,false,false,false);
			this.gl.stencilFunc(this.gl.NEVER,1,255);
			this.gl.stencilOp(this.gl.INVERT,this.gl.KEEP,this.gl.KEEP);
			this.gl.clear(this.gl.STENCIL_BUFFER_BIT);
		}
		var _g = 0;
		var _g1 = bucket.fills;
		while(_g < _g1.length) {
			var fill = _g1[_g];
			++_g;
			if(fill.available) continue;
			this.prepareGraphics(fill,renderSession,translationMatrix);
			this.gl.drawElements(fill.drawMode,fill.glIndices.length,this.gl.UNSIGNED_SHORT,0);
		}
		if(!isMask) {
			this.gl.colorMask(true,true,true,renderSession.renderer.transparent);
			this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.KEEP);
			this.gl.stencilFunc(this.gl.EQUAL,255,255);
		}
	}
	,popBucket: function(object,bucket,renderSession) {
		this.gl.disable(this.gl.STENCIL_TEST);
	}
	,pushMask: function(object,renderSession) {
		var maskGraphics = object.__maskGraphics;
		if(maskGraphics == null || maskGraphics.__commands.length <= 0) return;
		if(this.stencilMask == 0) {
			this.gl.enable(this.gl.STENCIL_TEST);
			this.gl.clear(this.gl.STENCIL_BUFFER_BIT);
		}
		this.stencilMask++;
		if(maskGraphics.__dirty) openfl__$internal_renderer_opengl_utils_GraphicsRenderer.updateGraphics(object,maskGraphics,renderSession.gl);
		var func;
		if(this.stencilMask == 1) func = this.gl.NEVER; else func = this.gl.EQUAL;
		var ref = this.stencilMask;
		var mask = 255 - this.stencilMask;
		this.gl.stencilMask(255);
		this.gl.colorMask(false,false,false,false);
		this.gl.stencilFunc(func,ref,mask);
		this.gl.stencilOp(this.gl.REPLACE,this.gl.KEEP,this.gl.KEEP);
		var glStack = maskGraphics.__glStack[openfl__$internal_renderer_opengl_GLRenderer.glContextId];
		var bucket;
		var translationMatrix = object.__worldTransform;
		var _g1 = 0;
		var _g = glStack.buckets.length;
		while(_g1 < _g) {
			var i = _g1++;
			bucket = glStack.buckets[i];
			if(bucket.overrideMatrix != null) translationMatrix = bucket.overrideMatrix; else translationMatrix = object.__worldTransform;
			var _g2 = bucket.mode;
			switch(_g2[1]) {
			case 1:case 2:
				this.pushBucket(bucket,renderSession,translationMatrix.toArray(true),true);
				break;
			default:
			}
		}
		this.gl.colorMask(true,true,true,renderSession.renderer.transparent);
		this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.KEEP);
		this.gl.stencilFunc(this.gl.EQUAL,this.stencilMask,255);
	}
	,popMask: function(object,renderSession) {
		this.stencilMask--;
		if(this.stencilMask <= 0) {
			this.gl.disable(this.gl.STENCIL_TEST);
			this.stencilMask = 0;
		}
	}
	,setContext: function(gl) {
		this.gl = gl;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_StencilManager
};
var openfl__$internal_renderer_opengl_utils_VertexArray = function(attributes,size,isStatic) {
	if(isStatic == null) isStatic = false;
	if(size == null) size = 0;
	this.isStatic = false;
	this.size = 0;
	this.attributes = [];
	this.size = size;
	this.attributes = attributes;
	if(size > 0) this.buffer = new ArrayBuffer(size);
	this.isStatic = isStatic;
};
$hxClasses["openfl._internal.renderer.opengl.utils.VertexArray"] = openfl__$internal_renderer_opengl_utils_VertexArray;
openfl__$internal_renderer_opengl_utils_VertexArray.__name__ = true;
openfl__$internal_renderer_opengl_utils_VertexArray.prototype = {
	bind: function() {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.glBuffer);
	}
	,upload: function(view) {
		this.gl.bufferSubData(this.gl.ARRAY_BUFFER,0,view);
	}
	,setContext: function(gl,view) {
		this.gl = gl;
		this.glBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,this.glBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,view,this.isStatic?gl.STATIC_DRAW:gl.DYNAMIC_DRAW);
	}
	,get_stride: function() {
		var s = 0;
		var _g = 0;
		var _g1 = this.attributes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(a.enabled) s += Math.floor(a.components * a.getElementsBytes() / 4) * 4;
		}
		return s;
	}
	,__class__: openfl__$internal_renderer_opengl_utils_VertexArray
	,__properties__: {get_stride:"get_stride"}
};
var openfl_display_Bitmap = function(bitmapData,pixelSnapping,smoothing) {
	if(smoothing == null) smoothing = false;
	openfl_display_DisplayObjectContainer.call(this);
	this.bitmapData = bitmapData;
	this.pixelSnapping = pixelSnapping;
	this.smoothing = smoothing;
	if(pixelSnapping == null) this.pixelSnapping = openfl_display_PixelSnapping.AUTO;
};
$hxClasses["openfl.display.Bitmap"] = openfl_display_Bitmap;
openfl_display_Bitmap.__name__ = true;
openfl_display_Bitmap.__super__ = openfl_display_DisplayObjectContainer;
openfl_display_Bitmap.prototype = $extend(openfl_display_DisplayObjectContainer.prototype,{
	__getBounds: function(rect,matrix) {
		if(this.bitmapData != null) {
			var bounds = new openfl_geom_Rectangle(0,0,this.bitmapData.width,this.bitmapData.height);
			bounds = bounds.transform(matrix);
			rect.__expand(bounds.x,bounds.y,bounds.width,bounds.height);
		}
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || this.bitmapData == null) return false;
		var point = this.globalToLocal(new openfl_geom_Point(x,y));
		if(point.x > 0 && point.y > 0 && point.x <= this.bitmapData.width && point.y <= this.bitmapData.height) {
			if(stack != null && !interactiveOnly) stack.push(this);
			return true;
		}
		return false;
	}
	,__renderCairo: function(renderSession) {
		openfl__$internal_renderer_cairo_CairoBitmap.render(this,renderSession);
	}
	,__renderCairoMask: function(renderSession) {
		renderSession.cairo.rectangle(0,0,this.get_width(),this.get_height());
	}
	,__renderCanvas: function(renderSession) {
		openfl__$internal_renderer_canvas_CanvasBitmap.render(this,renderSession);
	}
	,__renderCanvasMask: function(renderSession) {
		renderSession.context.rect(0,0,this.get_width(),this.get_height());
	}
	,__renderDOM: function(renderSession) {
		if(this.stage != null && this.__worldVisible && this.__renderable && this.bitmapData != null && this.bitmapData.__isValid) {
			if(this.bitmapData.__image.buffer.__srcImage != null) openfl__$internal_renderer_dom_DOMBitmap.renderImage(this,renderSession); else openfl__$internal_renderer_dom_DOMBitmap.renderCanvas(this,renderSession);
		} else {
			if(this.__image != null) {
				renderSession.element.removeChild(this.__image);
				this.__image = null;
				this.__style = null;
			}
			if(this.__canvas != null) {
				renderSession.element.removeChild(this.__canvas);
				this.__canvas = null;
				this.__style = null;
			}
		}
	}
	,__renderGL: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0 || this.bitmapData == null || !this.bitmapData.__isValid) null; else renderSession.spriteBatch.renderBitmapData(this.bitmapData,this.smoothing,this.__worldTransform,this.__worldColorTransform,this.__worldAlpha,this.blendMode,this.pixelSnapping);
	}
	,__updateMask: function(maskGraphics) {
		maskGraphics.__commands.push(openfl_display_DrawCommand.OverrideMatrix(this.__worldTransform));
		maskGraphics.beginFill(0);
		maskGraphics.drawRect(0,0,this.bitmapData.width,this.bitmapData.height);
		if(maskGraphics.__bounds == null) maskGraphics.__bounds = new openfl_geom_Rectangle();
		this.__getBounds(maskGraphics.__bounds,openfl_geom_Matrix.__identity);
		openfl_display_DisplayObjectContainer.prototype.__updateMask.call(this,maskGraphics);
	}
	,get_height: function() {
		if(this.bitmapData != null) return this.bitmapData.height * this.get_scaleY();
		return 0;
	}
	,get_width: function() {
		if(this.bitmapData != null) return this.bitmapData.width * this.get_scaleX();
		return 0;
	}
	,__class__: openfl_display_Bitmap
});
var openfl_display_TextureUvs = function() {
	this.y3 = 0;
	this.y2 = 0;
	this.y1 = 0;
	this.y0 = 0;
	this.x3 = 0;
	this.x2 = 0;
	this.x1 = 0;
	this.x0 = 0;
};
$hxClasses["openfl.display.TextureUvs"] = openfl_display_TextureUvs;
openfl_display_TextureUvs.__name__ = true;
openfl_display_TextureUvs.prototype = {
	__class__: openfl_display_TextureUvs
};
var openfl_display_BlendMode = $hxClasses["openfl.display.BlendMode"] = { __ename__ : true, __constructs__ : ["ADD","ALPHA","DARKEN","DIFFERENCE","ERASE","HARDLIGHT","INVERT","LAYER","LIGHTEN","MULTIPLY","NORMAL","OVERLAY","SCREEN","SUBTRACT"] };
openfl_display_BlendMode.ADD = ["ADD",0];
openfl_display_BlendMode.ADD.toString = $estr;
openfl_display_BlendMode.ADD.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.ALPHA = ["ALPHA",1];
openfl_display_BlendMode.ALPHA.toString = $estr;
openfl_display_BlendMode.ALPHA.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.DARKEN = ["DARKEN",2];
openfl_display_BlendMode.DARKEN.toString = $estr;
openfl_display_BlendMode.DARKEN.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.DIFFERENCE = ["DIFFERENCE",3];
openfl_display_BlendMode.DIFFERENCE.toString = $estr;
openfl_display_BlendMode.DIFFERENCE.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.ERASE = ["ERASE",4];
openfl_display_BlendMode.ERASE.toString = $estr;
openfl_display_BlendMode.ERASE.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.HARDLIGHT = ["HARDLIGHT",5];
openfl_display_BlendMode.HARDLIGHT.toString = $estr;
openfl_display_BlendMode.HARDLIGHT.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.INVERT = ["INVERT",6];
openfl_display_BlendMode.INVERT.toString = $estr;
openfl_display_BlendMode.INVERT.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.LAYER = ["LAYER",7];
openfl_display_BlendMode.LAYER.toString = $estr;
openfl_display_BlendMode.LAYER.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.LIGHTEN = ["LIGHTEN",8];
openfl_display_BlendMode.LIGHTEN.toString = $estr;
openfl_display_BlendMode.LIGHTEN.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.MULTIPLY = ["MULTIPLY",9];
openfl_display_BlendMode.MULTIPLY.toString = $estr;
openfl_display_BlendMode.MULTIPLY.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.NORMAL = ["NORMAL",10];
openfl_display_BlendMode.NORMAL.toString = $estr;
openfl_display_BlendMode.NORMAL.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.OVERLAY = ["OVERLAY",11];
openfl_display_BlendMode.OVERLAY.toString = $estr;
openfl_display_BlendMode.OVERLAY.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.SCREEN = ["SCREEN",12];
openfl_display_BlendMode.SCREEN.toString = $estr;
openfl_display_BlendMode.SCREEN.__enum__ = openfl_display_BlendMode;
openfl_display_BlendMode.SUBTRACT = ["SUBTRACT",13];
openfl_display_BlendMode.SUBTRACT.toString = $estr;
openfl_display_BlendMode.SUBTRACT.__enum__ = openfl_display_BlendMode;
var openfl_display_CapsStyle = $hxClasses["openfl.display.CapsStyle"] = { __ename__ : true, __constructs__ : ["NONE","ROUND","SQUARE"] };
openfl_display_CapsStyle.NONE = ["NONE",0];
openfl_display_CapsStyle.NONE.toString = $estr;
openfl_display_CapsStyle.NONE.__enum__ = openfl_display_CapsStyle;
openfl_display_CapsStyle.ROUND = ["ROUND",1];
openfl_display_CapsStyle.ROUND.toString = $estr;
openfl_display_CapsStyle.ROUND.__enum__ = openfl_display_CapsStyle;
openfl_display_CapsStyle.SQUARE = ["SQUARE",2];
openfl_display_CapsStyle.SQUARE.toString = $estr;
openfl_display_CapsStyle.SQUARE.__enum__ = openfl_display_CapsStyle;
var openfl_text_TextField = function() {
	openfl_display_InteractiveObject.call(this);
	this.__width = 100;
	this.__height = 100;
	this.__text = "";
	this.set_type(openfl_text_TextFieldType.DYNAMIC);
	this.set_autoSize(openfl_text_TextFieldAutoSize.NONE);
	this.displayAsPassword = false;
	this.embedFonts = false;
	this.set_selectable(true);
	this.set_borderColor(0);
	this.set_border(false);
	this.set_backgroundColor(16777215);
	this.set_background(false);
	this.gridFitType = openfl_text_GridFitType.PIXEL;
	this.maxChars = 0;
	this.multiline = false;
	this.sharpness = 0;
	this.scrollH = 0;
	this.scrollV = 1;
	this.set_wordWrap(false);
	if(openfl_text_TextField.__defaultTextFormat == null) {
		openfl_text_TextField.__defaultTextFormat = new openfl_text_TextFormat("Times New Roman",12,0,false,false,false,"","",openfl_text_TextFormatAlign.LEFT,0,0,0,0);
		openfl_text_TextField.__defaultTextFormat.blockIndent = 0;
		openfl_text_TextField.__defaultTextFormat.bullet = false;
		openfl_text_TextField.__defaultTextFormat.letterSpacing = 0;
		openfl_text_TextField.__defaultTextFormat.kerning = false;
	}
	this.__textFormat = openfl_text_TextField.__defaultTextFormat.clone();
};
$hxClasses["openfl.text.TextField"] = openfl_text_TextField;
openfl_text_TextField.__name__ = true;
openfl_text_TextField.__defaultTextFormat = null;
openfl_text_TextField.__super__ = openfl_display_InteractiveObject;
openfl_text_TextField.prototype = $extend(openfl_display_InteractiveObject.prototype,{
	getLineMetrics: function(lineIndex) {
		var height = this.get_textHeight();
		var lineWidth = this.__getLineWidth(lineIndex);
		var lineHeight = this.__getLineMetric(lineIndex,2);
		var ascender = this.__getLineMetric(lineIndex,0);
		var descender = this.__getLineMetric(lineIndex,1);
		var leading = this.__getLineMetric(lineIndex,3);
		var margin;
		var _g = this.__textFormat.align;
		switch(_g[1]) {
		case 0:case 2:
			margin = 2;
			break;
		case 1:
			margin = this.get_width() - lineWidth - 2;
			break;
		case 3:
			margin = (this.get_width() - lineWidth) / 2;
			break;
		}
		return new openfl_text_TextLineMetrics(margin,lineWidth,lineHeight,ascender,descender,leading);
	}
	,setTextFormat: function(format,beginIndex,endIndex) {
		if(endIndex == null) endIndex = 0;
		if(beginIndex == null) beginIndex = 0;
		if(format.font != null) this.__textFormat.font = format.font;
		if(format.size != null) this.__textFormat.size = format.size;
		if(format.color != null) this.__textFormat.color = format.color;
		if(format.bold != null) this.__textFormat.bold = format.bold;
		if(format.italic != null) this.__textFormat.italic = format.italic;
		if(format.underline != null) this.__textFormat.underline = format.underline;
		if(format.url != null) this.__textFormat.url = format.url;
		if(format.target != null) this.__textFormat.target = format.target;
		if(format.align != null) this.__textFormat.align = format.align;
		if(format.leftMargin != null) this.__textFormat.leftMargin = format.leftMargin;
		if(format.rightMargin != null) this.__textFormat.rightMargin = format.rightMargin;
		if(format.indent != null) this.__textFormat.indent = format.indent;
		if(format.leading != null) this.__textFormat.leading = format.leading;
		if(format.blockIndent != null) this.__textFormat.blockIndent = format.blockIndent;
		if(format.bullet != null) this.__textFormat.bullet = format.bullet;
		if(format.kerning != null) this.__textFormat.kerning = format.kerning;
		if(format.letterSpacing != null) this.__textFormat.letterSpacing = format.letterSpacing;
		if(format.tabStops != null) this.__textFormat.tabStops = format.tabStops;
		this.__dirty = true;
	}
	,__disableInputMode: function() {
		this.this_onRemovedFromStage(null);
	}
	,__enableInputMode: function() {
		this.__cursorPosition = -1;
		if(this.__hiddenInput == null) {
			this.__hiddenInput = window.document.createElement("input");
			this.__hiddenInput.type = "text";
			this.__hiddenInput.style.position = "absolute";
			this.__hiddenInput.style.opacity = "0";
			this.__hiddenInput.style.color = "transparent";
			this.__hiddenInput.style.left = "0px";
			this.__hiddenInput.style.top = "50%";
			if(new EReg("(iPad|iPhone|iPod).*OS 8_","gi").match(window.navigator.userAgent)) {
				this.__hiddenInput.style.fontSize = "0px";
				this.__hiddenInput.style.width = "0px";
				this.__hiddenInput.style.height = "0px";
			} else {
				this.__hiddenInput.style.width = "1px";
				this.__hiddenInput.style.height = "1px";
			}
			this.__hiddenInput.style.pointerEvents = "none";
			this.__hiddenInput.style.zIndex = "-10000000";
			if(this.maxChars > 0) this.__hiddenInput.maxLength = this.maxChars;
			window.document.body.appendChild(this.__hiddenInput);
			this.__hiddenInput.value = this.__text;
		}
		if(this.stage != null) this.this_onAddedToStage(null); else {
			this.addEventListener(openfl_events_Event.ADDED_TO_STAGE,$bind(this,this.this_onAddedToStage));
			this.addEventListener(openfl_events_Event.REMOVED_FROM_STAGE,$bind(this,this.this_onRemovedFromStage));
		}
	}
	,__getBounds: function(rect,matrix) {
		var bounds = new openfl_geom_Rectangle(0,0,this.__width,this.__height);
		bounds = bounds.transform(matrix);
		rect.__expand(bounds.x,bounds.y,bounds.width,bounds.height);
	}
	,__getCursor: function() {
		if(this.type == openfl_text_TextFieldType.INPUT && this.selectable) return lime_ui_MouseCursor.TEXT; else return null;
	}
	,__getFont: function(format) {
		var font;
		if(format.italic) font = "italic "; else font = "normal ";
		font += "normal ";
		if(format.bold) font += "bold "; else font += "normal ";
		font += format.size + "px";
		font += "/" + (format.size + format.leading) + "px ";
		font += "'" + (function($this) {
			var $r;
			var _g = format.font;
			$r = (function($this) {
				var $r;
				switch(_g) {
				case "_sans":
					$r = "sans-serif";
					break;
				case "_serif":
					$r = "serif";
					break;
				case "_typewriter":
					$r = "monospace";
					break;
				default:
					$r = format.font;
				}
				return $r;
			}($this));
			return $r;
		}(this));
		font += "'";
		return font;
	}
	,__getFontInstance: function(format) {
		return null;
	}
	,__getLineBreakIndeces: function() {
		var breaks = [];
		var _g1 = 0;
		var _g;
		var s = this.get_text();
		_g = s.length;
		while(_g1 < _g) {
			var i = _g1++;
			var $char = haxe_Utf8.charCodeAt(this.get_text(),i);
			if($char == openfl_text_TextField.__utf8_endline_code) breaks.push(i);
		}
		return breaks;
	}
	,__getLineIndeces: function(line) {
		var breaks = this.__getLineBreakIndeces();
		var i = 0;
		var first_char = 0;
		var last_char = this.get_text().length - 1;
		var _g = 0;
		while(_g < breaks.length) {
			var br = breaks[_g];
			++_g;
			if(i == line) {
				first_char = br + 1;
				if(i != breaks.length - 1) last_char = breaks[i + 1] - 1;
			}
			i++;
		}
		return [first_char,last_char];
	}
	,__getLineWidth: function(line) {
		var measurements = this.__measureTextSub(false);
		var currWidth = 0.0;
		var bestWidth = 0.0;
		var linebreaks = this.__getLineBreakIndeces();
		var currLine = 0;
		var _g1 = 0;
		var _g = measurements.length;
		while(_g1 < _g) {
			var i = _g1++;
			var measure = measurements[i];
			if(HxOverrides.indexOf(linebreaks,i,0) != -1) {
				if(currLine == line) return currWidth; else if(line == -1 && currWidth > bestWidth) bestWidth = currWidth;
				currWidth = 0;
				currLine++;
			} else currWidth += measurements[i];
		}
		if(currLine == line) bestWidth = currWidth; else if(line == -1 && currWidth > bestWidth) bestWidth = currWidth;
		return bestWidth;
	}
	,__getLineMetric: function(line,metric) {
		if(this.__ranges == null) return this.__getLineMetricSubRangesNull(true,metric); else return this.__getLineMetricSubRangesNotNull(line,metric);
	}
	,__getLineMetricSubRangesNull: function(singleLine,metric) {
		if(singleLine == null) singleLine = false;
		var font = this.__getFontInstance(this.__textFormat);
		if(font != null) switch(metric) {
		case 2:
			return this.__getLineMetricSubRangesNull(singleLine,0) + this.__getLineMetricSubRangesNull(singleLine,1) + this.__getLineMetricSubRangesNull(singleLine,3);
		case 0:
			return font.get_ascender() / font.get_unitsPerEM() * this.__textFormat.size;
		case 1:
			return Math.abs(font.get_descender() / font.get_unitsPerEM() * this.__textFormat.size);
		case 3:
			return this.__textFormat.leading;
		default:
			return 0;
		}
		return 0;
	}
	,__getLineMetricSubRangesNotNull: function(specificLine,metric) {
		var lineChars = this.__getLineIndeces(specificLine);
		var m = 0.0;
		var best_m = 0.0;
		var _g = 0;
		var _g1 = this.__ranges;
		while(_g < _g1.length) {
			var range = _g1[_g];
			++_g;
			if(range.start >= lineChars[0]) {
				var font = this.__getFontInstance(range.format);
				if(font != null) switch(metric) {
				case 2:
					m = this.__getLineMetricSubRangesNotNull(specificLine,0) + this.__getLineMetricSubRangesNotNull(specificLine,1) + this.__getLineMetricSubRangesNotNull(specificLine,3);
					break;
				case 0:
					m = font.get_ascender() / font.get_unitsPerEM() * this.__textFormat.size;
					break;
				case 1:
					m = Math.abs(font.get_descender() / font.get_unitsPerEM() * this.__textFormat.size);
					break;
				case 3:
					m = this.__textFormat.leading;
					break;
				default:
					m = 0;
				}
			}
			if(m > best_m) best_m = m;
			m = 0;
		}
		return best_m;
	}
	,__getPosition: function(x,y) {
		if(x <= 2) return 0;
		var value = this.get_text();
		var text = value;
		var totalW = 2;
		var pos = text.length;
		if(x < this.__getTextWidth(text) + 2) {
			var _g1 = 0;
			var _g = text.length;
			while(_g1 < _g) {
				var i = _g1++;
				totalW += this.__getTextWidth(text.charAt(i));
				if(totalW >= x) {
					pos = i;
					break;
				}
			}
		}
		return pos;
	}
	,__getTextWidth: function(text) {
		if(this.__context == null) {
			this.__canvas = window.document.createElement("canvas");
			this.__context = this.__canvas.getContext("2d");
		}
		this.__context.font = this.__getFont(this.__textFormat);
		this.__context.textAlign = "left";
		return this.__context.measureText(text).width;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || interactiveOnly && !this.mouseEnabled) return false;
		var point = this.globalToLocal(new openfl_geom_Point(x,y));
		if(point.x > 0 && point.y > 0 && point.x <= this.__width && point.y <= this.__height) {
			if(stack != null) stack.push(this);
			return true;
		}
		return false;
	}
	,__measureText: function(condense) {
		if(condense == null) condense = true;
		if(this.__context == null) {
			this.__canvas = window.document.createElement("canvas");
			this.__context = this.__canvas.getContext("2d");
		}
		if(this.__ranges == null) {
			this.__context.font = this.__getFont(this.__textFormat);
			return [this.__context.measureText(this.__text).width];
		} else {
			var measurements = [];
			var _g = 0;
			var _g1 = this.__ranges;
			while(_g < _g1.length) {
				var range = _g1[_g];
				++_g;
				this.__context.font = this.__getFont(range.format);
				measurements.push(this.__context.measureText(this.get_text().substring(range.start,range.end)).width);
			}
			return measurements;
		}
	}
	,__measureTextSub: function(condense) {
		if(this.__textLayout == null) this.__textLayout = new lime_text_TextLayout();
		if(this.__ranges == null) return this.__measureTextSubRangesNull(condense); else return this.__measureTextSubRangesNotNull(condense);
		return null;
	}
	,__measureTextSubRangesNull: function(condense) {
		var font = this.__getFontInstance(this.__textFormat);
		var width = 0.0;
		var widths = [];
		if(font != null && this.__textFormat.size != null) {
			this.__textLayout.set_text(null);
			this.__textLayout.set_font(font);
			this.__textLayout.set_size(this.__textFormat.size | 0);
			this.__textLayout.set_text(this.__text);
			var _g = 0;
			var _g1 = this.__textLayout.positions;
			while(_g < _g1.length) {
				var position = _g1[_g];
				++_g;
				if(condense) width += position.advance.x; else widths.push(position.advance.x);
			}
		}
		if(condense) widths.push(width);
		return widths;
	}
	,__measureTextSubRangesNotNull: function(condense) {
		var measurements = [];
		var _g = 0;
		var _g1 = this.__ranges;
		while(_g < _g1.length) {
			var range = _g1[_g];
			++_g;
			var font = this.__getFontInstance(range.format);
			var width = 0.0;
			if(font != null && range.format.size != null) {
				this.__textLayout.set_text(null);
				this.__textLayout.set_font(font);
				this.__textLayout.set_size(range.format.size | 0);
				this.__textLayout.set_text(this.get_text().substring(range.start,range.end));
				var _g2 = 0;
				var _g3 = this.__textLayout.positions;
				while(_g2 < _g3.length) {
					var position = _g3[_g2];
					++_g2;
					if(condense) width += position.advance.x; else measurements.push(position.advance.x);
				}
			}
			if(condense) measurements.push(width);
		}
		return measurements;
	}
	,__measureTextWithDOM: function() {
		var div = this.__div;
		if(this.__div == null) {
			div = window.document.createElement("div");
			div.innerHTML = new EReg("\n","g").replace(this.__text,"<br>");
			div.style.setProperty("font",this.__getFont(this.__textFormat),null);
			div.style.setProperty("pointer-events","none",null);
			div.style.position = "absolute";
			div.style.top = "110%";
			window.document.body.appendChild(div);
		}
		this.__measuredWidth = div.clientWidth;
		if(this.__div == null) div.style.width = Std.string(this.__width - 4) + "px";
		this.__measuredHeight = div.clientHeight;
		if(this.__div == null) window.document.body.removeChild(div);
	}
	,__renderCanvas: function(renderSession) {
		openfl__$internal_renderer_canvas_CanvasTextField.render(this,renderSession);
	}
	,__renderDOM: function(renderSession) {
		openfl__$internal_renderer_dom_DOMTextField.render(this,renderSession);
	}
	,__renderGL: function(renderSession) {
		openfl__$internal_renderer_opengl_GLTextField.render(this,renderSession);
	}
	,__startCursorTimer: function() {
		this.__cursorTimer = haxe_Timer.delay($bind(this,this.__startCursorTimer),500);
		this.__showCursor = !this.__showCursor;
		this.__dirty = true;
	}
	,__stopCursorTimer: function() {
		if(this.__cursorTimer != null) this.__cursorTimer.stop();
	}
	,input_onKeyUp: function(event) {
		this.__isKeyDown = false;
		if(event == null) event == window.event;
		this.__text = this.__hiddenInput.value;
		this.__ranges = null;
		this.__isHTML = false;
		if(this.__hiddenInput.selectionDirection == "backward") {
			this.__cursorPosition = this.__hiddenInput.selectionStart;
			this.__selectionStart = this.__hiddenInput.selectionEnd;
		} else {
			this.__cursorPosition = this.__hiddenInput.selectionEnd;
			this.__selectionStart = this.__hiddenInput.selectionStart;
		}
		this.__dirty = true;
		this.dispatchEvent(new openfl_events_Event(openfl_events_Event.CHANGE,true));
	}
	,input_onKeyDown: function(event) {
		this.__isKeyDown = true;
		if(event == null) event == window.event;
		var keyCode = event.which;
		var isShift = event.shiftKey;
		this.__text = this.__hiddenInput.value;
		this.__ranges = null;
		this.__isHTML = false;
		if(this.__hiddenInput.selectionDirection == "backward") {
			this.__cursorPosition = this.__hiddenInput.selectionStart;
			this.__selectionStart = this.__hiddenInput.selectionEnd;
		} else {
			this.__cursorPosition = this.__hiddenInput.selectionEnd;
			this.__selectionStart = this.__hiddenInput.selectionStart;
		}
		this.__dirty = true;
	}
	,stage_onMouseMove: function(event) {
		if(this.__hasFocus && this.__selectionStart >= 0) {
			var localPoint = this.globalToLocal(new openfl_geom_Point(event.stageX,event.stageY));
			this.__cursorPosition = this.__getPosition(localPoint.x,localPoint.y);
			this.__dirty = true;
		}
	}
	,stage_onMouseUp: function(event) {
		this.stage.removeEventListener(openfl_events_MouseEvent.MOUSE_MOVE,$bind(this,this.stage_onMouseMove));
		this.stage.removeEventListener(openfl_events_MouseEvent.MOUSE_UP,$bind(this,this.stage_onMouseUp));
		if(this.stage.get_focus() == this) {
			var localPoint = this.globalToLocal(new openfl_geom_Point(event.stageX,event.stageY));
			var upPos = this.__getPosition(localPoint.x,localPoint.y);
			var leftPos;
			var rightPos;
			leftPos = Std["int"](Math.min(this.__selectionStart,upPos));
			rightPos = Std["int"](Math.max(this.__selectionStart,upPos));
			this.__selectionStart = leftPos;
			this.__cursorPosition = rightPos;
			this.this_onFocusIn(null);
		}
	}
	,this_onAddedToStage: function(event) {
		this.addEventListener(openfl_events_FocusEvent.FOCUS_IN,$bind(this,this.this_onFocusIn));
		this.addEventListener(openfl_events_FocusEvent.FOCUS_OUT,$bind(this,this.this_onFocusOut));
		this.__hiddenInput.addEventListener("keydown",$bind(this,this.input_onKeyDown),true);
		this.__hiddenInput.addEventListener("keyup",$bind(this,this.input_onKeyUp),true);
		this.__hiddenInput.addEventListener("input",$bind(this,this.input_onKeyUp),true);
		this.addEventListener(openfl_events_MouseEvent.MOUSE_DOWN,$bind(this,this.this_onMouseDown));
		if(this.stage.get_focus() == this) this.this_onFocusIn(null);
	}
	,this_onFocusIn: function(event) {
		if(this.__cursorPosition < 0) {
			this.__cursorPosition = this.__text.length;
			this.__selectionStart = this.__cursorPosition;
		}
		this.__hiddenInput.focus();
		this.__hiddenInput.selectionStart = this.__selectionStart;
		this.__hiddenInput.selectionEnd = this.__cursorPosition;
		this.__stopCursorTimer();
		this.__startCursorTimer();
		this.__hasFocus = true;
		this.__dirty = true;
		this.stage.addEventListener(openfl_events_MouseEvent.MOUSE_UP,$bind(this,this.stage_onMouseUp));
	}
	,this_onFocusOut: function(event) {
		this.__cursorPosition = -1;
		this.__hasFocus = false;
		this.__stopCursorTimer();
		if(this.__hiddenInput != null) this.__hiddenInput.blur();
		this.__dirty = true;
	}
	,this_onMouseDown: function(event) {
		if(!this.selectable) return;
		var localPoint = this.globalToLocal(new openfl_geom_Point(event.stageX,event.stageY));
		this.__selectionStart = this.__getPosition(localPoint.x,localPoint.y);
		this.__cursorPosition = this.__selectionStart;
		this.stage.addEventListener(openfl_events_MouseEvent.MOUSE_MOVE,$bind(this,this.stage_onMouseMove));
		this.stage.addEventListener(openfl_events_MouseEvent.MOUSE_UP,$bind(this,this.stage_onMouseUp));
	}
	,this_onRemovedFromStage: function(event) {
		this.removeEventListener(openfl_events_FocusEvent.FOCUS_IN,$bind(this,this.this_onFocusIn));
		this.removeEventListener(openfl_events_FocusEvent.FOCUS_OUT,$bind(this,this.this_onFocusOut));
		this.this_onFocusOut(null);
		if(this.__hiddenInput != null) this.__hiddenInput.removeEventListener("keydown",$bind(this,this.input_onKeyDown),true);
		if(this.__hiddenInput != null) this.__hiddenInput.removeEventListener("keyup",$bind(this,this.input_onKeyUp),true);
		if(this.__hiddenInput != null) this.__hiddenInput.removeEventListener("input",$bind(this,this.input_onKeyUp),true);
		this.removeEventListener(openfl_events_MouseEvent.MOUSE_DOWN,$bind(this,this.this_onMouseDown));
		if(this.stage != null) this.stage.removeEventListener(openfl_events_MouseEvent.MOUSE_MOVE,$bind(this,this.stage_onMouseMove));
		if(this.stage != null) this.stage.removeEventListener(openfl_events_MouseEvent.MOUSE_UP,$bind(this,this.stage_onMouseUp));
	}
	,set_autoSize: function(value) {
		if(value != this.autoSize) this.__dirty = true;
		return this.autoSize = value;
	}
	,set_background: function(value) {
		if(value != this.background) this.__dirty = true;
		return this.background = value;
	}
	,set_backgroundColor: function(value) {
		if(value != this.backgroundColor) this.__dirty = true;
		return this.backgroundColor = value;
	}
	,set_border: function(value) {
		if(value != this.border) this.__dirty = true;
		return this.border = value;
	}
	,set_borderColor: function(value) {
		if(value != this.borderColor) this.__dirty = true;
		return this.borderColor = value;
	}
	,set_defaultTextFormat: function(value) {
		this.__textFormat.__merge(value);
		return value;
	}
	,get_height: function() {
		return this.__height * this.get_scaleY();
	}
	,set_selectable: function(value) {
		if(!value && this.selectable && this.type == openfl_text_TextFieldType.INPUT) this.this_onRemovedFromStage(null);
		return this.selectable = value;
	}
	,get_text: function() {
		if(this.__isHTML) {
		}
		return this.__text;
	}
	,set_text: function(value) {
		if(this.__text != value && this.__hiddenInput != null) {
			var selectionStart = this.__hiddenInput.selectionStart;
			var selectionEnd = this.__hiddenInput.selectionEnd;
			this.__hiddenInput.value = value;
			this.__hiddenInput.selectionStart = selectionStart;
			this.__hiddenInput.selectionEnd = selectionEnd;
		}
		if(this.__isHTML || this.__text != value) this.__dirty = true;
		this.__ranges = null;
		this.__isHTML = false;
		return this.__text = value;
	}
	,get_textWidth: function() {
		if(this.__canvas != null) {
			var sizes = this.__measureText();
			var total = 0;
			var _g = 0;
			while(_g < sizes.length) {
				var size = sizes[_g];
				++_g;
				total += size;
			}
			return total;
		} else if(this.__div != null) return this.__div.clientWidth; else {
			this.__measureTextWithDOM();
			return this.__measuredWidth;
		}
	}
	,get_textHeight: function() {
		if(this.__canvas != null) return this.__textFormat.size * 1.185; else if(this.__div != null) return this.__div.clientHeight; else {
			this.__measureTextWithDOM();
			return this.__measuredHeight + this.__textFormat.size * 0.185;
		}
	}
	,set_type: function(value) {
		if(value != this.type) {
			if(value == openfl_text_TextFieldType.INPUT) this.__enableInputMode(); else this.__disableInputMode();
			this.__dirty = true;
		}
		return this.type = value;
	}
	,get_width: function() {
		if(this.autoSize == openfl_text_TextFieldAutoSize.LEFT) return (this.get_textWidth() + 4) * this.get_scaleX(); else return this.__width * this.get_scaleX();
	}
	,get_wordWrap: function() {
		return this.wordWrap;
	}
	,set_wordWrap: function(value) {
		return this.wordWrap = value;
	}
	,__class__: openfl_text_TextField
	,__properties__: $extend(openfl_display_InteractiveObject.prototype.__properties__,{get_textHeight:"get_textHeight",get_textWidth:"get_textWidth",set_wordWrap:"set_wordWrap",get_wordWrap:"get_wordWrap",set_type:"set_type",set_text:"set_text",get_text:"get_text",set_selectable:"set_selectable",set_defaultTextFormat:"set_defaultTextFormat",set_borderColor:"set_borderColor",set_border:"set_border",set_backgroundColor:"set_backgroundColor",set_background:"set_background",set_autoSize:"set_autoSize"})
});
var openfl_display_FPS = function(x,y,color) {
	if(color == null) color = 0;
	if(y == null) y = 10;
	if(x == null) x = 10;
	openfl_text_TextField.call(this);
	this.set_x(x);
	this.set_y(y);
	this.currentFPS = 0;
	this.set_selectable(false);
	this.mouseEnabled = false;
	this.set_defaultTextFormat(new openfl_text_TextFormat("_sans",12,color));
	this.set_autoSize(openfl_text_TextFieldAutoSize.LEFT);
	this.set_text("FPS: ");
	this.cacheCount = 0;
	this.times = [];
	this.addEventListener(openfl_events_Event.ENTER_FRAME,$bind(this,this.this_onEnterFrame));
};
$hxClasses["openfl.display.FPS"] = openfl_display_FPS;
openfl_display_FPS.__name__ = true;
openfl_display_FPS.__super__ = openfl_text_TextField;
openfl_display_FPS.prototype = $extend(openfl_text_TextField.prototype,{
	this_onEnterFrame: function(event) {
		var currentTime = haxe_Timer.stamp();
		this.times.push(currentTime);
		while(this.times[0] < currentTime - 1) this.times.shift();
		var currentCount = this.times.length;
		this.currentFPS = Math.round((currentCount + this.cacheCount) / 2);
		if(currentCount != this.cacheCount) this.set_text("FPS: " + this.currentFPS);
		this.cacheCount = currentCount;
	}
	,__class__: openfl_display_FPS
});
var openfl_display_FrameLabel = function() { };
$hxClasses["openfl.display.FrameLabel"] = openfl_display_FrameLabel;
openfl_display_FrameLabel.__name__ = true;
openfl_display_FrameLabel.__super__ = openfl_events_EventDispatcher;
openfl_display_FrameLabel.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_display_FrameLabel
});
var openfl_display_GradientType = $hxClasses["openfl.display.GradientType"] = { __ename__ : true, __constructs__ : ["RADIAL","LINEAR"] };
openfl_display_GradientType.RADIAL = ["RADIAL",0];
openfl_display_GradientType.RADIAL.toString = $estr;
openfl_display_GradientType.RADIAL.__enum__ = openfl_display_GradientType;
openfl_display_GradientType.LINEAR = ["LINEAR",1];
openfl_display_GradientType.LINEAR.toString = $estr;
openfl_display_GradientType.LINEAR.__enum__ = openfl_display_GradientType;
var openfl_display_Graphics = function() {
	this.__visible = true;
	this.__glStack = [];
	this.__dirty = true;
	this.__commands = [];
	this.__commands = [];
	this.__halfStrokeWidth = 0;
	this.__positionX = 0;
	this.__positionY = 0;
	this.moveTo(0,0);
};
$hxClasses["openfl.display.Graphics"] = openfl_display_Graphics;
openfl_display_Graphics.__name__ = true;
openfl_display_Graphics.prototype = {
	beginFill: function(color,alpha) {
		if(alpha == null) alpha = 1;
		if(color == null) color = 0;
		this.__commands.push(openfl_display_DrawCommand.BeginFill(color & 16777215,alpha));
		if(alpha > 0) this.__visible = true;
	}
	,clear: function() {
		this.__commands = [];
		this.__halfStrokeWidth = 0;
		if(this.__bounds != null) {
			this.set___dirty(true);
			this.__transformDirty = true;
			this.__bounds = null;
		}
		this.__visible = false;
		this.moveTo(0,0);
	}
	,drawRect: function(x,y,width,height) {
		if(width <= 0 || height <= 0) return;
		this.__inflateBounds(x - this.__halfStrokeWidth,y - this.__halfStrokeWidth);
		this.__inflateBounds(x + width + this.__halfStrokeWidth,y + height + this.__halfStrokeWidth);
		this.__commands.push(openfl_display_DrawCommand.DrawRect(x,y,width,height));
		this.set___dirty(true);
	}
	,drawRoundRect: function(x,y,width,height,rx,ry) {
		if(ry == null) ry = -1;
		if(width <= 0 || height <= 0) return;
		this.__inflateBounds(x - this.__halfStrokeWidth,y - this.__halfStrokeWidth);
		this.__inflateBounds(x + width + this.__halfStrokeWidth,y + height + this.__halfStrokeWidth);
		this.__commands.push(openfl_display_DrawCommand.DrawRoundRect(x,y,width,height,rx,ry));
		this.set___dirty(true);
	}
	,drawTiles: function(sheet,tileData,smooth,flags,count) {
		if(count == null) count = -1;
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		this.__inflateBounds(0,0);
		this.__inflateBounds(openfl_Lib.current.stage.stageWidth,openfl_Lib.current.stage.stageHeight);
		this.__commands.push(openfl_display_DrawCommand.DrawTiles(sheet,tileData,smooth,flags,count));
		this.set___dirty(true);
		this.__visible = true;
	}
	,endFill: function() {
		this.__commands.push(openfl_display_DrawCommand.EndFill);
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		if(thickness > this.__halfStrokeWidth) this.__halfStrokeWidth = thickness; else this.__halfStrokeWidth = this.__halfStrokeWidth;
		this.__commands.push(openfl_display_DrawCommand.LineStyle(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit));
		if(thickness != null) this.__visible = true;
	}
	,lineTo: function(x,y) {
		this.__inflateBounds(this.__positionX - this.__halfStrokeWidth,this.__positionY - this.__halfStrokeWidth);
		this.__inflateBounds(this.__positionX + this.__halfStrokeWidth,this.__positionY + this.__halfStrokeWidth);
		this.__positionX = x;
		this.__positionY = y;
		this.__inflateBounds(this.__positionX - this.__halfStrokeWidth,this.__positionY - this.__halfStrokeWidth);
		this.__inflateBounds(this.__positionX + this.__halfStrokeWidth,this.__positionY + this.__halfStrokeWidth);
		this.__commands.push(openfl_display_DrawCommand.LineTo(x,y));
		this.set___dirty(true);
	}
	,moveTo: function(x,y) {
		this.__positionX = x;
		this.__positionY = y;
		this.__commands.push(openfl_display_DrawCommand.MoveTo(x,y));
	}
	,__getBounds: function(rect,matrix) {
		if(this.__bounds == null) return;
		var bounds = this.__bounds.transform(matrix);
		rect.__expand(bounds.x,bounds.y,bounds.width,bounds.height);
	}
	,__hitTest: function(x,y,shapeFlag,matrix) {
		if(this.__bounds == null) return false;
		var bounds = this.__bounds.transform(matrix);
		return x > bounds.x && y > bounds.y && x <= bounds.get_right() && y <= bounds.get_bottom();
	}
	,__inflateBounds: function(x,y) {
		if(this.__bounds == null) {
			this.__bounds = new openfl_geom_Rectangle(x,y,0,0);
			this.__transformDirty = true;
			return;
		}
		if(x < this.__bounds.x) {
			this.__bounds.width += this.__bounds.x - x;
			this.__bounds.x = x;
			this.__transformDirty = true;
		}
		if(y < this.__bounds.y) {
			this.__bounds.height += this.__bounds.y - y;
			this.__bounds.y = y;
			this.__transformDirty = true;
		}
		if(x > this.__bounds.x + this.__bounds.width) this.__bounds.width = x - this.__bounds.x;
		if(y > this.__bounds.y + this.__bounds.height) this.__bounds.height = y - this.__bounds.y;
	}
	,set___dirty: function(value) {
		if(value && this.__owner != null) this.__owner.__setRenderDirty();
		return this.__dirty = value;
	}
	,__class__: openfl_display_Graphics
	,__properties__: {set___dirty:"set___dirty"}
};
var openfl_display_DrawCommand = $hxClasses["openfl.display.DrawCommand"] = { __ename__ : true, __constructs__ : ["BeginBitmapFill","BeginFill","BeginGradientFill","CubicCurveTo","CurveTo","DrawCircle","DrawEllipse","DrawRect","DrawRoundRect","DrawTiles","DrawTriangles","EndFill","LineStyle","LineTo","MoveTo","DrawPathC","OverrideMatrix"] };
openfl_display_DrawCommand.BeginBitmapFill = function(bitmap,matrix,repeat,smooth) { var $x = ["BeginBitmapFill",0,bitmap,matrix,repeat,smooth]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.BeginFill = function(color,alpha) { var $x = ["BeginFill",1,color,alpha]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.BeginGradientFill = function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) { var $x = ["BeginGradientFill",2,type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.CubicCurveTo = function(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY) { var $x = ["CubicCurveTo",3,controlX1,controlY1,controlX2,controlY2,anchorX,anchorY]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.CurveTo = function(controlX,controlY,anchorX,anchorY) { var $x = ["CurveTo",4,controlX,controlY,anchorX,anchorY]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawCircle = function(x,y,radius) { var $x = ["DrawCircle",5,x,y,radius]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawEllipse = function(x,y,width,height) { var $x = ["DrawEllipse",6,x,y,width,height]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawRect = function(x,y,width,height) { var $x = ["DrawRect",7,x,y,width,height]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawRoundRect = function(x,y,width,height,rx,ry) { var $x = ["DrawRoundRect",8,x,y,width,height,rx,ry]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawTiles = function(sheet,tileData,smooth,flags,count) { var $x = ["DrawTiles",9,sheet,tileData,smooth,flags,count]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawTriangles = function(vertices,indices,uvtData,culling,colors,blendMode) { var $x = ["DrawTriangles",10,vertices,indices,uvtData,culling,colors,blendMode]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.EndFill = ["EndFill",11];
openfl_display_DrawCommand.EndFill.toString = $estr;
openfl_display_DrawCommand.EndFill.__enum__ = openfl_display_DrawCommand;
openfl_display_DrawCommand.LineStyle = function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) { var $x = ["LineStyle",12,thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.LineTo = function(x,y) { var $x = ["LineTo",13,x,y]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.MoveTo = function(x,y) { var $x = ["MoveTo",14,x,y]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.DrawPathC = function(commands,data,winding) { var $x = ["DrawPathC",15,commands,data,winding]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
openfl_display_DrawCommand.OverrideMatrix = function(matrix) { var $x = ["OverrideMatrix",16,matrix]; $x.__enum__ = openfl_display_DrawCommand; $x.toString = $estr; return $x; };
var openfl_display_GraphicsPathWinding = $hxClasses["openfl.display.GraphicsPathWinding"] = { __ename__ : true, __constructs__ : ["EVEN_ODD","NON_ZERO"] };
openfl_display_GraphicsPathWinding.EVEN_ODD = ["EVEN_ODD",0];
openfl_display_GraphicsPathWinding.EVEN_ODD.toString = $estr;
openfl_display_GraphicsPathWinding.EVEN_ODD.__enum__ = openfl_display_GraphicsPathWinding;
openfl_display_GraphicsPathWinding.NON_ZERO = ["NON_ZERO",1];
openfl_display_GraphicsPathWinding.NON_ZERO.toString = $estr;
openfl_display_GraphicsPathWinding.NON_ZERO.__enum__ = openfl_display_GraphicsPathWinding;
var openfl_display_InterpolationMethod = $hxClasses["openfl.display.InterpolationMethod"] = { __ename__ : true, __constructs__ : ["RGB","LINEAR_RGB"] };
openfl_display_InterpolationMethod.RGB = ["RGB",0];
openfl_display_InterpolationMethod.RGB.toString = $estr;
openfl_display_InterpolationMethod.RGB.__enum__ = openfl_display_InterpolationMethod;
openfl_display_InterpolationMethod.LINEAR_RGB = ["LINEAR_RGB",1];
openfl_display_InterpolationMethod.LINEAR_RGB.toString = $estr;
openfl_display_InterpolationMethod.LINEAR_RGB.__enum__ = openfl_display_InterpolationMethod;
var openfl_display_JointStyle = $hxClasses["openfl.display.JointStyle"] = { __ename__ : true, __constructs__ : ["MITER","ROUND","BEVEL"] };
openfl_display_JointStyle.MITER = ["MITER",0];
openfl_display_JointStyle.MITER.toString = $estr;
openfl_display_JointStyle.MITER.__enum__ = openfl_display_JointStyle;
openfl_display_JointStyle.ROUND = ["ROUND",1];
openfl_display_JointStyle.ROUND.toString = $estr;
openfl_display_JointStyle.ROUND.__enum__ = openfl_display_JointStyle;
openfl_display_JointStyle.BEVEL = ["BEVEL",2];
openfl_display_JointStyle.BEVEL.toString = $estr;
openfl_display_JointStyle.BEVEL.__enum__ = openfl_display_JointStyle;
var openfl_display_LineScaleMode = $hxClasses["openfl.display.LineScaleMode"] = { __ename__ : true, __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] };
openfl_display_LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
openfl_display_LineScaleMode.HORIZONTAL.toString = $estr;
openfl_display_LineScaleMode.HORIZONTAL.__enum__ = openfl_display_LineScaleMode;
openfl_display_LineScaleMode.NONE = ["NONE",1];
openfl_display_LineScaleMode.NONE.toString = $estr;
openfl_display_LineScaleMode.NONE.__enum__ = openfl_display_LineScaleMode;
openfl_display_LineScaleMode.NORMAL = ["NORMAL",2];
openfl_display_LineScaleMode.NORMAL.toString = $estr;
openfl_display_LineScaleMode.NORMAL.__enum__ = openfl_display_LineScaleMode;
openfl_display_LineScaleMode.VERTICAL = ["VERTICAL",3];
openfl_display_LineScaleMode.VERTICAL.toString = $estr;
openfl_display_LineScaleMode.VERTICAL.__enum__ = openfl_display_LineScaleMode;
var openfl_display_Loader = function() { };
$hxClasses["openfl.display.Loader"] = openfl_display_Loader;
openfl_display_Loader.__name__ = true;
openfl_display_Loader.__super__ = openfl_display_Sprite;
openfl_display_Loader.prototype = $extend(openfl_display_Sprite.prototype,{
	__class__: openfl_display_Loader
});
var openfl_display_PixelSnapping = $hxClasses["openfl.display.PixelSnapping"] = { __ename__ : true, __constructs__ : ["NEVER","AUTO","ALWAYS"] };
openfl_display_PixelSnapping.NEVER = ["NEVER",0];
openfl_display_PixelSnapping.NEVER.toString = $estr;
openfl_display_PixelSnapping.NEVER.__enum__ = openfl_display_PixelSnapping;
openfl_display_PixelSnapping.AUTO = ["AUTO",1];
openfl_display_PixelSnapping.AUTO.toString = $estr;
openfl_display_PixelSnapping.AUTO.__enum__ = openfl_display_PixelSnapping;
openfl_display_PixelSnapping.ALWAYS = ["ALWAYS",2];
openfl_display_PixelSnapping.ALWAYS.toString = $estr;
openfl_display_PixelSnapping.ALWAYS.__enum__ = openfl_display_PixelSnapping;
var openfl_display_Preloader = function(display) {
	lime_app_Preloader.call(this);
	if(display != null) {
		this.display = display;
		openfl_Lib.current.addChild(display);
		if(js_Boot.__instanceof(display,NMEPreloader)) (js_Boot.__cast(display , NMEPreloader)).onInit();
	}
};
$hxClasses["openfl.display.Preloader"] = openfl_display_Preloader;
openfl_display_Preloader.__name__ = true;
openfl_display_Preloader.__super__ = lime_app_Preloader;
openfl_display_Preloader.prototype = $extend(lime_app_Preloader.prototype,{
	load: function(urls,types) {
		var sounds = [];
		var url = null;
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			url = urls[i];
			var _g2 = types[i];
			switch(_g2) {
			case "MUSIC":case "SOUND":
				var sound = haxe_io_Path.withoutExtension(url);
				if(!HxOverrides.remove(sounds,sound)) this.total++;
				sounds.push(sound);
				break;
			default:
			}
		}
		var _g3 = 0;
		while(_g3 < sounds.length) {
			var soundName = sounds[_g3];
			++_g3;
			var sound1 = new openfl_media_Sound();
			sound1.addEventListener(openfl_events_Event.COMPLETE,$bind(this,this.sound_onComplete));
			sound1.addEventListener(openfl_events_IOErrorEvent.IO_ERROR,$bind(this,this.sound_onIOError));
			sound1.load(new openfl_net_URLRequest(soundName + ".ogg"));
		}
		lime_app_Preloader.prototype.load.call(this,urls,types);
	}
	,start: function() {
		if(this.display != null && js_Boot.__instanceof(this.display,NMEPreloader)) {
			this.display.addEventListener(openfl_events_Event.COMPLETE,$bind(this,this.display_onComplete));
			(js_Boot.__cast(this.display , NMEPreloader)).onLoaded();
		} else lime_app_Preloader.prototype.start.call(this);
	}
	,update: function(loaded,total) {
		if(this.display != null && js_Boot.__instanceof(this.display,NMEPreloader)) (js_Boot.__cast(this.display , NMEPreloader)).onUpdate(loaded,total);
	}
	,display_onComplete: function(event) {
		this.display.removeEventListener(openfl_events_Event.COMPLETE,$bind(this,this.display_onComplete));
		openfl_Lib.current.removeChild(this.display);
		openfl_Lib.current.stage.set_focus(null);
		this.display = null;
		lime_app_Preloader.prototype.start.call(this);
	}
	,sound_onComplete: function(event) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,sound_onIOError: function(event) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,__class__: openfl_display_Preloader
});
var openfl_display_SpreadMethod = $hxClasses["openfl.display.SpreadMethod"] = { __ename__ : true, __constructs__ : ["REPEAT","REFLECT","PAD"] };
openfl_display_SpreadMethod.REPEAT = ["REPEAT",0];
openfl_display_SpreadMethod.REPEAT.toString = $estr;
openfl_display_SpreadMethod.REPEAT.__enum__ = openfl_display_SpreadMethod;
openfl_display_SpreadMethod.REFLECT = ["REFLECT",1];
openfl_display_SpreadMethod.REFLECT.toString = $estr;
openfl_display_SpreadMethod.REFLECT.__enum__ = openfl_display_SpreadMethod;
openfl_display_SpreadMethod.PAD = ["PAD",2];
openfl_display_SpreadMethod.PAD.toString = $estr;
openfl_display_SpreadMethod.PAD.__enum__ = openfl_display_SpreadMethod;
var openfl_display_Stage = function(width,height,color) {
	openfl_display_DisplayObjectContainer.call(this);
	if(color == null) {
		this.__transparent = true;
		this.set_color(0);
	} else this.set_color(color);
	this.set_name(null);
	this.__displayState = openfl_display_StageDisplayState.NORMAL;
	this.__mouseX = 0;
	this.__mouseY = 0;
	this.__lastClickTime = 0;
	this.stageWidth = width;
	this.stageHeight = height;
	this.stage = this;
	this.align = openfl_display_StageAlign.TOP_LEFT;
	this.allowsFullScreen = false;
	this.frameRate = 60;
	this.quality = openfl_display_StageQuality.HIGH;
	this.scaleMode = openfl_display_StageScaleMode.NO_SCALE;
	this.stageFocusRect = true;
	this.__clearBeforeRender = true;
	this.__stack = [];
	this.__mouseOutStack = [];
	var this1;
	this1 = new openfl_VectorData();
	var this2;
	this2 = new Array(0);
	this1.data = this2;
	this1.length = 0;
	this1.fixed = false;
	this.stage3Ds = this1;
	var this3 = this.stage3Ds;
	var x = new openfl_display_Stage3D();
	if(!this3.fixed) {
		this3.length++;
		if(this3.data.length < this3.length) {
			var data;
			var this4;
			this4 = new Array(this3.data.length + 10);
			data = this4;
			haxe_ds__$Vector_Vector_$Impl_$.blit(this3.data,0,data,0,this3.data.length);
			this3.data = data;
		}
		this3.data[this3.length - 1] = x;
	}
	this3.length;
};
$hxClasses["openfl.display.Stage"] = openfl_display_Stage;
openfl_display_Stage.__name__ = true;
openfl_display_Stage.__interfaces__ = [lime_app_IModule];
openfl_display_Stage.__super__ = openfl_display_DisplayObjectContainer;
openfl_display_Stage.prototype = $extend(openfl_display_DisplayObjectContainer.prototype,{
	globalToLocal: function(pos) {
		return pos;
	}
	,init: function(context) {
		switch(context[1]) {
		case 0:
			var gl = context[2];
			this.__renderer = new openfl__$internal_renderer_opengl_GLRenderer(this.stageWidth,this.stageHeight,gl);
			break;
		case 1:
			var context1 = context[2];
			this.__renderer = new openfl__$internal_renderer_canvas_CanvasRenderer(this.stageWidth,this.stageHeight,context1);
			break;
		case 2:
			var element = context[2];
			this.__renderer = new openfl__$internal_renderer_dom_DOMRenderer(this.stageWidth,this.stageHeight,element);
			break;
		case 4:
			var cairo = context[2];
			this.__renderer = new openfl__$internal_renderer_cairo_CairoRenderer(this.stageWidth,this.stageHeight,cairo);
			break;
		default:
		}
	}
	,onGamepadAxisMove: function(gamepad,axis,value) {
	}
	,onGamepadButtonDown: function(gamepad,button) {
	}
	,onGamepadButtonUp: function(gamepad,button) {
	}
	,onGamepadConnect: function(gamepad) {
	}
	,onGamepadDisconnect: function(gamepad) {
	}
	,onKeyDown: function(keyCode,modifier) {
		this.__onKey(openfl_events_KeyboardEvent.KEY_DOWN,keyCode,modifier);
	}
	,onKeyUp: function(keyCode,modifier) {
		this.__onKey(openfl_events_KeyboardEvent.KEY_UP,keyCode,modifier);
	}
	,onMouseDown: function(x,y,button) {
		var type;
		switch(button) {
		case 1:
			type = openfl_events_MouseEvent.MIDDLE_MOUSE_DOWN;
			break;
		case 2:
			type = openfl_events_MouseEvent.RIGHT_MOUSE_DOWN;
			break;
		default:
			type = openfl_events_MouseEvent.MOUSE_DOWN;
		}
		this.__onMouse(type,x,y,button);
	}
	,onMouseMove: function(x,y) {
		this.__onMouse(openfl_events_MouseEvent.MOUSE_MOVE,x,y,0);
	}
	,onMouseMoveRelative: function(x,y) {
	}
	,onMouseUp: function(x,y,button) {
		var type;
		switch(button) {
		case 1:
			type = openfl_events_MouseEvent.MIDDLE_MOUSE_UP;
			break;
		case 2:
			type = openfl_events_MouseEvent.RIGHT_MOUSE_UP;
			break;
		default:
			type = openfl_events_MouseEvent.MOUSE_UP;
		}
		this.__onMouse(type,x,y,button);
	}
	,onMouseWheel: function(deltaX,deltaY) {
		this.__onMouseWheel(deltaX,deltaY);
	}
	,onRenderContextLost: function() {
	}
	,onRenderContextRestored: function(context) {
	}
	,onTextEdit: function(text,start,length) {
	}
	,onTextInput: function(text) {
	}
	,onTouchMove: function(x,y,id) {
		this.__onTouch("touchMove",x,y,id);
	}
	,onTouchEnd: function(x,y,id) {
		this.__onTouch("touchEnd",x,y,id);
	}
	,onTouchStart: function(x,y,id) {
		this.__onTouch("touchBegin",x,y,id);
	}
	,onWindowActivate: function() {
		var event = new openfl_events_Event(openfl_events_Event.ACTIVATE);
		this.__broadcast(event,true);
	}
	,onWindowClose: function() {
	}
	,onWindowDeactivate: function() {
		var event = new openfl_events_Event(openfl_events_Event.DEACTIVATE);
		this.__broadcast(event,true);
	}
	,onWindowEnter: function() {
	}
	,onWindowFocusIn: function() {
	}
	,onWindowFocusOut: function() {
	}
	,onWindowFullscreen: function() {
	}
	,onWindowLeave: function() {
		this.dispatchEvent(new openfl_events_Event(openfl_events_Event.MOUSE_LEAVE));
	}
	,onWindowMinimize: function() {
	}
	,onWindowMove: function(x,y) {
	}
	,onWindowResize: function(width,height) {
		this.stageWidth = width;
		this.stageHeight = height;
		if(this.__renderer != null) this.__renderer.resize(width,height);
		var event = new openfl_events_Event(openfl_events_Event.RESIZE);
		this.__broadcast(event,false);
	}
	,onWindowRestore: function() {
	}
	,render: function(context) {
		if(this.__rendering) return;
		this.__rendering = true;
		this.__broadcast(new openfl_events_Event(openfl_events_Event.ENTER_FRAME),true);
		if(this.__invalidated) {
			this.__invalidated = false;
			this.__broadcast(new openfl_events_Event(openfl_events_Event.RENDER),true);
		}
		this.__renderable = true;
		this.__update(false,true);
		if(this.__renderer != null) {
			switch(context[1]) {
			case 4:
				var cairo = context[2];
				(js_Boot.__cast(this.__renderer , openfl__$internal_renderer_cairo_CairoRenderer)).cairo = cairo;
				this.__renderer.renderSession.cairo = cairo;
				break;
			default:
			}
			this.__renderer.render(this);
		}
		this.__rendering = false;
	}
	,update: function(deltaTime) {
	}
	,__drag: function(mouse) {
		var parent = this.__dragObject.parent;
		if(parent != null) mouse = parent.globalToLocal(mouse);
		var x = mouse.x + this.__dragOffsetX;
		var y = mouse.y + this.__dragOffsetY;
		if(this.__dragBounds != null) {
			if(x < this.__dragBounds.x) x = this.__dragBounds.x; else if(x > this.__dragBounds.get_right()) x = this.__dragBounds.get_right();
			if(y < this.__dragBounds.y) y = this.__dragBounds.y; else if(y > this.__dragBounds.get_bottom()) y = this.__dragBounds.get_bottom();
		}
		this.__dragObject.set_x(x);
		this.__dragObject.set_y(y);
	}
	,__fireEvent: function(event,stack) {
		var length = stack.length;
		if(length == 0) {
			event.eventPhase = openfl_events_EventPhase.AT_TARGET;
			event.target.__broadcast(event,false);
		} else {
			event.eventPhase = openfl_events_EventPhase.CAPTURING_PHASE;
			event.target = stack[stack.length - 1];
			var _g1 = 0;
			var _g = length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				stack[i].__broadcast(event,false);
				if(event.__isCancelled) return;
			}
			event.eventPhase = openfl_events_EventPhase.AT_TARGET;
			event.target.__broadcast(event,false);
			if(event.__isCancelled) return;
			if(event.bubbles) {
				event.eventPhase = openfl_events_EventPhase.BUBBLING_PHASE;
				var i1 = length - 2;
				while(i1 >= 0) {
					stack[i1].__broadcast(event,false);
					if(event.__isCancelled) return;
					i1--;
				}
			}
		}
	}
	,__getInteractive: function(stack) {
		if(stack != null) stack.push(this);
		return true;
	}
	,__onKey: function(type,keyCode,modifier) {
		openfl_events_MouseEvent.__altKey = lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_altKey(modifier);
		openfl_events_MouseEvent.__commandKey = lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_metaKey(modifier);
		openfl_events_MouseEvent.__ctrlKey = lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_ctrlKey(modifier);
		openfl_events_MouseEvent.__shiftKey = lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey(modifier);
		var stack = [];
		if(this.__focus == null) this.__getInteractive(stack); else this.__focus.__getInteractive(stack);
		if(stack.length > 0) {
			var keyCode1 = openfl_ui_Keyboard.convertKeyCode(keyCode);
			var charCode = openfl_ui_Keyboard.__getCharCode(keyCode1,lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey(modifier));
			var event = new openfl_events_KeyboardEvent(type,true,false,charCode,keyCode1,null,lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_ctrlKey(modifier),lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_altKey(modifier),lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey(modifier),lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_metaKey(modifier));
			stack.reverse();
			this.__fireEvent(event,stack);
		}
	}
	,__onMouse: function(type,x,y,button) {
		if(button > 2) return;
		this.__mouseX = x;
		this.__mouseY = y;
		var stack = [];
		var target = null;
		var targetPoint = new openfl_geom_Point(x,y);
		if(this.__hitTest(x,y,false,stack,true)) target = stack[stack.length - 1]; else {
			target = this;
			stack = [this];
		}
		if(type == openfl_events_MouseEvent.MOUSE_DOWN) this.set_focus(target);
		this.__fireEvent(openfl_events_MouseEvent.__create(type,button,this.__mouseX,this.__mouseY,target == this?targetPoint:target.globalToLocal(targetPoint),target),stack);
		var clickType;
		switch(type) {
		case "mouseUp":
			clickType = openfl_events_MouseEvent.CLICK;
			break;
		case "middleMouseUp":
			clickType = openfl_events_MouseEvent.MIDDLE_CLICK;
			break;
		case "rightMouseUp":
			clickType = openfl_events_MouseEvent.RIGHT_CLICK;
			break;
		default:
			clickType = null;
		}
		if(clickType != null) {
			this.__fireEvent(openfl_events_MouseEvent.__create(clickType,button,this.__mouseX,this.__mouseY,target == this?targetPoint:target.globalToLocal(targetPoint),target),stack);
			if(type == openfl_events_MouseEvent.MOUSE_UP && (js_Boot.__cast(target , openfl_display_InteractiveObject)).doubleClickEnabled) {
				var currentTime = openfl_Lib.getTimer();
				if(currentTime - this.__lastClickTime < 500) {
					this.__fireEvent(openfl_events_MouseEvent.__create(openfl_events_MouseEvent.DOUBLE_CLICK,button,this.__mouseX,this.__mouseY,target == this?targetPoint:target.globalToLocal(targetPoint),target),stack);
					this.__lastClickTime = 0;
				} else this.__lastClickTime = currentTime;
			}
		}
		var cursor = null;
		var _g = 0;
		while(_g < stack.length) {
			var target1 = stack[_g];
			++_g;
			cursor = target1.__getCursor();
			if(cursor != null) {
				lime_ui_Mouse.set_cursor(cursor);
				break;
			}
		}
		if(cursor == null) lime_ui_Mouse.set_cursor(lime_ui_MouseCursor.ARROW);
		var _g1 = 0;
		var _g11 = this.__mouseOutStack;
		while(_g1 < _g11.length) {
			var target2 = _g11[_g1];
			++_g1;
			if(HxOverrides.indexOf(stack,target2,0) == -1) {
				HxOverrides.remove(this.__mouseOutStack,target2);
				var localPoint = target2.globalToLocal(targetPoint);
				target2.dispatchEvent(new openfl_events_MouseEvent(openfl_events_MouseEvent.MOUSE_OUT,false,false,localPoint.x,localPoint.y,target2));
			}
		}
		var _g2 = 0;
		while(_g2 < stack.length) {
			var target3 = stack[_g2];
			++_g2;
			if(HxOverrides.indexOf(this.__mouseOutStack,target3,0) == -1) {
				if(target3.hasEventListener(openfl_events_MouseEvent.MOUSE_OVER)) {
					var localPoint1 = target3.globalToLocal(targetPoint);
					target3.dispatchEvent(new openfl_events_MouseEvent(openfl_events_MouseEvent.MOUSE_OVER,false,false,localPoint1.x,localPoint1.y,target3));
				}
				if(target3.hasEventListener(openfl_events_MouseEvent.MOUSE_OUT)) this.__mouseOutStack.push(target3);
			}
		}
		if(this.__dragObject != null) this.__drag(targetPoint);
	}
	,__onMouseWheel: function(deltaX,deltaY) {
		var x = this.__mouseX;
		var y = this.__mouseY;
		var stack = [];
		if(!this.__hitTest(x,y,false,stack,true)) stack = [this];
		var target = stack[stack.length - 1];
		var targetPoint = new openfl_geom_Point(x,y);
		var delta = deltaY | 0;
		this.__fireEvent(openfl_events_MouseEvent.__create(openfl_events_MouseEvent.MOUSE_WHEEL,0,this.__mouseX,this.__mouseY,target == this?targetPoint:target.globalToLocal(targetPoint),target,delta),stack);
	}
	,__onTouch: function(type,x,y,id) {
		var point = new openfl_geom_Point(x,y);
		this.__mouseX = point.x;
		this.__mouseY = point.y;
		var __stack = [];
		var mouseType;
		switch(type) {
		case "touchBegin":
			mouseType = openfl_events_MouseEvent.MOUSE_DOWN;
			break;
		case "touchMove":
			mouseType = openfl_events_MouseEvent.MOUSE_MOVE;
			break;
		case "touchEnd":
			mouseType = openfl_events_MouseEvent.MOUSE_UP;
			break;
		default:
			mouseType = null;
		}
		if(this.__hitTest(x,y,false,__stack,true)) {
			var target = __stack[__stack.length - 1];
			var localPoint = target.globalToLocal(point);
			var touchEvent = openfl_events_TouchEvent.__create(type,null,this.__mouseX,this.__mouseY,localPoint,target);
			touchEvent.touchPointID = id;
			touchEvent.isPrimaryTouchPoint = true;
			var mouseEvent = openfl_events_MouseEvent.__create(mouseType,0,this.__mouseX,this.__mouseY,localPoint,target);
			mouseEvent.buttonDown = type != "touchEnd";
			this.__fireEvent(touchEvent,__stack);
			this.__fireEvent(mouseEvent,__stack);
		} else {
			var touchEvent1 = openfl_events_TouchEvent.__create(type,null,this.__mouseX,this.__mouseY,point,this);
			touchEvent1.touchPointID = id;
			touchEvent1.isPrimaryTouchPoint = true;
			var mouseEvent1 = openfl_events_MouseEvent.__create(mouseType,0,this.__mouseX,this.__mouseY,point,this);
			mouseEvent1.buttonDown = type != "touchEnd";
			this.__fireEvent(touchEvent1,[this.stage]);
			this.__fireEvent(mouseEvent1,[this.stage]);
		}
		if(type == "touchMove" && this.__dragObject != null) this.__drag(point);
	}
	,__update: function(transformOnly,updateChildren,maskGrahpics) {
		if(transformOnly) {
			if(openfl_display_DisplayObject.__worldTransformDirty > 0) {
				openfl_display_DisplayObjectContainer.prototype.__update.call(this,true,updateChildren,maskGrahpics);
				if(updateChildren) {
					openfl_display_DisplayObject.__worldTransformDirty = 0;
					this.__dirty = true;
				}
			}
		} else if(openfl_display_DisplayObject.__worldTransformDirty > 0 || this.__dirty || openfl_display_DisplayObject.__worldRenderDirty > 0) {
			openfl_display_DisplayObjectContainer.prototype.__update.call(this,false,updateChildren,maskGrahpics);
			if(updateChildren) {
				openfl_display_DisplayObject.__worldTransformDirty = 0;
				openfl_display_DisplayObject.__worldRenderDirty = 0;
				this.__dirty = false;
			}
		}
	}
	,get_mouseX: function() {
		return this.__mouseX;
	}
	,get_mouseY: function() {
		return this.__mouseY;
	}
	,get_color: function() {
		return this.__color;
	}
	,set_color: function(value) {
		var r = (value & 16711680) >>> 16;
		var g = (value & 65280) >>> 8;
		var b = value & 255;
		this.__colorSplit = [r / 255,g / 255,b / 255];
		this.__colorString = "#" + StringTools.hex(value,6);
		return this.__color = value;
	}
	,get_focus: function() {
		return this.__focus;
	}
	,set_focus: function(value) {
		if(value != this.__focus) {
			if(this.__focus != null) {
				var event = new openfl_events_FocusEvent(openfl_events_FocusEvent.FOCUS_OUT,true,false,value,false,0);
				this.__stack = [];
				this.__focus.__getInteractive(this.__stack);
				this.__stack.reverse();
				this.__fireEvent(event,this.__stack);
			}
			if(value != null) {
				var event1 = new openfl_events_FocusEvent(openfl_events_FocusEvent.FOCUS_IN,true,false,this.__focus,false,0);
				this.__stack = [];
				value.__getInteractive(this.__stack);
				this.__stack.reverse();
				this.__fireEvent(event1,this.__stack);
			}
			this.__focus = value;
		}
		return this.__focus;
	}
	,__class__: openfl_display_Stage
	,__properties__: $extend(openfl_display_DisplayObjectContainer.prototype.__properties__,{set_focus:"set_focus",get_focus:"get_focus",set_color:"set_color",get_color:"get_color"})
});
var openfl_display_Stage3D = function() {
	openfl_events_EventDispatcher.call(this);
};
$hxClasses["openfl.display.Stage3D"] = openfl_display_Stage3D;
openfl_display_Stage3D.__name__ = true;
openfl_display_Stage3D.__super__ = openfl_events_EventDispatcher;
openfl_display_Stage3D.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_display_Stage3D
});
var openfl_display_StageAlign = $hxClasses["openfl.display.StageAlign"] = { __ename__ : true, __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] };
openfl_display_StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
openfl_display_StageAlign.TOP_RIGHT.toString = $estr;
openfl_display_StageAlign.TOP_RIGHT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.TOP_LEFT = ["TOP_LEFT",1];
openfl_display_StageAlign.TOP_LEFT.toString = $estr;
openfl_display_StageAlign.TOP_LEFT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.TOP = ["TOP",2];
openfl_display_StageAlign.TOP.toString = $estr;
openfl_display_StageAlign.TOP.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.RIGHT = ["RIGHT",3];
openfl_display_StageAlign.RIGHT.toString = $estr;
openfl_display_StageAlign.RIGHT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.LEFT = ["LEFT",4];
openfl_display_StageAlign.LEFT.toString = $estr;
openfl_display_StageAlign.LEFT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
openfl_display_StageAlign.BOTTOM_RIGHT.toString = $estr;
openfl_display_StageAlign.BOTTOM_RIGHT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
openfl_display_StageAlign.BOTTOM_LEFT.toString = $estr;
openfl_display_StageAlign.BOTTOM_LEFT.__enum__ = openfl_display_StageAlign;
openfl_display_StageAlign.BOTTOM = ["BOTTOM",7];
openfl_display_StageAlign.BOTTOM.toString = $estr;
openfl_display_StageAlign.BOTTOM.__enum__ = openfl_display_StageAlign;
var openfl_display_StageDisplayState = $hxClasses["openfl.display.StageDisplayState"] = { __ename__ : true, __constructs__ : ["NORMAL","FULL_SCREEN","FULL_SCREEN_INTERACTIVE"] };
openfl_display_StageDisplayState.NORMAL = ["NORMAL",0];
openfl_display_StageDisplayState.NORMAL.toString = $estr;
openfl_display_StageDisplayState.NORMAL.__enum__ = openfl_display_StageDisplayState;
openfl_display_StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",1];
openfl_display_StageDisplayState.FULL_SCREEN.toString = $estr;
openfl_display_StageDisplayState.FULL_SCREEN.__enum__ = openfl_display_StageDisplayState;
openfl_display_StageDisplayState.FULL_SCREEN_INTERACTIVE = ["FULL_SCREEN_INTERACTIVE",2];
openfl_display_StageDisplayState.FULL_SCREEN_INTERACTIVE.toString = $estr;
openfl_display_StageDisplayState.FULL_SCREEN_INTERACTIVE.__enum__ = openfl_display_StageDisplayState;
var openfl_display_StageQuality = $hxClasses["openfl.display.StageQuality"] = { __ename__ : true, __constructs__ : ["BEST","HIGH","MEDIUM","LOW"] };
openfl_display_StageQuality.BEST = ["BEST",0];
openfl_display_StageQuality.BEST.toString = $estr;
openfl_display_StageQuality.BEST.__enum__ = openfl_display_StageQuality;
openfl_display_StageQuality.HIGH = ["HIGH",1];
openfl_display_StageQuality.HIGH.toString = $estr;
openfl_display_StageQuality.HIGH.__enum__ = openfl_display_StageQuality;
openfl_display_StageQuality.MEDIUM = ["MEDIUM",2];
openfl_display_StageQuality.MEDIUM.toString = $estr;
openfl_display_StageQuality.MEDIUM.__enum__ = openfl_display_StageQuality;
openfl_display_StageQuality.LOW = ["LOW",3];
openfl_display_StageQuality.LOW.toString = $estr;
openfl_display_StageQuality.LOW.__enum__ = openfl_display_StageQuality;
var openfl_display_StageScaleMode = $hxClasses["openfl.display.StageScaleMode"] = { __ename__ : true, __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] };
openfl_display_StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
openfl_display_StageScaleMode.SHOW_ALL.toString = $estr;
openfl_display_StageScaleMode.SHOW_ALL.__enum__ = openfl_display_StageScaleMode;
openfl_display_StageScaleMode.NO_SCALE = ["NO_SCALE",1];
openfl_display_StageScaleMode.NO_SCALE.toString = $estr;
openfl_display_StageScaleMode.NO_SCALE.__enum__ = openfl_display_StageScaleMode;
openfl_display_StageScaleMode.NO_BORDER = ["NO_BORDER",2];
openfl_display_StageScaleMode.NO_BORDER.toString = $estr;
openfl_display_StageScaleMode.NO_BORDER.__enum__ = openfl_display_StageScaleMode;
openfl_display_StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
openfl_display_StageScaleMode.EXACT_FIT.toString = $estr;
openfl_display_StageScaleMode.EXACT_FIT.__enum__ = openfl_display_StageScaleMode;
var openfl_display_Tilesheet = function(image) {
	this.__bitmap = image;
	this.__centerPoints = [];
	this.__tileRects = [];
	this.__tileUVs = [];
	this.__rectTile = new openfl_geom_Rectangle();
	this.__rectUV = new openfl_geom_Rectangle();
	this.__point = new openfl_geom_Point();
};
$hxClasses["openfl.display.Tilesheet"] = openfl_display_Tilesheet;
openfl_display_Tilesheet.__name__ = true;
openfl_display_Tilesheet.prototype = {
	addTileRect: function(rectangle,centerPoint) {
		this.__tileRects.push(rectangle);
		if(centerPoint == null) centerPoint = openfl_display_Tilesheet.__defaultPoint;
		this.__centerPoints.push(centerPoint);
		this.__tileUVs.push(new openfl_geom_Rectangle(rectangle.get_left() / this.__bitmap.width,rectangle.get_top() / this.__bitmap.height,rectangle.get_right() / this.__bitmap.width,rectangle.get_bottom() / this.__bitmap.height));
		return this.__tileRects.length - 1;
	}
	,drawTiles: function(graphics,tileData,smooth,flags,count) {
		if(count == null) count = -1;
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		graphics.drawTiles(this,tileData,smooth,flags,count);
	}
	,__class__: openfl_display_Tilesheet
};
var openfl_display_TriangleCulling = $hxClasses["openfl.display.TriangleCulling"] = { __ename__ : true, __constructs__ : ["NEGATIVE","NONE","POSITIVE"] };
openfl_display_TriangleCulling.NEGATIVE = ["NEGATIVE",0];
openfl_display_TriangleCulling.NEGATIVE.toString = $estr;
openfl_display_TriangleCulling.NEGATIVE.__enum__ = openfl_display_TriangleCulling;
openfl_display_TriangleCulling.NONE = ["NONE",1];
openfl_display_TriangleCulling.NONE.toString = $estr;
openfl_display_TriangleCulling.NONE.__enum__ = openfl_display_TriangleCulling;
openfl_display_TriangleCulling.POSITIVE = ["POSITIVE",2];
openfl_display_TriangleCulling.POSITIVE.toString = $estr;
openfl_display_TriangleCulling.POSITIVE.__enum__ = openfl_display_TriangleCulling;
var openfl_events_Event = function(type,bubbles,cancelable) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.type = type;
	this.bubbles = bubbles;
	this.cancelable = cancelable;
	this.eventPhase = openfl_events_EventPhase.AT_TARGET;
};
$hxClasses["openfl.events.Event"] = openfl_events_Event;
openfl_events_Event.__name__ = true;
openfl_events_Event.prototype = {
	__class__: openfl_events_Event
};
var openfl_events_TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["openfl.events.TextEvent"] = openfl_events_TextEvent;
openfl_events_TextEvent.__name__ = true;
openfl_events_TextEvent.__super__ = openfl_events_Event;
openfl_events_TextEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_TextEvent
});
var openfl_events_ErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_TextEvent.call(this,type,bubbles,cancelable,text);
	this.errorID = id;
};
$hxClasses["openfl.events.ErrorEvent"] = openfl_events_ErrorEvent;
openfl_events_ErrorEvent.__name__ = true;
openfl_events_ErrorEvent.__super__ = openfl_events_TextEvent;
openfl_events_ErrorEvent.prototype = $extend(openfl_events_TextEvent.prototype,{
	__class__: openfl_events_ErrorEvent
});
var openfl_events__$EventDispatcher_Listener = function(callback,useCapture,priority) {
	this.callback = callback;
	this.useCapture = useCapture;
	this.priority = priority;
};
$hxClasses["openfl.events._EventDispatcher.Listener"] = openfl_events__$EventDispatcher_Listener;
openfl_events__$EventDispatcher_Listener.__name__ = true;
openfl_events__$EventDispatcher_Listener.prototype = {
	match: function(callback,useCapture) {
		return Reflect.compareMethods(this.callback,callback) && this.useCapture == useCapture;
	}
	,__class__: openfl_events__$EventDispatcher_Listener
};
var openfl_events_EventPhase = $hxClasses["openfl.events.EventPhase"] = { __ename__ : true, __constructs__ : ["CAPTURING_PHASE","AT_TARGET","BUBBLING_PHASE"] };
openfl_events_EventPhase.CAPTURING_PHASE = ["CAPTURING_PHASE",0];
openfl_events_EventPhase.CAPTURING_PHASE.toString = $estr;
openfl_events_EventPhase.CAPTURING_PHASE.__enum__ = openfl_events_EventPhase;
openfl_events_EventPhase.AT_TARGET = ["AT_TARGET",1];
openfl_events_EventPhase.AT_TARGET.toString = $estr;
openfl_events_EventPhase.AT_TARGET.__enum__ = openfl_events_EventPhase;
openfl_events_EventPhase.BUBBLING_PHASE = ["BUBBLING_PHASE",2];
openfl_events_EventPhase.BUBBLING_PHASE.toString = $estr;
openfl_events_EventPhase.BUBBLING_PHASE.__enum__ = openfl_events_EventPhase;
var openfl_events_FocusEvent = function(type,bubbles,cancelable,relatedObject,shiftKey,keyCode) {
	if(keyCode == null) keyCode = 0;
	if(shiftKey == null) shiftKey = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.keyCode = keyCode;
	this.shiftKey = shiftKey;
	this.relatedObject = relatedObject;
};
$hxClasses["openfl.events.FocusEvent"] = openfl_events_FocusEvent;
openfl_events_FocusEvent.__name__ = true;
openfl_events_FocusEvent.__super__ = openfl_events_Event;
openfl_events_FocusEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_FocusEvent
});
var openfl_events_IOErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl_events_ErrorEvent.call(this,type,bubbles,cancelable,text,id);
};
$hxClasses["openfl.events.IOErrorEvent"] = openfl_events_IOErrorEvent;
openfl_events_IOErrorEvent.__name__ = true;
openfl_events_IOErrorEvent.__super__ = openfl_events_ErrorEvent;
openfl_events_IOErrorEvent.prototype = $extend(openfl_events_ErrorEvent.prototype,{
	__class__: openfl_events_IOErrorEvent
});
var openfl_events_KeyboardEvent = function(type,bubbles,cancelable,charCodeValue,keyCodeValue,keyLocationValue,ctrlKeyValue,altKeyValue,shiftKeyValue,controlKeyValue,commandKeyValue) {
	if(commandKeyValue == null) commandKeyValue = false;
	if(controlKeyValue == null) controlKeyValue = false;
	if(shiftKeyValue == null) shiftKeyValue = false;
	if(altKeyValue == null) altKeyValue = false;
	if(ctrlKeyValue == null) ctrlKeyValue = false;
	if(keyCodeValue == null) keyCodeValue = 0;
	if(charCodeValue == null) charCodeValue = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.charCode = charCodeValue;
	this.keyCode = keyCodeValue;
	if(keyLocationValue != null) this.keyLocation = keyLocationValue; else this.keyLocation = 0;
	this.ctrlKey = ctrlKeyValue;
	this.altKey = altKeyValue;
	this.shiftKey = shiftKeyValue;
	this.controlKey = controlKeyValue;
	this.commandKey = commandKeyValue;
};
$hxClasses["openfl.events.KeyboardEvent"] = openfl_events_KeyboardEvent;
openfl_events_KeyboardEvent.__name__ = true;
openfl_events_KeyboardEvent.__super__ = openfl_events_Event;
openfl_events_KeyboardEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_KeyboardEvent
});
var openfl_events_MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
};
$hxClasses["openfl.events.MouseEvent"] = openfl_events_MouseEvent;
openfl_events_MouseEvent.__name__ = true;
openfl_events_MouseEvent.__altKey = null;
openfl_events_MouseEvent.__commandKey = null;
openfl_events_MouseEvent.__ctrlKey = null;
openfl_events_MouseEvent.__shiftKey = null;
openfl_events_MouseEvent.__create = function(type,button,stageX,stageY,local,target,delta) {
	if(delta == null) delta = 0;
	switch(type) {
	case "mouseDown":case "middleMouseDown":case "rightMouseDown":
		openfl_events_MouseEvent.__buttonDown[button] = true;
		break;
	case "mouseUp":case "middleMouseUp":case "rightMouseUp":
		openfl_events_MouseEvent.__buttonDown[button] = false;
		break;
	}
	var event = new openfl_events_MouseEvent(type,true,false,local.x,local.y,null,openfl_events_MouseEvent.__ctrlKey,openfl_events_MouseEvent.__altKey,openfl_events_MouseEvent.__shiftKey,openfl_events_MouseEvent.__buttonDown[button],delta,openfl_events_MouseEvent.__commandKey);
	event.stageX = stageX;
	event.stageY = stageY;
	event.target = target;
	return event;
};
openfl_events_MouseEvent.__super__ = openfl_events_Event;
openfl_events_MouseEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_MouseEvent
});
var openfl_events_TouchEvent = function(type,bubbles,cancelable,localX,localY,sizeX,sizeY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(sizeY == null) sizeY = 1;
	if(sizeX == null) sizeX = 1;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.pressure = 1;
	this.touchPointID = 0;
	this.isPrimaryTouchPoint = true;
};
$hxClasses["openfl.events.TouchEvent"] = openfl_events_TouchEvent;
openfl_events_TouchEvent.__name__ = true;
openfl_events_TouchEvent.__create = function(type,touch,stageX,stageY,local,target) {
	var evt = new openfl_events_TouchEvent(type,true,false,local.x,local.y,null,null,null,false,false,false,false,0,null,0);
	evt.stageX = stageX;
	evt.stageY = stageY;
	evt.target = target;
	return evt;
};
openfl_events_TouchEvent.__super__ = openfl_events_Event;
openfl_events_TouchEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_TouchEvent
});
var openfl_filters_BitmapFilter = function() { };
$hxClasses["openfl.filters.BitmapFilter"] = openfl_filters_BitmapFilter;
openfl_filters_BitmapFilter.__name__ = true;
var openfl_geom_Matrix3D = function() { };
$hxClasses["openfl.geom.Matrix3D"] = openfl_geom_Matrix3D;
openfl_geom_Matrix3D.__name__ = true;
openfl_geom_Matrix3D.prototype = {
	__class__: openfl_geom_Matrix3D
};
var openfl_geom_Transform = function(displayObject) {
	this.__colorTransform = new openfl_geom_ColorTransform();
	this.concatenatedColorTransform = new openfl_geom_ColorTransform();
	this.concatenatedMatrix = new openfl_geom_Matrix();
	this.pixelBounds = new openfl_geom_Rectangle();
	this.__displayObject = displayObject;
	this.__hasMatrix = true;
};
$hxClasses["openfl.geom.Transform"] = openfl_geom_Transform;
openfl_geom_Transform.__name__ = true;
openfl_geom_Transform.prototype = {
	get_colorTransform: function() {
		return this.__colorTransform;
	}
	,__class__: openfl_geom_Transform
	,__properties__: {get_colorTransform:"get_colorTransform"}
};
var openfl_geom_Vector3D = function() { };
$hxClasses["openfl.geom.Vector3D"] = openfl_geom_Vector3D;
openfl_geom_Vector3D.__name__ = true;
var openfl_media_ID3Info = function() { };
$hxClasses["openfl.media.ID3Info"] = openfl_media_ID3Info;
openfl_media_ID3Info.__name__ = true;
var openfl_media_Sound = function(stream,context) {
	openfl_events_EventDispatcher.call(this,this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.id3 = null;
	this.isBuffering = false;
	this.length = 0;
	this.url = null;
	if(stream != null) this.load(stream,context);
};
$hxClasses["openfl.media.Sound"] = openfl_media_Sound;
openfl_media_Sound.__name__ = true;
openfl_media_Sound.__super__ = openfl_events_EventDispatcher;
openfl_media_Sound.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	load: function(stream,context) {
		this.url = stream.url;
		this.__soundID = haxe_io_Path.withoutExtension(stream.url);
		if(!openfl_media_Sound.__registeredSounds.exists(this.__soundID)) {
			openfl_media_Sound.__registeredSounds.set(this.__soundID,true);
			createjs.Sound.addEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.addEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			createjs.Sound.registerSound(this.url,this.__soundID);
		} else this.dispatchEvent(new openfl_events_Event(openfl_events_Event.COMPLETE));
	}
	,SoundJS_onFileLoad: function(event) {
		if(event.id == this.__soundID) {
			createjs.Sound.removeEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.removeEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			this.dispatchEvent(new openfl_events_Event(openfl_events_Event.COMPLETE));
		}
	}
	,SoundJS_onFileError: function(event) {
		if(event.id == this.__soundID) {
			createjs.Sound.removeEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.removeEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			this.dispatchEvent(new openfl_events_IOErrorEvent(openfl_events_IOErrorEvent.IO_ERROR));
		}
	}
	,__class__: openfl_media_Sound
});
var openfl_media_SoundLoaderContext = function() { };
$hxClasses["openfl.media.SoundLoaderContext"] = openfl_media_SoundLoaderContext;
openfl_media_SoundLoaderContext.__name__ = true;
var openfl_media_SoundTransform = function(vol,panning) {
	if(panning == null) panning = 0;
	if(vol == null) vol = 1;
	this.volume = vol;
	this.pan = panning;
	this.leftToLeft = 0;
	this.leftToRight = 0;
	this.rightToLeft = 0;
	this.rightToRight = 0;
};
$hxClasses["openfl.media.SoundTransform"] = openfl_media_SoundTransform;
openfl_media_SoundTransform.__name__ = true;
openfl_media_SoundTransform.prototype = {
	__class__: openfl_media_SoundTransform
};
var openfl_net_URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = openfl_net_URLRequestMethod.GET;
	this.contentType = null;
};
$hxClasses["openfl.net.URLRequest"] = openfl_net_URLRequest;
openfl_net_URLRequest.__name__ = true;
openfl_net_URLRequest.prototype = {
	__class__: openfl_net_URLRequest
};
var openfl_net_URLRequestHeader = function() { };
$hxClasses["openfl.net.URLRequestHeader"] = openfl_net_URLRequestHeader;
openfl_net_URLRequestHeader.__name__ = true;
var openfl_net_URLRequestMethod = function() { };
$hxClasses["openfl.net.URLRequestMethod"] = openfl_net_URLRequestMethod;
openfl_net_URLRequestMethod.__name__ = true;
var openfl_text_GridFitType = $hxClasses["openfl.text.GridFitType"] = { __ename__ : true, __constructs__ : ["NONE","PIXEL","SUBPIXEL"] };
openfl_text_GridFitType.NONE = ["NONE",0];
openfl_text_GridFitType.NONE.toString = $estr;
openfl_text_GridFitType.NONE.__enum__ = openfl_text_GridFitType;
openfl_text_GridFitType.PIXEL = ["PIXEL",1];
openfl_text_GridFitType.PIXEL.toString = $estr;
openfl_text_GridFitType.PIXEL.__enum__ = openfl_text_GridFitType;
openfl_text_GridFitType.SUBPIXEL = ["SUBPIXEL",2];
openfl_text_GridFitType.SUBPIXEL.toString = $estr;
openfl_text_GridFitType.SUBPIXEL.__enum__ = openfl_text_GridFitType;
var openfl_text_TextFormatRange = function() { };
$hxClasses["openfl.text.TextFormatRange"] = openfl_text_TextFormatRange;
openfl_text_TextFormatRange.__name__ = true;
openfl_text_TextFormatRange.prototype = {
	__class__: openfl_text_TextFormatRange
};
var openfl_text_TextFieldAutoSize = $hxClasses["openfl.text.TextFieldAutoSize"] = { __ename__ : true, __constructs__ : ["CENTER","LEFT","NONE","RIGHT"] };
openfl_text_TextFieldAutoSize.CENTER = ["CENTER",0];
openfl_text_TextFieldAutoSize.CENTER.toString = $estr;
openfl_text_TextFieldAutoSize.CENTER.__enum__ = openfl_text_TextFieldAutoSize;
openfl_text_TextFieldAutoSize.LEFT = ["LEFT",1];
openfl_text_TextFieldAutoSize.LEFT.toString = $estr;
openfl_text_TextFieldAutoSize.LEFT.__enum__ = openfl_text_TextFieldAutoSize;
openfl_text_TextFieldAutoSize.NONE = ["NONE",2];
openfl_text_TextFieldAutoSize.NONE.toString = $estr;
openfl_text_TextFieldAutoSize.NONE.__enum__ = openfl_text_TextFieldAutoSize;
openfl_text_TextFieldAutoSize.RIGHT = ["RIGHT",3];
openfl_text_TextFieldAutoSize.RIGHT.toString = $estr;
openfl_text_TextFieldAutoSize.RIGHT.__enum__ = openfl_text_TextFieldAutoSize;
var openfl_text_TextFieldType = $hxClasses["openfl.text.TextFieldType"] = { __ename__ : true, __constructs__ : ["DYNAMIC","INPUT"] };
openfl_text_TextFieldType.DYNAMIC = ["DYNAMIC",0];
openfl_text_TextFieldType.DYNAMIC.toString = $estr;
openfl_text_TextFieldType.DYNAMIC.__enum__ = openfl_text_TextFieldType;
openfl_text_TextFieldType.INPUT = ["INPUT",1];
openfl_text_TextFieldType.INPUT.toString = $estr;
openfl_text_TextFieldType.INPUT.__enum__ = openfl_text_TextFieldType;
var openfl_text_TextFormat = function(font,size,color,bold,italic,underline,url,target,align,leftMargin,rightMargin,indent,leading) {
	this.font = font;
	this.size = size;
	this.color = color;
	this.bold = bold;
	this.italic = italic;
	this.underline = underline;
	this.url = url;
	this.target = target;
	this.align = align;
	this.leftMargin = leftMargin;
	this.rightMargin = rightMargin;
	this.indent = indent;
	this.leading = leading;
};
$hxClasses["openfl.text.TextFormat"] = openfl_text_TextFormat;
openfl_text_TextFormat.__name__ = true;
openfl_text_TextFormat.prototype = {
	clone: function() {
		var newFormat = new openfl_text_TextFormat(this.font,this.size,this.color,this.bold,this.italic,this.underline,this.url,this.target);
		newFormat.align = this.align;
		newFormat.leftMargin = this.leftMargin;
		newFormat.rightMargin = this.rightMargin;
		newFormat.indent = this.indent;
		newFormat.leading = this.leading;
		newFormat.blockIndent = this.blockIndent;
		newFormat.bullet = this.bullet;
		newFormat.kerning = this.kerning;
		newFormat.letterSpacing = this.letterSpacing;
		newFormat.tabStops = this.tabStops;
		return newFormat;
	}
	,__merge: function(format) {
		if(format.font != null) this.font = format.font;
		if(format.size != null) this.size = format.size;
		if(format.color != null) this.color = format.color;
		if(format.bold != null) this.bold = format.bold;
		if(format.italic != null) this.italic = format.italic;
		if(format.underline != null) this.underline = format.underline;
		if(format.url != null) this.url = format.url;
		if(format.target != null) this.target = format.target;
		if(format.align != null) this.align = format.align;
		if(format.leftMargin != null) this.leftMargin = format.leftMargin;
		if(format.rightMargin != null) this.rightMargin = format.rightMargin;
		if(format.indent != null) this.indent = format.indent;
		if(format.leading != null) this.leading = format.leading;
		if(format.blockIndent != null) this.blockIndent = format.blockIndent;
		if(format.bullet != null) this.bullet = format.bullet;
		if(format.kerning != null) this.kerning = format.kerning;
		if(format.letterSpacing != null) this.letterSpacing = format.letterSpacing;
		if(format.tabStops != null) this.tabStops = format.tabStops;
	}
	,__class__: openfl_text_TextFormat
};
var openfl_text_TextFormatAlign = $hxClasses["openfl.text.TextFormatAlign"] = { __ename__ : true, __constructs__ : ["LEFT","RIGHT","JUSTIFY","CENTER"] };
openfl_text_TextFormatAlign.LEFT = ["LEFT",0];
openfl_text_TextFormatAlign.LEFT.toString = $estr;
openfl_text_TextFormatAlign.LEFT.__enum__ = openfl_text_TextFormatAlign;
openfl_text_TextFormatAlign.RIGHT = ["RIGHT",1];
openfl_text_TextFormatAlign.RIGHT.toString = $estr;
openfl_text_TextFormatAlign.RIGHT.__enum__ = openfl_text_TextFormatAlign;
openfl_text_TextFormatAlign.JUSTIFY = ["JUSTIFY",2];
openfl_text_TextFormatAlign.JUSTIFY.toString = $estr;
openfl_text_TextFormatAlign.JUSTIFY.__enum__ = openfl_text_TextFormatAlign;
openfl_text_TextFormatAlign.CENTER = ["CENTER",3];
openfl_text_TextFormatAlign.CENTER.toString = $estr;
openfl_text_TextFormatAlign.CENTER.__enum__ = openfl_text_TextFormatAlign;
var openfl_text_TextLineMetrics = function(x,width,height,ascent,descent,leading) {
	this.x = x;
	this.width = width;
	this.height = height;
	this.ascent = ascent;
	this.descent = descent;
	this.leading = leading;
};
$hxClasses["openfl.text.TextLineMetrics"] = openfl_text_TextLineMetrics;
openfl_text_TextLineMetrics.__name__ = true;
openfl_text_TextLineMetrics.prototype = {
	__class__: openfl_text_TextLineMetrics
};
var openfl_ui_Keyboard = function() { };
$hxClasses["openfl.ui.Keyboard"] = openfl_ui_Keyboard;
openfl_ui_Keyboard.__name__ = true;
openfl_ui_Keyboard.convertKeyCode = function(key) {
	switch(key) {
	case 8:
		return 8;
	case 9:
		return 9;
	case 13:
		return 13;
	case 27:
		return 27;
	case 32:
		return 32;
	case 33:
		return 49;
	case 34:
		return 222;
	case 35:
		return 51;
	case 36:
		return 52;
	case 37:
		return 53;
	case 38:
		return 55;
	case 39:
		return 222;
	case 40:
		return 57;
	case 41:
		return 48;
	case 42:
		return 56;
	case 44:
		return 188;
	case 45:
		return 189;
	case 46:
		return 190;
	case 47:
		return 191;
	case 48:
		return 48;
	case 49:
		return 49;
	case 50:
		return 50;
	case 51:
		return 51;
	case 52:
		return 52;
	case 53:
		return 53;
	case 54:
		return 54;
	case 55:
		return 55;
	case 56:
		return 56;
	case 57:
		return 57;
	case 58:
		return 186;
	case 59:
		return 186;
	case 60:
		return 60;
	case 61:
		return 187;
	case 62:
		return 190;
	case 63:
		return 191;
	case 64:
		return 50;
	case 91:
		return 219;
	case 92:
		return 220;
	case 93:
		return 221;
	case 94:
		return 54;
	case 95:
		return 189;
	case 96:
		return 192;
	case 97:
		return 65;
	case 98:
		return 66;
	case 99:
		return 67;
	case 100:
		return 68;
	case 101:
		return 69;
	case 102:
		return 70;
	case 103:
		return 71;
	case 104:
		return 72;
	case 105:
		return 73;
	case 106:
		return 74;
	case 107:
		return 75;
	case 108:
		return 76;
	case 109:
		return 77;
	case 110:
		return 78;
	case 111:
		return 79;
	case 112:
		return 80;
	case 113:
		return 81;
	case 114:
		return 82;
	case 115:
		return 83;
	case 116:
		return 84;
	case 117:
		return 85;
	case 118:
		return 86;
	case 119:
		return 87;
	case 120:
		return 88;
	case 121:
		return 89;
	case 122:
		return 90;
	case 127:
		return 46;
	case 1073741881:
		return 20;
	case 1073741882:
		return 112;
	case 1073741883:
		return 113;
	case 1073741884:
		return 114;
	case 1073741885:
		return 115;
	case 1073741886:
		return 116;
	case 1073741887:
		return 117;
	case 1073741888:
		return 118;
	case 1073741889:
		return 119;
	case 1073741890:
		return 120;
	case 1073741891:
		return 121;
	case 1073741892:
		return 122;
	case 1073741893:
		return 123;
	case 1073741894:
		return 301;
	case 1073741895:
		return 145;
	case 1073741896:
		return 19;
	case 1073741897:
		return 45;
	case 1073741898:
		return 36;
	case 1073741899:
		return 33;
	case 1073741901:
		return 35;
	case 1073741902:
		return 34;
	case 1073741903:
		return 39;
	case 1073741904:
		return 37;
	case 1073741905:
		return 40;
	case 1073741906:
		return 38;
	case 1073741907:
		return 144;
	case 1073741908:
		return 111;
	case 1073741909:
		return 106;
	case 1073741910:
		return 109;
	case 1073741911:
		return 107;
	case 1073741912:
		return 108;
	case 1073741913:
		return 97;
	case 1073741914:
		return 98;
	case 1073741915:
		return 99;
	case 1073741916:
		return 100;
	case 1073741917:
		return 101;
	case 1073741918:
		return 102;
	case 1073741919:
		return 103;
	case 1073741920:
		return 104;
	case 1073741921:
		return 105;
	case 1073741922:
		return 96;
	case 1073741923:
		return 110;
	case 1073741925:
		return 302;
	case 1073741928:
		return 124;
	case 1073741929:
		return 125;
	case 1073741930:
		return 126;
	case 1073741982:
		return 13;
	case 1073742044:
		return 110;
	case 1073742048:
		return 17;
	case 1073742049:
		return 16;
	case 1073742050:
		return 18;
	case 1073742051:
		return 15;
	case 1073742052:
		return 17;
	case 1073742053:
		return 16;
	case 1073742054:
		return 18;
	case 1073742055:
		return 15;
	default:
		return key;
	}
};
openfl_ui_Keyboard.__getCharCode = function(key,shift) {
	if(shift == null) shift = false;
	if(!shift) {
		switch(key) {
		case 8:
			return 8;
		case 9:
			return 9;
		case 13:
			return 13;
		case 27:
			return 27;
		case 32:
			return 32;
		case 186:
			return 59;
		case 187:
			return 61;
		case 188:
			return 44;
		case 189:
			return 45;
		case 190:
			return 46;
		case 191:
			return 47;
		case 192:
			return 96;
		case 219:
			return 91;
		case 220:
			return 92;
		case 221:
			return 93;
		case 222:
			return 39;
		}
		if(key >= 48 && key <= 57) return key - 48 + 48;
		if(key >= 65 && key <= 90) return key - 65 + 97;
	} else {
		switch(key) {
		case 48:
			return 41;
		case 49:
			return 33;
		case 50:
			return 64;
		case 51:
			return 35;
		case 52:
			return 36;
		case 53:
			return 37;
		case 54:
			return 94;
		case 55:
			return 38;
		case 56:
			return 42;
		case 57:
			return 40;
		case 186:
			return 58;
		case 187:
			return 43;
		case 188:
			return 60;
		case 189:
			return 95;
		case 190:
			return 62;
		case 191:
			return 63;
		case 192:
			return 126;
		case 219:
			return 123;
		case 220:
			return 124;
		case 221:
			return 125;
		case 222:
			return 34;
		}
		if(key >= 65 && key <= 90) return key - 65 + 65;
	}
	if(key >= 96 && key <= 105) return key - 96 + 48;
	switch(key) {
	case 106:
		return 42;
	case 107:
		return 43;
	case 108:
		return 44;
	case 110:
		return 45;
	case 111:
		return 46;
	case 46:
		return 127;
	case 13:
		return 13;
	case 8:
		return 8;
	}
	return 0;
};
var spritesheet_AnimatedSprite = function(sheet,smoothing) {
	if(smoothing == null) smoothing = false;
	openfl_display_Sprite.call(this);
	this.smoothing = smoothing;
	this.spritesheet = sheet;
	this.behaviorQueue = [];
	this.bitmap = new openfl_display_Bitmap();
	this.addChild(this.bitmap);
};
$hxClasses["spritesheet.AnimatedSprite"] = spritesheet_AnimatedSprite;
spritesheet_AnimatedSprite.__name__ = true;
spritesheet_AnimatedSprite.__super__ = openfl_display_Sprite;
spritesheet_AnimatedSprite.prototype = $extend(openfl_display_Sprite.prototype,{
	resolveBehavior: function(behavior) {
		if(js_Boot.__instanceof(behavior,spritesheet_data_BehaviorData)) return behavior; else if(typeof(behavior) == "string") {
			if(this.spritesheet != null) return this.spritesheet.behaviors.get(behavior);
		}
		return null;
	}
	,showBehavior: function(behavior,restart) {
		if(restart == null) restart = true;
		this.behaviorQueue = [];
		this.updateBehavior(this.resolveBehavior(behavior),restart);
	}
	,update: function(deltaTime) {
		if(!this.behaviorComplete) {
			this.timeElapsed += deltaTime;
			var ratio = this.timeElapsed / this.loopTime;
			if(ratio >= 1) {
				if(this.currentBehavior.loop) ratio -= Math.floor(ratio); else {
					this.behaviorComplete = true;
					ratio = 1;
				}
			}
			this.currentFrameIndex = Math.round(ratio * (this.currentBehavior.frames.length - 1));
			var frameIndex = this.currentBehavior.frames[this.currentFrameIndex];
			var frame = this.spritesheet.getFrame(frameIndex);
			this.bitmap.bitmapData = frame.bitmapData;
			this.bitmap.smoothing = this.smoothing;
			this.bitmap.set_x(frame.offsetX - this.currentBehavior.originX);
			this.bitmap.set_y(frame.offsetY - this.currentBehavior.originY);
			if(this.behaviorComplete) {
				if(this.behaviorQueue.length > 0) this.updateBehavior(this.behaviorQueue.shift()); else if(this.hasEventListener(openfl_events_Event.COMPLETE)) this.dispatchEvent(new openfl_events_Event(openfl_events_Event.COMPLETE));
			}
		}
	}
	,updateBehavior: function(behavior,restart) {
		if(restart == null) restart = true;
		if(behavior != null) {
			if(restart || behavior != this.currentBehavior) {
				this.currentBehavior = behavior;
				this.timeElapsed = 0;
				this.behaviorComplete = false;
				this.loopTime = behavior.frames.length / behavior.frameRate * 1000 | 0;
				if(this.bitmap.bitmapData == null) this.update(0);
			}
		} else {
			this.bitmap.bitmapData = null;
			this.currentBehavior = null;
			this.currentFrameIndex = -1;
			this.behaviorComplete = true;
		}
	}
	,__class__: spritesheet_AnimatedSprite
});
var spritesheet_Spritesheet = function(image,frames,behaviors,imageAlpha) {
	this.sourceImage = image;
	this.sourceImageAlpha = imageAlpha;
	if(frames == null) {
		this.frames = [];
		this.totalFrames = 0;
	} else {
		this.frames = frames;
		this.totalFrames = frames.length;
	}
	if(behaviors == null) this.behaviors = new haxe_ds_StringMap(); else this.behaviors = behaviors;
};
$hxClasses["spritesheet.Spritesheet"] = spritesheet_Spritesheet;
spritesheet_Spritesheet.__name__ = true;
spritesheet_Spritesheet.prototype = {
	addBehavior: function(behavior) {
		this.behaviors.set(behavior.name,behavior);
	}
	,generateBitmap: function(index) {
		var frame = this.frames[index];
		var bitmapData = new openfl_display_BitmapData(frame.width,frame.height,true);
		var sourceRectangle = new openfl_geom_Rectangle(frame.x,frame.y,frame.width,frame.height);
		var targetPoint = new openfl_geom_Point();
		bitmapData.copyPixels(this.sourceImage,sourceRectangle,targetPoint);
		if(this.sourceImageAlpha != null) bitmapData.copyChannel(this.sourceImageAlpha,sourceRectangle,targetPoint,2,8);
		frame.bitmapData = bitmapData;
	}
	,getFrame: function(index,autoGenerate) {
		if(autoGenerate == null) autoGenerate = true;
		var frame = this.frames[index];
		if(frame != null && frame.bitmapData == null && autoGenerate) this.generateBitmap(index);
		return frame;
	}
	,__class__: spritesheet_Spritesheet
};
var spritesheet_data_BehaviorData = function(name,frames,loop,frameRate,originX,originY) {
	if(originY == null) originY = 0;
	if(originX == null) originX = 0;
	if(frameRate == null) frameRate = 30;
	if(loop == null) loop = false;
	if(name == null) name = "";
	if(name == "") name = "behavior" + spritesheet_data_BehaviorData.uniqueID++;
	if(frames == null) frames = [];
	this.name = name;
	this.frames = frames;
	this.loop = loop;
	this.frameRate = frameRate;
	this.originX = originX;
	this.originY = originY;
	this.frameData = [];
	var _g1 = 0;
	var _g = this.frames.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.frameData.push(null);
	}
};
$hxClasses["spritesheet.data.BehaviorData"] = spritesheet_data_BehaviorData;
spritesheet_data_BehaviorData.__name__ = true;
spritesheet_data_BehaviorData.prototype = {
	__class__: spritesheet_data_BehaviorData
};
var spritesheet_data_SpritesheetFrame = function(x,y,width,height,offsetX,offsetY) {
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
};
$hxClasses["spritesheet.data.SpritesheetFrame"] = spritesheet_data_SpritesheetFrame;
spritesheet_data_SpritesheetFrame.__name__ = true;
spritesheet_data_SpritesheetFrame.prototype = {
	__class__: spritesheet_data_SpritesheetFrame
};
var spritesheet_importers_BitmapImporter = function() { };
$hxClasses["spritesheet.importers.BitmapImporter"] = spritesheet_importers_BitmapImporter;
spritesheet_importers_BitmapImporter.__name__ = true;
spritesheet_importers_BitmapImporter.create = function(bitmapData,columns,rows,tileWidth,tileHeight,adjustLength,scale) {
	if(scale == null) scale = 1;
	if(adjustLength == null) adjustLength = 0;
	var frames = [];
	var totalLength = rows * columns + adjustLength;
	var _g = 0;
	while(_g < rows) {
		var row = _g++;
		var _g1 = 0;
		while(_g1 < columns) {
			var column = _g1++;
			if(frames.length < totalLength) {
				var x = tileWidth * column;
				var y = tileHeight * row;
				var frame = new spritesheet_data_SpritesheetFrame(x,y,tileWidth,tileHeight,0,0);
				if(scale != 1) {
					var sourceBitmapData = new openfl_display_BitmapData(tileWidth,tileHeight,true,0);
					sourceBitmapData.copyPixels(bitmapData,new openfl_geom_Rectangle(x,y,tileWidth,tileHeight),new openfl_geom_Point());
					var bitmap = new openfl_display_Bitmap(sourceBitmapData);
					bitmap.smoothing = true;
					var matrix = new openfl_geom_Matrix();
					matrix.scale(scale,scale);
					var bitmapData1 = new openfl_display_BitmapData(Math.round(tileWidth * scale),Math.round(tileHeight * scale),true,0);
					bitmapData1.draw(bitmap,matrix);
					frame.bitmapData = bitmapData1;
				}
				frames.push(frame);
			}
		}
	}
	while(frames.length < totalLength) frames.push(new spritesheet_data_SpritesheetFrame());
	return new spritesheet_Spritesheet(bitmapData,frames);
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = true;
$hxClasses.Array = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
haxe_Resource.content = [{ name : "__ASSET__:bitmap_Splash", data : "aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQWZRQUFBSDBDQVlBQUFETDF0K0tBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQXlScFZGaDBXRTFNT21OdmJTNWhaRzlpWlM1NGJYQUFBQUFBQUR3L2VIQmhZMnRsZENCaVpXZHBiajBpNzd1L0lpQnBaRDBpVnpWTk1FMXdRMlZvYVVoNmNtVlRlazVVWTNwcll6bGtJajgrSUR4NE9uaHRjRzFsZEdFZ2VHMXNibk02ZUQwaVlXUnZZbVU2Ym5NNmJXVjBZUzhpSUhnNmVHMXdkR3M5SWtGa2IySmxJRmhOVUNCRGIzSmxJRFV1TXkxak1ERXhJRFkyTGpFME5UWTJNU3dnTWpBeE1pOHdNaTh3TmkweE5EbzFOam95TnlBZ0lDQWdJQ0FnSWo0Z1BISmtaanBTUkVZZ2VHMXNibk02Y21SbVBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1THpBeUx6SXlMWEprWmkxemVXNTBZWGd0Ym5NaklqNGdQSEprWmpwRVpYTmpjbWx3ZEdsdmJpQnlaR1k2WVdKdmRYUTlJaUlnZUcxc2JuTTZlRzF3UFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzaGhjQzh4TGpBdklpQjRiV3h1Y3pwNGJYQk5UVDBpYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5NFlYQXZNUzR3TDIxdEx5SWdlRzFzYm5NNmMzUlNaV1k5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM5elZIbHdaUzlTWlhOdmRYSmpaVkpsWmlNaUlIaHRjRHBEY21WaGRHOXlWRzl2YkQwaVFXUnZZbVVnVUdodmRHOXphRzl3SUVOVE5pQW9UV0ZqYVc1MGIzTm9LU0lnZUcxd1RVMDZTVzV6ZEdGdVkyVkpSRDBpZUcxd0xtbHBaRG8yTTBJMU9FTkNOVUkwUkRBeE1VVTBPVEEyTlVaRFJFRXhRVVF5UmtKR01pSWdlRzF3VFUwNlJHOWpkVzFsYm5SSlJEMGllRzF3TG1ScFpEbzJNMEkxT0VOQ05rSTBSREF4TVVVME9UQTJOVVpEUkVFeFFVUXlSa0pHTWlJK0lEeDRiWEJOVFRwRVpYSnBkbVZrUm5KdmJTQnpkRkpsWmpwcGJuTjBZVzVqWlVsRVBTSjRiWEF1YVdsa09qWXpRalU0UTBJelFqUkVNREV4UlRRNU1EWTFSa05FUVRGQlJESkdRa1l5SWlCemRGSmxaanBrYjJOMWJXVnVkRWxFUFNKNGJYQXVaR2xrT2pZelFqVTRRMEkwUWpSRU1ERXhSVFE1TURZMVJrTkVRVEZCUkRKR1FrWXlJaTgrSUR3dmNtUm1Pa1JsYzJOeWFYQjBhVzl1UGlBOEwzSmtaanBTUkVZK0lEd3ZlRHA0YlhCdFpYUmhQaUE4UDNod1lXTnJaWFFnWlc1a1BTSnlJajgrQUZzcG9nQUFRR1ZKUkVGVWVOcnNuUW1jWDlQWng4OU1GaEVob1NXa2VNUEVUb210MUxSaVM0aGFNb2lnS1ZXMEZLVmFpdHBMVUZ0cFk0bjFWVnZvMkNyRUVxRmozM2NxUTE0VVFXMVpSTmIzOStTZU1GbG15Mzg3NTl6djkvTjVQbWVpNmVUYzV6N1A4N3ZuM3JOVXpaNDkyd0VBQUVEY1ZPTUNBQUFBQkIwQUFBQVFkQUFBQUVEUUFRQUFBRUVIQUFCQTBBRUFBQUJCQndBQUFBUWRBQUFBRUhRQUFBQUVIUUFBQUJCMEFBQUFRTkFCQUFBQVFRY0FBRURRQVFBQUFFRUhBQUFBQkIwQUFBQ2FvV09odjZDcXFnb3ZBalJEVFgzRFltcjZ5RmExUDhyZWJLeXJ2YXU1djkvbjFvWk9hcGFRZFpOMTlXMFhiNHMzK2RsK2J5ZWZ3L1p6QjFsbi8ydnN6NjBsNW16WjEvN25hYktaL3M4elpOUDl6MU85ZmRYazU4bmVKbGs3YmxEdDlCYXVmVWMxcTh2R3lkNnlWdGYrTlZGUlBHYlBubzBUNEZzOUxqUWdFSFNBT2VMVlU4MWFzblZrYThqV2xhMG1XM0crdjNxclV1WVBhcnQ3NnlGYlNyYWtienRIZHVuMk1QQ2xiS0p2UDVkOVlhYlNjb2JhM2ViNysrL1pRNDNzWmRrYnNsZGtyMHZvUHlTS0VIUkEwQUhLS2R3MktsNWJ0cjVzZ3lidE1tMzhGZThwWmE3T2g5aTQvUmJ5UU5NY244cWVsNzNnelg1K1ZVSS9uYWhEMEFGQkJ5aFV2S3Y5YUh0VGI1dDRBUzlrRkQxSktYTkJUZ1Q5Q0pkOU1paGs5UCtpN01rbTlvWkVmaGJSaWFBRGdnN1Frb0RidCt2TlpGdklhbVdiRnloSXplU01HK2F5YjlZcDAwR2w1ZGdTL0Y3N2R2K1k3QkZaZyt4eENmeGtCQjBBUVlkOEM3aUpkVDl2VzhyNnVteHlXV21UcnNvTmQ5a3I1cFJaUnFYbGtETDhPL1pnOUp6c0lkbFlNd244SkFRZEVIUUVIZElXOE01KzlMMk50MDNLSWVBTEVmVHJYVGJyTzJWV1ZXblp1d0wvcmduOFU3SUhaR05zRkMrQm40YWdBNEtPb0VQOEl0NWJ6UTZ5QVY3RXV3WFFyVkZLbTJmVEhqbTZEZFVNREtBcms3eTRqNWJkTFhFZmo2QURnbzZnUXh3Q2JoUFo3RHY0THJLZFhMYVVMRFFlVmRxTVNWelF0M0xaMjVEUWVFMTJwK3gybDMxL254VzNueEYwUU5BaExSRzNqVlQ2TnhIeDVRTHY4cXRLbS9yRUJYMlF5OWJraDh4SFRjVDkzaGczdlVIUUFVR0hsRVI4c0d4bmwyM0tFZ3YvVWRwY2xiaWcvMXpOOXlMcXNtMktjNGRzWkV6aWpxQURnZzZ4aXJoTllOdFc5dE1JUmJ3cGs1VTI1eWN1NkVlNmJBdmJHSmtyN3RmSjdwTzR6d3pYendnNklPZ1FsNURiYlBSOVpFTmtQWk5JdkNwM3BzdjJUVStSamlvcmYwamtXaWJJYmpSeGw3QS9oYUFEZ2c3UWZoRmZYczIrTW50MXUwWnlpVmZsTGxiejMwUnYzM2RVVmc1TzhMcHM3M243VkhKTktIdlBJK2lBb0VPb0ltNzdwTnRTcDEvNHRrT3lpVmZsYmxEVG1PcXRWRm5aSytGUXRWZndvMlJYV0Z2Si9lWVJkRURRSVRRaFgwbk5RYklEWFNLdjFOdkEzVXFkWjFLOE1KV1VqVnkyOWo4UDJDdjVFYkxMSk96dkl1aUFvRU1lUmR6V2k5c3NkWHMxK3hOWmRjNWM4SmhTNTRGRUJkMDI4Tms4Wi9mVDFyUC9VM2FKYkhTNTFyY2o2SUNnUXlXRjNNNzl0dS9paDlzZmMreUsxNVE2LzBoVTBPME05TFZ5ZkcvdFU4cUZzcXNrN0JNUmRFRFFJVFVoWDBYTllTNzdQcjRVSG5IdkszV3VURlRROTFmVGkxczhaL21iZldlL1NNTCtOb0lPQ0RyRUx1UzI1T3hvV1ozTDMydjFscGlpMURrdlVVSC9yWnF1M09KdlhTS3p0ekZuRjN2cEc0SU9DRHFVV3NRdEtPejcrREd5cmZCSWM3bmp6bEl6UGJITDZxU1NjZ3gzdDFrZWxObDl0OTNvQ2xaakJCMFFkQ2lWa05zSWZMQVg4ZzN3U0t1Q2JoT29Qa25zc3I2cmt2SXI3bTZyUE8rRmZXUWhFK2dRZEVEUW9WUkNmcUxMOTJTbzlncTY3VUEyTHJITDZxT1NNb1M3MjJiczlMZFRGMVhZRVhSQTBLR1lRajVVZHF4TGNEZTNNbkNQMHVmcGxDNUk1V1JqTmR0emE5dU43VUkzVEhadGU0UWRRUWNFSFFvVmNydnBOc250TkVia0JmRzQwdWYreEFUZERzL1pqRnRiMElqOUJGbDlXNzZ4SStqUUZHWWRRM3ZGM0VaZno4cHVRY3dMcGdmWEJQT3hscyt0WjVWck8rQU9ZSVFPcFJEeVRkV2NJL3NSM2lnYUh5aDlya2hzaEc3N0RLekFyUzBhRGJLak5GcC9raEU2SU9oUXFKRGJibTVudUd6U0d4U1hyNVErNXlZbTZFZXBXWnhiVzNSdWxoMHJZVzlFMEFGQmgvWUsrZEpxVHBJZEl1dUVSMHFVZ0ZYdWJEWFRFcm1jemlvblIzTlhTNGJ0V1RCY2RvcUUvVE1FSGVhbkl5NkErWVRjWXNKT1ByTUpiOHZna1pMVFhmWnhRdGNDcGNNZXJIOGpHNm84dFlsemw4bG00QlpnaEE0TEUvT3QxZnhGdGk3ZUtOc0kvU1kxYnlaeU9hdXBuT3pKWFMwYkw1dkFhN1ErQmxla1FjRjZqS0NEUDQvOGZObHVlS1BzakZZS1BaWENoYWlVMkw3OUE3aWxaY2YyaVQreUV1ZXhBNElPNFFpNXZjSTd3bVhmeXBmQUl4WGhDYVhRZllrSStuWnFmc0F0clFoVFpDZkxMcEN3VDhjZCtSUjAxcUhuVjh4LzdMTDlwTTlHekN0S0Q2NEZpa0JYbjh2UCs5eUdITUlJUFg5Q2JrWFhsa3J0anplQzRFT2wwT1V0UGJUTEp2c1JtTFZUdlgzbDI2OWxNMTAyVTk1c2x2L3ZiYUdMZjZqdjdLMkRiREgvM3hmM2JSZi93TmZWdDFVdGpOQVBVTE04dHpRSXJuVFordlhQY1VWK1J1Z0llcjdFZkE4MUY4bDY0bzFnc0hQUmJXbmdGOTYrYk5MT0VmRnhnMnFEV0p2VTU5WTVXLzdPRmZlbHZIV2ZheW9sd3gzbm9JZkVCTmxoRXZXYmNRV0NqcUNuSStUZmM5bjYxWjN4UnBCMFY5SDlNdklZVzhvL2lFQjQzQ0U3UkRIMkgxeVJ0cUN6RGoxOU1kOVB6UVdPTmNJaFlLL003VlF0VzZabU8zN1owYWx2dWJhL0lnOFp1NForc2xWdE1HK2hKMXZOWmFmd01VZWpzdGlEL0phcUJVZEkxSy9HSGVuQ0NEMWRJYmR2bWJaUCtFQzhVWGJzVy9ZcnNoZGtMN3JzQkMyemQ5cHlnbFppY1dnRlltV1hIVHBpOW4zWitySjFYUGJkSHNyTEtOa3ZGSWNmNG9yMFJ1Z0llcHBGZEcrWGZTdG5wN2Z5aVBkenNxZTgyYyt2cVdDeWcxZkxNZHJSQy93R01qdjRaeFAvODJKNHArUjg2ckp2NjlmakNnUWRRUSszU05vTTlvdGxRL0JHeVhqZlpTZGdtVDFtbzNEVy9SWXRmanY1MGZ2bXNscHZ2ZkJNeWJoUmRqQXo0UkYwQkQyOFl0aFB6Yld5RmZGR1VYbFA5b0Jzck93aEZiKzNjVWxaNDNvVk5iYXVlaXZaTnNSM1NlSjdxT0o2TEs1QTBCSDBNRVkxcDh0KzUxcFlJd3h0WnFJWDhOR3krMVhveHVHU29PTGRKdHh0NjdJdFprM2dsOFFyaGV1STdCelo4Ynh0UXRDNUM1VXJiamFqMkY2YmJZSTNDdUpWMloyeWUyU1BVTlNpZXBqZFFyYTliQ2ZaMm5pbElHd095QkRGLzF1NEFrR0g4aGF6d1dwR3VHeHpEMmdmdHB1YWZRTy9YWFlIby9Da1J1KzJSR3NYbDMxL1oydnI5bVA3SVJ5b25CaUpLeEIwS0gzUnNxMDQ3WWpUZy9CR3UwVjhyTXgyemFwWHdmb0lseVNkSjh1cHFaUFo3b2o5RVBkMlkyZXQyOUdzVTNFRmdnNmxLVkwyaXQyT1N0d0FiN1NaUjJSL1I4UVJkOWxQWGZhS0h0cUdIZDYwRzYvZ0VYUW9mbEd5VjRuWE9FNjBhZ3UyRzl2L3lxNVhNUnFQTzZCSkh2VldZL3MwREpXdGlVZGF4WmEwN2FzOHVnTlhJT2hRZUFHeUU3Qk9reDJMTjFyRVpxZmZKTHRDeGVkeDNBRnR5SzNOMVB4Q3RxZGp0bnhyREpPZG9OeWFpU3NRZEZpMGdyTzB5MmF4OThjYnpXTGlmYW5zWmhXYnliZ0RGaUhQYks5NSs5YitTOWxtZUtSWjduWFpMUGpQY0FXQ0R1MHJNcmJYdGMzQ3JzRWJDMkRDYmR0V0RsZHhlUjUzUUJIenp1YW4ySEcyOWxxZVEyVVd4QTRWMmxWNTl6S3VRTkNoYlVWbGtNdStBWGZERy9OZ3U3VFpIdlZYeEg3Y0tBU2ZnN1ljZEgvWjRiSlY4TWc4VEpMOVREbDRLNjVBMEtINUltTE9QRTcySjd3eER3KzU3QWhZV3pNK0MzZEFHWFBTbHJ2WmhOUWpaRnZpa1huNG8reU12SjBnaUtCRFd3cUhuVEpseDUzdWd6ZXkySGJaRXIyelZUQ2V3aDBRUUk3YWpveEh5M1p6YkxNOGwrdGNkaHpyMTdnQ1FZZXNVQ3lyeGw1ZnNVYldPZHQyOVNyWk9Tb1NiK0lPQ0RCZlYzUFoyUWsvbDNYQ0kzUDJlaGlrZlAwWVZ5RG9lUzhPdGhiMmJsbnZuTHZDZHFTNjFBdjVlMFFHUkpDN0szcGh0OW54WFhMdWp2R3lIWlM3cnhNWkNIcGVDNEx0TjIwYk5peU5rTHV6VkF3K0lDb2d3anhlUWMweENMdXo1V3c3SzQ4YmlBb0VQVzlGWUhlWG5WK2Uxd0pncjladHpzQ3BDRGtrSk93bnVteXptcnkraXJjSGREdGYvUllpQWtIUFMrTGJqTmx6WFQ0UGpKanRIMlJPVnRLL1RUUkFndmx0eTl4T2R0bjJzbmtza0xZUzVTamw5d1ZFQTRLZWNxS2JzMnhKMm5FNWRjRm8yZEZLOUJlSkJzaEJ2bjlmemRteUFUbDF3Um15UDdLc0RVRlBNYmx0VC9hTFpRZm04UEp0TjdmZks3SHZKeElnaDdtL3Jaby91M3lla2poQ2RqQjd3Q1BvS1NWMFo1ZHRWYnBiemk3ZGxyRWM3N0tkM2RnUUJ2SmNBK3p6bW4xYlAxMjJiTTR1My9hVDJGczFZQnFSZ0tESG5zaGRYVGFUZlpzY1hiWk5lTHRRZHBxUytBdWlBT0NiZXRCZHpRa3UyMUkyVHhQbkhuRFpEUGdwUkFHQ0huUHkzaWJybDZQTEhpUDdOZXRSQVZxc0RiYi94TjlrVytmb3NzZTY3R0FYSHZJUjlDakYzSTRiM0RRbmwveWg3TGRLMWh1NCt3QnRyaE43cVRsUHRueE9MdmxKV1g5RXZUU0NYbzBMUzVLazlvM3N3WnlJdVVYZ1gyVnJJT1lBN2NQbnpCbytoL0l3Rzl4cTRvTytSa0tSWVlSZUdqRzMxODdyNXVCeVg1VWRvS0wwR0hjZW9PRGFzYm1heTJWcjUrQnk3VHoxcmRuL25SRTZZbDU1YkxicVNiSytpRGxBMFVicmxrdDlmVzZsUGlQY2F1UVlSdXFNMEJIenl2S0M3R2RzRGdOUTBucGltOUw4cjJ4OVJ1cU0wQm1obHpmNWJBTGNYWW1MK1F6WktiSk5FSE9Ba28vV0xjYzI4VGszSS9HUitsMitoZ0lqOUlxTCtSSitaSjd5QkRoYmdtWWJRenhIeWdDVXZjYllhM2pibUdyTmhDL3pTVDlTbjh3SW5SRjZwUkxOTm8yNU0zRXh0N1d5R3lMbUFCVWJyVnZ1YmVpeW1mQ3BZalgwVGw5VGdSRjYyY1hjdG5PMUl3SjNTdlFTSjhoK3JtSnlOMmtDRUV6ZDJVSE5WYktlaVY2aURaQjJ6K3Myc1l6UUs1TlVkdERLdFFtTCtYMnlEUkJ6Z09CRzY1YVRHL2djVFJHcnFkZjZHZ3NJZWxtd2MzNEhKM2hkZGlLU0hlMjZ2UXJIaDl4bWdDQkYzWEp6ZTUrcktaNWlOdGpYV0dnbnZISnYvK2o4UkpmTlBFMk45MlY3cWxnMGtCWUEwZFNqV2pVM3lYb2xlSGtucVI2ZG1xZjd5Vjd1NVUyZUExeDJ2bTlxMkRhMVE1UThIMUVpQWFLclM4dXB1VkcyVllLWGQ2RHEwdVVJZXR2Z2xYdmJrOGErN1Z5YTRLVU5rMjJIbUFQRWljL2Q3WHd1cDhhbHZ2WUNJL1NpaWZsR2F2NGxXenloeTdMMW5rTlZERzRsRFFDU3FWV0RYRFpoZDRtRUx1c3IyWTlVcTU1aGhJNmdGNW9ndmRVODd0SmFKdExvc25PSlg2WUVBaVJYczJ6M3RkdnN4NFF1eTViUmJxYWFOUjVCYng1ZXViZWNHRDNVakVwTXpPK1hiWXFZQTZTSnorMU5mYTZuZ3RYZ1ViNG1BNExlYmpIdjZMS05ZOVpLNkxJdWx1MmdoUCtVT3d5UXRLaGJqdS9nY3o0VnJCYmY0bXN6TEFRYzB6d1h5clpKNUZwbXlZNVVrbC9JYlFYSWphamJvUzZIU0FEdExJYnpFeG5BYmVOcjh5SGM0UVhoRy9yQ1IrY1dMSDlMNUhKczh0dGdKZmNvd2gwZ242aW1EVlF6MHFVeldlN1hxbW5EVTd0UFRJb3JmdUJ2cStZZVdRcGJEOXBFa29FSy9HY3BhUUM1RjNVNzRDV1ZPVUcyUTU3dGFKblNQQUVFdmNnQnY2cWFwMlZMSjNBNWIvaUFIMDhwQXdCZjQzcjdBY3NhQ1Z6T1o3S05WZVBlUXRBem1CVDNiYURicTZqYkVoRnpXMmEzQldJT0FFM3hOV0VMWHlOaXgycjFiYjUyQTRJK0Q3YWw2M29KWE1kbzJUWkszUDl5U3dGZ0lhSnV0V0ViWHl0aVp6Mlg1bmJjQ0hvQm8vT2oxT3lWd0tYWUlRMDdLMkduY0ZjQm9BVlJ0eHF4czY4WnNiT1hyK0c1Si9mZjBCVUlXNnA1d01VL0NlNFMyYUZLMUptRU5RQzBzZjVaM2Z1cjdGZVJYNHJWUFhzeitWRE1GOEdrdU1LQzJXWjdQaWRiSWZKZ3RuV1pSeWlZWnpzQWdQYlZRU3ZpZHY3NDRaRmZ5Z2V5dnFxREV4RDBuQW02ZnpLOVY3WjE1RUY4bGdMNEQ1UWxBQ2l3SnA2cDVwaklMMk9Nckgrc2J5cVo1YjdvbklpWUF3QmsrRnB5VnVTWHNiV3Y3YmtrbHlOMFBZbmEyY0Uyd3pQbUNRQ0lPUUF3VWwvSVFOZVAwcVBiZElaWDd1MFAxbVhWdk9EaS9tNk9tQU1Bb3Q0ODlqMTlmZFhKai9NazZOVTVDMUo3K3JnYU1RY0FhSjRFWHI5YmpiL2ExL3pja0xkdjZJZkpCa2JjLytHSU9RQ1VVZFJqUGdCbG9LLzVDSHFDby9QMTFmdzU0a3U0Um5Zb1pRWUF5c2lodnZiRXlwOTk3YzhGdWZpR3JodTZtSnFuWEx4YnU5NGlHOEttTVFCUWdmcHBTM3h2bE8wZTZTVzhKTnRFOWZQcjBEdktOL1MyY1ZyRVltN3JLdmRCekFHZ0V2amFzNCt2UlRHeW50Y0FSdWl4ajlEMWRQbGpOV05kbkV2VWJCZTdyWlJRWDFCV0FLREN0YlM3bWdkbGZTUHN2Z2xkUDlYU2gxTWVvU2N0NkFyQXBWeTJSSzEzakEvR3NoOHFBRCtpbEFCQUlEVjFPVFdQMm84UmRuKzh5NWF5ZlptcW9LZit5djJzU01YY2pqY2NpSmdEUUZDampLd21EZlExS2paTUM4NU0rZjRrTzBMWGsrUldMczV2UGpaeHcwNE5lb1R5QVFDQjF0Y3RYSFpLNVdJUmRuOXIxZGNIR2FISEUyemQxRndaYWZlSEl1WUFFUGhJM1dyVTBFaTdmNlhYaU9SSTlaWDduMXljcjlxUFY2TGNUTGtBZ0FoRTNXclY4UkYydmJmWENBUTlndEg1RDEyYzUvcGVMeHRHbVFDQWlCam1hMWRzSE82MUlpbVMrb2F1RzlSSnpiT3lkU083RDArNGJFbkZWT29EQUVRMmlPcmlzcVhCUDRpczZ5L0xObFRkblI1S2gvaUdQaTlIUlNqbTc4dDJSY3dCSUVaODdkclYxN0tZV05kckJpUDAwRWJvZWtxczhVOWNYU0x5L3pUWmo1VVFUMUFXQUNEeWticU4wRzNqbHM0UmRkc2VSdFpWRFc1a2hCNFdGMGNtNXNhaGlEa0FKREpTdDFvVzJ3RlNYYngySkVFU2dxNG5RenMwWUx2SXVqMUNDVENDTWdBQUNZbTYxYlRZNnRwMlhrTVE5QURFdkt1YWN5UHJ0azNjTzR6MEI0QUVPY3pYdUpnNDEyc0pnbDVoYkIza3loSDE5M1BaSGpFYzVRY0FzQWlqZEt0dGUvaGFGd3NydXpqWDFNOUQxSlBpOUVTMW1zc213c1UwQ2FOT0FYOHJhUThBS2FQNlBFaE5mVVJkdGtuS05rSHV6VXAxSU8rVDRzNk5UTXpQUjh3QklDY2pkYXQxNTBmVTVjNHV2cyszYVFpNm52NXNFdHhPRVhYWnpqWS9salFIZ0J4eHJLOTlzYkNUMTVZb2lmS1Z1eHpld1FmSmVwSDRlYkxMZGlUNk4va05BSGxDOVhwMWwwMlNXeUtTTHI4azY2dDZQYlBjLzNCZVg3a2ZFSkdZRzRjajVnQ1FSM3p0aStsOGpmVzh4akJDTDhQVDNwSVdJN0psSS9GeHZRSjZOOUlhQUhJK1V2K0htcnBJdXZ1eGRWbTFleUlqOU5MeSs0akVmSUxzbDZReUFNQ2NXamdoa3I0dTY3V0dFWG9Kbi9DV1Z6UE94Zk10NWlkNndydUxQQVlBbUZQRGQxVHp6MGk2YTNPZitxaUdmOGdJdlRTY0VKR1lYNDZZQXdCOGk2K0psMGZTM1NXODVrUkROSUt1SjdzK2FnNktwTHZ2dXNTTzVRTUFLQkpIK1JvWkF3ZDU3VUhRaTh5ZlpCMGo2ZXVCZWhMOWtyd0ZBRmhnbEc2MThjQkl1dHZSYTA4VVJQRU5YVTlJYTd0c2k5ZXFDSHg2alFKMlA5SVdBS0RGdW42MW1uMGo2S3FKcEcwSisyckovNkdjZkVNL0tSSXh0eG1jUjVLcUFBQ3RjcVNMWTlaN2xkY2dSdWhGZUlycjYrSTVpbTh2UGNYZFNKNEN0SnJYM2RTRS9HM3lEZVh5Vjl5cGtzZkJFRFUzUk5KZDIrMnpwTnZZRnFySE1YeVRQaW1TbXowYU1RZG9NeHZMSGd5NGZ6YVFlSjdiVkZxc1prclU5OU9QQXlMUm9sMUQ3bURRZ3E0YnZiNmFYU0s0MGZZay95dlNzMDMzMUphdERHekRYNTB1YTdxWGNtdVBybE5sczVyODNkYisvdVQ1ZnZlc0Z2NnUvVzlUbXZ4NVppdS8zNDVoYkhyZS9ZeFcvdjVYL25xYi92OWJZbElUMzh4dXc5OXZ6N25VTS96dlh4aGpWSUJmTEdJNG1FKzdCaGltMDhqVXNtSzEwNzVQTHg1NFAzY3hUVklPdklDZ0x4cXhuRTUydW03eWVQS3lUWFJxeDkvcjFJN2YyOTVpc0d4Ty9UL0xpL1pjV3Z0bU50UC9mK3hveVdHeUZ3bGhLUElvZmJ5RThuUVh4Mnh5MDZRaG9YWXUyRWx4L29TZXdSSGNZTnU1N2h6U0VpS2gyb3Z6WE92VWluWHhvMmg3K0Y4VDkwR0pPTWZYMHRBWjdMVUpRVzhueDdrNFpyWWZwaWZNcjhsSHlBR3I0UUlvMFNqZGF1aGhFWFMxeW1zVGd0Nk8wZm5LYXZhSjRPYmVya0M4aDNTRW5MQVNMb0FTaXJyVjB0c2o2T28rWHFNUTlEWmk2eE5ELzc1dms1aCtSeHBDamxoR2hhd3pib0FTOGpzMzd3VFJFT25vQXQxdkpEaEJWOEhvNGVMWUZ2QWlQVkdPSS84Z1I5anJ4cFZ4QTVSd2xHNDE5YUlJdW5xZzF5b0V2UlhzQUpiUVQxVDdSSFlhNlFjNXc3NXo5c1lOVUdKTzh6VTJaSlp3QVI0V0ZwU2crOWQ1djRrZzRFN1drK1RuNUIza0RGdnp2Z3B1Z0JLUDBxMjJuaHhCVjM4VDJpZW8wRWJvdHI2dlYranhKcnVNdElNYzBobEJoekp4bWErMUlkUExCYlltUFRSQlB6eUNRRHRPVDVEVHlUZklJVll2MXNJTlVJWlJ1dFhZNHlMbzZ1R2hKV2dRMU5RM2JLWm1vOEJ2M2pPeW0wazN5REY5Y0FHVWladDl6UTJaamJ4MkllaVJqczVuazJlUVkxaUxEdVVhcGM5bWxCNmhvT3NKWndVMXV3ZCsweDVTZ04xTG1rSE82YTU4N1lJYm9FeWlialgzb2NDN3VidlhNQVRkYzRCcjMwRWNsZUJrMGd0Z3prejMzcmdCcUwzZjBNbHJHSUt1SjVzT0xzRDFmUE14VmsrS1k4a3JnRGxyMFpucER1VWNwVnZ0RGIzK0h1UzFMUGNqZERzYmU4WEFiOWFKcEJYQU55RG9RQTJlbHhXOWx1VmUwRU1mbmR1MzgzK1JUd0J6V0F4Qmh3cU0wcTBHaC80dHZlSmFWbEZCcjZsdldDbUVwNXBXR0VZNkFYeUQ3ZWZPV25TZ0ZpL0lRSzlwdVIyaDcrdkNQcFA5U1QwWmppYVBBT2FCYzlHaEVxTjBxOFZQQnR6RmFxOXArUk4wUGNsVVZmcmkyOEJacEJIQUF2VENCVUJOWHZnZzFXdGI3a2JvVzdpd2Q1MTZVM1liK1FPd0FOMVV0THJoQnFnQXQvbmFIQ3A5dkxibFR0RDNDenh3em11c3E1MUYvZ0FzQUtldVFVWHdOZm04d0x0Wk1XMnJpS0RyNmI2cm1zRUIzeEE3aS9jYTBnZGdvYkFXSFNySk5TN3M4OUlIZTQzTHpRaDlaOW1TQWQrUTRYb1MvSXE4QVdpVzNyZ0FLalJLdDlvOFBPQXVMdWsxTGplQ3ZsZkFOOE9PN2J1RXRBRm9GbHVMdmlwdWdBcHlpYS9Wb1ZJUmpTdTdvTmZVTnl5dFp2dUFiMFM5bmdBL0lGOEFtc1ZtOGE2Tkc2Q0NvM1NyMGZVQmQzRjdyM1hKajlEclpKMER2aEVYa2k0QXJUK2I0d0tnVmpkTFo2OTF5UXY2M2dIZmhPZjA1UGNvZVFMUUtpdmdBcWp3S04xcTlYTUJkN0hzV2xkV1FhK3BiMWhPVGIrQWJ3RGZ6Z0hheHVMSzV4NjRBYWpaemRMUGExNnlJL1JkWExoYnZVNlMzVUIrQUxRSld3L014RGlvTkRmNDJoMGkxVjd6a2hYMDNVSU9qTWE2Mm9ua0IwQ2JtT1pZdWdZVnh0ZnNrQWRpWmRXOHNnbTZmejIzVGNDT3Y0ejBBR2d6SFJGMG9IYTN5amJsL0RUVnNZd1h0bE9aLzczMjhJcWU5SjRtTDJBKzNuUFpybWl3Y0RyZ0FnaGdsUDYwUlBNVi9iaE9vQSsrcG4zWHBpYm91d1ljRTFlVEZyQ3doMUFWaStkeEEwRHdXQTMvYzZCOTI3VmNnbDZXVis1NmVyS2RwZm9INnV5WnNyK1REd0FBMGZKM1g4dERwTC9Yd0RRRVhXd3BDL1c0eGRFYWhYMUlQZ0FBeEltdjRhTUQ3VjQzcjRISkNQcFBBbzZGNjBnSEFJRG9DYm1XNzVpU29POFVxSk9ueU80Z0R3QUFvdWNPWDlORHBDeW5yNVZjMEd2cUc5WjA0UzV2dWJPeHJuWVNlUUFBRURlK2x0OFphUGQ2ZXkyTWZvVGVQK0FZdUo0MEFBQklocEJyZXNtMU1NK0NianNNalNiK0FRQ1NZYlN2N1FoNnNhbXBiN0FqNUxZSzFMbWpHdXRxMlRRRUFDQVJmRTBmRldqM3R2S2FHTzBJZlF0WjEwQ2RlelBoRHdDUUhLSFc5cTVlRTZNVjlGRDNicC9xZU4wT0FKQWlvMzJORDVHU2FtS3BCYjFmb0U2OWw5bnRBQURwNFd2N3ZZRjJyNlNhV0RKQnI2bHZzTmNMbXdicTFIOFM5Z0FBeVJKcWpkL1VhMk4wSS9RZnlqb0Y2dFM3aUhjQWdHUUp0Y1ozOHRvWW5hRDNDOVNoenpiVzFiNVB2QU1BcEltdjhjOEcycjJTYVdNcEJYM0xRSjNKNjNZQWdQUUp0ZGFYVEJ0TEl1ZzE5UTMyV21IalFKMTVMM0VPQUpBOG9kYjZqYjFHUmpOQzd5dnJFcUFqdjVROVFad0RBQ1RQRTc3bWgwWVhyNUhSQ1BybWdkN2dNWTExdFRPSWN3Q0F0UEcxZmt5ZzNTdUpScFpLMEg4WXFCUHZJOHdCQUhKRHFEVy9KQnBaS2tIZkxOUVJPdkVOQUpBYlFxMzVKZEhJb2d0NlRYMURUelVyQitqQUNZMTF0YThUM3dBQStjRFgvQWtCZG0xbGFlVnlNWXpRUTUzZFBwYndCZ0RJSGFIVy9rMWlFUFNOdUtrQUFFRHRMNjlXNW1tRTNrQmNBd0RramxCcmY5RzFNaThqOUlteVY0bHJBSURjOGFyWEFFYm83YUdtdnVFN2Fub0Y2TGpIR3V0cVp4SFhBQUQ1d3RmK3h3THNXaSt2bWNHTzBOY0w5SjQrUmxnREFPU1dVRFdncUpwWmJFSC9mcUJPZTV4NEJnRElMYUZxUUZFMU15OGo5R2VJWndDQTNCS3FCZ1E5UWc5UjBOOXRyS3Y5bUhnR0FNZ25YZ1BlUmREYnh6b0JPdXhwd2hrQUlQZUVxQVZGMWN5aUNYcE5mY09LYXJvRjZEQmV0d01BUUloYTBNMXJaM0FqOU5VRHZZblBFOGNBQUxrblZDMG9tbllXVTlEWENOUlpMeEhIQUFDNUoxUXRLSnAycGk3b1h6VFcxYjVESEFNQTVCdXZCVjhnNkcwanhGZnVqTTRCQUNCa1RRanlsWHROZ0k1NmhmZ0ZBSUNBTmFGbzJsa1VRYStwYjZoUzB6dEFSNzFPL0FJQVFNQ2EwTnRyYURBamREdVFwWE9Bam5xRCtBVUFnSUExb2JNcjBxRm14UkwwVmJoNUFBQ0FvRmRPUTRzbDZLc0c2S0Jwc3Y4amZnRUF3UE4vWGhzUTlCWllNVUFIdmQxWVZ6dVQrQVVBQU1Ocnd0c0JkbTJsa0FSOXBRQWQ5RGJoQ3dBQUVXaERVSUxlaTVzR0FBQUlldVUwRkVFSEFBQUVIVUgvaGhDL29UTWhEZ0FBWXRDR29taG93WUplVTkvUVFVM1BBQjMwTG5FTEFBQVJhRU5QcjZVVkg2Ri9WMVlWb0lQZUoyNEJBQ0FDYmFqeVdocUVvSWZJQjhRdEFBQkVvZzFCQ1BweUFUcm1vOGE2Mm1uRUxRQUFOTVZydzBjQmRtM1pFQVI5MlFBZE00R3dCUUNBaURTaTRNRnhxcS9jUHlKZUFRQWdJbzBvV0VzN0ZxRVR5d1RvbUUrSVZ5Z0N6OVhVTitUZEIvYzAxdFh1UUNoQVlvU29FUVZyYVRGRzZOMjVXUURKMGdVWEFJSmVGZ3JXMGxRRm5WZnVBTVdoTXk2QUJBbFJJeEQwWnZpQ2VBVW9Db3ZoQWtpUUVEVUNRVWZRQVFBQVFTK09vQzhab0dNK0oxNEJBQ0FpalNoWVM0c2g2RXNFNkpndmlWY0FBSWhJSXdyVzBtSUllb2l6WUhubERnQUFNV2xFd1ZxYXFxRFBJRjRCQUtBWlppTG9DNmNiVDE4QXlWS0ZDeUJCUXZ5R1hyQ1dGa1BRT3dib0dFYm9BTVdoQXk2QUJBbFJJd3JXMGxSSDZKT0lWd0FBaUVnamdoaWg4d1FQa0M0ZGNRRkFXU2hZUzZ2eElRQzBBSHU1QTBSQ3FvTE9wRGdBQU1pVlJpUXA2STExdGJPSlZ3QUF5Sk5HOE1vZEFBQUFRUWNBQUFBRXZVVFUxRGV3R1FZQUFPUktJMUlkb1hjblpBR0tBZy9IZ0VZZzZBQkFqUUNBbUpKMUptNEVBQUNvckpZV1E5Q1QzRUlQQUJpaFE3SWt1V1Y1TVpJMXlVM3VBV0FPaStNQ1NKQWtEeFZMZFlUT3BEZ0FBR2lPSG96UUY4NVVucjRBQUNBaVFqeFVyR0F0VFZYUUdhRURBRUJNR2hHRW9FOE8wREZMRWE4QUFCQ1JSaFNzcGNWNE5UMHhRTWYwSUY2aFFLYkp2blJoemhFcEoyOFJDcEFnSVdwRXdWcGFERUVQOFJnNlhybERvZGlhMEY4MzF0V094QlVBeVJHaVJoU3NwZFVoZEFKQmg0Qkg2UUNBb0NQb0ZXUTU0aFVBQUNMU0NBUzlHYjVMdkFJQVFFUWFFWVNnZjhyTkFnQUFCTDJ5V2xvTVFmOGtRTWZ3eWgwQUFHTFNpSUsxdEJpQy9uR0FqdWxKdkFJQVFFUWE4VkVJZ3Y1UmdJNVpycWErb1RNeEN3QUFUZkhhRU9JSXZlREJjYXF2M0kwVkNGMEFBSWhFRzRKNDVXNmRtQjJnYzNvUnQxQUFzM0VCUUpLRXFBMnpneEQweHJwYTIxRnJRb0FPV29tNGhRS1loUXNBa2lSRWJaamd0YlRpSTNUanZRQWQ5RC9FTFFBQVJLQU5SZEhRWWduNit3RTZhQlhpRmdBQUl0Q0dvbWdvZ2c0QUFBZzZndjRONzNMVEFBQUFRYStjaHFiOERYMlZtdnFHRHNRdUFBQVlYaE1ROUZaNEswQUgyZVlCVEl3REFJQzUvSS9YaHRCNE95UkJmenZRbTdjRzhRc0FBSUZyUWxDQ2JoLzBwM0h6SUNHcWNBRUFnbDRHcHJtUUpzVTExdFhhTGpmakEzVFVtc1F2TENMTXZ3QklqeEExWWJ6WDBHQkc2SE4wUFVCSHJVUDhBZ0JBd0pwUU5PMHNwcUQvTzBCSHJVZjhBZ0JBd0pwUU5PMHNwcUMvRWFDanV0ZlVONnhNREFNQTVCdXZCZDBEN0ZyUnRETjFRV2VVRGdBQUlXdEJrSUwrNzBDZHRRRnhEQUNRZTBMVmd2QmV1VGZXMWRwdWNaTUNkTlpHeERFQVFPNEpVUXNtZWUwTWJvUnV2Qktnd3pZbWpnRUFjaytJV2xCVXpTeTJvTDhVb01OV3FxbHZXSlpZQmdESUoxNERWZ3F3YTBYVnpEd0l1c0ZyZHdDQS9CS3FCZ1F0NkM4RzZyVE5pR2NBZ053U3FnWVVWVFB6TWtMZm5IZ0dBTWd0b1dwQXVDUDB4cnJhLzdvaWJUSmY3SnRaVTk5UVRVeERPNW1DQ3dEaXh0ZitFQVg5ZmErWndZN1FqV2NDZE55U3NyVUpiV2duMDNBQlFQU3M3VFVnTklxdWxhVVE5S2NEdmFtMXhEVUFRTzRJdGZZWFhTdnpNa0kzK2hIWEFBQzVJOVRhendnZFFRY0FnQVJxLzVQQkMzcGpYZTBFTmU4RTZMeWVOZlVOYXhMYkFBRDV3TmY4bmdGMjdSMXA1Y2N4ak5DTnh3Tzl2MXNUNGdBQXVTSFVtbDhTalN5Vm9EOGFxQk8zSTc0QkFISkRxRFcvSkJwWktrRi9MTlNudFpyNmhvN0VPQUJBMnZoYUgrb0l2U1FhV1NwQmYwNDJOVUFuTGlYN0FhRU9BSkE4UC9BMVB6U21lbzJNUTlBYjYycW51M0JudS9jbnpxRU56TUlGQUZFVGFxMS95bXRrTkNOMDQ2RkFuZmtUNGh3QVdxQUtGeVJCcUxYKzRWTDk0bElLK3RoQW5ibGhUWDFETDJJZEFGcWdDeTZJRjEvak53eTBleVhUeGxJS3VzM2lteDZvUTNjazVBR2dCZmprRWplaDF2anByb1Nyd0VvbTZJMTF0WFpTMVpPQk9wWFg3Z0NWSitRVkp4ek1FemVoMXZnbnZUWkdOMEkzeGdicTFQNDE5UTNkaUhtQWlzSzNhaWc2dnJhSE9pR3VwSnBZYWtGL0lGQ24ydmV4QVlRK0FDeUVUcmdnYWdhNGNPZEFsRlFUU3kzb2o4aW1CT3JZUFloN2dJcnhWZUFqZEVROVhrS3Q3Vk84SnNZcDZJMTF0ZllkNnNGQW5UdXdwcjVoTVdJZm9DSjg3Y0w5aG00VGwzcHdpK0xEMS9TQmdYWnZqTmZFYUVmb3hyMkJPbmRKeDJ0M1lJUldLU1lGM0xlWnNwVzRSVkV5d05mMkVMbXYxUDlBbmdYZDJKdjRCNmdJTXdMdW0zMS81Wk5jbklSYzAwdXVoU1VYOU1hNjJ0ZlZqQS9Vd1RzeDJ4MmdJbndSZVArMlZXMDRnTnNVRDc2Vzd4Um85OFo3TFN3cDVmcUdkYWZzc0FDZDNGVzJzK3g2MGdFQVFaK3ZObDRza1RoRzdTalpaeFh1ejFRSndwbUVUWXZzN0d0NmlOeFJycUF0Qi84TVZOQ05mUkIwZ1BJaWNab2xzWnlzSDVjSVhOVDd5QTUxMlhmMVNtRnZVdCtTSWVpdDEvSlF1YXRjZ1ZJTzdLQ1dVQ2ZCREZCaFdaNWNBR0NVM2tLZDdGUkI2eUI3aG5CcEhsL0RRNTNrUE1tVjZiQ3lzZ2k2bnNadGlVcW9rK01zV1g1S1NnQ1VuVTl4UVp1dyt2azBibWlSbi9wYUhpTDNlZzFNWm9SdTNCWndNT3hIUGdDVW5UZHdRWnV3RFhoZXhBM1IxdkN5YVY4NUJkMG14b1c2VkdXZG12cUdqY2tKZ0xMeXFxdnN0K2xZNkN4N0NUY3NIRis3MXdtMGV6Tzg5cVVsNkkxMXRaKzdjUGQyTnc0aU5RREtpazMwbW80YldtV2k2dWVIdUNISzJ2MkExNzdrUnVqR1B3SjIvRjU2MGx1UzNBQW9HNi80MFNlMHpHdTRvTm5SdWRYc3ZRTHVZbGsxcjl5Q2ZydHNWcUNPN3haNFlBQ2t4dk95MmJpaFJheGVQb0VibWgrSStkb2Q2cjI3UFZsQmI2eXIvY2lGZTBhNjhTdnlBNW93QlJlVXRCN1k2L2JYOFVTTDJHRWV6K0dHS0d2MldLOTV5WTdRalpBM2NlbGJVOS93UTNJRW1oUlRLQzFqSEJQaldzTFdvVFBEZlNINFd0MDM0QzZXWGVzcUllajFnUmZLdzBrVmdMSmh1MGpPd2cwdDF1aFhjVU4wdFhxYTE3cTBCYjJ4cnRiMlJMNG40QnRScHllL0ZjZ1ZnTEpnTzJneDA3MTUvcU9hK1JWdVdHQjBialY2dDRDN2VJL1h1dVJINk1ZTkFkOEllOFhGdDNTQThqemcydzVhTnp0ZXV6ZkhDN2hnb1ZpTjdoaHcveXFpY1pVU2REdDVabUxBTitNUVBRRXVUczRBbElXL3VHdzNOSmdYZTNQQkRQY0ZSK2RXbXc4SnVJc1RYWmxPVnd0QzBQVlVick9IUndaOFE3NHIyNWZVQVNoTFBiQlozSTg3bHJETmo3MjFZSWU0QmRuWDEraFFHZWsxTGpjamRPUHF3SVBtdDNvU3JDWjNBTXFUYjQ3SmNmUFR4ZkhLZmY3UmViV1BsWkNwbUxaVlVyQWVrWTBMK0thc0p0dVZGQUlveXlqZFhpM2Y0cGdnMXhTYlh6QWVOOHpEcnI0Mmg4bzRyMjM1RW5RbHNMMWV1eWJ3NERtRy9BRW9HL1pkZENKdStJWTNmWjJFZUdyeU5aVzhaNVYrcFd5Q0h2SnJ0azFyNmhzR2tFTzVoRUphL29kOE94OTlGeGZ1cVl6bDVpbGM4QzIrRm04YWNCZG5WWHFRV2wzaEJINVh6YWpBNCtoWVVnbWdiRFdod1dXVG52SytqRzJxN0JraUlxcGFQTXByV2o0RjNYTlo0RGRwU3owWi9vaGNBaWlicU51V21mdmxYTlE3T0xaOGJUbzZ0eHE4WmVEZHJMaVdoU0RvTmtKL0wvQWJkU29wQlZCV1VmKzdHbnZGT3NubDh4VzhiWERGa3JWNGFuQVFiNXVyQTBqY21SR00wdnZwQ2JFZk9RVlExdHJ3Z0pvMVpZKzUvTTErLzBUWC96bFJNR2QwYnJVMzlQbzd3bXRaN2tmb3h1VVJKT3pKcEJaQTJVWGQ5akwvc1g0Y0t2dkE1ZWNFdkplNSs5SFUzdWxld3lwT2RTQkphNGw2UytBM3piNmw5eWUzQUNwU0kyNVMwMXQycU94dGwzMWZUL1VidTEwWFc3NW1vM09ydWFGL083L0ZheGlDM29RTEk0aXZNeFJnN0RrTlVCbFJueVliWVhWZXRwWHNXcGQ5WTUvcDBub2xiMjhoY3I5RG5LKzFaMFRRMVdDMHF6cWdaTFc5bkVOZnByR1JiQTlLSzBCRmE4VnMyYjlrUDljZmU4anNsZnd3MlpQdTIxZnl0c3RhckpQcGJNdFhKc1JsdFhhandQdjRqTmV1SUFqdCtEbDcwZ2w5OXpnYnBkK3FtOGdXbFl2R2JGOW9ReSsyWGJoVlVZaTdqYzRmOVhhU2N0T1dlNjB1MjhCbEUrcldrNjBoVzk2TC85eEJqUDMvWnJsdlg5dmJ6MVUrUGlzNTBLbnlkZm4xbkkvT096RTZqMS9RYi9SUDJyMUNqalhaUWJLL1VVNFhpYk5jaGM0S1hnVGU0WFpGS2ZDdmVadGZKRXlvbDJsaTl0RFdXZGJWLzVVZWdWekdSRjFIM25mTE84algycEI1MzJ0V01GVE5ubDNZRHBkVlZjWDlwS3lrTzlvWC9aRDVSTFlheTBvQUFJbytPcmNIcXpkZDJFZWtHc2RJQTg0dTVpOHNWSTlEUEI3VTFxUlBEdnhHV3FDZFFPb0JBQlNkRXlJUTgwa3V3UDFUZ2hOMFArb2RFVUhRSGFZbnlUN2tIZ0JBMFViblZsTVBpNkNybDRmNGhyWTZVR2VkNzhLZk5HV1ROczRoQlFFQWlzWTV2cmFHekF5dlVjRVJwS0RyeWNjbUkxMFhRZkR0b2lmSzdjbEJBSUNDUitkV1MzZUpvS3ZYZVkxQzBOdUJMVm1JNFV6cWl4U0lpNUdPQUFDTExPWldReStLb0t1elhjREw2WUlWZEQwQi9Wdk55QWh1c0gzeitSMHBDUUN3eVB6TzE5TFFHZW0xQ1VGZkJJWkZFb3pINndtek56a0pBTkR1MGJuVnp1TWo2VzdRbWhTMG9PdEp5UFl6dmoyQ203eTQ3QkpTRXdDZzNWemlhMmpvM080MUNVRXZnRk1pQ2NvQmV0SWNRbTRDQUxSNWRHNDFjMEFrM1ExZWk0TGJLYTZabTI1SEp3Nk80SVpQa0sybHA3alBTRlVBZ0Jicit0SXUyNkszWndUZHRXL25lNWI2SDZuNFRuSFdnVktiZnpLS1ljYTdCZWI1cENvQVFLdWNING1ZbS9hY1VpYXRxNnlnbHdNOUdiM3E0cGp4YnV5cko4OEI1Q29BUUxPamM2dVIrMGJTM1pGZWc0S25PcUlZK0tPTDUzempFUXJZcFVoYkFJQUZ4TnhxNDRoSXVqdkRhMDhVUkNQb2VrSWE1d0xjREw4WlZwS2RTK29DQUN6QXViNUd4c0JsWG5zUTlCSndtZ3YvSkxhNUhLQW4wUjNKWFFDQWIwYm5WaE1QaUtTN2s3M21SRU5VZ3E0bnBRL1ZuQmRSbDY5UUFIK1hOQVlBeEh4T0xid2lvaTZmNXpVSFFTOGhmNVo5SEVsZmJRYm5wYVF5QU1DY1d0Z3prcjUrN0xVbUtxSVRkRDB4VFZSelFrUmRydE9UNmY3a01nRGtlSFJ1TmJBdW9pNmY0TFVHUVM4RGw4dGVpcWkvRnlxZ1Z5ZXRBU0NIWW02MTc4S0l1dnlTMTVqb2lGTFE5ZVEwVTgxUkVYVjVDZG1OSExNS0FEa1RjNnQ1Ti9vYUdBdEhlWTFCME1zbzZ2ZXB1VE9pTHZkMThad2VCd0JRREliNTJoY0xkM3B0aVpMcXlJUEZSdW5USXVydmtYcGlIVVNPQTBBT1J1ZFc2NDZNcU12VFhGeHZmdE1TZEQxSnZhbm1uTWk2ZmFVQ2ZWWFNIUUFTRm5PcmNWZEcxdTF6dktZZzZCWGtkTms3RWZXM2greG12cWNEUUtKaWJyWHRabC9yWXVFZHJ5VlJFNzJnNjRscWlvdnZOY21Hc290SWZRQklrSXQ4all1Sm83eVdSRTFWTVk1c0sza24yM0RtdXA0SzcxV3pYV1QrUDFCQmREbjVEd0NKak01dFc5Y1JrWFg3UHRYaC9xMzlwUmkwc2pxaFdEcFlOald5UHY5TkNmQUR5Z0FBSkNEbVZzditGbG0zcDNydFNJSmtCRjFQV0kxcVRvbXMyNTFsOVVxRTVTa0hBQkN4bUZzTnEvYzFMU1pPOGRxQm9BZUlIY3YzY21SOTdpVzdUUW5SaGJJQUFCR0t1ZFd1MjN3dGk0bVhYV0xIWENjbDZIclNtcTdtbDdMWmtYWGRYbFhaeVd4VmxBY0FpRWpNcldaZDRXdFlUSmhHL05KckJvSWVzS2cvNnVMYU4zZ3VlOHVPcFVRQVFFUWM2MnRYYkZ6b3RTSXBxaE1Oc2ovS3hrZlk3OVAxeExzSE5RSUFJaGlkVzYyS2NlMzJlSzhSeVpHa29PdkphNUthV0k4c3ZWYUpzZ1hsQWdBQ0ZuT3JVZGRHMnYzOXZVWWc2QkdKK29OcUxvbXc2N2JMMHUwY3R3b0FnWXE1MWFiYmZhMktqVXU4TmlSSmRlS3hkNHlMODlYN2QyU2psRGpMVVQ0QUlDQXh0NW8weXRlbzJCanZOU0Zaa2haMFBZbDlxV1pmRjkrczl6bTVJN3RIQ2RTZE1nSUFBWWk1MWFKN2ZHMktEZE9BZmIwbUlPZ1JpL3JETHI0VDJlWmk1d2pieGpPZEhRQkE1Y1I4emlaWUxxNnp6WnR5anRlQ3BLbk9TVHllSUhzcDByNXZMYnRPQ2RXQnNnSUFGUkJ6cXozWCtWb1VJeTk1RFVpZVhBaTZuc3krVmpQVVpRZll4OGp1am8xbkFLRDhZajUzNDVqZEk3MEVxL2xEdlFZZzZBbUorZ3RxZmgveEpkaGNnTDlTWWdDZ2pQelYxNTVZK2Iydi9ibWdPbWZCYWVmMGpvcTQvNGZvaWZsTWFnd0FsR0YwYnJYbWtJZ3ZZWlN2K2JraG1mUFEyeEdreTZxeEo3WVZJcjV2WittcDh3K1VIQUFvb1pqSHZNVHJBOW42cXBNZkYrc1hjaDU2Z1BnYkhPdFN0cmtjdzBnZEFCRHpoV3V2eTVhb2ZaeTNlMWVkeDREVmpiNVB6V21SWHdhaURnQ0krWUtjNW10ODdxak9jZXllS2h1RHFBTUFKQ1BtWTN4dHp5VzUrNFkrWHdEM1ZQT2NpL3Q3dW1ISHhSNmhwOUxaRGdDZ2ZYWFFDdXdGc3NNanZ4VDdidDVYZFhCQ0tYNDUzOUFEeDkvNHZXUXpJNzhVUzhUaGJENERBTzBVYzZzWnd4TVFjNnZoZTVWS3pHT2hPdThCclFCNHlLV3hZZit2WExhakhOdkVBa0JieE54cXhYVytkc1RPTWI2VzU1cGN2M0tmTDdpdjk2UDEyQmt0cTFOd1Q2RmtBVUF6OWE2cnkvWm1INURBNWR5Z2VyZDNxZjhSWHJuSHhZRXUzdjNlbTJJSitvQVM5anZjVWdCWWlKZ3ZZelVpRVRGL3lkZHVZSVMrUUtDdnF1WnAyZElKM05zM1pOdnJ5WFU4WVE0QXZzYjFkdGtScUdza2NEbWZ5VFpXalh1ckhQOFlJL1RJOElFeDJNVS9TYzc1aEgxY0Nid2hkeFlBZkMxNFBCRXh0eG85dUZ4aUhnc0krb0tpZnIrTGY4Ym5YR3haM3NOSzVJSGNXWUJjaTduVmdJZDlUVWlCdzMydEJnUzlWVkczWlJ3WEozSTVTOGp1VkVJZnpwMEZ5S1dZVys3ZjZXdEJDbHpzYXpUTVIwZGMwUHdUb0d4MTJUYUpQTGo5UlltOXBuK3luY0h0QlVoZXlLMisyNlpUQnlkMFdRKzRkTjZnRmgwbXhiV2NFRDNVUENwYks2RjdicStwOXBTb2YwcjRBeVFyNWphVC9TYlp0Z2xkMW11eUg2cDJmVjZKZnp3S3JVVFFXMDJNM2k2YlNOSXpvY1JvbE8ycXhIaVowZ2VRbkppdnErWTIrekdoeTdJZDREYXI1S29kWnJtbm9IeFpBTzBvK3lxbG5IZlpEUGhCM0dHQXBNUjhrQitBcENUbVZudDNaQWt1SS9SaUpzcE8vcWszdFllZ1liSVRsQ3d6U1FlQWFJWGM5bVMzSTZHUFRlelNac2tHcVQ3ZFVlbU84TW85SVVIM1NXTTdFbDJXWUQxNFVEWkVTZk1ScFJFZ09qRmZUczJOc3EwU3ZMeURWSmRHaE5BUlhya25oZytza3hLOE5Dc0V6Nmt3MUhLWEFhSVNjOHZaNXhJVjg1TkNFZk5ZWUlTK2FFbDBrWnBERTR3SGUrMStndXdzSmRJczBnTWdXQ0czd1ppZEVtbXYyVk04TnZtdnFrR0hoZFFoUnVqcGNvUnNaSUxYWllYaEROazlLaGpMYzVzQmdoUnp5ODE3Zks2bUtPWWpmWTBGQkwzMCtBbGtRMTIyKzFLS2JDZDdYb1ZqQis0MlFGQmliam41dk0vUkZMR2FPcFJKdW9zR3I5d0xTeTQ3VS9pZkxzM3ZWM1A1cSt4b0pkaFhwQXRBeFdyTjRtck9kbWwrNnB1TFRjNzlpV3JObEJBN3h5ejN4QVhkSjVydGp6eEd0bW5DaWZhNmJHOGwybk9VVm9DeTE1aSthcTZYclpud1pUNHAyMW8xWm5Lb0hVVFFjeURvUHVHNnE3bFB0a25DQ1dmN3Y1OXVwcVNiVHBrRktIbGQ2YVRtZUc4cG43dnhsR3c3MVpVdlF1NGtncDRUUWZmSnQ2d2ZxYStiZUoxNXdXWGZ1RjZpNUFLVXJKNnNwK1phMmZxSlgrckxmbVQrY2VnZFJkQnpKT2c1RS9WcGZyUitwaEp4R3VVWG9HZzFwTE9hUC9oUmVXZkVIRUZIMEJIMWN2R3E3QUFsNUdPVVlvQ0NhOGZtYWk2WHJaMkR5NDFLekJIMG5BcDZFMUVmTGV1Ymc4UzBBUHFialNpVW5GOVNsZ0hhWFMrV2N0a2JyMTlidWN2QkpkdmsyZ0V4aVRtQ25tTkI5MGxxRStYdWRXblBmbS9LaDdMZktrbHZvRVFEdExsTzdLWG1QRmxlTm5LeTJlejlRNThBaDZBajZNMkordTJ5TFhOVW8reHp3NitWc0s5VHJnR2FyUTIyQk0zZWJHMmRvOHQrU0xaTGpHS09vQ1BvY3hQWE5wK3hvLysyeVZIaTJySzJDMldueFpxOEFDVjh5TGZ6RWc2WGRjclJwVDhnMnpuVVRXTVFkQVM5UFVsc3MxVnRZNGpkY2xhLzdCdVp6ZGE5Z3NOZUlPZENidHRzLzBMMko5bHlPYnY4Zjdoc1k2cW9WOFJ3T0F2TXdRZnluaTZid1pvbmJIS2duUi8vakFyYXRrUUM1RlRNTGZhZjhibVFOekczbXJjbnkxc1pvU2N6UW0rUzJGWCtDZjI0bk1hYnpmeTNmZUZmSlBVZ0IwTCtmWmZ0dno0Z3B5NFk1ckxWTDdOVHVCaGV1U1BvelNXNkhRMTRyc3ZuR3hJTE9Oc0I2MlFsK3R1VWZVaFF5RmRSYzVMc1p5NGZ5OURteHo2dkhhWDh2aUNwd29XZ0krZ3RKUDN1WHRpNjVMVHUyY1M1SzJTbkt2RS9RQVlnZ1p4ZVFjMkpMdnRXM2ltbmJ2aGE5bFBsOUMzSmpVUVFkQVM5bFFKUTY3SVo4RXZudUE1T2xWMHFPd3RoaDRpRi9CalpMM1A4Z0c1ODVyS1o3QTBwWGh5Q2pxQzNwUmpZZXRTN1piMXpYaGZuQ3ZzNUtnanZJUk1RUWU2dXFPWjNDUGtjeHN0MlNIbi9DUVFkUVc5clliRFo0TGZLdHFCTXpua1ZmNVVYOWpkeEJ3U1lyNnQ1SWYrNXkrK3I5YVk4SWhzVTIxYXVDRHFDWHNvaXNaakx2aW52UTMzSThzZGw2MWZQVnFGNENuZEFBRG02aVpxalhiYWZSQlVlbWNOMXNsOG9SNzlPdmlBaDZBaDZPd3VHWGFndGFmc1RkV0llYk10SW16RjdCeHZVUUpsejBsYWk3Q3l6bFNsYjRwRjUrS1BzakZTV3BTSG9DSHFwaXNnZ05mOHI2MGJObUFkYjVtWmJ5bDdKeVc1UTRoeTBFOUQyZDlrV3JhdmdrWG1ZSlB1WmN2RFdQRjAwZ282Z0YxSlE3RHoxMit4SDZzY0NUSGJaVnJyRFZWU2V4eDFReEx6YlFNMGhzcjFsUytDUkJXaVU3YXE4ZXpsdkY0NmdJK2lGRmhkYnpuYWpyRDkxcEZrZWQ5bnMrSnRWWkNiakRsaUVQRFBoM3NObHM5VTN3eVBOWXNkQkQxR2VmWmJIaTBmUUVmUmlGSnNPYWs2VEhVczlhWkdKc3B0Y2RoRE00N2dEMnBCYkp0NjJDWXlkczdBa0hta1IyOGIxQk9YV3pMdzZBRUZIMEl0WmZHeGl6ald5SHRTV1ZyRzFzTFlMMy9VcVFPTnhCelRKbzk0dWU1MCtWTFltSG1tVnoyWDdLby91eUxzakVIUUV2ZGpGYUZXWExlWGFBRyswR1ZzaiszZFp2WXJTUjdnamwzbGpKNXpWeVg3cTJPdWhQZGo4bE4yVU4yL2hDZ1FkUVM5TmNiSWRxZjRpT3dodnRBdGI3alpXZGpQaW5pc1J0Mi9qL1J4SFJiY1hPK3IxTjhxVHFiZ0NRVWZRUzErd0Jxc1pJVnNLYnl5U3VQOUxkcnZzVGhXdGNiZ2tpWnpvNDdJMTQyWS9Rc1FYQ1ZzT2VxQnlZaVN1UU5BUjlQSVdNSHNGYjdQZ044RWJCZkdxQ2J2c0h0a2pLbWJUY1VrVThXL2JydG9yOU8xbE84bld4aXNGWVRzeUR1RVZPNEtPb0ZlMnFKM3VzcjJsY1ZUaDJHejVCMlNqWmZjemVnOXlGTDZ0YklCc0c4ZnM5S0pvbGV3YzJmRTh6Q0xvQ0hvWWhXNHJsKzB1dHlMZUtDcnZlWUYvVVBhd0N0N2J1S1NzY1cyN3RQMVl0cFVYY09LNytQRnR1NzQ5aUNzUWRBUTlyT0puUzlvdWxnM0JHeVhqZlZtRHQ4ZGtMekNxS1ZyODJ0dW05V1dieTJxOTljSXpKY00rMXgycytQMGNWeURvQ0hxNGhkSFcyVjRrV3dadmxCdzdaY3FXOTlqM3h5Zjl6NitwU003QU5TM0dhRWMxYTdsc0NlYW1McHNIWWo4dmhuZEt6cWV5d3hTajErTUtCQjFCajZOZ0x1K3k0MWdING8yeU0wMzJpaGYzbDB6Z3ZiMlRsNU9wbXNTaEplL0tYcnpOdnU5SDRldklPaE1xWldlVXk0NDcvUkJYSU9nSWVud0ZkVCtYSFQzYUhXOVVITnRyL2czWm15NDc1TUltM05tTTRzZFVZS2RGSG1jbXp2YXEzRlplMk1RMU8xUm9OZGthamtOT1F1QUwyUkdLczZ0eEJZS09vTWRkYkwrblpyakwxdWRDZUhTUC9UaFlmOXpvRjl6S0lMRnRXdzlSalAwSFZ5RG9DSG82d202N1p0bTM5WjU0SXhpbUtMd1A4V0pvOW1XVGRvcU42c2NOQ3VNMWZaOWI1N3crdDlGMlY1ZHRhR1RXZmE2cGxBejMveHVFd1FTWGZTdS9HVmNnNkFoNm1xSnVNK0hQbGUyUE40TGdRNFgzNVMzVkVaZTlxcC9pMjZuZXZ2S3RUY3F6RTdDbWVadmwvL3Y4djJOT0tzMzMzMjBiWWR0TnJiTTNPOWx2TWYvZkYvZHRseVlpdm9ScllhOERsWklEMUN6UExRMkNLMlZITVlNZFFVZlE4eUhzdHJiWGxyaXh1MVpsZVVQaG5jUUlTcVhFM2dDdHdTMnRLTGJyb1MxRmV4aFg1RS9RMmVzNHAvaUV0MlZDUi92UkgxU0d6N2tXS0FKVGZDNXZnSmpuRjBib1lLUDFsZFNjTDlzTmI1U2QwUXJ2cHhJWm9kdGE4Z0hjMHJKalJ5b2ZLU0YvRjFma2U0U09vRU5UWWQvYVpVZXpyb3MzeWhYYjdpYVhMV05MZ2RWVVR2YmtycGFObDExMnhPa1lYSUdnSStpd01GRzNIYnpzclBYVEhEdk5sVVBRTDFYemNTS1hzNnpLeVMrNXF5WEhkbm83UVhiWnVFRmJzQ01oSU9qUXFyQXZyZVlrbVMycDZvUkhTaWJvWjd0c2Rub0tkRlk1T1pxN1dqTHN6QUNieUhxS1J1V2Z4akpxQkFRZFFROUgyRzNIcjJHeVBmQkcwZmxLb1gxdVNoZWtjbktVeTVhOFFYR3hsUkRIU3NnYjUvVTNnZzRJT3JSZjJPMEFEUk9mV3J4Uk5ENVFhRitSbUtEL1FzMEszTnFpWWFmNjJYcnlKeGZ1YndRZEVIUllkR0hmUWMwWkxsdnlCb1h4dWtMN2xzUUVmWGMxYTNKckM4WU85amxPUW41M3kvNUcwT0ZiV0ljTzdjSVhtQTFsVnJoZnd5TUY4VG5YQlBOaE9XV2Z0elpzVGN3QkdLRkRNVWZyOWtBNFZIYXNZNGV3UlNHWk5laE5SdWdicTltZVc5dHU3QlErbTZ0eXJZUjhWdHY5elFnZEVIUW92ckFQbHAzb3NqT3ZvVTF4N1c1MDJSR3FLZEZISldVSWQ3ZGRJL0pUWlNQYkkrUUlPaURvVUM1aFA4YnhqYjB0Z242Sm1rOFN1Nnp2cXFUOGlydmJLdmFOL0t4RkZYSUVIUkIwS0pldzJ3M3I3NFY5S3p6U3JLQmJRWitlMkdWMVVrazVocnZiTEE5NkliOVhRbDV3OFVYUUFVR0hjb3E3N2U5dG00M1lQdkhjeUcreGM5RFBTL0hDVkZKKzZ6Z1hmUjZYeU9wTnlDWGlUeFhYMXdnNklPaFFmbUZmUmMxaE1sdW52QlFlY2U4cnJLOU1WTkQzVjlPTFcreStsTmsrQXhkSnlOOHVqYThSZEVEUW9YTEN2cVNhbjhzT3R6L20yQld2S2F6L2thaWcyOXVZUEUrT3ROM2NMcFJkSlNHZldGcGZJK2lBb0VQbGhkMG0wTmxSbXphQjZpY3VmM3NpUEthd2ZpQlJRZDlHemVZNXU1ODJzZTJmTXB2b09McVFpVzRJT2lEb0VMTzRyNnptUUc4OWMzTFpkeXVzbjBsVTBEZFNzME5PN3VNRTJRZ3ppZmc3NWZjMWdnNElPb1FwN0hhcTIwQ1hmV2UzdGtPeWlWZmxibkRacTlra2I2WEt5bDRKaCtwTTJTaVhmUjhmSlNHdjJFb0ZCQjBRZEloQjNKZFhzNi9MdnJjbnR3dWRRdHFPd2Z4dm9yZnZPeW9yQnlkNFhiYWIyMVd5YXlUaUg0YlFJUVFkRUhTSVRkeHQ2ZHMrTXR1QkxJbFg4Z3JwTTlYTVNQU1dkVlJaK1VNaTEyS3YxRzFIdit1S3ZlUU1RUWNFSGZJczdQWUtmanN2N2p1N2VKZS9UVlpJbjUveXZWSlpPVkxORXBGMjM1YWIzV0VpTHJ0UFFqNHpYRDhqNklDZ1Eveml2cGpMZHFNYkhLRzQvMGNoZlZYaWdtNmZTcjRYb1lpUGROa3VibC9INFdjRUhSQjBTRlBjZDVIdEpGc3U4QzYvcXBDdVQxelFCNmxaSi9CdWZpUzdVM1o3VENLT29BT0NEbmtSZDF2UHZsa1RjUTl4ZzVOSEZkSmpFaGQwMjhOL2l3Qzc5bG9URVgrOFhPdkZFWFJBMEJGMEtGemdlN3RzVGJSdFltTWJublFMb0Z1akZOTFBKaTdvRzdwczZXR2xtU1N6RFh4R3krNldnSTlQeTg4SU9pRG9rRTl4NzZ5bVZyYTFiRnZaeHE0Q2E5MFZ6dGVyZVN0eGQ2K3EwckozQmY1ZG04RDJ0T3grbWIwRmFaQ0lUMHYzd1FsQkJ3UWR3QVRlUnV2OXZHMHA2MXNPZ1ZjNEQxZnphZUx1WFVhbDVaQXlDZmh6c29ka1k4MGs0SlB5RXNNSU9pRG9BTTBML0EvOEtONisvOXArNU4yS0g4OXVtQmVpbE9tZzBuSnNDWDZ2aWZWanNrZHM5QzE3SWs4Q2pxQURnZzZ3YUFKdkUreldsTm5HTnB0Nis3NnNjeUdDcEhDK0lCOWk0NDRvOElISVhwVy9LSHZTbTIzczhucnNFOWtRZEVEUUFjSVFlZHR2Zm0zWkJyTDF2ZG5QeTdUeFY3eW5jTDQ2SjRLK241b1YyL2pYN1JQRTg3SVh2Tm5QcjFaeW4zUUVIUkIwQkIzeUtmVEwrOUc4cmIyMnZlZlhsYTIyRUVHN1ZlRnMyNkoyOTliRFpadmlMT25ienBGZHVvMmliVk9XaWI3OVhQYUZtVXJMR1dwM20vK0JSdmFtN0dXWDdZMytpaDkxZjBnVUllaUFvQU9FTFBTMjZVMGYyYXErL2JmRTY2N20vbjZmVytlOEFiQXRVKzFWZFZmZmR2RzJlSk9mN2ZmYTMrM29mKzdRNUdIQS90eGEwbGppZjkxRWxHZjZQOXYrOHRQOXoxTzlmZFhrNThuZTdMdjE1SEdEbWg5QjY5cDNWTE82Ykp6TFp2V1BpM0h6RmdRZEVIUUFBQUFvRzlXNEFBQUFBRUVIQUFBQUJCMEFBQUFRZEFBQUFFRFFBUUFBRUhRQUFBQkEwQUVBQUFCQkJ3QUFBQVFkQUFBQVFRY0FBQUFFSFFBQUFCQjBBQUFBUU5BQkFBQVFkQUFBQUVEUUFRQUFBRUVIQUFBQUJCMEFBQ0JkL2wrQUFRQWRhTUswQmxhaU93QUFBQUJKUlU1RXJrSmdnZz09"},{ name : "LIME_font_game_DefaultFont", data : "b3k0Omhhc2hxOjExMW95Njphc2NlbnRkODU4eTQ6ZGF0YWFkNTQzZDMwNmQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDQxMy41ZDQyOWQxODhkNDI5ZDE4OGQ5MDFkNDEzLjVkOTAxZDQxMy41ZDQyOWh5Njpfd2lkdGhkNTkzeTQ6eE1heGQ1NDN5NDp4TWluZDUweTQ6eU1heGQ3MTh5NDp5TWluZDB5NzpfaGVpZ2h0ZDY2OHk3OmxlYWRpbmdkNDN5NzpkZXNjZW50ZDIwOXk4OmNoYXJDb2RlaTExMXkxNTpsZWZ0c2lkZUJlYXJpbmdkNTB5MTI6YWR2YW5jZVdpZHRoZDU5M3k4OmNvbW1hbmRzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjIzb1IxZDg1OFIyYWQ2NDNkNzIzLjVkNjQzZDMwNmQxMTM2ZDMwNmQxMTM2ZDQyOWQ3ODFkNDI5ZDc4MWQ2MDYuNWQxMTM2ZDYwNi41ZDExMzZkMTAyNGQ2NDNkMTAyNGQ2NDNkOTAxZDEwMDYuNWQ5MDFkMTAwNi41ZDcyMy41ZDY0M2Q3MjMuNWQ1MGQ3MjMuNWQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNzIzLjVkNTBkNzIzLjVoUjNkMTE4NlI0ZDExMzZSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMjIzUjEyZDUwUjEzZDExODZSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjExMG9SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQ0MTMuNWQ3MDguNWQ0MTMuNWQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0MTMuNWQxMDI0ZDE4OGQ2MDkuNWQxODhkMTAyNGhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTEwUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjIyb1IxZDg1OFIyYWQxODhkNDQ3ZDU0M2Q0NDdkNTQzZDg2NC41ZDE4OGQ4NjQuNWQxODhkOTAxZDE4OS41ZDkwMWQxODkuNWQxMDI0ZDUwZDEwMjRkNTBkMzA2ZDE4OGQzMDZkMTg4ZDQ0N2QxODhkNzQ3LjVkNDEzLjVkNzQ3LjVkNDEzLjVkNTcwZDE4OGQ1NzBkMTg4ZDc0Ny41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkyMjJSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTA5b1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDMyOGQ2OTkuNWQ0NzMuNWQzMDZkNjAzZDMwNmQ2MDNkMTAyNGQ0NzMuNWQxMDI0ZDQ3My41ZDcyMy41ZDM3M2QxMDI0ZDI5MmQxMDI0ZDE4OGQ3MjMuNWQxODhkMTAyNGhSM2Q2NTNSNGQ2MDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTA5UjEyZDUwUjEzZDY1M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjIxb1IxZDg1OFIyYWQzNjJkNjY1ZDM2MmQxMDI0ZDIyNGQxMDI0ZDIyNGQ2NjVkNTBkMzA2ZDE4OGQzMDZkMjk5LjVkNTM0ZDQxMy41ZDMwNmQ1NDNkMzA2ZDM2MmQ2NjVkMjkzLjVkMTgyLjVkMjQyLjVkMjg4ZDMxNy41ZDI4OGQzNjlkMTgyLjVkMjkzLjVkMTgyLjVoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NDEuNVI3ZDBSOGQ3OTEuNVI5ZDQzUjEwZDIwOVIxMWkyMjFSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjEwOG9SMWQ4NThSMmFkMTg4ZDkwMWQ1NDNkOTAxZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDE4OGQzMDZkMTg4ZDkwMWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTA4UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmhnOjIyMG9SMWQ4NThSMmFkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQzMDZkMjU3ZDE3MWQyNTdkMzAwZDExOWQzMDBkMTE5ZDE3MWQyNTdkMTcxZDQ2MS41ZDE3MC41ZDQ2MS41ZDI5OS41ZDMyMy41ZDI5OS41ZDMyMy41ZDE3MC41ZDQ2MS41ZDE3MC41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODUzLjVSN2QwUjhkODAzLjVSOWQ0M1IxMGQyMDlSMTFpMjIwUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEwN29SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkNjA2LjVkNDEzLjVkMzA2ZDU0M2QzMDZkMzAyLjVkNjU2ZDU0M2QxMDI0ZDQxMy41ZDEwMjRkMTg4ZDcyMy41ZDE4OGQxMDI0aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxMDdSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIxOW9SMWQ4NThSMmFkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQzMDZkMzI2LjVkMjg3LjVkNDAxLjVkMjg3LjVkMzUwLjVkMTgyZDI3NWQxODJkMjc1ZDE4Mi41ZDI0MmQxODIuNWQxOTFkMjg4ZDI2NmQyODhkMjk2LjVkMjI2ZDMyNi41ZDI4Ny41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQyUjdkMFI4ZDc5MlI5ZDQzUjEwZDIwOVIxMWkyMTlSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTA2b1IxZDg1OFIyYWQxODhkNzE0LjVkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQ3MTQuNWQxODhkNzE0LjVoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTEwNlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjE4b1IxZDg1OFIyYWQ0MTMuNWQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDE4OGQ5MDFkNDEzLjVkOTAxZDQxMy41ZDMwNmQyOTkuNWQxODIuNWQyNDguNWQyODhkMzIzLjVkMjg4ZDM3NWQxODIuNWQyOTkuNWQxODIuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTIxOFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjEwNW9SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkMTAyNGhSM2QyMzhSNGQxODhSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTA1UjEyZDUwUjEzZDIzOFIxNGFpMWkyaTJpMmkyaGc6MjE3b1IxZDg1OFIyYWQyMjQuNWQxODIuNWQyNzZkMjg4ZDM1MWQyODhkMzAwZDE4Mi41ZDIyNC41ZDE4Mi41ZDQxMy41ZDMwNmQ1NDNkMzA2ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDE4OGQzMDZkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkMzA2aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQxLjVSN2QwUjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMjE3UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaGc6MTA0b1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDE4OGQ2MDYuNWQ0MTMuNWQ2MDYuNWQ0MTMuNWQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0MTMuNWQxMDI0ZDQxMy41ZDcyMy41ZDE4OGQ3MjMuNWQxODhkMTAyNGhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTA0UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIxNm9SMWQ4NThSMmFkMjkxZDkwMWQ0NDkuNWQ5MDFkNDQ5LjVkNTY0LjVkMjkxZDkwMWQyMjRkNzUwZDM3NWQ0MjlkMjI0ZDQyOWQyMjRkNzUwZDU3MWQzMDZkNTc5ZDMwNmQ1NzlkMTAyNGQyMzNkMTAyNGQxODhkMTEyMGQ1MGQxMTIwZDk1ZDEwMjRkODZkMTAyNGQ4NmQzMDZkNDMzZDMwNmQ0NzRkMjE5ZDYxMmQyMTlkNTcxZDMwNmhSM2Q2NjJSNGQ2MTJSNWQ1MFI2ZDgwNVI3ZC05NlI4ZDc1NVI5ZDQzUjEwZDIwOVIxMWkyMTZSMTJkNTBSMTNkNjYyUjE0YWkxaTJpMmkyaTFpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjEwM29SMWQ4NThSMmFkMjcwLjVkNjA2LjVkNTQzZDYwNi41ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDU0M2QzMDZkNTQzZDQyOWQxODhkNDI5ZDE4OGQ5MDFkNDEzLjVkOTAxZDQxMy41ZDcyMy41ZDI3MC41ZDcyMy41ZDI3MC41ZDYwNi41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxMDNSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjE1b1IxZDg1OFIyYWQzMDMuNWQ2MDVkMzkzLjVkNjk1ZDMxMC41ZDc3OGQyMjFkNjg4ZDEzMi41ZDc3NmQ1MGQ2OTMuNWQxMzhkNjA1ZDU5LjVkNTI2LjVkMTQyLjVkNDQ0ZDIyMWQ1MjIuNWQzMDFkNDQyZDM4My41ZDUyNWQzMDMuNWQ2MDVoUjNkNDQzLjVSNGQzOTMuNVI1ZDUwUjZkNTgyUjdkMjQ2UjhkNTMyUjlkNDNSMTBkMjA5UjExaTIxNVIxMmQ1MFIxM2Q0NDMuNVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjEwMm9SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkNzIzLjVkMTg4ZDcyMy41ZDE4OGQxMDI0aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxMDJSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMTRvUjFkODU4UjJhZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ0MTMuNWQ0MjlkMTg4ZDQyOWQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ0MjlkMjYwZDE3MWQyNjBkMzAwZDEyMmQzMDBkMTIyZDE3MWQyNjBkMTcxZDQ2NC41ZDE3MC41ZDQ2NC41ZDI5OS41ZDMyNi41ZDI5OS41ZDMyNi41ZDE3MC41ZDQ2NC41ZDE3MC41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODUzLjVSN2QwUjhkODAzLjVSOWQ0M1IxMGQyMDlSMTFpMjE0UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTAxb1IxZDg1OFIyYWQxODhkNDI5ZDE4OGQ2MDYuNWQ1NDNkNjA2LjVkNTQzZDcyMy41ZDE4OGQ3MjMuNWQxODhkOTAxZDU0M2Q5MDFkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDE4OGQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTEwMVIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMTNvUjFkODU4UjJhZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ0MTMuNWQ0MjlkMTg4ZDQyOWQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ0MjlkMTUyZDIyOS41ZDE4NWQyOTNkMjI3ZDI0NGQyOTAuNzVkMjg0LjVkMzU0LjVkMzI1ZDQyOS41ZDIzNS41ZDM5MC41ZDE4NmQzMzUuNWQyMzhkMjg2Ljc1ZDIwMS41ZDIzOGQxNjVkMTUyZDIyOS41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODU5UjdkMFI4ZDgwOVI5ZDQzUjEwZDIwOVIxMWkyMTNSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkzaTNpMmkzaTNoZzoxMDBvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA2ZDQ5MWQzMDZkNTQzZDM2OWQ1NDNkOTYxZDQ5MS41ZDEwMjRkNTBkMTAyNGQ0MTMuNWQ0MjlkMTg4ZDQyOWQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTEwMFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjEyb1IxZDg1OFIyYWQ1NDNkMzA2ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDU0M2QzMDZkNDEzLjVkNDI5ZDE4OGQ0MjlkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNDI5ZDMyNi41ZDI4Ny41ZDQwMS41ZDI4Ny41ZDM1MC41ZDE4MmQyNzVkMTgyZDI3NWQxODIuNWQyNDJkMTgyLjVkMTkxZDI4OGQyNjZkMjg4ZDI5Ni41ZDIyNmQzMjYuNWQyODcuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MlI3ZDBSOGQ3OTJSOWQ0M1IxMGQyMDlSMTFpMjEyUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaGc6OTlvUjFkODU4UjJhZDE4OGQ5MDFkNTQzZDkwMWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQxODhkOTAxaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk5OVIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjExb1IxZDg1OFIyYWQ1NDNkMzA2ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDU0M2QzMDZkNDEzLjVkNDI5ZDE4OGQ0MjlkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNDI5ZDI5Ni41ZDE4Mi41ZDI0NS41ZDI4OGQzMjAuNWQyODhkMzcyZDE4Mi41ZDI5Ni41ZDE4Mi41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQxLjVSN2QwUjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMjExUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo5OG9SMWQ4NThSMmFkNTQzZDMwNmQ1NDNkNTc4ZDQ4Mi41ZDY2Ny41ZDU0M2Q3NTcuNWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDE4OGQ3MjMuNWQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTk4UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMTBvUjFkODU4UjJhZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ0MTMuNWQ0MjlkMTg4ZDQyOWQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ0MjlkMjA5LjVkMTgyLjVkMjYxZDI4OGQzMzZkMjg4ZDI4NWQxODIuNWQyMDkuNWQxODIuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTIxMFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTdvUjFkODU4UjJhZDQxMy41ZDcyMy41ZDE4OGQ3MjMuNWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2QxMDI0ZDQxMy41ZDEwMjRkNDEzLjVkNzIzLjVkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTk3UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjA5b1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDQxMy41ZDcwOC41ZDQxMy41ZDMwNmQ1NDNkMzA2ZDU0M2QxMDI0ZDQxMy41ZDEwMjRkMTg4ZDYwOS41ZDE4OGQxMDI0ZDE2N2QyMjkuNWQyMDBkMjkzZDI0MmQyNDRkMzA1Ljc1ZDI4NC41ZDM2OS41ZDMyNWQ0NDQuNWQyMzUuNWQ0MDUuNWQxODZkMzUwLjVkMjM4ZDMwMS43NWQyMDEuNWQyNTNkMTY1ZDE2N2QyMjkuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1OVI3ZDBSOGQ4MDlSOWQ0M1IxMGQyMDlSMTFpMjA5UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkzaTNpMmkzaTNoZzo5Nm9SMWQ4NThSMmFkNTBkMTgyLjVkMTAxLjVkMjg4ZDE3Ni41ZDI4OGQxMjUuNWQxODIuNWQ1MGQxODIuNWhSM2QyMjYuNVI0ZDE3Ni41UjVkNTBSNmQ4NDEuNVI3ZDczNlI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTk2UjEyZDUwUjEzZDIyNi41UjE0YWkxaTJpMmkyaTJoZzoyMDhvUjFkODU4UjJhZDI1NGQ3MjMuNWQyNTRkOTAxZDQ3OS41ZDkwMWQ0NzkuNWQ0MjlkMjU0ZDQyOWQyNTRkNjA2LjVkMzE5LjVkNjA2LjVkMzE5LjVkNzIzLjVkMjU0ZDcyMy41ZDExNmQ2MDYuNWQxMTZkMzA2ZDU1N2QzMDZkNjA5ZDM2OWQ2MDlkOTYxZDU1Ny41ZDEwMjRkMTE2ZDEwMjRkMTE2ZDcyMy41ZDUwZDcyMy41ZDUwZDYwNi41ZDExNmQ2MDYuNWhSM2Q2NTlSNGQ2MDlSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMjA4UjEyZDUwUjEzZDY1OVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6OTVvUjFkODU4UjJhZDUxMi41ZDEwMjFkNTEyLjVkMTA4NGQ1MGQxMDg0ZDUwZDEwMjFkNTEyLjVkMTAyMWhSM2Q1NjIuNVI0ZDUxMi41UjVkNTBSNmQzUjdkLTYwUjhkLTQ3UjlkNDNSMTBkMjA5UjExaTk1UjEyZDUwUjEzZDU2Mi41UjE0YWkxaTJpMmkyaTJoZzoyMDdvUjFkODU4UjJhZDI4N2QxMDI0ZDE0OWQxMDI0ZDE0OWQzMDZkMjg3ZDMwNmQyODdkMTAyNGQxODhkMTcxZDE4OGQzMDBkNTBkMzAwZDUwZDE3MWQxODhkMTcxZDM5Mi41ZDE3MC41ZDM5Mi41ZDI5OS41ZDI1NC41ZDI5OS41ZDI1NC41ZDE3MC41ZDM5Mi41ZDE3MC41aFIzZDQ0Mi41UjRkMzkyLjVSNWQ1MFI2ZDg1My41UjdkMFI4ZDgwMy41UjlkNDNSMTBkMjA5UjExaTIwN1IxMmQ1MFIxM2Q0NDIuNVIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo5NG9SMWQ4NThSMmFkNDEzZDMwNmQ1NDhkNjYxZDQzMWQ2NjFkMzE1LjVkMzk5LjVkMTY3ZDY2MWQ1MGQ2NjFkMjI0ZDMwNmQ0MTNkMzA2aFIzZDU5OFI0ZDU0OFI1ZDUwUjZkNzE4UjdkMzYzUjhkNjY4UjlkNDNSMTBkMjA5UjExaTk0UjEyZDUwUjEzZDU5OFIxNGFpMWkyaTJpMmkyaTJpMmkyaGc6MjA2b1IxZDg1OFIyYWQyMjFkMTAyNGQ4M2QxMDI0ZDgzZDMwNmQyMjFkMzA2ZDIyMWQxMDI0ZDE4NS41ZDI4Ny41ZDI2MC41ZDI4Ny41ZDIwOS41ZDE4MmQxMzRkMTgyZDEzNGQxODIuNWQxMDFkMTgyLjVkNTBkMjg4ZDEyNWQyODhkMTU1LjVkMjI2ZDE4NS41ZDI4Ny41aFIzZDMxMC41UjRkMjYwLjVSNWQ1MFI2ZDg0MlI3ZDBSOGQ3OTJSOWQ0M1IxMGQyMDlSMTFpMjA2UjEyZDUwUjEzZDMxMC41UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmhnOjkzb1IxZDg1OFIyYWQ1MGQ5MDFkMTI3ZDkwMWQxMjdkNDI5ZDUwZDQyOWQ1MGQzMDZkMjU1LjVkMzA2ZDI1NmQxMDI0ZDUwZDEwMjRkNTBkOTAxaFIzZDMwNlI0ZDI1NlI1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk5M1IxMmQ1MFIxM2QzMDZSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjA1b1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDE4OGQxMDI0ZDExNmQxODIuNWQ2NWQyODhkMTQwZDI4OGQxOTEuNWQxODIuNWQxMTZkMTgyLjVoUjNkMjQxLjVSNGQxOTEuNVI1ZDUwUjZkODQxLjVSN2QwUjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMjA1UjEyZDUwUjEzZDI0MS41UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTJvUjFkODU4UjJhZDUwZDMwNmQxODhkMzA2ZDQ0MC41ZDEwMjRkMzAyLjVkMTAyNGQ1MGQzMDZoUjNkNDkwLjVSNGQ0NDAuNVI1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk5MlIxMmQ1MFIxM2Q0OTAuNVIxNGFpMWkyaTJpMmkyaGc6MjA0b1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDE4OGQxMDI0ZDUwZDE4Mi41ZDEwMS41ZDI4OGQxNzYuNWQyODhkMTI1LjVkMTgyLjVkNTBkMTgyLjVoUjNkMjM4UjRkMTg4UjVkNTBSNmQ4NDEuNVI3ZDBSOGQ3OTEuNVI5ZDQzUjEwZDIwOVIxMWkyMDRSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTFvUjFkODU4UjJhZDI1NmQxMDI0ZDUwZDEwMjRkNTAuNWQzMDZkMjU2ZDMwNmQyNTZkNDI5ZDE3OWQ0MjlkMTc5ZDkwMWQyNTZkOTAxZDI1NmQxMDI0aFIzZDMwNlI0ZDI1NlI1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk5MVIxMmQ1MFIxM2QzMDZSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjAzb1IxZDg1OFIyYWQxODhkNDI5ZDE4OGQ2MDYuNWQ1NDNkNjA2LjVkNTQzZDcyMy41ZDE4OGQ3MjMuNWQxODhkOTAxZDU0M2Q5MDFkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDE4OGQ0MjlkMjY2ZDE3MWQyNjZkMzAwZDEyOGQzMDBkMTI4ZDE3MWQyNjZkMTcxZDQ3MC41ZDE3MC41ZDQ3MC41ZDI5OS41ZDMzMi41ZDI5OS41ZDMzMi41ZDE3MC41ZDQ3MC41ZDE3MC41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODUzLjVSN2QwUjhkODAzLjVSOWQ0M1IxMGQyMDlSMTFpMjAzUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTBvUjFkODU4UjJhZDM3NC41ZDQyOWQ1MGQ0MjlkNTBkMzA2ZDU0M2QzMDZkNTQzZDQyOWQyMjQuNWQ5MDFkNTQzZDkwMWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDkwMWQzNzQuNWQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTkwUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjAyb1IxZDg1OFIyYWQxODhkNDI5ZDE4OGQ2MDYuNWQ1NDNkNjA2LjVkNTQzZDcyMy41ZDE4OGQ3MjMuNWQxODhkOTAxZDU0M2Q5MDFkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDE4OGQ0MjlkMzI5LjVkMjg3LjVkNDA0LjVkMjg3LjVkMzUzLjVkMTgyZDI3OGQxODJkMjc4ZDE4Mi41ZDI0NWQxODIuNWQxOTRkMjg4ZDI2OWQyODhkMjk5LjVkMjI2ZDMyOS41ZDI4Ny41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQyUjdkMFI4ZDc5MlI5ZDQzUjEwZDIwOVIxMWkyMDJSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJoZzo4OW9SMWQ4NThSMmFkMzYyZDY2NWQzNjJkMTAyNGQyMjRkMTAyNGQyMjRkNjY1ZDUwZDMwNmQxODhkMzA2ZDI5OS41ZDUzNGQ0MTMuNWQzMDZkNTQzZDMwNmQzNjJkNjY1aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk4OVIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMDFvUjFkODU4UjJhZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkNzIzLjVkMTg4ZDcyMy41ZDE4OGQ5MDFkNTQzZDkwMWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQzMDIuNWQxODIuNWQyNTEuNWQyODhkMzI2LjVkMjg4ZDM3OGQxODIuNWQzMDIuNWQxODIuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTIwMVIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODhvUjFkODU4UjJhZDIzMC41ZDY2NWQyMjZkNjY1ZDUyZDMwNmQxOTBkMzA2ZDMwMS41ZDUzNGQ0MTUuNWQzMDZkNTQ1ZDMwNmQzNjQuNWQ2NjQuNWQzNjlkNjY0LjVkNTQzZDEwMjMuNWQ0MDVkMTAyMy41ZDI5My41ZDc5NS41ZDE3OS41ZDEwMjMuNWQ1MGQxMDIzLjVkMjMwLjVkNjY1aFIzZDU5NVI0ZDU0NVI1ZDUwUjZkNzE4UjdkMC41UjhkNjY4UjlkNDNSMTBkMjA5UjExaTg4UjEyZDUwUjEzZDU5NVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMDBvUjFkODU4UjJhZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkNzIzLjVkMTg4ZDcyMy41ZDE4OGQ5MDFkNTQzZDkwMWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQyMzMuNWQxODIuNWQyODVkMjg4ZDM2MGQyODhkMzA5ZDE4Mi41ZDIzMy41ZDE4Mi41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQxLjVSN2QwUjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMjAwUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzo4N29SMWQ4NThSMmFkNDAwZDY5NmQzNDEuNWQxMDI0ZDE3OGQxMDI0ZDUwZDMwNmQxOTFkMzA2ZDI1OWQ3ODZkMzMxLjVkMzA2ZDQ2OGQzMDZkNTQwLjVkNzg2ZDYwOC41ZDMwNmQ3NDkuNWQzMDZkNjIxLjVkMTAyNGQ0NThkMTAyNGQ0MDBkNjk2aFIzZDc5OS41UjRkNzQ5LjVSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpODdSMTJkNTBSMTNkNzk5LjVSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE5OW9SMWQ4NThSMmFkMTg4ZDkwMWQ1NDNkOTAxZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDU0M2QzMDZkNTQzZDQyOWQxODhkNDI5ZDE4OGQ5MDFkMjM5LjVkMTEzNWQyMzkuNWQxMTgwZDI3OWQxMTgwZDMwNmQxMTcyLjVkMzMzZDExNjVkMzQwLjVkMTEzMC41ZDM0OGQxMDk2ZDMwMGQxMDYwZDMzNmQxMDI0ZDI5MWQxMDI0ZDI1NC41ZDEwNjNkMjU0LjVkMTA5NmQyOTFkMTA5NmQyOTFkMTEwOGQyOTFkMTEyMGQyODVkMTEzMmQyNzlkMTE0NGQyMzkuNWQxMTM1aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkLTE1NlI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxOTlSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpM2kzaTNpMmkyaTJpMmkzaTNpM2hnOjg2b1IxZDg1OFIyYWQ0MTMuNWQzMDZkNTQzZDMwNmQzODYuNWQxMDI0ZDIxOC41ZDEwMjRkNTBkMzA2ZDE4OGQzMDZkMjk2ZDg1OC41ZDQxMy41ZDMwNmhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpODZSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJoZzoxOThvUjFkODU4UjJhZDQxMC41ZDcyMy41ZDE4OGQ3MjMuNWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ5MDMuNWQzMDZkOTAzLjVkNDI5ZDU0OC41ZDQyOWQ1NDguNWQ2MDYuNWQ5MDMuNWQ2MDYuNWQ5MDMuNWQ3MjMuNWQ1NDguNWQ3MjMuNWQ1NDguNWQ5MDFkOTAzLjVkOTAxZDkwMy41ZDEwMjRkNDEwLjVkMTAyNGQ0MTAuNWQ3MjMuNWQ0MTAuNWQ2MDYuNWQ0MTAuNWQ0MjlkMTg4ZDQyOWQxODhkNjA2LjVkNDEwLjVkNjA2LjVoUjNkOTUzLjVSNGQ5MDMuNVI1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxOThSMTJkNTBSMTNkOTUzLjVSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzo4NW9SMWQ4NThSMmFkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQzMDZoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTg1UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJoZzoxOTdvUjFkODU4UjJhZDQxMy41ZDcyMy41ZDE4OGQ3MjMuNWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2QxMDI0ZDQxMy41ZDEwMjRkNDEzLjVkNzIzLjVkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjlkMzI2LjVkMTk0Ljc1ZDM0NC41ZDIxM2QzNDQuNWQyMzguNWQzNDQuNWQyNjRkMzI2LjVkMjgyZDMwOC41ZDMwMGQyODNkMzAwZDI1Ny41ZDMwMGQyMzkuNWQyODJkMjIxLjVkMjY0ZDIyMS41ZDIzOC41ZDIyMS41ZDIxM2QyMzkuNWQxOTQuNzVkMjU3LjVkMTc2LjVkMjgzZDE3Ni41ZDMwOC41ZDE3Ni41ZDMyNi41ZDE5NC43NWQyODNkMjA5LjVkMjcxLjVkMjA5LjVkMjYzZDIxOGQyNTQuNWQyMjYuNWQyNTQuNWQyMzguNWQyNTQuNWQyNTBkMjYzZDI1OC41ZDI3MS41ZDI2N2QyODNkMjY3ZDI5NWQyNjdkMzAzLjI1ZDI1OC41ZDMxMS41ZDI1MGQzMTEuNWQyMzguNWQzMTEuNWQyMjYuNWQzMDMuMjVkMjE4ZDI5NWQyMDkuNWQyODNkMjA5LjVoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NDcuNVI3ZDBSOGQ3OTcuNVI5ZDQzUjEwZDIwOVIxMWkxOTdSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNoZzo4NG9SMWQ4NThSMmFkMjM2LjVkNDI5ZDUwZDQyOWQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDM3NC41ZDQyOWQzNzQuNWQxMDI0ZDIzNi41ZDEwMjRkMjM2LjVkNDI5aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk4NFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MTk2b1IxZDg1OFIyYWQ0MTMuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0MTMuNWQxMDI0ZDQxMy41ZDcyMy41ZDE4OGQ0MjlkMTg4ZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQxODhkNDI5ZDI2OWQxNzFkMjY5ZDMwMGQxMzFkMzAwZDEzMWQxNzFkMjY5ZDE3MWQ0NzMuNWQxNzAuNWQ0NzMuNWQyOTkuNWQzMzUuNWQyOTkuNWQzMzUuNWQxNzAuNWQ0NzMuNWQxNzAuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1My41UjdkMFI4ZDgwMy41UjlkNDNSMTBkMjA5UjExaTE5NlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODNvUjFkODU4UjJhZDUwZDcyMy41ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQxODhkNjA2LjVkNTQzZDYwNi41ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ3MjMuNWQ1MGQ3MjMuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpODNSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTk1b1IxZDg1OFIyYWQ0MTMuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0MTMuNWQxMDI0ZDQxMy41ZDcyMy41ZDE4OGQ0MjlkMTg4ZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQxODhkNDI5ZDE1OGQyMjkuNWQxOTFkMjkzZDIzM2QyNDRkMjk2Ljc1ZDI4NC41ZDM2MC41ZDMyNWQ0MzUuNWQyMzUuNWQzOTYuNWQxODZkMzQxLjVkMjM4ZDI5Mi43NWQyMDEuNWQyNDRkMTY1ZDE1OGQyMjkuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1OVI3ZDBSOGQ4MDlSOWQ0M1IxMGQyMDlSMTFpMTk1UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkzaTNpMmkzaTNoZzo4Mm9SMWQ4NThSMmFkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjlkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkNzIzLjVkMzc0LjVkNzIzLjVkNTQzZDEwMjRkNDEzLjVkMTAyNGQyMzYuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkNTBkMTAyNGhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpODJSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTk0b1IxZDg1OFIyYWQ0MTMuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0MTMuNWQxMDI0ZDQxMy41ZDcyMy41ZDE4OGQ0MjlkMTg4ZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQxODhkNDI5ZDMyMy41ZDI4Ny41ZDM5OC41ZDI4Ny41ZDM0Ny41ZDE4MmQyNzJkMTgyZDI3MmQxODIuNWQyMzlkMTgyLjVkMTg4ZDI4OGQyNjNkMjg4ZDI5My41ZDIyNmQzMjMuNWQyODcuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MlI3ZDBSOGQ3OTJSOWQ0M1IxMGQyMDlSMTFpMTk0UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJoZzo4MW9SMWQ4NThSMmFkNDEzLjVkODkzLjVkNDEzLjVkNDI5ZDE4OGQ0MjlkMTg4ZDkwMWQyOTguNWQ5MDFkMjUyZDgxMy41ZDM3M2Q4MTMuNWQ0MTMuNWQ4OTMuNWQzNjQuNWQxMDI0ZDUwZDEwMjRkNTBkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNDc5LjVkMTAyNGQ1NDBkMTE0NGQ0MjguNWQxMTQ0ZDM2NC41ZDEwMjRoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QtMTIwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTgxUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaGc6MTkzb1IxZDg1OFIyYWQ0MTMuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0MTMuNWQxMDI0ZDQxMy41ZDcyMy41ZDE4OGQ0MjlkMTg4ZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQxODhkNDI5ZDMwMi41ZDE4Mi41ZDI1MS41ZDI4OGQzMjYuNWQyODhkMzc4ZDE4Mi41ZDMwMi41ZDE4Mi41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQxLjVSN2QwUjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMTkzUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjgwb1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTgwUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoxOTJvUjFkODU4UjJhZDQxMy41ZDcyMy41ZDE4OGQ3MjMuNWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2QxMDI0ZDQxMy41ZDEwMjRkNDEzLjVkNzIzLjVkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjlkMjI0LjVkMTgyLjVkMjc2ZDI4OGQzNTFkMjg4ZDMwMGQxODIuNWQyMjQuNWQxODIuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTE5MlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo3OW9SMWQ4NThSMmFkNTQzZDMwNmQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDQxMy41ZDQyOWQxODhkNDI5ZDE4OGQ5MDFkNDEzLjVkOTAxZDQxMy41ZDQyOWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNzlSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTkxb1IxZDg1OFIyYWQ1NDNkNDkyLjVkNTQzZDcyMy41ZDE3OS41ZDcyMy41ZDE3OS41ZDkwMWQ1NDNkOTAxZDU0M2QxMDI0ZDUwZDEwMjRkNTBkNjA2LjVkNDA1ZDYwNi41ZDQwNWQ0OTIuNWQ1NDNkNDkyLjVkNDA1ZDQzNWQ0MDVkMzA2ZDU0M2QzMDZkNTQzZDQzNWQ0MDVkNDM1aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxOTFSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6NzhvUjFkODU4UjJhZDE4OGQxMDI0ZDUwZDEwMjRkNTBkMzA2ZDE4OGQzMDZkNDEzLjVkNzA4LjVkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNDEzLjVkMTAyNGQxODhkNjA5LjVkMTg4ZDEwMjRoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTc4UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTkwb1IxZDg1OFIyYWQyMThkMTAyNGQ4MGQxMDI0ZDU0OWQzMDZkNjg3ZDMwNmQyMThkMTAyNGQ0NjcuNWQ4NzVkNDY3LjVkNjY2LjVkNTM2LjVkNjY2LjVkNTM2LjVkODE2LjVkNjQ5LjVkODE2LjVkNjQ5LjVkNjY2LjVkNzE0ZDY2Ni41ZDcxNGQxMDI1LjVkNjQ5LjVkMTAyNS41ZDY0OS41ZDg3NWQ0NjcuNWQ4NzVkNTBkMzY3LjVkNTBkMzA2ZDI5Ni41ZDMwNmQyOTYuNWQ2NjVkNTBkNjY1ZDUwZDYwMy41ZDIzMmQ2MDMuNWQyMzJkNTE0LjVkNTBkNTE0LjVkNTBkNDU2ZDIzMmQ0NTZkMjMyZDM2Ny41ZDUwZDM2Ny41aFIzZDc2NFI0ZDcxNFI1ZDUwUjZkNzE4UjdkLTEuNVI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxOTBSMTJkNTBSMTNkNzY0UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzo3N29SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQzMjhkNjk5LjVkNDczLjVkMzA2ZDYwM2QzMDZkNjAzZDEwMjRkNDczLjVkMTAyNGQ0NzMuNWQ3MjMuNWQzNzNkMTAyNGQyOTJkMTAyNGQxODhkNzIzLjVkMTg4ZDEwMjRoUjNkNjUzUjRkNjAzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTc3UjEyZDUwUjEzZDY1M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTg5b1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUxOWQzMDZkNjU3ZDMwNmQxODhkMTAyNGQyMTUuNWQ2NjVkMTQ2LjVkNjY1ZDE0Ni41ZDMwNmQyMTUuNWQzMDZkMjE1LjVkNjY1ZDcyMGQ5NjFkNzIwZDEwMjIuNWQ0NzMuNWQxMDIyLjVkNDczLjVkODEzLjVkNjU1LjVkODEzLjVkNjU1LjVkNzI1ZDQ3My41ZDcyNWQ0NzMuNWQ2NjMuNWQ3MjBkNjYzLjVkNzIwZDg3MmQ1NDIuNWQ4NzJkNTQyLjVkOTYxZDcyMGQ5NjFoUjNkNzcwUjRkNzIwUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTE4OVIxMmQ1MFIxM2Q3NzBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjc2b1IxZDg1OFIyYWQxODhkOTAxZDU0M2Q5MDFkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkOTAxaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk3NlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJoZzoxODhvUjFkODU4UjJhZDE4OGQxMDI0ZDUwZDEwMjRkNTE5ZDMwNmQ2NTdkMzA2ZDE4OGQxMDI0ZDIxNS41ZDY2NWQxNDYuNWQ2NjVkMTQ2LjVkMzA2ZDIxNS41ZDMwNmQyMTUuNWQ2NjVkNDM3LjVkODc1ZDQzNy41ZDY2Ni41ZDUwNi41ZDY2Ni41ZDUwNi41ZDgxNi41ZDYxOS41ZDgxNi41ZDYxOS41ZDY2Ni41ZDY4NGQ2NjYuNWQ2ODRkMTAyNS41ZDYxOS41ZDEwMjUuNWQ2MTkuNWQ4NzVkNDM3LjVkODc1aFIzZDczNFI0ZDY4NFI1ZDUwUjZkNzE4UjdkLTEuNVI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxODhSMTJkNTBSMTNkNzM0UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjc1b1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDE4OGQ2MDYuNWQ0MTMuNWQzMDZkNTQzZDMwNmQzMDIuNWQ2NTZkNTQzZDEwMjRkNDEzLjVkMTAyNGQxODhkNzIzLjVkMTg4ZDEwMjRoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTc1UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxODdvUjFkODU4UjJhZDIyMS41ZDgxNy41ZDM0NmQ3MDguNWQzNDZkNTU4LjVkMjIyLjVkNDQ3ZDIyMi41ZDU3OS41ZDI4MGQ2MzkuNWQyMjEuNWQ3MDZkMjIxLjVkODE3LjVkNTBkODE3LjVkMTc0LjVkNzA4LjVkMTc0LjVkNTU4LjVkNTFkNDQ3ZDUxZDU3OS41ZDEwOC41ZDYzOS41ZDUwZDcwNmQ1MGQ4MTcuNWhSM2QzOTZSNGQzNDZSNWQ1MFI2ZDU3N1I3ZDIwNi41UjhkNTI3UjlkNDNSMTBkMjA5UjExaTE4N1IxMmQ1MFIxM2QzOTZSMTRhaTFpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJoZzo3NG9SMWQ4NThSMmFkMTg4ZDcxNC41ZDE4OGQ5MDFkNDEzLjVkOTAxZDQxMy41ZDMwNmQ1NDNkMzA2ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkNzE0LjVkMTg4ZDcxNC41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk3NFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MTg2b1IxZDg1OFIyYWQyOTYuNWQzMDZkMjk2LjVkNjY1ZDUwZDY2NWQ1MGQzMDZkMjk2LjVkMzA2ZDIzMmQzNjcuNWQxMTlkMzY3LjVkMTE5ZDYwMy41ZDIzMmQ2MDMuNWQyMzJkMzY3LjVoUjNkMzQ2LjVSNGQyOTYuNVI1ZDUwUjZkNzE4UjdkMzU5UjhkNjY4UjlkNDNSMTBkMjA5UjExaTE4NlIxMmQ1MFIxM2QzNDYuNVIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjczb1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDE4OGQxMDI0aFIzZDIzOFI0ZDE4OFI1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk3M1IxMmQ1MFIxM2QyMzhSMTRhaTFpMmkyaTJpMmhnOjE4NW9SMWQ4NThSMmFkMTE5ZDY2NWQ1MGQ2NjVkNTBkMzA2ZDExOWQzMDZkMTE5ZDY2NWhSM2QxNjlSNGQxMTlSNWQ1MFI2ZDcxOFI3ZDM1OVI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxODVSMTJkNTBSMTNkMTY5UjE0YWkxaTJpMmkyaTJoZzo3Mm9SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNDEzLjVkMTAyNGQ0MTMuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTcyUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE4NG9SMWQ4NThSMmFkNTBkMTEzNWQ1MGQxMTgwZDg5LjVkMTE4MGQxMTYuNWQxMTcyLjVkMTQzLjVkMTE2NWQxNTFkMTEzMC41ZDE1OC41ZDEwOTZkMTEwLjVkMTA2MGQxNDYuNWQxMDI0ZDEwMS41ZDEwMjRkNjVkMTA2M2Q2NWQxMDk2ZDEwMS41ZDEwOTZkMTAxLjVkMTEwOGQxMDEuNWQxMTIwZDk1LjVkMTEzMmQ4OS41ZDExNDRkNTBkMTEzNWhSM2QyMDguNVI0ZDE1OC41UjVkNTBSNmQwUjdkLTE1NlI4ZC01MFI5ZDQzUjEwZDIwOVIxMWkxODRSMTJkNTBSMTNkMjA4LjVSMTRhaTFpMmkzaTNpM2kyaTJpMmkyaTNpM2kzaGc6NzFvUjFkODU4UjJhZDI3MC41ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ3MjMuNWQyNzAuNWQ3MjMuNWQyNzAuNWQ2MDYuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNzFSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTgzb1IxZDg1OFIyYWQxODhkNTU4LjVkMTg4ZDY4Ny41ZDUwZDY4Ny41ZDUwZDU1OC41ZDE4OGQ1NTguNWhSM2QyMzhSNGQxODhSNWQ1MFI2ZDQ2NS41UjdkMzM2LjVSOGQ0MTUuNVI5ZDQzUjEwZDIwOVIxMWkxODNSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJoZzo3MG9SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkNzIzLjVkMTg4ZDcyMy41ZDE4OGQxMDI0aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk3MFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE4Mm9SMWQ4NThSMmFkNDcxZDM1OS41ZDQ3MWQxMTA1ZDQxNi41ZDExMDVkNDE2LjVkNzk1LjVkMzc3LjVkNzk1LjVkMzc3LjVkMTEwNWQzMTQuNWQxMTA1ZDMxNC41ZDc5OC41ZDE0OS41ZDc5OC41ZDk5Ljc1ZDcxNy41ZDUwZDYzNi41ZDU0LjVkNTUwLjc1ZDU5ZDQ2NWQ5OC4yNWQ0MDJkMTM3LjVkMzM5ZDE3NWQzMTkuNWQyMTIuNWQzMDBkNTA0ZDMwOWQ1MDRkMzU5LjVkNDcxZDM1OS41aFIzZDU1NFI0ZDUwNFI1ZDUwUjZkNzI0UjdkLTgxUjhkNjc0UjlkNDNSMTBkMjA5UjExaTE4MlIxMmQ1MFIxM2Q1NTRSMTRhaTFpMmkyaTJpMmkyaTJpMmkzaTNpM2kzaTNpMmkyaGc6NjlvUjFkODU4UjJhZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkNzIzLjVkMTg4ZDcyMy41ZDE4OGQ5MDFkNTQzZDkwMWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNjlSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTgxb1IxZDg1OFIyYWQxNzYuNWQxMTg5LjVkNTBkMTE4OS41ZDUxZDUzN2QxODAuNWQ1MzdkMTgwLjVkOTAxZDQwNmQ5MDFkNDA2ZDUzN2Q1NDRkNTM3ZDU0NGQxMDI0ZDE3Ni41ZDEwMjRkMTc2LjVkMTE4OS41aFIzZDU5NFI0ZDU0NFI1ZDUwUjZkNDg3UjdkLTE2NS41UjhkNDM3UjlkNDNSMTBkMjA5UjExaTE4MVIxMmQ1MFIxM2Q1OTRSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjY4b1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwNmQ0OTFkMzA2ZDU0M2QzNjlkNTQzZDk2MWQ0OTEuNWQxMDI0ZDUwZDEwMjRkNDEzLjVkNDI5ZDE4OGQ0MjlkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNDI5aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk2OFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTgwb1IxZDg1OFIyYWQxMDFkMTgyLjVkNTBkMjg4ZDEyNWQyODhkMTc2LjVkMTgyLjVkMTAxZDE4Mi41aFIzZDIyNi41UjRkMTc2LjVSNWQ1MFI2ZDg0MS41UjdkNzM2UjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMTgwUjEyZDUwUjEzZDIyNi41UjE0YWkxaTJpMmkyaTJoZzo2N29SMWQ4NThSMmFkMTg4ZDkwMWQ1NDNkOTAxZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDU0M2QzMDZkNTQzZDQyOWQxODhkNDI5ZDE4OGQ5MDFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTY3UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJoZzoxNzlvUjFkODU4UjJhZDUwZDM2Ny41ZDUwZDMwNmQyOTYuNWQzMDZkMjk2LjVkNjY1ZDUwZDY2NWQ1MGQ2MDMuNWQyMzJkNjAzLjVkMjMyZDUxNC41ZDUwZDUxNC41ZDUwZDQ1NmQyMzJkNDU2ZDIzMmQzNjcuNWQ1MGQzNjcuNWhSM2QzNDYuNVI0ZDI5Ni41UjVkNTBSNmQ3MThSN2QzNTlSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTc5UjEyZDUwUjEzZDM0Ni41UjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6NjZvUjFkODU4UjJhZDU0M2QzMDZkNTQzZDU3OGQ0ODIuNWQ2NjcuNWQ1NDNkNzU3LjVkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQxODhkNzIzLjVkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNzIzLjVkMTg4ZDcyMy41ZDE4OGQ0MjlkMTg4ZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQxODhkNDI5aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk2NlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTc4b1IxZDg1OFIyYWQyOTYuNWQ2MDMuNWQyOTYuNWQ2NjVkNTBkNjY1ZDUwZDQ1NmQyMzJkNDU2ZDIzMmQzNjcuNWQ1MGQzNjcuNWQ1MGQzMDZkMjk2LjVkMzA2ZDI5Ni41ZDUxNC41ZDExOWQ1MTQuNWQxMTlkNjAzLjVkMjk2LjVkNjAzLjVoUjNkMzQ2LjVSNGQyOTYuNVI1ZDUwUjZkNzE4UjdkMzU5UjhkNjY4UjlkNDNSMTBkMjA5UjExaTE3OFIxMmQ1MFIxM2QzNDYuNVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjY1b1IxZDg1OFIyYWQ0MTMuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0MTMuNWQxMDI0ZDQxMy41ZDcyMy41ZDE4OGQ0MjlkMTg4ZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQxODhkNDI5aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk2NVIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjE3N29SMWQ4NThSMmFkMjkxLjVkNzIzLjVkMjkxLjVkODUwLjVkMTc0LjVkODUwLjVkMTc0LjVkNzIzLjVkNTBkNzIzLjVkNTBkNjA2LjVkMTc0LjVkNjA2LjVkMTc0LjVkNDk1LjVkMjkxLjVkNDk1LjVkMjkxLjVkNjA2LjVkNDA1ZDYwNi41ZDQwNWQ3MjMuNWQyOTEuNWQ3MjMuNWQ1MGQ5MDdkNDA1ZDkwN2Q0MDVkMTAyNGQ1MGQxMDI0ZDUwZDkwN2hSM2Q0NTVSNGQ0MDVSNWQ1MFI2ZDUyOC41UjdkMFI4ZDQ3OC41UjlkNDNSMTBkMjA5UjExaTE3N1IxMmQ1MFIxM2Q0NTVSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6NjRvUjFkODU4UjJhZDQxMy41ZDcyMy41ZDQxMy41ZDYxOC41ZDMzMC41ZDYxOC41ZDMzMC41ZDcyMy41ZDQxMy41ZDcyMy41ZDQxMy41ZDUyMmQ0MTMuNWQ0MjlkMTg4ZDQyOWQxODhkOTAxZDU0M2Q5MDFkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkODEzLjVkMjM0LjVkODEzLjVkMjM0LjVkNTIyZDQxMy41ZDUyMmhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNjRSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE3Nm9SMWQ4NThSMmFkMjk2LjVkMzA2ZDI5Ni41ZDY2NWQ1MGQ2NjVkNTBkMzA2ZDI5Ni41ZDMwNmQyMzJkMzY3LjVkMTE5ZDM2Ny41ZDExOWQ2MDMuNWQyMzJkNjAzLjVkMjMyZDM2Ny41aFIzZDM0Ni41UjRkMjk2LjVSNWQ1MFI2ZDcxOFI3ZDM1OVI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxNzZSMTJkNTBSMTNkMzQ2LjVSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo2M29SMWQ4NThSMmFkNTBkODM3LjVkNTBkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDUwZDQyOWQ1MGQzMDZkNTQzZDMwNmQ1NDNkNzIzLjVkMTg4ZDcyMy41ZDE4OGQ4MzcuNWQ1MGQ4MzcuNWQxODhkODk1ZDE4OGQxMDI0ZDUwZDEwMjRkNTBkODk1ZDE4OGQ4OTVoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTYzUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjE3NW9SMWQ4NThSMmFkNTBkMTc3ZDMxMC41ZDE3N2QzMTAuNWQyOTRkNTBkMjk0ZDUwZDE3N2hSM2QzNjAuNVI0ZDMxMC41UjVkNTBSNmQ4NDdSN2Q3MzBSOGQ3OTdSOWQ0M1IxMGQyMDlSMTFpMTc1UjEyZDUwUjEzZDM2MC41UjE0YWkxaTJpMmkyaTJoZzo2Mm9SMWQ4NThSMmFkNDA1ZDcwNS41ZDUwZDg3OS41ZDUwZDc2Mi41ZDMxMS41ZDYxNGQ1MGQ0OTguNWQ1MGQzODEuNWQ0MDVkNTE2LjVkNDA1ZDcwNS41aFIzZDQ1NVI0ZDQwNVI1ZDUwUjZkNjQyLjVSN2QxNDQuNVI4ZDU5Mi41UjlkNDNSMTBkMjA5UjExaTYyUjEyZDUwUjEzZDQ1NVIxNGFpMWkyaTJpMmkyaTJpMmkyaGc6MTc0b1IxZDg1OFIyYWQ0MDMuNWQzMzFkNDk0ZDMzMWQ1NzguNWQzNzYuNWQ2NjNkNDIyZDcxMWQ1MDcuNWQ3NTlkNTkzZDc1OWQ2ODQuNWQ3NTlkNzc3LjVkNzEyZDg2MS43NWQ2NjVkOTQ2ZDU4MC43NWQ5OTIuNzVkNDk2LjVkMTAzOS41ZDQwMy41ZDEwMzkuNWQzMTJkMTAzOS41ZDIyNy43NWQ5OTIuNzVkMTQzLjVkOTQ2ZDk2Ljc1ZDg2MS43NWQ1MGQ3NzcuNWQ1MGQ2ODQuNWQ1MGQ1OTNkOTcuNWQ1MDcuNWQxNDVkNDIyZDIzMGQzNzYuNWQzMTVkMzMxZDQwMy41ZDMzMWQ0MDMuNWQzNjAuNWQzMjNkMzYwLjVkMjQ1ZDQwMi43NWQxNjdkNDQ1ZDEyMy43NWQ1MjIuNzVkODAuNWQ2MDAuNWQ4MC41ZDY4NC41ZDgwLjVkNzY5ZDEyMy41ZDg0NmQxNjYuNWQ5MjNkMjQzLjVkOTY1Ljc1ZDMyMC41ZDEwMDguNWQ0MDMuNWQxMDA4LjVkNDg4ZDEwMDguNWQ1NjUuMjVkOTY1Ljc1ZDY0Mi41ZDkyM2Q2ODVkODQ2ZDcyNy41ZDc2OWQ3MjcuNWQ2ODQuNWQ3MjcuNWQ2MDAuNWQ2ODQuMjVkNTIyLjc1ZDY0MWQ0NDVkNTYzLjVkNDAyLjc1ZDQ4NmQzNjAuNWQ0MDMuNWQzNjAuNWQyMDhkNDY3ZDQwMWQ0NjdkNDczLjVkNDY3ZDUxMS4yNWQ0OTkuNzVkNTQ5ZDUzMi41ZDU0OWQ1NzlkNTQ5ZDYxNi41ZDUyMy41ZDY0NS41ZDQ5OGQ2NzQuNWQ0MzguNWQ2OTBkNTQzZDgzOC41ZDU2MmQ4NjZkNTc3ZDg3NWQ1ODYuNWQ4ODFkNjAzLjVkODgzZDYwMy41ZDkwMGQ1MTEuNWQ5MDBkMzY0LjVkNjk3LjVkMzI2LjVkNjk3LjVkMzI2LjVkODUxLjVkMzI5LjVkODY4LjVkMzQwLjc1ZDg3NS43NWQzNTJkODgzZDM4NmQ4ODNkMzg2ZDkwMGQyMDJkOTAwZDIwMmQ4ODNkMjI2ZDg4M2QyMzYuMjVkODc3LjVkMjQ2LjVkODcyZDI1MC41ZDg2MC41ZDI1NGQ4NTJkMjU0ZDgxNGQyNTRkNTUzZDI1NGQ1MTUuNWQyNTIuNWQ1MDguNWQyNDlkNDk3LjVkMjM5LjVkNDkxLjI1ZDIzMGQ0ODVkMjA4ZDQ4NWQyMDhkNDY3ZDMyNi41ZDY3NS41ZDM4NmQ2NzUuNWQ0MTNkNjY0ZDQ0MGQ2NTIuNWQ0NTQuNWQ2MzEuNWQ0NjlkNjEwLjVkNDY5ZDU4NC41ZDQ2OWQ1NDQuNWQ0NDAuNWQ1MTYuNzVkNDEyZDQ4OWQzNjlkNDg5ZDM0OWQ0ODlkMzI2LjVkNDk2LjVkMzI2LjVkNjc1LjVoUjNkODA5UjRkNzU5UjVkNTBSNmQ2OTNSN2QtMTUuNVI4ZDY0M1I5ZDQzUjEwZDIwOVIxMWkxNzRSMTJkNTBSMTNkODA5UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkyaTNpM2kzaTNpMmkzaTNpMmkyaTJpMmkyaTNpM2kyaTJpMmkzaTNpM2kyaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kyaGc6NjFvUjFkODU4UjJhZDUwZDQ3MS41ZDQwNWQ0NzEuNWQ0MDVkNTg4LjVkNTBkNTg4LjVkNTBkNDcxLjVkNTBkNjc4LjVkNDA1ZDY3OC41ZDQwNWQ3OTUuNWQ1MGQ3OTUuNWQ1MGQ2NzguNWhSM2Q0NTVSNGQ0MDVSNWQ1MFI2ZDU1Mi41UjdkMjI4LjVSOGQ1MDIuNVI5ZDQzUjEwZDIwOVIxMWk2MVIxMmQ1MFIxM2Q0NTVSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNzNvUjFkODU4UjJhZDUwZDYwNi41ZDMxMC41ZDYwNi41ZDMxMC41ZDcyMy41ZDUwZDcyMy41ZDUwZDYwNi41aFIzZDM2MC41UjRkMzEwLjVSNWQ1MFI2ZDQxNy41UjdkMzAwLjVSOGQzNjcuNVI5ZDQzUjEwZDIwOVIxMWkxNzNSMTJkNTBSMTNkMzYwLjVSMTRhaTFpMmkyaTJpMmhnOjYwb1IxZDg1OFIyYWQ1MGQ1MTYuNWQ0MDVkMzgxLjVkNDA1ZDQ5OC41ZDE0My41ZDYxNGQ0MDVkNzYyLjVkNDA1ZDg3OS41ZDUwZDcwNS41ZDUwZDUxNi41aFIzZDQ1NVI0ZDQwNVI1ZDUwUjZkNjQyLjVSN2QxNDQuNVI4ZDU5Mi41UjlkNDNSMTBkMjA5UjExaTYwUjEyZDUwUjEzZDQ1NVIxNGFpMWkyaTJpMmkyaTJpMmkyaGc6MTcyb1IxZDg1OFIyYWQzMTguNWQ3MjMuNWQ1MGQ3MjMuNWQ1MGQ2MDYuNWQ0MDVkNjA2LjVkNDA1LjVkODcxZDMxOC41ZDg3MWQzMTguNWQ3MjMuNWhSM2Q0NTUuNVI0ZDQwNS41UjVkNTBSNmQ0MTcuNVI3ZDE1M1I4ZDM2Ny41UjlkNDNSMTBkMjA5UjExaTE3MlIxMmQ1MFIxM2Q0NTUuNVIxNGFpMWkyaTJpMmkyaTJpMmhnOjU5b1IxZDg1OFIyYWQxODhkNTU4LjVkMTg4ZDY4Ny41ZDUwZDY4Ny41ZDUwZDU1OC41ZDE4OGQ1NTguNWQxMTEuNWQxMDI0ZDUwZDEwMjRkNTBkODk1ZDE4OGQ4OTVkMTg4ZDEwMjRkMTMyZDExNDRkNTRkMTE0NGQxMTEuNWQxMDI0aFIzZDIzOFI0ZDE4OFI1ZDUwUjZkNDY1LjVSN2QtMTIwUjhkNDE1LjVSOWQ0M1IxMGQyMDlSMTFpNTlSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaGc6MTcxb1IxZDg1OFIyYWQxNzQuNWQ3MDZkMTE2ZDYzOS41ZDE3My41ZDU3OS41ZDE3My41ZDQ0N2Q1MGQ1NTguNWQ1MGQ3MDguNWQxNzQuNWQ4MTcuNWQxNzQuNWQ3MDZkMzQ2ZDcwNmQyODcuNWQ2MzkuNWQzNDVkNTc5LjVkMzQ1ZDQ0N2QyMjEuNWQ1NTguNWQyMjEuNWQ3MDguNWQzNDZkODE3LjVkMzQ2ZDcwNmhSM2QzOTZSNGQzNDZSNWQ1MFI2ZDU3N1I3ZDIwNi41UjhkNTI3UjlkNDNSMTBkMjA5UjExaTE3MVIxMmQ1MFIxM2QzOTZSMTRhaTFpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJoZzo1OG9SMWQ4NThSMmFkMTg4ZDU1OC41ZDE4OGQ2ODcuNWQ1MGQ2ODcuNWQ1MGQ1NTguNWQxODhkNTU4LjVkMTg4ZDg5NWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDg5NWQxODhkODk1aFIzZDIzOFI0ZDE4OFI1ZDUwUjZkNDY1LjVSN2QwUjhkNDE1LjVSOWQ0M1IxMGQyMDlSMTFpNThSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTcwb1IxZDg1OFIyYWQyMzJkNTE0LjVkMTE5ZDUxNC41ZDExOWQ2NjVkNTBkNjY1ZDUwZDMwNmQyOTYuNWQzMDZkMjk2LjVkNjY1ZDIzMmQ2NjVkMjMyZDUxNC41ZDExOWQzNjcuNWQxMTlkNDU2ZDIzMmQ0NTZkMjMyZDM2Ny41ZDExOWQzNjcuNWhSM2QzNDYuNVI0ZDI5Ni41UjVkNTBSNmQ3MThSN2QzNTlSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTcwUjEyZDUwUjEzZDM0Ni41UjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzo1N29SMWQ4NThSMmFkNDEzLjVkOTAxZDQxMy41ZDcyMy41ZDUwZDcyMy41ZDUwZDMwNmQ1NDNkMzA2ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkOTAxZDQxMy41ZDkwMWQxODhkNDI5ZDE4OGQ2MDYuNWQ0MTMuNWQ2MDYuNWQ0MTMuNWQ0MjlkMTg4ZDQyOWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNTdSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNjlvUjFkODU4UjJhZDQyMi41ZDI3Ni41ZDUxNi41ZDI3Ni41ZDYwNS43NWQzMjQuNWQ2OTVkMzcyLjVkNzQ1ZDQ2MS43NWQ3OTVkNTUxZDc5NWQ2NDhkNzk1ZDc0NWQ3NDUuNzVkODM0ZDY5Ni41ZDkyM2Q2MDcuNzVkOTcxLjc1ZDUxOWQxMDIwLjVkNDIyLjVkMTAyMC41ZDMyNS41ZDEwMjAuNWQyMzcuMjVkOTcxLjc1ZDE0OWQ5MjNkOTkuNWQ4MzRkNTBkNzQ1ZDUwZDY0OGQ1MGQ1NTFkMTAwLjI1ZDQ2MS43NWQxNTAuNWQzNzIuNWQyMzkuNzVkMzI0LjVkMzI5ZDI3Ni41ZDQyMi41ZDI3Ni41ZDQyMi41ZDMwOC41ZDMzN2QzMDguNWQyNTUuNzVkMzUyLjVkMTc0LjVkMzk2LjVkMTI4LjVkNDc4ZDgyLjVkNTU5LjVkODIuNWQ2NDhkODIuNWQ3MzYuNWQxMjcuNWQ4MTcuMjVkMTcyLjVkODk4ZDI1My41ZDk0My4yNWQzMzQuNWQ5ODguNWQ0MjIuNWQ5ODguNWQ1MTAuNWQ5ODguNWQ1OTEuNWQ5NDMuMjVkNjcyLjVkODk4ZDcxNy43NWQ4MTcuMjVkNzYzZDczNi41ZDc2M2Q2NDhkNzYzZDU1OS41ZDcxN2Q0NzhkNjcxZDM5Ni41ZDU4OS43NWQzNTIuNWQ1MDguNWQzMDguNWQ0MjIuNWQzMDguNWQ2MDYuNWQ0MDlkNjE3LjVkNTU2ZDU5N2Q1NTZkNTc3LjVkNDkzLjVkNTM2Ljc1ZDQ2Mi43NWQ0OTZkNDMyZDQzOGQ0MzJkMzk0LjVkNDMyZDM2MWQ0NTBkMzI3LjVkNDY4ZDMwNmQ0OTcuNWQyOTBkNTIwLjVkMjc5LjVkNTU4ZDI2OWQ1OTUuNWQyNjlkNjM2ZDI2OWQ3NDcuNWQzMTdkODAwLjI1ZDM2NWQ4NTNkNDQzZDg1M2Q1NDVkODUzZDYwNi41ZDc2OGQ2MjZkNzc4ZDU1M2Q4ODQuNWQ0MjUuNWQ4ODQuNWQzMjBkODg0LjVkMjUxZDgxNi41ZDE4MmQ3NDguNWQxODJkNjUxLjVkMTgyZDU1MWQyNTUuNWQ0ODBkMzI5ZDQwOWQ0NDNkNDA5ZDQ2OGQ0MDlkNDgzLjVkNDEyZDQ5OWQ0MTVkNTQxZDQyOC41ZDU1My41ZDQzM2Q1NTkuNWQ0MzNkNTY4ZDQzM2Q1NzRkNDI4LjI1ZDU4MGQ0MjMuNWQ1ODZkNDA5ZDYwNi41ZDQwOWhSM2Q4NDVSNGQ3OTVSNWQ1MFI2ZDc0Ny41UjdkMy41UjhkNjk3LjVSOWQ0M1IxMGQyMDlSMTFpMTY5UjEyZDUwUjEzZDg0NVIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpMmkyaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaGc6NTZvUjFkODU4UjJhZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQxODhkNzIzLjVkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNzIzLjVkMTg4ZDcyMy41ZDE4OGQ0MjlkMTg4ZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQxODhkNDI5aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk1NlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTY4b1IxZDg1OFIyYWQxODhkMTcxZDE4OGQzMDBkNTBkMzAwZDUwZDE3MWQxODhkMTcxZDM5Mi41ZDE3MC41ZDM5Mi41ZDI5OS41ZDI1NC41ZDI5OS41ZDI1NC41ZDE3MC41ZDM5Mi41ZDE3MC41aFIzZDQ0Mi41UjRkMzkyLjVSNWQ1MFI2ZDg1My41UjdkNzI0UjhkODAzLjVSOWQ0M1IxMGQyMDlSMTFpMTY4UjEyZDUwUjEzZDQ0Mi41UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NTVvUjFkODU4UjJhZDQxMy41ZDQyOWQ1MGQ0MjlkNTBkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNDEzLjVkMTAyNGQ0MTMuNWQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTU1UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmhnOjE2N29SMWQ4NThSMmFkNTAuNWQxNzMuNWQ1NDMuNWQxNzMuNWQ1NDMuNWQyOTYuNWQxODguNWQyOTYuNWQxODguNWQ0NjhkNTQzZDQ2OGQ1NDNkMTE4NmQ1MGQxMTg2ZDUwZDEwNjNkNDEzLjVkMTA2M2Q0MTMuNWQ4OTEuNWQ1MC41ZDg5MS41ZDUwLjVkMTczLjVkMTg4ZDU5MWQxODhkNzY4LjVkNDE0ZDc2OC41ZDQxNGQ1OTFkMTg4ZDU5MWhSM2Q1OTMuNVI0ZDU0My41UjVkNTBSNmQ4NTAuNVI3ZC0xNjJSOGQ4MDAuNVI5ZDQzUjEwZDIwOVIxMWkxNjdSMTJkNTBSMTNkNTkzLjVSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6NTRvUjFkODU4UjJhZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQxODhkNzIzLjVkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNzIzLjVkMTg4ZDcyMy41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk1NFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjE2Nm9SMWQ4NThSMmFkMTIyLjVkNjkwLjVkMTIyLjVkMTEwMmQ1MGQxMTAyZDUwZDY5MC41ZDEyMi41ZDY5MC41ZDUwZDU5Ny41ZDUwZDE5NC41ZDEyMi41ZDE5NC41ZDEyMi41ZDU5Ny41ZDUwZDU5Ny41aFIzZDE3Mi41UjRkMTIyLjVSNWQ1MFI2ZDgyOS41UjdkLTc4UjhkNzc5LjVSOWQ0M1IxMGQyMDlSMTFpMTY2UjEyZDUwUjEzZDE3Mi41UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NTNvUjFkODU4UjJhZDUwZDcyMy41ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQxODhkNjA2LjVkNTQzZDYwNi41ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ3MjMuNWQ1MGQ3MjMuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNTNSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTY1b1IxZDg1OFIyYWQyMTQuNWQ2NDUuNWQ1MGQzMDZkMTg4ZDMwNmQyOTkuNWQ1MzRkNDEzLjVkMzA2ZDU0M2QzMDZkMzcyZDY0NS41ZDQ0Ny41ZDY0NS41ZDQ0Ny41ZDc1Ni41ZDM2MmQ3NTYuNWQzNjJkODA4ZDQ0Ny41ZDgwOGQ0NDcuNWQ5MTlkMzYyZDkxOWQzNjJkMTAyNGQyMjRkMTAyNGQyMjRkOTE5ZDEzMmQ5MTlkMTMyZDgwOGQyMjRkODA4ZDIyNGQ3NTYuNWQxMzJkNzU2LjVkMTMyZDY0NS41ZDIxNC41ZDY0NS41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxNjVSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjUyb1IxZDg1OFIyYWQ1MGQ3MjMuNWQ1MGQzMDZkMTg4ZDMwNmQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNDEzLjVkMTAyNGQ0MTMuNWQ3MjMuNWQ1MGQ3MjMuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNTJSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNjRvUjFkODU4UjJhZDM2NS41ZDUzNmQ0MjIuNWQ0NzUuNWQ0NjcuNWQ1MjAuNWQ0MTBkNTgxLjVkNDQ1ZDYzMC41ZDQ0NWQ2OTQuNWQ0NDVkNzY2ZDQwMS41ZDgxOWQ0NDhkODgwZDQwMi41ZDkyNWQzNTRkODYxLjVkMzExZDg4OC41ZDI1Ny41ZDg4OC41ZDE5Ny41ZDg4OC41ZDE1MS41ZDg1NWQ5NWQ5MTVkNTBkODY5LjVkMTA2ZDgxMGQ2OS41ZDc2MGQ2OS41ZDY5NC41ZDY5LjVkNjE1LjVkMTIzLjVkNTU5ZDcyLjVkNDkyZDExNy41ZDQ0N2QxNzMuNWQ1MjAuNWQyMTEuNWQ1MDFkMjU3LjVkNTAxZDMxOC41ZDUwMWQzNjUuNWQ1MzZkMjU3LjVkNTczZDIxMC41ZDU3M2QxNzcuMjVkNjA3LjI1ZDE0NGQ2NDEuNWQxNDRkNjkwZDE0NGQ3MzhkMTc3LjI1ZDc3Mi4yNWQyMTAuNWQ4MDYuNWQyNTcuNWQ4MDYuNWQzMDRkODA2LjVkMzM3LjI1ZDc3Mi4yNWQzNzAuNWQ3MzhkMzcwLjVkNjkwZDM3MC41ZDY0MS41ZDMzNy4yNWQ2MDcuMjVkMzA0ZDU3M2QyNTcuNWQ1NzNoUjNkNTE3LjVSNGQ0NjcuNVI1ZDUwUjZkNTc3UjdkOTlSOGQ1MjdSOWQ0M1IxMGQyMDlSMTFpMTY0UjEyZDUwUjEzZDUxNy41UjE0YWkxaTJpMmkyaTNpM2kyaTJpMmkzaTNpMmkyaTJpM2kzaTJpMmkyaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2hnOjUxb1IxZDg1OFIyYWQ1MGQ0MjlkNTBkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQ5MDFkNDEzLjVkOTAxZDQxMy41ZDcyMy41ZDUwZDcyMy41ZDUwZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQ1MGQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTUxUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE2M29SMWQ4NThSMmFkNTQzZDMwNmQ1NDNkNTI4ZDQxMy41ZDUyOGQ0MTMuNWQ0MjlkMjY2LjVkNDI5ZDI2Ni41ZDYwNi41ZDM1NWQ2MDYuNWQzNTVkNzIzLjVkMjY2LjVkNzIzLjVkMjY2LjVkOTAxZDU0M2Q5MDFkNTQzZDEwMjRkNTBkMTAyNGQ1MGQ5MDFkMTI4LjVkOTAxZDEyOC41ZDcyMy41ZDUxLjVkNzIzLjVkNTEuNWQ2MDYuNWQxMjguNWQ2MDYuNWQxMjguNWQzMDZkNTQzZDMwNmhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTYzUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzo1MG9SMWQ4NThSMmFkNTQzZDkwMWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQ1MGQ0MjlkNTBkMzA2ZDU0M2QzMDZkNTQzZDcyMy41ZDE4OGQ3MjMuNWQxODhkOTAxZDU0M2Q5MDFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTUwUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE2Mm9SMWQ4NThSMmFkMTg4ZDU1OGQxODhkNzM1LjVkNTQzZDczNS41ZDU0M2Q4NTIuNWQzMzkuNWQ4NTIuNWQzMzkuNWQ5MzkuNWQyNTUuNWQ5MzkuNWQyNTUuNWQ4NTIuNWQ1MGQ4NTIuNWQ1MGQ0MzVkMjU1LjVkNDM1ZDI1NS41ZDM2MGQzMzkuNWQzNjBkMzM5LjVkNDM1ZDU0M2Q0MzVkNTQzZDU1OGQxODhkNTU4aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNjY0UjdkODQuNVI4ZDYxNFI5ZDQzUjEwZDIwOVIxMWkxNjJSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzo0OW9SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkMTAyNGhSM2QyMzhSNGQxODhSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNDlSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJoZzoxNjFvUjFkODU4UjJhZDE4OGQ1MDEuNWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDUwMS41ZDE4OGQ1MDEuNWQ1MGQ0MzVkNTBkMzA2ZDE4OGQzMDZkMTg4ZDQzNWQ1MGQ0MzVoUjNkMjM4UjRkMTg4UjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTE2MVIxMmQ1MFIxM2QyMzhSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0OG9SMWQ4NThSMmFkNTQzZDMwNmQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDQxMy41ZDQyOWQxODhkNDI5ZDE4OGQ5MDFkNDEzLjVkOTAxZDQxMy41ZDQyOWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNDhSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTYwb1IxZDg1OFIyYWhSM2QyNTRSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDQzUjEwZDIwOVIxMWkxNjBSMTJkMFIxM2QyNTRSMTRhaGc6NDdvUjFkODU4UjJhZDE4OGQxMDI0ZDUwZDEwMjRkMzAyLjVkMzA2ZDQ0MC41ZDMwNmQxODhkMTAyNGhSM2Q0OTAuNVI0ZDQ0MC41UjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTQ3UjEyZDUwUjEzZDQ5MC41UjE0YWkxaTJpMmkyaTJoZzoxNTlvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNTlSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjQ2b1IxZDg1OFIyYWQxODhkODk1ZDE4OGQxMDI0ZDUwZDEwMjRkNTBkODk1ZDE4OGQ4OTVoUjNkMjM4UjRkMTg4UjVkNTBSNmQxMjlSN2QwUjhkNzlSOWQ0M1IxMGQyMDlSMTFpNDZSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJoZzoxNThvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNThSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjQ1b1IxZDg1OFIyYWQ1MGQ2MDYuNWQzMTAuNWQ2MDYuNWQzMTAuNWQ3MjMuNWQ1MGQ3MjMuNWQ1MGQ2MDYuNWhSM2QzNjAuNVI0ZDMxMC41UjVkNTBSNmQ0MTcuNVI3ZDMwMC41UjhkMzY3LjVSOWQ0M1IxMGQyMDlSMTFpNDVSMTJkNTBSMTNkMzYwLjVSMTRhaTFpMmkyaTJpMmhnOjE1N29SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTE1N1IxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6NDRvUjFkODU4UjJhZDExMS41ZDEwMjRkNTBkMTAyNGQ1MGQ4OTVkMTg4ZDg5NWQxODhkMTAyNGQxMzJkMTE0NGQ1NGQxMTQ0ZDExMS41ZDEwMjRoUjNkMjM4UjRkMTg4UjVkNTBSNmQxMjlSN2QtMTIwUjhkNzlSOWQ0M1IxMGQyMDlSMTFpNDRSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJpMmkyaTJoZzoxNTZvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNTZSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjQzb1IxZDg1OFIyYWQyOTEuNWQ3MjMuNWQyOTEuNWQ4NTAuNWQxNzQuNWQ4NTAuNWQxNzQuNWQ3MjMuNWQ1MGQ3MjMuNWQ1MGQ2MDYuNWQxNzQuNWQ2MDYuNWQxNzQuNWQ0OTUuNWQyOTEuNWQ0OTUuNWQyOTEuNWQ2MDYuNWQ0MDVkNjA2LjVkNDA1ZDcyMy41ZDI5MS41ZDcyMy41aFIzZDQ1NVI0ZDQwNVI1ZDUwUjZkNTI4LjVSN2QxNzMuNVI4ZDQ3OC41UjlkNDNSMTBkMjA5UjExaTQzUjEyZDUwUjEzZDQ1NVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE1NW9SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTE1NVIxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6NDJvUjFkODU4UjJhZDEyNS41ZDMwNmQxMjUuNWQzNjZkNzcuNWQzNDVkNTBkMzg3ZDEwNy41ZDQxN2Q2NS41ZDQ2MmQxMDEuNWQ0OTJkMTQwLjVkNDQxZDE4Mi41ZDQ5NWQyMTUuNWQ0NjVkMTgyLjVkNDE0ZDIzOS41ZDM5MGQyMTguNWQzNDhkMTcwLjVkMzYzZDE3MC41ZDMwNmQxMjUuNWQzMDZoUjNkMjg5LjVSNGQyMzkuNVI1ZDUwUjZkNzE4UjdkNTI5UjhkNjY4UjlkNDNSMTBkMjA5UjExaTQyUjEyZDUwUjEzZDI4OS41UjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTU0b1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTU0UjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzo0MW9SMWQ4NThSMmFkNTBkOTAxZDEyN2Q5MDFkMTI3ZDQyOWQ1MGQ0MjlkNTBkMzA2ZDIwNC41ZDMwNmQyNTYuNWQzNjlkMjU2LjVkOTYxZDIwNWQxMDI0ZDUwZDEwMjRkNTBkOTAxaFIzZDMwNi41UjRkMjU2LjVSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNDFSMTJkNTBSMTNkMzA2LjVSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE1M29SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTE1M1IxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6NDBvUjFkODU4UjJhZDI1Ni41ZDEwMjRkMTAxLjVkMTAyNGQ1MGQ5NjFkNTBkMzY5ZDEwMmQzMDZkMjU2LjVkMzA2ZDI1Ni41ZDQyOWQxNzkuNWQ0MjlkMTc5LjVkOTAxZDI1Ni41ZDkwMWQyNTYuNWQxMDI0aFIzZDMwNi41UjRkMjU2LjVSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNDBSMTJkNTBSMTNkMzA2LjVSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE1Mm9SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTE1MlIxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6MzlvUjFkODU4UjJhZDE0OWQzMDZkMTQ5ZDUwN2Q1MGQ1MDdkNTBkMzA2ZDE0OWQzMDZoUjNkMTk5UjRkMTQ5UjVkNTBSNmQ3MThSN2Q1MTdSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMzlSMTJkNTBSMTNkMTk5UjE0YWkxaTJpMmkyaTJoZzoxNTFvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNTFSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjM4b1IxZDg1OFIyYWQxODhkNzIzLjVkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNzIzLjVkMTg4ZDcyMy41ZDQxMy41ZDYwNi41ZDQxMy41ZDQ3NGQ1NDNkNDc0ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDU0M2QzMDZkNTQzZDQyOWQxODhkNDI5ZDE4OGQ2MDYuNWQ0MTMuNWQ2MDYuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMzhSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTUwb1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTUwUjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzozN29SMWQ4NThSMmFkMjk2LjVkMzA2ZDI5Ni41ZDY2NWQ1MGQ2NjVkNTBkMzA2ZDI5Ni41ZDMwNmQyMzJkMzY3LjVkMTE5ZDM2Ny41ZDExOWQ2MDMuNWQyMzJkNjAzLjVkMjMyZDM2Ny41ZDczMmQ2NjNkNzMyZDEwMjJkNDg1LjVkMTAyMmQ0ODUuNWQ2NjNkNzMyZDY2M2Q2NjcuNWQ3MjQuNWQ1NTQuNWQ3MjQuNWQ1NTQuNWQ5NjAuNWQ2NjcuNWQ5NjAuNWQ2NjcuNWQ3MjQuNWhSM2Q3ODJSNGQ3MzJSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMzdSMTJkNTBSMTNkNzgyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNDlvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNDlSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjM2b1IxZDg1OFIyYWQ0MTMuNWQ5MDFkNDEzLjVkNzIzLjVkNTBkNzIzLjVkNTBkMzA2ZDI1NS41ZDMwNmQyNTUuNWQyMzFkMzM5LjVkMjMxZDMzOS41ZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQxODhkNjA2LjVkNTQzZDYwNi41ZDU0M2QxMDI0ZDMzOS41ZDEwMjRkMzM5LjVkMTEwOGQyNTUuNWQxMTA4ZDI1NS41ZDEwMjRkNTBkMTAyNGQ1MGQ5MDFkNDEzLjVkOTAxaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzkzUjdkLTg0UjhkNzQzUjlkNDNSMTBkMjA5UjExaTM2UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNDhvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNDhSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjM1b1IxZDg1OFIyYWQzNDEuNWQ4MzVkMjUxLjVkODM1ZDI1MS41ZDEwMjRkMTEzLjVkMTAyNGQxMTMuNWQ4MzVkNTBkODM1ZDUwZDcxOGQxMTMuNWQ3MThkMTEzLjVkNjAzLjVkNTBkNjAzLjVkNTBkNDg2LjVkMTEzLjVkNDg2LjVkMTEzLjVkMzA2ZDI1MS41ZDMwNmQyNTEuNWQ0ODYuNWQzNDEuNWQ0ODYuNWQzNDEuNWQzMDZkNDc5LjVkMzA2ZDQ3OS41ZDQ4Ni41ZDU0M2Q0ODYuNWQ1NDNkNjAzLjVkNDc5LjVkNjAzLjVkNDc5LjVkNzE4ZDU0M2Q3MThkNTQzZDgzNWQ0NzkuNWQ4MzVkNDc5LjVkMTAyNGQzNDEuNWQxMDI0ZDM0MS41ZDgzNWQyNTEuNWQ3MThkMzQxLjVkNzE4ZDM0MS41ZDYwMy41ZDI1MS41ZDYwMy41ZDI1MS41ZDcxOGhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMzVSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTQ3b1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTQ3UjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzozNG9SMWQ4NThSMmFkMTQ5ZDMwNmQxNDlkNTA3ZDUwZDUwN2Q1MGQzMDZkMTQ5ZDMwNmQyOTlkMzA2ZDI5OWQ1MDdkMjAwZDUwN2QyMDBkMzA2ZDI5OWQzMDZoUjNkMzQ5UjRkMjk5UjVkNTBSNmQ3MThSN2Q1MTdSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMzRSMTJkNTBSMTNkMzQ5UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTQ2b1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTQ2UjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzozM29SMWQ4NThSMmFkNTBkODI4LjVkNTBkMzA2ZDE4OGQzMDZkMTg4ZDgyOC41ZDUwZDgyOC41ZDE4OGQ4OTVkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQ4OTVkMTg4ZDg5NWhSM2QyMzhSNGQxODhSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMzNSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTQ1b1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTQ1UjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzozMm9SMWQ4NThSMmFoUjNkMjU0UjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQ0M1IxMGQyMDlSMTFpMzJSMTJkMFIxM2QyNTRSMTRhaGc6MTQ0b1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTQ0UjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzoxNDNvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNDNSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI1NW9SMWQ4NThSMmFkMzYyZDY2NWQzNjJkMTAyNGQyMjRkMTAyNGQyMjRkNjY1ZDUwZDMwNmQxODhkMzA2ZDI5OS41ZDUzNGQ0MTMuNWQzMDZkNTQzZDMwNmQzNjJkNjY1ZDI2MGQxNzFkMjYwZDMwMGQxMjJkMzAwZDEyMmQxNzFkMjYwZDE3MWQ0NjQuNWQxNzAuNWQ0NjQuNWQyOTkuNWQzMjYuNWQyOTkuNWQzMjYuNWQxNzAuNWQ0NjQuNWQxNzAuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1My41UjdkMFI4ZDgwMy41UjlkNDNSMTBkMjA5UjExaTI1NVIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE0Mm9SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTE0MlIxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6MjU0b1IxZDg1OFIyYWQxODhkNDQ3ZDU0M2Q0NDdkNTQzZDg2NC41ZDE4OGQ4NjQuNWQxODhkOTAxZDE4OS41ZDkwMWQxODkuNWQxMDI0ZDUwZDEwMjRkNTBkMzA2ZDE4OGQzMDZkMTg4ZDQ0N2QxODhkNzQ3LjVkNDEzLjVkNzQ3LjVkNDEzLjVkNTcwZDE4OGQ1NzBkMTg4ZDc0Ny41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkyNTRSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTQxb1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTQxUjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzoyNTNvUjFkODU4UjJhaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQxLjVSN2QwUjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMjUzUjEyZDUwUjEzZDU5M1IxNGFoZzoxNDBvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNDBSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI1Mm9SMWQ4NThSMmFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NTMuNVI3ZDBSOGQ4MDMuNVI5ZDQzUjEwZDIwOVIxMWkyNTJSMTJkNTBSMTNkNTkzUjE0YWhnOjEzOW9SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTEzOVIxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6MjUxb1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MlI3ZDBSOGQ3OTJSOWQ0M1IxMGQyMDlSMTFpMjUxUjEyZDUwUjEzZDU5M1IxNGFoZzoxMzhvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxMzhSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI1MG9SMWQ4NThSMmFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NDEuNVI3ZDBSOGQ3OTEuNVI5ZDQzUjEwZDIwOVIxMWkyNTBSMTJkNTBSMTNkNTkzUjE0YWhnOjEzN29SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTEzN1IxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6MjQ5b1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTI0OVIxMmQ1MFIxM2Q1OTNSMTRhaGc6MTM2b1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTM2UjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzoyNDhvUjFkODU4UjJhZDI5MWQ5MDFkNDQ5LjVkOTAxZDQ0OS41ZDU2NC41ZDI5MWQ5MDFkMjI0ZDc1MGQzNzVkNDI5ZDIyNGQ0MjlkMjI0ZDc1MGQ1NzFkMzA2ZDU3OWQzMDZkNTc5ZDEwMjRkMjMzZDEwMjRkMTg4ZDExMjBkNTBkMTEyMGQ5NWQxMDI0ZDg2ZDEwMjRkODZkMzA2ZDQzM2QzMDZkNDc0ZDIxOWQ2MTJkMjE5ZDU3MWQzMDZoUjNkNjYyUjRkNjEyUjVkNTBSNmQ4MDVSN2QtOTZSOGQ3NTVSOWQ0M1IxMGQyMDlSMTFpMjQ4UjEyZDUwUjEzZDY2MlIxNGFpMWkyaTJpMmkxaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxMzVvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxMzVSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI0N29SMWQ4NThSMmFkNTBkNjA2LjVkNDA1ZDYwNi41ZDQwNWQ3MjMuNWQ1MGQ3MjMuNWQ1MGQ2MDYuNWQyOTkuNWQ0MzVkMjk5LjVkNTY0ZDE2MS41ZDU2NGQxNjEuNWQ0MzVkMjk5LjVkNDM1ZDI5OS41ZDc3MS41ZDI5OS41ZDkwMC41ZDE2MS41ZDkwMC41ZDE2MS41ZDc3MS41ZDI5OS41ZDc3MS41aFIzZDQ1NVI0ZDQwNVI1ZDUwUjZkNTg5UjdkMTIzLjVSOGQ1MzlSOWQ0M1IxMGQyMDlSMTFpMjQ3UjEyZDUwUjEzZDQ1NVIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMzRvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxMzRSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI0Nm9SMWQ4NThSMmFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NTMuNVI3ZDBSOGQ4MDMuNVI5ZDQzUjEwZDIwOVIxMWkyNDZSMTJkNTBSMTNkNTkzUjE0YWhnOjEzM29SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTEzM1IxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6MjQ1b1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1OVI3ZDBSOGQ4MDlSOWQ0M1IxMGQyMDlSMTFpMjQ1UjEyZDUwUjEzZDU5M1IxNGFoZzoxMzJvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxMzJSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI0NG9SMWQ4NThSMmFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NDJSN2QwUjhkNzkyUjlkNDNSMTBkMjA5UjExaTI0NFIxMmQ1MFIxM2Q1OTNSMTRhaGc6MTMxb1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTMxUjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzoyNDNvUjFkODU4UjJhaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQxLjVSN2QwUjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMjQzUjEyZDUwUjEzZDU5M1IxNGFoZzoxMzBvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxMzBSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI0Mm9SMWQ4NThSMmFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NDEuNVI3ZDBSOGQ3OTEuNVI5ZDQzUjEwZDIwOVIxMWkyNDJSMTJkNTBSMTNkNTkzUjE0YWhnOjEyOW9SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTEyOVIxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6MjQxb1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1OVI3ZDBSOGQ4MDlSOWQ0M1IxMGQyMDlSMTFpMjQxUjEyZDUwUjEzZDU5M1IxNGFoZzoxMjhvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxMjhSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI0MG9SMWQ4NThSMmFkMjU0ZDcyMy41ZDI1NGQ5MDFkNDc5LjVkOTAxZDQ3OS41ZDQyOWQyNTRkNDI5ZDI1NGQ2MDYuNWQzMTkuNWQ2MDYuNWQzMTkuNWQ3MjMuNWQyNTRkNzIzLjVkMTE2ZDYwNi41ZDExNmQzMDZkNTU3ZDMwNmQ2MDlkMzY5ZDYwOWQ5NjFkNTU3LjVkMTAyNGQxMTZkMTAyNGQxMTZkNzIzLjVkNTBkNzIzLjVkNTBkNjA2LjVkMTE2ZDYwNi41aFIzZDY1OVI0ZDYwOVI1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkyNDBSMTJkNTBSMTNkNjU5UjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxMjdvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxMjdSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjIzOW9SMWQ4NThSMmFoUjNkNDQyLjVSNGQzOTIuNVI1ZDUwUjZkODUzLjVSN2QwUjhkODAzLjVSOWQ0M1IxMGQyMDlSMTFpMjM5UjEyZDUwUjEzZDQ0Mi41UjE0YWhnOjEyNm9SMWQ4NThSMmFkNTBkNjI1ZDkxZDcwMGQxNDIuNWQ2NDJkMjIxLjI1ZDY4OS43NWQzMDBkNzM3LjVkMzkyLjVkNjMxLjVkMzQ0LjVkNTczLjVkMjc2ZDYzNWQyMTZkNTkyZDE1NmQ1NDlkNTBkNjI1aFIzZDQ0Mi41UjRkMzkyLjVSNWQ1MFI2ZDQ3NVI3ZDI4Ni41UjhkNDI1UjlkNDNSMTBkMjA5UjExaTEyNlIxMmQ1MFIxM2Q0NDIuNVIxNGFpMWkyaTNpM2kyaTNpM2hnOjIzOG9SMWQ4NThSMmFoUjNkMzEwLjVSNGQyNjAuNVI1ZDUwUjZkODQyUjdkMFI4ZDc5MlI5ZDQzUjEwZDIwOVIxMWkyMzhSMTJkNTBSMTNkMzEwLjVSMTRhaGc6MTI1b1IxZDg1OFIyYWQzMTIuNWQ2NjYuNWQyNTYuNWQ3MDdkMjU2LjVkOTYxZDIwNWQxMDI0ZDUwZDEwMjRkNTBkOTAxZDEyN2Q5MDFkMTI3ZDcwMmQxNjAuNWQ2NjRkMTI3ZDYxN2QxMjdkNDI5ZDUwZDQyOWQ1MGQzMDZkMjA0LjVkMzA2ZDI1Ni41ZDM2OWQyNTYuNWQ2MTQuNWQzMTIuNWQ2NjYuNWhSM2QzNjIuNVI0ZDMxMi41UjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTEyNVIxMmQ1MFIxM2QzNjIuNVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjM3b1IxZDg1OFIyYWhSM2QyNDEuNVI0ZDE5MS41UjVkNTBSNmQ4NDEuNVI3ZDBSOGQ3OTEuNVI5ZDQzUjEwZDIwOVIxMWkyMzdSMTJkNTBSMTNkMjQxLjVSMTRhaGc6MTI0b1IxZDg1OFIyYWQxMjJkMTk0LjVkMTIyZDExMDJkNTBkMTEwMmQ1MGQxOTQuNWQxMjJkMTk0LjVoUjNkMTcyUjRkMTIyUjVkNTBSNmQ4MjkuNVI3ZC03OFI4ZDc3OS41UjlkNDNSMTBkMjA5UjExaTEyNFIxMmQ1MFIxM2QxNzJSMTRhaTFpMmkyaTJpMmhnOjIzNm9SMWQ4NThSMmFoUjNkMjM4UjRkMTg4UjVkNTBSNmQ4NDEuNVI3ZDBSOGQ3OTEuNVI5ZDQzUjEwZDIwOVIxMWkyMzZSMTJkNTBSMTNkMjM4UjE0YWhnOjEyM29SMWQ4NThSMmFkMTA2ZDYxNC41ZDEwNmQzNjlkMTU4ZDMwNmQzMTIuNWQzMDZkMzEyLjVkNDI5ZDIzNS41ZDQyOWQyMzUuNWQ2MTdkMjAyZDY2NGQyMzUuNWQ3MDJkMjM1LjVkOTAxZDMxMi41ZDkwMWQzMTIuNWQxMDI0ZDE1Ny41ZDEwMjRkMTA2ZDk2MWQxMDZkNzA3ZDUwZDY2Ni41ZDEwNmQ2MTQuNWhSM2QzNjIuNVI0ZDMxMi41UjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTEyM1IxMmQ1MFIxM2QzNjIuNVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjM1b1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1My41UjdkMFI4ZDgwMy41UjlkNDNSMTBkMjA5UjExaTIzNVIxMmQ1MFIxM2Q1OTNSMTRhaGc6MTIyb1IxZDg1OFIyYWQzNzQuNWQ0MjlkNTBkNDI5ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMjI0LjVkOTAxZDU0M2Q5MDFkNTQzZDEwMjRkNTBkMTAyNGQ1MGQ5MDFkMzc0LjVkNDI5aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxMjJSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMzRvUjFkODU4UjJhaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQyUjdkMFI4ZDc5MlI5ZDQzUjEwZDIwOVIxMWkyMzRSMTJkNTBSMTNkNTkzUjE0YWhnOjEyMW9SMWQ4NThSMmFkMzYyZDY2NWQzNjJkMTAyNGQyMjRkMTAyNGQyMjRkNjY1ZDUwZDMwNmQxODhkMzA2ZDI5OS41ZDUzNGQ0MTMuNWQzMDZkNTQzZDMwNmQzNjJkNjY1aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxMjFSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjMzb1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTIzM1IxMmQ1MFIxM2Q1OTNSMTRhaGc6MTIwb1IxZDg1OFIyYWQyMzAuNWQ2NjVkMjI2ZDY2NWQ1MmQzMDZkMTkwZDMwNmQzMDEuNWQ1MzRkNDE1LjVkMzA2ZDU0NWQzMDZkMzY0LjVkNjY0LjVkMzY5ZDY2NC41ZDU0M2QxMDIzLjVkNDA1ZDEwMjMuNWQyOTMuNWQ3OTUuNWQxNzkuNWQxMDIzLjVkNTBkMTAyMy41ZDIzMC41ZDY2NWhSM2Q1OTVSNGQ1NDVSNWQ1MFI2ZDcxOFI3ZDAuNVI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxMjBSMTJkNTBSMTNkNTk1UjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIzMm9SMWQ4NThSMmFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NDEuNVI3ZDBSOGQ3OTEuNVI5ZDQzUjEwZDIwOVIxMWkyMzJSMTJkNTBSMTNkNTkzUjE0YWhnOjExOW9SMWQ4NThSMmFkNDAwZDY5NmQzNDEuNWQxMDI0ZDE3OGQxMDI0ZDUwZDMwNmQxOTFkMzA2ZDI1OWQ3ODZkMzMxLjVkMzA2ZDQ2OGQzMDZkNTQwLjVkNzg2ZDYwOC41ZDMwNmQ3NDkuNWQzMDZkNjIxLjVkMTAyNGQ0NThkMTAyNGQ0MDBkNjk2aFIzZDc5OS41UjRkNzQ5LjVSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTE5UjEyZDUwUjEzZDc5OS41UjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMzFvUjFkODU4UjJhaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkLTE1NlI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkyMzFSMTJkNTBSMTNkNTkzUjE0YWhnOjExOG9SMWQ4NThSMmFkNDEzLjVkMzA2ZDU0M2QzMDZkMzg2LjVkMTAyNGQyMTguNWQxMDI0ZDUwZDMwNmQxODhkMzA2ZDI5NmQ4NTguNWQ0MTMuNWQzMDZoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTExOFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmhnOjIzMG9SMWQ4NThSMmFkNDEwLjVkNzIzLjVkMTg4ZDcyMy41ZDE4OGQxMDI0ZDUwZDEwMjRkNTBkMzA2ZDkwMy41ZDMwNmQ5MDMuNWQ0MjlkNTQ4LjVkNDI5ZDU0OC41ZDYwNi41ZDkwMy41ZDYwNi41ZDkwMy41ZDcyMy41ZDU0OC41ZDcyMy41ZDU0OC41ZDkwMWQ5MDMuNWQ5MDFkOTAzLjVkMTAyNGQ0MTAuNWQxMDI0ZDQxMC41ZDcyMy41ZDQxMC41ZDYwNi41ZDQxMC41ZDQyOWQxODhkNDI5ZDE4OGQ2MDYuNWQ0MTAuNWQ2MDYuNWhSM2Q5NTMuNVI0ZDkwMy41UjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTIzMFIxMmQ1MFIxM2Q5NTMuNVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjExN29SMWQ4NThSMmFkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQzMDZoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTExN1IxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjI5b1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0Ny41UjdkMFI4ZDc5Ny41UjlkNDNSMTBkMjA5UjExaTIyOVIxMmQ1MFIxM2Q1OTNSMTRhaGc6MTE2b1IxZDg1OFIyYWQyMzYuNWQ0MjlkNTBkNDI5ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMzc0LjVkNDI5ZDM3NC41ZDEwMjRkMjM2LjVkMTAyNGQyMzYuNWQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTExNlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjI4b1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1My41UjdkMFI4ZDgwMy41UjlkNDNSMTBkMjA5UjExaTIyOFIxMmQ1MFIxM2Q1OTNSMTRhaGc6MTE1b1IxZDg1OFIyYWQ1MGQ3MjMuNWQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNzIzLjVkNTBkNzIzLjVoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTExNVIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMjdvUjFkODU4UjJhaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODU5UjdkMFI4ZDgwOVI5ZDQzUjEwZDIwOVIxMWkyMjdSMTJkNTBSMTNkNTkzUjE0YWhnOjExNG9SMWQ4NThSMmFkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjlkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkNzIzLjVkMzc0LjVkNzIzLjVkNTQzZDEwMjRkNDEzLjVkMTAyNGQyMzYuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkNTBkMTAyNGhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTE0UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIyNm9SMWQ4NThSMmFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NDJSN2QwUjhkNzkyUjlkNDNSMTBkMjA5UjExaTIyNlIxMmQ1MFIxM2Q1OTNSMTRhaGc6MTEzb1IxZDg1OFIyYWQ0MTMuNWQ4OTMuNWQ0MTMuNWQ0MjlkMTg4ZDQyOWQxODhkOTAxZDI5OC41ZDkwMWQyNTJkODEzLjVkMzczZDgxMy41ZDQxMy41ZDg5My41ZDM2NC41ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0NzkuNWQxMDI0ZDU0MGQxMTQ0ZDQyOC41ZDExNDRkMzY0LjVkMTAyNGhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZC0xMjBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTEzUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjI1b1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTIyNVIxMmQ1MFIxM2Q1OTNSMTRhaGc6MTEyb1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTExMlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjI0b1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTIyNFIxMmQ1MFIxM2Q1OTNSMTRhaGdoeTg6Zm9udE5hbWV5MTA6U3F1YXJlRm9udGc"},{ name : "LIME_font_DefaultFont", data : "b3k0Omhhc2hxOjExMW95Njphc2NlbnRkODU4eTQ6ZGF0YWFkNTQzZDMwNmQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDQxMy41ZDQyOWQxODhkNDI5ZDE4OGQ5MDFkNDEzLjVkOTAxZDQxMy41ZDQyOWh5Njpfd2lkdGhkNTkzeTQ6eE1heGQ1NDN5NDp4TWluZDUweTQ6eU1heGQ3MTh5NDp5TWluZDB5NzpfaGVpZ2h0ZDY2OHk3OmxlYWRpbmdkNDN5NzpkZXNjZW50ZDIwOXk4OmNoYXJDb2RlaTExMXkxNTpsZWZ0c2lkZUJlYXJpbmdkNTB5MTI6YWR2YW5jZVdpZHRoZDU5M3k4OmNvbW1hbmRzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjIzb1IxZDg1OFIyYWQ2NDNkNzIzLjVkNjQzZDMwNmQxMTM2ZDMwNmQxMTM2ZDQyOWQ3ODFkNDI5ZDc4MWQ2MDYuNWQxMTM2ZDYwNi41ZDExMzZkMTAyNGQ2NDNkMTAyNGQ2NDNkOTAxZDEwMDYuNWQ5MDFkMTAwNi41ZDcyMy41ZDY0M2Q3MjMuNWQ1MGQ3MjMuNWQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNzIzLjVkNTBkNzIzLjVoUjNkMTE4NlI0ZDExMzZSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMjIzUjEyZDUwUjEzZDExODZSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjExMG9SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQ0MTMuNWQ3MDguNWQ0MTMuNWQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0MTMuNWQxMDI0ZDE4OGQ2MDkuNWQxODhkMTAyNGhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTEwUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjIyb1IxZDg1OFIyYWQxODhkNDQ3ZDU0M2Q0NDdkNTQzZDg2NC41ZDE4OGQ4NjQuNWQxODhkOTAxZDE4OS41ZDkwMWQxODkuNWQxMDI0ZDUwZDEwMjRkNTBkMzA2ZDE4OGQzMDZkMTg4ZDQ0N2QxODhkNzQ3LjVkNDEzLjVkNzQ3LjVkNDEzLjVkNTcwZDE4OGQ1NzBkMTg4ZDc0Ny41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkyMjJSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTA5b1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDMyOGQ2OTkuNWQ0NzMuNWQzMDZkNjAzZDMwNmQ2MDNkMTAyNGQ0NzMuNWQxMDI0ZDQ3My41ZDcyMy41ZDM3M2QxMDI0ZDI5MmQxMDI0ZDE4OGQ3MjMuNWQxODhkMTAyNGhSM2Q2NTNSNGQ2MDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTA5UjEyZDUwUjEzZDY1M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjIxb1IxZDg1OFIyYWQzNjJkNjY1ZDM2MmQxMDI0ZDIyNGQxMDI0ZDIyNGQ2NjVkNTBkMzA2ZDE4OGQzMDZkMjk5LjVkNTM0ZDQxMy41ZDMwNmQ1NDNkMzA2ZDM2MmQ2NjVkMjkzLjVkMTgyLjVkMjQyLjVkMjg4ZDMxNy41ZDI4OGQzNjlkMTgyLjVkMjkzLjVkMTgyLjVoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NDEuNVI3ZDBSOGQ3OTEuNVI5ZDQzUjEwZDIwOVIxMWkyMjFSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjEwOG9SMWQ4NThSMmFkMTg4ZDkwMWQ1NDNkOTAxZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDE4OGQzMDZkMTg4ZDkwMWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTA4UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmhnOjIyMG9SMWQ4NThSMmFkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQzMDZkMjU3ZDE3MWQyNTdkMzAwZDExOWQzMDBkMTE5ZDE3MWQyNTdkMTcxZDQ2MS41ZDE3MC41ZDQ2MS41ZDI5OS41ZDMyMy41ZDI5OS41ZDMyMy41ZDE3MC41ZDQ2MS41ZDE3MC41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODUzLjVSN2QwUjhkODAzLjVSOWQ0M1IxMGQyMDlSMTFpMjIwUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEwN29SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkNjA2LjVkNDEzLjVkMzA2ZDU0M2QzMDZkMzAyLjVkNjU2ZDU0M2QxMDI0ZDQxMy41ZDEwMjRkMTg4ZDcyMy41ZDE4OGQxMDI0aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxMDdSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIxOW9SMWQ4NThSMmFkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQzMDZkMzI2LjVkMjg3LjVkNDAxLjVkMjg3LjVkMzUwLjVkMTgyZDI3NWQxODJkMjc1ZDE4Mi41ZDI0MmQxODIuNWQxOTFkMjg4ZDI2NmQyODhkMjk2LjVkMjI2ZDMyNi41ZDI4Ny41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQyUjdkMFI4ZDc5MlI5ZDQzUjEwZDIwOVIxMWkyMTlSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTA2b1IxZDg1OFIyYWQxODhkNzE0LjVkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQ3MTQuNWQxODhkNzE0LjVoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTEwNlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjE4b1IxZDg1OFIyYWQ0MTMuNWQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDE4OGQ5MDFkNDEzLjVkOTAxZDQxMy41ZDMwNmQyOTkuNWQxODIuNWQyNDguNWQyODhkMzIzLjVkMjg4ZDM3NWQxODIuNWQyOTkuNWQxODIuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTIxOFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjEwNW9SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkMTAyNGhSM2QyMzhSNGQxODhSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTA1UjEyZDUwUjEzZDIzOFIxNGFpMWkyaTJpMmkyaGc6MjE3b1IxZDg1OFIyYWQyMjQuNWQxODIuNWQyNzZkMjg4ZDM1MWQyODhkMzAwZDE4Mi41ZDIyNC41ZDE4Mi41ZDQxMy41ZDMwNmQ1NDNkMzA2ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDE4OGQzMDZkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkMzA2aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQxLjVSN2QwUjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMjE3UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaGc6MTA0b1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDE4OGQ2MDYuNWQ0MTMuNWQ2MDYuNWQ0MTMuNWQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0MTMuNWQxMDI0ZDQxMy41ZDcyMy41ZDE4OGQ3MjMuNWQxODhkMTAyNGhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTA0UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIxNm9SMWQ4NThSMmFkMjkxZDkwMWQ0NDkuNWQ5MDFkNDQ5LjVkNTY0LjVkMjkxZDkwMWQyMjRkNzUwZDM3NWQ0MjlkMjI0ZDQyOWQyMjRkNzUwZDU3MWQzMDZkNTc5ZDMwNmQ1NzlkMTAyNGQyMzNkMTAyNGQxODhkMTEyMGQ1MGQxMTIwZDk1ZDEwMjRkODZkMTAyNGQ4NmQzMDZkNDMzZDMwNmQ0NzRkMjE5ZDYxMmQyMTlkNTcxZDMwNmhSM2Q2NjJSNGQ2MTJSNWQ1MFI2ZDgwNVI3ZC05NlI4ZDc1NVI5ZDQzUjEwZDIwOVIxMWkyMTZSMTJkNTBSMTNkNjYyUjE0YWkxaTJpMmkyaTFpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjEwM29SMWQ4NThSMmFkMjcwLjVkNjA2LjVkNTQzZDYwNi41ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDU0M2QzMDZkNTQzZDQyOWQxODhkNDI5ZDE4OGQ5MDFkNDEzLjVkOTAxZDQxMy41ZDcyMy41ZDI3MC41ZDcyMy41ZDI3MC41ZDYwNi41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxMDNSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjE1b1IxZDg1OFIyYWQzMDMuNWQ2MDVkMzkzLjVkNjk1ZDMxMC41ZDc3OGQyMjFkNjg4ZDEzMi41ZDc3NmQ1MGQ2OTMuNWQxMzhkNjA1ZDU5LjVkNTI2LjVkMTQyLjVkNDQ0ZDIyMWQ1MjIuNWQzMDFkNDQyZDM4My41ZDUyNWQzMDMuNWQ2MDVoUjNkNDQzLjVSNGQzOTMuNVI1ZDUwUjZkNTgyUjdkMjQ2UjhkNTMyUjlkNDNSMTBkMjA5UjExaTIxNVIxMmQ1MFIxM2Q0NDMuNVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjEwMm9SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkNzIzLjVkMTg4ZDcyMy41ZDE4OGQxMDI0aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxMDJSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMTRvUjFkODU4UjJhZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ0MTMuNWQ0MjlkMTg4ZDQyOWQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ0MjlkMjYwZDE3MWQyNjBkMzAwZDEyMmQzMDBkMTIyZDE3MWQyNjBkMTcxZDQ2NC41ZDE3MC41ZDQ2NC41ZDI5OS41ZDMyNi41ZDI5OS41ZDMyNi41ZDE3MC41ZDQ2NC41ZDE3MC41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODUzLjVSN2QwUjhkODAzLjVSOWQ0M1IxMGQyMDlSMTFpMjE0UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTAxb1IxZDg1OFIyYWQxODhkNDI5ZDE4OGQ2MDYuNWQ1NDNkNjA2LjVkNTQzZDcyMy41ZDE4OGQ3MjMuNWQxODhkOTAxZDU0M2Q5MDFkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDE4OGQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTEwMVIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMTNvUjFkODU4UjJhZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ0MTMuNWQ0MjlkMTg4ZDQyOWQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ0MjlkMTUyZDIyOS41ZDE4NWQyOTNkMjI3ZDI0NGQyOTAuNzVkMjg0LjVkMzU0LjVkMzI1ZDQyOS41ZDIzNS41ZDM5MC41ZDE4NmQzMzUuNWQyMzhkMjg2Ljc1ZDIwMS41ZDIzOGQxNjVkMTUyZDIyOS41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODU5UjdkMFI4ZDgwOVI5ZDQzUjEwZDIwOVIxMWkyMTNSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkzaTNpMmkzaTNoZzoxMDBvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA2ZDQ5MWQzMDZkNTQzZDM2OWQ1NDNkOTYxZDQ5MS41ZDEwMjRkNTBkMTAyNGQ0MTMuNWQ0MjlkMTg4ZDQyOWQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTEwMFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjEyb1IxZDg1OFIyYWQ1NDNkMzA2ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDU0M2QzMDZkNDEzLjVkNDI5ZDE4OGQ0MjlkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNDI5ZDMyNi41ZDI4Ny41ZDQwMS41ZDI4Ny41ZDM1MC41ZDE4MmQyNzVkMTgyZDI3NWQxODIuNWQyNDJkMTgyLjVkMTkxZDI4OGQyNjZkMjg4ZDI5Ni41ZDIyNmQzMjYuNWQyODcuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MlI3ZDBSOGQ3OTJSOWQ0M1IxMGQyMDlSMTFpMjEyUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaGc6OTlvUjFkODU4UjJhZDE4OGQ5MDFkNTQzZDkwMWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQxODhkOTAxaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk5OVIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjExb1IxZDg1OFIyYWQ1NDNkMzA2ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDU0M2QzMDZkNDEzLjVkNDI5ZDE4OGQ0MjlkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNDI5ZDI5Ni41ZDE4Mi41ZDI0NS41ZDI4OGQzMjAuNWQyODhkMzcyZDE4Mi41ZDI5Ni41ZDE4Mi41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQxLjVSN2QwUjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMjExUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo5OG9SMWQ4NThSMmFkNTQzZDMwNmQ1NDNkNTc4ZDQ4Mi41ZDY2Ny41ZDU0M2Q3NTcuNWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDE4OGQ3MjMuNWQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTk4UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMTBvUjFkODU4UjJhZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ0MTMuNWQ0MjlkMTg4ZDQyOWQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ0MjlkMjA5LjVkMTgyLjVkMjYxZDI4OGQzMzZkMjg4ZDI4NWQxODIuNWQyMDkuNWQxODIuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTIxMFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTdvUjFkODU4UjJhZDQxMy41ZDcyMy41ZDE4OGQ3MjMuNWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2QxMDI0ZDQxMy41ZDEwMjRkNDEzLjVkNzIzLjVkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTk3UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjA5b1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDQxMy41ZDcwOC41ZDQxMy41ZDMwNmQ1NDNkMzA2ZDU0M2QxMDI0ZDQxMy41ZDEwMjRkMTg4ZDYwOS41ZDE4OGQxMDI0ZDE2N2QyMjkuNWQyMDBkMjkzZDI0MmQyNDRkMzA1Ljc1ZDI4NC41ZDM2OS41ZDMyNWQ0NDQuNWQyMzUuNWQ0MDUuNWQxODZkMzUwLjVkMjM4ZDMwMS43NWQyMDEuNWQyNTNkMTY1ZDE2N2QyMjkuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1OVI3ZDBSOGQ4MDlSOWQ0M1IxMGQyMDlSMTFpMjA5UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkzaTNpMmkzaTNoZzo5Nm9SMWQ4NThSMmFkNTBkMTgyLjVkMTAxLjVkMjg4ZDE3Ni41ZDI4OGQxMjUuNWQxODIuNWQ1MGQxODIuNWhSM2QyMjYuNVI0ZDE3Ni41UjVkNTBSNmQ4NDEuNVI3ZDczNlI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTk2UjEyZDUwUjEzZDIyNi41UjE0YWkxaTJpMmkyaTJoZzoyMDhvUjFkODU4UjJhZDI1NGQ3MjMuNWQyNTRkOTAxZDQ3OS41ZDkwMWQ0NzkuNWQ0MjlkMjU0ZDQyOWQyNTRkNjA2LjVkMzE5LjVkNjA2LjVkMzE5LjVkNzIzLjVkMjU0ZDcyMy41ZDExNmQ2MDYuNWQxMTZkMzA2ZDU1N2QzMDZkNjA5ZDM2OWQ2MDlkOTYxZDU1Ny41ZDEwMjRkMTE2ZDEwMjRkMTE2ZDcyMy41ZDUwZDcyMy41ZDUwZDYwNi41ZDExNmQ2MDYuNWhSM2Q2NTlSNGQ2MDlSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMjA4UjEyZDUwUjEzZDY1OVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6OTVvUjFkODU4UjJhZDUxMi41ZDEwMjFkNTEyLjVkMTA4NGQ1MGQxMDg0ZDUwZDEwMjFkNTEyLjVkMTAyMWhSM2Q1NjIuNVI0ZDUxMi41UjVkNTBSNmQzUjdkLTYwUjhkLTQ3UjlkNDNSMTBkMjA5UjExaTk1UjEyZDUwUjEzZDU2Mi41UjE0YWkxaTJpMmkyaTJoZzoyMDdvUjFkODU4UjJhZDI4N2QxMDI0ZDE0OWQxMDI0ZDE0OWQzMDZkMjg3ZDMwNmQyODdkMTAyNGQxODhkMTcxZDE4OGQzMDBkNTBkMzAwZDUwZDE3MWQxODhkMTcxZDM5Mi41ZDE3MC41ZDM5Mi41ZDI5OS41ZDI1NC41ZDI5OS41ZDI1NC41ZDE3MC41ZDM5Mi41ZDE3MC41aFIzZDQ0Mi41UjRkMzkyLjVSNWQ1MFI2ZDg1My41UjdkMFI4ZDgwMy41UjlkNDNSMTBkMjA5UjExaTIwN1IxMmQ1MFIxM2Q0NDIuNVIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo5NG9SMWQ4NThSMmFkNDEzZDMwNmQ1NDhkNjYxZDQzMWQ2NjFkMzE1LjVkMzk5LjVkMTY3ZDY2MWQ1MGQ2NjFkMjI0ZDMwNmQ0MTNkMzA2aFIzZDU5OFI0ZDU0OFI1ZDUwUjZkNzE4UjdkMzYzUjhkNjY4UjlkNDNSMTBkMjA5UjExaTk0UjEyZDUwUjEzZDU5OFIxNGFpMWkyaTJpMmkyaTJpMmkyaGc6MjA2b1IxZDg1OFIyYWQyMjFkMTAyNGQ4M2QxMDI0ZDgzZDMwNmQyMjFkMzA2ZDIyMWQxMDI0ZDE4NS41ZDI4Ny41ZDI2MC41ZDI4Ny41ZDIwOS41ZDE4MmQxMzRkMTgyZDEzNGQxODIuNWQxMDFkMTgyLjVkNTBkMjg4ZDEyNWQyODhkMTU1LjVkMjI2ZDE4NS41ZDI4Ny41aFIzZDMxMC41UjRkMjYwLjVSNWQ1MFI2ZDg0MlI3ZDBSOGQ3OTJSOWQ0M1IxMGQyMDlSMTFpMjA2UjEyZDUwUjEzZDMxMC41UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmhnOjkzb1IxZDg1OFIyYWQ1MGQ5MDFkMTI3ZDkwMWQxMjdkNDI5ZDUwZDQyOWQ1MGQzMDZkMjU1LjVkMzA2ZDI1NmQxMDI0ZDUwZDEwMjRkNTBkOTAxaFIzZDMwNlI0ZDI1NlI1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk5M1IxMmQ1MFIxM2QzMDZSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjA1b1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDE4OGQxMDI0ZDExNmQxODIuNWQ2NWQyODhkMTQwZDI4OGQxOTEuNWQxODIuNWQxMTZkMTgyLjVoUjNkMjQxLjVSNGQxOTEuNVI1ZDUwUjZkODQxLjVSN2QwUjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMjA1UjEyZDUwUjEzZDI0MS41UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTJvUjFkODU4UjJhZDUwZDMwNmQxODhkMzA2ZDQ0MC41ZDEwMjRkMzAyLjVkMTAyNGQ1MGQzMDZoUjNkNDkwLjVSNGQ0NDAuNVI1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk5MlIxMmQ1MFIxM2Q0OTAuNVIxNGFpMWkyaTJpMmkyaGc6MjA0b1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDE4OGQxMDI0ZDUwZDE4Mi41ZDEwMS41ZDI4OGQxNzYuNWQyODhkMTI1LjVkMTgyLjVkNTBkMTgyLjVoUjNkMjM4UjRkMTg4UjVkNTBSNmQ4NDEuNVI3ZDBSOGQ3OTEuNVI5ZDQzUjEwZDIwOVIxMWkyMDRSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTFvUjFkODU4UjJhZDI1NmQxMDI0ZDUwZDEwMjRkNTAuNWQzMDZkMjU2ZDMwNmQyNTZkNDI5ZDE3OWQ0MjlkMTc5ZDkwMWQyNTZkOTAxZDI1NmQxMDI0aFIzZDMwNlI0ZDI1NlI1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk5MVIxMmQ1MFIxM2QzMDZSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjAzb1IxZDg1OFIyYWQxODhkNDI5ZDE4OGQ2MDYuNWQ1NDNkNjA2LjVkNTQzZDcyMy41ZDE4OGQ3MjMuNWQxODhkOTAxZDU0M2Q5MDFkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDE4OGQ0MjlkMjY2ZDE3MWQyNjZkMzAwZDEyOGQzMDBkMTI4ZDE3MWQyNjZkMTcxZDQ3MC41ZDE3MC41ZDQ3MC41ZDI5OS41ZDMzMi41ZDI5OS41ZDMzMi41ZDE3MC41ZDQ3MC41ZDE3MC41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODUzLjVSN2QwUjhkODAzLjVSOWQ0M1IxMGQyMDlSMTFpMjAzUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTBvUjFkODU4UjJhZDM3NC41ZDQyOWQ1MGQ0MjlkNTBkMzA2ZDU0M2QzMDZkNTQzZDQyOWQyMjQuNWQ5MDFkNTQzZDkwMWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDkwMWQzNzQuNWQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTkwUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjAyb1IxZDg1OFIyYWQxODhkNDI5ZDE4OGQ2MDYuNWQ1NDNkNjA2LjVkNTQzZDcyMy41ZDE4OGQ3MjMuNWQxODhkOTAxZDU0M2Q5MDFkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDE4OGQ0MjlkMzI5LjVkMjg3LjVkNDA0LjVkMjg3LjVkMzUzLjVkMTgyZDI3OGQxODJkMjc4ZDE4Mi41ZDI0NWQxODIuNWQxOTRkMjg4ZDI2OWQyODhkMjk5LjVkMjI2ZDMyOS41ZDI4Ny41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQyUjdkMFI4ZDc5MlI5ZDQzUjEwZDIwOVIxMWkyMDJSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJoZzo4OW9SMWQ4NThSMmFkMzYyZDY2NWQzNjJkMTAyNGQyMjRkMTAyNGQyMjRkNjY1ZDUwZDMwNmQxODhkMzA2ZDI5OS41ZDUzNGQ0MTMuNWQzMDZkNTQzZDMwNmQzNjJkNjY1aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk4OVIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMDFvUjFkODU4UjJhZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkNzIzLjVkMTg4ZDcyMy41ZDE4OGQ5MDFkNTQzZDkwMWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQzMDIuNWQxODIuNWQyNTEuNWQyODhkMzI2LjVkMjg4ZDM3OGQxODIuNWQzMDIuNWQxODIuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTIwMVIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODhvUjFkODU4UjJhZDIzMC41ZDY2NWQyMjZkNjY1ZDUyZDMwNmQxOTBkMzA2ZDMwMS41ZDUzNGQ0MTUuNWQzMDZkNTQ1ZDMwNmQzNjQuNWQ2NjQuNWQzNjlkNjY0LjVkNTQzZDEwMjMuNWQ0MDVkMTAyMy41ZDI5My41ZDc5NS41ZDE3OS41ZDEwMjMuNWQ1MGQxMDIzLjVkMjMwLjVkNjY1aFIzZDU5NVI0ZDU0NVI1ZDUwUjZkNzE4UjdkMC41UjhkNjY4UjlkNDNSMTBkMjA5UjExaTg4UjEyZDUwUjEzZDU5NVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMDBvUjFkODU4UjJhZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkNzIzLjVkMTg4ZDcyMy41ZDE4OGQ5MDFkNTQzZDkwMWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQyMzMuNWQxODIuNWQyODVkMjg4ZDM2MGQyODhkMzA5ZDE4Mi41ZDIzMy41ZDE4Mi41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQxLjVSN2QwUjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMjAwUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzo4N29SMWQ4NThSMmFkNDAwZDY5NmQzNDEuNWQxMDI0ZDE3OGQxMDI0ZDUwZDMwNmQxOTFkMzA2ZDI1OWQ3ODZkMzMxLjVkMzA2ZDQ2OGQzMDZkNTQwLjVkNzg2ZDYwOC41ZDMwNmQ3NDkuNWQzMDZkNjIxLjVkMTAyNGQ0NThkMTAyNGQ0MDBkNjk2aFIzZDc5OS41UjRkNzQ5LjVSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpODdSMTJkNTBSMTNkNzk5LjVSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE5OW9SMWQ4NThSMmFkMTg4ZDkwMWQ1NDNkOTAxZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDU0M2QzMDZkNTQzZDQyOWQxODhkNDI5ZDE4OGQ5MDFkMjM5LjVkMTEzNWQyMzkuNWQxMTgwZDI3OWQxMTgwZDMwNmQxMTcyLjVkMzMzZDExNjVkMzQwLjVkMTEzMC41ZDM0OGQxMDk2ZDMwMGQxMDYwZDMzNmQxMDI0ZDI5MWQxMDI0ZDI1NC41ZDEwNjNkMjU0LjVkMTA5NmQyOTFkMTA5NmQyOTFkMTEwOGQyOTFkMTEyMGQyODVkMTEzMmQyNzlkMTE0NGQyMzkuNWQxMTM1aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkLTE1NlI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxOTlSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpM2kzaTNpMmkyaTJpMmkzaTNpM2hnOjg2b1IxZDg1OFIyYWQ0MTMuNWQzMDZkNTQzZDMwNmQzODYuNWQxMDI0ZDIxOC41ZDEwMjRkNTBkMzA2ZDE4OGQzMDZkMjk2ZDg1OC41ZDQxMy41ZDMwNmhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpODZSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJoZzoxOThvUjFkODU4UjJhZDQxMC41ZDcyMy41ZDE4OGQ3MjMuNWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ5MDMuNWQzMDZkOTAzLjVkNDI5ZDU0OC41ZDQyOWQ1NDguNWQ2MDYuNWQ5MDMuNWQ2MDYuNWQ5MDMuNWQ3MjMuNWQ1NDguNWQ3MjMuNWQ1NDguNWQ5MDFkOTAzLjVkOTAxZDkwMy41ZDEwMjRkNDEwLjVkMTAyNGQ0MTAuNWQ3MjMuNWQ0MTAuNWQ2MDYuNWQ0MTAuNWQ0MjlkMTg4ZDQyOWQxODhkNjA2LjVkNDEwLjVkNjA2LjVoUjNkOTUzLjVSNGQ5MDMuNVI1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxOThSMTJkNTBSMTNkOTUzLjVSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzo4NW9SMWQ4NThSMmFkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQzMDZoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTg1UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJoZzoxOTdvUjFkODU4UjJhZDQxMy41ZDcyMy41ZDE4OGQ3MjMuNWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2QxMDI0ZDQxMy41ZDEwMjRkNDEzLjVkNzIzLjVkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjlkMzI2LjVkMTk0Ljc1ZDM0NC41ZDIxM2QzNDQuNWQyMzguNWQzNDQuNWQyNjRkMzI2LjVkMjgyZDMwOC41ZDMwMGQyODNkMzAwZDI1Ny41ZDMwMGQyMzkuNWQyODJkMjIxLjVkMjY0ZDIyMS41ZDIzOC41ZDIyMS41ZDIxM2QyMzkuNWQxOTQuNzVkMjU3LjVkMTc2LjVkMjgzZDE3Ni41ZDMwOC41ZDE3Ni41ZDMyNi41ZDE5NC43NWQyODNkMjA5LjVkMjcxLjVkMjA5LjVkMjYzZDIxOGQyNTQuNWQyMjYuNWQyNTQuNWQyMzguNWQyNTQuNWQyNTBkMjYzZDI1OC41ZDI3MS41ZDI2N2QyODNkMjY3ZDI5NWQyNjdkMzAzLjI1ZDI1OC41ZDMxMS41ZDI1MGQzMTEuNWQyMzguNWQzMTEuNWQyMjYuNWQzMDMuMjVkMjE4ZDI5NWQyMDkuNWQyODNkMjA5LjVoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NDcuNVI3ZDBSOGQ3OTcuNVI5ZDQzUjEwZDIwOVIxMWkxOTdSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNoZzo4NG9SMWQ4NThSMmFkMjM2LjVkNDI5ZDUwZDQyOWQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDM3NC41ZDQyOWQzNzQuNWQxMDI0ZDIzNi41ZDEwMjRkMjM2LjVkNDI5aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk4NFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MTk2b1IxZDg1OFIyYWQ0MTMuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0MTMuNWQxMDI0ZDQxMy41ZDcyMy41ZDE4OGQ0MjlkMTg4ZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQxODhkNDI5ZDI2OWQxNzFkMjY5ZDMwMGQxMzFkMzAwZDEzMWQxNzFkMjY5ZDE3MWQ0NzMuNWQxNzAuNWQ0NzMuNWQyOTkuNWQzMzUuNWQyOTkuNWQzMzUuNWQxNzAuNWQ0NzMuNWQxNzAuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1My41UjdkMFI4ZDgwMy41UjlkNDNSMTBkMjA5UjExaTE5NlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODNvUjFkODU4UjJhZDUwZDcyMy41ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQxODhkNjA2LjVkNTQzZDYwNi41ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ3MjMuNWQ1MGQ3MjMuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpODNSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTk1b1IxZDg1OFIyYWQ0MTMuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0MTMuNWQxMDI0ZDQxMy41ZDcyMy41ZDE4OGQ0MjlkMTg4ZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQxODhkNDI5ZDE1OGQyMjkuNWQxOTFkMjkzZDIzM2QyNDRkMjk2Ljc1ZDI4NC41ZDM2MC41ZDMyNWQ0MzUuNWQyMzUuNWQzOTYuNWQxODZkMzQxLjVkMjM4ZDI5Mi43NWQyMDEuNWQyNDRkMTY1ZDE1OGQyMjkuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1OVI3ZDBSOGQ4MDlSOWQ0M1IxMGQyMDlSMTFpMTk1UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkzaTNpMmkzaTNoZzo4Mm9SMWQ4NThSMmFkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjlkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkNzIzLjVkMzc0LjVkNzIzLjVkNTQzZDEwMjRkNDEzLjVkMTAyNGQyMzYuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkNTBkMTAyNGhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpODJSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTk0b1IxZDg1OFIyYWQ0MTMuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0MTMuNWQxMDI0ZDQxMy41ZDcyMy41ZDE4OGQ0MjlkMTg4ZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQxODhkNDI5ZDMyMy41ZDI4Ny41ZDM5OC41ZDI4Ny41ZDM0Ny41ZDE4MmQyNzJkMTgyZDI3MmQxODIuNWQyMzlkMTgyLjVkMTg4ZDI4OGQyNjNkMjg4ZDI5My41ZDIyNmQzMjMuNWQyODcuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MlI3ZDBSOGQ3OTJSOWQ0M1IxMGQyMDlSMTFpMTk0UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJoZzo4MW9SMWQ4NThSMmFkNDEzLjVkODkzLjVkNDEzLjVkNDI5ZDE4OGQ0MjlkMTg4ZDkwMWQyOTguNWQ5MDFkMjUyZDgxMy41ZDM3M2Q4MTMuNWQ0MTMuNWQ4OTMuNWQzNjQuNWQxMDI0ZDUwZDEwMjRkNTBkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNDc5LjVkMTAyNGQ1NDBkMTE0NGQ0MjguNWQxMTQ0ZDM2NC41ZDEwMjRoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QtMTIwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTgxUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaGc6MTkzb1IxZDg1OFIyYWQ0MTMuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0MTMuNWQxMDI0ZDQxMy41ZDcyMy41ZDE4OGQ0MjlkMTg4ZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQxODhkNDI5ZDMwMi41ZDE4Mi41ZDI1MS41ZDI4OGQzMjYuNWQyODhkMzc4ZDE4Mi41ZDMwMi41ZDE4Mi41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQxLjVSN2QwUjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMTkzUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjgwb1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTgwUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoxOTJvUjFkODU4UjJhZDQxMy41ZDcyMy41ZDE4OGQ3MjMuNWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2QxMDI0ZDQxMy41ZDEwMjRkNDEzLjVkNzIzLjVkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjlkMjI0LjVkMTgyLjVkMjc2ZDI4OGQzNTFkMjg4ZDMwMGQxODIuNWQyMjQuNWQxODIuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTE5MlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo3OW9SMWQ4NThSMmFkNTQzZDMwNmQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDQxMy41ZDQyOWQxODhkNDI5ZDE4OGQ5MDFkNDEzLjVkOTAxZDQxMy41ZDQyOWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNzlSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTkxb1IxZDg1OFIyYWQ1NDNkNDkyLjVkNTQzZDcyMy41ZDE3OS41ZDcyMy41ZDE3OS41ZDkwMWQ1NDNkOTAxZDU0M2QxMDI0ZDUwZDEwMjRkNTBkNjA2LjVkNDA1ZDYwNi41ZDQwNWQ0OTIuNWQ1NDNkNDkyLjVkNDA1ZDQzNWQ0MDVkMzA2ZDU0M2QzMDZkNTQzZDQzNWQ0MDVkNDM1aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxOTFSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6NzhvUjFkODU4UjJhZDE4OGQxMDI0ZDUwZDEwMjRkNTBkMzA2ZDE4OGQzMDZkNDEzLjVkNzA4LjVkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNDEzLjVkMTAyNGQxODhkNjA5LjVkMTg4ZDEwMjRoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTc4UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTkwb1IxZDg1OFIyYWQyMThkMTAyNGQ4MGQxMDI0ZDU0OWQzMDZkNjg3ZDMwNmQyMThkMTAyNGQ0NjcuNWQ4NzVkNDY3LjVkNjY2LjVkNTM2LjVkNjY2LjVkNTM2LjVkODE2LjVkNjQ5LjVkODE2LjVkNjQ5LjVkNjY2LjVkNzE0ZDY2Ni41ZDcxNGQxMDI1LjVkNjQ5LjVkMTAyNS41ZDY0OS41ZDg3NWQ0NjcuNWQ4NzVkNTBkMzY3LjVkNTBkMzA2ZDI5Ni41ZDMwNmQyOTYuNWQ2NjVkNTBkNjY1ZDUwZDYwMy41ZDIzMmQ2MDMuNWQyMzJkNTE0LjVkNTBkNTE0LjVkNTBkNDU2ZDIzMmQ0NTZkMjMyZDM2Ny41ZDUwZDM2Ny41aFIzZDc2NFI0ZDcxNFI1ZDUwUjZkNzE4UjdkLTEuNVI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxOTBSMTJkNTBSMTNkNzY0UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzo3N29SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQzMjhkNjk5LjVkNDczLjVkMzA2ZDYwM2QzMDZkNjAzZDEwMjRkNDczLjVkMTAyNGQ0NzMuNWQ3MjMuNWQzNzNkMTAyNGQyOTJkMTAyNGQxODhkNzIzLjVkMTg4ZDEwMjRoUjNkNjUzUjRkNjAzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTc3UjEyZDUwUjEzZDY1M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTg5b1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUxOWQzMDZkNjU3ZDMwNmQxODhkMTAyNGQyMTUuNWQ2NjVkMTQ2LjVkNjY1ZDE0Ni41ZDMwNmQyMTUuNWQzMDZkMjE1LjVkNjY1ZDcyMGQ5NjFkNzIwZDEwMjIuNWQ0NzMuNWQxMDIyLjVkNDczLjVkODEzLjVkNjU1LjVkODEzLjVkNjU1LjVkNzI1ZDQ3My41ZDcyNWQ0NzMuNWQ2NjMuNWQ3MjBkNjYzLjVkNzIwZDg3MmQ1NDIuNWQ4NzJkNTQyLjVkOTYxZDcyMGQ5NjFoUjNkNzcwUjRkNzIwUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTE4OVIxMmQ1MFIxM2Q3NzBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjc2b1IxZDg1OFIyYWQxODhkOTAxZDU0M2Q5MDFkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkOTAxaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk3NlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJoZzoxODhvUjFkODU4UjJhZDE4OGQxMDI0ZDUwZDEwMjRkNTE5ZDMwNmQ2NTdkMzA2ZDE4OGQxMDI0ZDIxNS41ZDY2NWQxNDYuNWQ2NjVkMTQ2LjVkMzA2ZDIxNS41ZDMwNmQyMTUuNWQ2NjVkNDM3LjVkODc1ZDQzNy41ZDY2Ni41ZDUwNi41ZDY2Ni41ZDUwNi41ZDgxNi41ZDYxOS41ZDgxNi41ZDYxOS41ZDY2Ni41ZDY4NGQ2NjYuNWQ2ODRkMTAyNS41ZDYxOS41ZDEwMjUuNWQ2MTkuNWQ4NzVkNDM3LjVkODc1aFIzZDczNFI0ZDY4NFI1ZDUwUjZkNzE4UjdkLTEuNVI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxODhSMTJkNTBSMTNkNzM0UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjc1b1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDE4OGQ2MDYuNWQ0MTMuNWQzMDZkNTQzZDMwNmQzMDIuNWQ2NTZkNTQzZDEwMjRkNDEzLjVkMTAyNGQxODhkNzIzLjVkMTg4ZDEwMjRoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTc1UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxODdvUjFkODU4UjJhZDIyMS41ZDgxNy41ZDM0NmQ3MDguNWQzNDZkNTU4LjVkMjIyLjVkNDQ3ZDIyMi41ZDU3OS41ZDI4MGQ2MzkuNWQyMjEuNWQ3MDZkMjIxLjVkODE3LjVkNTBkODE3LjVkMTc0LjVkNzA4LjVkMTc0LjVkNTU4LjVkNTFkNDQ3ZDUxZDU3OS41ZDEwOC41ZDYzOS41ZDUwZDcwNmQ1MGQ4MTcuNWhSM2QzOTZSNGQzNDZSNWQ1MFI2ZDU3N1I3ZDIwNi41UjhkNTI3UjlkNDNSMTBkMjA5UjExaTE4N1IxMmQ1MFIxM2QzOTZSMTRhaTFpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJoZzo3NG9SMWQ4NThSMmFkMTg4ZDcxNC41ZDE4OGQ5MDFkNDEzLjVkOTAxZDQxMy41ZDMwNmQ1NDNkMzA2ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkNzE0LjVkMTg4ZDcxNC41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk3NFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MTg2b1IxZDg1OFIyYWQyOTYuNWQzMDZkMjk2LjVkNjY1ZDUwZDY2NWQ1MGQzMDZkMjk2LjVkMzA2ZDIzMmQzNjcuNWQxMTlkMzY3LjVkMTE5ZDYwMy41ZDIzMmQ2MDMuNWQyMzJkMzY3LjVoUjNkMzQ2LjVSNGQyOTYuNVI1ZDUwUjZkNzE4UjdkMzU5UjhkNjY4UjlkNDNSMTBkMjA5UjExaTE4NlIxMmQ1MFIxM2QzNDYuNVIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjczb1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQxODhkMzA2ZDE4OGQxMDI0aFIzZDIzOFI0ZDE4OFI1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk3M1IxMmQ1MFIxM2QyMzhSMTRhaTFpMmkyaTJpMmhnOjE4NW9SMWQ4NThSMmFkMTE5ZDY2NWQ1MGQ2NjVkNTBkMzA2ZDExOWQzMDZkMTE5ZDY2NWhSM2QxNjlSNGQxMTlSNWQ1MFI2ZDcxOFI3ZDM1OVI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxODVSMTJkNTBSMTNkMTY5UjE0YWkxaTJpMmkyaTJoZzo3Mm9SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNDEzLjVkMTAyNGQ0MTMuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTcyUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE4NG9SMWQ4NThSMmFkNTBkMTEzNWQ1MGQxMTgwZDg5LjVkMTE4MGQxMTYuNWQxMTcyLjVkMTQzLjVkMTE2NWQxNTFkMTEzMC41ZDE1OC41ZDEwOTZkMTEwLjVkMTA2MGQxNDYuNWQxMDI0ZDEwMS41ZDEwMjRkNjVkMTA2M2Q2NWQxMDk2ZDEwMS41ZDEwOTZkMTAxLjVkMTEwOGQxMDEuNWQxMTIwZDk1LjVkMTEzMmQ4OS41ZDExNDRkNTBkMTEzNWhSM2QyMDguNVI0ZDE1OC41UjVkNTBSNmQwUjdkLTE1NlI4ZC01MFI5ZDQzUjEwZDIwOVIxMWkxODRSMTJkNTBSMTNkMjA4LjVSMTRhaTFpMmkzaTNpM2kyaTJpMmkyaTNpM2kzaGc6NzFvUjFkODU4UjJhZDI3MC41ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ3MjMuNWQyNzAuNWQ3MjMuNWQyNzAuNWQ2MDYuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNzFSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTgzb1IxZDg1OFIyYWQxODhkNTU4LjVkMTg4ZDY4Ny41ZDUwZDY4Ny41ZDUwZDU1OC41ZDE4OGQ1NTguNWhSM2QyMzhSNGQxODhSNWQ1MFI2ZDQ2NS41UjdkMzM2LjVSOGQ0MTUuNVI5ZDQzUjEwZDIwOVIxMWkxODNSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJoZzo3MG9SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkNzIzLjVkMTg4ZDcyMy41ZDE4OGQxMDI0aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk3MFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE4Mm9SMWQ4NThSMmFkNDcxZDM1OS41ZDQ3MWQxMTA1ZDQxNi41ZDExMDVkNDE2LjVkNzk1LjVkMzc3LjVkNzk1LjVkMzc3LjVkMTEwNWQzMTQuNWQxMTA1ZDMxNC41ZDc5OC41ZDE0OS41ZDc5OC41ZDk5Ljc1ZDcxNy41ZDUwZDYzNi41ZDU0LjVkNTUwLjc1ZDU5ZDQ2NWQ5OC4yNWQ0MDJkMTM3LjVkMzM5ZDE3NWQzMTkuNWQyMTIuNWQzMDBkNTA0ZDMwOWQ1MDRkMzU5LjVkNDcxZDM1OS41aFIzZDU1NFI0ZDUwNFI1ZDUwUjZkNzI0UjdkLTgxUjhkNjc0UjlkNDNSMTBkMjA5UjExaTE4MlIxMmQ1MFIxM2Q1NTRSMTRhaTFpMmkyaTJpMmkyaTJpMmkzaTNpM2kzaTNpMmkyaGc6NjlvUjFkODU4UjJhZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkNzIzLjVkMTg4ZDcyMy41ZDE4OGQ5MDFkNTQzZDkwMWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNjlSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTgxb1IxZDg1OFIyYWQxNzYuNWQxMTg5LjVkNTBkMTE4OS41ZDUxZDUzN2QxODAuNWQ1MzdkMTgwLjVkOTAxZDQwNmQ5MDFkNDA2ZDUzN2Q1NDRkNTM3ZDU0NGQxMDI0ZDE3Ni41ZDEwMjRkMTc2LjVkMTE4OS41aFIzZDU5NFI0ZDU0NFI1ZDUwUjZkNDg3UjdkLTE2NS41UjhkNDM3UjlkNDNSMTBkMjA5UjExaTE4MVIxMmQ1MFIxM2Q1OTRSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjY4b1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwNmQ0OTFkMzA2ZDU0M2QzNjlkNTQzZDk2MWQ0OTEuNWQxMDI0ZDUwZDEwMjRkNDEzLjVkNDI5ZDE4OGQ0MjlkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNDI5aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk2OFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTgwb1IxZDg1OFIyYWQxMDFkMTgyLjVkNTBkMjg4ZDEyNWQyODhkMTc2LjVkMTgyLjVkMTAxZDE4Mi41aFIzZDIyNi41UjRkMTc2LjVSNWQ1MFI2ZDg0MS41UjdkNzM2UjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMTgwUjEyZDUwUjEzZDIyNi41UjE0YWkxaTJpMmkyaTJoZzo2N29SMWQ4NThSMmFkMTg4ZDkwMWQ1NDNkOTAxZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDU0M2QzMDZkNTQzZDQyOWQxODhkNDI5ZDE4OGQ5MDFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTY3UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJoZzoxNzlvUjFkODU4UjJhZDUwZDM2Ny41ZDUwZDMwNmQyOTYuNWQzMDZkMjk2LjVkNjY1ZDUwZDY2NWQ1MGQ2MDMuNWQyMzJkNjAzLjVkMjMyZDUxNC41ZDUwZDUxNC41ZDUwZDQ1NmQyMzJkNDU2ZDIzMmQzNjcuNWQ1MGQzNjcuNWhSM2QzNDYuNVI0ZDI5Ni41UjVkNTBSNmQ3MThSN2QzNTlSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTc5UjEyZDUwUjEzZDM0Ni41UjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6NjZvUjFkODU4UjJhZDU0M2QzMDZkNTQzZDU3OGQ0ODIuNWQ2NjcuNWQ1NDNkNzU3LjVkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQxODhkNzIzLjVkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNzIzLjVkMTg4ZDcyMy41ZDE4OGQ0MjlkMTg4ZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQxODhkNDI5aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk2NlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTc4b1IxZDg1OFIyYWQyOTYuNWQ2MDMuNWQyOTYuNWQ2NjVkNTBkNjY1ZDUwZDQ1NmQyMzJkNDU2ZDIzMmQzNjcuNWQ1MGQzNjcuNWQ1MGQzMDZkMjk2LjVkMzA2ZDI5Ni41ZDUxNC41ZDExOWQ1MTQuNWQxMTlkNjAzLjVkMjk2LjVkNjAzLjVoUjNkMzQ2LjVSNGQyOTYuNVI1ZDUwUjZkNzE4UjdkMzU5UjhkNjY4UjlkNDNSMTBkMjA5UjExaTE3OFIxMmQ1MFIxM2QzNDYuNVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjY1b1IxZDg1OFIyYWQ0MTMuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0MTMuNWQxMDI0ZDQxMy41ZDcyMy41ZDE4OGQ0MjlkMTg4ZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQxODhkNDI5aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk2NVIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjE3N29SMWQ4NThSMmFkMjkxLjVkNzIzLjVkMjkxLjVkODUwLjVkMTc0LjVkODUwLjVkMTc0LjVkNzIzLjVkNTBkNzIzLjVkNTBkNjA2LjVkMTc0LjVkNjA2LjVkMTc0LjVkNDk1LjVkMjkxLjVkNDk1LjVkMjkxLjVkNjA2LjVkNDA1ZDYwNi41ZDQwNWQ3MjMuNWQyOTEuNWQ3MjMuNWQ1MGQ5MDdkNDA1ZDkwN2Q0MDVkMTAyNGQ1MGQxMDI0ZDUwZDkwN2hSM2Q0NTVSNGQ0MDVSNWQ1MFI2ZDUyOC41UjdkMFI4ZDQ3OC41UjlkNDNSMTBkMjA5UjExaTE3N1IxMmQ1MFIxM2Q0NTVSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6NjRvUjFkODU4UjJhZDQxMy41ZDcyMy41ZDQxMy41ZDYxOC41ZDMzMC41ZDYxOC41ZDMzMC41ZDcyMy41ZDQxMy41ZDcyMy41ZDQxMy41ZDUyMmQ0MTMuNWQ0MjlkMTg4ZDQyOWQxODhkOTAxZDU0M2Q5MDFkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkODEzLjVkMjM0LjVkODEzLjVkMjM0LjVkNTIyZDQxMy41ZDUyMmhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNjRSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE3Nm9SMWQ4NThSMmFkMjk2LjVkMzA2ZDI5Ni41ZDY2NWQ1MGQ2NjVkNTBkMzA2ZDI5Ni41ZDMwNmQyMzJkMzY3LjVkMTE5ZDM2Ny41ZDExOWQ2MDMuNWQyMzJkNjAzLjVkMjMyZDM2Ny41aFIzZDM0Ni41UjRkMjk2LjVSNWQ1MFI2ZDcxOFI3ZDM1OVI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxNzZSMTJkNTBSMTNkMzQ2LjVSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo2M29SMWQ4NThSMmFkNTBkODM3LjVkNTBkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDUwZDQyOWQ1MGQzMDZkNTQzZDMwNmQ1NDNkNzIzLjVkMTg4ZDcyMy41ZDE4OGQ4MzcuNWQ1MGQ4MzcuNWQxODhkODk1ZDE4OGQxMDI0ZDUwZDEwMjRkNTBkODk1ZDE4OGQ4OTVoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTYzUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjE3NW9SMWQ4NThSMmFkNTBkMTc3ZDMxMC41ZDE3N2QzMTAuNWQyOTRkNTBkMjk0ZDUwZDE3N2hSM2QzNjAuNVI0ZDMxMC41UjVkNTBSNmQ4NDdSN2Q3MzBSOGQ3OTdSOWQ0M1IxMGQyMDlSMTFpMTc1UjEyZDUwUjEzZDM2MC41UjE0YWkxaTJpMmkyaTJoZzo2Mm9SMWQ4NThSMmFkNDA1ZDcwNS41ZDUwZDg3OS41ZDUwZDc2Mi41ZDMxMS41ZDYxNGQ1MGQ0OTguNWQ1MGQzODEuNWQ0MDVkNTE2LjVkNDA1ZDcwNS41aFIzZDQ1NVI0ZDQwNVI1ZDUwUjZkNjQyLjVSN2QxNDQuNVI4ZDU5Mi41UjlkNDNSMTBkMjA5UjExaTYyUjEyZDUwUjEzZDQ1NVIxNGFpMWkyaTJpMmkyaTJpMmkyaGc6MTc0b1IxZDg1OFIyYWQ0MDMuNWQzMzFkNDk0ZDMzMWQ1NzguNWQzNzYuNWQ2NjNkNDIyZDcxMWQ1MDcuNWQ3NTlkNTkzZDc1OWQ2ODQuNWQ3NTlkNzc3LjVkNzEyZDg2MS43NWQ2NjVkOTQ2ZDU4MC43NWQ5OTIuNzVkNDk2LjVkMTAzOS41ZDQwMy41ZDEwMzkuNWQzMTJkMTAzOS41ZDIyNy43NWQ5OTIuNzVkMTQzLjVkOTQ2ZDk2Ljc1ZDg2MS43NWQ1MGQ3NzcuNWQ1MGQ2ODQuNWQ1MGQ1OTNkOTcuNWQ1MDcuNWQxNDVkNDIyZDIzMGQzNzYuNWQzMTVkMzMxZDQwMy41ZDMzMWQ0MDMuNWQzNjAuNWQzMjNkMzYwLjVkMjQ1ZDQwMi43NWQxNjdkNDQ1ZDEyMy43NWQ1MjIuNzVkODAuNWQ2MDAuNWQ4MC41ZDY4NC41ZDgwLjVkNzY5ZDEyMy41ZDg0NmQxNjYuNWQ5MjNkMjQzLjVkOTY1Ljc1ZDMyMC41ZDEwMDguNWQ0MDMuNWQxMDA4LjVkNDg4ZDEwMDguNWQ1NjUuMjVkOTY1Ljc1ZDY0Mi41ZDkyM2Q2ODVkODQ2ZDcyNy41ZDc2OWQ3MjcuNWQ2ODQuNWQ3MjcuNWQ2MDAuNWQ2ODQuMjVkNTIyLjc1ZDY0MWQ0NDVkNTYzLjVkNDAyLjc1ZDQ4NmQzNjAuNWQ0MDMuNWQzNjAuNWQyMDhkNDY3ZDQwMWQ0NjdkNDczLjVkNDY3ZDUxMS4yNWQ0OTkuNzVkNTQ5ZDUzMi41ZDU0OWQ1NzlkNTQ5ZDYxNi41ZDUyMy41ZDY0NS41ZDQ5OGQ2NzQuNWQ0MzguNWQ2OTBkNTQzZDgzOC41ZDU2MmQ4NjZkNTc3ZDg3NWQ1ODYuNWQ4ODFkNjAzLjVkODgzZDYwMy41ZDkwMGQ1MTEuNWQ5MDBkMzY0LjVkNjk3LjVkMzI2LjVkNjk3LjVkMzI2LjVkODUxLjVkMzI5LjVkODY4LjVkMzQwLjc1ZDg3NS43NWQzNTJkODgzZDM4NmQ4ODNkMzg2ZDkwMGQyMDJkOTAwZDIwMmQ4ODNkMjI2ZDg4M2QyMzYuMjVkODc3LjVkMjQ2LjVkODcyZDI1MC41ZDg2MC41ZDI1NGQ4NTJkMjU0ZDgxNGQyNTRkNTUzZDI1NGQ1MTUuNWQyNTIuNWQ1MDguNWQyNDlkNDk3LjVkMjM5LjVkNDkxLjI1ZDIzMGQ0ODVkMjA4ZDQ4NWQyMDhkNDY3ZDMyNi41ZDY3NS41ZDM4NmQ2NzUuNWQ0MTNkNjY0ZDQ0MGQ2NTIuNWQ0NTQuNWQ2MzEuNWQ0NjlkNjEwLjVkNDY5ZDU4NC41ZDQ2OWQ1NDQuNWQ0NDAuNWQ1MTYuNzVkNDEyZDQ4OWQzNjlkNDg5ZDM0OWQ0ODlkMzI2LjVkNDk2LjVkMzI2LjVkNjc1LjVoUjNkODA5UjRkNzU5UjVkNTBSNmQ2OTNSN2QtMTUuNVI4ZDY0M1I5ZDQzUjEwZDIwOVIxMWkxNzRSMTJkNTBSMTNkODA5UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkyaTNpM2kzaTNpMmkzaTNpMmkyaTJpMmkyaTNpM2kyaTJpMmkzaTNpM2kyaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kyaGc6NjFvUjFkODU4UjJhZDUwZDQ3MS41ZDQwNWQ0NzEuNWQ0MDVkNTg4LjVkNTBkNTg4LjVkNTBkNDcxLjVkNTBkNjc4LjVkNDA1ZDY3OC41ZDQwNWQ3OTUuNWQ1MGQ3OTUuNWQ1MGQ2NzguNWhSM2Q0NTVSNGQ0MDVSNWQ1MFI2ZDU1Mi41UjdkMjI4LjVSOGQ1MDIuNVI5ZDQzUjEwZDIwOVIxMWk2MVIxMmQ1MFIxM2Q0NTVSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNzNvUjFkODU4UjJhZDUwZDYwNi41ZDMxMC41ZDYwNi41ZDMxMC41ZDcyMy41ZDUwZDcyMy41ZDUwZDYwNi41aFIzZDM2MC41UjRkMzEwLjVSNWQ1MFI2ZDQxNy41UjdkMzAwLjVSOGQzNjcuNVI5ZDQzUjEwZDIwOVIxMWkxNzNSMTJkNTBSMTNkMzYwLjVSMTRhaTFpMmkyaTJpMmhnOjYwb1IxZDg1OFIyYWQ1MGQ1MTYuNWQ0MDVkMzgxLjVkNDA1ZDQ5OC41ZDE0My41ZDYxNGQ0MDVkNzYyLjVkNDA1ZDg3OS41ZDUwZDcwNS41ZDUwZDUxNi41aFIzZDQ1NVI0ZDQwNVI1ZDUwUjZkNjQyLjVSN2QxNDQuNVI4ZDU5Mi41UjlkNDNSMTBkMjA5UjExaTYwUjEyZDUwUjEzZDQ1NVIxNGFpMWkyaTJpMmkyaTJpMmkyaGc6MTcyb1IxZDg1OFIyYWQzMTguNWQ3MjMuNWQ1MGQ3MjMuNWQ1MGQ2MDYuNWQ0MDVkNjA2LjVkNDA1LjVkODcxZDMxOC41ZDg3MWQzMTguNWQ3MjMuNWhSM2Q0NTUuNVI0ZDQwNS41UjVkNTBSNmQ0MTcuNVI3ZDE1M1I4ZDM2Ny41UjlkNDNSMTBkMjA5UjExaTE3MlIxMmQ1MFIxM2Q0NTUuNVIxNGFpMWkyaTJpMmkyaTJpMmhnOjU5b1IxZDg1OFIyYWQxODhkNTU4LjVkMTg4ZDY4Ny41ZDUwZDY4Ny41ZDUwZDU1OC41ZDE4OGQ1NTguNWQxMTEuNWQxMDI0ZDUwZDEwMjRkNTBkODk1ZDE4OGQ4OTVkMTg4ZDEwMjRkMTMyZDExNDRkNTRkMTE0NGQxMTEuNWQxMDI0aFIzZDIzOFI0ZDE4OFI1ZDUwUjZkNDY1LjVSN2QtMTIwUjhkNDE1LjVSOWQ0M1IxMGQyMDlSMTFpNTlSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaGc6MTcxb1IxZDg1OFIyYWQxNzQuNWQ3MDZkMTE2ZDYzOS41ZDE3My41ZDU3OS41ZDE3My41ZDQ0N2Q1MGQ1NTguNWQ1MGQ3MDguNWQxNzQuNWQ4MTcuNWQxNzQuNWQ3MDZkMzQ2ZDcwNmQyODcuNWQ2MzkuNWQzNDVkNTc5LjVkMzQ1ZDQ0N2QyMjEuNWQ1NTguNWQyMjEuNWQ3MDguNWQzNDZkODE3LjVkMzQ2ZDcwNmhSM2QzOTZSNGQzNDZSNWQ1MFI2ZDU3N1I3ZDIwNi41UjhkNTI3UjlkNDNSMTBkMjA5UjExaTE3MVIxMmQ1MFIxM2QzOTZSMTRhaTFpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJoZzo1OG9SMWQ4NThSMmFkMTg4ZDU1OC41ZDE4OGQ2ODcuNWQ1MGQ2ODcuNWQ1MGQ1NTguNWQxODhkNTU4LjVkMTg4ZDg5NWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDg5NWQxODhkODk1aFIzZDIzOFI0ZDE4OFI1ZDUwUjZkNDY1LjVSN2QwUjhkNDE1LjVSOWQ0M1IxMGQyMDlSMTFpNThSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTcwb1IxZDg1OFIyYWQyMzJkNTE0LjVkMTE5ZDUxNC41ZDExOWQ2NjVkNTBkNjY1ZDUwZDMwNmQyOTYuNWQzMDZkMjk2LjVkNjY1ZDIzMmQ2NjVkMjMyZDUxNC41ZDExOWQzNjcuNWQxMTlkNDU2ZDIzMmQ0NTZkMjMyZDM2Ny41ZDExOWQzNjcuNWhSM2QzNDYuNVI0ZDI5Ni41UjVkNTBSNmQ3MThSN2QzNTlSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTcwUjEyZDUwUjEzZDM0Ni41UjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzo1N29SMWQ4NThSMmFkNDEzLjVkOTAxZDQxMy41ZDcyMy41ZDUwZDcyMy41ZDUwZDMwNmQ1NDNkMzA2ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkOTAxZDQxMy41ZDkwMWQxODhkNDI5ZDE4OGQ2MDYuNWQ0MTMuNWQ2MDYuNWQ0MTMuNWQ0MjlkMTg4ZDQyOWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNTdSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNjlvUjFkODU4UjJhZDQyMi41ZDI3Ni41ZDUxNi41ZDI3Ni41ZDYwNS43NWQzMjQuNWQ2OTVkMzcyLjVkNzQ1ZDQ2MS43NWQ3OTVkNTUxZDc5NWQ2NDhkNzk1ZDc0NWQ3NDUuNzVkODM0ZDY5Ni41ZDkyM2Q2MDcuNzVkOTcxLjc1ZDUxOWQxMDIwLjVkNDIyLjVkMTAyMC41ZDMyNS41ZDEwMjAuNWQyMzcuMjVkOTcxLjc1ZDE0OWQ5MjNkOTkuNWQ4MzRkNTBkNzQ1ZDUwZDY0OGQ1MGQ1NTFkMTAwLjI1ZDQ2MS43NWQxNTAuNWQzNzIuNWQyMzkuNzVkMzI0LjVkMzI5ZDI3Ni41ZDQyMi41ZDI3Ni41ZDQyMi41ZDMwOC41ZDMzN2QzMDguNWQyNTUuNzVkMzUyLjVkMTc0LjVkMzk2LjVkMTI4LjVkNDc4ZDgyLjVkNTU5LjVkODIuNWQ2NDhkODIuNWQ3MzYuNWQxMjcuNWQ4MTcuMjVkMTcyLjVkODk4ZDI1My41ZDk0My4yNWQzMzQuNWQ5ODguNWQ0MjIuNWQ5ODguNWQ1MTAuNWQ5ODguNWQ1OTEuNWQ5NDMuMjVkNjcyLjVkODk4ZDcxNy43NWQ4MTcuMjVkNzYzZDczNi41ZDc2M2Q2NDhkNzYzZDU1OS41ZDcxN2Q0NzhkNjcxZDM5Ni41ZDU4OS43NWQzNTIuNWQ1MDguNWQzMDguNWQ0MjIuNWQzMDguNWQ2MDYuNWQ0MDlkNjE3LjVkNTU2ZDU5N2Q1NTZkNTc3LjVkNDkzLjVkNTM2Ljc1ZDQ2Mi43NWQ0OTZkNDMyZDQzOGQ0MzJkMzk0LjVkNDMyZDM2MWQ0NTBkMzI3LjVkNDY4ZDMwNmQ0OTcuNWQyOTBkNTIwLjVkMjc5LjVkNTU4ZDI2OWQ1OTUuNWQyNjlkNjM2ZDI2OWQ3NDcuNWQzMTdkODAwLjI1ZDM2NWQ4NTNkNDQzZDg1M2Q1NDVkODUzZDYwNi41ZDc2OGQ2MjZkNzc4ZDU1M2Q4ODQuNWQ0MjUuNWQ4ODQuNWQzMjBkODg0LjVkMjUxZDgxNi41ZDE4MmQ3NDguNWQxODJkNjUxLjVkMTgyZDU1MWQyNTUuNWQ0ODBkMzI5ZDQwOWQ0NDNkNDA5ZDQ2OGQ0MDlkNDgzLjVkNDEyZDQ5OWQ0MTVkNTQxZDQyOC41ZDU1My41ZDQzM2Q1NTkuNWQ0MzNkNTY4ZDQzM2Q1NzRkNDI4LjI1ZDU4MGQ0MjMuNWQ1ODZkNDA5ZDYwNi41ZDQwOWhSM2Q4NDVSNGQ3OTVSNWQ1MFI2ZDc0Ny41UjdkMy41UjhkNjk3LjVSOWQ0M1IxMGQyMDlSMTFpMTY5UjEyZDUwUjEzZDg0NVIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpMmkyaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaGc6NTZvUjFkODU4UjJhZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQxODhkNzIzLjVkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNzIzLjVkMTg4ZDcyMy41ZDE4OGQ0MjlkMTg4ZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQxODhkNDI5aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk1NlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTY4b1IxZDg1OFIyYWQxODhkMTcxZDE4OGQzMDBkNTBkMzAwZDUwZDE3MWQxODhkMTcxZDM5Mi41ZDE3MC41ZDM5Mi41ZDI5OS41ZDI1NC41ZDI5OS41ZDI1NC41ZDE3MC41ZDM5Mi41ZDE3MC41aFIzZDQ0Mi41UjRkMzkyLjVSNWQ1MFI2ZDg1My41UjdkNzI0UjhkODAzLjVSOWQ0M1IxMGQyMDlSMTFpMTY4UjEyZDUwUjEzZDQ0Mi41UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NTVvUjFkODU4UjJhZDQxMy41ZDQyOWQ1MGQ0MjlkNTBkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNDEzLjVkMTAyNGQ0MTMuNWQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTU1UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmhnOjE2N29SMWQ4NThSMmFkNTAuNWQxNzMuNWQ1NDMuNWQxNzMuNWQ1NDMuNWQyOTYuNWQxODguNWQyOTYuNWQxODguNWQ0NjhkNTQzZDQ2OGQ1NDNkMTE4NmQ1MGQxMTg2ZDUwZDEwNjNkNDEzLjVkMTA2M2Q0MTMuNWQ4OTEuNWQ1MC41ZDg5MS41ZDUwLjVkMTczLjVkMTg4ZDU5MWQxODhkNzY4LjVkNDE0ZDc2OC41ZDQxNGQ1OTFkMTg4ZDU5MWhSM2Q1OTMuNVI0ZDU0My41UjVkNTBSNmQ4NTAuNVI3ZC0xNjJSOGQ4MDAuNVI5ZDQzUjEwZDIwOVIxMWkxNjdSMTJkNTBSMTNkNTkzLjVSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6NTRvUjFkODU4UjJhZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQxODhkNzIzLjVkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNzIzLjVkMTg4ZDcyMy41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWk1NFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjE2Nm9SMWQ4NThSMmFkMTIyLjVkNjkwLjVkMTIyLjVkMTEwMmQ1MGQxMTAyZDUwZDY5MC41ZDEyMi41ZDY5MC41ZDUwZDU5Ny41ZDUwZDE5NC41ZDEyMi41ZDE5NC41ZDEyMi41ZDU5Ny41ZDUwZDU5Ny41aFIzZDE3Mi41UjRkMTIyLjVSNWQ1MFI2ZDgyOS41UjdkLTc4UjhkNzc5LjVSOWQ0M1IxMGQyMDlSMTFpMTY2UjEyZDUwUjEzZDE3Mi41UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NTNvUjFkODU4UjJhZDUwZDcyMy41ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQxODhkNjA2LjVkNTQzZDYwNi41ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkOTAxZDQxMy41ZDkwMWQ0MTMuNWQ3MjMuNWQ1MGQ3MjMuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNTNSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTY1b1IxZDg1OFIyYWQyMTQuNWQ2NDUuNWQ1MGQzMDZkMTg4ZDMwNmQyOTkuNWQ1MzRkNDEzLjVkMzA2ZDU0M2QzMDZkMzcyZDY0NS41ZDQ0Ny41ZDY0NS41ZDQ0Ny41ZDc1Ni41ZDM2MmQ3NTYuNWQzNjJkODA4ZDQ0Ny41ZDgwOGQ0NDcuNWQ5MTlkMzYyZDkxOWQzNjJkMTAyNGQyMjRkMTAyNGQyMjRkOTE5ZDEzMmQ5MTlkMTMyZDgwOGQyMjRkODA4ZDIyNGQ3NTYuNWQxMzJkNzU2LjVkMTMyZDY0NS41ZDIxNC41ZDY0NS41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxNjVSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjUyb1IxZDg1OFIyYWQ1MGQ3MjMuNWQ1MGQzMDZkMTg4ZDMwNmQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNDEzLjVkMTAyNGQ0MTMuNWQ3MjMuNWQ1MGQ3MjMuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNTJSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNjRvUjFkODU4UjJhZDM2NS41ZDUzNmQ0MjIuNWQ0NzUuNWQ0NjcuNWQ1MjAuNWQ0MTBkNTgxLjVkNDQ1ZDYzMC41ZDQ0NWQ2OTQuNWQ0NDVkNzY2ZDQwMS41ZDgxOWQ0NDhkODgwZDQwMi41ZDkyNWQzNTRkODYxLjVkMzExZDg4OC41ZDI1Ny41ZDg4OC41ZDE5Ny41ZDg4OC41ZDE1MS41ZDg1NWQ5NWQ5MTVkNTBkODY5LjVkMTA2ZDgxMGQ2OS41ZDc2MGQ2OS41ZDY5NC41ZDY5LjVkNjE1LjVkMTIzLjVkNTU5ZDcyLjVkNDkyZDExNy41ZDQ0N2QxNzMuNWQ1MjAuNWQyMTEuNWQ1MDFkMjU3LjVkNTAxZDMxOC41ZDUwMWQzNjUuNWQ1MzZkMjU3LjVkNTczZDIxMC41ZDU3M2QxNzcuMjVkNjA3LjI1ZDE0NGQ2NDEuNWQxNDRkNjkwZDE0NGQ3MzhkMTc3LjI1ZDc3Mi4yNWQyMTAuNWQ4MDYuNWQyNTcuNWQ4MDYuNWQzMDRkODA2LjVkMzM3LjI1ZDc3Mi4yNWQzNzAuNWQ3MzhkMzcwLjVkNjkwZDM3MC41ZDY0MS41ZDMzNy4yNWQ2MDcuMjVkMzA0ZDU3M2QyNTcuNWQ1NzNoUjNkNTE3LjVSNGQ0NjcuNVI1ZDUwUjZkNTc3UjdkOTlSOGQ1MjdSOWQ0M1IxMGQyMDlSMTFpMTY0UjEyZDUwUjEzZDUxNy41UjE0YWkxaTJpMmkyaTNpM2kyaTJpMmkzaTNpMmkyaTJpM2kzaTJpMmkyaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2hnOjUxb1IxZDg1OFIyYWQ1MGQ0MjlkNTBkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQ5MDFkNDEzLjVkOTAxZDQxMy41ZDcyMy41ZDUwZDcyMy41ZDUwZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQ1MGQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTUxUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE2M29SMWQ4NThSMmFkNTQzZDMwNmQ1NDNkNTI4ZDQxMy41ZDUyOGQ0MTMuNWQ0MjlkMjY2LjVkNDI5ZDI2Ni41ZDYwNi41ZDM1NWQ2MDYuNWQzNTVkNzIzLjVkMjY2LjVkNzIzLjVkMjY2LjVkOTAxZDU0M2Q5MDFkNTQzZDEwMjRkNTBkMTAyNGQ1MGQ5MDFkMTI4LjVkOTAxZDEyOC41ZDcyMy41ZDUxLjVkNzIzLjVkNTEuNWQ2MDYuNWQxMjguNWQ2MDYuNWQxMjguNWQzMDZkNTQzZDMwNmhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTYzUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzo1MG9SMWQ4NThSMmFkNTQzZDkwMWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDYwNi41ZDQxMy41ZDYwNi41ZDQxMy41ZDQyOWQ1MGQ0MjlkNTBkMzA2ZDU0M2QzMDZkNTQzZDcyMy41ZDE4OGQ3MjMuNWQxODhkOTAxZDU0M2Q5MDFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTUwUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE2Mm9SMWQ4NThSMmFkMTg4ZDU1OGQxODhkNzM1LjVkNTQzZDczNS41ZDU0M2Q4NTIuNWQzMzkuNWQ4NTIuNWQzMzkuNWQ5MzkuNWQyNTUuNWQ5MzkuNWQyNTUuNWQ4NTIuNWQ1MGQ4NTIuNWQ1MGQ0MzVkMjU1LjVkNDM1ZDI1NS41ZDM2MGQzMzkuNWQzNjBkMzM5LjVkNDM1ZDU0M2Q0MzVkNTQzZDU1OGQxODhkNTU4aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNjY0UjdkODQuNVI4ZDYxNFI5ZDQzUjEwZDIwOVIxMWkxNjJSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzo0OW9SMWQ4NThSMmFkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkMTAyNGhSM2QyMzhSNGQxODhSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNDlSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJoZzoxNjFvUjFkODU4UjJhZDE4OGQ1MDEuNWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDUwMS41ZDE4OGQ1MDEuNWQ1MGQ0MzVkNTBkMzA2ZDE4OGQzMDZkMTg4ZDQzNWQ1MGQ0MzVoUjNkMjM4UjRkMTg4UjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTE2MVIxMmQ1MFIxM2QyMzhSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0OG9SMWQ4NThSMmFkNTQzZDMwNmQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDQxMy41ZDQyOWQxODhkNDI5ZDE4OGQ5MDFkNDEzLjVkOTAxZDQxMy41ZDQyOWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNDhSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTYwb1IxZDg1OFIyYWhSM2QyNTRSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDQzUjEwZDIwOVIxMWkxNjBSMTJkMFIxM2QyNTRSMTRhaGc6NDdvUjFkODU4UjJhZDE4OGQxMDI0ZDUwZDEwMjRkMzAyLjVkMzA2ZDQ0MC41ZDMwNmQxODhkMTAyNGhSM2Q0OTAuNVI0ZDQ0MC41UjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTQ3UjEyZDUwUjEzZDQ5MC41UjE0YWkxaTJpMmkyaTJoZzoxNTlvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNTlSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjQ2b1IxZDg1OFIyYWQxODhkODk1ZDE4OGQxMDI0ZDUwZDEwMjRkNTBkODk1ZDE4OGQ4OTVoUjNkMjM4UjRkMTg4UjVkNTBSNmQxMjlSN2QwUjhkNzlSOWQ0M1IxMGQyMDlSMTFpNDZSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJoZzoxNThvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNThSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjQ1b1IxZDg1OFIyYWQ1MGQ2MDYuNWQzMTAuNWQ2MDYuNWQzMTAuNWQ3MjMuNWQ1MGQ3MjMuNWQ1MGQ2MDYuNWhSM2QzNjAuNVI0ZDMxMC41UjVkNTBSNmQ0MTcuNVI3ZDMwMC41UjhkMzY3LjVSOWQ0M1IxMGQyMDlSMTFpNDVSMTJkNTBSMTNkMzYwLjVSMTRhaTFpMmkyaTJpMmhnOjE1N29SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTE1N1IxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6NDRvUjFkODU4UjJhZDExMS41ZDEwMjRkNTBkMTAyNGQ1MGQ4OTVkMTg4ZDg5NWQxODhkMTAyNGQxMzJkMTE0NGQ1NGQxMTQ0ZDExMS41ZDEwMjRoUjNkMjM4UjRkMTg4UjVkNTBSNmQxMjlSN2QtMTIwUjhkNzlSOWQ0M1IxMGQyMDlSMTFpNDRSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJpMmkyaTJoZzoxNTZvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNTZSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjQzb1IxZDg1OFIyYWQyOTEuNWQ3MjMuNWQyOTEuNWQ4NTAuNWQxNzQuNWQ4NTAuNWQxNzQuNWQ3MjMuNWQ1MGQ3MjMuNWQ1MGQ2MDYuNWQxNzQuNWQ2MDYuNWQxNzQuNWQ0OTUuNWQyOTEuNWQ0OTUuNWQyOTEuNWQ2MDYuNWQ0MDVkNjA2LjVkNDA1ZDcyMy41ZDI5MS41ZDcyMy41aFIzZDQ1NVI0ZDQwNVI1ZDUwUjZkNTI4LjVSN2QxNzMuNVI4ZDQ3OC41UjlkNDNSMTBkMjA5UjExaTQzUjEyZDUwUjEzZDQ1NVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE1NW9SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTE1NVIxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6NDJvUjFkODU4UjJhZDEyNS41ZDMwNmQxMjUuNWQzNjZkNzcuNWQzNDVkNTBkMzg3ZDEwNy41ZDQxN2Q2NS41ZDQ2MmQxMDEuNWQ0OTJkMTQwLjVkNDQxZDE4Mi41ZDQ5NWQyMTUuNWQ0NjVkMTgyLjVkNDE0ZDIzOS41ZDM5MGQyMTguNWQzNDhkMTcwLjVkMzYzZDE3MC41ZDMwNmQxMjUuNWQzMDZoUjNkMjg5LjVSNGQyMzkuNVI1ZDUwUjZkNzE4UjdkNTI5UjhkNjY4UjlkNDNSMTBkMjA5UjExaTQyUjEyZDUwUjEzZDI4OS41UjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTU0b1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTU0UjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzo0MW9SMWQ4NThSMmFkNTBkOTAxZDEyN2Q5MDFkMTI3ZDQyOWQ1MGQ0MjlkNTBkMzA2ZDIwNC41ZDMwNmQyNTYuNWQzNjlkMjU2LjVkOTYxZDIwNWQxMDI0ZDUwZDEwMjRkNTBkOTAxaFIzZDMwNi41UjRkMjU2LjVSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNDFSMTJkNTBSMTNkMzA2LjVSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE1M29SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTE1M1IxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6NDBvUjFkODU4UjJhZDI1Ni41ZDEwMjRkMTAxLjVkMTAyNGQ1MGQ5NjFkNTBkMzY5ZDEwMmQzMDZkMjU2LjVkMzA2ZDI1Ni41ZDQyOWQxNzkuNWQ0MjlkMTc5LjVkOTAxZDI1Ni41ZDkwMWQyNTYuNWQxMDI0aFIzZDMwNi41UjRkMjU2LjVSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpNDBSMTJkNTBSMTNkMzA2LjVSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE1Mm9SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTE1MlIxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6MzlvUjFkODU4UjJhZDE0OWQzMDZkMTQ5ZDUwN2Q1MGQ1MDdkNTBkMzA2ZDE0OWQzMDZoUjNkMTk5UjRkMTQ5UjVkNTBSNmQ3MThSN2Q1MTdSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMzlSMTJkNTBSMTNkMTk5UjE0YWkxaTJpMmkyaTJoZzoxNTFvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNTFSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjM4b1IxZDg1OFIyYWQxODhkNzIzLjVkMTg4ZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNzIzLjVkMTg4ZDcyMy41ZDQxMy41ZDYwNi41ZDQxMy41ZDQ3NGQ1NDNkNDc0ZDU0M2QxMDI0ZDUwZDEwMjRkNTBkMzA2ZDU0M2QzMDZkNTQzZDQyOWQxODhkNDI5ZDE4OGQ2MDYuNWQ0MTMuNWQ2MDYuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMzhSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTUwb1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTUwUjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzozN29SMWQ4NThSMmFkMjk2LjVkMzA2ZDI5Ni41ZDY2NWQ1MGQ2NjVkNTBkMzA2ZDI5Ni41ZDMwNmQyMzJkMzY3LjVkMTE5ZDM2Ny41ZDExOWQ2MDMuNWQyMzJkNjAzLjVkMjMyZDM2Ny41ZDczMmQ2NjNkNzMyZDEwMjJkNDg1LjVkMTAyMmQ0ODUuNWQ2NjNkNzMyZDY2M2Q2NjcuNWQ3MjQuNWQ1NTQuNWQ3MjQuNWQ1NTQuNWQ5NjAuNWQ2NjcuNWQ5NjAuNWQ2NjcuNWQ3MjQuNWhSM2Q3ODJSNGQ3MzJSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMzdSMTJkNTBSMTNkNzgyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNDlvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNDlSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjM2b1IxZDg1OFIyYWQ0MTMuNWQ5MDFkNDEzLjVkNzIzLjVkNTBkNzIzLjVkNTBkMzA2ZDI1NS41ZDMwNmQyNTUuNWQyMzFkMzM5LjVkMjMxZDMzOS41ZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMTg4ZDQyOWQxODhkNjA2LjVkNTQzZDYwNi41ZDU0M2QxMDI0ZDMzOS41ZDEwMjRkMzM5LjVkMTEwOGQyNTUuNWQxMTA4ZDI1NS41ZDEwMjRkNTBkMTAyNGQ1MGQ5MDFkNDEzLjVkOTAxaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzkzUjdkLTg0UjhkNzQzUjlkNDNSMTBkMjA5UjExaTM2UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNDhvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNDhSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjM1b1IxZDg1OFIyYWQzNDEuNWQ4MzVkMjUxLjVkODM1ZDI1MS41ZDEwMjRkMTEzLjVkMTAyNGQxMTMuNWQ4MzVkNTBkODM1ZDUwZDcxOGQxMTMuNWQ3MThkMTEzLjVkNjAzLjVkNTBkNjAzLjVkNTBkNDg2LjVkMTEzLjVkNDg2LjVkMTEzLjVkMzA2ZDI1MS41ZDMwNmQyNTEuNWQ0ODYuNWQzNDEuNWQ0ODYuNWQzNDEuNWQzMDZkNDc5LjVkMzA2ZDQ3OS41ZDQ4Ni41ZDU0M2Q0ODYuNWQ1NDNkNjAzLjVkNDc5LjVkNjAzLjVkNDc5LjVkNzE4ZDU0M2Q3MThkNTQzZDgzNWQ0NzkuNWQ4MzVkNDc5LjVkMTAyNGQzNDEuNWQxMDI0ZDM0MS41ZDgzNWQyNTEuNWQ3MThkMzQxLjVkNzE4ZDM0MS41ZDYwMy41ZDI1MS41ZDYwMy41ZDI1MS41ZDcxOGhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMzVSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTQ3b1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTQ3UjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzozNG9SMWQ4NThSMmFkMTQ5ZDMwNmQxNDlkNTA3ZDUwZDUwN2Q1MGQzMDZkMTQ5ZDMwNmQyOTlkMzA2ZDI5OWQ1MDdkMjAwZDUwN2QyMDBkMzA2ZDI5OWQzMDZoUjNkMzQ5UjRkMjk5UjVkNTBSNmQ3MThSN2Q1MTdSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMzRSMTJkNTBSMTNkMzQ5UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTQ2b1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTQ2UjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzozM29SMWQ4NThSMmFkNTBkODI4LjVkNTBkMzA2ZDE4OGQzMDZkMTg4ZDgyOC41ZDUwZDgyOC41ZDE4OGQ4OTVkMTg4ZDEwMjRkNTBkMTAyNGQ1MGQ4OTVkMTg4ZDg5NWhSM2QyMzhSNGQxODhSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMzNSMTJkNTBSMTNkMjM4UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTQ1b1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTQ1UjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzozMm9SMWQ4NThSMmFoUjNkMjU0UjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQ0M1IxMGQyMDlSMTFpMzJSMTJkMFIxM2QyNTRSMTRhaGc6MTQ0b1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTQ0UjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzoxNDNvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNDNSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI1NW9SMWQ4NThSMmFkMzYyZDY2NWQzNjJkMTAyNGQyMjRkMTAyNGQyMjRkNjY1ZDUwZDMwNmQxODhkMzA2ZDI5OS41ZDUzNGQ0MTMuNWQzMDZkNTQzZDMwNmQzNjJkNjY1ZDI2MGQxNzFkMjYwZDMwMGQxMjJkMzAwZDEyMmQxNzFkMjYwZDE3MWQ0NjQuNWQxNzAuNWQ0NjQuNWQyOTkuNWQzMjYuNWQyOTkuNWQzMjYuNWQxNzAuNWQ0NjQuNWQxNzAuNWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1My41UjdkMFI4ZDgwMy41UjlkNDNSMTBkMjA5UjExaTI1NVIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE0Mm9SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTE0MlIxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6MjU0b1IxZDg1OFIyYWQxODhkNDQ3ZDU0M2Q0NDdkNTQzZDg2NC41ZDE4OGQ4NjQuNWQxODhkOTAxZDE4OS41ZDkwMWQxODkuNWQxMDI0ZDUwZDEwMjRkNTBkMzA2ZDE4OGQzMDZkMTg4ZDQ0N2QxODhkNzQ3LjVkNDEzLjVkNzQ3LjVkNDEzLjVkNTcwZDE4OGQ1NzBkMTg4ZDc0Ny41aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkyNTRSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTQxb1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTQxUjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzoyNTNvUjFkODU4UjJhaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQxLjVSN2QwUjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMjUzUjEyZDUwUjEzZDU5M1IxNGFoZzoxNDBvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxNDBSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI1Mm9SMWQ4NThSMmFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NTMuNVI3ZDBSOGQ4MDMuNVI5ZDQzUjEwZDIwOVIxMWkyNTJSMTJkNTBSMTNkNTkzUjE0YWhnOjEzOW9SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTEzOVIxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6MjUxb1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MlI3ZDBSOGQ3OTJSOWQ0M1IxMGQyMDlSMTFpMjUxUjEyZDUwUjEzZDU5M1IxNGFoZzoxMzhvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxMzhSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI1MG9SMWQ4NThSMmFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NDEuNVI3ZDBSOGQ3OTEuNVI5ZDQzUjEwZDIwOVIxMWkyNTBSMTJkNTBSMTNkNTkzUjE0YWhnOjEzN29SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTEzN1IxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6MjQ5b1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTI0OVIxMmQ1MFIxM2Q1OTNSMTRhaGc6MTM2b1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTM2UjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzoyNDhvUjFkODU4UjJhZDI5MWQ5MDFkNDQ5LjVkOTAxZDQ0OS41ZDU2NC41ZDI5MWQ5MDFkMjI0ZDc1MGQzNzVkNDI5ZDIyNGQ0MjlkMjI0ZDc1MGQ1NzFkMzA2ZDU3OWQzMDZkNTc5ZDEwMjRkMjMzZDEwMjRkMTg4ZDExMjBkNTBkMTEyMGQ5NWQxMDI0ZDg2ZDEwMjRkODZkMzA2ZDQzM2QzMDZkNDc0ZDIxOWQ2MTJkMjE5ZDU3MWQzMDZoUjNkNjYyUjRkNjEyUjVkNTBSNmQ4MDVSN2QtOTZSOGQ3NTVSOWQ0M1IxMGQyMDlSMTFpMjQ4UjEyZDUwUjEzZDY2MlIxNGFpMWkyaTJpMmkxaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxMzVvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxMzVSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI0N29SMWQ4NThSMmFkNTBkNjA2LjVkNDA1ZDYwNi41ZDQwNWQ3MjMuNWQ1MGQ3MjMuNWQ1MGQ2MDYuNWQyOTkuNWQ0MzVkMjk5LjVkNTY0ZDE2MS41ZDU2NGQxNjEuNWQ0MzVkMjk5LjVkNDM1ZDI5OS41ZDc3MS41ZDI5OS41ZDkwMC41ZDE2MS41ZDkwMC41ZDE2MS41ZDc3MS41ZDI5OS41ZDc3MS41aFIzZDQ1NVI0ZDQwNVI1ZDUwUjZkNTg5UjdkMTIzLjVSOGQ1MzlSOWQ0M1IxMGQyMDlSMTFpMjQ3UjEyZDUwUjEzZDQ1NVIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMzRvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxMzRSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI0Nm9SMWQ4NThSMmFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NTMuNVI3ZDBSOGQ4MDMuNVI5ZDQzUjEwZDIwOVIxMWkyNDZSMTJkNTBSMTNkNTkzUjE0YWhnOjEzM29SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTEzM1IxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6MjQ1b1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1OVI3ZDBSOGQ4MDlSOWQ0M1IxMGQyMDlSMTFpMjQ1UjEyZDUwUjEzZDU5M1IxNGFoZzoxMzJvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxMzJSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI0NG9SMWQ4NThSMmFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NDJSN2QwUjhkNzkyUjlkNDNSMTBkMjA5UjExaTI0NFIxMmQ1MFIxM2Q1OTNSMTRhaGc6MTMxb1IxZDg1OFIyYWQ1MGQxMDI0ZDUwZDMwN2Q0NjJkMzA3ZDQ2MmQxMDI0ZDUwZDEwMjRkNzVkOTk5ZDQzN2Q5OTlkNDM3ZDMzMmQ3NWQzMzJkNzVkOTk5ZDE2Mi41ZDQ1MGQxNzhkNDM2ZDE5MS41ZDQyOC41ZDIxOGQ0MTMuNWQyNDcuNWQ0MTMuNWQyOTMuNWQ0MTMuNWQzMjEuNWQ0MzcuMjVkMzQ5LjVkNDYxZDM0OS41ZDUwMWQzNDkuNWQ1MjUuNWQzMzhkNTUwLjI1ZDMyNi41ZDU3NWQyOTQuNWQ2MTVkMjYzZDY1NWQyNDVkNjgxZDIyN2Q3MDdkMjI3ZDczMC41ZDIyN2Q3NDkuNWQyMzlkNzk3ZDIyM2Q3OTdkMjA1LjVkNzQ4LjVkMjA1LjVkNzIzZDIwNS41ZDY4NWQyNDYuMjVkNjE0ZDI4N2Q1NDNkMjg3ZDUwNS41ZDI4N2Q0NzdkMjcwLjVkNDYwLjVkMjU0ZDQ0NGQyMjVkNDQ0ZDIwNmQ0NDRkMTkwLjVkNDUyLjVkMTc3LjVkNDYwZDE2Mi41ZDQ3Mi41ZDE2Mi41ZDQ1MGQxOTQuNWQ4NTdkMjIzZDgyOGQyMjguNWQ4MjNkMjMzZDgyM2QyMzhkODIzZDI0NGQ4MjguNWQyNzJkODU4LjVkMjc2LjVkODY0ZDI3Ni41ZDg2OC41ZDI3Ni41ZDg3NGQyNzEuNWQ4NzkuNWQyNDMuNWQ5MTAuNWQyMzYuNWQ5MTcuNWQyMzNkOTE3LjVkMjI3LjVkOTE3LjVkMjIzZDkxMi41ZDE5Mi41ZDg3N2QxODlkODcyLjVkMTg5ZDg2OGQxODlkODYzZDE5NC41ZDg1N2hSM2Q1MTJSNGQ0NjJSNWQ1MFI2ZDcxN1I3ZDBSOGQ2NjdSOWQ0M1IxMGQyMDlSMTFpMTMxUjEyZDUwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNoZzoyNDNvUjFkODU4UjJhaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQxLjVSN2QwUjhkNzkxLjVSOWQ0M1IxMGQyMDlSMTFpMjQzUjEyZDUwUjEzZDU5M1IxNGFoZzoxMzBvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxMzBSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI0Mm9SMWQ4NThSMmFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NDEuNVI3ZDBSOGQ3OTEuNVI5ZDQzUjEwZDIwOVIxMWkyNDJSMTJkNTBSMTNkNTkzUjE0YWhnOjEyOW9SMWQ4NThSMmFkNTBkMTAyNGQ1MGQzMDdkNDYyZDMwN2Q0NjJkMTAyNGQ1MGQxMDI0ZDc1ZDk5OWQ0MzdkOTk5ZDQzN2QzMzJkNzVkMzMyZDc1ZDk5OWQxNjIuNWQ0NTBkMTc4ZDQzNmQxOTEuNWQ0MjguNWQyMThkNDEzLjVkMjQ3LjVkNDEzLjVkMjkzLjVkNDEzLjVkMzIxLjVkNDM3LjI1ZDM0OS41ZDQ2MWQzNDkuNWQ1MDFkMzQ5LjVkNTI1LjVkMzM4ZDU1MC4yNWQzMjYuNWQ1NzVkMjk0LjVkNjE1ZDI2M2Q2NTVkMjQ1ZDY4MWQyMjdkNzA3ZDIyN2Q3MzAuNWQyMjdkNzQ5LjVkMjM5ZDc5N2QyMjNkNzk3ZDIwNS41ZDc0OC41ZDIwNS41ZDcyM2QyMDUuNWQ2ODVkMjQ2LjI1ZDYxNGQyODdkNTQzZDI4N2Q1MDUuNWQyODdkNDc3ZDI3MC41ZDQ2MC41ZDI1NGQ0NDRkMjI1ZDQ0NGQyMDZkNDQ0ZDE5MC41ZDQ1Mi41ZDE3Ny41ZDQ2MGQxNjIuNWQ0NzIuNWQxNjIuNWQ0NTBkMTk0LjVkODU3ZDIyM2Q4MjhkMjI4LjVkODIzZDIzM2Q4MjNkMjM4ZDgyM2QyNDRkODI4LjVkMjcyZDg1OC41ZDI3Ni41ZDg2NGQyNzYuNWQ4NjguNWQyNzYuNWQ4NzRkMjcxLjVkODc5LjVkMjQzLjVkOTEwLjVkMjM2LjVkOTE3LjVkMjMzZDkxNy41ZDIyNy41ZDkxNy41ZDIyM2Q5MTIuNWQxOTIuNWQ4NzdkMTg5ZDg3Mi41ZDE4OWQ4NjhkMTg5ZDg2M2QxOTQuNWQ4NTdoUjNkNTEyUjRkNDYyUjVkNTBSNmQ3MTdSN2QwUjhkNjY3UjlkNDNSMTBkMjA5UjExaTEyOVIxMmQ1MFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkxaTJpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaGc6MjQxb1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1OVI3ZDBSOGQ4MDlSOWQ0M1IxMGQyMDlSMTFpMjQxUjEyZDUwUjEzZDU5M1IxNGFoZzoxMjhvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxMjhSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjI0MG9SMWQ4NThSMmFkMjU0ZDcyMy41ZDI1NGQ5MDFkNDc5LjVkOTAxZDQ3OS41ZDQyOWQyNTRkNDI5ZDI1NGQ2MDYuNWQzMTkuNWQ2MDYuNWQzMTkuNWQ3MjMuNWQyNTRkNzIzLjVkMTE2ZDYwNi41ZDExNmQzMDZkNTU3ZDMwNmQ2MDlkMzY5ZDYwOWQ5NjFkNTU3LjVkMTAyNGQxMTZkMTAyNGQxMTZkNzIzLjVkNTBkNzIzLjVkNTBkNjA2LjVkMTE2ZDYwNi41aFIzZDY1OVI0ZDYwOVI1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkyNDBSMTJkNTBSMTNkNjU5UjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxMjdvUjFkODU4UjJhZDUwZDEwMjRkNTBkMzA3ZDQ2MmQzMDdkNDYyZDEwMjRkNTBkMTAyNGQ3NWQ5OTlkNDM3ZDk5OWQ0MzdkMzMyZDc1ZDMzMmQ3NWQ5OTlkMTYyLjVkNDUwZDE3OGQ0MzZkMTkxLjVkNDI4LjVkMjE4ZDQxMy41ZDI0Ny41ZDQxMy41ZDI5My41ZDQxMy41ZDMyMS41ZDQzNy4yNWQzNDkuNWQ0NjFkMzQ5LjVkNTAxZDM0OS41ZDUyNS41ZDMzOGQ1NTAuMjVkMzI2LjVkNTc1ZDI5NC41ZDYxNWQyNjNkNjU1ZDI0NWQ2ODFkMjI3ZDcwN2QyMjdkNzMwLjVkMjI3ZDc0OS41ZDIzOWQ3OTdkMjIzZDc5N2QyMDUuNWQ3NDguNWQyMDUuNWQ3MjNkMjA1LjVkNjg1ZDI0Ni4yNWQ2MTRkMjg3ZDU0M2QyODdkNTA1LjVkMjg3ZDQ3N2QyNzAuNWQ0NjAuNWQyNTRkNDQ0ZDIyNWQ0NDRkMjA2ZDQ0NGQxOTAuNWQ0NTIuNWQxNzcuNWQ0NjBkMTYyLjVkNDcyLjVkMTYyLjVkNDUwZDE5NC41ZDg1N2QyMjNkODI4ZDIyOC41ZDgyM2QyMzNkODIzZDIzOGQ4MjNkMjQ0ZDgyOC41ZDI3MmQ4NTguNWQyNzYuNWQ4NjRkMjc2LjVkODY4LjVkMjc2LjVkODc0ZDI3MS41ZDg3OS41ZDI0My41ZDkxMC41ZDIzNi41ZDkxNy41ZDIzM2Q5MTcuNWQyMjcuNWQ5MTcuNWQyMjNkOTEyLjVkMTkyLjVkODc3ZDE4OWQ4NzIuNWQxODlkODY4ZDE4OWQ4NjNkMTk0LjVkODU3aFIzZDUxMlI0ZDQ2MlI1ZDUwUjZkNzE3UjdkMFI4ZDY2N1I5ZDQzUjEwZDIwOVIxMWkxMjdSMTJkNTBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2hnOjIzOW9SMWQ4NThSMmFoUjNkNDQyLjVSNGQzOTIuNVI1ZDUwUjZkODUzLjVSN2QwUjhkODAzLjVSOWQ0M1IxMGQyMDlSMTFpMjM5UjEyZDUwUjEzZDQ0Mi41UjE0YWhnOjEyNm9SMWQ4NThSMmFkNTBkNjI1ZDkxZDcwMGQxNDIuNWQ2NDJkMjIxLjI1ZDY4OS43NWQzMDBkNzM3LjVkMzkyLjVkNjMxLjVkMzQ0LjVkNTczLjVkMjc2ZDYzNWQyMTZkNTkyZDE1NmQ1NDlkNTBkNjI1aFIzZDQ0Mi41UjRkMzkyLjVSNWQ1MFI2ZDQ3NVI3ZDI4Ni41UjhkNDI1UjlkNDNSMTBkMjA5UjExaTEyNlIxMmQ1MFIxM2Q0NDIuNVIxNGFpMWkyaTNpM2kyaTNpM2hnOjIzOG9SMWQ4NThSMmFoUjNkMzEwLjVSNGQyNjAuNVI1ZDUwUjZkODQyUjdkMFI4ZDc5MlI5ZDQzUjEwZDIwOVIxMWkyMzhSMTJkNTBSMTNkMzEwLjVSMTRhaGc6MTI1b1IxZDg1OFIyYWQzMTIuNWQ2NjYuNWQyNTYuNWQ3MDdkMjU2LjVkOTYxZDIwNWQxMDI0ZDUwZDEwMjRkNTBkOTAxZDEyN2Q5MDFkMTI3ZDcwMmQxNjAuNWQ2NjRkMTI3ZDYxN2QxMjdkNDI5ZDUwZDQyOWQ1MGQzMDZkMjA0LjVkMzA2ZDI1Ni41ZDM2OWQyNTYuNWQ2MTQuNWQzMTIuNWQ2NjYuNWhSM2QzNjIuNVI0ZDMxMi41UjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTEyNVIxMmQ1MFIxM2QzNjIuNVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjM3b1IxZDg1OFIyYWhSM2QyNDEuNVI0ZDE5MS41UjVkNTBSNmQ4NDEuNVI3ZDBSOGQ3OTEuNVI5ZDQzUjEwZDIwOVIxMWkyMzdSMTJkNTBSMTNkMjQxLjVSMTRhaGc6MTI0b1IxZDg1OFIyYWQxMjJkMTk0LjVkMTIyZDExMDJkNTBkMTEwMmQ1MGQxOTQuNWQxMjJkMTk0LjVoUjNkMTcyUjRkMTIyUjVkNTBSNmQ4MjkuNVI3ZC03OFI4ZDc3OS41UjlkNDNSMTBkMjA5UjExaTEyNFIxMmQ1MFIxM2QxNzJSMTRhaTFpMmkyaTJpMmhnOjIzNm9SMWQ4NThSMmFoUjNkMjM4UjRkMTg4UjVkNTBSNmQ4NDEuNVI3ZDBSOGQ3OTEuNVI5ZDQzUjEwZDIwOVIxMWkyMzZSMTJkNTBSMTNkMjM4UjE0YWhnOjEyM29SMWQ4NThSMmFkMTA2ZDYxNC41ZDEwNmQzNjlkMTU4ZDMwNmQzMTIuNWQzMDZkMzEyLjVkNDI5ZDIzNS41ZDQyOWQyMzUuNWQ2MTdkMjAyZDY2NGQyMzUuNWQ3MDJkMjM1LjVkOTAxZDMxMi41ZDkwMWQzMTIuNWQxMDI0ZDE1Ny41ZDEwMjRkMTA2ZDk2MWQxMDZkNzA3ZDUwZDY2Ni41ZDEwNmQ2MTQuNWhSM2QzNjIuNVI0ZDMxMi41UjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTEyM1IxMmQ1MFIxM2QzNjIuNVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjM1b1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1My41UjdkMFI4ZDgwMy41UjlkNDNSMTBkMjA5UjExaTIzNVIxMmQ1MFIxM2Q1OTNSMTRhaGc6MTIyb1IxZDg1OFIyYWQzNzQuNWQ0MjlkNTBkNDI5ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMjI0LjVkOTAxZDU0M2Q5MDFkNTQzZDEwMjRkNTBkMTAyNGQ1MGQ5MDFkMzc0LjVkNDI5aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxMjJSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMzRvUjFkODU4UjJhaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODQyUjdkMFI4ZDc5MlI5ZDQzUjEwZDIwOVIxMWkyMzRSMTJkNTBSMTNkNTkzUjE0YWhnOjEyMW9SMWQ4NThSMmFkMzYyZDY2NWQzNjJkMTAyNGQyMjRkMTAyNGQyMjRkNjY1ZDUwZDMwNmQxODhkMzA2ZDI5OS41ZDUzNGQ0MTMuNWQzMDZkNTQzZDMwNmQzNjJkNjY1aFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkMFI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxMjFSMTJkNTBSMTNkNTkzUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjMzb1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTIzM1IxMmQ1MFIxM2Q1OTNSMTRhaGc6MTIwb1IxZDg1OFIyYWQyMzAuNWQ2NjVkMjI2ZDY2NWQ1MmQzMDZkMTkwZDMwNmQzMDEuNWQ1MzRkNDE1LjVkMzA2ZDU0NWQzMDZkMzY0LjVkNjY0LjVkMzY5ZDY2NC41ZDU0M2QxMDIzLjVkNDA1ZDEwMjMuNWQyOTMuNWQ3OTUuNWQxNzkuNWQxMDIzLjVkNTBkMTAyMy41ZDIzMC41ZDY2NWhSM2Q1OTVSNGQ1NDVSNWQ1MFI2ZDcxOFI3ZDAuNVI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkxMjBSMTJkNTBSMTNkNTk1UjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIzMm9SMWQ4NThSMmFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NDEuNVI3ZDBSOGQ3OTEuNVI5ZDQzUjEwZDIwOVIxMWkyMzJSMTJkNTBSMTNkNTkzUjE0YWhnOjExOW9SMWQ4NThSMmFkNDAwZDY5NmQzNDEuNWQxMDI0ZDE3OGQxMDI0ZDUwZDMwNmQxOTFkMzA2ZDI1OWQ3ODZkMzMxLjVkMzA2ZDQ2OGQzMDZkNTQwLjVkNzg2ZDYwOC41ZDMwNmQ3NDkuNWQzMDZkNjIxLjVkMTAyNGQ0NThkMTAyNGQ0MDBkNjk2aFIzZDc5OS41UjRkNzQ5LjVSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTE5UjEyZDUwUjEzZDc5OS41UjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMzFvUjFkODU4UjJhaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkNzE4UjdkLTE1NlI4ZDY2OFI5ZDQzUjEwZDIwOVIxMWkyMzFSMTJkNTBSMTNkNTkzUjE0YWhnOjExOG9SMWQ4NThSMmFkNDEzLjVkMzA2ZDU0M2QzMDZkMzg2LjVkMTAyNGQyMTguNWQxMDI0ZDUwZDMwNmQxODhkMzA2ZDI5NmQ4NTguNWQ0MTMuNWQzMDZoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTExOFIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmhnOjIzMG9SMWQ4NThSMmFkNDEwLjVkNzIzLjVkMTg4ZDcyMy41ZDE4OGQxMDI0ZDUwZDEwMjRkNTBkMzA2ZDkwMy41ZDMwNmQ5MDMuNWQ0MjlkNTQ4LjVkNDI5ZDU0OC41ZDYwNi41ZDkwMy41ZDYwNi41ZDkwMy41ZDcyMy41ZDU0OC41ZDcyMy41ZDU0OC41ZDkwMWQ5MDMuNWQ5MDFkOTAzLjVkMTAyNGQ0MTAuNWQxMDI0ZDQxMC41ZDcyMy41ZDQxMC41ZDYwNi41ZDQxMC41ZDQyOWQxODhkNDI5ZDE4OGQ2MDYuNWQ0MTAuNWQ2MDYuNWhSM2Q5NTMuNVI0ZDkwMy41UjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTIzMFIxMmQ1MFIxM2Q5NTMuNVIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjExN29SMWQ4NThSMmFkNDEzLjVkMzA2ZDU0M2QzMDZkNTQzZDEwMjRkNTBkMTAyNGQ1MGQzMDZkMTg4ZDMwNmQxODhkOTAxZDQxMy41ZDkwMWQ0MTMuNWQzMDZoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTExN1IxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjI5b1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0Ny41UjdkMFI4ZDc5Ny41UjlkNDNSMTBkMjA5UjExaTIyOVIxMmQ1MFIxM2Q1OTNSMTRhaGc6MTE2b1IxZDg1OFIyYWQyMzYuNWQ0MjlkNTBkNDI5ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q0MjlkMzc0LjVkNDI5ZDM3NC41ZDEwMjRkMjM2LjVkMTAyNGQyMzYuNWQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTExNlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjI4b1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg1My41UjdkMFI4ZDgwMy41UjlkNDNSMTBkMjA5UjExaTIyOFIxMmQ1MFIxM2Q1OTNSMTRhaGc6MTE1b1IxZDg1OFIyYWQ1MGQ3MjMuNWQ1MGQzMDZkNTQzZDMwNmQ1NDNkNDI5ZDE4OGQ0MjlkMTg4ZDYwNi41ZDU0M2Q2MDYuNWQ1NDNkMTAyNGQ1MGQxMDI0ZDUwZDkwMWQ0MTMuNWQ5MDFkNDEzLjVkNzIzLjVkNTBkNzIzLjVoUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTExNVIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMjdvUjFkODU4UjJhaFIzZDU5M1I0ZDU0M1I1ZDUwUjZkODU5UjdkMFI4ZDgwOVI5ZDQzUjEwZDIwOVIxMWkyMjdSMTJkNTBSMTNkNTkzUjE0YWhnOjExNG9SMWQ4NThSMmFkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjlkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkNzIzLjVkMzc0LjVkNzIzLjVkNTQzZDEwMjRkNDEzLjVkMTAyNGQyMzYuNWQ3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkNTBkMTAyNGhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZDBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTE0UjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIyNm9SMWQ4NThSMmFoUjNkNTkzUjRkNTQzUjVkNTBSNmQ4NDJSN2QwUjhkNzkyUjlkNDNSMTBkMjA5UjExaTIyNlIxMmQ1MFIxM2Q1OTNSMTRhaGc6MTEzb1IxZDg1OFIyYWQ0MTMuNWQ4OTMuNWQ0MTMuNWQ0MjlkMTg4ZDQyOWQxODhkOTAxZDI5OC41ZDkwMWQyNTJkODEzLjVkMzczZDgxMy41ZDQxMy41ZDg5My41ZDM2NC41ZDEwMjRkNTBkMTAyNGQ1MGQzMDZkNTQzZDMwNmQ1NDNkMTAyNGQ0NzkuNWQxMDI0ZDU0MGQxMTQ0ZDQyOC41ZDExNDRkMzY0LjVkMTAyNGhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDcxOFI3ZC0xMjBSOGQ2NjhSOWQ0M1IxMGQyMDlSMTFpMTEzUjEyZDUwUjEzZDU5M1IxNGFpMWkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjI1b1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTIyNVIxMmQ1MFIxM2Q1OTNSMTRhaGc6MTEyb1IxZDg1OFIyYWQxODhkMTAyNGQ1MGQxMDI0ZDUwZDMwNmQ1NDNkMzA2ZDU0M2Q3MjMuNWQxODhkNzIzLjVkMTg4ZDEwMjRkMTg4ZDQyOWQxODhkNjA2LjVkNDEzLjVkNjA2LjVkNDEzLjVkNDI5ZDE4OGQ0MjloUjNkNTkzUjRkNTQzUjVkNTBSNmQ3MThSN2QwUjhkNjY4UjlkNDNSMTBkMjA5UjExaTExMlIxMmQ1MFIxM2Q1OTNSMTRhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjI0b1IxZDg1OFIyYWhSM2Q1OTNSNGQ1NDNSNWQ1MFI2ZDg0MS41UjdkMFI4ZDc5MS41UjlkNDNSMTBkMjA5UjExaTIyNFIxMmQ1MFIxM2Q1OTNSMTRhaGdoeTg6Zm9udE5hbWV5MTA6U3F1YXJlRm9udGc"}];
var __map_reserved = {}
var ArrayBuffer = (Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null"))() || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = (Function("return typeof DataView != 'undefined' ? DataView : null"))() || js_html_compat_DataView;
var Uint8Array = (Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null"))() || js_html_compat_Uint8Array._new;
var this1;
this1 = new Array(256);
lime_graphics_utils_ImageDataUtil.__alpha16 = this1;
var _g = 0;
while(_g < 256) {
	var i = _g++;
	lime_graphics_utils_ImageDataUtil.__alpha16[i] = i * 65536 / 255 | 0;
}
var this2;
this2 = new Array(510);
lime_graphics_utils_ImageDataUtil.__clamp = this2;
var _g1 = 0;
while(_g1 < 255) {
	var i1 = _g1++;
	lime_graphics_utils_ImageDataUtil.__clamp[i1] = i1;
}
var _g11 = 255;
var _g2 = 511;
while(_g11 < _g2) {
	var i2 = _g11++;
	lime_graphics_utils_ImageDataUtil.__clamp[i2] = 255;
}
if(window.createjs != null) createjs.Sound.alternateExtensions = ["ogg","mp3","wav"];
openfl_display_DisplayObject.__instanceCount = 0;
openfl_display_DisplayObject.__worldRenderDirty = 0;
openfl_display_DisplayObject.__worldTransformDirty = 0;
openfl_text_Font.__registeredFonts = [];
Splash.resourceType = "image/png";
Splash.resourceName = "__ASSET__:bitmap_Splash";
Preloader.color = 16750080;
Preloader.backgroundColor = 3355443;
Preloader.stringLoading = "Loading";
Preloader.stringComplete = "CLICK TO CONTINUE";
game_SpriteBuilder.spirtesheetCashe = new haxe_ds_StringMap();
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
lime_Assets.cache = new lime_AssetCache();
lime_Assets.libraries = new haxe_ds_StringMap();
lime_Assets.initialized = false;
lime_app_Preloader.images = new haxe_ds_StringMap();
lime_app_Preloader.loaders = new haxe_ds_StringMap();
motion_actuators_SimpleActuator.actuators = [];
motion_actuators_SimpleActuator.actuatorsLength = 0;
motion_actuators_SimpleActuator.addedEvent = false;
motion_Actuate.defaultActuator = motion_actuators_SimpleActuator;
motion_Actuate.defaultEase = motion_easing_Expo.get_easeOut();
motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
openfl_Assets.cache = new openfl_AssetCache();
openfl_display_LoaderInfo.__rootURL = window.document.URL;
openfl_system_ApplicationDomain.currentDomain = new openfl_system_ApplicationDomain(null);
openfl_geom_Matrix.__identity = new openfl_geom_Matrix();
openfl_Lib.current = new openfl_display_MovieClip();
openfl_Lib.__sentWarnings = new haxe_ds_StringMap();
openfl__$internal_renderer_TextFieldGraphics.bitmapData = new haxe_ds_ObjectMap();
openfl__$internal_renderer_TextFieldGraphics.glyphs = new haxe_ds_ObjectMap();
openfl__$internal_renderer_TextFieldGraphics.tilesheets = new haxe_ds_ObjectMap();
openfl__$internal_renderer_TextFieldGraphics.tileIDs = new haxe_ds_ObjectMap();
openfl__$internal_renderer_cairo_CairoGraphics.SIN45 = 0.70710678118654752440084436210485;
openfl__$internal_renderer_cairo_CairoGraphics.TAN22 = 0.4142135623730950488016887242097;
openfl__$internal_renderer_canvas_CanvasGraphics.SIN45 = 0.70710678118654752440084436210485;
openfl__$internal_renderer_canvas_CanvasGraphics.TAN22 = 0.4142135623730950488016887242097;
openfl__$internal_renderer_opengl_GLRenderer.blendModesWebGL = null;
openfl__$internal_renderer_opengl_GLRenderer.glContextId = 0;
openfl__$internal_renderer_opengl_GLRenderer.glContexts = [];
openfl__$internal_renderer_opengl_shaders2_Shader.UID = 0;
openfl__$internal_renderer_opengl_utils_PathBuiler.__currentWinding = 0;
openfl__$internal_renderer_opengl_utils_PathBuiler.__fillIndex = 0;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.fillVertexAttributes = [new openfl__$internal_renderer_opengl_utils_VertexAttribute(2,5126,false,"aPosition")];
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.drawTrianglesVertexAttributes = [new openfl__$internal_renderer_opengl_utils_VertexAttribute(2,5126,false,"aPosition"),new openfl__$internal_renderer_opengl_utils_VertexAttribute(2,5126,false,"aTexCoord0"),new openfl__$internal_renderer_opengl_utils_VertexAttribute(4,5121,true,"aColor")];
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.primitiveVertexAttributes = [new openfl__$internal_renderer_opengl_utils_VertexAttribute(2,5126,false,"aPosition"),new openfl__$internal_renderer_opengl_utils_VertexAttribute(4,5126,false,"aColor")];
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.bucketPool = [];
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.SIN45 = 0.70710678118654752440084436210485;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.TAN22 = 0.4142135623730950488016887242097;
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectPosition = new openfl_geom_Point();
openfl__$internal_renderer_opengl_utils_GraphicsRenderer.objectBounds = new openfl_geom_Rectangle();
openfl_text_TextField.__utf8_endline_code = 10;
openfl_display_Tilesheet.__defaultPoint = new openfl_geom_Point(0,0);
openfl_events_Event.ACTIVATE = "activate";
openfl_events_Event.ADDED = "added";
openfl_events_Event.ADDED_TO_STAGE = "addedToStage";
openfl_events_Event.CHANGE = "change";
openfl_events_Event.COMPLETE = "complete";
openfl_events_Event.DEACTIVATE = "deactivate";
openfl_events_Event.ENTER_FRAME = "enterFrame";
openfl_events_Event.MOUSE_LEAVE = "mouseLeave";
openfl_events_Event.REMOVED = "removed";
openfl_events_Event.REMOVED_FROM_STAGE = "removedFromStage";
openfl_events_Event.RENDER = "render";
openfl_events_Event.RESIZE = "resize";
openfl_events_FocusEvent.FOCUS_IN = "focusIn";
openfl_events_FocusEvent.FOCUS_OUT = "focusOut";
openfl_events_IOErrorEvent.IO_ERROR = "ioError";
openfl_events_KeyboardEvent.KEY_DOWN = "keyDown";
openfl_events_KeyboardEvent.KEY_UP = "keyUp";
openfl_events_MouseEvent.CLICK = "click";
openfl_events_MouseEvent.DOUBLE_CLICK = "doubleClick";
openfl_events_MouseEvent.MIDDLE_CLICK = "middleClick";
openfl_events_MouseEvent.MIDDLE_MOUSE_DOWN = "middleMouseDown";
openfl_events_MouseEvent.MIDDLE_MOUSE_UP = "middleMouseUp";
openfl_events_MouseEvent.MOUSE_DOWN = "mouseDown";
openfl_events_MouseEvent.MOUSE_MOVE = "mouseMove";
openfl_events_MouseEvent.MOUSE_OUT = "mouseOut";
openfl_events_MouseEvent.MOUSE_OVER = "mouseOver";
openfl_events_MouseEvent.MOUSE_UP = "mouseUp";
openfl_events_MouseEvent.MOUSE_WHEEL = "mouseWheel";
openfl_events_MouseEvent.RIGHT_CLICK = "rightClick";
openfl_events_MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
openfl_events_MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
openfl_events_MouseEvent.__buttonDown = [false,false,false];
openfl_media_Sound.__registeredSounds = new haxe_ds_StringMap();
openfl_net_URLRequestMethod.GET = "GET";
spritesheet_data_BehaviorData.uniqueID = 0;
ApplicationMain.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
