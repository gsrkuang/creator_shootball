// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        var pm = cc.director.getPhysicsManager();
        pm.enabled = true;

        var rigidbody = this.node.getComponent(cc.RigidBody);
        // rigidbody.applyForceToCenter(cc.v2(0,100),true);


        // rigidbody.linearVelocity = cc.v2(-1000,1000);
        

        // console.log('test');

        
    },

    start () {

    },

    // onBeginContact:function(contact,selfCollider,otherCollider){

    // }

 onBeginContact: function (contact, selfCollider, otherCollider) {
        var that = this;
        if (otherCollider.node.name == "background") {
            // cc.audioEngine.playEffect(selfCollider.node.game.rockAudio, false);
            // var box = otherCollider.getComponent(cc.Sprite);
            // var label = box.getComponentInChildren(cc.Label);
            // var labelValue =  parseInt(label.string);
            // // 判断label数值是否为1
            // if (labelValue == 1) {
            //     box.node.destroy();
            // } else {
            //     label.string = (--labelValue).toString();
            // }
            // var colorArr = this.hslToRgb(labelValue * 0.025, 0.5, 0.5);
            // // box.node.setColor(cc.color(colorArr[0], colorArr[1], colorArr[2]));
            // box.node.color = new cc.Color(colorArr[0], colorArr[1], colorArr[2]);
            // // colorArr[0], colorArr[1], colorArr[2]
            console.log("碰撞了background");
            that.node.destroy();
        }
        if (otherCollider.node.name == "lifeBox") {
            // cc.audioEngine.playEffect(selfCollider.node.game.circleAudio, false);
            // otherCollider.node.destroy();
            // selfCollider.node.game.addBolls ++;
        }
        
        console.log('onBeginContact');
    },
    // update (dt) {},
});
