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

    // onLoad () {},

    start() {
        var that = this;
        cc.loader.loadRes("prefab/ball", function (err, prefab) {
            if( err ) { cc.log( '载入预制资源失败, 原因:' + err ); return; }
            if( !( prefab instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; }
            that.node.ballPrefab = prefab;
        });
        
        //触控移动
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
        
            that.setAngle(event);
        
        }, this.node);

        //触控移动
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            //判断车子是否在运行动画
            that.setAngle(event);
            
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            var shotline = that.node.getChildByName("shot_line");
            shotline.active = false;
            console.log(" Mangle = ",  shotline.rotation);
            var vx = event.touch.getLocationX();// 获取当前触点 X 轴位置。
            var vy = event.touch.getLocationY();
            var shot_speed = 10 ; //发射弹球速度
            //发射弹球
            that.shotBall(shotline,shot_speed);

        }, this.node);

    },

    setAngle:function(event){
        var that = this;
        var vx = event.touch.getLocationX();// 获取当前触点 X 轴位置。
        var vy = event.touch.getLocationY();// 
        var shotline = that.node.getChildByName("shot_line");
        shotline.active = true;
        var pos = shotline.getPosition();
        var posX = pos.x;
        var posY = pos.y;
        
        var vx2 = posX - vx ;
        var r1 = Math.atan2(vx-posX,vy-posY);
        var angle = 180*r1/Math.PI //转换为角度值
        shotline.rotation = angle;

    },

    shotBall:function(shotline,shot_speed){
        var that = this;
        var s_rotation = shotline.rotation;

        var ballnode = cc.instantiate(that.node.ballPrefab);
        ballnode.parent = this.node.parent;
        ballnode.position.x = shotline.getPosition().x;
        ballnode.position.y = shotline.getPosition().y;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        var pm = cc.director.getPhysicsManager();
        pm.enabled = true;

        var rigidbody = ballnode.getComponent(cc.RigidBody);
        
        var angle = -s_rotation - 630 ;
        
        var toX = Math.cos(angle * 0.017453293) * 100;
        var toY = Math.sin(angle * 0.017453293) * 100;
        
        rigidbody.linearVelocity = cc.v2(toX * shot_speed, toY * shot_speed);
        
    }
    // update (dt) {},

});
