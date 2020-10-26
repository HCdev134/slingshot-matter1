let engine = Matter.Engine.create(); 

let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1200,
        height:600,
        wireframes: false
    }
});

let ground = Matter.Bodies.rectangle(750,250,250,20,{isStatic:true});


let mouse = Matter.Mouse.create(render.canvas); 
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {visible:true}
    }
}); 

render.mouse = mouse; 


let ball = Matter.Bodies.circle(199,250,25);

let sling = Matter.Constraint.create({
    pointA: {x:199, y: 250},
    bodyB: ball, 
    stiffness: 0.02
})
let stack = Matter.Composites.stack(670, 50,4,4,0,0, function(x,y){
   
    return Matter.Bodies.polygon(x,y, 8, 25)
});

let firing = false; 
Matter.Events.on(mouseConstraint, 'enddrag', function(e){
    if(e.body === ball) firing = true;
});
Matter.Events.on(engine, 'afterUpdate', function(){
    if(firing && Math.abs(ball.position.x-199) < 25 && Math.abs(ball.position.y-250)<25 ) {
        ball = Matter.Bodies.circle(199, 250, 25);
        Matter.World.add(engine.world,ball);
        sling.bodyB = ball; 
        firing = false;
    }
});

Matter.World.add(engine.world, [stack, ground, ball, sling, mouseConstraint]);
Matter.Engine.run(engine);
Matter.Render.run(render); 